# Aqua FPL Advisor v4 — Hai chế độ AI

## Thay đổi giao diện

- Thêm lựa chọn **Tư vấn nhanh** và **Phân tích chuyên sâu** trong Phòng tư vấn đội hình.
- Tư vấn nhanh dùng GPT-5.6 Luna, reasoning `low`.
- Phân tích chuyên sâu dùng GPT-5.6 Terra, reasoning `medium`.
- Ghi nhớ chế độ đã chọn trên thiết bị.
- Hiển thị tên chế độ và model phía trên mỗi câu trả lời.
- Giữ nội dung đang nhập và lựa chọn kiểm tra web khi đổi chế độ.

## Thay đổi backend

- Client gửi `advisorMode` với giá trị `quick` hoặc `deep`.
- Netlify Function tự chọn model, reasoning effort, giới hạn output và hướng dẫn trả lời tương ứng.
- Backend chỉ chấp nhận hai chế độ hợp lệ; giá trị khác tự động chuyển về `quick`.
- Endpoint health trả về cấu hình hai chế độ nhưng không tiết lộ API key.

## Environment Variables

```text
OPENAI_API_KEY=...
OPENAI_FAST_MODEL=gpt-5.6-luna
OPENAI_DEEP_MODEL=gpt-5.6-terra
```

Hai biến model là tùy chọn vì ứng dụng đã có giá trị mặc định. Biến `OPENAI_MODEL` của bản cũ không còn được sử dụng.

## Không thay đổi

- Dữ liệu vẫn lấy từ `https://fantasy.premierleague.com/api/`.
- Khi Free Hit đang hoạt động, đội hình gốc của Gameweek trước vẫn được dùng làm cơ sở tư vấn dài hạn.
- Free Transfer vẫn ưu tiên dữ liệu API; nếu thiếu thì cho phép người dùng nhập thủ công.
- Phòng tư vấn vẫn yêu cầu đăng nhập Aqua FPL Advisor qua Netlify Identity.
- Không cần database hoặc Supabase.
