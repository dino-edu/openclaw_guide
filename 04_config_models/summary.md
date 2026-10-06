## 4.5 Tóm tắt chương

Chương 4 đã nâng cấp bài toán từ "mô hình gọi được" lên thành "mô hình trong tầm kiểm soát". Cốt lõi của vấn đề không phải là liên tục chạy theo mô hình mạnh hơn, mà là biến cấu hình, xác thực, lựa chọn mô hình và chuyển đổi dự phòng thành các năng lực hệ thống có thể giải thích được.

### 4.5.1 Các kết luận trọng yếu

- **Cấu hình quyết định hành vi**: Phân định ranh giới phạm vi tác động (Scope) trước, sau đó mới bàn đến thứ tự ưu tiên và bằng chứng có hiệu lực.
- **Kết nối nhà cung cấp phải đảm bảo khả năng thay thế linh hoạt**: Nạp khóa API an toàn qua biến môi trường/SecretRef, cách ly môi trường và cơ chế xoay tua là những yêu cầu căn bản.
- **Lựa chọn mô hình phải được chuẩn hóa kỹ thuật**: Cân đối theo khung 4 chiều Chất lượng / Chi phí / Độ trễ / Độ tin cậy, kết hợp chạy hồi quy trên bộ ca kiểm thử cố định.
- **Chuyển đổi dự phòng phải kiểm chứng được**: Thử lại, xoay tua tài khoản, fallback và làm nguội (Cooldown) bắt buộc phải kích hoạt được và giải thích được trong các bài diễn tập thực tế.

### 4.5.2 Vòng lặp tối thiểu (Có thể áp dụng ngay)

Dưới đây là một cấu hình mẫu "tối giản chỉ làm những việc quan trọng nhất của chương này": Thiết lập mô hình chính mặc định, cấu hình một chuỗi fallback dự phòng và dùng các lệnh chuẩn để nghiệm thu.

1) Đoạn cấu hình (Hợp nhất vào tệp `~/.openclaw/openclaw.json` của bạn):

```javascript
{
  // Nếu bạn đã hoàn tất xác thực provider tích hợp qua openclaw onboard,
  // khối models.providers có thể lược bỏ — thông tin xác thực đã nằm trong auth-profiles.
  // Chỉ khai báo khi cần tùy biến baseURL, HTTP headers hoặc kết nối provider tùy biến.

  agents: {
    defaults: {
      model: {
        primary: "openai/gpt-5.4",
        fallbacks: ["anthropic/claude-sonnet-4-6"],
      },
    },
  },
}
```

2) Các câu lệnh nghiệm thu (Đánh giá bằng kết quả thực tế, không dựa vào cảm tính):

```bash
openclaw doctor
openclaw models status
openclaw models status --probe
openclaw status --deep
```

Mục tiêu đạt được: Trạng thái xác thực có thể giải thích được, live auth của provider kiểm chứng được, mô hình mặc định minh bạch, và chuỗi fallback tồn tại sẵn sàng cho diễn tập.

### 4.5.3 Câu hỏi tự kiểm tra

- Bạn có thể trình bày chuỗi bằng chứng chứng minh "giá trị có hiệu lực cuối cùng của một trường cấu hình" (đường dẫn file, kiểm tra khám sức khỏe, nhật ký log) không?
- Bạn đã thiết lập sẵn ít nhất 2 chuỗi mô hình (một chính, một dự phòng) và hoàn thành nghiệm thu tối thiểu chưa?
- Khi gặp các lỗi 401, 429, timeout và 5xx, hệ thống sẽ thực hiện các hành động tương ứng khác nhau như thế nào?

### 4.5.4 Giới thiệu chương tiếp theo

[Chương 5](../05_tools_skills/README.md) sẽ đưa chúng ta vào Hệ thống Tool, Skill và Plugin: Nâng cấp năng lực từ "biết trả lời" lên thành "biết hành động", đồng thời thu hẹp năng lực hành động trong ranh giới đặc quyền tối thiểu và có thể kiểm toán.

---

> **Phát hiện lỗi hoặc có đề xuất cải tiến?** Hoan nghênh bạn gửi [Issue](https://github.com/yeasy/openclaw_guide/issues) hoặc [Pull Request](https://github.com/yeasy/openclaw_guide/pulls).
