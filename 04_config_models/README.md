# Chương 4: Hệ thống cấu hình & Quản trị mô hình

Ở [Chương 2](../02_setup/README.md), trình hướng dẫn `openclaw onboard` đã giúp bạn hoàn tất việc kết nối mô hình và xác thực tối thiểu — khóa API của nhà cung cấp tích hợp sẵn đã được ghi vào auth-profiles, mô hình mặc định đã có thể sử dụng. Tuy nhiên, giữa việc "dùng được" và "an tâm vận hành lâu dài" vẫn còn một khoảng cách đáng kể.

Mục tiêu của chương này không phải lặp lại thao tác "kết nối", mà là đưa việc kết nối lên tầm **quản trị (Governance)**:

- **Cấu hình có thể giải thích được**: Ba tháng sau nhìn lại, bạn có thể nói vanh vách "vì sao hiện tại lại chọn mô hình này", chứ không phải "tôi cũng quên mất ngày xưa cấu hình thế nào".
- **Xác thực có thể xoay tua an toàn**: Khi API Key bị lộ hoặc doanh nghiệp yêu cầu định kỳ đổi khóa, bạn có thể chuyển đổi mượt mà sang Key dự phòng trong vòng 10 phút mà không làm gián đoạn dịch vụ.
- **Lựa chọn có cơ sở khoa học**: Khi cần cân nhắc giữa Claude, các dòng mô hình OpenAI hiện hành và mô hình chạy cục bộ (Local LLM), bạn có sẵn một khung đánh giá 4 chiều (Chi phí, Chất lượng, Độ trễ, Độ tin cậy).
- **Có cơ chế tự động chuyển đổi dự phòng (Failover)**: Khi mô hình chính hoặc nhà cung cấp chính gặp sự cố, hệ thống sẽ tự động chuyển sang mô hình dự phòng theo chuỗi fallback rõ ràng thay vì làm sập toàn bộ dịch vụ.

Đọc xong chương này, bạn sẽ tự tin trả lời độc lập được 3 câu hỏi: Cấu hình hiện tại có hiệu lực từ nguồn nào, tại sao mô hình này được chọn, và khi xảy ra sự cố thì hệ thống sẽ thoái biến phục vụ (Graceful degradation) theo lộ trình nào.

## Mục lục hướng dẫn chương

Chương này bao gồm các mục sau:

- **[4.1 Cấu trúc openclaw.json & Thứ tự ưu tiên cấu hình](4.1_config_system.md)**: Hiểu cấu trúc cốt lõi của openclaw.json và thứ tự ưu tiên ghi đè cấu hình.
- **[4.2 Kết nối nhà cung cấp mô hình (Provider) & Phương thức xác thực](4.2_provider_access.md)**: Phân biệt lộ trình mặc định của nhà cung cấp tích hợp sẵn với cấu hình rõ ràng cho nhà cung cấp tùy biến, nắm vững cơ chế nạp và xoay tua khóa API.
- **[4.3 Lựa chọn mô hình & Chiến lược mặc định](4.3_model_selection.md)**: Thiết lập khung quyết định 4 chiều: Chất lượng / Chi phí / Độ trễ / Độ tin cậy.
- **[4.4 Cơ sở chuyển đổi dự phòng (Failover): Chuỗi fallback & Chiến lược phục hồi](4.4_failover.md)**: Cấu hình và xác minh chuỗi chuyển đổi dự phòng cơ sở.
- **[4.5 Tóm tắt chương](summary.md)**: Điểm lại các ý chính và câu hỏi tự kiểm tra.

## Mục tiêu học tập

Sau khi hoàn thành chương này, bạn sẽ có thể:
1. **Hiểu sâu cấu hình**: Định vị nhanh thứ tự ưu tiên và quy tắc có hiệu lực của cấu hình.
2. **Quản trị xác thực**: Phân biệt lộ trình mặc định của provider tích hợp với lộ trình cấu hình tùy biến, làm chủ việc nạp khóa và xoay tua an toàn.
3. **Đưa ra quyết định chuẩn xác**: Đánh giá và lựa chọn mô hình phù hợp dựa trên 4 tiêu chí chất lượng, chi phí, độ trễ và độ tin cậy.
4. **Quy hoạch khả năng chịu lỗi**: Thiết kế chuỗi fallback dự phòng cơ bản, nâng cao độ ổn định cho toàn hệ thống.
