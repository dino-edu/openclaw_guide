# Chương 2: Chuẩn bị môi trường & Cài đặt triển khai

Chương 1 đã giới thiệu cho bạn các khái niệm cốt lõi và kịch bản ứng dụng của OpenClaw. Bây giờ là lúc cài đặt nó lên máy tính của bạn.

Chương này gồm 4 bước: (1) Xác nhận hệ thống đáp ứng các yêu cầu tối thiểu, (2) Lựa chọn phương thức cài đặt phù hợp và hoàn tất cài đặt, (3) Chạy wizard hướng dẫn để cấu hình vòng đầu tiên, (4) Xác minh toàn bộ các mắt xích cơ sở hoạt động ổn định. Các bước này tuy cơ học nhưng đều có chủ đích thiết kế — chẳng hạn tại sao lại khuyên bạn tạm thời bỏ qua cấu hình "Search Engine" và "Kênh liên lạc" ở bước đầu, bởi vì khi mới cài đặt, bất kỳ một tiện ích mở rộng nào bị lỗi cũng có thể làm gián đoạn toàn bộ luồng khởi tạo. Thông qua các bước chuẩn bị có hệ thống, quy trình cài đặt hoàn chỉnh và các bài test nghiệm thu, bạn sẽ tự tin vận hành OpenClaw ổn định trong môi trường riêng, tạo nền móng vững chắc cho các chương tiếp theo.

## Mục lục hướng dẫn chương

Chương này bao gồm các mục sau:

- **[2.1 Yêu cầu hệ thống & Kiểm tra trước khi chạy](2.1_requirements.md)**: Làm rõ phiên bản Node.js, khả năng kết nối mạng và các điều kiện tiên quyết về API Key.
- **[2.2 Cài đặt OpenClaw](2.2_installation.md)**: Hoàn tất cài đặt bằng script một dòng lệnh được khuyến nghị, tìm hiểu các phương thức cài đặt thay thế và chiến lược quản trị phiên bản.
- **[2.3 Wizard khởi tạo & Cấu hình vòng đầu](2.3_onboarding.md)**: Chạy wizard khởi tạo `openclaw onboard`, hoàn tất cấu hình tối thiểu và tìm hiểu các tệp tin trong không gian làm việc.
- **[2.4 Dịch vụ Gateway daemon & Nghiệm thu tính khả dụng](2.4_gateway_service.md)**: Quản lý tiến trình dịch vụ chạy ngầm, xác nhận hệ thống hoạt động qua checklist nghiệm thu cục bộ.
- **[2.5 Tóm tắt chương](summary.md)**: Điểm lại các ý chính và khuyến nghị cho bước tiếp theo.

## Mục tiêu học tập

Sau khi hoàn thành chương này, bạn sẽ có thể:
1. **Chuẩn bị môi trường**: Xác minh môi trường máy tính đáp ứng đầy đủ yêu cầu vận hành của OpenClaw.
2. **Cài đặt suôn sẻ**: Sử dụng công cụ chính thức để hoàn thành trọn vẹn quy trình cài đặt và khởi tạo.
3. **Nghiệm thu tính khả dụng**: Sử dụng các câu lệnh chẩn đoán chuẩn để xác nhận hệ thống vận hành bình thường.
4. **Thiết lập đường cơ sở (Baseline)**: Chuẩn bị sẵn sàng cho các bài thực hành chuyên sâu ở các chương sau.

**Phạm vi áp dụng**

Hướng dẫn này áp dụng cho macOS, Linux và Windows (khuyên dùng thông qua WSL2). Trong môi trường triển khai cấp sản xuất, chúng tôi khuyến nghị sử dụng máy chủ Linux kết hợp với Docker, thiết lập Reverse Proxy, tiến trình giám sát chạy ngầm (Process Daemon) và áp dụng nghiêm ngặt nguyên tắc đặc quyền tối thiểu (Least Privilege).
