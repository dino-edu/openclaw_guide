## Phụ lục C: Bảng kiểm tra xử lý sự cố (Troubleshooting Checklist)

Phụ lục này cung cấp danh sách kiểm tra có thể thực thi trực tiếp, mục tiêu là dùng số lượng câu lệnh ít nhất để định vị lỗi vào đúng tầng phân loại, sau đó đào sâu vào chương tương ứng. Trình tự kiểm tra khuyến nghị tuân thủ từ ngoài vào trong: Tiến trình & Cấu hình → Gateway & Kênh liên lạc → Mô hình AI & Công cụ → Phiên & Bộ nhớ.

### C.1 Kiểm tra lỗi khởi động thất bại

Các mục kiểm tra:

1. Runtime và phụ thuộc có đáp ứng yêu cầu không (Node.js 24.16+/26.1+, Docker...).
2. Đường dẫn và cú pháp tệp cấu hình có chuẩn xác không (đặc biệt là chú thích JSON5 và dấu phẩy đuôi).
   - **Lỗi điển hình**: `SyntaxError: JSON5: invalid character '}' at 12:4`
3. Cổng kết nối có bị chiếm dụng không.
   - **Lỗi điển hình**: `EADDRINUSE: address already in use :::18789`
4. Khóa bí mật và token xác thực đã được nạp và còn hạn không.

Câu lệnh thông dụng:

```bash
# Khám sức khỏe và chẩn đoán toàn diện
openclaw doctor

# Xem các dòng log khởi động gần nhất
openclaw logs --limit 200

# Kiểm tra tiến trình chiếm dụng cổng
lsof -nP -iTCP -sTCP:LISTEN | head
```

Tài liệu liên quan:
- [Mục 2.4 Dịch vụ Gateway daemon & Nghiệm thu tính khả dụng](../02_setup/2.4_gateway_service.md)
- [Mục 4.1 Cấu trúc openclaw.json & Thứ tự ưu tiên cấu hình](../04_config_models/4.1_config_system.md)

---

### C.2 Kiểm tra sự cố kênh liên lạc

Các mục kiểm tra:

1. Token của bot và quyền hạn trên kênh có hợp lệ không.
   - **Lỗi điển hình**: `[Telegram] Polling error: 401 Unauthorized`
2. Quan hệ ghép nối có chính xác không, có yêu cầu ghép nối nào đang chờ duyệt không.
   - **Lỗi điển hình**: `[Gateway] Connection rejected: device 9f8a not paired`
3. Định tuyến có trúng đích Agent mong muốn không, quyền sở hữu phiên có ổn định không.
4. Trạng thái live probe của kênh và nhật ký log có đồng nhất không.

Câu lệnh thông dụng:

```bash
openclaw channels status --probe
openclaw logs --limit 200
```

Tài liệu liên quan:
- [Mục 3.2 Các lệnh chẩn đoán thông dụng & Xử lý sự cố qua Logs](../03_minimal_loop/3.2_diagnostics.md)
- [Mục 9.5 Ghép nối kênh & Thiết lập vùng tin cậy cục bộ](../09_gateway_protocol/9.5_pairing_trust.md)

---

### C.3 Kiểm tra sự cố công cụ (Tool)

Các mục kiểm tra:

1. Có bị chính sách công cụ từ chối hoặc bị chặn do thiếu quyền không.
   - **Lỗi điển hình**: `ToolError: exec denied by default policy`
2. Định dạng tham số có khớp với Schema không, có thiếu trường bắt buộc hoặc sai kiểu dữ liệu không.
   - **Lỗi điển hình**: `SchemaValidationError: missing required property 'amount'`
3. Môi trường thực thi có đủ quyền hạn và kết nối mạng không (Sandbox có bị siết quá chặt không).
4. Kết quả công cụ có được cấu trúc hóa và bơm ngược vào ngữ cảnh thành công không, có bị cơ chế cắt tỉa xóa mất không.
   - **Biểu hiện điển hình**: Log thông báo `Max context window exceeded, discarding output of tool 'web_search'`

Câu lệnh thông dụng:

```bash
# Phát lại chuỗi thực thi công cụ theo traceId
openclaw logs --limit 500 --json | jq -c 'select(.type=="log") | (.raw | fromjson? // {}) | select(.traceId=="t-...") | {ts:(.time // .ts), traceId, message, agent_id, session_id, channel}'
```

Tài liệu liên quan:
- [Mục 5.2 Chính sách Tool: Cho phép, từ chối & Phân tầng chính sách](../05_tools_skills/5.2_tool_policy.md)
- [Mục 10.5 Thực thi Tool & Bơm ngược kết quả](../10_agent_loop/10.5_tool_execution.md)

---

### C.4 Kiểm tra sự cố mô hình AI

Các mục kiểm tra:

1. Mô hình chính có bị rate limit (429), timeout hoặc lỗi xác thực (401) không.
   - **Lỗi điển hình**: `ProviderError: 429 Too Many Requests (OpenAI)` hoặc `401 Invalid API Key`
2. Chuỗi fallback có kích hoạt không, có để lại chuỗi bằng chứng rõ ràng không.
   - **Biểu hiện điển hình**: `[WARN] Model openai/gpt-5.4 timed out. Falling back to anthropic/claude-sonnet-4-6`
3. Trạng thái làm nguội (Cooldown) có hoạt động đúng không, có bị bão thử lại không.
4. Hồ sơ xác thực và khóa API có bị hết hạn hay bị thu hồi không.

Câu lệnh thông dụng:

```bash
# Thống kê tỷ lệ phân loại các nhóm lỗi
openclaw logs --limit 500 --json | jq -r 'select(.type=="log") | (.raw | fromjson? // {}) | select((.message // "") | test("model|provider|fallback|rate"; "i")) | (.error // .message)' | sort | uniq -c | sort -nr | head
```

Tài liệu liên quan:
- [Mục 11.1 Quản trị đa khóa: Hồ sơ xác thực & Thứ tự auth.order](../11_reliability_security/11.1_auth_profiles.md)
- [Mục 11.2 Làm nguội & Vô hiệu hóa: Cơ chế ngăn chặn lỗi lan rộng](../11_reliability_security/11.2_rotation_cooldown.md)
- [Mục 11.3 Chuỗi dự phòng mô hình & Phân luồng xử lý lỗi](../11_reliability_security/11.3_fallback_rules.md)

---

### C.5 Kiểm tra sự cố Phiên & Bộ nhớ

Hiện tượng: "Mô hình vừa nói xong đã quên ngay" hoặc "Liên tục bắt người dùng nhập lại thông tin".

Các mục kiểm tra:

1. Quyền sở hữu phiên có bị trôi dạt không (cùng một người dùng bị gán nhầm sang 2 session khác nhau).
   - **Phương pháp chẩn đoán**: Dùng log có cấu trúc lọc theo `session_id` và `traceId` để đối soát.
2. Ngân sách Token có bị chạm trần khiến thông tin gần nhất bị cắt tỉa không.
   - **Phương pháp chẩn đoán**: Quan sát tần suất các sự kiện nén/cắt tỉa trong log.
3. Tệp lưu trữ phiên có đọc ghi được không, có bị lỗi ghi đĩa không.
   - **Phương pháp chẩn đoán**: Kiểm tra quyền truy cập và mốc thời gian sửa đổi của `~/.openclaw/agents/<agentId>/sessions/sessions.json`.

Câu lệnh thông dụng:

```bash
openclaw status --deep
openclaw logs --limit 500 --json | jq -c 'select(.type=="log") | (.raw | fromjson? // {}) | select((.session_id // "")!="") | {ts:(.time // .ts), traceId, session_id, message, error}' | tail
```

Khi cần xuất gói chẩn đoán gửi cho đội ngũ hỗ trợ:

```bash
openclaw gateway diagnostics export --json
# Hoặc gõ lệnh trong cửa sổ chat:
/diagnostics [thông tin bổ sung]
```

---

### C.6 Tái kiểm chứng & Quy trình khép kín

Các mục kiểm tra:

1. Sau khi sửa lỗi xong, đã hoàn thành tái kiểm chứng trên cùng một kịch bản và phát lại trace trọng yếu chưa.
2. Đã cập nhật lại Runbook vận hành, ngưỡng cảnh báo và chính sách fallback tương ứng chưa.
3. Đã ghi nhận nguyên nhân, hành động xử lý, điểm hoàn tác và chuỗi bằng chứng vào báo cáo sự cố chưa.

Tài liệu liên quan:
- [Mục 12.3 Kiểm thử & Gỡ lỗi: Biến tiện ích mở rộng thành quy trình có thể tái hiện](../12_extension_engineering/12.3_testing_debugging.md)
