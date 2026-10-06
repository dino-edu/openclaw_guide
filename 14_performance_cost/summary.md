## 14.5 Tóm tắt chương

> **Lưu ý**: Dữ liệu giá cước trong chương này căn cứ theo bảng giá API chính thức của các nhà cung cấp. Giá mô hình AI có sự biến động thường xuyên, vui lòng đối soát trực tiếp tại:
> - [Bảng giá chính thức của Anthropic](https://platform.claude.com/docs/en/about-claude/pricing)
> - [Bảng giá chính thức của OpenAI](https://openai.com/api/pricing/)

Chương 14 đã tiếp cận từ 4 chiều kích: Tiêu thụ Token, Độ trễ suy luận, Quan sát lượng dùng và Quy hoạch ngân sách, cung cấp phương án tối ưu hóa hiệu năng và kiểm soát chi phí vững chắc.

### Điểm lại các ý chính

- **Chi phí Token & Ngữ cảnh** (14.1): Tinh gọn prompt hệ thống, phân bổ công cụ theo Agent, nén ngữ cảnh qua `compaction` và `contextPruning`, kết hợp phân tầng mô hình qua `agents.defaults.model.primary` / `fallbacks`.
- **Tối ưu độ trễ & Thông lượng** (14.2): Độ trễ cấu thành từ 4 đoạn: Suy luận LLM, I/O công cụ, Thực thi Sandbox và Chi phí điều phối; tối ưu qua chuỗi fallback, song song hóa công cụ và dùng `/trace on` kết hợp `logs --follow --json` để định vị điểm nghẽn.
- **Quan sát mức tiêu thụ & Kiểm soát ngân sách** (14.3): Dùng các lệnh `/status`, `/usage cost`, `openclaw gateway usage-cost`, `/compact` và trang Usage trên Dashboard để theo dõi chi phí; kết hợp trần chi tiêu cứng trên trang quản trị của provider.
- **Bản mẫu ngân sách triển khai** (14.4): Dự toán theo 3 quy mô Cá nhân (~$39–75/tháng), Nhóm vừa (~$1100–1500/tháng), và Doanh nghiệp lớn (~$27K–35K/tháng).

### Checklist tối ưu hóa

1. Bạn đã thiết lập đường cơ sở Token/Chi phí qua `/usage cost`, `openclaw gateway usage-cost` hoặc trang Usage trên Dashboard chưa?
2. Prompt hệ thống đã được tinh gọn về mức tối thiểu cần thiết chưa?
3. Các Agent đã được phân bổ công cụ và mô hình khác biệt hóa theo đúng chức năng chưa?
4. Chiến lược `compaction` và `contextPruning` đã được kích hoạt và tinh chỉnh hợp lý chưa?
5. Chuỗi fallback mô hình đã được thiết lập để loại bỏ điểm nghẽn đơn lẻ chưa?
6. Bạn đã có quy trình kiểm toán chi phí định kỳ hàng tuần chưa?

### Bước tiếp theo

[Chương 15](../15_troubleshooting_trees/README.md) sẽ cung cấp Cây quyết định chẩn đoán các sự cố thường gặp, và [Chương 16](../16_claude_ecosystem/README.md) giới thiệu việc tích hợp chuyên sâu với hệ sinh thái AI.

---

> **Phát hiện lỗi hoặc có đề xuất cải tiến?** Hoan nghênh bạn gửi [Issue](https://github.com/yeasy/openclaw_guide/issues) hoặc [Pull Request](https://github.com/yeasy/openclaw_guide/pulls).
