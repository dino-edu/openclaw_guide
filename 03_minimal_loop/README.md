# Chương 3: Bắt đầu nhanh & Thực chiến phiên hội thoại đầu tiên

Cài đặt đã hoàn tất, hệ thống cũng đã được xác nhận khả dụng. Bây giờ là lúc thực sự đưa nó vào sử dụng. Nhưng từ cột mốc "cài đặt thành công" đến "tự tin đưa vào môi trường sản xuất" vẫn còn khoảng cách của một số nhận thức trọng yếu:

- OpenClaw trả lời câu hỏi như thế nào? Một câu lệnh nhập vào được chuyển đổi từng bước ra sao để trở thành phản hồi của Agent?
- Khi gặp sự cố thì xử lý thế nào? Không phải "thử khởi động lại xem sao", mà cần có phương pháp chẩn đoán bài bản theo hệ thống.
- Làm thế nào để định nghĩa "tính cách và ranh giới quyền hạn của bot"? Khi viết chỉ thị thì những yếu tố nào thực sự mang lại hiệu quả?

Chương này sẽ thiết lập một "đường cơ sở vòng lặp tối thiểu cục bộ" có thể tái hiện được: Trước tiên dùng trang Chat của Dashboard để xác minh luồng chính trên máy, nắm vững các câu lệnh chẩn đoán và quy trình xử lý sự cố chuẩn hóa; tiếp theo là cố định mục tiêu và định dạng của các chỉ thị ban đầu; và cuối cùng là hiểu rõ ranh giới kiểm soát truy cập cục bộ. Qua chương này, bạn sẽ sở hữu một phiên bản OpenClaw hoàn chỉnh đầu tiên chạy mượt mà, tạo tiền đề vững chắc cho việc học tập chuyên sâu.

**Học xong chương này bạn sẽ làm được gì**

- Tự tin thực hiện phiên hội thoại đầu tiên trên Dashboard và hiểu rõ từng bước diễn ra phía sau.
- Sử dụng các lệnh chẩn đoán để khoanh vùng sự cố thay vì đoán mò theo cảm tính.
- Viết ra các chỉ thị ban đầu rõ ràng, có tính thực thi cao để Agent hiểu chính xác ranh giới mong muốn của bạn.

## Mục lục hướng dẫn chương

Chương này bao gồm các mục sau:

- **[3.1 Bảng điều khiển & Chat nhanh qua giao diện Webchat](3.1_control_ui_webchat.md)**: Dùng trang Chat của Dashboard để xác thực đường cơ sở hội thoại cục bộ, học cách dùng nhật ký log để giải thích từng bước đang diễn ra.
- **[3.2 Các lệnh chẩn đoán thông dụng & Xử lý sự cố qua Logs](3.2_diagnostics.md)**: Hình thành chuỗi bằng chứng và quy trình chẩn đoán 4 tầng cố định, tránh việc "sửa cấu hình hay sửa prompt theo cảm tính".
- **[3.3 Chỉ thị ban đầu & Cấu hình vai trò cho Agent (Persona)](3.3_agent_persona.md)**: Viết "chỉ thị ban đầu có tính thực thi": hội tụ mục tiêu, tuyên bố ranh giới, ràng buộc cấu trúc đầu ra.
- **[3.4 Ranh giới truy cập cục bộ & Phê duyệt thiết bị (Pairing)](3.4_pairing_groups.md)**: Hiểu cơ chế phê duyệt thiết bị và chính sách bảo mật mặc định, tạo nền tảng cho việc kết nối kênh sau này.
- **[3.5 Tóm tắt chương](summary.md)**: Điểm lại các ý chính và câu hỏi tự kiểm tra.

## Mục tiêu học tập

Sau khi hoàn thành chương này, bạn sẽ có thể:
1. **Xác minh nhanh**: Sử dụng trang Chat của Dashboard để kiểm chứng đường cơ sở hội thoại cục bộ.
2. **Tự chẩn đoán**: Nắm vững trình tự chẩn đoán 4 tầng và các câu lệnh xử lý sự cố thông dụng.
3. **Viết chỉ thị chuẩn**: Thiết kế các chỉ thị ban đầu và định nghĩa vai trò rõ ràng, có tính khả thi cao.
4. **Hiểu rõ ranh giới**: Nắm vững cơ chế phê duyệt thiết bị và chính sách kiểm soát truy cập mặc định.

## Điều kiện tiên quyết

- Đã hoàn thành việc cài đặt và nghiệm thu chạy lần đầu ở [Chương 2](../02_setup/README.md).
- Có thể mở trình duyệt trên máy để truy cập trang Chat của Dashboard (nếu dùng máy chủ từ xa thì cần cấu hình SSH Port Forwarding).
