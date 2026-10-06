# Chương 11: Hiện thực hóa cơ chế tin cậy & An toàn

Chương này tập trung vào việc gia cố hệ thống từ "chạy được" tiến lên "vận hành ổn định bền bỉ lâu dài": Quản trị đa khóa và lựa chọn xác thực có thể truy vết, chuỗi fallback mô hình và cơ chế làm nguội (Cooldown) để cầm máu khi sự cố xảy ra, cùng sự phối hợp phòng thủ chặt chẽ giữa Chính sách công cụ, Hộp cát Sandbox và Kiểm toán. Qua chương này, bạn sẽ học được cách duy trì năng lực kiểm soát, tự phục hồi và truy vết của OpenClaw ngay cả khi nhà cung cấp bị rung lắc, chạm rate limit hay khóa API đột ngột hết hạn.

## Mục lục hướng dẫn chương

Chương này bao gồm các mục sau:

- **[11.1 Quản trị đa khóa: Hồ sơ xác thực (Auth Profiles), Xoay tua môi trường & Thứ tự xác thực (auth.order)](11.1_auth_profiles.md)**: Triển khai đa khóa và nạp biến môi trường, xây dựng quy trình quản trị khóa có thể xoay tua, triển khai thử nghiệm từng phần và hoàn tác nhanh chóng.
- **[11.2 Làm nguội & Vô hiệu hóa (Cooldown): Cơ chế ngăn chặn lỗi lan rộng](11.2_rotation_cooldown.md)**: Cấu hình và xác minh cơ chế cooldown của auth-profile, vô hiệu hóa tạm thời và cầm máu ở tầng runtime, tránh việc thất bại lặp đi lặp lại trong khung giờ sự cố.
- **[11.3 Chuỗi dự phòng mô hình (Fallback Chain) & Phân luồng xử lý lỗi](11.3_fallback_rules.md)**: Thiết lập chuỗi bằng chứng fallback: Lý do kích hoạt, quy tắc đã khớp, đường dẫn fallback và chiến lược phục hồi đều có thể đối soát minh bạch trong log.
- **[11.4 Hàng rào bảo vệ (Guardrails): Liên kết Tool Policy, Sandbox, Phê duyệt & Kiểm toán](11.4_guardrails.md)**: Dùng chính sách công cụ, sandbox và phê duyệt để thu hẹp các năng lực rủi ro cao, biến mọi quyết định cho phép hay từ chối thành các sự kiện có thể giải thích được phục vụ kiểm toán.
- **[11.5 Tóm tắt chương](summary.md)**: Các kết luận trọng yếu và bài tập tự kiểm tra.

## Mục tiêu học tập

Sau khi hoàn thành chương này, bạn sẽ có thể:
1. **Quản trị khóa**: Thực thi quản trị đa khóa, hỗ trợ xoay tua và phát hành thử nghiệm an toàn.
2. **Ứng phó sự cố**: Thiết kế chiến lược làm nguội và chuyển đổi luồng khi phát sinh lỗi.
3. **Thiết lập chuỗi dự phòng**: Thiết kế chiến lược fallback mô hình phân tầng, nâng cao tính khả dụng tổng thể.
4. **Bảo vệ hệ thống**: Dùng chính sách công cụ và sandbox để bảo vệ các năng lực rủi ro cao, đồng thời theo vết từng bước thao tác qua kiểm toán.

## Lời khuyên khi đọc

Khi đọc, bạn nên mở sẵn tệp cấu hình cục bộ và nhật ký log có cấu trúc, vừa đọc vừa dùng các đầu dò và kỹ thuật bơm lỗi để trực tiếp nghiệm thu, thay vì chỉ phán đoán "cảm thấy an toàn hơn".
