## 5.5 Tóm tắt chương

Trọng tâm của Chương 5 là đưa năng lực hành động của OpenClaw vào khuôn khổ quản trị kỹ thuật: Toàn bộ công cụ và khả năng mở rộng bắt buộc phải chịu sự ràng buộc của chính sách, đồng thời sở hữu lộ trình nghiệm thu và chẩn đoán có thể kiểm chứng được.

### 5.5.1 Các kết luận trọng yếu

1. Ranh giới an toàn của các lượt gọi công cụ bắt buộc phải do chính sách runtime bọc lót, tuyệt đối không phó thác hoàn toàn cho câu chữ trong prompt.
2. Quản trị công cụ phải bắt đầu từ nguyên tắc đặc quyền tối thiểu (Least Privilege), thông qua các chính sách cho phép, từ chối và phân tầng để thu hẹp các thao tác có tác dụng phụ vào đúng cổng kiểm soát.
3. Hệ sinh thái Plugin cung cấp năng lực mở rộng có thể phân phối, cần phối hợp với danh sách trắng và công tắc bật/tắt tường minh; hệ thống Skill dùng để cố định phương pháp luận quy trình, nhưng không được gánh vác ranh giới an toàn của runtime.
4. Công cụ trình duyệt thuộc nhóm năng lực có độ rủi ro cao, bắt buộc phải nằm trong chính sách công cụ và xây dựng quy trình gỡ lỗi khép kín dựa trên câu lệnh trạng thái và log có cấu trúc.

### 5.5.2 Câu hỏi tự kiểm tra

- Bạn có thể dùng lệnh `status --deep` kết hợp đối chiếu nhật ký log để giải thích lý do vì sao một công cụ bị từ chối hoặc thực thi thất bại không?
- Bạn đã chuẩn bị sẵn một bộ ca kiểm thử tối thiểu để xác minh "công cụ cần cho phép thì được phép, công cụ cần chặn thì bị chặn" chưa?
- Khi phát sinh sự cố bất thường, bạn có thể nhanh chóng vô hiệu hóa năng lực mở rộng và hoàn tác hệ thống về trạng thái an toàn trong bao lâu?

### 5.5.3 Gợi ý ứng dụng thực tế từ cộng đồng

Bên cạnh các bài kiểm thử kỹ thuật, bạn có thể thử ứng dụng năng lực công cụ vào các kịch bản đời sống thực tế:
- **Chắt lọc tin tức hàng ngày**: Sử dụng công cụ tự động hóa trình duyệt để định kỳ truy cập các trang tin tức công nghệ hoặc nền tảng video, trích xuất các chủ đề nóng và tổng hợp thành bản tin vắn.
- **Theo dõi sức khỏe cá nhân**: Đóng gói các chỉ thị ghi chép có cấu trúc thành một Skill chuyên dụng, biến Agent thành trợ lý quản lý nhật ký chế độ ăn uống và tập luyện.
- **Tự động hóa nghiên cứu thị trường**: Xây dựng quy trình thao tác web liên hoàn để tự động tìm kiếm thông tin sản phẩm cùng ngành, thu thập dữ liệu công khai, hỗ trợ việc phân tích sơ bộ đối thủ cạnh tranh.

### 5.5.4 Giới thiệu chương tiếp theo

[Chương 6](../06_context_memory/README.md) sẽ đưa chúng ta vào Phiên làm việc (Session), Ngữ cảnh (Context) và Bộ nhớ (Memory). Mục tiêu là biến tính liên tục của tác vụ thành một năng lực có thể kiểm soát: Biết hệ thống đã ghi nhớ những gì, tại sao nhớ, và cơ chế nén, cắt tỉa ngữ cảnh vận hành ra sao.

---

> [!NOTE]
> Phát hiện lỗi hoặc có đề xuất cải tiến? Hoan nghênh bạn gửi [Issue](https://github.com/yeasy/openclaw_guide/issues) hoặc [Pull Request](https://github.com/yeasy/openclaw_guide/pulls).
