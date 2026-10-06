## 11.5 Tóm tắt chương

Chương 11 đã đưa độ tin cậy và an toàn bảo mật về các cơ chế kỹ thuật "có thể cấu hình, có thể kiểm chứng và có thể truy vết": Quản trị đa khóa và lựa chọn xác thực giúp việc chuyển đổi dự phòng có thể kiểm toán; chuỗi Fallback và cơ chế làm nguội (Cooldown) giúp cầm máu trong khung giờ sự cố; Chính sách công cụ và Sandbox mang lại ranh giới xác định cho các năng lực rủi ro cao; và Chẩn đoán cùng Kiểm toán giúp mọi lượt cho phép hay từ chối đều có thể đối soát minh bạch.

### 11.5.1 Các kết luận trọng yếu

- **Quản trị đa khóa phải tường minh**: Nạp khóa qua biến môi trường/SecretRef, lựa chọn bằng định danh rõ ràng, quy trình xoay tua phải có bước thử nghiệm từng phần và điểm hoàn tác (Rollback).
- **Chuỗi Fallback phải có khả năng giải thích**: Phân luồng theo loại lỗi cụ thể, ghi nhận lý do kích hoạt, quy tắc đã trúng và mô hình mục tiêu, tránh tuyệt đối việc âm thầm đổi mô hình.
- **Làm nguội (Cooldown) dùng để cầm máu**: Sử dụng cửa sổ cooldown để triệt tiêu hiện tượng khuếch đại thử lại; việc phục hồi phải dựa vào kết quả thăm dò probe chứ không vội vàng mở toang lưu lượng ngay lập tức.
- **Hàng rào bảo vệ (Guardrails) phải liên kết 4 tầng**: Chính sách công cụ quyết định có được làm không, Sandbox quyết định làm ở đâu, Phê duyệt quyết định hành vi rủi ro có được tiếp tục không, và Kiểm toán quyết định những gì đã làm có thể truy vết được hay không.

### 11.5.2 Checklist tự kiểm tra

- [ ] Bạn có thể giải thích hành động và chuỗi bằng chứng của hệ thống dưới 3 loại sự cố: Khóa hết hạn, Chạm rate limit, và Timeout không?
- [ ] Bạn có thể chủ động bơm lỗi để kích hoạt Fallback và đối soát quy tắc trúng cùng cửa sổ cooldown trong log không?
- [ ] Các công cụ rủi ro cao đã được thu hẹp mặc định, chỉ mở tường minh tại các cổng/Agent được kiểm soát và có thể hoàn tác nhanh chóng chưa?

### 11.5.3 Giới thiệu chương tiếp theo

[Chương 12](../12_extension_engineering/README.md) sẽ đưa chúng ta vào Kỹ thuật mở rộng Plugin & Vận hành sản xuất: Cách thức đưa năng lực mở rộng vào ranh giới chính sách, biến nó thành một quy trình kỹ thuật có thể kiểm thử và phát lại, đồng thời hình thành danh mục nghiệm thu sẵn sàng đưa vào vận hành thực tế.

---

> [!NOTE]
> Phát hiện lỗi hoặc có đề xuất cải tiến? Hoan nghênh bạn gửi [Issue](https://github.com/yeasy/openclaw_guide/issues) hoặc [Pull Request](https://github.com/yeasy/openclaw_guide/pulls).
