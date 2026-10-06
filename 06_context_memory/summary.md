## 6.5 Tóm tắt chương

Chương 6 đã chuyển đổi vấn đề "hội thoại dài thì vận hành bất ổn" từ điểm yếu của mô hình thành một bài toán kỹ thuật hoàn toàn trong tầm kiểm soát: Khóa Session Key quyết định quyền sở hữu trạng thái, việc lắp ráp Context kiểm soát thứ tự nạp và phân bổ ngân sách Token, tệp Memory dài hạn lưu giữ các sự thật ổn định, và cơ chế Cắt tỉa (Pruning) kết hợp Nén (Compaction) bảo đảm các phiên hội thoại dài tiếp tục tiến triển trơn tru mà vẫn duy trì khả năng phát lại và kiểm toán.

### 6.5.1 Các kết luận trọng yếu

- **Phiên làm việc cần phân nhóm trước khi tối ưu**: Ranh giới tác động, liên kết danh tính và chiến lược đặt lại phiên quyết định xem "có bị lẫn lộn ngữ cảnh không, có bị đứt gãy không, và có khả năng phục hồi hay không".
- **Ngữ cảnh phải phân tầng**: Định danh đi trước tri thức, tri thức đi trước lịch sử, lịch sử đi trước kết quả công cụ; kết quả công cụ bơm vào phải có cấu trúc, tránh tích tụ dữ liệu thô.
- **Bộ nhớ phải duy trì được**: Chỉ ghi nhận các sự thật ổn định kèm nguồn gốc và dấu thời gian cập nhật; nhiễu tiến trình đưa vào nhật ký hàng ngày hoặc tệp bằng chứng.
- **Cắt tỉa và Nén phải kiểm chứng được**: Cắt tỉa chủ yếu thu hẹp dung lượng gửi tới mô hình, còn nén sẽ gấp gọn cuộc trò chuyện trước đó thành tóm tắt có thể kiểm toán; cả hai đều phải bảo tồn chuỗi bằng chứng có thể phát lại.

### 6.5.2 Ví dụ quy trình khép kín End-to-End

Dưới đây là một hành trình hoàn chỉnh của một tin nhắn xâu chuỗi toàn bộ khái niệm cốt lõi của Chương 6:

1. **Xác định phiên (6.1)**: Người dùng Alice gửi trên Telegram: "Kiểm tra số lần khởi động lại Pod của cụm prod-cluster-us". Hệ thống suy ra `sessionKey` tương ứng dựa trên kênh, danh tính đối tác và phạm vi phiên, khớp trúng phiên đang hoạt động.
2. **Lắp ráp ngữ cảnh (6.2)**: Gateway lắp ráp đầu vào theo thứ tự ưu tiên — nạp các tệp ngữ cảnh dự án (`AGENTS.md`, `SOUL.md`, `TOOLS.md`, `IDENTITY.md`...), ghép nối lịch sử hội thoại đã qua cắt tỉa/nén của phiên hiện tại, và chừa sẵn không gian cho lượt gọi công cụ tiếp theo.
3. **Truy xuất bộ nhớ (6.3)**: `memory-core` nạp chỉ dẫn sử dụng công cụ bộ nhớ; mô hình có thể gọi `memory_search` / `memory_get` để kéo các sự thật như "cụm prod-cluster-us cần dùng tài khoản dịch vụ chỉ định" vào ngữ cảnh.
4. **Gọi công cụ & Bơm kết quả**: Mô hình quyết định gọi tool `kubectl get pods`. Tool trả về 50K ký tự dữ liệu thô, hệ thống tóm tắt lại các trường cốt lõi (Tên Pod + Số lần restart) bơm vào phiên, lưu toàn bộ dữ liệu thô xuống đĩa làm bằng chứng.
5. **Kích hoạt cắt tỉa (6.4)**: Qua nhiều vòng tương tác, ngữ cảnh chạm ngưỡng soft-trim. Cơ chế `contextPruning` tự động cắt ngắn kết quả lệnh kubectl của 3 vòng trước thành 1500 ký tự đầu/cuối; các kết quả công cụ cũ hơn nữa bị `hardClear` thay bằng chuỗi giữ chỗ, kiểm soát chặt chẽ dung lượng đầu vào gửi cho mô hình.
6. **Kích hoạt nén (6.4)**: Khi phiên hội thoại tiến sát ngưỡng dung lượng tối đa, quy trình xả bộ nhớ kích hoạt trước để Agent kịp lưu tiến độ quan trọng vào `memory/2026-03-22.md`, sau đó cơ chế Compaction gấp gọn các cuộc trò chuyện trước đó thành bản tóm tắt và ghi bền vững vào tệp transcript, bảo tồn toàn bộ dấu vết để có thể phát lại sau này.

Khi xử lý sự cố, bạn có thể dựa vào `sessionKey` trong log để truy vết toàn bộ hành trình: Từ xác định phiên → Lắp ráp ngữ cảnh → Truy xuất bộ nhớ → Gọi công cụ → Cắt tỉa/Nén; mỗi mắt xích đều có mã `traceId` tương ứng để đối soát.

### 6.5.3 Checklist tự kiểm tra

- [ ] Bạn có thể giải thích một tin nhắn bất kỳ sẽ rơi vào Session Key nào và khi nào thì việc đặt lại phiên diễn ra không?
- [ ] Khi lắp ráp ngữ cảnh, thứ tự nạp và mức độ ưu tiên của 4 tầng nguồn thông tin đã thực sự rõ ràng chưa?
- [ ] Trong các phiên hội thoại dài, dung lượng đầu vào có được kiểm soát không? Khi việc Cắt tỉa (Pruning) hoặc Nén (Compaction) diễn ra, bạn có đối soát được trong log không?
- [ ] Các tệp bộ nhớ có được quản trị đúng nguyên tắc (nguồn gốc, thời gian cập nhật, khả năng thu hồi) và tìm kiếm thành công không?
- [ ] Sau khi cơ chế Nén kích hoạt, tác vụ có tiếp tục diễn ra bình thường và chuỗi phát lại có thể tái hiện được không?

### 6.5.4 Giới thiệu chương tiếp theo

[Chương 7](../07_multi_agent/README.md) sẽ đưa chúng ta vào Đa Agent và Định tuyến: Thu hẹp cổng vào thành bề mặt kích hoạt có kiểm soát, sử dụng gắn kết (Binding), định tuyến (Routing) và mô hình cộng tác để biến các câu hỏi "Ai tiếp quản, được làm gì, phát lại ra sao" thành các ranh giới xác định.
