# Chương 16: Tích hợp hệ sinh thái AI chủ lưu

Chương này giới thiệu các thực tiễn tích hợp giữa OpenClaw và các hệ sinh thái mô hình AI chủ lưu hàng đầu hiện nay, bao gồm Anthropic Claude, OpenAI, cùng các giải pháp chạy mô hình cục bộ đại diện bởi Ollama. Chương 4 đã giải thích cách kết nối nhà cung cấp và cấu hình Fallback cơ bản; chương này sẽ tập trung vào các năng lực đặc thù của từng hệ sinh thái, các điểm then chốt khi kết nối, và mô hình thực hành để quản trị thống nhất đa hệ sinh thái trên OpenClaw.

## Mục lục hướng dẫn chương

- **[16.1 Kết nối mô hình Claude & Tích hợp hệ sinh thái MCP](16.1_claude_integration.md)**: Các điểm then chốt khi lựa chọn gia đình mô hình Claude, phương thức cấu hình trên OpenClaw, kết nối MCP Server và triển khai hỗn hợp đa nhà cung cấp.
- **[16.2 Mô hình cộng tác & Điều phối đa Agent (Multi-Agent Orchestration)](16.2_agent_team_integration.md)**: Định tuyến xác định dựa trên `agentId`, `accountId`, `bindings` và ủy thác tác vụ qua `sessions_spawn`; 3 mô hình cộng tác: Nối tiếp (Serial), Song song (Parallel) và Định tuyến (Routing); các ràng buộc kỹ thuật và mối quan hệ tương hỗ với Agent SDK.
- **[16.3 Tích hợp OpenAI & Mô hình cục bộ (Local LLM)](16.3_other_ecosystems.md)**: Kết nối mô hình OpenAI, triển khai mô hình cục bộ qua Ollama, chiến lược hỗn hợp đa hệ sinh thái.
- **[16.4 Tóm tắt chương](summary.md)**: Các kết luận trọng yếu và tài nguyên mở rộng.
