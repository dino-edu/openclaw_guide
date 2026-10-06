# Chương 9: Mặt phẳng điều khiển Gateway & Cơ chế giao thức

Chương này chuyển hướng sang góc nhìn nhân hệ thống (System Kernel), bàn về trách nhiệm của mặt phẳng điều khiển (Control Plane) của OpenClaw Gateway, vòng đời kết nối, tính nhất quán của sự kiện cùng cơ chế ghép nối thiết bị và thiết lập vùng tin cậy. Qua chương này, bạn sẽ hiểu được cách một Gateway vững chắc thông qua các giao thức và máy trạng thái (State Machine) được thiết kế tinh vi giúp cho hệ thống Agent phân tán trở nên "có thể dự đoán, có thể phục hồi và có thể kiểm toán".

Giá trị của chương này nằm ở chỗ: Cùng một năng lực mô hình AI, nhưng đặt dưới các thiết kế mặt phẳng điều khiển khác nhau sẽ mang lại độ ổn định và an toàn hoàn toàn khác biệt.

## Mục lục hướng dẫn chương

Chương này bao gồm các mục sau:

- **[9.1 Toàn cảnh kiến trúc & Khung 5 mặt phẳng (5-Plane Framework)](9.1_architecture_overview.md)**: Sử dụng kiến trúc 5 mặt phẳng (Điều khiển, Dữ liệu, Ngữ cảnh, Vùng tin cậy, Khả năng quan sát) để xây dựng góc nhìn thiết kế hệ thống thống nhất.
- **[9.2 Trách nhiệm & Ranh giới của mặt phẳng điều khiển (Control Plane)](9.2_control_plane.md)**: Đi sâu vào 5 trọng trách lớn của Control Plane — Xác thực, Định tuyến, Quản lý phiên, Thực thi chính sách và Phục hồi sự cố.
- **[9.3 Vòng đời kết nối: Bắt tay (Handshake), Xác thực & Heartbeat](9.3_ws_handshake.md)**: Hiểu trọn vẹn vòng đời của kết nối dài WebSocket, quá trình bắt tay, cơ chế xác thực và duy trì kết nối (Keepalive).
- **[9.4 Tính bất biến của sự kiện (Idempotency) & Bảo đảm nhất quán](9.4_event_idempotency.md)**: Làm chủ tính bất biến và tính nhất quán trong hệ thống hướng sự kiện: Dùng `idempotencyKey` xử lý thử lại tác vụ có tác dụng phụ, dùng khoảng trống `seq` gap để kích hoạt làm mới trạng thái.
- **[9.5 Ghép nối kênh & Thiết lập vùng tin cậy cục bộ](9.5_pairing_trust.md)**: Hiểu rõ ranh giới giữa ghép nối người gửi trên kênh chat, ghép nối thiết bị ngoại vi và mã thiết lập (setup code / bootstrap token), cùng phương pháp quản trị thu hồi và xoay tua.
- **[9.6 Tóm tắt chương](summary.md)**: Các kết luận trọng yếu và bài tập tự kiểm tra.

## Mục tiêu học tập

Sau khi hoàn thành chương này, bạn sẽ có thể:
1. **Hiểu sâu kiến trúc**: Nhìn nhận thiết kế tổng thể của Gateway dưới lăng kính mặt phẳng điều khiển.
2. **Làm chủ giao thức**: Nắm vững vòng đời hoàn chỉnh của kết nối WebSocket.
3. **Bảo đảm tính nhất quán**: Thiết kế cơ chế bất biến và nhất quán trong hệ thống hướng sự kiện.
4. **Thiết lập vùng tin cậy**: Xây dựng nền tảng an toàn thông qua ghép nối thiết bị và quản lý khóa.
