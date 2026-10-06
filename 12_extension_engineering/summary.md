## 12.6 Tóm tắt chương

Chương 12 lấy hệ thống Plugin làm mạch chính cho việc mở rộng, nhấn mạnh việc sử dụng các chính sách xác định để thu hẹp năng lực mở rộng vào ranh giới có thể kiểm soát, đồng thời dùng các câu lệnh tự kiểm tra, đầu dò probe và nhật ký log có cấu trúc để biến các thay đổi mở rộng thành một quy trình kỹ thuật hoàn chỉnh có thể phát lại được.

### 12.6.1 Các kết luận trọng yếu

1. **Mở rộng Plugin bắt buộc phải đi kèm Danh sách trắng (Whitelist) và công tắc Bật/Tắt tường minh**, từ đó mới có thể phát hành thử nghiệm Canary và hoàn tác khẩn cấp nhanh chóng trong sản xuất.
2. **Kiểm soát rủi ro của Custom Tool phải nằm ở Chính sách công cụ và sự cô lập vùng thực thi (Sandbox)**, tuyệt đối không phó thác cho câu chữ trong prompt.
3. **Kiểm thử tiện ích mở rộng phải nghiệm thu phân tầng**: Tầng Plugin → Tầng Chính sách → Tầng Cổng vào rồi mới đến End-to-End, tránh tình trạng lỗi toàn cục không thể khoanh vùng.
4. **Triển khai sản xuất phải chuẩn hóa bộ lệnh tự kiểm tra**: Kết hợp với log có cấu trúc để phát lại chuỗi xử lý theo `traceId`.

### 12.6.2 Checklist tự kiểm tra

- [ ] Các plugin đã có công tắc bật tắt rõ ràng, ràng buộc danh sách trắng và cấu hình có thể hoàn tác chưa?
- [ ] Các công cụ có độ rủi ro cao đã mặc định bị từ chối, và chỉ được mở ra ở các cổng vào và Agent được kiểm soát chưa?
- [ ] Bạn có thể dùng một bộ lệnh cố định để tái hiện và định vị chính xác một sự cố liên quan đến tiện ích mở rộng không?

### 12.6.3 Giới thiệu chương tiếp theo

[Chương 13](../13_practical_cases/README.md) sẽ đưa chúng ta vào Tuyển tập tình huống thực chiến: Thông qua các ca điển hình như Trợ lý công việc doanh nghiệp, Agent hỗ trợ khách hàng tự động..., xâu chuỗi toàn bộ phương pháp luận của 12 chương trước thành một quy trình ứng dụng thực tế có thể tái lập được.

---

> [!NOTE]
> Phát hiện lỗi hoặc có đề xuất cải tiến? Hoan nghênh bạn gửi [Issue](https://github.com/yeasy/openclaw_guide/issues) hoặc [Pull Request](https://github.com/yeasy/openclaw_guide/pulls).
