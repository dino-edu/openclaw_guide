## Phụ lục D: Tham chiếu API & SDK (API Reference)

Phụ lục này đóng vai trò là "Cẩm nang định vị lối vào nhanh", không nhằm mục đích thay thế tài liệu chi tiết của từng API. Các trường dữ liệu và giao diện có thể thay đổi nhẹ giữa các phiên bản: Hãy luôn dùng cờ `--help` của CLI, `status --deep` và nhật ký log có cấu trúc để tự đối soát.

### D.1 Cổng vào Mặt phẳng điều khiển (Tài liệu chính thức)

- Tổng quan cấu hình Gateway: <https://docs.openclaw.ai/gateway/configuration>
- An toàn bảo mật Gateway: <https://docs.openclaw.ai/gateway/security>
- Kênh liên lạc (Channels): <https://docs.openclaw.ai/cli/channels>
- Quản trị mô hình (Models): <https://docs.openclaw.ai/cli/models>
- Hệ thống Plugin: <https://docs.openclaw.ai/cli/plugins>

Khuyến nghị kiểm tra tính sẵn sàng của các lệnh cấu hình và trạng thái trước khi bước vào tích hợp API.

### D.2 Cụm lệnh CLI xử lý sự cố tuyến đầu

Dưới đây là bộ lệnh tối thiểu được khuyến nghị dùng làm bước kiểm tra môi trường và phát lại sự cố:

```bash
openclaw doctor
openclaw health --json
openclaw status --deep
openclaw channels capabilities
openclaw models status
openclaw models status --probe
openclaw logs --follow --json
```

Cụm lệnh này bao phủ trọn vẹn: Khám sức khỏe phụ thuộc, trạng thái vận hành, đầu dò kênh, trạng thái xác thực mô hình, live auth probe của provider và phát lại chuỗi xử lý.

### D.3 Tài liệu tham khảo WebSocket & Luồng sự kiện

Khi cần ghép nối kết nối dài và lắng nghe sự kiện:

- Giao thức Gateway: <https://docs.openclaw.ai/gateway/protocol>
- Khôi phục khoảng trống dữ liệu (Gap recovery) & Runbook: <https://docs.openclaw.ai/gateway#gap-recovery>
- Ghép nối thiết bị & Quản trị vùng tin cậy: <https://docs.openclaw.ai/cli/devices>

Ba nguyên tắc vàng khi lập trình giao diện:

1. **Tầng kết nối có thể phục hồi** (Nhịp tim keepalive, thuật toán reconnect, điểm khôi phục).
2. **Tầng sự kiện có thể đối soát** (event id, `seq`, `stateVersion`, khóa bất biến, phân loại lỗi).
3. **Tầng thực thi có thể giới hạn quyền** (Chính sách công cụ và ràng buộc Sandbox).

### D.4 Lời khuyên khi tích hợp SDK

Khi nhúng năng lực OpenClaw vào ứng dụng của bạn, hãy tuân thủ trình tự "Xác minh qua CLI trước, Tích hợp SDK/HTTP sau":

1. Chạy thông luồng hoàn chỉnh qua CLI và cố định bộ lệnh nghiệm thu trước.
2. Đóng gói lệnh gọi ở tầng ứng dụng, lưu giữ đầy đủ request id / idempotency key, event id / seq / stateVersion và phân loại lỗi; lưu thêm `traceId` làm dữ liệu hỗ trợ phát lại.
3. Tích hợp các cơ chế Fallback, Thử lại, Timeout và Kiểm toán vào sổ tay vận hành Runbook chung.

Đừng chỉ dựa vào trí nhớ: Hãy dùng `openclaw config schema` / `openclaw config validate` để kiểm tra schema, và dùng `openclaw sandbox explain --json` để chứng minh ranh giới công cụ và sandbox có hiệu lực của Agent/Session hiện tại.
