# Chương 13: Tuyển tập tình huống thực chiến

Chương này thông qua 2 bộ khung thiết kế thị phạm và một bảng đối chiếu ngành dọc chuyên sâu để minh họa quy trình triển khai tiệm tiến của OpenClaw từ vòng lặp tối thiểu cho tới môi trường sản xuất thực tế. Các đoạn cấu hình và mã plugin trong các tình huống được dùng để phân tích tư duy thiết kế kiến trúc, không nên xem là mã nguồn đóng gói sẵn có thể copy-paste chạy ngay. Mỗi tình huống thực chiến đều tuân thủ cấu trúc 5 giai đoạn chuẩn mực: Định nghĩa bài toán → Vòng lặp tối thiểu → Bóc tách cấu hình phân tầng → Checklist nghiệm thu & Điểm sự cố → Chỉ dẫn mở rộng sản xuất.

## Mục lục hướng dẫn chương

- **[13.1 Tình huống thực tế: Trợ lý công việc nhóm Lark/Slack cho doanh nghiệp](13.1_lark_slack_workbot.md)**: Trợ lý thông minh cho đội ngũ kỹ thuật 30 người, bắt đầu từ tệp `openclaw.json` tối giản rồi lần lượt chồng lớp phân quyền, công cụ và năng lực kiểm toán.
- **[13.2 Tình huống thực tế: Agent hỗ trợ khách hàng](13.2_customer_support_agent.md)**: Kịch bản CSKH cho sản phẩm B2B SaaS, từ tự động trả lời FAQ mở rộng dần sang tạo ticket leo thang, làm mờ thông tin cá nhân (PII Masking) và hỗ trợ đa ngôn ngữ.
- **[13.3 Ứng dụng ngành dọc: Đối chiếu kịch bản & Sự khác biệt trọng yếu](13.3_vertical_industry_cases.md)**: Đối chiếu yêu cầu tuân thủ, trạm kiểm duyệt an toàn và checklist thích ứng của 4 ngành: Tài chính, Y tế, Giáo dục và Thương mại điện tử.
- **[13.4 Tóm tắt chương](summary.md)**: Điểm lại các ý chính và liên kết sang chương tiếp theo.
