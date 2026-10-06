# Kế hoạch thực thi Việt hóa toàn diện kho tài liệu 《OpenClaw 入门到精通》

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Chuyển ngữ toàn bộ 112 tài liệu Markdown của cuốn sách OpenClaw sang tiếng Việt với văn phong kỹ thuật tự nhiên, chuẩn xác, bảo toàn 100% cú pháp code, liên kết nội bộ, và sơ đồ Mermaid.

**Architecture:** Thực thi theo phương thức cuốn chiếu (phân kỳ 4 Chặng tương ứng 4 Phần lớn + Bước Nền tảng + Bước Phụ lục). Sau mỗi chặng chạy kiểm tra tính toàn vẹn của Markdown, liên kết nội bộ, chạy bộ test tự động và commit/push lên `origin/main`.

**Tech Stack:** Markdown, GitBook / mdPress, Python 3 (`pytest`, `check_project_rules.py`), Mermaid JS, Git.

**Spec:** `docs/superpowers/specs/2026-10-06-vietnamese-translation-design.md`

## Global Constraints

- **Hình thức tổ chức:** Thay thế trực tiếp (In-place replacement) trong toàn bộ các file Markdown hiện hữu.
- **Bảo toàn kỹ thuật (100% Code & Links):** Giữ nguyên toàn bộ code block trong ` ``` `, câu lệnh terminal (`npm`, `docker`, `openclaw ...`), tên biến môi trường, JSON key, và đường dẫn tương đối giữa các file.
- **Bảo toàn cú pháp Mermaid:** Giữ nguyên các từ khóa cấu trúc (`graph TD`, `sequenceDiagram`, `subgraph`...), chỉ dịch nhãn hiển thị trong `[ ]`, `( )`, `(( ))`.
- **Quy chuẩn thuật ngữ:** Dịch nghĩa kèm thuật ngữ tiếng Anh gốc trong ngoặc đơn (ví dụ: *Ngữ cảnh (Context)*, *Cơ chế ghi nhớ (Memory)*, *Ngân sách cửa sổ (Window Budget)*, *Tiến trình chạy ngầm (Daemon)*...). Giữ nguyên định danh chuẩn quốc tế (*Agent*, *Gateway*, *Prompt*, *Token*, *Hook*, *Cron job*, *Heartbeat*).
- **Trạng thái kiểm thử:** Lệnh `python3 check_project_rules.py` và `pytest` phải đạt 100% PASSED sau mỗi chặng.

## Review Focus

1. **Gãy liên kết nội bộ (Broken relative links):** Khi dịch tiêu đề mục lục trong `SUMMARY.md` hoặc các file, đường dẫn file và anchor `#` phải khớp chính xác với file đích.
2. **Lỗi cú pháp Mermaid:** Các nhãn tiếng Việt chứa dấu ngoặc hoặc ký tự đặc biệt có thể làm vỡ cú pháp sơ đồ Mermaid nếu không được bọc chuỗi đúng quy cách.
3. **Mã code bị dịch nhầm:** Các lệnh CLI hoặc JSON config mẫu bị chuyển ngữ nhầm sang tiếng Việt khiến người đọc copy-paste không chạy được.
4. **Vỡ bộ kiểm thử typography (`test_cjk_typography.py`):** File đã dịch sang tiếng Việt không còn chứa chữ CJK nên kiểm tra khoảng cách CJK/Latin không được báo lỗi sai vị trí.
5. **Dịch sót file hoặc đoạn văn:** Đảm bảo toàn bộ 112 file đều được chuyển ngữ đầy đủ, không để sót các đoạn tiếng Trung xen lẫn.

---

### Task 0: Thiết lập nền tảng cấu hình, điều hướng và bộ test

**Files:**
- Modify: `book.json`
- Modify: `README.md`
- Modify: `SUMMARY.md`
- Modify: `CONTRIBUTING.md`
- Modify: `tests/test_cjk_typography.py`

**Interfaces:**
- Consumes: Cấu hình và mục lục gốc của sách.
- Produces: `book.json` đã đặt ngôn ngữ `vi`, `README.md` và `SUMMARY.md` hoàn toàn bằng tiếng Việt; `tests/test_cjk_typography.py` chỉ quét các file còn chứa chữ CJK để test suite tiếp tục xanh trong suốt quá trình cuốn chiếu.

- [ ] **Step 1: Cập nhật `tests/test_cjk_typography.py` để hỗ trợ quá trình chuyển đổi ngôn ngữ**
Điều chỉnh logic quét: bỏ qua các file không còn chứa ký tự CJK (Unicode block `一-鿿㐀-䶿`).

- [ ] **Step 2: Chạy kiểm thử để đảm bảo test suite hiện tại vượt qua**
Run: `pytest tests/test_cjk_typography.py -v`
Expected: 9 passed.

- [ ] **Step 3: Cập nhật `book.json`**
Đổi tiêu đề sang `"OpenClaw: Từ Nhập Môn Đến Tinh Thông"`, `language`: `"vi"`, dịch nhãn liên kết sidebar sang tiếng Việt.

- [ ] **Step 4: Chuyển ngữ `README.md`, `SUMMARY.md`, `CONTRIBUTING.md` sang tiếng Việt**
Dịch tiêu đề các chương, bảng tổng quan, hướng dẫn đóng góp và liên kết mục lục. Giữ nguyên toàn bộ đường dẫn relative link.

- [ ] **Step 5: Chạy công cụ kiểm tra quy tắc dự án và bộ test**
Run: `python3 check_project_rules.py && pytest`
Expected: Không có cảnh báo unclosed fence hay broken link, 32 passed.

- [ ] **Step 6: Commit và push bước nền tảng**
```bash
git add book.json README.md SUMMARY.md CONTRIBUTING.md tests/test_cjk_typography.py
git commit -m "chore(i18n): thiết lập nền tảng cấu hình và mục lục tiếng Việt"
git push origin main
```

---

### Task 1: Chuyển ngữ Phần I - Cơ sở nhập môn (Chương 01 – 04)

**Files:**
- Modify: `01_overview/*.md` (6 file: `README.md`, `1.1_what_is_openclaw.md`, `1.2_scenarios_comparison.md`, `1.3_concepts.md`, `1.4_use_cases.md`, `summary.md`)
- Modify: `02_setup/*.md` (6 file: `README.md`, `2.1_requirements.md`, `2.2_installation.md`, `2.3_onboarding.md`, `2.4_gateway_service.md`, `summary.md`)
- Modify: `03_minimal_loop/*.md` (6 file: `README.md`, `3.1_control_ui_webchat.md`, `3.2_diagnostics.md`, `3.3_agent_persona.md`, `3.4_pairing_groups.md`, `summary.md`)
- Modify: `04_config_models/*.md` (6 file: `README.md`, `4.1_config_system.md`, `4.2_provider_access.md`, `4.3_model_selection.md`, `4.4_failover.md`, `summary.md`)

**Interfaces:**
- Consumes: Thuật ngữ quy chuẩn từ Bảng Glossary (Task 0).
- Produces: 24 file Markdown tiếng Việt hoàn chỉnh thuộc Phần I.

- [ ] **Step 1: Dịch Chương 01 (Tổng quan về OpenClaw - 6 file)**
Dịch khái niệm, phân tích ưu nhược điểm so sánh, use cases. Bảo toàn sơ đồ Mermaid so sánh kiến trúc.

- [ ] **Step 2: Dịch Chương 02 (Môi trường & Cài đặt - 6 file)**
Dịch hướng dẫn cài đặt trên Linux/macOS/Windows, cấu hình Gateway daemon, kiểm tra môi trường. Giữ nguyên 100% lệnh CLI.

- [ ] **Step 3: Dịch Chương 03 (Vòng lặp tối thiểu & Hội thoại đầu tiên - 6 file)**
Dịch hướng dẫn dùng Webchat UI, câu lệnh chẩn đoán `openclaw doctor`, cấu hình Agent Persona, ghép nối thiết bị.

- [ ] **Step 4: Dịch Chương 04 (Cấu hình hệ thống & Quản trị Model - 6 file)**
Dịch giải thích cấu trúc `openclaw.json`, cách kết nối các Model Provider (Claude, OpenAI, Ollama), cấu hình fallback và cơ chế Failover.

- [ ] **Step 5: Xác minh tính toàn vẹn cú pháp và liên kết**
Run: `python3 check_project_rules.py && pytest`
Expected: 0 issues, 100% tests passed.

- [ ] **Step 6: Commit và push Phần I**
```bash
git add 01_overview/ 02_setup/ 03_minimal_loop/ 04_config_models/
git commit -m "docs(i18n): chuyển ngữ Phần I - Cơ sở nhập môn (Chương 01-04)"
git push origin main
```

---

### Task 2: Chuyển ngữ Phần II - Tính năng nâng cao (Chương 05 – 08)

**Files:**
- Modify: `05_tools_skills/*.md` (6 file: `README.md`, `5.1_tool_inventory.md`, `5.2_tool_policy.md`, `5.3_skills_plugins.md`, `5.4_browser_nodes.md`, `summary.md`)
- Modify: `06_context_memory/*.md` (6 file: `README.md`, `6.1_sessions.md`, `6.2_context_building.md`, `6.3_memory_mechanism.md`, `6.4_compaction_pruning.md`, `summary.md`)
- Modify: `07_multi_agent/*.md` (6 file: `README.md`, `7.1_telegram_whatsapp.md`, `7.2_lark_integration.md`, `7.3_routing_basics.md`, `7.4_collaboration_patterns.md`, `summary.md`)
- Modify: `08_automation_ops/*.md` (6 file: `README.md`, `8.1_hooks.md`, `8.2_cron_jobs.md`, `8.3_heartbeat.md`, `8.4_remote_access.md`, `8.5_security_baseline.md`, `summary.md`)

**Interfaces:**
- Consumes: Nội dung và quy chuẩn từ Phần I.
- Produces: 24 file Markdown tiếng Việt hoàn chỉnh thuộc Phần II.

- [ ] **Step 1: Dịch Chương 05 (Hệ thống Tool, Skill & Plugin - 6 file)**
Dịch danh mục tool có sẵn, chính sách allow/deny, tích hợp skill từ thư viện, tự động hóa trình duyệt web.

- [ ] **Step 2: Dịch Chương 06 (Phiên, Ngữ cảnh & Bộ nhớ - 6 file)**
Dịch mô hình session, cách tính ngân sách Context window, cơ chế memory (đọc/ghi/hết hạn), thuật toán nén và cắt tỉa ngữ cảnh.

- [ ] **Step 3: Dịch Chương 07 (Phân phối đa kênh & Đa Agent - 6 file)**
Dịch tích hợp Telegram, WhatsApp, Lark/Feishu; nguyên lý điều hướng tin nhắn; mô hình cộng tác Sub-agent và nhóm broadcast.

- [ ] **Step 4: Dịch Chương 08 (Tự động hóa & An toàn vận hành - 6 file)**
Dịch vòng đời Hooks, lên lịch định kỳ (Cron jobs), cơ chế Heartbeat tuần tra, truy cập từ xa SSH/Zero Trust, baseline bảo mật.

- [ ] **Step 5: Xác minh tính toàn vẹn cú pháp và liên kết**
Run: `python3 check_project_rules.py && pytest`
Expected: 0 issues, 100% tests passed.

- [ ] **Step 6: Commit và push Phần II**
```bash
git add 05_tools_skills/ 06_context_memory/ 07_multi_agent/ 08_automation_ops/
git commit -m "docs(i18n): chuyển ngữ Phần II - Tính năng nâng cao (Chương 05-08)"
git push origin main
```

---

### Task 3: Chuyển ngữ Phần III - Nguyên lý lõi & Kỹ thuật triển khai (Chương 09 – 12)

**Files:**
- Modify: `09_gateway_protocol/*.md` (7 file: `README.md`, `9.1_architecture_overview.md`, `9.2_control_plane.md`, `9.3_ws_handshake.md`, `9.4_event_idempotency.md`, `9.5_pairing_trust.md`, `summary.md`)
- Modify: `10_agent_loop/*.md` (8 file: `README.md`, `10.1_request_lifecycle.md`, `10.2_pi_framework.md`, `10.3_entry_queue.md`, `10.4_prompt_assembly.md`, `10.5_tool_execution.md`, `10.6_streaming_retry.md`, `summary.md`)
- Modify: `11_reliability_security/*.md` (6 file: `README.md`, `11.1_auth_profiles.md`, `11.2_rotation_cooldown.md`, `11.3_fallback_rules.md`, `11.4_guardrails.md`, `summary.md`)
- Modify: `12_extension_engineering/*.md` (7 file: `README.md`, `12.1_plugin_architecture.md`, `12.2_custom_tools.md`, `12.3_testing_debugging.md`, `12.4_production_blueprint.md`, `12.5_framework_interoperability.md`, `summary.md`)

**Interfaces:**
- Consumes: Bảng thuật ngữ chuyên sâu về kiến trúc hệ thống (Control Plane, Agent Loop, Gateway Protocol).
- Produces: 28 file Markdown tiếng Việt chi tiết thuộc Phần III.

- [ ] **Step 1: Dịch Chương 09 (Mặt phẳng điều khiển Gateway & Giao thức - 7 file)**
Dịch kiến trúc 5 mặt phẳng, quy trình bắt tay WebSocket, bảo đảm tính bất biến của sự kiện (Idempotency), ghép nối tin cậy.

- [ ] **Step 2: Dịch Chương 10 (Nhân vòng lặp Agent Loop - 8 file)**
Dịch luồng xử lý request, khung nền tảng pi, hàng đợi vào & concurrency, cấu trúc ráp prompt & chống injection, thực thi tool, streaming & retry.

- [ ] **Step 3: Dịch Chương 11 (Độ tin cậy & Cơ chế an toàn - 6 file)**
Dịch cơ chế xoay tua khóa API (Auth profiles), cơ chế hạ nhiệt sự cố (Cooldown), chuỗi fallback, hàng rào bảo vệ (Guardrails).

- [ ] **Step 4: Dịch Chương 12 (Kỹ thuật mở rộng plugin - 7 file)**
Dịch kiến trúc plugin, viết custom tool cô lập side effects, quy trình testing/debug có thể replay, blueprint vận hành thực tế.

- [ ] **Step 5: Xác minh tính toàn vẹn cú pháp và liên kết**
Run: `python3 check_project_rules.py && pytest`
Expected: 0 issues, 100% tests passed.

- [ ] **Step 6: Commit và push Phần III**
```bash
git add 09_gateway_protocol/ 10_agent_loop/ 11_reliability_security/ 12_extension_engineering/
git commit -m "docs(i18n): chuyển ngữ Phần III - Nguyên lý lõi & Kỹ thuật triển khai (Chương 09-12)"
git push origin main
```

---

### Task 4: Chuyển ngữ Phần IV - Thực chiến & Tối ưu (Chương 13 – 16)

**Files:**
- Modify: `13_practical_cases/*.md` (5 file: `README.md`, `13.1_lark_slack_workbot.md`, `13.2_customer_support_agent.md`, `13.3_vertical_industry_cases.md`, `summary.md`)
- Modify: `14_performance_cost/*.md` (6 file: `README.md`, `14.1_token_context_cost.md`, `14.2_latency_throughput.md`, `14.3_usage_budget.md`, `14.4_budget_templates.md`, `summary.md`)
- Modify: `15_troubleshooting_trees/*.md` (4 file: `README.md`, `15.1_diagnostic_decision_trees.md`, `15.2_high_concurrency_diagnosis.md`, `summary.md`)
- Modify: `16_claude_ecosystem/*.md` (5 file: `README.md`, `16.1_claude_integration.md`, `16.2_agent_team_integration.md`, `16.3_other_ecosystems.md`, `summary.md`)

**Interfaces:**
- Consumes: Toàn bộ kiến thức lý thuyết từ Phần I–III.
- Produces: 20 file Markdown tiếng Việt chi tiết thuộc Phần IV.

- [ ] **Step 1: Dịch Chương 13 (Tập hợp ca thực chiến - 5 file)**
Dịch case study Bot Lark/Slack cho doanh nghiệp, Agent hỗ trợ khách hàng tự động, use cases chuyên sâu cho ngành y tế/tài chính.

- [ ] **Step 2: Dịch Chương 14 (Tối ưu hiệu năng & chi phí - 6 file)**
Dịch phân tích chi phí Token/Context, tối ưu độ trễ và throughput, kiểm soát ngân sách, template bảng tính chi phí theo quy mô.

- [ ] **Step 3: Dịch Chương 15 (Cây quyết định chẩn đoán sự cố - 4 file)**
Dịch cây quyết định xử lý lỗi theo từng tầng, chẩn đoán lỗi trong tình huống tải cao.

- [ ] **Step 4: Dịch Chương 16 (Tích hợp hệ sinh thái AI chủ lưu - 5 file)**
Dịch tích hợp Claude & MCP, điều phối đa Agent phức tạp, tích hợp OpenAI và mô hình cục bộ (Local LLM qua Ollama/vLLM).

- [ ] **Step 5: Xác minh tính toàn vẹn cú pháp và liên kết**
Run: `python3 check_project_rules.py && pytest`
Expected: 0 issues, 100% tests passed.

- [ ] **Step 6: Commit và push Phần IV**
```bash
git add 13_practical_cases/ 14_performance_cost/ 15_troubleshooting_trees/ 16_claude_ecosystem/
git commit -m "docs(i18n): chuyển ngữ Phần IV - Thực chiến & Tối ưu (Chương 13-16)"
git push origin main
```

---

### Task 5: Chuyển ngữ Phụ lục (Appendix A – J)

**Files:**
- Modify: `appendix/*.md` (11 file: `README.md`, `glossary.md`, `config_templates.md`, `troubleshooting_checklist.md`, `api_reference.md`, `command_cheatsheet.md`, `version_mapping.md`, `reading_list.md`, `env_check.md`, `naming_history.md`, `volatile_facts.md`)

**Interfaces:**
- Consumes: Thuật ngữ thống nhất trên toàn bộ cuốn sách.
- Produces: 11 file Phụ lục tiếng Việt chuẩn mực.

- [ ] **Step 1: Dịch Phụ lục A (Thuật ngữ) & B (Cấu hình mẫu)**
Chuyển đổi bảng thuật ngữ đối chiếu 3 thứ tiếng Trung - Anh - Việt; dịch phần giải thích trong các file cấu hình JSON/YAML mẫu.

- [ ] **Step 2: Dịch Phụ lục C (Checklist sự cố) & D (Tham chiếu API/SDK)**
Dịch các bước kiểm tra sự cố khẩn cấp, tài liệu mô tả endpoint API và SDK methods.

- [ ] **Step 3: Dịch Phụ lục E (Sổ tay lệnh) & F (Lịch sử phiên bản & Nâng cấp)**
Dịch bảng tra cứu nhanh lệnh CLI và hướng dẫn di trú giữa các phiên bản.

- [ ] **Step 4: Dịch Phụ lục G (Tài liệu đọc thêm), H (Script tự kiểm tra), I (Lịch sử đặt tên) & J (Bảng kiểm tra thực tế)**
Dịch danh mục tài liệu mở rộng, script tự kiểm tra môi trường, lịch sử đổi tên OpenClaw và bảng kiểm tra các thông tin dễ thay đổi (`volatile_facts.md`). Đảm bảo metadata trong `volatile_facts.md` giữ đúng định dạng để script `check_project_rules.py` kiểm tra hợp lệ.

- [ ] **Step 5: Xác minh toàn bộ các file phụ lục**
Run: `python3 check_project_rules.py && pytest`
Expected: 0 issues, 100% tests passed.

- [ ] **Step 6: Commit và push Phụ lục**
```bash
git add appendix/
git commit -m "docs(i18n): chuyển ngữ Phụ lục A-J sang tiếng Việt"
git push origin main
```

---

### Task 6: Rà soát tính nhất quán toàn diện & Nghiệm thu xuất bản

**Files:**
- Audit & Review: Toàn bộ 112 file Markdown trong repo.
- Verify: Các script build `tools/build_pdf.py`, `tools/render_mermaid.py`, `tools/build_html_reader.py`.

**Interfaces:**
- Consumes: Toàn bộ tài liệu tiếng Việt đã dịch xong.
- Produces: Kho tài liệu hoàn chỉnh, không còn tồn dư đoạn văn tiếng Trung chưa dịch, link hợp lệ 100%, test suite xanh 100%.

- [ ] **Step 1: Quét kiểm tra ký tự tiếng Trung còn sót lại trong các file nội dung**
Chạy script kiểm tra xem còn file nào sót đoạn văn tiếng Trung cần hoàn thiện hay không.

- [ ] **Step 2: Chạy kiểm tra quy tắc Markdown toàn diện**
Run: `python3 check_project_rules.py`
Expected: 0 issues.

- [ ] **Step 3: Chạy toàn bộ test suite dự án**
Run: `pytest -v`
Expected: Tất cả 32 tests (hoặc các test đã cập nhật) PASSED.

- [ ] **Step 4: Kiểm tra khả năng tạo reader/artifact**
Run: `python3 tools/build_html_reader.py` (nếu môi trường có dependencies) hoặc xác minh file artifact đầu ra.

- [ ] **Step 5: Commit và push lần nghiệm thu cuối cùng**
```bash
git add .
git commit -m "docs(i18n): rà soát nhất quán toàn diện và hoàn tất bản dịch tiếng Việt"
git push origin main
```
