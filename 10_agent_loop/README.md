# Chương 10: Phân tích nhân vòng lặp Agent Loop

Chương này tập trung vào chuỗi thực thi chính của Agent Loop: Yêu cầu đi vào hệ thống như thế nào, ngữ cảnh được lắp ráp ra sao, công cụ được điều phối như thế nào, và kết quả được trả về dạng luồng (Streaming) ra sao. Nắm vững chuỗi thực thi chính này là chìa khóa để đi sâu vào thiết kế kiến trúc, chẩn đoán các lỗi phức tạp và tối ưu hóa hiệu năng thực thi.

Trước khi đi sâu vào chi tiết mã nguồn, chúng ta cần xây dựng một mô hình tư duy: **OpenClaw thông qua việc tích hợp nhúng đã đưa bộ khung thực thi tối giản của nền tảng π (pi) vào chính tiến trình của mình, từ đó chồng lớp thêm các năng lực cấp doanh nghiệp như thích ứng kênh liên lạc, chính sách công cụ, hàng đợi phân làn... để tạo thành một môi trường Agent Runtime hoàn chỉnh.**

Chương này đi sâu vào chuỗi thực thi của kiến trúc nền tảng nói trên, lần lượt bóc tách nguyên lý vận hành và thiết kế kỹ thuật của từng thành phần cốt lõi.

## Mục tiêu học tập của chương

Nội dung chương sẽ bao quát các cơ chế cốt lõi, bao gồm kiểm soát hàng đợi, kỹ thuật prompt, điều phối công cụ và quản lý luồng xuất dữ liệu:

- **[10.1 Vòng đời luân chuyển yêu cầu & Chẩn đoán theo tầng](10.1_request_lifecycle.md)**: Theo vết vòng đời hoàn chỉnh của một tin nhắn, nắm vững chiến lược chẩn đoán sự cố phân tầng "từ ngoài vào trong".
- **[10.2 Nền tảng thực thi pi & Tích hợp nhúng (Embedded Integration)](10.2_pi_framework.md)**: Mổ xẻ cách thức OpenClaw nhúng pi SDK để sở hữu năng lực vòng lặp suy luận hướng sự kiện.
- **[10.3 Cổng vào, xếp hàng & Kiểm soát đồng thời (Concurrency Control)](10.3_entry_queue.md)**: Hiểu cơ chế hàng đợi phân làn Command Queue được hiện thực hóa bằng TypeScript thuần túy.
- **[10.4 Lắp ráp Prompt & Phòng thủ tấn công chèn (Prompt Injection)](10.4_prompt_assembly.md)**: Làm chủ quy trình lắp ráp prompt có cấu trúc, hiểu chiến lược cắt tỉa dựa trên ngân sách Token.
- **[10.5 Thực thi Tool & Bơm ngược kết quả (Result Injection)](10.5_tool_execution.md)**: Bóc tách bộ lọc chính sách gọi công cụ, cơ chế chặn của hook và cắt tỉa kết quả.
- **[10.6 Luồng xuất (Streaming), Thử lại (Retry) & Kết thúc sớm](10.6_streaming_retry.md)**: Cơ chế phân đoạn thông minh của Block Chunker, chiến lược thử lại có giới hạn và tổng quan chuyển đổi mô hình dự phòng.
- **[10.7 Tóm tắt chương](summary.md)**: Tổng kết các cơ chế vận hành nòng cốt và chuẩn bị liên kết sang các chương về độ tin cậy và an toàn bảo mật.

## Lời khuyên khi đọc

Chương này thuộc "vùng nước sâu" về mặt kỹ thuật. Khi đọc, bạn nên đối chiếu với kiến trúc middleware truyền thống trong tư duy của mình, suy ngẫm lý do vì sao mô hình Agent lại bắt buộc phải đẩy "quản trị trạng thái" lên mức độ tối đa; đồng thời hãy chạy một ca kiểm thử tối thiểu trên máy và bật nhật ký log có cấu trúc để trực tiếp quan sát chuỗi thực thi.
