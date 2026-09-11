# Hướng Dẫn Sử Dụng Card Factory Level Builder

Tài liệu hướng dẫn chi tiết cách sử dụng công cụ **Card Factory Level Builder** để thiết kế màn chơi, quản lý xuất/nhập dữ liệu (`.bytes` & `.json`), và danh sách kiểm tra các quy tắc quan trọng trước khi xuất bản một màn chơi vào game.

---

## Mục Lục
1. [Giới Thiệu Tổng Quan](#1-giới-thiệu-tổng-quan)
2. [Hướng Dẫn Thiết Kế Màn Chơi (Design a Level)](#2-hướng-dẫn-thiết-kế-màn-chơi-design-a-level)
   - [2.1 Bố cục không gian làm việc](#21-bố-cục-không-gian-làm-việc)
   - [2.2 Thao tác trên Visual Canvas (Vùng làm việc trung tâm)](#22-thao-tác-trên-visual-canvas-vùng-làm-việc-trung-tâm)
   - [2.3 Cấu hình chi tiết hộp (Node Inspector)](#23-cấu-hình-chi-tiết-hộp-node-inspector)
   - [2.4 Cấu hình ngăn chứa thẻ bài (Card Stack Editor)](#24-cấu-hình-ngăn-chứa-thẻ-bài-card-stack-editor)
   - [2.5 Cấu hình toàn cục màn chơi (Level Config & InitialCards)](#25-cấu-hình-toàn-cục-màn-chơi-level-config--initialcards)
   - [2.6 Tính toán vật cản tự động (Auto-Calculate Blockers)](#26-tính-toán-vật-cản-tự-động-auto-calculate-blockers)
   - [2.7 Chơi thử và kiểm tra tính giải được (Playtest Simulator)](#27-chơi-thử-và-kiểm-tra-tính-giải-được-playtest-simulator)
3. [Hướng Dẫn Xuất & Nhập Dữ Liệu (Import / Export Bytes & JSON)](#3-hướng-dẫn-xuất--nhập-dữ-liệu-import--export-bytes--json)
   - [3.1 Xuất dữ liệu (Export)](#31-xuất-dữ-liệu-export)
   - [3.2 Nhập dữ liệu (Import)](#32-nhập-dữ-liệu-import)
   - [3.3 Cấu trúc file chuẩn (JSON Schema)](#33-cấu-trúc-file-chuẩn-json-schema)
4. [Các Điểm Bắt Buộc Cần Chú Ý & Kiểm Tra Trước Khi Export](#4-các-điểm-bắt-buộc-cần-chú-ý--kiểm-tra-trước-khi-export)
   - [Quy tắc 1: Cân bằng số lượng bài và dung tích hộp (Card Distribution vs Box Capacity)](#quy-tắc-1-cân-bằng-số-lượng-bài-và-dung-tích-hộp-card-distribution-vs-box-capacity)
   - [Quy tắc 2: Không tạo hộp đơn sắc cùng màu đã đầy sẵn (No fully-filled monocolor matching boxes)](#quy-tắc-2-không-tạo-hộp-đơn-sắc-cùng-màu-đã-đầy-sẵn-no-fully-filled-monocolor-matching-boxes)
   - [Quy tắc 3: Tính giải được trong giới hạn 4 slot băng chuyền (4-Slot Solvability)](#quy-tắc-3-tính-giải-được-trong-giới-hạn-4-slot-băng-chuyền-4-slot-solvability)
   - [Quy tắc 4: Cập nhật lại Auto-Blockers sau mỗi thay đổi vị trí](#quy-tắc-4-cập-nhật-lại-auto-blockers-sau-mỗi-thay-đổi-vị-trí)
   - [Quy tắc 5: Tránh xung đột cùng tầng (Same-Layer Overlap Conflict)](#quy-tắc-5-tránh-xung-đột-cùng-tầng-same-layer-overlap-conflict)
   - [Quy tắc 6: Xác nhận đúng cờ `IsHardLvl` và mảng `InitialCards`](#quy-tắc-6-xác-nhận-đúng-cờ-ishardlvl-và-mảng-initialcards)
   - [Quy tắc 7: Tuân thủ đường cong độ khó (Difficulty Curve Progression)](#quy-tắc-7-tuân-thủ-đường-cong-độ-khó-difficulty-curve-progression)
5. [Quy Trình Kiểm Tra Nhanh (Checklist)](#5-quy-trình-kiểm-tra-nhanh-checklist)

---

## 1. Giới Thiệu Tổng Quan

**Card Factory Level Builder** là công cụ trực quan (visual web app) hỗ trợ thiết kế, cân bằng và mô phỏng các màn chơi cho tựa game puzzle **Card Factory**.

Trong game, cơ chế cốt lõi như sau:
- Các hộp chứa thẻ bài được xếp chồng lên nhau thành nhiều tầng không gian (`Layer 0`, `Layer 1`, `Layer 2`, `Layer 3`...).
- Băng chuyền bên dưới có **tối đa 4 vị trí đỗ hộp** (conveyor slots).
- Người chơi chạm vào hộp trên bàn để gửi nó xuống băng chuyền:
  - Các thẻ bài bên trong hộp **cùng màu với màu hộp** sẽ nằm lại trong hộp.
  - Các thẻ bài **khác màu với hộp** sẽ bị đẩy văng ra băng chuyền và chạy vòng quanh.
  - Hộp đang đỗ trên băng chuyền sẽ hút các thẻ cùng màu đang chạy trên băng chuyền vào trong cho đến khi đầy dung tích.
  - Khi hộp đủ bài (ví dụ 6/6 thẻ hoặc 8/8 thẻ), hộp sẽ đóng gói và biến mất, giải phóng slot băng chuyền.
  - Nếu cả 4 slot đều bị chiếm bởi các hộp chưa đầy và không có thẻ bài nào khớp để giải phóng hộp, người chơi sẽ bị kẹt (Deadlock / Thua).

---

## 2. Hướng Dẫn Thiết Kế Màn Chơi (Design a Level)

### 2.1 Bố cục không gian làm việc

Giao diện công cụ được chia làm 3 cột chính và thanh điều khiển trên cùng:
1. **Thanh Header trên cùng (Navbar & StatsBar)**:
   - Đặt tên level, các nút Import/Export, nút Auto-Blockers, Auto-Balance Deck, Playtest, các công tắc hiển thị Grid, Snap to Grid, Dependencies.
   - Thanh trạng thái thống kê số lượng hộp, tổng số thẻ bài, chip hiển thị thẻ prespawn trên băng chuyền (`Conveyor`), các nút cảnh báo lỗi (Validation Warnings/Errors), và công tắc chuyển nhanh `Normal Lvl` / `⚡ Hard Lvl`.
2. **Cột bên trái (Sidebar)**:
   - **Library**: Quản lý kho màn chơi mẫu (Easy, Medium, Hard 1–10), các màn đã lưu cá nhân, nút nhập/xuất JSON và ZIP.
   - **Layers**: Quản lý từng tầng hiển thị, ẩn/hiện tầng, nút cô lập tầng (Isolate Layer), thêm hộp mới vào tầng.
   - **Palette**: Bảng chọn nhanh các mẫu hộp dựng sẵn (4 slot, 6 slot, 8 slot, các màu và góc xoay phổ biến).
3. **Khu vực Canvas trung tâm**:
   - Vùng hiển thị trực quan các hộp dưới dạng 2D isometric có chiều sâu bóng đổ 3D, độ cao theo tầng, hiển thị thẻ bài bên trong hộp và các mũi tên phụ thuộc (blockers).
4. **Cột bên phải (Inspector)**:
   - **Tab Node**: Chỉnh sửa toạ độ, góc xoay, loại hộp, màu hộp, thuộc tính hộp đặc biệt (Hộp giấy, Hộp cầu vồng) và danh sách thẻ bài của hộp đang được chọn.
   - **Tab Level Config**: Cấu hình các thông số toàn cục của màn chơi (`IsHardLvl`, `IsOddSize`, `InitialCards`).

---

### 2.2 Thao tác trên Visual Canvas (Vùng làm việc trung tâm)

- **Chọn hộp (Select)**: Nhấp chuột trái vào bất kỳ hộp nào để chọn hộp đó. Inspector bên phải sẽ chuyển sang hiển thị thuộc tính của hộp.
- **Di chuyển hộp (Move)**: Giữ chuột trái và kéo hộp đến vị trí mong muốn.
  > [!TIP]
  > Bật nút **Snap to Grid** trên Navbar hoặc giữ phím `Shift` khi kéo để hộp tự động bắt dính vào toạ độ nguyên (tránh bị lệch lẻ toạ độ).
- **Xoay hộp (Rotate)**:
  - Kéo chốt tròn phía trên hộp đang chọn để xoay tự do 360 độ.
  - Hoặc trong tab Node Inspector bên phải, bấm các nút xoay nhanh `0°`, `45°`, `90°`, `180°`, `270°`.
- **Phóng to / Thu nhỏ (Zoom)**: Lăn con lăn chuột (Mouse Wheel).
- **Di chuyển khung nhìn (Pan)**: Giữ phím `Space` và kéo chuột trái (hoặc giữ chuột phải / chuột giữa và kéo).
- **Nhân bản hộp (Duplicate)**: Bấm nút `Copy` (icon hai trang giấy) trong Inspector để tạo ngay một bản sao ở vị trí liền kề.
- **Xoá hộp (Delete)**: Bấm icon thùng rác đỏ `Delete` trong Inspector.

---

### 2.3 Cấu hình chi tiết hộp (Node Inspector)

Khi chọn một hộp, bạn có thể chỉnh sửa các thông số kỹ thuật:
- **Toạ độ & Tầng**:
  - `Layer`: Tầng của hộp (`0` là tầng nền thấp nhất, `1`, `2`, `3` là các tầng xếp chồng lên trên).
  - `X Position` & `Z Position`: Toạ độ không gian (tương ứng với trục toạ độ Unity).
  - `Rotation`: Góc xoay quanh trục Y (`0°` đến `360°`).
- **Loại hộp (Type / Capacity)**:
  - `Small Box (4 Slots)`: Dung tích 4 thẻ bài (`TypeId: 0`).
  - `Medium Box (6 Slots)`: Dung tích 6 thẻ bài (`TypeId: 1`) — loại phổ biến nhất.
  - `Large Box (8 Slots)`: Dung tích 8 thẻ bài (`TypeId: 2`).
  - `XL Box (10 Slots)`: Dung tích 10 thẻ bài (`TypeId: 3`).
- **Màu sắc hộp (Box Color)**:
  - Chọn một trong các màu: Đỏ (0), Xanh dương (1), Xanh lá (2), Tím (3), Cam (4), Trung tính (5), Vàng (6), Hồng (7), Cyan (8), Chàm (9).
- **Thuộc tính đặc biệt**:
  - **Paper Box / Feeder Tray (`IsPaperBox`)**:
    - Khi tích chọn, hộp sẽ biến thành **Khay giấy**.
    - *Đặc tính*: Khi người chơi chạm vào khay giấy trong game, toàn bộ thẻ bài bên trong khay sẽ bay ra băng chuyền, và chiếc khay lập tức biến mất **mà KHÔNG chiếm bất kỳ slot nào trên băng chuyền**. Rất thích hợp để làm nguồn bài mồi giải vây.
  - **Rainbow Box / Mystery Box (`IsRainbowBox`)**:
    - Hộp bí ẩn đổi màu cầu vồng.
    - *Đặc tính*: Khi hộp đang bị đè bởi hộp tầng trên, màu sắc thực của nó sẽ bị che giấu (hiển thị biểu tượng `?` tím). Chỉ khi người chơi dọn sạch các hộp đè phía trên, màu sắc thật của nó mới lộ diện.

---

### 2.4 Cấu hình ngăn chứa thẻ bài (Card Stack Editor)

Bên dưới bảng Node Inspector là danh sách các thẻ bài ban đầu (`InitCards`) chứa trong hộp:
- **Thêm thẻ**: Bấm vào các nút màu `0` đến `9` trong bảng màu mini để thêm 1 thẻ bài vào hộp.
- **Thay đổi màu thẻ**: Bấm trực tiếp vào viên màu của thẻ trong danh sách để đổi sang màu khác.
- **Di chuyển thứ tự thẻ**: Bấm nút mũi tên lên/xuống cạnh mỗi thẻ.
- **Xoá thẻ**: Bấm icon dấu `X` bên cạnh thẻ.
- **Các nút điền nhanh (Quick Fill)**:
  - `Monocolor`: Điền toàn bộ hộp bằng chính màu của hộp.
  - `Pairs (2-2-2)`: Điền các cặp màu xen kẽ cân bằng.
  - `Clear`: Xoá sạch toàn bộ thẻ trong hộp.

---

### 2.5 Cấu hình toàn cục màn chơi (Level Config & InitialCards)

Khi không chọn hộp nào (nhấp vào khoảng trống canvas) hoặc bấm vào tab **Level Config** ở cột phải:
1. **Chế độ màn chơi (`IsHardLvl`)**:
   - Chọn **Normal Level** hoặc **Hard Level** (`⚡ Hard Level`).
   - Màn Hard sẽ hiển thị huy hiệu sấm sét nổi bật trong game và báo hiệu đây là màn thử thách/boss.
2. **Kích thước lẻ (`IsOddSize`)**: Bật nếu màn chơi sử dụng quy cách lưới ô lẻ của Unity.
3. **Thẻ bài khởi đầu trên băng chuyền (`InitialCards`)**:
   - Đây là các thẻ bài chạy sẵn trên băng chuyền ngay khi màn chơi vừa bắt đầu (trước khi người chơi bấm bất kỳ hộp nào).
   - Rất quan trọng đối với các màn hướng dẫn (như Level 1) hoặc tạo thử thách sẵn trên băng chuyền.
   - Có thể thêm bài bằng palette màu, sắp xếp thứ tự và xoá từng thẻ.
   - Thẻ trong `InitialCards` hiển thị trực tiếp thành dải màu mini (Ribbon) và được tính vào tổng lượng bài của màn chơi.

---

### 2.6 Tính toán vật cản tự động (Auto-Calculate Blockers)

Trên thanh Navbar, bấm nút **Auto-Blockers**:
- Hệ thống sẽ tự động quét diện tích tiếp xúc hình học giữa các hộp ở tầng trên (Layer $N$) và tầng dưới (Layer $N-1$, $N-2$...).
- Nếu một hộp ở tầng trên đè lên hộp ở tầng dưới, ID của hộp dưới sẽ tự động được thêm vào danh sách `BlockedNodes` của hộp trên.
- Sau khi bấm, các đường mũi tên liên kết màu hổ phách sẽ xuất hiện trên canvas, trực quan hoá thứ tự mở khoá.

> [!CAUTION]
> Luôn bấm **Auto-Blockers** sau khi bạn di chuyển vị trí, thêm hộp mới, xoá hộp hoặc đổi tầng của bất kỳ hộp nào. Nếu không cập nhật, game Unity sẽ không khoá hộp bên dưới đúng cách!

---

### 2.7 Chơi thử và kiểm tra tính giải được (Playtest Simulator)

Bấm nút **Playtest** màu tím trên Navbar để mở trình giả lập:
- Trình mô phỏng tái hiện chính xác logic vật lý và quy tắc của game Unity:
  - Băng chuyền uốn lượn có thẻ bài chạy theo thời gian thực.
  - 4 slot đỗ hộp ở đáy màn hình.
  - Chạm vào hộp không bị chặn để đưa xuống băng chuyền.
  - Thẻ trùng màu bay vào hộp, thẻ khác màu bay ra băng chuyền.
  - Hộp đầy bài tự động biến mất và mở khóa slot.
  - Khay giấy nhả bài ngay lập tức mà không chiếm slot.
  - Hộp cầu vồng hiển thị ẩn khi bị block và lộ màu khi unblock.
- Bạn có thể chơi thử từ đầu đến cuối để xác nhận trải nghiệm người chơi có mượt mà, hấp dẫn và không bị bế tắc hay không.

---

## 3. Hướng Dẫn Xuất & Nhập Dữ Liệu (Import / Export Bytes & JSON)

### 3.1 Xuất dữ liệu (Export)

Trên thanh Navbar có các tùy chọn xuất dữ liệu:
- **Export .bytes**: Tải về file định dạng nhị phân `.bytes`. Đây là định dạng chuẩn dùng để đưa trực tiếp vào thư mục Unity `Assets/.../Resources/` hoặc đóng gói vào AssetBundle.
- **Export .json**: Tải về file `.json` có định dạng thụt dòng dễ đọc, dùng để lưu trữ, xem xét hoặc chia sẻ với các thành viên khác trong team thiết kế.
- **Export All (ZIP)**: Trong mục thư viện (Library), bấm biểu tượng tải ZIP để xuất toàn bộ các màn chơi hiện có thành một file nén `.zip` chứa đầy đủ các file `.bytes`.
- **Copy JSON (`{ }` trên Navbar)**: Mở hộp thoại xem chuỗi JSON của màn chơi hiện tại. Bạn có thể bấm **Copy JSON** để dán nhanh chuỗi vào công cụ khác hoặc paste vào tài liệu thiết kế.

---

### 3.2 Nhập dữ liệu (Import)

Có 3 cách nhập dữ liệu vào công cụ:
1. **Import File từ máy tính**:
   - Bấm nút **Import Files** trên Navbar hoặc kéo thả trực tiếp file vào trình duyệt.
   - Hỗ trợ file đơn lẻ `.bytes`, `.json`, hoặc file `.zip` chứa hàng chục màn chơi. Hệ thống sẽ tự giải nén và nạp toàn bộ vào danh sách Library.
2. **Nhập bằng chuỗi JSON (Load from JSON Modal)**:
   - Bấm icon **Load JSON** (nút có dấu mũi tên tải vào trang văn bản trên Navbar hoặc trong cửa sổ `{ } JSON`).
   - Dán chuỗi JSON của một màn chơi đơn lẻ hoặc dán một mảng JSON chứa nhiều màn chơi:
     ```json
     [
       { "name": "Level 1", "data": { ... } },
       { "name": "Level 2", "data": { ... } }
     ]
     ```
   - Bấm **Load Level** để nạp màn chơi ngay lập tức.
3. **Chọn màn từ Thư viện (Library)**:
   - Trong tab Library ở Sidebar trái, bấm vào bất kỳ màn chơi mẫu (Easy 1–10, Medium 1–10, Hard 1–10) hoặc các màn bạn đã lưu trong LocalStorage để mở và tiếp tục chỉnh sửa.

---

### 3.3 Cấu trúc file chuẩn (JSON Schema)

File màn chơi của Card Factory tuân thủ nghiêm ngặt thứ tự các trường dữ liệu sau:

```json
{
  "Id": 1,
  "BoardOffsetX": 0,
  "BoardOffsetZ": 0,
  "BoardNodes": [
    {
      "Id": "0_-1.75_1.05",
      "LayerId": 0,
      "YRotation": 0.0,
      "XPosition": -1.75,
      "ZPosition": 1.05
    }
  ],
  "BoxNodes": [
    {
      "Id": "0_-1.75_1.05",
      "TypeId": 1,
      "BoxColor": 0,
      "BlockedNodes": [],
      "InitCards": [1, 1, 1, 2, 2, 2],
      "IsHidden": false,
      "LockedTurn": 0,
      "IsPaperBox": false,
      "IsRainbowBox": false
    }
  ],
  "SpawnerNodes": [],
  "TurnSpawnerNodes": [],
  "LinkedBoxes": [],
  "IsOddSize": false,
  "Version": 2,
  "IsHardLvl": false,
  "InitialCards": [0, 0, 0, 1, 1, 1, 2, 2, 2]
}
```

> [!NOTE]
> Hai trường `IsHardLvl` và `InitialCards` luôn được ghi tuần tự ngay sau `IsOddSize` và `Version` để đảm bảo game Unity đọc file không bị sai lệch schema.

---

## 4. Các Điểm Bắt Buộc Cần Chú Ý & Kiểm Tra Trước Khi Export

Để đảm bảo level hoạt động hoàn hảo trong game Unity và không gây lỗi crash hoặc kẹt game không thể phá đảo, **BẮT BUỘC** phải kiểm tra 7 quy tắc dưới đây trước khi bấm Export:

---

### Quy tắc 1: Cân bằng số lượng bài và dung tích hộp (Card Distribution vs Box Capacity)

> [!IMPORTANT]
> **Tổng số thẻ bài của mỗi màu phải bằng chính xác tổng dung tích (capacity) của các hộp mang màu đó!**

- **Cách tính**:
  - Dung tích hộp màu $C$ = Tổng số slot của tất cả các hộp có `BoxColor == C` (không tính khay giấy `IsPaperBox`).
  - Lượng thẻ bài màu $C$ = Tổng số thẻ có giá trị $C$ nằm trong tất cả các hộp (`InitCards`, tính cả khay giấy) cộng với số thẻ $C$ có trong `InitialCards`.
  - **Bắt buộc**: $\text{Lượng thẻ bài màu } C = \text{Dung tích hộp màu } C$.
- **Hậu quả nếu sai**:
  - Nếu thiếu bài: Hộp mang màu đó sẽ không bao giờ có thể gom đủ bài để hoàn thành $\rightarrow$ Game không thể thắng.
  - Nếu thừa bài: Các thẻ bài thừa sẽ chạy lòng vòng vĩnh viễn trên băng chuyền $\rightarrow$ Không dọn sạch bàn cờ.
- **Cách kiểm tra trên công cụ**:
  - Nhìn lên thanh **StatsBar**. Nếu có biểu tượng tam giác vàng cảnh báo lỗi (Warning), nhấp vào để mở bảng **Validation Issues**.
  - Nếu xuất hiện dòng `Color X: Total cards (A) does not match total box capacity (B)`, bạn cần thêm/bớt thẻ màu $X$ tương ứng cho đến khi cảnh báo biến mất.

---

### Quy tắc 2: Không tạo hộp đơn sắc cùng màu đã đầy sẵn (No fully-filled monocolor matching boxes)

> [!WARNING]
> **Một hộp KHÔNG ĐƯỢC PHÉP chứa toàn bộ thẻ cùng màu với chính nó khi đã đầy dung tích!**

- **Ví dụ vi phạm**: Hộp dung tích 6, màu Đỏ (`BoxColor: 0`), chứa sẵn 6 thẻ Đỏ: `[0, 0, 0, 0, 0, 0]`.
- **Vì sao cấm?**:
  - Nếu một hộp đỏ đã đầy bài đỏ ngay từ đầu, khi người chơi bấm vào nó, nó không xả ra bất kỳ thẻ bài nào khác lên băng chuyền, và lập tức tự hoàn thành mà không cần tương tác gì với các thẻ trên băng chuyền. Điều này làm triệt tiêu tính giải đố của game.
- **Cách thiết kế đúng**:
  - Hộp phải chứa ít nhất 1 hoặc nhiều thẻ bài khác màu (ví dụ 3 thẻ Đỏ + 3 thẻ Xanh).
  - Hoặc nếu chỉ chứa bài cùng màu, hộp phải **chưa đầy** (ví dụ hộp 6-slot nhưng chỉ chứa 3 thẻ Đỏ `[0, 0, 0]`, để 3 slot trống cho các thẻ đỏ từ băng chuyền bay vào).

---

### Quy tắc 3: Tính giải được trong giới hạn 4 slot băng chuyền (4-Slot Solvability)

> [!CAUTION]
> **Băng chuyền chỉ có 4 vị trí đỗ hộp. Mọi màn chơi đều phải có lộ trình giải thắng mà không bao giờ bị nghẽn 4 slot!**

- Nếu người chơi gửi 4 hộp xuống băng chuyền nhưng không hộp nào đủ điều kiện lấp đầy để rời đi:
  - Băng chuyền sẽ bị chiếm hết 4 slot.
  - Các hộp còn lại trên bàn bị khoá không thể bấm được nữa.
  - Người chơi rơi vào trạng thái thua cuộc (Game Over).
- **Cách kiểm tra**:
  - Chạy thử trực tiếp trong **Playtest Simulator**.
  - Đảm bảo các nhóm thẻ bài được ghép đôi hoặc tạo thành chuỗi liên hoàn (Cascade): Hộp A xả màu cho Hộp B $\rightarrow$ Hộp B đầy rời đi giải phóng slot $\rightarrow$ Hộp B xả màu cho Hộp C...
  - Nút **Auto-Balance Deck** trong công cụ được tích hợp sẵn thuật toán DFS (Depth-First Search) để tự động kiểm định tính giải được với 4 slot.

---

### Quy tắc 4: Cập nhật lại Auto-Blockers sau mỗi thay đổi vị trí

- Khi bạn di chuyển vị trí $X, Z$ của một hộp, xoá hộp hoặc thêm hộp mới:
  - Quan hệ che phủ giữa tầng trên và tầng dưới đã bị thay đổi trong không gian.
  - Nếu không bấm **Auto-Blockers**, mảng `BlockedNodes` cũ vẫn được lưu trong dữ liệu, dẫn đến việc Unity hiển thị sai trạng thái khoá hộp (hộp trống bên dưới không ai đè lại bị khoá, hoặc hộp bị đè nặng lại bấm được).
- **Luôn nhớ**: Bấm **Auto-Calculate Blockers** trước khi lưu hoặc xuất file!

---

### Quy tắc 5: Tránh xung đột cùng tầng (Same-Layer Overlap Conflict)

- Hai hộp nằm trên **cùng một LayerId** không được phép đặt toạ độ đè lên nhau.
- Nếu đặt hai hộp đè nhau ở cùng một tầng, mô hình 3D trong Unity sẽ bị lỗi chìm hình ảnh (Z-fighting) và người chơi không thể nhấp chọn được hộp bên dưới.
- Khi bấm **Auto-Blockers**, nếu có xung đột cùng tầng, thanh thông báo sẽ hiển thị cảnh báo: `Warning: X pairs overlap on the same layer!`. Hãy tách các hộp đó ra xa nhau hoặc phân chúng thành 2 tầng khác nhau.

---

### Quy tắc 6: Xác nhận đúng cờ `IsHardLvl` và mảng `InitialCards`

- **Kiểm tra cờ độ khó**:
  - Các màn chơi thông thường: Đảm bảo công tắc đặt ở **Normal Lvl** (`IsHardLvl: false`).
  - Các màn chơi mốc độ khó / màn Boss (ví dụ màn 10 của mỗi bậc): Đặt ở **⚡ Hard Lvl** (`IsHardLvl: true`).
- **Kiểm tra bài khởi đầu trên băng chuyền**:
  - Xem chip `Conveyor: N` trên thanh StatsBar.
  - Nếu màn chơi có bài khởi đầu trên băng chuyền, hãy bấm vào chip `Conveyor` để kiểm tra dải màu thẻ có đúng ý đồ thiết kế kịch bản hay không.
  - Nhớ rằng các thẻ trong `InitialCards` cũng được tính vào tổng số thẻ của màn chơi để so khớp với dung tích hộp theo **Quy tắc 1**.

---

### Quy tắc 7: Tuân thủ đường cong độ khó (Difficulty Curve Progression)

Khi thiết kế một chuỗi 10 màn chơi (Level 1 đến Level 10), hãy tuân thủ phân bổ độ khó chuẩn:
1. **Level 1 & 2 (Màn làm quen)**:
   - Tối đa **2 màu mỗi hộp**.
   - Các nhóm thẻ phân chia đều: cặp `(3-3)` cho hộp 6-slot, `(2-2)` cho hộp 4-slot.
2. **Level 3 đến 8 (Màn trung bình)**:
   - Cho phép tối đa **3 màu mỗi hộp**.
   - Dạng **2 màu/hộp vẫn là phổ biến nhất** (chiếm ~70% các hộp). Dạng 3 màu chỉ xuất hiện điểm xuyết trên các hộp dung tích lớn (8-slot) để tạo độ thử thách vừa phải.
3. **Level 9 & 10 (Màn thử thách cao / Milestone Boss)**:
   - Cho phép nâng lên tối đa **4 màu mỗi hộp**.
   - Tuy nhiên, **chỉ giới hạn tối đa 2 đến 3 hộp có 4 màu** trong toàn màn chơi để tránh gây rối mắt và giữ nhịp chơi công bằng.

---

## 5. Quy Trình Kiểm Tra Nhanh (Checklist)

Trước khi gửi file cho lập trình viên Unity hoặc xuất ra `.bytes`, hãy dành 30 giây thực hiện các bước sau:

1. [ ] Đã bấm **Auto-Blockers** để cập nhật quan hệ đè lớp mới nhất.
2. [ ] StatsBar báo **0 Issues** (Tổng bài từng màu khớp chính xác 100% dung tích các hộp cùng màu).
3. [ ] Không có hộp nào bị tình trạng đầy sẵn đơn sắc cùng màu (`6/6` hoặc `8/8` cùng màu hộp).
4. [ ] Đã chạy thử **Playtest** thắng trọn vẹn, không bao giờ bị nghẽn quá 4 slot băng chuyền.
5. [ ] Cờ `IsHardLvl` đã được chọn đúng (Normal hoặc Hard).
6. [ ] Thẻ bài trên băng chuyền `InitialCards` (nếu có) đã được cấu hình chính xác.
7. [ ] Tên màn chơi đã được đặt rõ ràng.
8. [ ] Xuất file `.bytes` và lưu bản dự phòng `.json`!
