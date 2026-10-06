## 15.3 Tóm tắt chương

Chương 15 thông qua các cây quyết định đã cung cấp quy trình chẩn đoán có hệ thống cho 6 nhóm sự cố lớn: Lỗi khởi động, Tiếp nhận tin nhắn, Gọi mô hình AI, Thực thi công cụ, Bộ nhớ phiên và Suy giảm hiệu năng.

### Điểm lại các ý chính

- **Chẩn đoán nhị phân (Binary Triage)**: Mỗi cây quyết định đều dùng nhánh Có/Không để từng bước thu hẹp phạm vi, mỗi nhánh gắn liền với một câu lệnh CLI cụ thể và dẫn tới giải pháp dứt điểm.
- **Ưu tiên `openclaw doctor`**: Lệnh `doctor` là cửa ngõ kiểm tra cấu hình, di trú và sửa chữa; cờ `--deep` bổ sung thêm việc quét các bản cài đặt Gateway phụ và dịch vụ hệ thống.
- **Kịch bản tải cao**: Giới hạn đồng thời, cạn kiệt connection pool, ùn tắc hàng đợi và sự cố sập dây chuyền đòi hỏi các lộ trình chẩn đoán chuyên sâu, tập trung vào cấu hình rate limit và cơ chế ngắt mạch (Circuit Breaker).
- **Phòng bệnh hơn chữa bệnh**: Khuyến nghị định kỳ chạy `openclaw doctor` và `openclaw status --all`, theo dõi độ trễ và tỷ lệ lỗi hàng ngày, kiểm toán quyền hạn hàng tháng.

### Bước tiếp theo

[Chương 16](../16_claude_ecosystem/README.md) sẽ đi sâu vào việc tích hợp toàn diện với hệ sinh thái AI, và các Phụ lục tiếp theo cung cấp Sổ tay tra cứu lệnh nhanh cùng Bảng kiểm tra xử lý sự cố.

---

> **Phát hiện lỗi hoặc có đề xuất cải tiến?** Hoan nghênh bạn gửi [Issue](https://github.com/yeasy/openclaw_guide/issues) hoặc [Pull Request](https://github.com/yeasy/openclaw_guide/pulls).
