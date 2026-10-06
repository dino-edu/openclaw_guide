## 3.5 Tóm tắt chương

Mục tiêu của Chương 3 là thiết lập một "đường cơ sở vòng lặp tối thiểu cục bộ": Trong điều kiện chưa đưa vào các biến số phức tạp từ các kênh bên ngoài, xác minh luồng chính khả dụng, có thể quan sát và có thể tái hiện được, tạo hệ quy chiếu ổn định cho việc tinh chỉnh cấu hình và mở rộng sau này.

### 3.5.1 Các nguyên tắc thiết kế trọng yếu

Sau khi hoàn thành chương này, bạn cần nắm vững các kết luận cốt lõi sau:

- **Đường cơ sở là ưu tiên số một**: Luôn xác minh các ca kiểm thử cố định trên Control UI Chat của Dashboard trước khi mở rộng kênh chat hay bổ sung năng lực, tránh việc cộng dồn nhiều biến số khiến lỗi trở nên khó tái hiện.
- **Chỉ thị là một bản giao ước**: Chỉ thị ban đầu (System Instructions) cần được viết thành các điều khoản có thể kiểm chứng được (Mục tiêu / Ranh giới / Cấu trúc đầu ra), kết hợp đối chiếu nhật ký log để xác thực tính hiệu lực.
- **Phê duyệt thiết bị là tuyến phòng thủ tối thiểu**: Truy cập cục bộ và ngoại vi được bảo vệ thông qua cơ chế phê duyệt thiết bị (Device Approval); hiểu rõ cơ chế này là nền tảng để triển khai bảo mật cấp kênh liên lạc sau này.
- **Chẩn đoán phải theo đúng trình tự**: Đi từ `health` (tiến trình) → `channels status --probe` (kênh chat) → `models status` / `--probe` (mô hình AI) → `logs` (nhật ký chi tiết), tránh việc vội vàng sửa prompt khiến nguyên nhân gốc rễ bị che lấp.

### 3.5.2 Checklist tự kiểm tra

Trước khi chuyển sang chương tiếp theo, hãy tự kiểm tra:

- Bạn đã xác minh thành công 3 ca kiểm thử tối thiểu ở Mục 3.1 (Chuỗi sức khỏe, Tương tác tối thiểu, Xuất dạng luồng) và định vị được request/response tương ứng trong `logs --json` chưa?
- Quy trình phê duyệt khi thiết bị mới mở Dashboard có diễn ra trơn tru không? Bạn có thể giải thích phạm vi ảnh hưởng của việc phê duyệt này không?
- Khi gặp hiện tượng "bot không phản hồi / tin nhắn không kích hoạt", bạn đã nắm vững cách áp dụng trình tự chẩn đoán 4 tầng (Tiến trình → Kênh → Mô hình → Log) để khoanh vùng chưa?

### 3.5.3 Giới thiệu chương tiếp theo

[Chương 4](../04_config_models/README.md) sẽ đưa chúng ta vào hệ thống cấu hình và kết nối mô hình AI: Nâng cấp trạng thái từ "chạy được bình thường" lên "có thể kiểm soát và thay thế linh hoạt", đồng thời xây dựng đường cơ sở cho việc lựa chọn mô hình và chuyển đổi dự phòng (Failover). Các chương tiếp theo sẽ lần lượt đào sâu: [Chương 5](../05_tools_skills/README.md) bàn về chính sách công cụ và quản trị quyền hạn, [Chương 6](../06_context_memory/README.md) bàn về bộ nhớ và cô lập phiên, [Chương 7](../07_multi_agent/README.md) bàn về quản trị cổng vào đa kênh và đa Agent cộng tác.
