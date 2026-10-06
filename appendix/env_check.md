## Phụ lục H: Công cụ tự kiểm tra môi trường (Env Check)

Dưới đây là kịch bản chẩn đoán điều kiện tiên quyết `check_env.sh`, dùng để xác minh các phụ thuộc vận hành cốt lõi của OpenClaw trên máy của bạn.

```bash
#!/bin/bash
echo "=== Tự kiểm tra môi trường OpenClaw ==="
if command -v node >/dev/null 2>&1; then
  node_version="$(node -p 'process.versions.node')"
  node_major="${node_version%%.*}"
  node_rest="${node_version#*.}"
  node_minor="${node_rest%%.*}"
  echo "Node.js: v${node_version}"
  # Ngưỡng hỗ trợ chính thức: 24.16+ / 26.1+; Node 22, 23, 25 và 26.0 không được hỗ trợ
  node_supported=0
  case "$node_major" in
    24) [ "$node_minor" -ge 16 ] && node_supported=1 ;;
    26) [ "$node_minor" -ge 1 ] && node_supported=1 ;;
    *)  [ "$node_major" -ge 27 ] && node_supported=1 ;;
  esac
  if [ "$node_supported" -eq 0 ]; then
    echo "Cảnh báo: Bản Node hiện tại không nằm trong danh sách hỗ trợ (yêu cầu 24.16+ hoặc 26.1+, Node 22, 23, 25 không hỗ trợ); khuyến nghị nâng cấp lên Node 26."
  elif [ "$node_major" -lt 26 ]; then
    echo "Thông báo: Phiên bản hiện tại được hỗ trợ; cài đặt mới khuyên dùng Node 26 (CI chính thức và script Linux dùng Node 24)."
  fi
else
  echo "Cảnh báo: Chưa cài đặt Node.js (Khuyên dùng Node 26; danh sách hỗ trợ là 24.16+ / 26.1+)"
fi
npm --version || echo "Thông báo: Chưa cài đặt npm. Nếu không dùng script tự động thì đây là mục bắt buộc"
docker --version || echo "Thông báo: Chưa cài đặt Docker (Bắt buộc nếu triển khai bằng container)"

echo "Kiểm tra kết nối mạng (Script cài đặt chính thức)..."
curl -fsSL -m 5 -o /dev/null -w "install script: %{http_code}\n" https://openclaw.ai/install.sh

echo "Kiểm tra mạng tới API mô hình (Ví dụ với OpenAI, có thể thay bằng provider của bạn)..."
if [ -n "${OPENAI_API_KEY:-}" ]; then
  curl -sS -m 10 -o /dev/null -w "llm provider: %{http_code}\n" https://api.openai.com/v1/models \
    -H "Authorization: Bearer $OPENAI_API_KEY"
else
  curl -sS -m 10 -o /dev/null -w "llm provider: %{http_code}\n" https://api.openai.com/v1/models
fi
echo "Gợi ý: 200 biểu thị xác thực thành công; 401/403 biểu thị chưa có Key/chưa cấp quyền nhưng mạng thông suốt."
echo "Nếu bật Proxy được quản lý của OpenClaw, lệnh curl trong shell sẽ không đi qua proxy runtime; hãy kiểm tra proxy.enabled / proxy.proxyUrl hoặc OPENCLAW_PROXY_URL, và chạy lệnh openclaw proxy validate."
echo "Hoàn tất tự kiểm tra"
```

**Đầu ra kỳ vọng trong môi trường chuẩn**:

```text
=== Tự kiểm tra môi trường OpenClaw ===
Node.js: v26.2.0
11.13.0
Docker version 27.3.1, build ce1223035a
Kiểm tra kết nối mạng (Script cài đặt chính thức)...
install script: 200
Kiểm tra mạng tới API mô hình (Ví dụ với OpenAI, có thể thay bằng provider của bạn)...
llm provider: 200
Gợi ý: 200 biểu thị xác thực thành công; 401/403 biểu thị chưa có Key/chưa cấp quyền nhưng mạng thông suốt.
Nếu bật Proxy được quản lý của OpenClaw, lệnh curl trong shell sẽ không đi qua proxy runtime; hãy kiểm tra proxy.enabled / proxy.proxyUrl hoặc OPENCLAW_PROXY_URL, và chạy lệnh openclaw proxy validate.
Hoàn tất tự kiểm tra
```

**Các lỗi thường gặp và hướng xử lý**:

| Đầu ra | Ý nghĩa | Hướng xử lý |
|---|---|---|
| `Cảnh báo: Chưa cài đặt Node.js` | Node.js chưa cài hoặc chưa có trong PATH | Chạy `nvm install 26` (khuyên dùng) hoặc `nvm install 24` |
| `Cảnh báo: Bản Node hiện tại không nằm trong danh sách hỗ trợ` | Bản Node quá cũ, hoặc rơi vào các bản không hỗ trợ Node 22, 23, 25 | Nâng cấp lên Node 26 (26.1+), hoặc tối thiểu là 24.16+ |
| `install script: 000` | Không thể kết nối tới openclaw.ai | Kiểm tra mạng / Proxy / DNS |
| `llm provider: 401` | API Key không hợp lệ hoặc chưa thiết lập | Kiểm tra biến môi trường `$OPENAI_API_KEY` |
| `llm provider: 403` | API Key không có quyền truy cập | Xác nhận tài khoản API Key còn hạn mức khả dụng |
