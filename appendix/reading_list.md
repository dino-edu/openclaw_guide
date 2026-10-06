## Phụ lục G: Danh mục tài liệu đọc thêm & Tham khảo (Reading List)

Mục này tổng hợp các tài liệu đọc thêm nâng cao, các bài báo khoa học lý thuyết và các dự án mã nguồn mở liên quan đến OpenClaw, phục vụ cho việc nghiên cứu chuyên sâu.

### G.1 Tài liệu cốt lõi chính thức

Nội dung cuốn sách tham chiếu trực tiếp từ các tài liệu và thông báo phát hành chính thức:

- [Trang chủ OpenClaw](https://openclaw.ai/)
- [Kho mã nguồn GitHub OpenClaw](https://github.com/openclaw/openclaw)
- [Cổng tài liệu chính thức OpenClaw](https://docs.openclaw.ai/)
- Các tài liệu module trọng yếu:
  - [Bắt đầu nhanh (Getting Started)](https://docs.openclaw.ai/start/getting-started)
  - [Khởi tạo cấu hình (Onboard)](https://docs.openclaw.ai/start/wizard)
  - [Lệnh CLI: Health](https://docs.openclaw.ai/cli/health)
  - [Lệnh CLI: Status](https://docs.openclaw.ai/cli/status)
  - [Kiến trúc Gateway (Gateway Architecture)](https://docs.openclaw.ai/concepts/architecture)
  - [Công cụ tích hợp (Tools)](https://docs.openclaw.ai/tools)
  - [Nhà cung cấp mô hình (Model Providers)](https://docs.openclaw.ai/providers)
  - [Chuyển đổi dự phòng (Model Failover)](https://docs.openclaw.ai/concepts/model-failover)
  - [Vận hành Gateway (Gateway Runbook)](https://docs.openclaw.ai/gateway)
  - [Cấu hình an toàn (Security)](https://docs.openclaw.ai/gateway/security)
  - [Ghép nối thiết bị (Pairing)](https://docs.openclaw.ai/channels/pairing)
- Lịch sử các bản phát hành:
  - [OpenClaw Releases](https://github.com/openclaw/openclaw/releases)
  - [v2026.2.19 Release](https://github.com/openclaw/openclaw/releases/tag/v2026.2.19)
  - [v2026.1.29 Release](https://github.com/openclaw/openclaw/releases/tag/v2026.1.29)

### G.2 Các bài báo khoa học & Tổng quan lý thuyết

Để hiểu sâu cơ chế của các hệ thống AI Agent, khuyến nghị đọc các công trình nghiên cứu kinh điển sau:

- [ReAct: Synergizing Reasoning and Acting in Language Models (arXiv:2210.03629)](https://arxiv.org/abs/2210.03629)
- [Toolformer: Language Models Can Teach Themselves to Use Tools (arXiv:2302.04761)](https://arxiv.org/abs/2302.04761)
- [A survey on LLM-based autonomous agents (Front. Comput. Sci., 2024)](https://doi.org/10.1007/s11704-024-40231-1)
- [LLM Multi-agents Survey (IJCAI 2024)](https://www.ijcai.org/proceedings/2024/890)
- [Survey on Evaluation of LLM-based Agents (arXiv:2503.16416)](https://arxiv.org/abs/2503.16416)
- [Feedback Mechanism Survey (IJCAI 2025)](https://www.ijcai.org/proceedings/2025/1175)

### G.3 Sách bổ trợ & Các dự án liên quan

Các cẩm nang nguồn mở bổ trợ đắc lực:

- [Học AI từ số 0](https://github.com/yeasy/ai_beginner_guide): Nhập môn trí tuệ nhân tạo từ nền tảng.
- [Cẩm nang Agentic AI](https://github.com/yeasy/agentic_ai_guide): Tổng quan lý thuyết tiền phong và ứng dụng.
- [Cẩm nang Prompt Engineering](https://github.com/yeasy/prompt_engineering_guide): Kỹ thuật tối ưu hóa prompt có hệ thống.
- [Cẩm nang Context Engineering](https://github.com/yeasy/context_engineering_guide): Quản trị ngữ cảnh và tối ưu hóa bộ nhớ.
- [Cẩm nang Claude](https://github.com/yeasy/claude_guide): Hướng dẫn chuyên biệt cho hệ sinh thái Claude.
- [Cẩm nang An toàn AI](https://github.com/yeasy/ai_security_guide): Xây dựng an toàn bảo mật ở tầng ứng dụng mô hình lớn.

**Các framework Agent mã nguồn mở nổi tiếng khác**:
- [LangChain](https://github.com/langchain-ai/langchain): Framework phát triển ứng dụng suy luận nhận biết ngữ cảnh.
- [AutoGPT](https://github.com/Significant-Gravitas/AutoGPT): Dự án tiên phong về Agent tự chủ thực nghiệm.
- [MetaGPT](https://github.com/geekan/MetaGPT): Framework đa Agent đưa vào Quy trình vận hành chuẩn (SOP).
- [Dify](https://github.com/langgenius/dify): Nền tảng điều phối và phát triển ứng dụng LLM mạnh mẽ.
- [DSPy](https://github.com/stanfordnlp/dspy): Framework lập trình gọi mô hình của Đại học Stanford.

### Tài liệu tham khảo theo từng chương

- **[Chương 5](../05_tools_skills/README.md)**: [Builtin Tools](https://docs.openclaw.ai/tools) · [Config Tools](https://docs.openclaw.ai/gateway/config-tools)
- **[Chương 3](../03_minimal_loop/README.md)**: [CLI Dashboard](https://docs.openclaw.ai/cli/dashboard) · [CLI Health](https://docs.openclaw.ai/cli/health) · [Control UI](https://docs.openclaw.ai/web/control-ui) · [CLI Models](https://docs.openclaw.ai/cli/models) · [CLI Channels](https://docs.openclaw.ai/cli/channels) · [CLI Doctor](https://docs.openclaw.ai/cli/doctor) · [Pairing](https://docs.openclaw.ai/cli/pairing)
- **[Chương 6](../06_context_memory/README.md)**: [Session](https://docs.openclaw.ai/concepts/session) · [Config Agents](https://docs.openclaw.ai/gateway/config-agents) · [Session Pruning](https://docs.openclaw.ai/concepts/session-pruning) · [Memory](https://docs.openclaw.ai/concepts/memory) · [Compaction](https://docs.openclaw.ai/reference/memory-config)
- **[Chương 9](../09_gateway_protocol/README.md)**: [Gateway](https://docs.openclaw.ai/gateway) · [CLI Health](https://docs.openclaw.ai/cli/health) · [CLI Status](https://docs.openclaw.ai/cli/status)
- **[Chương 11](../11_reliability_security/README.md)**: [Configuration Reference](https://docs.openclaw.ai/gateway/configuration-reference#models) · [Multi-agent Sandbox Tools](https://docs.openclaw.ai/tools/multi-agent-sandbox-tools) · [Model Failover](https://docs.openclaw.ai/concepts/model-failover) · [Security](https://docs.openclaw.ai/gateway/security)
