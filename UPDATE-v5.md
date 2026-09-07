# Cập nhật Aqua FPL Advisor v5

| Hạng mục | Bản cũ | v5 |
|---|---|---|
| Phòng tư vấn | Netlify Identity | Không cần đăng nhập |
| OpenAI key | Environment Variable | Giữ nguyên |
| Dữ liệu cầu thủ | Thông tin mùa hiện tại | Thêm điểm 5 trận và logo CLB |
| Giới hạn CLB | Kiểm tra từng gợi ý | Kiểm tra toàn đội mô phỏng |
| Ngân sách | Từng đề xuất | Theo dõi sau nhiều chuyển nhượng |

Các bước: sao lưu repository, ghi đè bằng gói v5, xóa hai file `auth-client.js` còn sót, push lên GitHub và chờ Netlify báo **Published**. Không cần chạy SQL, bật Identity hoặc đổi `OPENAI_API_KEY`.
