## Phụ lục F: Bản đồ phiên bản & Hướng dẫn nâng cấp (Version Mapping)

Phụ lục này không áp đặt các trường cấu hình cũ một cách máy móc, mà cung cấp một phương pháp nâng cấp hệ thống an toàn hơn: Nhận diện họ Schema hiện tại trước, sau đó dùng `doctor`, `config validate` và `config get/set/unset` để thực hiện di trú tiệm tiến.

> [!WARNING]
> OpenClaw sử dụng sơ đồ đánh số phiên bản theo lịch (CalVer), cấu trúc và tên trường dữ liệu có thể tiếp tục tiến hóa giữa các phiên bản. Phụ lục này cung cấp tư duy di trú và cấu trúc quan sát được từ mã nguồn hiện tại, không thay thế cho tài liệu chính thức, đầu ra `openclaw --version` và `config schema` trên máy bạn.

### F.1 Cơ chế đánh số phiên bản (Versioning Scheme)

OpenClaw áp dụng **đánh số phiên bản theo ngày tháng (CalVer)**. Phiên bản ổn định thường có dạng `YYYY.M.D`, phiên bản thử nghiệm có thể mang hậu tố `-alpha.N` hoặc `-beta.N`:

- `YYYY`: Năm phát hành
- `M`: Tháng phát hành
- `D`: Ngày phát hành

Ví dụ:
```text
2025.11.15  →  2026.1.9  →  2026.2.14  →  2026.3.30  →  2026.5.12
```

Giá trị lớn nhất của CalVer là "số hiệu phiên bản tự mang ý nghĩa thời gian". Khi đưa ra phán đoán di trú, trước tiên hãy xác nhận số hiệu phiên bản bạn đang chạy, sau đó mới đối chiếu tài liệu và schema tương ứng.

### F.2 Tổng quan các họ Schema hiện hành

Các họ Schema ổn định và quan trọng nhất cần nhận diện:

| Họ Schema | Cấu trúc thường gặp hiện nay | Diễn giải ý nghĩa |
|---|---|---|
| **Xác thực (Auth)** | `auth.profiles` | Hồ sơ xác thực gắn với provider, không viết thẳng toàn bộ key vào một trường phẳng |
| **Agent** | `agents.defaults` + `agents.entries.*` | "Mặc định toàn cục + Ghi đè theo từng agent" là cách tổ chức chuẩn |
| **Mô hình (Model)** | `agents.defaults.model` (chuỗi hoặc `{ primary, fallbacks }`) | Điểm cấu hình mô hình chính và chuỗi dự phòng tường minh |
| **Kênh liên lạc** | `channels.<channel>.dmPolicy` / `groupPolicy` | Quản trị tách rời giữa Chat riêng và Chat nhóm là hạt nhân của cổng vào |
| **Gateway** | `gateway.port` / `gateway.auth.mode` / `allowedOrigins` | Xác thực mặt phẳng điều khiển và xác minh nguồn gốc trình duyệt tường minh |
| **Hook** | `hooks.internal.entries.*` | Nhận diện hệ thống Hook nội bộ của Gateway |
| **Plugin** | `plugins.entries.*` | Quản trị plugin qua `plugins.entries`; bundle tương thích chỉ là lớp nạp phụ |

Nhận diện được các họ schema này sẽ giúp bạn không bị dẫn dắt lạc lối bởi các tên trường cũ.

### F.3 Tư duy di trú từ cấu trúc cũ sang cấu trúc mới

Bảng đối chiếu định hướng di trú an toàn:

| Cách viết lịch sử | Nên di trú sang cấu trúc mới | Nguyên tắc di trú |
|---|---|---|
| Cấu hình Agent đơn khối | `agents.defaults` + `agents.entries.*` | Tách các giá trị chung ra mặc định, chỉ ghi đè điểm khác biệt |
| Danh sách mảng `agents.list[]` (ghi `id` bên trong) | Đối tượng ánh xạ `agents.entries.<id>` | `agents.list` đã chuyển thành legacy, dùng `openclaw doctor --fix` để tự động chuyển |
| Chuỗi model đơn `agents.*.model` | `agents.defaults.model.primary` + `fallbacks` | Tường minh hóa mô hình chính và chuỗi dự phòng fallback |
| Công tắc cổng vào kênh một tầng | `dmPolicy` / `groupPolicy` / `groups.*` | Tách riêng chat riêng và nhóm chat, kết hợp tag tên và allowlist |
| Các trường an toàn rải rác ở root | `gateway.auth`, `allowedOrigins`, `tools` | Phân tầng rõ giữa xác thực Gateway, kiểm tra Origin và chính sách Tool |
| Giả định Hook theo thư mục cũ | `hooks.internal.entries.*` | Xem phiên bản hiện tại đã có hệ thống Hook nội bộ nào |
| Ghi lộ API key trong file JSON | `auth.profiles` + `${ENV}` / SecretRef | Chuyển toàn bộ sang cơ chế nạp biến môi trường hoặc SecretRef |

### F.4 Cảnh báo những tư duy cấu hình đã lỗi thời

Khi nâng cấp, cạm bẫy lớn nhất là **vô tình áp dụng lại cả một hệ tư duy cấu hình đã quá hạn**:

- Viết các trường như `agents.default`, `agents.*.models` kiểu cũ, `gateway.listeners` như thể là cách viết hiện hành.
- Viết `channels.<channel>.requireMention` (ở cấp cao nhất của kênh) thay vì viết ở cấp nhóm `channels.<channel>.groups."*".requireMention`.
- Viết các trường xác thực một tầng kiểu `auth.type`, `auth.useKeyFile` mà bỏ quên `auth.profiles`.
- Copy nguyên xi các đoạn cấu hình mẫu từ các bài viết cũ trên mạng mà không đối chiếu schema.

Nguyên tắc vàng: **Dùng schema để nhận diện họ cấu hình trước, sau đó mới dùng ví dụ để ánh xạ trường dữ liệu**.

### F.5 Các câu lệnh di trú khả dụng

#### Lệnh `openclaw doctor`

Chẩn đoán cấu hình và sức khỏe runtime, tự động xử lý các di trú legacy được hỗ trợ chính thức:

```bash
openclaw doctor
openclaw doctor --deep
openclaw doctor --repair
```

#### Lệnh `openclaw config`

Đọc, xác thực và chỉnh sửa chính xác từng trường cấu hình:

```bash
openclaw config file
openclaw config validate
openclaw config get gateway.auth.mode
openclaw config set gateway.auth.mode token
openclaw config unset legacy.oldField
```

#### Lệnh `openclaw secrets`

Quản trị đường ống chứng thư bí mật:

```bash
openclaw secrets audit --check
openclaw secrets configure
openclaw secrets apply --from /tmp/openclaw-secrets-plan.json --dry-run
openclaw secrets apply --from /tmp/openclaw-secrets-plan.json
openclaw secrets reload
```

### F.6 Quy trình nâng cấp khuyến nghị

Tuân thủ nghiêm ngặt quy trình: **Sao lưu → doctor → validate → Bổ sung thủ công → Chẩn đoán sâu → Kiểm thử hồi quy**:

#### Các bước thực hiện nhanh:

```bash
# 1. Sao lưu toàn bộ thư mục cấu hình hiện tại
cp -r ~/.openclaw ~/.openclaw.backup.$(date +%Y%m%d_%H%M%S)

# 2. Chạy doctor để tự động xử lý các di trú đã biết
openclaw doctor

# 3. Xác thực cấu trúc cấu hình mới
openclaw config validate

# 4. Đọc kiểm tra các giá trị then chốt
openclaw config get gateway.auth.mode
openclaw config get agents.defaults.model.primary

# 5. Bổ sung các trường mới theo schema hiện hành
openclaw config set gateway.auth.mode token

# 6. Chẩn đoán chuyên sâu toàn diện
openclaw doctor --deep
```

#### Quy trình hoàn tác khẩn cấp (Rollback):

```bash
mv ~/.openclaw ~/.openclaw.rollback.$(date +%Y%m%d_%H%M%S)
mv ~/.openclaw.backup.YYYYMMDD_HHMMSS ~/.openclaw
openclaw gateway restart
```

### F.7 Các hạng mục ưu tiên kiểm tra lại sau khi nâng cấp

1. Control UI trên trình duyệt có kết nối bình thường không.
2. `gateway.auth.mode` và `gateway.controlUi.allowedOrigins` có đúng với phương thức triển khai không.
3. Mô hình chính `agents.defaults.model.primary` và `fallbacks` có trỏ tới mô hình khả dụng không.
4. `dmPolicy` và `groupPolicy` có đúng với chính sách cổng vào mong muốn không.
5. Các Hook, Plugin và Chính sách công cụ có hoạt động đúng kỳ vọng không.

### F.8 Tóm tắt phụ lục

Chìa khóa của việc di trú phiên bản không phải là học vẹt một bảng ánh xạ cũ-mới, mà là nắm bắt các họ Schema cốt lõi:
- Xác thực: `auth.profiles`
- Agent: `agents.defaults` và `agents.entries.*`
- Mô hình: `agents.defaults.model`
- Kênh chat: `dmPolicy / groupPolicy`
- Gateway: `gateway.auth + allowedOrigins`
- Hook: `hooks.internal`
- Plugin: `plugins.entries`

Chạy `doctor` trước, dùng `config validate` và `config get/set/unset` để tinh chỉnh từng bước là con đường nâng cấp đáng tin cậy nhất.
