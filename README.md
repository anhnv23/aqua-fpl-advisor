# Aqua FPL Advisor v11

Webapp Netlify độc lập để phân tích đội hình Fantasy Premier League theo Entry ID, mô phỏng chuyển nhượng và trao đổi với AI trong ngữ cảnh đội hình hiện tại.

## Điểm mới trong v11

- Đưa **Phòng tư vấn đội hình** lên trước **Xây dựng đội hình**.
- Khi chọn cầu thủ trên sân, mở hai thao tác: **Đổi vị trí** và **Chuyển nhượng**.
- Đổi vị trí chỉ sắp xếp đá chính–dự bị trong 15 cầu thủ hiện tại.
- Chuyển nhượng mở danh sách cầu thủ cùng vị trí chưa có trong đội.
- Đếm số cầu thủ mới so với đội hình gốc thành số lượt chuyển nhượng đã dùng.
- Hiển thị FT ban đầu, FT còn lại và điểm chuyển nhượng; mỗi FT âm tương ứng `-4` điểm.

## Điểm mới trong v10

- Loại bỏ Transfer Options và gợi ý chuyển nhượng tự động.
- Đổi khu đội hình mô phỏng thành **Xây dựng đội hình**.
- Tải toàn bộ danh sách cầu thủ có thể chọn từ FPL API.
- Cho phép tìm/lọc cầu thủ, chuyển nhượng đúng vị trí, sắp xếp đá chính–dự bị và chọn đội trưởng/đội phó.
- Kiểm tra ngân sách, giới hạn cầu thủ mỗi CLB và cấu trúc đội hình FPL.
- Lưu đội hình đang xây dựng trên thiết bị theo Entry ID và Gameweek.
- Phòng tư vấn nhận đội hình đang xây dựng thay cho đội hình ban đầu.

## Các cập nhật từ v9

- Chuyển các stripe cỏ xanh sang chiều ngang từ trái sang phải trên cả hai mặt sân.
- Giữ nguyên hướng bố trí đội hình, thẻ cầu thủ và đường kẻ sân.

## Các cập nhật từ v8

- Xoay toàn bộ stripe cỏ theo chiều dọc sân.
- Tăng cỡ chữ và dùng màu gold cho Nhận định nhanh.
- Thu gọn khu phương án chuyển nhượng, mở rộng Phòng tư vấn.
- Squad Impact Feed trở thành bảng tin ngang, bổ sung biến động giá trực tiếp từ `cost_change_event` của FPL.
- Season Tracker có bộ chọn Gameweek để lọc lịch sử chuyển nhượng và chip.

## Các cập nhật từ v7

- Xoay hướng nền sân bóng 90° để các dải cỏ và trục sân khớp với sơ đồ đội hình: tiền đạo phía trên, thủ môn phía dưới.

## Các cập nhật từ v6

- Sửa thông báo token “not from a valid issuer”: backend chỉ chấp nhận OpenAI API key bắt đầu bằng `sk-`, tự loại bỏ tiền tố `Bearer` bị dán nhầm và hướng dẫn cấu hình lại rõ ràng.
- Đội hình hiện tại chiếm toàn bộ chiều rộng, bố trí theo vị trí thật trên mặt sân.
- Nhận định rút gọn thành thẻ nổi ở góc sân.
- Đội hình sau tư vấn cũng hiển thị trên sân; cầu thủ vừa mua có viền xanh.
- Giao diện co giãn theo màn hình và cho phép kéo ngang có kiểm soát trên mobile.

- Phòng tư vấn mở trực tiếp, không yêu cầu đăng nhập.
- Nhận định tự động từ điểm 5 trận gần nhất, FDR và khả năng ra sân.
- Mỗi cầu thủ có tên/logo CLB, điểm 5 trận gần nhất và lịch 5 trận tiếp theo.
- Áp dụng từng gợi ý vào bảng mô phỏng chuyển nhượng.
- Theo dõi ngân sách, giá trị đội và số cầu thủ theo CLB; cảnh báo ngay khi vi phạm.
- Free Hit dùng đội hình trước đó làm cơ sở tư vấn; Free Transfer cho phép nhập tay khi API không có.

Nguồn dữ liệu: `https://fantasy.premierleague.com/api/`.

## Cập nhật từ bản cũ

1. Giải nén v11 và ghi đè toàn bộ mã nguồn trong repository cũ.
2. Xóa `public/auth-client.js` và `src/auth-client.js` nếu repository còn giữ các file này.
3. Commit và push; chờ Netlify deploy.
4. Giữ `OPENAI_API_KEY`; hai biến tùy chọn là `OPENAI_FAST_MODEL=gpt-5.6-luna` và `OPENAI_DEEP_MODEL=gpt-5.6-terra`.
5. Không cần Netlify Identity, Supabase, database hoặc SQL.
6. Kiểm tra `/api/health`, rồi tải lại bằng `Ctrl + F5`.

## Cấu trúc

```text
public/index.html
netlify/functions/fpl.mjs
netlify/functions/advisor.mjs
netlify/functions/health.mjs
netlify/functions/_shared.mjs
netlify.toml
```

## Lưu ý bảo mật

Không có đăng nhập nghĩa là mọi khách truy cập đều có thể dùng quota API của chủ website. Key vẫn chỉ nằm trong Netlify Function. Endpoint có giới hạn tần suất theo IP, nhưng nên theo dõi OpenAI usage/billing và bổ sung CAPTCHA hoặc quota nếu công khai rộng rãi.

## Chạy local

```bash
npm install -g netlify-cli
netlify dev
```

File `.env` cục bộ:

```text
OPENAI_API_KEY=...
OPENAI_FAST_MODEL=gpt-5.6-luna
OPENAI_DEEP_MODEL=gpt-5.6-terra
```

Không commit `.env` hoặc API key. Giá bán thực tế có thể khác giá hiện tại do quy tắc lợi nhuận chuyển nhượng; mô phỏng sử dụng giá hiện tại và bank công khai.
