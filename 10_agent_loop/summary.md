## 10.7 Tóm tắt chương

Chương 10 đã bóc tách nhân vận hành của Agent Loop từ góc nhìn tầng dưới, hé lộ cách thức OpenClaw thông qua việc tích hợp nhúng nền tảng pi, hàng đợi phân làn, lắp ráp prompt có cấu trúc và lọc chính sách công cụ để hiện thực hóa một chuỗi thực thi Agent đáng tin cậy.

### 10.7.1 Các kết luận trọng yếu

- **Tích hợp nhúng pi runtime**: OpenClaw nhúng trực tiếp pi SDK vào tiến trình thông qua `runEmbeddedPiAgent()`, xoay quanh `activeSession.prompt()` và cơ chế đăng ký sự kiện để sở hữu năng lực vòng lặp suy luận có thể kiểm soát; đồng thời thông qua bộ lọc công cụ, Prompt hệ thống động và `ModelRegistry` tùy biến để mang lại khả năng quản trị cấp doanh nghiệp.
- **Hàng đợi phân làn bằng TypeScript thuần túy**: Command Queue không phụ thuộc Redis hay middleware ngoài; thông qua việc tuần tự hóa làn phiên, kiểm soát đồng thời làn toàn cục và cách ly làn chạy ngầm, hệ thống đạt được năng lực quản trị đồng thời trọn vẹn ngay trên một node đơn lẻ.
- **Prompt là sản phẩm kỹ thuật có cấu trúc**: Xây dựng prompt là một quy trình lắp ráp phân tầng — Ràng buộc hệ thống, Mô tả công cụ, Lịch sử ngữ cảnh và Đầu vào người dùng được cách ly độc lập, cắt tỉa theo độ ưu tiên trong ngân sách Token, và có thể lấy mẫu kiểm toán qua hooks hoặc cache trace.
- **Gọi công cụ là sự thực thi bị kiểm soát bởi chính sách**: Lượt gọi công cụ trải qua hai tầng kiểm soát chặt chẽ gồm bộ lọc chính sách (`tools.allow`/`tools.deny`) và hook `before_tool_call`; kết quả khi bơm ngược lại được cắt tỉa để chống ngập lụt ngữ cảnh.
- **Xuất luồng & Thử lại có giới hạn bảo đảm độ tin cậy của tác vụ dài**: EmbeddedBlockChunker hiện thực hóa việc phân đoạn khối thông minh có nhận biết rào chắn Markdown; phía kênh/SDK thử lại trên từng yêu cầu HTTP đơn lẻ; cơ chế failover mô hình diễn ra qua 2 giai đoạn: Xoay tua hồ sơ xác thực và Kích hoạt chuỗi fallback.

### 10.7.2 Checklist tự kiểm tra

- [ ] Bạn có thể mô tả 4 giao diện then chốt khi OpenClaw nhúng pi runtime (Quản lý phiên, Bơm công cụ, Đăng ký sự kiện, Sổ đăng ký mô hình) không?
- [ ] Bạn có thể giải thích ngữ nghĩa đồng thời của 3 làn trong Command Queue (Làn phiên, Làn toàn cục, Làn chạy ngầm) không?
- [ ] Việc lắp ráp prompt đã áp dụng cơ chế cách ly phân tầng và bọc thẻ cách ly cấu trúc cho nội dung không đáng tin cậy từ bên ngoài chưa?
- [ ] Bạn đã nắm vững chuỗi mắt xích hoàn chỉnh của lượt gọi công cụ từ đề xuất ý định → lọc chính sách → thực thi → bơm ngược kết quả chưa?

### 10.7.3 Giới thiệu chương tiếp theo

Sau khi đã nắm vững chuỗi thực thi của nhân Agent Loop, [Chương 11](../11_reliability_security/README.md) sẽ tập trung vào Độ tin cậy và Gia cố an toàn: Quản trị đa khóa và xoay tua xác thực, chuỗi fallback mô hình và cơ chế làm nguội hạ nhiệt sự cố, cùng liên kết phòng thủ giữa chính sách công cụ và môi trường Sandbox, bảo đảm ngay cả khi mô hình nảy sinh ý định vượt quyền thì hệ thống vẫn chặn đứng được ở tầng thực thi.

---

> [!NOTE]
> Phát hiện lỗi hoặc có đề xuất cải tiến? Hoan nghênh bạn gửi [Issue](https://github.com/yeasy/openclaw_guide/issues) hoặc [Pull Request](https://github.com/yeasy/openclaw_guide/pulls).
