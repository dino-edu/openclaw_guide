## Phụ lục A: Bảng thuật ngữ (Glossary)

Phụ lục này dùng để tra cứu nhanh các thuật ngữ chuyên môn, được phân loại thành 3 nhóm: Khái niệm cốt lõi, Kênh & Vận hành, Mở rộng & Tích hợp, giúp độc giả nhanh chóng thống nhất ngữ nghĩa khi đọc sách và xử lý sự cố.

### A.1 Thuật ngữ cốt lõi

- **Agent Loop (Vòng lặp Agent)**: Vòng lặp ra quyết định khép kín từ khi tiếp nhận tác vụ đầu vào cho tới khi xuất ra kết quả cuối cùng, bao gồm các giai đoạn: hiểu ý định, lập kế hoạch công cụ, thực thi, kiểm chứng và phản hồi.
- **Agent Runtime (Nhân thực thi Agent)**: Động cơ cốt lõi của việc thực thi, chịu trách nhiệm tiếp nhận tác vụ đã chuẩn hóa, lắp ráp prompt, khởi tạo lệnh gọi mô hình, đồng thời đánh chặn và điều phối công cụ.
- **auth-profile (Hồ sơ xác thực)**: Hồ sơ xác thực của nhà cung cấp mô hình, được cấu thành từ metadata `auth.profiles` và thông tin chứng thư trong `auth-profiles.json`, dùng cho việc quản lý API Key/OAuth, xoay tua, làm nguội và chuyển đổi dự phòng.
- **CalVer (Phiên bản theo lịch)**: Quy chuẩn đánh số phiên bản theo ngày tháng, OpenClaw phát hành phiên bản theo định dạng CalVer, ví dụ `v2026.3.12` biểu thị bản phát hành ngày 12 tháng 03 năm 2026.
- **Compaction (Nén ngữ cảnh)**: Hành vi tóm tắt các bản ghi hội thoại cũ thành một bản tóm tắt mật độ cao có thể kiểm toán, nhằm giải phóng không gian cửa sổ ngữ cảnh.
- **Context Window (Cửa sổ ngữ cảnh)**: Số lượng Token đầu vào và đầu ra tối đa mà một mô hình ngôn ngữ lớn có thể xử lý trong một lượt suy luận duy nhất, quyết định trần dung lượng của lịch sử và tri thức nạp vào.
- **Failover (Chuyển đổi dự phòng)**: Cơ chế an toàn tự động hạ cấp hoặc chuyển luồng sang mô hình/kênh dự phòng khi mô hình chính bị chạm rate limit, timeout hoặc ngắt mạch.
- **Gateway (Cổng kết nối / Mặt phẳng điều khiển)**: Thành phần chịu trách nhiệm quản lý kết nối ngoài (WebSocket/HTTP), xác thực, ghép nối thiết bị, định tuyến tin nhắn và quản trị trạng thái ở cấp hệ thống.
- **HEARTBEAT.md (Tệp danh sách tuần tra)**: Tệp danh sách kiểm tra tùy chọn đặt tại thư mục gốc workspace; prompt nhịp tim mặc định sẽ dẫn dắt Agent đọc tệp này và thực hiện tuần tra định kỳ các tác vụ bên trong.
- **Node (Điểm cuối thiết bị)**: Thiết bị hoặc tiến trình headless companion kết nối với Gateway qua WebSocket, dùng để phơi bày các năng lực ngoại vi như màn hình, camera hoặc công cụ hệ thống.
- **Pi (Agent Runtime)**: Động cơ suy luận Agent mã nguồn mở chạy bên dưới OpenClaw, được nhúng trực tiếp qua Pi SDK (`AgentSession`), chịu trách nhiệm suy luận mô hình, gọi công cụ và thực thi tác vụ.
- **Prompt Assembly (Lắp ráp Prompt)**: Tiến trình tích hợp động nhiều nguồn tín hiệu — tác vụ người dùng, chỉ thị hệ thống, lịch sử đối thoại, tri thức tìm kiếm — thành một gói đầu vào hoàn chỉnh gửi cho mô hình.
- **Pruning (Cắt tỉa ngữ cảnh)**: Áp dụng thuật toán theo độ ưu tiên (như suy giảm theo thời gian hoặc điểm số quan trọng) để tạm thời loại bỏ các kết quả thực thi công cụ cũ có giá trị thấp khỏi bộ nhớ RAM.
- **Session (Phiên làm việc / Thùng chứa trạng thái)**: Trừu tượng hóa việc duy trì tính liên tục của tác vụ qua nhiều vòng, bên trong quản lý trạng thái và bản chụp bộ nhớ ngắn hạn/dài hạn.
- **Skill (Kỹ năng)**: Cơ chế chuẩn hóa phương pháp luận dưới dạng tài liệu văn bản, dùng để đúc kết các bước thực hiện, ràng buộc và tiêu chuẩn nghiệm thu của tác vụ thành quy trình có thể tái sử dụng.
- **SOUL.md (Cấu hình nhân cách Agent)**: Tệp cấu hình định hình nét cá tính, vai trò và phong cách giao tiếp của Agent, giúp kiểm soát giá trị quan và thiên hướng ra quyết định của từng Agent riêng biệt.
- **Token Budget (Ngân sách Token)**: Hạn mức Token được hệ thống phân bổ cho từng phần đầu vào (lịch sử, tài liệu tìm kiếm, chỉ thị...) nhằm bảo đảm không bị tràn cửa sổ Context Window.
- **Tool (Công cụ)**: Đơn vị thực thi nguyên tử giúp mô hình AI tương tác với thế giới bên ngoài, thường được phân chia nghiêm ngặt thành "Công cụ đọc" (an toàn) và "Công cụ ghi" (cần tính bất biến và kiểm toán).

### A.2 Thuật ngữ Kênh & Vận hành (Channels & Ops)

- **Webhook**: Cơ chế hệ thống bên ngoài chủ động gửi HTTP callback để kích hoạt tác vụ OpenClaw trong các workflow hướng sự kiện bất đồng bộ.
- **Pairing (Ghép nối thiết bị)**: Quá trình đưa một thiết bị mới hoặc người gửi DM vào vùng tin cậy thông qua danh tính thiết bị, thử thách challenge-response, sự phê duyệt của con người và cấp phát token.
- **Hook (Điểm xen vòng đời)**: Điểm mở rộng cho phép lập trình viên bơm logic tùy biến vào các mắt xích then chốt trong chuỗi thực thi của Agent (như trước khi dựng prompt, sau khi chạy tool).
- **Cron (Tác vụ định kỳ)**: Hệ thống lập lịch tác vụ do Gateway quản lý, dùng để đánh thức Agent thực hiện tự kiểm tra, tuần tra, tổng hợp hoặc dọn dẹp tại các mốc thời gian chính xác.
- **Rate Limit (Giới hạn tần suất)**: Ngưỡng trần lưu lượng áp dụng lên API ngoài, lượt gọi mô hình hoặc tài nguyên hệ thống, ngăn ngừa quá tải và vượt ngân sách.
- **Cooldown (Thời gian làm nguội)**: Khoảng thời gian hệ thống bắt buộc phải chờ đợi trước khi cho phép thử lại hoặc kích hoạt lại một thao tác vừa bị lỗi.
- **Circuit Breaker (Bộ ngắt mạch)**: Cơ chế bảo vệ tự động ngắt kết nối và báo lỗi ngay lập tức khi một dịch vụ phụ thuộc liên tục thất bại vượt quá ngưỡng cho phép, tránh làm sập dây chuyền.
- **Runbook (Sổ tay vận hành)**: Tài liệu tiêu chuẩn ghi lại các bước xử lý sự cố hệ thống, hoàn tác khẩn cấp và quy trình chẩn đoán định kỳ.
- **Guardrail (Hàng rào bảo vệ)**: Ma trận phòng thủ tổng hợp từ ranh giới quyền hạn, ràng buộc hộp cát Sandbox, bộ lọc kiểm soát nội dung và hệ thống kiểm toán.

### A.3 Thuật ngữ Mở rộng & Tích hợp (Extensions & Integration)

- **MCP (Model Context Protocol)**: Giao thức chuẩn mở do Anthropic khởi xướng, cho phép client LLM giao tiếp chuẩn hóa với các máy chủ ngữ cảnh để truyền tải dữ liệu và định nghĩa công cụ an toàn.
- **Plugin (Tiện ích mở rộng)**: Module phần mềm viết bằng TypeScript/JavaScript được nạp động vào Gateway để bổ sung công cụ, kết nối kênh chat hoặc tùy biến logic runtime.
- **Extension (Mở rộng)**: Khái niệm chung chỉ các tinh chỉnh và bổ sung năng lực chuyên sâu vào lõi OpenClaw hoặc hệ thống plugin.
- **Sandbox (Hộp cát)**: Môi trường container cách ly (Docker, OpenShell, SSH) giới hạn quyền thực thi mã lệnh và phạm vi truy cập tài nguyên, ngăn chặn mã độc thoát ra máy chủ host.
- **Exec Approval (Phê duyệt thực thi lệnh)**: Cổng kiểm soát phê duyệt cục bộ đối với các lệnh shell cấp hệ điều hành trên máy host, chồng lớp lên trên chính sách công cụ và elevated gate.
- **Trust Chain (Chuỗi tin cậy)**: Chuỗi xác thực hoàn chỉnh từ nguồn dữ liệu đến lúc thực thi cuối cùng, bảo đảm kết quả của các bước trung gian đáng tin cậy và không bị giả mạo.
- **Vector Index (Chỉ mục vector)**: Cấu trúc dữ liệu phục vụ tìm kiếm nhanh dựa trên Embedding, dùng để tăng tốc các truy vấn tương đồng ngữ nghĩa.
- **Embedding (Nhúng vector)**: Quá trình chuyển đổi văn bản, mã nguồn thành các vector số học đa chiều để tính toán độ tương đồng ngữ nghĩa.
- **Hybrid Search (Tìm kiếm kết hợp)**: Chiến lược tìm kiếm kết hợp giữa truy vấn từ khóa truyền thống (BM25) và độ tương đồng vector, nâng cao độ chuẩn xác và tỷ lệ bao phủ của kết quả.
