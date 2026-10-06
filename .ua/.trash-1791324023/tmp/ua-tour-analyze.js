const fs = require('fs');
const path = require('path');

const inputFile = process.argv[2];
const outputFile = process.argv[3];

if (!inputFile || !outputFile) {
  console.error("Usage: node ua-tour-analyze.js <input.json> <output.json>");
  process.exit(1);
}

try {
  const rawData = fs.readFileSync(inputFile, 'utf-8');
  const data = JSON.parse(rawData);

  const nodes = data.nodes || [];
  const edges = data.edges || [];
  const layers = data.layers || [];

  const nodeMap = new Map();
  nodes.forEach(n => nodeMap.set(n.id, n));

  // Compute Fan-In and Fan-Out
  const fanIn = new Map();
  const fanOut = new Map();
  nodes.forEach(n => {
    fanIn.set(n.id, 0);
    fanOut.set(n.id, 0);
  });

  edges.forEach(e => {
    if (fanOut.has(e.source)) {
      fanOut.set(e.source, fanOut.get(e.source) + 1);
    }
    if (fanIn.has(e.target)) {
      fanIn.set(e.target, fanIn.get(e.target) + 1);
    }
  });

  // Fan-In Ranking
  const fanInRanking = [...nodes]
    .map(n => ({ id: n.id, fanIn: fanIn.get(n.id) || 0, name: n.name }))
    .sort((a, b) => b.fanIn - a.fanIn)
    .slice(0, 20);

  // Fan-Out Ranking
  const fanOutRanking = [...nodes]
    .map(n => ({ id: n.id, fanOut: fanOut.get(n.id) || 0, name: n.name }))
    .sort((a, b) => b.fanOut - a.fanOut)
    .slice(0, 20);

  // Percentiles for fanOut and fanIn
  const sortedFanOut = [...nodes].map(n => fanOut.get(n.id) || 0).sort((a, b) => a - b);
  const sortedFanIn = [...nodes].map(n => fanIn.get(n.id) || 0).sort((a, b) => a - b);

  const top10PctFanOut = sortedFanOut[Math.floor(sortedFanOut.length * 0.9)] || 0;
  const bottom25PctFanIn = sortedFanIn[Math.floor(sortedFanIn.length * 0.25)] || 0;

  const entryPointPatterns = new Set([
    'index.ts', 'index.js', 'main.ts', 'main.js', 'app.ts', 'app.js', 'server.ts', 'server.js',
    'mod.rs', 'main.go', 'main.py', 'main.rs', 'manage.py', 'app.py', 'wsgi.py', 'asgi.py',
    'run.py', '__main__.py', 'Application.java', 'Main.java', 'Program.cs', 'config.ru',
    'index.php', 'App.swift', 'Application.kt', 'main.cpp', 'main.c'
  ]);

  // Entry Point Candidates
  const entryPointCandidates = [];

  nodes.forEach(n => {
    let score = 0;
    const filePath = n.filePath || n.name || '';
    const fileName = path.basename(filePath);
    const depth = filePath.split('/').filter(Boolean).length;

    if (n.type === 'document') {
      if (fileName.toLowerCase() === 'readme.md' && depth <= 1) {
        score += 5;
      } else if (fileName.endsWith('.md') && depth <= 1) {
        score += 2;
      }
    } else if (n.type === 'file') {
      if (entryPointPatterns.has(fileName)) {
        score += 3;
      }
      if (depth <= 2) { // project root or one level deep e.g. src/index.ts
        score += 1;
      }
      if ((fanOut.get(n.id) || 0) >= top10PctFanOut && top10PctFanOut > 0) {
        score += 1;
      }
      if ((fanIn.get(n.id) || 0) <= bottom25PctFanIn) {
        score += 1;
      }
    }

    if (score > 0) {
      entryPointCandidates.push({
        id: n.id,
        score,
        name: n.name,
        type: n.type,
        summary: n.summary
      });
    }
  });

  entryPointCandidates.sort((a, b) => b.score - a.score);
  const topEntryPointCandidates = entryPointCandidates.slice(0, 5);

  // Top Code Entry Point for BFS
  const codeCandidates = entryPointCandidates.filter(c => c.type === 'file');
  let topCodeNodeId = null;
  if (codeCandidates.length > 0) {
    topCodeNodeId = codeCandidates[0].id;
  } else {
    // Fallback: file node with highest fan-out
    const codeFiles = nodes.filter(n => n.type === 'file');
    if (codeFiles.length > 0) {
      codeFiles.sort((a, b) => (fanOut.get(b.id) || 0) - (fanOut.get(a.id) || 0));
      topCodeNodeId = codeFiles[0].id;
    }
  }

  // BFS Traversal
  let bfsTraversal = {
    startNode: topCodeNodeId,
    order: [],
    depthMap: {},
    byDepth: {}
  };

  if (topCodeNodeId) {
    // Adjacency for imports and calls
    const adj = new Map();
    edges.forEach(e => {
      if (e.type === 'imports' || e.type === 'calls') {
        if (!adj.has(e.source)) adj.set(e.source, []);
        adj.get(e.source).push(e.target);
      }
    });

    const queue = [{ id: topCodeNodeId, depth: 0 }];
    const visited = new Set([topCodeNodeId]);
    bfsTraversal.order.push(topCodeNodeId);
    bfsTraversal.depthMap[topCodeNodeId] = 0;
    bfsTraversal.byDepth[0] = [topCodeNodeId];

    while (queue.length > 0) {
      const { id, depth } = queue.shift();
      const neighbors = adj.get(id) || [];
      for (const nextId of neighbors) {
        if (!visited.has(nextId) && nodeMap.has(nextId)) {
          visited.add(nextId);
          const nextDepth = depth + 1;
          queue.push({ id: nextId, depth: nextDepth });
          bfsTraversal.order.push(nextId);
          bfsTraversal.depthMap[nextId] = nextDepth;
          if (!bfsTraversal.byDepth[nextDepth]) {
            bfsTraversal.byDepth[nextDepth] = [];
          }
          bfsTraversal.byDepth[nextDepth].push(nextId);
        }
      }
    }
  }

  // Non-code file inventory
  const nonCodeFiles = {
    documentation: [],
    infrastructure: [],
    data: [],
    config: []
  };

  nodes.forEach(n => {
    const item = { id: n.id, name: n.name, type: n.type, summary: n.summary };
    if (n.type === 'document') {
      nonCodeFiles.documentation.push(item);
    } else if (['service', 'pipeline', 'resource'].includes(n.type)) {
      nonCodeFiles.infrastructure.push(item);
    } else if (['table', 'schema', 'endpoint'].includes(n.type)) {
      nonCodeFiles.data.push(item);
    } else if (n.type === 'config') {
      nonCodeFiles.config.push(item);
    }
  });

  // Tightly Coupled Clusters
  // Bidirectional imports/calls edges
  const edgeSet = new Set();
  edges.forEach(e => {
    if (e.type === 'imports' || e.type === 'calls') {
      edgeSet.add(`${e.source}->${e.target}`);
    }
  });

  const clusters = [];
  const processedPairs = new Set();

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const idA = nodes[i].id;
      const idB = nodes[j].id;
      const aToB = edgeSet.has(`${idA}->${idB}`);
      const bToA = edgeSet.has(`${idB}->${idA}`);
      if (aToB && bToA) {
        // Form initial cluster
        let cluster = new Set([idA, idB]);
        // Expand cluster with nodes that connect to 2+ members
        let changed = true;
        while (changed) {
          changed = false;
          for (const cand of nodes) {
            if (!cluster.has(cand.id)) {
              let connCount = 0;
              for (const member of cluster) {
                if (edgeSet.has(`${cand.id}->${member}`) || edgeSet.has(`${member}->${cand.id}`)) {
                  connCount++;
                }
              }
              if (connCount >= 2 && cluster.size < 5) {
                cluster.add(cand.id);
                changed = true;
              }
            }
          }
        }

        const clusterArray = [...cluster].sort();
        const clusterKey = clusterArray.join('|');
        if (!processedPairs.has(clusterKey)) {
          processedPairs.add(clusterKey);
          // Count edges between cluster members
          let innerEdges = 0;
          for (const u of clusterArray) {
            for (const v of clusterArray) {
              if (u !== v && edgeSet.has(`${u}->${v}`)) {
                innerEdges++;
              }
            }
          }
          clusters.push({ nodes: clusterArray, edgeCount: innerEdges });
        }
      }
    }
  }

  clusters.sort((a, b) => b.edgeCount - a.edgeCount);
  const topClusters = clusters.slice(0, 10);

  // Layer list
  const layerList = {
    count: layers.length,
    list: layers
  };

  // Node Summary Index
  const nodeSummaryIndex = {};
  nodes.forEach(n => {
    nodeSummaryIndex[n.id] = {
      name: n.name,
      type: n.type,
      summary: n.summary
    };
  });

  const result = {
    scriptCompleted: true,
    entryPointCandidates: topEntryPointCandidates,
    fanInRanking,
    fanOutRanking,
    bfsTraversal,
    nonCodeFiles,
    clusters: topClusters,
    layers: layerList,
    nodeSummaryIndex,
    totalNodes: nodes.length,
    totalEdges: edges.length
  };

  fs.writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf-8');
  console.log("Analysis completed successfully. Output written to " + outputFile);
  process.exit(0);

} catch (err) {
  console.error("Fatal error:", err);
  process.exit(1);
}
