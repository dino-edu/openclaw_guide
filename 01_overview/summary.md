## 1.5 Tóm tắt chương

### 1.5.1 Điểm lại các ý chính

- OpenClaw là một hệ thống Agent cá nhân ưu tiên chạy cục bộ (local-first), có thể tự lưu trữ (self-hosted), kết nối được nhiều kênh chat (Telegram, WhatsApp, Lark/Feishu...), gọi công cụ trên máy để hoàn thành công việc thực tế — không chỉ trò chuyện mà là thực sự "làm xong việc".
- Hệ thống giải quyết 3 điểm nghẽn lớn khi triển khai Agent: Hội thoại dài khiến AI bị quên thông tin, AI có nguy cơ thực hiện hành vi vượt quyền, và không thể truy vết khi xảy ra sự cố.
- Kịch bản phù hợp nhất: Chuỗi thực thi nhiều bước, chấp nhận bất đồng bộ, cần phối hợp nhiều công cụ. Kịch bản không phù hợp: Chat hỏi đáp đơn thuần, hệ thống phản hồi thời gian thực mili-giây, hoặc các nhóm không có khả năng tự vận hành máy chủ.
- Năm khái niệm cốt lõi: **Gateway** (cánh cổng tiếp nhận), **Agent** (đơn vị làm việc), **Tool** (cánh tay thực thi), **Session** (cuốn sổ ghi nhớ), **Node** (điểm cuối thiết bị). Hãy nhớ 5 cái tên này vì các chương sau sẽ mổ xẻ chi tiết từng phần.
- Chi phí Token rất dễ bị đánh giá thấp: Chỉ nên dùng Agent ở các khâu cần hiểu ngôn ngữ tự nhiên, ra quyết định mờ hoặc suy luận đa bước; các phần việc còn lại nên giải quyết bằng code xác định.

### 1.5.2 Câu hỏi tự kiểm tra

Sau khi đọc xong chương này, hãy thử trả lời các câu hỏi sau:

- Bạn có thể mô tả trong một câu nhiệm vụ của từng thành phần Gateway, Agent, Tool, Session, Node không?
- Nếu giới thiệu OpenClaw cho đồng nghiệp, bạn sẽ nói nó giải quyết bài toán gì và không phù hợp với trường hợp nào?
- So với việc dùng trực tiếp ChatGPT, giá trị vượt trội mà OpenClaw mang lại là gì?

### 1.5.3 Giới thiệu chương tiếp theo

[Chương 2](../02_setup/README.md) sẽ đưa chúng ta vào bước cài đặt thực tế: Kiểm tra điều kiện môi trường, lựa chọn phương thức cài đặt, chạy wizard khởi tạo và nghiệm thu hệ thống lần đầu tiên.

---

> Phát hiện lỗi hoặc có đề xuất cải tiến? Hoan nghênh bạn gửi [Issue](https://github.com/yeasy/openclaw_guide/issues) hoặc [Pull Request](https://github.com/yeasy/openclaw_guide/pulls).
