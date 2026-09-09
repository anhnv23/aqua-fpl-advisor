# Aqua FPL Advisor v34

Webapp Netlify độc lập để phân tích đội hình Fantasy Premier League theo Entry ID, mô phỏng chuyển nhượng và trao đổi với AI trong ngữ cảnh đội hình hiện tại.

## Điểm mới trong v34

- Danh sách chuyển nhượng dùng thẻ ứng viên dạng compact để duyệt tối thiểu 10 cầu thủ trong vùng hiển thị desktop.
- Thông số được bố trí trên một hàng với ký hiệu tiếng Anh: TP, TB, P5, B5, M5, TSB, F5 và BANK.
- Thu hẹp vùng đội hình và mở rộng vùng chọn cầu thủ khi hiển thị hai cột.
- Bổ sung đường khung thành, khu vực vòng cấm và cung vòng cấm ở hai đầu sân.

## Điểm mới trong v33

- Hàng dự bị luôn hiển thị thủ môn (GK) ở vị trí đầu tiên.
- Áp dụng nhất quán cho đội hình đang xây dựng và đội hình Gameweek lịch sử.
- Các cầu thủ dự bị ngoài sân còn lại giữ nguyên thứ tự ưu tiên từ FPL.
- Chỉ thay đổi cách hiển thị, không sửa dữ liệu hoặc thứ tự thay người của đội hình.

## Điểm mới trong v32

- Đưa thao tác Đội trưởng và Đội phó vào popup khi chọn cầu thủ trên sân.
- Luôn duy trì đúng một đội trưởng và một đội phó khác nhau trong đội hình chính.
- Bổ sung Khôi phục vị trí để đưa cầu thủ ban đầu trở lại đúng slot đang chọn.
- Danh sách ứng viên chuyển nhượng luôn hiển thị và không đóng sau thao tác.
- Loại bỏ hai nút Đội trưởng/Đội phó khỏi thanh điều khiển; giữ nút Khôi phục toàn bộ.

## Điểm mới trong v31

- Số tiền còn hoặc thiếu tiếp tục hiển thị ngay trong từng thẻ ứng viên.
- Sau khi chọn cầu thủ, danh sách chuyển nhượng vẫn mở để đổi sang phương án khác.
- Cho phép mô phỏng giao dịch làm ngân sách âm.
- Cho phép mô phỏng cầu thủ thứ tư cùng CLB.
- Các vi phạm chỉ tạo cảnh báo đỏ và trạng thái đội hình chưa hợp lệ, không chặn thao tác.

## Điểm mới trong v30

- Số tiền còn lại chỉ hiển thị `£…`, không có dấu cộng.
- Khi thiếu ngân sách vẫn hiển thị `−£…` và được highlight màu đỏ.

## Điểm mới trong v29

- Thay chữ “Còn” bằng dấu `+` trước số dư sau chuyển nhượng.
- Thay chữ “Thiếu” bằng dấu `−` trước phần ngân sách vượt mức.

## Điểm mới trong v28

- Cửa sổ chuyển nhượng hiển thị giá cầu thủ đang bán và ngân sách tối đa có thể mua.
- Mỗi ứng viên hiển thị số tiền còn lại hoặc số tiền còn thiếu nếu thực hiện chuyển nhượng.
- Danh sách ứng viên tiếp tục được sắp xếp theo giá giảm dần.
- Nếu có từ 4 cầu thủ cùng một CLB, tất cả cầu thủ thuộc CLB đó được highlight đỏ trên sân.
- Giữ cảnh báo giới hạn tối đa 3 cầu thủ mỗi CLB theo luật FPL.

## Điểm mới trong v27

- Sửa lỗi HTTP 504 khi Phòng tư vấn phải chờ quá lâu, đặc biệt khi bật kiểm tra tin mới trên web.
- Giới hạn thời gian riêng cho lượt tìm tin và tự động tiếp tục tư vấn bằng snapshot FPL nếu tìm kiếm phản hồi chậm.
- Giới hạn tổng thời gian chờ phía trình duyệt và luôn thoát khỏi trạng thái “Đang phân tích”.
- Hiển thị thông báo rõ ràng khi lượt tư vấn phải dùng dữ liệu FPL đã tải thay cho tin web trực tiếp.

## Điểm mới trong v26

- Squad Builder hiển thị Wildcard, Free Hit, Triple Captain và Bench Boost cùng trạng thái sử dụng.
- Cho phép chọn một chip dự kiến cho Gameweek tiếp theo.
- Wildcard và Free Hit cho chuyển nhượng không giới hạn, không phát sinh điểm trừ và giữ nguyên FT đã tích lũy.
- Free Hit đánh dấu đội hình tạm thời; Wildcard đánh dấu đội hình thay đổi lâu dài.
- Trạng thái chip được xác định riêng cho nửa đầu và nửa sau mùa giải.

## Điểm mới trong v25

- Sửa lỗi các thẻ ứng viên chuyển nhượng chồng nội dung trên mobile.
- Danh sách mobile chuyển sang luồng thẻ dọc, mỗi thẻ có chiều cao tự động.
- Tăng khoảng cách, chiều cao dòng và kích thước các chỉ số quan trọng.
- Danh sách cuộn riêng theo chiều dọc, không tràn sang phần điều khiển bên dưới.

## Điểm mới trong v24

- Thẻ ứng viên chuyển nhượng hiển thị tổng điểm, Bonus cả mùa và tỷ lệ sở hữu.
- Bổ sung tổng điểm, Bonus và số phút trong 5 Gameweek gần nhất.
- Hiển thị chi tiết điểm, Bonus, phút của từng Gameweek gần nhất.
- Giữ lịch thi đấu 5 Gameweek tiếp theo trên mỗi thẻ.
- Dữ liệu lịch sử cầu thủ được tải theo yêu cầu khi mở danh sách chuyển nhượng.

## Điểm mới trong v23

- Loại bỏ toàn bộ icon biểu trưng cho các tuyến trên sân.
- Mỗi cầu thủ có nhãn vị trí riêng ở dưới thẻ: ST, MID, DEF hoặc GK.
- Áp dụng cho cả đội hình đá chính, dự bị và đội hình Gameweek lịch sử.
- Nhãn vị trí đi theo cầu thủ khi sắp xếp hoặc chuyển nhượng.

## Điểm mới trong v22

- Điểm cầu thủ trong Gameweek lịch sử được nhân với multiplier chính thức của FPL.
- Hỗ trợ hệ số đội trưởng ×2, Triple Captain ×3, dự bị ×0 và Bench Boost.
- Khi đội phó được chuyển thành đội trưởng thay thế, điểm được nhân đúng và hiển thị ký hiệu C*.
- Tooltip cho biết điểm gốc và hệ số được áp dụng.

## Điểm mới trong v21

- Khi xem đội hình một Gameweek đã qua, mỗi cầu thủ hiển thị điểm thực tế đạt được trong vòng đó.
- Điểm cá nhân lấy từ endpoint live của đúng Gameweek và ghép theo FPL element ID.
- Điểm hiển thị là điểm gốc của cầu thủ; ký hiệu C/V được giữ riêng để nhận biết hệ số đội trưởng.

## Điểm mới trong v20

- Loại bỏ chú thích Free Hit và nhãn Chế độ chỉnh sửa khỏi Squad Builder.
- Sửa lỗi đổi Gameweek nhưng sân chưa cập nhật đúng đội hình.
- Hiển thị trực tiếp điểm vòng, đội trưởng, đội phó và chip của Gameweek đã chọn.
- Đội hình từng Gameweek lấy đúng danh sách picks công khai từ FPL API.

## Điểm mới trong v19

- Ô Điểm đội hiển thị Total Points của Entry ID thay cho điểm Gameweek.
- Squad Builder có bộ chọn đội hình theo từng Gameweek đã qua.
- Mỗi lựa chọn Gameweek hiển thị điểm vòng, Total Points, Overall Rank và chip nếu có.
- Đội hình lịch sử ở chế độ chỉ đọc; đội hình đang xây dựng vẫn được lưu riêng.

## Điểm mới trong v18

- Thay icon vị trí bằng flat icon SVG đen–trắng.
- Đưa icon xuống dưới và căn giữa từng tuyến trên sân.
- Chia lịch 5 trận thành ô hai tầng, dùng mã CLB rút gọn để không chồng chữ trên mobile.
- Giữ đủ điểm 5 trận và lịch 5 trận trên mọi kích thước màn hình.

## Điểm mới trong v17

- Rút gọn đầu trang, chỉ giữ Entry ID và khoảng phân tích.
- Gộp điểm đội với Overall Rank; thay ô đội hình nguồn bằng Gameweek tới.
- Loại bỏ My Squad và đưa Squad Builder thành khu đội hình chính.
- Dùng icon cho vị trí, bỏ nhãn chữ ở hai dòng dữ liệu cầu thủ.
- Squad Builder tự co vừa chiều rộng mobile, không cần kéo ngang.

## Điểm mới trong v16

- Tối ưu toàn bộ tỷ lệ và khoảng cách cho màn hình mobile.
- Khối nhập Entry ID, KPI, Phòng tư vấn và Xây dựng đội hình chuyển sang bố cục một cột phù hợp.
- Sân bóng thu gọn và chỉ kéo ngang bên trong vùng sân; trang không bị tràn ngang.
- Popup cầu thủ chuyển thành bottom sheet, vùng bấm tối thiểu được tăng lên.
- Bảng League, bảng tin, Season Tracker và danh sách chuyển nhượng có bố cục mobile riêng.

## Điểm mới trong v15

- Hai khu đội hình hiển thị điểm Gameweek chính thức của Entry ID.
- Loại bỏ điểm Gameweek trên từng thẻ cầu thủ.
- Mỗi bảng xếp hạng League hiển thị tối đa 30 dòng quanh vị trí của Entry ID.

## Điểm mới trong v14

- Hiển thị điểm Gameweek hiện tại trên từng cầu thủ.
- Hiển thị tổng điểm cho Đội hình hiện tại và đội hình đang xây dựng.
- Tải các Classic League đang tham dự từ hồ sơ FPL.
- Cho phép chọn League và xem thứ hạng, điểm Gameweek, tổng điểm cùng biến động thứ hạng của các đội lân cận.

## Điểm mới trong v13

- Danh sách cầu thủ trong cửa sổ Chuyển nhượng được sắp xếp theo giá giảm dần.
- Thứ tự giá được áp dụng sau khi lọc đúng vị trí và tìm kiếm cầu thủ.

## Điểm mới trong v12

- Highlight đỏ/vàng các cầu thủ chấn thương, treo giò hoặc có nguy cơ vắng mặt trong Xây dựng đội hình.
- Hiển thị trạng thái, tỷ lệ khả năng ra sân và tin chi tiết từ FPL trong thẻ cầu thủ, danh sách chuyển nhượng và popup.
- Bảng tin FPL chuyển sang ba cột cố định: **Biến động giá**, **Xu hướng mua**, **Tin thị trường**.
- Tin trong từng cột xếp theo chiều dọc; trên mobile ba cột tự xếp thành các khối dọc.

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
