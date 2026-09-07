# Aqua FPL Advisor

Webapp độc lập để phân tích đội hình Fantasy Premier League theo Entry ID, lập kế hoạch chuyển nhượng nhiều Gameweek và trao đổi với ChatGPT trong ngữ cảnh đội hình hiện tại.

Nguồn dữ liệu FPL được cấu hình trực tiếp tại:

```text
https://fantasy.premierleague.com/api/
```

## Tính năng

- Tải hồ sơ, đội hình 15 cầu thủ, điểm theo Gameweek, lịch sử chuyển nhượng và chip từ FPL.
- Ước tính số free transfer hiện có từ lịch sử mùa giải.
- Hiển thị lịch thi đấu 2–8 Gameweek, FDR và cảnh báo khả năng ra sân.
- Gợi ý chuyển nhượng theo ba chế độ: An toàn, Cân bằng và Tấn công.
- Bảng tin ưu tiên các thay đổi ảnh hưởng trực tiếp tới cầu thủ đang sở hữu.
- ChatGPT Advisor nhận toàn bộ snapshot đội hình; có thể bật tìm kiếm web cho tin mới sát deadline.
- Tự tải lại dữ liệu FPL mỗi 15 phút khi trang đang mở.

## Kiến trúc độc lập

Dự án này không phụ thuộc Aqua Fantaxi, Supabase, league nội bộ hoặc trang Admin. Trình duyệt chỉ lưu Entry ID và khoảng phân tích trong `localStorage`.

```text
public/index.html                 Giao diện webapp
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
5. Có thể thêm `OPENAI_MODEL`; mặc định là `gpt-5-mini`.
6. Deploy site và mở `/api/health` để kiểm tra trạng thái.

Không cần tạo database hoặc chạy SQL. Các chức năng FPL vẫn hoạt động khi chưa có OpenAI key; riêng cửa sổ ChatGPT sẽ báo chưa được cấu hình.

## Chạy local

Yêu cầu Node.js 20+ và Netlify CLI:

```bash
npm install -g netlify-cli
netlify dev
```

Tạo file `.env` cục bộ nếu cần dùng ChatGPT:

```text
OPENAI_API_KEY=...
OPENAI_MODEL=gpt-5-mini
```

Không commit `.env` hoặc API key lên GitHub.

## Lưu ý dữ liệu FPL

- Đội hình từng Gameweek chỉ công khai sau deadline.
- Free transfer là giá trị ước tính từ lịch sử chuyển nhượng/chip công khai.
- Giá bán thực tế của cầu thủ có thể khác giá hiện tại, nên ngân sách của phương án chuyển nhượng là ước tính.
- Nguồn FPL là API công khai không được bảo đảm ổn định như API thương mại chính thức.
