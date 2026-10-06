# Chương 14: Thực chiến tối ưu hiệu năng & Chi phí

Chương này tiếp cận từ 4 chiều kích: Tiêu thụ Token, Độ trễ suy luận, Quan sát lượng dùng và Quản trị ngân sách, cung cấp phương án tối ưu hóa có hệ thống dựa trên năng lực quan sát tích hợp sẵn của OpenClaw, hạn mức của nhà cung cấp và các cơ chế quản trị ngoài, giúp bạn cắt giảm chi phí vận hành hiệu quả trong khi vẫn duy trì chất lượng dịch vụ cao nhất.

## Mục lục hướng dẫn chương

Chương này bao gồm các mục sau:

- **[14.1 Chi phí Token & Chi phí ngữ cảnh (Context Cost)](14.1_token_context_cost.md)**: Phân tích luồng tiêu thụ Token, tinh gọn Prompt hệ thống, chiến lược nén và cắt tỉa ngữ cảnh (Compaction & Pruning), phân tầng lựa chọn mô hình.
- **[14.2 Tối ưu hóa độ trễ (Latency) & Băng thông xử lý (Throughput)](14.2_latency_throughput.md)**: Mô hình hóa phân rã độ trễ (LLM + Công cụ + Sandbox + Điều phối), sự tích lũy độ trễ trong hệ thống đa Agent, mô hình chi phí có cấu trúc.
- **[14.3 Quan sát mức tiêu thụ & Kiểm soát ngân sách trên OpenClaw](14.3_usage_budget.md)**: Các lệnh đo lường tích hợp (`/status`, `/usage cost`, `/compact`), khung nhìn Dashboard Usage, cùng cơ chế hạn mức provider, giám sát ngoài và plugin quản trị.
- **[14.4 Mẫu ngân sách triển khai cho các quy mô khác nhau](14.4_budget_templates.md)**: Bóc tách các yếu tố chi phí và bảng dự toán ngân sách cho 3 quy mô: Cá nhân, Nhóm vừa, và Doanh nghiệp.
- **[14.5 Tóm tắt chương](summary.md)**: Các kết luận trọng yếu và checklist tối ưu hóa.
