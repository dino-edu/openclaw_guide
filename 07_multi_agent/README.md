# Chương 7: Phân phối đa kênh & Đa Agent cộng tác

Ở các chương trước, bạn đã cài đặt OpenClaw trên máy cục bộ và thực hành trò chuyện qua giao diện Dashboard. Bây giờ là lúc đưa hệ thống ra môi trường sản xuất thực tế — cho phép bot làm việc trên Telegram, WhatsApp, nhóm chat doanh nghiệp Lark/Feishu, hoặc phân tách thành nhiều Agent chuyên trách để mỗi Agent đảm nhận một nhiệm vụ riêng.

Khi cổng vào mở rộng từ một kênh đơn lẻ sang đa kênh, đa nhóm chat và đa đối tượng tương tác, vấn đề thường gặp nhất của hệ thống không phải là năng lực mô hình yếu kém, mà là sự mập mờ về ranh giới: Ai chịu trách nhiệm xử lý, cổng vào nào được phép kích hoạt bot, hành vi nào thuộc diện rủi ro cao, và khi phát sinh lỗi thì phát lại truy vết ra sao. Đó là lý do vì sao chương này tập trung cao độ vào khía cạnh "Quản trị" chứ không chỉ dừng lại ở việc "Tích hợp kỹ thuật".

Mạch chính của chương này là biến đa kênh và đa Agent thành một hệ thống có thể quản lý chặt chẽ:

- **Chính sách kênh (Channel Policy)** chịu trách nhiệm thu hẹp bề mặt kích hoạt (những ai, nhóm chat nào được phép kích hoạt bot).
- **Ràng buộc định tuyến (Routing Binding)** chịu trách nhiệm phân định quyền sở hữu (Agent nào tiếp quản cổng vào nào).
- **Chính sách công cụ & Ràng buộc Sandbox** chịu trách nhiệm giới hạn ranh giới có thể thực thi (những thao tác nào được phép thực hiện).

**Học xong chương này bạn sẽ làm được gì**

- Tự tin kết nối OpenClaw với Telegram, WhatsApp hoặc Lark/Feishu một cách bài bản, thay vì chỉ "copy-paste theo tài liệu".
- Thiết kế chiến lược cách ly kênh phù hợp với nghiệp vụ (chẳng hạn tách riêng bot CSKH và bot vận hành nội bộ trên các tài khoản khác nhau).
- Thiết lập nhiều Agent chuyên biệt, mỗi Agent tập trung vào một lĩnh vực hoặc tệp người dùng riêng, tự động điều phối qua khung định tuyến thông minh.

## Mục lục hướng dẫn chương

- **[7.1 Kết nối kênh liên lạc & Quản trị cổng vào (Telegram, WhatsApp)](7.1_telegram_whatsapp.md)**: Lấy Telegram và WhatsApp làm ví dụ điển hình để thông suốt quy trình kết nối, phân tích chính sách chat riêng/nhóm và cách ly đa tài khoản.
- **[7.2 Hướng dẫn kết nối Lark/Feishu](7.2_lark_integration.md)**: Quy trình kết nối end-to-end với Nền tảng mở Lark/Feishu và các kinh nghiệm tránh bẫy thực tế.
- **[7.3 Cơ sở định tuyến (Routing): Từ đơn Agent đến đa Agent](7.3_routing_basics.md)**: Cơ chế ràng buộc định tuyến, thứ tự ưu tiên của chuỗi ra quyết định và cách ly lưu trữ bộ nhớ.
- **[7.4 Mô hình cộng tác: Sub-agent (Agent phụ) & Nhóm broadcast](7.4_collaboration_patterns.md)**: Phân rã tác vụ song song qua Sub-agent, chuyển phát qua nhóm broadcast, hàng đợi tin nhắn và cơ chế thông báo hồi đáp (Announce).
- **[7.5 Tóm tắt chương](summary.md)**: Các kết luận trọng yếu và bài tập tự kiểm tra.
