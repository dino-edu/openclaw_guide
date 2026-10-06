# Thiết kế Việt hóa toàn diện kho tài liệu 《OpenClaw 入门到精通》

- **Ngày khởi tạo**: 2026-10-06
- **Mục tiêu**: Chuyển ngữ toàn bộ kho sách hướng dẫn OpenClaw sang tiếng Việt, văn phong kỹ thuật tự nhiên, chính xác, phù hợp với kỹ sư phần mềm và kỹ sư AI tại Việt Nam.
- **Phạm vi repo**: `dino-edu/openclaw_guide` (repo cá nhân đã fork, tự do commit & push lên `origin/main`).
- **Hình thức tổ chức**: Dịch đè trực tiếp (In-place replacement) toàn bộ 112 file Markdown và cấu hình dự án liên quan.

---

## 1. Bối cảnh & Mục tiêu

### 1.1 Hiện trạng
Kho tài liệu hiện tại gồm 112 file Markdown (~12.500 dòng, hơn 410.000 ký tự tiếng Trung), bao gồm:
- 4 phần chính chia thành 16 chương kỹ thuật (từ cài đặt cơ bản đến nguyên lý Gateway, Agent Loop và tích hợp hệ sinh thái AI).
- 11 file phụ lục (A–J) gồm thuật ngữ, API reference, cấu hình mẫu, cây quyết định sự cố.
- Cấu hình xuất bản GitBook/mdPress (`book.json`), scripts tạo PDF/HTML và bộ kiểm thử tự động (`check_project_rules.py`, `pytest`).

### 1.2 Mục tiêu đạt được (Goals)
1. **Việt hóa 100% nội dung sách**: Toàn bộ tiêu đề chương, mục, đoạn văn diễn giải, bảng so sánh và sơ đồ được chuyển ngữ tự nhiên sang tiếng Việt.
2. **Chuẩn hóa thuật ngữ kỹ thuật**: Áp dụng nguyên tắc dịch kỹ thuật kết hợp chú thích thuật ngữ tiếng Anh gốc trong ngoặc đơn ở các vị trí quan trọng.
3. **Bảo toàn toàn vẹn kỹ thuật (100% Invariants)**:
   - Giữ nguyên 100% mã nguồn trong code block, tên biến, JSON key, câu lệnh CLI (`openclaw ...`, `npm ...`, `docker ...`).
   - Giữ nguyên cấu trúc đường dẫn tương đối giữa các file Markdown, không làm gãy liên kết nội bộ.
   - Giữ nguyên cú pháp cấu trúc sơ đồ Mermaid, chỉ dịch nhãn hiển thị trực quan.
4. **Kiểm thử & CI xanh 100%**: `python3 check_project_rules.py` và `pytest` vượt qua kiểm tra ở mọi chặng.
5. **Triển khai cuốn chiếu minh bạch**: Commit và push theo từng phần hoàn chỉnh để người dùng có thể theo dõi và đọc ngay trên GitHub.

---

## 2. Quy chuẩn văn phong & Bảng thuật ngữ (Style Guide & Glossary)

### 2.1 Quy tắc hành văn
- **Văn phong**: Khách quan, súc tích, văn phong kỹ sư IT (trực diện, mạch lạc, dễ hiểu).
- **Thuật ngữ có thể dịch nghĩa**: Luôn kèm theo thuật ngữ tiếng Anh gốc trong ngoặc đơn ở lần xuất hiện hoặc ở các tiêu đề quan trọng.
  - Ví dụ: *Ngữ cảnh (Context)*, *Cơ chế ghi nhớ (Memory)*, *Ngân sách cửa sổ (Window Budget)*, *Lưu trữ trạng thái (Persistence)*, *Chuỗi dự phòng (Fallback chain)*, *Hàng rào bảo vệ (Guardrails)*, *Tiến trình chạy ngầm (Daemon)*.
- **Thuật ngữ giữ nguyên không dịch**: Các định danh công nghệ đã trở thành chuẩn quốc tế: *Agent*, *Gateway*, *Prompt*, *Token*, *Hook*, *Cron job*, *Heartbeat*, *Plugin*, *Skill*, *MCP*, *Node.js*, *Docker*.

### 2.2 Bảng ánh xạ thuật ngữ cốt lõi (Core Glossary)
| Tiếng Trung gốc | Tiếng Anh kỹ thuật | Tiếng Việt quy chuẩn |
| :--- | :--- | :--- |
| 智能体 / AI 智能体 | Agent / AI Agent | **Agent** (hoặc "Agent AI") |
| 网关 / 控制平面 | Gateway / Control Plane | **Gateway** / **Mặt phẳng điều khiển (Control Plane)** |
| 提示词 / 结构化注入 | Prompt / Prompt Injection | **Prompt** / **Tấn công chèn prompt (Prompt injection)** |
| 上下文 / 窗口预算 | Context / Window Budget | **Ngữ cảnh (Context)** / **Ngân sách context (Window budget)** |
| 记忆机制 / 会话状态 | Memory / Session State | **Cơ chế ghi nhớ (Memory)** / **Trạng thái phiên (Session state)** |
| 状态持久化 | State Persistence | **Lưu trữ trạng thái bền vững (Persistence)** |
| 故障转移 / 回退链路 | Failover / Fallback Chain | **Chuyển đổi dự phòng (Failover)** / **Chuỗi dự phòng (Fallback chain)** |
| 防护栏 / 工具策略 | Guardrails / Tool Policy | **Hàng rào bảo vệ (Guardrails)** / **Chính sách công cụ (Tool policy)** |
| 心跳机制 / 周期巡检 | Heartbeat / Periodic Check | **Cơ chế nhịp tim (Heartbeat)** / **Tuần tra định kỳ** |
| 探针 / 守护进程 | Probe / Daemon | **Đầu dò (Probe)** / **Tiến trình chạy ngầm (Daemon)** |
| 广播组 / 子智能体 | Broadcast Group / Sub-agent | **Nhóm phát sóng (Broadcast group)** / **Sub-agent (Agent phụ)** |
| 幂等性 / 一致性 | Idempotency / Consistency | **Tính bất biến (Idempotency)** / **Tính nhất quán (Consistency)** |

---

## 3. Kế hoạch phân kỳ thực thi (Phased Execution Plan)

### Bước 0: Nền tảng cấu hình & Điều hướng (4 file)
- `book.json`: Đổi tiêu đề sang *"OpenClaw: Từ Nhập Môn Đến Tinh Thông"*, mã ngôn ngữ `vi`, dịch liên kết sidebar.
- `README.md`: Trang chủ tổng quan cuốn sách tiếng Việt, cập nhật bảng cấu trúc chương hồi và cách đọc.
- `SUMMARY.md`: Mục lục toàn bộ 16 chương và 11 phụ lục sang tiếng Việt, giữ nguyên đường dẫn file.
- `CONTRIBUTING.md`: Hướng dẫn quy ước đóng góp bản dịch.

### Chặng 1: Phần I - Cơ sở nhập môn (Chương 01 – 04, 24 file)
- `01_overview/`: Giới thiệu OpenClaw, so sánh giải pháp, khái niệm cốt lõi, use case (6 file).
- `02_setup/`: Môi trường, cài đặt, wizard cấu hình ban đầu, dịch vụ Gateway (6 file).
- `03_minimal_loop/`: Giao diện Webchat, công cụ chẩn đoán, Agent Persona, phân quyền thiết bị (6 file).
- `04_config_models/`: Cấu hình openclaw.json, tích hợp Model Provider, định tuyến model, Failover (6 file).

### Chặng 2: Phần II - Tính năng nâng cao (Chương 05 – 08, 24 file)
- `05_tools_skills/`: Danh mục Tool, chính sách gọi tool, cơ chế Skill/Plugin, duyệt web tự động (6 file).
- `06_context_memory/`: Quản lý Session, dựng Context & ngân sách cửa sổ, cơ chế Memory, nén & cắt tỉa Context (6 file).
- `07_multi_agent/`: Tích hợp kênh (Telegram, WhatsApp, Lark/Feishu), điều hướng đơn sang đa Agent, mô hình cộng tác (6 file).
- `08_automation_ops/`: Hooks, tác vụ định kỳ (Cron jobs), Heartbeat, truy cập từ xa SSH/Zero Trust, baseline bảo mật (7 file).

### Chặng 3: Phần III - Nguyên lý lõi & Kỹ thuật triển khai (Chương 09 – 12, 25 file)
- `09_gateway_protocol/`: Kiến trúc Gateway, 5 mặt phẳng (Planes), kết nối WebSocket, tính bất biến, ghép nối kênh (6 file).
- `10_agent_loop/`: Nhân vòng lặp Agent Loop, nền tảng pi, hàng đợi & concurrency, ráp Prompt & chống injection, stream & retry (7 file).
- `11_reliability_security/`: Đa khóa xác thực, cooldown hạ nhiệt lỗi, fallback model, guardrails an toàn (5 file).
- `12_extension_engineering/`: Kiến trúc plugin, viết custom tool cô lập tác dụng phụ (side effects), kiểm thử & debug, blueprint vận hành (6 file).

### Chặng 4: Phần IV - Thực chiến, Tối ưu & Phụ lục (Chương 13 – 16 + Appendix, 35 file)
- `13_practical_cases/`: Case study Bot Lark/Slack, Bot CSKH, kịch bản ngành dọc (5 file).
- `14_performance_cost/`: Chi phí Token & Context, tối ưu độ trễ/throughput, template ngân sách (5 file).
- `15_troubleshooting_trees/`: Cây quyết định chẩn đoán sự cố, xử lý tải cao (3 file).
- `16_claude_ecosystem/`: Tích hợp Claude & MCP, điều phối đa Agent, OpenAI & Local LLM (5 file).
- `appendix/`: 11 file Phụ lục A đến J (Glossary, Config templates, Troubleshooting checklist, API/SDK reference, Command cheatsheet, Version mapping, Reading list, Env check, Naming history, Volatile facts).

---

## 4. Kiểm soát chất lượng & Kiểm thử (Verification & QA)

1. **Kiểm tra liên kết nội bộ & định dạng code block**:
   Chạy `python3 check_project_rules.py` để xác minh không có code block nào bị mở dở dang và toàn bộ link nội bộ giữa các file Markdown đều hợp lệ.
2. **Kiểm tra hiển thị sơ đồ Mermaid**:
   Đảm bảo các nhãn trong `graph`, `sequenceDiagram`, `flowchart` không làm vỡ cú pháp ký tự đặc biệt của Mermaid.
3. **Thích ứng bộ kiểm thử typography**:
   Cập nhật `tests/test_cjk_typography.py` để loại trừ các file đã được Việt hóa (không còn chứa chữ CJK), đảm bảo `pytest` luôn đạt kết quả `PASSED`.
4. **Quy trình Git & Commit**:
   Sau mỗi chặng hoàn thành, thực hiện kiểm tra `pytest` $\to$ commit với thông điệp Conventional Commits rõ ràng $\to$ push trực tiếp lên `origin/main`.
