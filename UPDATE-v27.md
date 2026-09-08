# Cập nhật Aqua FPL Advisor v27

Ghi đè toàn bộ mã nguồn v26 bằng nội dung gói v27 rồi deploy lại Netlify.

Không cần thay đổi biến môi trường. Giữ nguyên `OPENAI_API_KEY`, `OPENAI_FAST_MODEL` và `OPENAI_DEEP_MODEL` đang sử dụng.

Phòng tư vấn giờ tự chuyển sang dữ liệu FPL đã tải nếu việc kiểm tra tin mới trên web phản hồi quá chậm, tránh request chạm giới hạn 60 giây của Netlify Functions.
