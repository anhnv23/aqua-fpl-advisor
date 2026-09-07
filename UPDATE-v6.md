# Cập nhật Aqua FPL Advisor v6

## Sửa lỗi OpenAI token

Thông báo `Your authentication token is not from a valid issuer` xuất hiện khi `OPENAI_API_KEY` đang chứa token đăng nhập ChatGPT/Netlify thay vì OpenAI API key.

1. Tạo API key mới tại `https://platform.openai.com/api-keys`.
2. Trong Netlify mở **Project configuration → Environment variables**.
3. Sửa `OPENAI_API_KEY`; giá trị phải bắt đầu bằng `sk-` hoặc `sk-proj-`.
4. Không ghi `Bearer`, không thêm dấu ngoặc kép và không dùng token từ tài khoản ChatGPT.
5. Giữ `OPENAI_FAST_MODEL=gpt-5.6-luna` và `OPENAI_DEEP_MODEL=gpt-5.6-terra` nếu tài khoản API có quyền dùng các model này.
6. Vào **Deploys → Trigger deploy → Deploy site**.

## Cập nhật mã nguồn

Ghi đè repository cũ bằng toàn bộ nội dung gói v6, commit, push và chờ Netlify báo **Published**. Không cần Netlify Identity, Supabase hoặc SQL.

Sau khi deploy, mở `/api/health`, rồi thử Phòng tư vấn. Nếu key không hợp lệ, v6 sẽ trả hướng dẫn cấu hình cụ thể thay cho lỗi issuer.
