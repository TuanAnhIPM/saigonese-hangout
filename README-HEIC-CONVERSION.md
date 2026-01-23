# HEIC to JPG Conversion Script

Script để chuyển đổi tất cả ảnh HEIC thành JPG format để hiển thị trên web.

## Cài đặt

### 1. Cài đặt Python dependencies:

```bash
pip install -r requirements-heic.txt
```

Hoặc cài đặt trực tiếp:

```bash
pip install Pillow pillow-heif
```

### 2. Chạy script:

```bash
python convert-heic-to-jpg.py
```

Script sẽ tự động tìm và convert tất cả file HEIC trong thư mục `public/images/grid-50-morning-tour/`

## Các tùy chọn

### Chỉ định thư mục khác:

```bash
python convert-heic-to-jpg.py /path/to/your/directory
```

### Điều chỉnh chất lượng JPG (1-100, mặc định 95):

```bash
python convert-heic-to-jpg.py public/images/grid-50-morning-tour 85
```

### Xóa file HEIC gốc sau khi convert:

```bash
python convert-heic-to-jpg.py public/images/grid-50-morning-tour 95 delete
```

## Ví dụ sử dụng

### Convert với chất lượng mặc định (95):

```bash
python convert-heic-to-jpg.py
```

### Convert với chất lượng 90 và xóa file gốc:

```bash
python convert-heic-to-jpg.py public/images/grid-50-morning-tour 90 delete
```

## Lưu ý

- Script sẽ tự động skip các file đã có JPG tương ứng
- File JPG sẽ được lưu cùng tên với file HEIC, chỉ đổi extension
- Nếu file HEIC có alpha channel (transparency), sẽ được convert sang background trắng
- Chất lượng mặc định là 95 để đảm bảo chất lượng ảnh tốt nhưng vẫn tối ưu kích thước file

## Troubleshooting

Nếu gặp lỗi khi cài đặt `pillow-heif`, thử:

```bash
# Trên macOS
brew install libheif

# Trên Ubuntu/Debian
sudo apt-get install libheif-dev

# Sau đó cài lại
pip install pillow-heif
```

































