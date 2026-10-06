# Hướng dẫn đóng góp: Contributing

Cảm ơn bạn đã quan tâm và đồng hành cùng dự án cẩm nang *OpenClaw: Từ Nhập Môn Đến Tinh Thông*! Chúng tôi luôn hoan nghênh mọi đóng góp: sửa lỗi chính tả, cải thiện câu từ, bổ sung nội dung thực tiễn hoặc hoàn thiện các cấu hình mẫu. Trước khi gửi đóng góp, vui lòng đọc kỹ hướng dẫn dưới đây để bảo đảm Pull Request (PR) hoặc Issue của bạn được xử lý thuận tiện nhất.

## 1. Quy chuẩn ứng xử

Dự án tuân thủ các quy tắc cộng đồng cởi mở và văn minh. Khi tham gia đóng góp, bạn đồng thuận giữ tinh thần tôn trọng, thân thiện và giao tiếp trên tinh thần xây dựng với tất cả các thành viên.

## 2. Cấu trúc tài liệu & Quy chuẩn định dạng

Tài liệu được xây dựng dưới dạng sách kỹ thuật Markdown với các yêu cầu định dạng chặt chẽ. Toàn bộ nội dung cần tuân thủ quy chuẩn dưới đây. Trước khi tạo PR, hãy chạy các script kiểm tra cục bộ.

### 2.1 Chạy kiểm tra tại máy cục bộ

Trước khi commit/push, hãy chạy các lệnh kiểm tra sau:

- **Kiểm tra quy tắc dự án**: Chạy `python3 check_project_rules.py` để rà soát tiêu đề, liên kết, hình ảnh và cú pháp code block.
- **Kiểm tra toàn bộ test suite**: Chạy `pytest` để xác minh tính toàn vẹn của dự án.
- **Kiểm tra build mdPress**: Chạy `mdpress build --format site --output _site` để đảm bảo tài liệu biên dịch mượt mà và không có liên kết chết.

### 2.2 Quy ước định dạng Markdown

- **Khối JSON và JSONC**:
  - Với các đoạn mã JSON chuẩn (không chứa chú thích, có thể parse bằng `JSON.parse()`), hãy dùng thẻ ````json````.
  - **Quy ước quan trọng**: Nếu đoạn mã cấu hình có chứa `// chú thích`, **bắt buộc dùng thẻ ````jsonc````** (JSON with Comments). Tránh dùng `json5` vì chuỗi highlight mặc định có thể không ổn định.
- **Sơ đồ Mermaid**:
  - Khuyến khích sử dụng cú pháp ````mermaid```` để vẽ sơ đồ luồng và kiến trúc. Các nhãn văn bản bên trong nút Mermaid phải được bọc trong dấu ngoặc kép nửa góc chuẩn Anh `"`.
- **Hình ảnh và chú thích**:
  - Giữa hình ảnh và thẻ chú thích phải có một dòng trống:
    ```text
    ![Mô tả ảnh](cover.jpg)

    Hình X-Y: Nội dung chú thích hình ảnh
    ```

## 3. Quy chuẩn gửi Pull Request (PR)

1. **Quản lý nhánh**: Nên tạo nhánh tính năng/sửa đổi riêng biệt (ví dụ: `fix-typo-ch10` hoặc `feature-new-config-guide`).
2. **Quy chuẩn thông điệp Commit (Conventional Commits)**:
   - `fix: sửa lỗi liên kết và chính tả trong chương 10.1`
   - `docs: bổ sung hướng dẫn di trú phiên bản mới trong phụ lục`
   - `feat: bổ sung kịch bản cấu hình Telegram mới`
3. **Mô tả PR**:
   - Nêu rõ vấn đề được giải quyết. Nếu liên quan đến Issue đã có, hãy ghi `Fixes #XXX`.
   - Xác nhận đã vượt qua các bài kiểm tra tự động tại local (`pytest`, `check_project_rules.py`).

## 4. Các định hướng đóng góp ưu tiên

Nếu bạn muốn đóng góp nhưng chưa biết bắt đầu từ đâu, dưới đây là những phần luôn được đón nhận:

- **Cải thiện hành văn / sửa lỗi chính tả**: Đóng góp bản dịch mượt mà hơn, tự nhiên hơn cho cộng đồng người Việt.
- **Bổ sung tình huống thực tế & kinh nghiệm xử lý lỗi**: Bổ sung kinh nghiệm triển khai thực chiến tại Chương 13 và 15, đặc biệt là các kinh nghiệm kết nối bot Telegram/WhatsApp/Lark.
- **Cập nhật dữ kiện công nghệ mới**: Góp ý bổ sung các thay đổi khi OpenClaw ra mắt phiên bản mới.

---

Cảm ơn bạn đã chung tay giúp cuốn cẩm nang ngày càng hoàn thiện và hữu ích hơn cho cộng đồng công nghệ Việt Nam! Nếu có bất kỳ câu hỏi nào, hãy mở thảo luận tại [Khu vực Issue](https://github.com/yeasy/openclaw_guide/issues).
