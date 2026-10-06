const fs = require('fs');
const path = require('path');

function run() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error('Usage: node ua-arch-analyze.js <input.json> <output.json>');
    process.exit(1);
  }

  const [inputPath, outputPath] = args;
  let rawData;
  try {
    rawData = fs.readFileSync(inputPath, 'utf8');
  } catch (err) {
    console.error(`Failed to read input file ${inputPath}:`, err.message);
    process.exit(1);
  }

  let input;
  try {
    input = JSON.parse(rawData);
  } catch (err) {
    console.error(`Failed to parse JSON in ${inputPath}:`, err.message);
    process.exit(1);
  }

  const fileNodes = input.fileNodes || [];
  const importEdges = input.importEdges || [];
  const allEdges = input.allEdges || [];

  // Index fileNodes by ID
  const nodeById = new Map();
  for (const node of fileNodes) {
    nodeById.set(node.id, node);
  }

  // A. Directory Grouping
  // Compute common prefix
  const filePaths = fileNodes.map(n => n.filePath);
  let commonPrefix = '';
  if (filePaths.length > 0) {
    const splitPaths = filePaths.map(p => p.split('/'));
    const firstSplit = splitPaths[0];
    let prefixSegments = [];
    for (let i = 0; i < firstSplit.length - 1; i++) {
      const seg = firstSplit[i];
      if (splitPaths.every(sp => sp[i] === seg)) {
        prefixSegments.push(seg);
      } else {
        break;
      }
    }
    if (prefixSegments.length > 0) {
      commonPrefix = prefixSegments.join('/') + '/';
    }
  }

  const directoryGroups = {};
  const fileGroupMap = new Map();

  for (const node of fileNodes) {
    const relPath = commonPrefix ? node.filePath.slice(commonPrefix.length) : node.filePath;
    const parts = relPath.split('/');
    let group = 'root';
    if (parts.length > 1) {
      group = parts[0];
    }
    if (!directoryGroups[group]) {
      directoryGroups[group] = [];
    }
    directoryGroups[group].push(node.id);
    fileGroupMap.set(node.id, group);
  }

  // B. Node Type Grouping
  const nodeTypeGroups = {};
  for (const node of fileNodes) {
    const t = node.type || 'unknown';
    if (!nodeTypeGroups[t]) {
      nodeTypeGroups[t] = [];
    }
    nodeTypeGroups[t].push(node.id);
  }

  // C. Import Adjacency Matrix & Fan In / Fan Out
  const fileFanIn = {};
  const fileFanOut = {};
  for (const node of fileNodes) {
    fileFanIn[node.id] = 0;
    fileFanOut[node.id] = 0;
  }

  const groupImportsFrom = {}; // group -> Set of groups it imports
  const groupImportedBy = {};  // group -> Set of groups that import it
  for (const g of Object.keys(directoryGroups)) {
    groupImportsFrom[g] = new Set();
    groupImportedBy[g] = new Set();
  }

  // Inter-group import frequency counts: key: "from->to"
  const pairImportCount = new Map();

  for (const edge of importEdges) {
    const src = edge.source;
    const tgt = edge.target;
    if (fileFanOut[src] !== undefined) fileFanOut[src]++;
    if (fileFanIn[tgt] !== undefined) fileFanIn[tgt]++;

    const srcGroup = fileGroupMap.get(src);
    const tgtGroup = fileGroupMap.get(tgt);

    if (srcGroup && tgtGroup) {
      if (srcGroup !== tgtGroup) {
        groupImportsFrom[srcGroup].add(tgtGroup);
        groupImportedBy[tgtGroup].add(srcGroup);
      }
      const pairKey = `${srcGroup}->${tgtGroup}`;
      pairImportCount.set(pairKey, (pairImportCount.get(pairKey) || 0) + 1);
    }
  }

  // Also check if importEdges is empty, consider edges with type "imports" or "depends_on" for dependency insights if needed
  // But per spec, interGroupImports is from importEdges
  const interGroupImports = [];
  for (const [key, count] of pairImportCount.entries()) {
    const [from, to] = key.split('->');
    interGroupImports.push({ from, to, count });
  }

  // D. Cross-Category Dependency Analysis
  const crossCatCounts = new Map();
  for (const edge of allEdges) {
    const srcNode = nodeById.get(edge.source);
    const tgtNode = nodeById.get(edge.target);
    const fromType = srcNode ? srcNode.type : 'external';
    const toType = tgtNode ? tgtNode.type : 'external';
    const edgeType = edge.type || 'unknown';

    const key = `${fromType}->${toType}:${edgeType}`;
    crossCatCounts.set(key, (crossCatCounts.get(key) || 0) + 1);
  }

  const crossCategoryEdges = [];
  for (const [key, count] of crossCatCounts.entries()) {
    const [pair, edgeType] = key.split(':');
    const [fromType, toType] = pair.split('->');
    crossCategoryEdges.push({ fromType, toType, edgeType, count });
  }

  // F. Intra-Group Import Density
  const intraGroupDensity = {};
  for (const group of Object.keys(directoryGroups)) {
    let internalEdges = 0;
    let totalEdges = 0;
    for (const edge of importEdges) {
      const srcGroup = fileGroupMap.get(edge.source);
      const tgtGroup = fileGroupMap.get(edge.target);
      if (srcGroup === group || tgtGroup === group) {
        totalEdges++;
        if (srcGroup === group && tgtGroup === group) {
          internalEdges++;
        }
      }
    }
    intraGroupDensity[group] = {
      internalEdges,
      totalEdges,
      density: totalEdges > 0 ? Number((internalEdges / totalEdges).toFixed(3)) : 0
    };
  }

  // G. Directory Pattern Matching
  const patternRules = [
    { patterns: ['routes', 'api', 'controllers', 'endpoints', 'handlers', 'controller', 'routers', 'blueprints', 'serializers'], label: 'api' },
    { patterns: ['services', 'core', 'lib', 'domain', 'logic', 'signals', 'composables', 'mailers', 'jobs', 'channels', 'internal'], label: 'service' },
    { patterns: ['models', 'db', 'data', 'persistence', 'repository', 'entities', 'entity', 'migrations', 'sql', 'database', 'schema'], label: 'data' },
    { patterns: ['components', 'views', 'pages', 'ui', 'layouts', 'screens'], label: 'ui' },
    { patterns: ['middleware', 'plugins', 'interceptors', 'guards'], label: 'middleware' },
    { patterns: ['utils', 'helpers', 'common', 'shared', 'tools', 'pkg', 'templatetags'], label: 'utility' },
    { patterns: ['config', 'constants', 'env', 'settings', 'management', 'commands'], label: 'config' },
    { patterns: ['__tests__', 'test', 'tests', 'spec', 'specs'], label: 'test' },
    { patterns: ['types', 'interfaces', 'schemas', 'contracts', 'dtos', 'dto', 'request', 'response'], label: 'types' },
    { patterns: ['hooks'], label: 'hooks' },
    { patterns: ['store', 'state', 'reducers', 'actions', 'slices'], label: 'state' },
    { patterns: ['assets', 'static', 'public'], label: 'assets' },
    { patterns: ['cmd', 'bin'], label: 'entry' },
    { patterns: ['docs', 'documentation', 'wiki'], label: 'documentation' },
    { patterns: ['deploy', 'deployment', 'infra', 'infrastructure', 'k8s', 'kubernetes', 'helm', 'charts', 'terraform', 'tf', 'docker'], label: 'infrastructure' },
    { patterns: ['.github', '.gitlab', '.circleci'], label: 'ci-cd' }
  ];

  const patternMatches = {};
  for (const group of Object.keys(directoryGroups)) {
    const lower = group.toLowerCase();
    for (const rule of patternRules) {
      if (rule.patterns.includes(lower)) {
        patternMatches[group] = rule.label;
        break;
      }
    }
    // Also match chapter / content guides
    if (!patternMatches[group]) {
      if (/^\d{2}_/.test(group)) {
        patternMatches[group] = 'documentation';
      } else if (group === 'appendix') {
        patternMatches[group] = 'documentation';
      }
    }
  }

  // H. Deployment Topology Detection
  const infraFiles = [];
  let hasDockerfile = false;
  let hasCompose = false;
  let hasK8s = false;
  let hasTerraform = false;
  let hasCI = false;

  for (const node of fileNodes) {
    const p = node.filePath.toLowerCase();
    if (p.includes('dockerfile')) {
      hasDockerfile = true;
      infraFiles.push(node.filePath);
    } else if (p.includes('docker-compose')) {
      hasCompose = true;
      infraFiles.push(node.filePath);
    } else if (p.includes('k8s') || p.includes('helm') || p.includes('kubernetes')) {
      hasK8s = true;
      infraFiles.push(node.filePath);
    } else if (p.endsWith('.tf') || p.endsWith('.tfvars')) {
      hasTerraform = true;
      infraFiles.push(node.filePath);
    } else if (p.startsWith('.github/workflows') || p.includes('.gitlab-ci') || p.includes('jenkinsfile')) {
      hasCI = true;
      infraFiles.push(node.filePath);
    } else if (p.endsWith('dependabot.yml') || p.endsWith('dependabot.yaml')) {
      infraFiles.push(node.filePath);
    }
  }

  const deploymentTopology = {
    hasDockerfile,
    hasCompose,
    hasK8s,
    hasTerraform,
    hasCI,
    infraFiles
  };

  // I. Data Pipeline Detection
  const schemaFiles = [];
  const migrationFiles = [];
  const dataModelFiles = [];
  const apiHandlerFiles = [];

  for (const node of fileNodes) {
    const p = node.filePath.toLowerCase();
    if (p.endsWith('.sql') || p.endsWith('.graphql') || p.endsWith('.gql') || p.endsWith('.proto') || p.includes('schema')) {
      schemaFiles.push(node.filePath);
    }
    if (p.includes('migration')) {
      migrationFiles.push(node.filePath);
    }
    if (p.includes('models/') || p.includes('entity') || p.includes('entities')) {
      dataModelFiles.push(node.filePath);
    }
    if (p.includes('routes/') || p.includes('controllers/') || p.includes('handlers/')) {
      apiHandlerFiles.push(node.filePath);
    }
  }

  const dataPipeline = {
    schemaFiles,
    migrationFiles,
    dataModelFiles,
    apiHandlerFiles
  };

  // J. Documentation Coverage
  let groupsWithDocs = 0;
  const undocumentedGroups = [];
  const totalGroups = Object.keys(directoryGroups).length;

  for (const [group, nodeIds] of Object.entries(directoryGroups)) {
    const hasDoc = nodeIds.some(id => {
      const node = nodeById.get(id);
      if (!node) return false;
      const fp = node.filePath.toLowerCase();
      return fp.endsWith('.md') || fp.endsWith('.rst') || node.type === 'document';
    });
    if (hasDoc) {
      groupsWithDocs++;
    } else {
      undocumentedGroups.push(group);
    }
  }

  const docCoverage = {
    groupsWithDocs,
    totalGroups,
    coverageRatio: totalGroups > 0 ? Number((groupsWithDocs / totalGroups).toFixed(2)) : 0,
    undocumentedGroups
  };

  // K. Dependency Direction
  const dependencyDirection = [];
  for (const [pairKey, count] of pairImportCount.entries()) {
    const [from, to] = pairKey.split('->');
    const reverseKey = `${to}->${from}`;
    const reverseCount = pairImportCount.get(reverseKey) || 0;
    if (count > reverseCount) {
      dependencyDirection.push({ dependent: from, dependsOn: to });
    }
  }

  // File stats
  const filesPerGroup = {};
  for (const [group, nodes] of Object.entries(directoryGroups)) {
    filesPerGroup[group] = nodes.length;
  }

  const nodeTypeCounts = {};
  for (const [t, nodes] of Object.entries(nodeTypeGroups)) {
    nodeTypeCounts[t] = nodes.length;
  }

  const fileStats = {
    totalFileNodes: fileNodes.length,
    filesPerGroup,
    nodeTypeCounts
  };

  const output = {
    scriptCompleted: true,
    directoryGroups,
    nodeTypeGroups,
    crossCategoryEdges,
    interGroupImports,
    intraGroupDensity,
    patternMatches,
    deploymentTopology,
    dataPipeline,
    docCoverage,
    dependencyDirection,
    fileStats,
    fileFanIn,
    fileFanOut
  };

  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf8');
  console.log(`Structural analysis complete. Processed ${fileNodes.length} files.`);
}

try {
  run();
  process.exit(0);
} catch (err) {
  console.error('Fatal error running structural analysis:', err);
  process.exit(1);
}
