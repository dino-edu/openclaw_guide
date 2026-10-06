# Chương 6: Phiên làm việc (Session), Ngữ cảnh (Context) & Bộ nhớ (Memory)

Cho đến thời điểm hiện tại, OpenClaw của bạn đã có thể trả lời các câu hỏi đơn lẻ. Nhưng một cuộc trò chuyện thực tế là một chuỗi tương tác liên hoàn, chứ không phải các lượt hỏi đáp rời rạc: Người dùng nói "Phân tích giúp tôi bảng dữ liệu này", sau đó nói tiếp "Đúng rồi, lọc theo điều kiện này nhé", rồi kết lại "Gửi kết quả đó cho quản lý của tôi". Chuỗi tương tác liên hoàn này đòi hỏi:

- **Phiên làm việc (Session)** để theo vết "ai đang trò chuyện với ai", bảo đảm cuộc đối thoại của người A không bị lẫn lộn sang người B.
- **Ngữ cảnh (Context)** để nhồi các thông tin trước đó (nội dung bảng, sở thích người dùng) vào prompt của mô hình một cách hiệu quả, thay vì lần nào cũng phải bắt đầu lại từ số 0.
- **Bộ nhớ (Memory)** để giúp Agent ghi nhớ các thông tin cốt lõi lâu dài, ví dụ: "Người dùng A thích sắp xếp theo giá", "Công ty chúng tôi dùng Slack chứ không dùng Teams".

Ba khái niệm này thoạt nhìn rất đơn giản, nhưng trong môi trường sản xuất lại tiềm ẩn rất nhiều cạm bẫy thiết kế:

- Nhiều tác vụ độc lập của cùng một người dùng nên được cô lập thành các phiên riêng biệt hay gộp chung vào một phiên khổng lồ?
- Bản ghi hội thoại của một tháng trước có cần giữ lại không? Nếu giữ thì chi phí Token có bị bùng nổ không?
- Cửa sổ ngữ cảnh (Context window) chỉ có 200k Token, phải ưu tiên sắp xếp như thế nào để vừa đủ thông tin vừa không bị tràn ngân sách?

Mạch chính của chương này là trả lời các câu hỏi trên: **Session dùng để định nghĩa quyền sở hữu trạng thái, Context dùng để tổ chức thông tin khả dụng trong giới hạn ngân sách Token, và Memory dùng để kết tinh các sự kiện và sở thích lâu dài xuyên suốt các phiên**. Cả ba cùng quyết định tính tái hiện, tính khả quan sát và khả năng vận hành của hệ thống. Qua chương này, bạn sẽ học được cách duy trì năng lực hội thoại lâu dài, có thể dự đoán và tái lập được cho Agent trong điều kiện tài nguyên hữu hạn.

## Mục lục hướng dẫn chương

Chương này bao gồm các mục sau:

- **[6.1 Mô hình phiên (Session) & Lưu trữ trạng thái bền vững (Persistence)](6.1_sessions.md)**: Hiểu định danh Session, vòng đời và ranh giới lưu trữ trạng thái bền vững.
- **[6.2 Xây dựng Context & Ngân sách cửa sổ ngữ cảnh (Window Budget)](6.2_context_building.md)**: Làm chủ cơ chế nhồi ngữ cảnh phân tầng, nguyên tắc ưu tiên và chiến lược phân bổ ngân sách Token.
- **[6.3 Cơ chế ghi nhớ (Memory): Ghi, truy xuất và vô hiệu hóa](6.3_memory_mechanism.md)**: Tìm hiểu cơ chế bộ nhớ: Cách phối hợp giữa kho lưu trữ chính (Markdown) và backend tìm kiếm.
- **[6.4 Nén và cắt tỉa: Chiến lược thu gọn và loại bỏ ngữ cảnh](6.4_compaction_pruning.md)**: Quản trị phiên hội thoại dài: Toàn bộ tham số, cơ chế kích hoạt và sự đánh đổi giữa Cắt tỉa (Pruning) và Nén ngữ cảnh (Compaction).
- **[6.5 Tóm tắt chương](summary.md)**: Các kết luận trọng yếu, ví dụ quy trình khép kín end-to-end và bài tập tự kiểm tra.

## Mục tiêu học tập

Sau khi hoàn thành chương này, bạn sẽ có thể:
1. **Thiết kế phiên**: Xây dựng chiến lược định danh và cô lập phiên hợp lý cho các kịch bản khác nhau.
2. **Tổ chức ngữ cảnh**: Nhồi thông tin phân tầng theo thứ tự ưu tiên, duy trì tỷ lệ tín hiệu trên nhiễu (Signal-to-Noise Ratio) cao trong giới hạn ngân sách Token.
3. **Thiết lập bộ nhớ**: Thiết kế cơ chế bộ nhớ dài hạn, giúp Agent ghi nhớ các thông tin trọng yếu và truy xuất đáng tin cậy.
4. **Quản trị sự phát triển**: Sử dụng cắt tỉa và nén để duy trì các phiên hội thoại dài luôn tinh gọn, hiệu quả và có thể phát lại được.
