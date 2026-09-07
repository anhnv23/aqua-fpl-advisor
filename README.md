# Aqua FPL Advisor

Webapp độc lập để phân tích đội hình Fantasy Premier League theo Entry ID, lập kế hoạch chuyển nhượng nhiều Gameweek và trao đổi với ChatGPT trong ngữ cảnh đội hình hiện tại.

Lưu ý về đăng nhập: bản Netlify dùng tài khoản riêng của Aqua FPL Advisor thông qua Netlify Identity. Đây không phải OAuth tài khoản ChatGPT; ChatGPT được gọi bằng `OPENAI_API_KEY` bảo mật của website sau khi người dùng Aqua đã đăng nhập.

Nguồn dữ liệu FPL được cấu hình trực tiếp tại:

```text
https://fantasy.premierleague.com/api/
```

## Tính năng

- Tải hồ sơ, đội hình 15 cầu thủ, điểm theo Gameweek, lịch sử chuyển nhượng và chip từ FPL.
- Tính một giá trị Free Transfer tham khảo từ lịch sử mùa giải nhưng không dùng thay cho số chính thức/nhập tay.
- Ưu tiên Free Transfer chính xác nếu FPL API trả về; nếu dữ liệu công khai không có, người dùng nhập thủ công theo từng Entry ID và Gameweek.
- Khi Gameweek hiện tại dùng Free Hit, đội hình của Gameweek trước được dùng làm cơ sở tư vấn dài hạn.
- Hiển thị lịch thi đấu 2–8 Gameweek, FDR và cảnh báo khả năng ra sân.
- Gợi ý chuyển nhượng theo ba chế độ: An toàn, Cân bằng và Tấn công.
- Bảng tin ưu tiên các thay đổi ảnh hưởng trực tiếp tới cầu thủ đang sở hữu.
- ChatGPT Advisor chỉ mở sau khi người dùng đăng nhập Aqua FPL Advisor bằng Netlify Identity; có thể bật tìm kiếm web cho tin mới sát deadline.
- Hai chế độ AI trong Phòng tư vấn:
  - **Tư vấn nhanh** dùng GPT-5.6 Luna với reasoning `low` cho đội trưởng, bench, so sánh cầu thủ và quyết định Gameweek kế tiếp.
  - **Phân tích chuyên sâu** dùng GPT-5.6 Terra với reasoning `medium` cho kế hoạch 3-5 Gameweek, chip, hit và nhiều phương án chuyển nhượng.
- Chế độ tư vấn được lưu trên thiết bị; mỗi câu trả lời hiển thị model và mức phân tích đã sử dụng.
- Tự tải lại dữ liệu FPL mỗi 15 phút khi trang đang mở.

## Kiến trúc độc lập

Dự án này không phụ thuộc Aqua Fantaxi, Supabase, league nội bộ hoặc trang Admin. Trình duyệt chỉ lưu Entry ID và khoảng phân tích trong `localStorage`.

```text
public/index.html                 Giao diện webapp
public/auth-client.js             Client đăng nhập Netlify Identity
src/auth-client.js                Mã nguồn client đăng nhập
netlify/functions/fpl.mjs        Proxy và tổng hợp dữ liệu FPL
netlify/functions/advisor.mjs    ChatGPT Advisor
netlify/functions/health.mjs     Kiểm tra trạng thái cấu hình
netlify/functions/_shared.mjs    Tiện ích phản hồi JSON
netlify.toml                      Redirect và cấu hình Netlify
```

## Triển khai Netlify

1. Tạo repository GitHub mới và đưa toàn bộ nội dung thư mục này lên repository.
2. Tạo Netlify site mới từ repository đó.
3. Netlify sẽ tự nhận `public` là publish directory và `netlify/functions` là functions directory.
4. Thêm Environment Variable `OPENAI_API_KEY` để bật ChatGPT Advisor.
5. Thêm hai biến model nếu muốn ghi đè giá trị mặc định:
   - `OPENAI_FAST_MODEL=gpt-5.6-luna`
   - `OPENAI_DEEP_MODEL=gpt-5.6-terra`
   - Biến cũ `OPENAI_MODEL` không còn được dùng để hai chế độ luôn chọn đúng model.
6. Vào mục **Identity** của project và chọn **Enable Identity**.
7. Trong **Identity → Registration**, chọn `Open` để người dùng tự đăng ký hoặc `Invite only` để Admin mời từng email.
8. Deploy lại site và mở `/api/health` để kiểm tra trạng thái.

Không cần tạo database hoặc chạy SQL. Các chức năng FPL vẫn hoạt động khi chưa có OpenAI key; riêng cửa sổ ChatGPT sẽ yêu cầu đăng nhập và báo chưa được cấu hình nếu thiếu key.

## Chạy local

Yêu cầu Node.js 20+ và Netlify CLI:

```bash
npm install -g netlify-cli
netlify dev
```

Tạo file `.env` cục bộ nếu cần dùng ChatGPT:

```text
OPENAI_API_KEY=...
OPENAI_FAST_MODEL=gpt-5.6-luna
OPENAI_DEEP_MODEL=gpt-5.6-terra
```

Không commit `.env` hoặc API key lên GitHub.

## Lưu ý dữ liệu FPL

- Đội hình từng Gameweek chỉ công khai sau deadline.
- Free transfer là giá trị ước tính từ lịch sử chuyển nhượng/chip công khai.
- Giá bán thực tế của cầu thủ có thể khác giá hiện tại, nên ngân sách của phương án chuyển nhượng là ước tính.
- Nguồn FPL là API công khai không được bảo đảm ổn định như API thương mại chính thức.
