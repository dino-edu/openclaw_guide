# Chương 15: Cây quyết định chẩn đoán sự cố

Chương này thông qua hình thức các cây quyết định (Decision Trees) để cung cấp quy trình chẩn đoán sự cố có hệ thống, giúp bạn nhanh chóng định vị và giải quyết các vấn đề thường gặp trong quá trình vận hành OpenClaw.

> Tra cứu nhanh: [Phụ lục C: Bảng kiểm tra xử lý sự cố](../appendix/troubleshooting_checklist.md) cung cấp bảng tra cứu nhanh theo loại sự cố; [Phụ lục E: Sổ tay tra cứu lệnh nhanh](../appendix/command_cheatsheet.md) liệt kê đầy đủ cú pháp của toàn bộ câu lệnh chẩn đoán.

## Mục lục hướng dẫn chương

- **[15.1 Chẩn đoán sự cố thường gặp theo phân tầng](15.1_diagnostic_decision_trees.md)**: Bao phủ lộ trình chẩn đoán phân tầng cho 6 nhóm sự cố lớn: Lỗi khởi động, Tiếp nhận tin nhắn, Gọi mô hình AI, Thực thi công cụ, Bộ nhớ phiên và Suy giảm hiệu năng.
- **[15.2 Cây quyết định chẩn đoán lỗi tải cao & Hướng dẫn tối ưu](15.2_high_concurrency_diagnosis.md)**: Chuyên sâu cho các kịch bản tải cao: Giới hạn đồng thời, cạn kiệt connection pool, ùn tắc hàng đợi và sự cố đổ vỡ dây chuyền (Cascading failures).
- **[15.3 Tóm tắt chương](summary.md)**: Các thực hành chẩn đoán tốt nhất và checklist tự kiểm tra.
