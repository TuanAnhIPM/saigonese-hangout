# Hướng dẫn thêm ảnh cho Insider Tips

## Cách thêm ảnh:

1. **Tải ảnh từ Google Images:**
   - Truy cập https://images.google.com
   - Tìm kiếm tên món ăn hoặc địa điểm
   - Click chuột phải vào ảnh → "Lưu hình ảnh thành..."
   - Lưu vào thư mục này (`public/images/insider/`)

2. **Đặt tên file theo format:**
   - Food: `food-[id]-[ten-mon].jpg` (ví dụ: `food-1-com-tam.jpg`)
   - Historical: `historical-[id]-[ten-dia-diem].jpg` (ví dụ: `historical-1-independence-palace.jpg`)
   - Nightlife: `nightlife-[id]-[ten-dia-diem].jpg` (ví dụ: `nightlife-1-bui-vien.jpg`)

3. **Hoặc đặt tên đơn giản:**
   - Chỉ cần đặt tên mô tả và cập nhật đường dẫn trong file `InsiderTipsThankYou.jsx`

## Cập nhật đường dẫn trong code:

Trong file `src/pages/InsiderTipsThankYou.jsx`, tìm field `image` và cập nhật:

```javascript
image: "/images/insider/food-1-com-tam.jpg"
```

## Lưu ý:

- Ảnh sẽ hiển thị tự động sau khi bạn lưu file vào thư mục này
- Không cần restart server, chỉ cần refresh trang
- Format ảnh khuyến nghị: JPG, PNG
- Kích thước khuyến nghị: 800x600px trở lên

