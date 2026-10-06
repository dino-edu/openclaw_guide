## Phụ lục B: Bản mẫu cấu hình & Ví dụ (Config Templates)

Phụ lục này cung cấp các ví dụ cấu hình định dạng JSON5 chuẩn hóa theo tài liệu chính thức, giúp bạn nhanh chóng dựng một hệ thống tối thiểu khả dụng, đồng thời định hướng cách thức tổ chức cấu hình để mở rộng dần lên môi trường sản xuất. Các chi tiết trường dữ liệu có thể tiếp tục tiến hóa giữa các phiên bản, khuyến nghị luôn dùng `openclaw doctor` và `openclaw status` để xác minh sau mỗi lần thay đổi.

### B.1 Vị trí tệp cấu hình & Định dạng

Tệp cấu hình chính của OpenClaw Gateway mặc định nằm tại `~/.openclaw/openclaw.json`. Tệp được phân giải theo chuẩn JSON5; các ví dụ trong sách sử dụng phong cách JSON5 kèm chú thích giải thích để thuận tiện cho việc đọc hiểu và bảo trì.

Khuyến nghị phân tách quản trị cấu hình thành 2 tầng:

- **Tầng cấu trúc**: Chính sách kênh chat, phiên và bộ nhớ, quản trị công cụ, thiết lập chẩn đoán...
- **Tầng bí mật**: Khóa API của nhà cung cấp mô hình, token kênh chat..., được nạp qua biến môi trường hoặc hệ thống quản lý khóa SecretRef.

### B.2 Cấu hình tối thiểu khả dụng (Chế độ Local + Xác thực qua Web)

Mẫu cấu hình dùng để bắt đầu trên máy cá nhân: Chạy chế độ cục bộ (local mode), bật ghi log chẩn đoán, và giữ nguyên thư mục workspace mặc định. Sau khi khởi động, dùng `health/status` kiểm tra rồi mở Dashboard để trải nghiệm:

> [!WARNING]
> OpenClaw áp dụng cơ chế xác thực Schema rất nghiêm ngặt. Việc khai báo các trường không nhận diện được sẽ khiến Gateway từ chối khởi động.

```json5
{
  gateway: {
    mode: "local",
  },

  logging: {
    file: "/tmp/openclaw/openclaw.log",
    level: "info",
    consoleLevel: "info",
    consoleStyle: "pretty",
    // Lưu ý: Tính năng làm mờ nhạy cảm hiện đã cố định bật sẵn,
    // trường tùy biến còn lại là redactPatterns bên dưới
  },

  diagnostics: {
    enabled: true,
    cacheTrace: {
      enabled: true,
    },
  },

  agents: {
    defaults: {
      workspace: "~/.openclaw/workspace",
    },
  },
}
```

Lệnh xác minh vận hành:

```bash
openclaw health --json
openclaw status --deep
openclaw dashboard
```

### B.3 Mẫu an toàn khởi đầu cho WhatsApp (Ghép nối + Danh sách trắng + Cổng nhóm chat)

Mẫu cấu hình thu hẹp bề mặt kích hoạt vào vùng kiểm soát:

- **Chat riêng (DM)**: Mặc định bật ghép nối (`pairing`), người lạ bắt buộc phải qua phê duyệt.
- **Danh sách trắng (Allowlist)**: Chỉ cho phép các số điện thoại được chỉ định kích hoạt bot.
- **Chat nhóm (Group)**: Mặc định bắt buộc phải tag tên (@), kết hợp danh sách trắng nhóm chat.

```json5
{
  channels: {
    whatsapp: {
      dmPolicy: "pairing",
      allowFrom: ["+15555550123"],

      groupPolicy: "allowlist",
      groupAllowFrom: ["+15555550123"],

      groups: {
        "120363000000000000@g.us": { requireMention: true },
      },
    },
  },

  messages: {
    groupChat: {
      mentionPatterns: ["@openclaw"],
    },
  },
}
```

Tham khảo thêm:
- Kênh WhatsApp: https://docs.openclaw.ai/channels/whatsapp
- Lệnh ghép nối: https://docs.openclaw.ai/cli/pairing

### B.4 Mẫu tối thiểu cho Telegram (Đơn tài khoản)

Telegram lấy Bot Token làm hạt nhân, rất phù hợp để kiểm chứng nhanh tính năng:

```json5
{
  channels: {
    telegram: {
      enabled: true,
      botToken: "${TELEGRAM_BOT_TOKEN}",

      dmPolicy: "allowlist",
      allowFrom: ["tg:123456789"],

      groupPolicy: "disabled",
    },
  },
}
```

Tài liệu tham khảo kênh Telegram: [Telegram](https://docs.openclaw.ai/channels/telegram).

### B.5 Mẫu Quản trị Công cụ (Tool Governance)

Cấu hình chính thức lấy `tools.profile` làm mẫu cơ sở, kết hợp `tools.allow` và `tools.deny`. Quy tắc mặc định là cho phép toàn bộ công cụ của profile đó; quy tắc từ chối tường minh (`deny`) sẽ ghi đè cho phép (`allow`); đồng thời có thể phân tầng hạn chế theo từng kênh, nhóm chat hoặc người gửi:

```json5
{
  tools: {
    profile: 'coding',
    deny: ['group:runtime'],
  },
  channels: {
    whatsapp: {
      groups: {
        '*': {
          tools: { deny: ['group:runtime', 'write', 'edit', 'apply_patch'] },
        },
      },
    },
    telegram: {
      groups: {
        '*': {
          tools: { deny: ['group:runtime'] },
          toolsBySender: {
            'id:123456789': { alsoAllow: ['write'] },
          },
        },
      },
    },
  },
}
```

### B.6 Mẫu Lưu trữ Bền vững & Bộ nhớ

Cấu hình mẫu cho việc lưu trữ phiên và nén ngữ cảnh:

```json5
{
  session: {
    // Chính sách đặt lại (reset), phạm vi tác động (scope) và dọn dẹp phiên
  },
  agents: {
    defaults: {
      // Công tắc cốt lõi của nén ngữ cảnh và bộ nhớ
      // Lưu ý: Tìm kiếm bộ nhớ hiện cấu hình tại memory.search ở cấp cao nhất
      contextPruning: {
        mode: "cache-ttl"
      },
      compaction: {
        enabled: true,
        memoryFlush: {
          // Mặc định bật; chỉ đặt false khi cần tắt
        }
      }
    }
  }
}
```

Lệnh xác minh:

```bash
openclaw status --deep
openclaw logs --limit 500 --json
```

### B.7 Mẫu Tệp Kỹ năng (SKILL.md)

Kỹ năng được lưu tại `<workspace>/skills/<skill-name>/SKILL.md`:

```markdown
---
name: channel-troubleshooting
description: Quy trình xử lý sự cố khi kênh không phản hồi, ghép nối thất bại hoặc nhóm chat không kích hoạt
---

# Xử lý sự cố kênh liên lạc

## Kịch bản áp dụng

Kênh không phản hồi tin nhắn, ghép nối thiết bị thất bại, nhóm chat không kích hoạt bot.

## Các bước thực hiện

1. Chạy lệnh `openclaw doctor`.
2. Chạy lệnh `openclaw channels capabilities` hoặc `openclaw channels status --probe`.
3. Căn cứ theo mã `traceId` trong nhật ký log để phát lại chuỗi xử lý và định vị lỗi.

## Yêu cầu đầu ra

Đầu ra bắt buộc bao gồm: Câu lệnh thực thi, Đầu ra kỳ vọng, Nhánh xử lý ngoại lệ và Bước tiếp theo.
```

> Kỹ năng chỉ là tài liệu hướng dẫn phương pháp thực hiện, không phải ranh giới phân quyền runtime; các công cụ rủi ro cao bắt buộc phải chịu sự kiểm soát của Chính sách công cụ và Sandbox.

### B.8 Hướng dẫn sử dụng & Khuyến nghị nghiệm thu

Trình tự nghiệm thu cấu hình chuẩn mực: **Tự kiểm tra trước → Chạy đầu dò probe → Tương tác thực tế**:

- **Tự kiểm tra (Self-check)**: Đảm bảo cấu trúc file và phụ thuộc hệ thống không có lỗi cú pháp.
- **Đầu dò (Probe)**: Xác nhận kết nối tới mô hình AI và các kênh chat hoạt động bình thường.
- **Tương tác**: Dùng một số lượng nhỏ tin nhắn thực tế để xác minh định tuyến, cổng kiểm soát và chính sách công cụ.

### B.9 Bảng ánh xạ di trú các trường cấu hình lịch sử

OpenClaw áp dụng cơ chế xác thực Schema nghiêm ngặt. Khi đưa cấu hình từ phiên bản cũ sang phiên bản mới, nếu gặp lỗi từ chối khởi động, bạn có thể chạy `openclaw doctor --repair` để tự động sửa chữa, hoặc tham khảo bảng đối chiếu dưới đây:

| Cấu hình phiên bản cũ | Cấu hình chuẩn mới tương ứng | Ghi chú di trú |
|---|---|---|
| `diagnostics.logPath` | `logging.file` | Toàn bộ log chuyển về namespace thống nhất `logging`. |
| `diagnostics.redact` / `maskedEnv` | `logging.redactPatterns` | Tách rời tính năng làm mờ nhạy cảm vào đối tượng logging. |
| Hardcode mật khẩu / API Key trong JSON | Dùng biến nội suy `${VAR}` hoặc đối tượng `SecretRef` | Tuyệt đối không ghi văn bản thuần trong JSON trong môi trường sản xuất. |
| Chuỗi ma thuật tiền tố `ENV:` | Dùng cú pháp nội suy `${VAR_NAME}` | Chuẩn hóa theo cú pháp biến môi trường `${}`. |
| `routing.allowFrom` / `routing.groupChat.*` | `channels.whatsapp.allowFrom`, `channels.<channel>.groups."*".requireMention`, `messages.groupChat.*` | Cổng kiểm soát nhóm chat thuộc về chính sách kênh; chỉ các mục ngữ cảnh chung mới nằm trong `messages.groupChat`. |
