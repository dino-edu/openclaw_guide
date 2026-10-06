## 9.6 Tóm tắt chương

Chương 9 đã dùng góc nhìn mặt phẳng điều khiển (Control Plane) để giải thích bài toán về tính ổn định: Kết nối và xác thực là cổng kiểm soát đầu vào, tính bất biến của sự kiện là nền tảng của độ tin cậy, ghép nối và thiết lập vùng tin cậy là điểm khởi đầu cho an toàn bảo mật.

### 9.6.1 Các kết luận trọng yếu

- **Giá trị cốt lõi của Gateway nằm ở sự phán quyết**: Ba bất biến Quy thuộc quyền sở hữu, Thẩm quyền phân quyền, và Trách nhiệm kiểm toán quyết định giới hạn trần của toàn bộ hệ thống.
- **Kết nối dài WebSocket bắt buộc phải quản trị vòng đời chặt chẽ**: Nhịp tim Keepalive, thuật toán kết nối lại, khôi phục trạng thái, áp lực ngược (Backpressure) và mã lý do đóng kết nối.
- **Cả ba trạng thái Trùng lặp, Thất lạc và Bất định đều phải có phương án xử lý**: Khóa `idempotencyKey` giúp việc thử lại các tác vụ có tác dụng phụ diễn ra an toàn, khoảng trống `seq` gap nhắc nhở client chủ động làm mới snapshot.
- **Ghép nối (Pairing) là quá trình dẫn dắt vùng tin cậy**: Bắt buộc phải có phạm vi ủy quyền rõ ràng, vòng đời xác định, cùng cơ chế thu hồi và xoay tua an toàn.

### 9.6.2 Checklist tự kiểm tra

- [ ] Bạn có thể giải thích chuỗi bằng chứng của một tin nhắn từ khi đi vào từ kênh chat cho đến khi được định tuyến và quy thuộc vào phiên làm việc không?
- [ ] Bạn có thể giải thích cách thức hệ thống ngăn chặn việc đăng ký lặp và thực thi lặp sau khi kết nối lại WebSocket không?
- [ ] Bạn đã chuẩn bị sẵn quy trình diễn tập xoay tua và thu hồi token, đồng thời có thể hoàn thành trong khung thời gian giới hạn chưa?

### 9.6.3 Giới thiệu chương tiếp theo

[Chương 10](../10_agent_loop/README.md) sẽ đưa chúng ta vào sâu bên trong Nhân vòng lặp Agent Loop: Bóc tách cơ chế xếp hàng, lắp ráp prompt, thực thi công cụ và xuất dữ liệu dạng luồng (Streaming).

---

> [!NOTE]
> Phát hiện lỗi hoặc có đề xuất cải tiến? Hoan nghênh bạn gửi [Issue](https://github.com/yeasy/openclaw_guide/issues) hoặc [Pull Request](https://github.com/yeasy/openclaw_guide/pulls).
