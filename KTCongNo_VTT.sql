CREATE TABLE DMHH (
    MaHH TEXT NOT NULL PRIMARY KEY,
    TenHH TEXT NOT NULL,
    DVT TEXT NOT NULL
);

CREATE TABLE CTHoaDon (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    SoCT TEXT NOT NULL,
    MaHH TEXT NOT NULL,
    SoLuong NUMERIC,
    DonGia NUMERIC,
    ThanhTien NUMERIC
);

CREATE TABLE CTHoaDonMuaHang (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    SoCT TEXT NOT NULL,
    MaHH TEXT NOT NULL,
    SoLuong NUMERIC,
    DonGia NUMERIC,
    ThanhTien NUMERIC
);

CREATE TABLE HoaDonMuaHang (
    SoCT TEXT NOT NULL PRIMARY KEY,
    NgayCT TEXT,
    MaKH TEXT,
    TKNoHang TEXT,
    TKNoThue TEXT,
    TKCoThanhToan TEXT,
    HanTT NUMERIC,
    TienThanhToan NUMERIC,
    TienHang NUMERIC,
    ThueSuat NUMERIC,
    TienThue NUMERIC,
    HTTT TEXT,
    TienCK NUMERIC,
    TyLeCK NUMERIC,
    TKChietKhau TEXT,
    DienGiai TEXT,
    MaCT TEXT NOT NULL
);

CREATE TABLE HDHH (
    SoCT TEXT NOT NULL PRIMARY KEY,
    NgayCT TEXT,
    MaKH TEXT,
    TKNoThanhToan TEXT,
    TKCoDoanhThu TEXT,
    TKCoThue TEXT,
    HanTT NUMERIC,
    TienThanhToan NUMERIC,
    TienDoanhThu NUMERIC,
    ThueSuat NUMERIC,
    TienThue NUMERIC,
    HTTT TEXT,
    TienCK NUMERIC,
    TyLeCK NUMERIC,
    TKChietKhau TEXT,
    DienGiai TEXT,
    MaCT TEXT NOT NULL
);

CREATE TABLE PhieuKT (
    SoCT TEXT NOT NULL PRIMARY KEY,
    NgayCT TEXT NOT NULL,
    MaKH TEXT NOT NULL,
    LyDo TEXT NOT NULL,
    CTLQ TEXT,
    MaCT TEXT NOT NULL
);

CREATE TABLE GiayBao (
    SoCT TEXT NOT NULL PRIMARY KEY,
    NgayCT TEXT NOT NULL,
    MaKH TEXT NOT NULL,
    NguoiGD TEXT NOT NULL,
    LyDo TEXT NOT NULL,
    MaCT TEXT NOT NULL,
    SoTKNHDi TEXT,
    SoTKNHDen TEXT
);

CREATE TABLE PhieuTC (
    SoCT TEXT NOT NULL PRIMARY KEY,
    NgayCT TEXT NOT NULL,
    MaKH TEXT NOT NULL,
    NguoiGD TEXT NOT NULL,
    LyDo TEXT NOT NULL,
    MaCT TEXT NOT NULL
);

CREATE TABLE CTPhieu ( 
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    SoCT TEXT NOT NULL,
    TKNo TEXT NOT NULL,
    TKCo TEXT NOT NULL,
    NoiDung TEXT NOT NULL,
    SoTien NUMERIC NOT NULL
);

CREATE TABLE DMCT (
    MaCT TEXT NOT NULL PRIMARY KEY,
    TenCT TEXT NOT NULL,
    TblName TEXT NOT NULL
);

CREATE TABLE DMKH (
    MaKH TEXT NOT NULL PRIMARY KEY,
    TenKH TEXT NOT NULL,
    DiaChi TEXT,
    Email TEXT,
    DienThoai TEXT,
    MaSoThue TEXT
);

CREATE TABLE DMTienTe (
    MaTien TEXT NOT NULL PRIMARY KEY,
    TenTien TEXT NOT NULL,
    HachToan INTEGER NOT NULL
);

CREATE TABLE DMTK (
    MaTK TEXT NOT NULL PRIMARY KEY,
    TenTK TEXT,
    CapTK INTEGER,
    TKCapTren TEXT
);

CREATE TABLE NganHang (
    MaNH TEXT NOT NULL PRIMARY KEY,
    TenNH TEXT NOT NULL
);

CREATE TABLE NguoiDung (
    TenDN TEXT NOT NULL PRIMARY KEY,
    MatKhau TEXT NOT NULL,
    TenNguoiDung TEXT NOT NULL,
    Quyen INTEGER NOT NULL
);

CREATE TABLE NoDauKy (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    MaTK TEXT NOT NULL,
    MaKH TEXT NOT NULL,
    DuNo NUMERIC,
    DuCo NUMERIC
);

CREATE TABLE SanPham (
    MaSanPham TEXT NOT NULL PRIMARY KEY,
    TenSanPham TEXT NOT NULL
);

CREATE TABLE SoDuDauKy (
    MaTK TEXT NOT NULL PRIMARY KEY,
    DuNo NUMERIC,
    DuCo NUMERIC
);

CREATE TABLE TaiKhoanNH (
    SoTKNH TEXT NOT NULL PRIMARY KEY,
    ChuTaiKhoan TEXT NOT NULL,
    ChiNhanh TEXT NOT NULL,
    MaNH TEXT
);

INSERT INTO CTHoaDon (Id, SoCT, MaHH, SoLuong, DonGia, ThanhTien) 
VALUES (1034, 'HD007', 'HH02', 1, 9000000, 9000000);

INSERT INTO CTHoaDon (Id, SoCT, MaHH, SoLuong, DonGia, ThanhTien) 
VALUES (1035, 'HD007', 'HH05', 6, 1550000, 9300000);

INSERT INTO CTHoaDon (Id, SoCT, MaHH, SoLuong, DonGia, ThanhTien) 
VALUES (1062, 'HD002', 'ON01', 1, 9000000, 9000000);

INSERT INTO CTHoaDon (Id, SoCT, MaHH, SoLuong, DonGia, ThanhTien) 
VALUES (1063, 'HD003', 'HH03', 1, 4690000, 4690000);

INSERT INTO CTHoaDon (Id, SoCT, MaHH, SoLuong, DonGia, ThanhTien) 
VALUES (1064, 'HD003', 'HH02', 1, 9000000, 9000000);

INSERT INTO CTHoaDon (Id, SoCT, MaHH, SoLuong, DonGia, ThanhTien) 
VALUES (1065, 'HD003', 'HH04', 0, 0, 0);

INSERT INTO CTHoaDon (Id, SoCT, MaHH, SoLuong, DonGia, ThanhTien) 
VALUES (1066, 'HD004', 'HH01', 2, 7650000, 15300000);

INSERT INTO CTHoaDon (Id, SoCT, MaHH, SoLuong, DonGia, ThanhTien) 
VALUES (1067, 'HD004', 'K01', 1, 16000000, 16000000);

INSERT INTO CTHoaDon (Id, SoCT, MaHH, SoLuong, DonGia, ThanhTien) 
VALUES (1068, 'HD004', 'K03', 0, 0, 0);

INSERT INTO CTHoaDon (Id, SoCT, MaHH, SoLuong, DonGia, ThanhTien) 
VALUES (1069, 'HD005', 'K04', 1, 12690000, 12690000);

INSERT INTO CTHoaDon (Id, SoCT, MaHH, SoLuong, DonGia, ThanhTien) 
VALUES (1070, 'HD006', 'HH02', 1, 9000000, 9000000);

INSERT INTO CTHoaDon (Id, SoCT, MaHH, SoLuong, DonGia, ThanhTien) 
VALUES (1071, 'HD006', 'HH05', 6, 1550000, 9300000);

INSERT INTO CTHoaDonMuaHang (Id, SoCT, MaHH, SoLuong, DonGia, ThanhTien) 
VALUES (1002, 'TL001', 'DV0001', 2, 4000000, 8000000);

INSERT INTO CTHoaDonMuaHang (Id, SoCT, MaHH, SoLuong, DonGia, ThanhTien) 
VALUES (1003, 'MH001', 'DV0003', 1, 17000000, 17000000);

INSERT INTO CTHoaDonMuaHang (Id, SoCT, MaHH, SoLuong, DonGia, ThanhTien) 
VALUES (1004, 'MH001', 'DV0007', 10, 1100000, 11000000);

INSERT INTO CTHoaDonMuaHang (Id, SoCT, MaHH, SoLuong, DonGia, ThanhTien) 
VALUES (1005, 'MH002', 'DV0004', 1, 2300000, 2300000);

INSERT INTO CTHoaDonMuaHang (Id, SoCT, MaHH, SoLuong, DonGia, ThanhTien) 
VALUES (1006, 'MH003', 'DV0002', 5, 150000, 750000);

INSERT INTO CTPhieu (Id, SoCT, TKNo, TKCo, NoiDung, SoTien) 
VALUES (244, 'BN005', '331', '', 'Thanh toán nội thất', 15000000);

INSERT INTO CTPhieu (Id, SoCT, TKNo, TKCo, NoiDung, SoTien) 
VALUES (245, 'BN005', '', '1121', '', 15000000);

INSERT INTO CTPhieu (Id, SoCT, TKNo, TKCo, NoiDung, SoTien) 
VALUES (246, 'BN004', '331', '', 'Trả tiền in ấn', 36000000);

INSERT INTO CTPhieu (Id, SoCT, TKNo, TKCo, NoiDung, SoTien) 
VALUES (247, 'BN004', '', '1121', '', 36000000);

INSERT INTO CTPhieu (Id, SoCT, TKNo, TKCo, NoiDung, SoTien) 
VALUES (248, 'BN003', '331', '', 'Mua máy in văn phòng', 15000000);

INSERT INTO CTPhieu (Id, SoCT, TKNo, TKCo, NoiDung, SoTien) 
VALUES (249, 'BN003', '', '1121', '', 15000000);

INSERT INTO CTPhieu (Id, SoCT, TKNo, TKCo, NoiDung, SoTien) 
VALUES (250, 'BN002', '331', '', 'Trả tiền điện thoại bàn', 12000000);

INSERT INTO CTPhieu (Id, SoCT, TKNo, TKCo, NoiDung, SoTien) 
VALUES (251, 'BN002', '', '1121', '', 12000000);

INSERT INTO CTPhieu (Id, SoCT, TKNo, TKCo, NoiDung, SoTien) 
VALUES (252, 'BN001', '331', '', 'Chuyển trước tiền mua linh kiện máy tính', 5000000);

INSERT INTO CTPhieu (Id, SoCT, TKNo, TKCo, NoiDung, SoTien) 
VALUES (253, 'BN001', '', '1121', 'Chuyển trước tiền mua linh kiện máy tính', 5000000);

INSERT INTO CTPhieu (Id, SoCT, TKNo, TKCo, NoiDung, SoTien) 
VALUES (254, 'BC001', '1121', '', 'Thanh toán dịch vụ phần mềm tháng 4', 12500000);

INSERT INTO CTPhieu (Id, SoCT, TKNo, TKCo, NoiDung, SoTien) 
VALUES (255, 'BC001', '', '131', 'Thanh toán dịch vụ phần mềm tháng 4', 12500000);

INSERT INTO CTPhieu (Id, SoCT, TKNo, TKCo, NoiDung, SoTien) 
VALUES (256, 'BC002', '1121', '', 'Thanh toán đợt 2', 25000000);

INSERT INTO CTPhieu (Id, SoCT, TKNo, TKCo, NoiDung, SoTien) 
VALUES (257, 'BC002', '', '131', '', 25000000);

INSERT INTO CTPhieu (Id, SoCT, TKNo, TKCo, NoiDung, SoTien) 
VALUES (258, 'BC003', '1121', '', 'Thanh toán đợt 3', 10000000);

INSERT INTO CTPhieu (Id, SoCT, TKNo, TKCo, NoiDung, SoTien) 
VALUES (259, 'BC003', '', '131', '', 10000000);

INSERT INTO CTPhieu (Id, SoCT, TKNo, TKCo, NoiDung, SoTien) 
VALUES (260, 'BC004', '1121', '', '', 6000000);

INSERT INTO CTPhieu (Id, SoCT, TKNo, TKCo, NoiDung, SoTien) 
VALUES (261, 'BC004', '', '131', 'Thanh toán đợt 1', 6000000);

INSERT INTO CTPhieu (Id, SoCT, TKNo, TKCo, NoiDung, SoTien) 
VALUES (262, 'BC004', '', '', '', 0);

INSERT INTO CTPhieu (Id, SoCT, TKNo, TKCo, NoiDung, SoTien) 
VALUES (263, 'BC005', '1121', '', '', 5000000);

INSERT INTO CTPhieu (Id, SoCT, TKNo, TKCo, NoiDung, SoTien) 
VALUES (264, 'BC005', '', '131', 'Thanh toán tiền TOKEN và CAMERA', 5000000);

INSERT INTO CTPhieu (Id, SoCT, TKNo, TKCo, NoiDung, SoTien) 
VALUES (265, 'KT001', '811', '', 'Xóa nợ', 4500000);

INSERT INTO CTPhieu (Id, SoCT, TKNo, TKCo, NoiDung, SoTien) 
VALUES (266, 'KT001', '', '131', 'Xóa nợ', 4500000);

INSERT INTO CTPhieu (Id, SoCT, TKNo, TKCo, NoiDung, SoTien) 
VALUES (267, 'KT002', '131', '', '', 7000000);

INSERT INTO CTPhieu (Id, SoCT, TKNo, TKCo, NoiDung, SoTien) 
VALUES (268, 'KT002', '111', '131', '', 15000000);

INSERT INTO CTPhieu (Id, SoCT, TKNo, TKCo, NoiDung, SoTien) 
VALUES (269, 'KT002', '111', '511', '', 22000000);

INSERT INTO CTPhieu (Id, SoCT, TKNo, TKCo, NoiDung, SoTien) 
VALUES (270, 'KT004', '111', '131', '', 5000000);

INSERT INTO CTPhieu (Id, SoCT, TKNo, TKCo, NoiDung, SoTien) 
VALUES (271, 'KT004', '', '131', '', 5000000);

INSERT INTO CTPhieu (Id, SoCT, TKNo, TKCo, NoiDung, SoTien) 
VALUES (272, 'KT003', '532', '131', 'Giảm giá hàng bán', 4200000);

INSERT INTO CTPhieu (Id, SoCT, TKNo, TKCo, NoiDung, SoTien) 
VALUES (273, 'KT003', '111', '131', 'gcfhgfjgj', 4200000);

INSERT INTO CTPhieu (Id, SoCT, TKNo, TKCo, NoiDung, SoTien) 
VALUES (276, 'PT002', '112', '131', 'Thanh toán tiền Camera cho công ty ÔNG TY CỔ PHẦN DƯỢC MỸ PHẨM SANCHA', 6000000);

INSERT INTO CTPhieu (Id, SoCT, TKNo, TKCo, NoiDung, SoTien) 
VALUES (277, 'PT001', '111', '131', 'Thu tiền khóa học pm của CÔNG TY CỔ PHẦN THƯƠNG MẠI VÀ PHÁT TRIỂN NGÔI NHÀ XANH', 12550000);

INSERT INTO CTPhieu (Id, SoCT, TKNo, TKCo, NoiDung, SoTien) 
VALUES (279, 'PT003', '111', '131', 'Thu tiền đào tạo phần mềm của công ty XUÂN TRƯỜNG KM', 18650000);

INSERT INTO CTPhieu (Id, SoCT, TKNo, TKCo, NoiDung, SoTien) 
VALUES (281, 'PT004', '111', '131', 'Thu tiền Token của CÔNG TY TNHH THIẾT BỊ THÔNG MINH SSEHOME', 5000000);

INSERT INTO CTPhieu (Id, SoCT, TKNo, TKCo, NoiDung, SoTien) 
VALUES (282, 'PC001', '331', '112', 'Chi tiền mua thiết bị văn phòng', 20000000);

INSERT INTO CTPhieu (Id, SoCT, TKNo, TKCo, NoiDung, SoTien) 
VALUES (284, 'PC003', '331', '112', 'Trả tiền thuốc diệt muỗi văn phòng cho CÔNG TY TNHH KỸ NGHỆ PHÚC ANH', 3000000);

INSERT INTO CTPhieu (Id, SoCT, TKNo, TKCo, NoiDung, SoTien) 
VALUES (285, 'PC002', '331', '111', 'Trả tiền mua màn hình máy tính cho CÔNG TY CỔ PHẦN THƯƠNG MẠI MÁY TÍNH AN PHÁT', 34000000);

INSERT INTO DMCT (MaCT, TenCT, TblName) VALUES ('BC', 'Giấy báo có', 'GiayBao');
INSERT INTO DMCT (MaCT, TenCT, TblName) VALUES ('BN', 'Giấy báo nợ', 'GiayBao');
INSERT INTO DMCT (MaCT, TenCT, TblName) VALUES ('GG', 'Phiếu giảm giá hàng bán', 'PhieuGiamGia');
INSERT INTO DMCT (MaCT, TenCT, TblName) VALUES ('HD', 'Hóa đơn GTGT', 'HDHH');
INSERT INTO DMCT (MaCT, TenCT, TblName) VALUES ('KK', 'Biên bản kiểm kê quỹ', 'BBKK');
INSERT INTO DMCT (MaCT, TenCT, TblName) VALUES ('KT', 'Phiếu kế toán', 'PhieuKT');
INSERT INTO DMCT (MaCT, TenCT, TblName) VALUES ('MH', 'Hóa đơn mua hàng', 'HoaDonMuaHang');
INSERT INTO DMCT (MaCT, TenCT, TblName) VALUES ('PC', 'Phiếu chi', 'PhieuTC');
INSERT INTO DMCT (MaCT, TenCT, TblName) VALUES ('PN', 'Phiếu Nhập', 'PhieuNhap');
INSERT INTO DMCT (MaCT, TenCT, TblName) VALUES ('PT', 'Phiếu thu', 'PhieuTC');
INSERT INTO DMCT (MaCT, TenCT, TblName) VALUES ('PX', 'Phiếu Xuất', 'PhieuXuat');

INSERT INTO DMHH (MaHH, TenHH, DVT) VALUES ('HH01', 'MÁY CHẤM CÔNG MISA', 'Chiếc');
INSERT INTO DMHH (MaHH, TenHH, DVT) VALUES ('HH02', 'MÁY TÍNH TIỀN MISA', 'Chiếc');
INSERT INTO DMHH (MaHH, TenHH, DVT) VALUES ('HH03', 'MÁY TÍNH BẢNG', 'Chiếc');
INSERT INTO DMHH (MaHH, TenHH, DVT) VALUES ('HH04', 'TOKEN', 'Chiếc');
INSERT INTO DMHH (MaHH, TenHH, DVT) VALUES ('HH05', 'CAMERA', 'Chiếc');
INSERT INTO DMHH (MaHH, TenHH, DVT) VALUES ('K01', 'Khóa đào tạo phần mềm AMIS KT 1-1', 'Khoá');
INSERT INTO DMHH (MaHH, TenHH, DVT) VALUES ('K02', 'Khóa đào tạo phần mềm MISA SME 1-1', 'Khoá');
INSERT INTO DMHH (MaHH, TenHH, DVT) VALUES ('K03', 'Khóa đào tạo tập trung AMIS KT (trên 10 người)', 'Khoá');
INSERT INTO DMHH (MaHH, TenHH, DVT) VALUES ('K04', 'Khóa đào tạo tập trung MISA SME (trên 10 người)', 'Khoá');
INSERT INTO DMHH (MaHH, TenHH, DVT) VALUES ('OFF01', 'Khóa học phần mềm AMIS KT trực tiếp', 'Khoá');
INSERT INTO DMHH (MaHH, TenHH, DVT) VALUES ('OFF02', 'Khóa học phần mềm MISA SME offline', 'Khoá');
INSERT INTO DMHH (MaHH, TenHH, DVT) VALUES ('ON01', 'Khóa học phần mềm AMIS KT online', 'Khoá');
INSERT INTO DMHH (MaHH, TenHH, DVT) VALUES ('ON02', 'Khóa học phần mềm MISA SME online', 'Khoá');

INSERT INTO DMKH (MaKH, TenKH, DiaChi, Email, DienThoai, MaSoThue) 
VALUES ('KH001', 'CÔNG TY TNHH DỊCH VỤ THƯƠNG MẠI VÀ DU LỊCH QUỐC TẾ CỬA KHẨU', 'Số 72, Tổ 07, Khu 04, Phường Hồng Hà, Thành phố Hạ Long, Tỉnh Quảng Ninh, Việt Nam', '', '0916613588', '5702114409');

INSERT INTO DMKH (MaKH, TenKH, DiaChi, Email, DienThoai, MaSoThue) 
VALUES ('KH002', 'CÔNG TY TNHH THIẾT BỊ THÔNG MINH SSEHOME', 'Số 35, Nguyễn Ngọc Vũ, Phường Trung Hoà, Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam', '', '', '0106718312');

INSERT INTO DMKH (MaKH, TenKH, DiaChi, Email, DienThoai, MaSoThue) 
VALUES ('KH003', 'CÔNG TY TNHH THƯƠNG MẠI LUXWELLCENTER TÙNG ANH', 'Số 40 Phố Mới, Cụm 2, Xã Thọ Xuân, Huyện Đan Phượng, Thành phố Hà Nội, Việt Nam', '', '', '0110721974');

INSERT INTO DMKH (MaKH, TenKH, DiaChi, Email, DienThoai, MaSoThue) 
VALUES ('KH004', 'CÔNG TY TRÁCH NHIỆM HỮU HẠN MỘT THÀNH VIÊN HUNG TECH', 'Tổ dân phố Tam Tầng, Phường Quang Châu, Thị xã Việt Yên, Tỉnh Bắc Giang, Việt Nam', '', '', '2400557889');

INSERT INTO DMKH (MaKH, TenKH, DiaChi, Email, DienThoai, MaSoThue) 
VALUES ('KH005', 'CÔNG TY CỔ PHẦN SẢN XUẤT THƯƠNG MẠI VÀ DỊCH VỤ BẢO MINH', 'Số 125 Ngõ 38, Đường Đình Xuyên, Xã Đình Xuyên, Huyện Gia Lâm, Thành phố Hà Nội, Việt Nam', '', '', '0102347850');

INSERT INTO DMKH (MaKH, TenKH, DiaChi, Email, DienThoai, MaSoThue) 
VALUES ('KH006', 'CÔNG TY CỔ PHẦN DƯỢC MỸ PHẨM SANCHA VIỆT NAM - THÀNH SƠN', 'Số 441 đường 20-8, Xã Phương Độ, TP Hà Giang, Tỉnh Hà Giang, Việt Nam', '', '', '5100497514');

INSERT INTO DMKH (MaKH, TenKH, DiaChi, Email, DienThoai, MaSoThue) 
VALUES ('KH007', 'CÔNG TY CỔ PHẦN TRÀNG TIỀN', 'Số 35 Tràng Tiền, Phường Tràng Tiền, Quận Hoàn Kiếm, Thành phố Hà Nội, Việt Nam', '', '', '0100107148');

INSERT INTO DMKH (MaKH, TenKH, DiaChi, Email, DienThoai, MaSoThue) 
VALUES ('KH008', 'CÔNG TY CỔ PHẦN DATYSO VIỆT NAM', 'Thôn Đại Tự, Xã Kim Chung, Huyện Hoài Đức, Thành phố Hà Nội, Việt Nam', '', '', '0106684335');

INSERT INTO DMKH (MaKH, TenKH, DiaChi, Email, DienThoai, MaSoThue) 
VALUES ('KH009', 'CÔNG TY CỔ PHẦN THƯƠNG MẠI VÀ PHÁT TRIỂN NGÔI NHÀ XANH', 'Số nhà 302 đường Cổ Loa, Xóm Thượng, Xã Cổ Loa, Huyện Đông Anh, Thành phố Hà Nội, Việt Nam', '', '', '0108802739');

INSERT INTO DMKH (MaKH, TenKH, DiaChi, Email, DienThoai, MaSoThue) 
VALUES ('KH010', 'CÔNG TY TNHH MỘT THÀNH VIÊN SẢN XUẤT VÀ THƯƠNG MẠI XUÂN TRƯỜNG KM', 'Thôn Ngoại, Xã Minh Hòa, Thị xã Kinh Môn, Tỉnh Hải Dương, Việt Nam', '', '', '0801225372');

INSERT INTO DMKH (MaKH, TenKH, DiaChi, Email, DienThoai, MaSoThue) 
VALUES ('NCC001', 'CÔNG TY CỔ PHẦN THƯƠNG MẠI MÁY TÍNH AN PHÁT', 'Tầng 5, Số 49 phố Thái Hà, Phường Trung Liệt, Quận Đống Đa, Thành phố Hà Nội, Việt Nam', '', '', '0108940873');

INSERT INTO DMKH (MaKH, TenKH, DiaChi, Email, DienThoai, MaSoThue) 
VALUES ('NCC002', 'CÔNG TY TNHH HÀ NỘI COMPUTER', 'Số 145 Đường 70, Xã Tân Triều, Huyện Thanh Trì, Thành phố Hà Nội, Việt Nam', '', '', '0110473961');

INSERT INTO DMKH (MaKH, TenKH, DiaChi, Email, DienThoai, MaSoThue) 
VALUES ('NCC003', 'CÔNG TY CỔ PHẦN THƯƠNG MẠI MÁY TÍNH AN PHÁT', 'Tầng 5, Số 49 phố Thái Hà, Phường Trung Liệt, Quận Đống Đa, Thành phố Hà Nội, Việt Nam', '', '', '0108940873');

INSERT INTO DMKH (MaKH, TenKH, DiaChi, Email, DienThoai, MaSoThue) 
VALUES ('NCC004', 'CÔNG TY TNHH KỸ NGHỆ PHÚC ANH', 'Số 152-154 đường Trần Duy Hưng, tổ 12, Phường Trung Hoà, Quận Cầu Giấy, Hà Nội', '', '', '0105767941');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('111', 'Tiền mặt', 1, ' ');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('1111', 'Tiền mặt Việt Nam', 2, '111 ');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('1112', 'Ngoại tệ', 2, '1121');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('1113', 'Vàng tiền tệ', 2, '1123 ');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('112', 'Tiền gửi ngân hàng', 1, '211 ');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('1121', 'Tiền Việt Nam', 2, '112 ');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('1122', 'Ngoại tệ', 2, '112 ');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('1123', 'Vàng tiền tệ', 2, '112 ');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('113', 'Tiền đang chuyển', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('131', 'Phải thu của khách hàng', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('1311', 'Phải thu ngắn hạn của khách hàng', 2, '131 ');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('1312', 'Phải thu dài hạn của khách hàng', 2, '131 ');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('133', 'Thuế GTGT được khấu trừ', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('1331', 'Thuế GTGT được khấu trừ của hàng hóa, dịch vụ', 2, '133 ');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('1332', 'Thuế GTGT được khấu trừ của TSCĐ', 2, '133 ');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('136', 'Phải thu nội bộ', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('1361', 'Vốn kinh doanh ở các đơn vị trực thuộc', 2, '136 ');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('1362', 'Phải thu nội bộ về chênh lệch tỷ giá', 2, '136 ');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('1363', 'Phải thu nội bộ về CP đi vay đủ đk được vốn hóa', 2, '136 ');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('1368', 'Phải thu nội bộ khác', 2, '136 ');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('138', 'Phải thu khác', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('1381', 'Tài sản thiếu chờ xử lý', 2, '138 ');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('1385', 'Phải thu về cổ phần hóa', 2, '138 ');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('1388', 'Phải thu khác', 2, '138 ');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('141', 'Tạm ứng', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('151', 'Hàng mua đang đi đường', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('152', 'Nguyên liệu, vật liệu', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('153', 'Công cụ, dụng cụ', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('1531', 'Công cụ, dụng cụ', 2, '153 ');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('1532', 'Bao bì luân chuyển', 2, '153 ');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('1533', 'Đồ dùng cho thuê', 2, '153 ');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('1534', 'Thiết bị, phụ tùng thay thế', 2, '153 ');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('154', 'Chi phí sản xuất, kinh doanh dở dang', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('155', 'Thành phẩm', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('1551', 'Thành phẩm nhập kho', 2, '155 ');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('1557', 'Thành phẩm bất động sản', 2, '155 ');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('156', 'Hàng hóa', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('1561', 'Giá mua hàng hóa', 2, '156 ');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('1562', 'Chi phí thu mua hàng hóa', 2, '156 ');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('1567', 'Hàng hóa bất động sản', 2, '156 ');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('157', 'Hàng gửi bán', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('161', 'Chi sự nghiệp', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('1611', 'Chi sự nghiệp năm trước', 2, '161 ');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('1612', 'Chi sự nghiệp năm nay', 2, '161 ');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('171', 'Giao dịch mua bán lại trái phiếu chính phủ', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('211', 'Tài sản cố định hữu hình', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('212', 'Tài sản cố định thuê tài chính', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('213', 'Tài sản cố định vô hình', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('214', 'Hao mòn TSCĐ', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('242', 'Chi phí trả trước', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('244', 'Cầm cố, thế chấp, ký quỹ, ký cược', 1, '');
INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('331', 'Phải trả cho người bán', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('333', 'Thuế và các khoản phải nộp Nhà nước', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('3331', 'Thuế giá trị gia tăng phải nộp', 2, '333');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('33311', 'Thuế GTGT đầu ra', 3, '3331');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('33312', 'Thuế GTGT hàng nhập khẩu', 3, '3331');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('3332', 'Thuế tiêu thụ đặc biệt', 2, '333');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('3333', 'Thuế xuất, nhập khẩu', 2, '333');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('3334', 'Thuế thu nhập doanh nghiệp', 2, '333');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('3335', 'Thuế thu nhập cá nhân', 2, '333');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('3336', 'Thuế tài nguyên', 2, '333');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('3337', 'Thuế nhà đất, tiền thuê đất', 2, '333');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('3338', 'Thuế bảo vệ môi trường và các loại thuế khác', 2, '333');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('3339', 'Phí, lệ phí và các khoản phải nộp khác', 2, '333');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('334', 'Phải trả người lao động', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('335', 'Chi phí phải trả', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('336', 'Phải trả nội bộ', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('338', 'Phải trả phải nộp khác', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('3381', 'Tài sản thừa chờ giải quyết', 2, '338');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('3382', 'Kinh phí công đoàn', 2, '338');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('3383', 'Bảo hiểm xã hội', 2, '338');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('3384', 'Bảo hiểm y tế', 2, '338');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('3385', 'Phải trả về cổ phần hóa', 2, '338');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('3386', 'Bảo hiểm thất nghiệp', 2, '338');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('3387', 'Doanh thu chưa thực hiện', 2, '338');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('3388', 'Phải trả, phải nộp khác', 2, '338');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('341', 'Vay và nợ thuê tài chính', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('343', 'Trái phiếu phát hành', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('344', 'Nhận ký quỹ, ký cược', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('347', 'Thuế thu nhập hoãn lại phải trả', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('352', 'Dự phòng phải trả', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('353', 'Quỹ khen thưởng phúc lợi', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('3531', 'Quỹ khen thưởng', 2, '353');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('3532', 'Quỹ phúc lợi', 2, '353');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('3533', 'Quỹ phúc lợi đã hình thành TSCĐ', 2, '353');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('3534', 'Quỹ thưởng ban quản lý điều hành công ty', 2, '353');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('411', 'Vốn đầu tư của chủ sở hữu', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('413', 'Chênh lệch tỷ giá hối đoái', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('414', 'Quỹ đầu tư phát triển', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('419', 'Cổ phiếu quỹ', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('421', 'Lợi nhuận sau thuế chưa phân phối', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('511', 'Doanh thu bán hàng và cung cấp dịch vụ', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('515', 'Doanh thu hoạt động tài chính', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('521', 'Các khoản giảm trừ doanh thu', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('5211', 'Chiết khấu thương mại', 2, '521');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('5212', 'Giảm giá hàng bán', 2, '521');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('5213', 'Hàng bán bị trả lại', 2, '521');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('532', 'Giảm giá hàng bán', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('611', 'Mua hàng', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('621', 'Chi phí nguyên liệu, vật liệu trực tiếp', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('622', 'Chi phí nhân công trực tiếp', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('623', 'Chi phí sử dụng máy thi công', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('627', 'Chi phí sản xuất chung', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('631', 'Giá thành sản xuất', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('632', 'Giá vốn hàng bán', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('635', 'Chi phí tài chính', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('641', 'Chi phí bán hàng', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('642', 'Chi phí quản lý doanh nghiệp', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('711', 'Thu nhập khác', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('811', 'Chi phí khác', 1, '');

INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES ('821', 'Chi phí thuế thu nhập doanh nghiệp', 1, '');
INSERT INTO GiayBao (SoCT, NgayCT, MaKH, NguoiGD, LyDo, MaCT, SoTKNHDi, SoTKNHDen) VALUES 
('BC001',   '2024-04-06', 'KH005', '', 'Thanh toán dịch vụ đào tạp pmkt tháng 4', 'BC', NULL, NULL),
('BC002',   '2024-03-09', 'KH009', '', 'Thanh toán phí khóa học PMKT đợt 2', 'BC', NULL, NULL),
('BC003',   '2024-04-09', 'KH007', '', 'Thanh toán đào tạo PMKT lần 3', 'BC', NULL, NULL),
('BC004',   '2024-04-06', 'KH005', '', 'Thanh toán khóa học pmkt đợt 1', 'BC', NULL, NULL),
('BC005',   '2024-04-20', 'KH010', '', 'Thanh toán tiền TOKEN và CAMERA', 'BC', NULL, NULL),
('BN001',   '2024-03-10', 'NCC001', 'Đỗ Thị Yến', 'Chuyển trước tiền mua linh kiện máy tính', 'BN', NULL, NULL),
('BN002',   '2024-03-10', 'NCC003', 'Vũ Viết Cương', 'Trả tiền điện thoại bàn', 'BN', NULL, NULL),
('BN003',   '2024-04-07', 'NCC004', 'Lê Văn Vũ', 'Mua ghế văn phòng', 'BN', NULL, NULL),
('BN004',   '2024-02-03', 'NCC001', 'Trần Thùy Dương', 'Trả tiền bàn phím', 'BN', NULL, NULL),
('BN005',   '2024-01-29', 'NCC002', 'Trần Văn Năm', 'Thanh toán thiết bị văn phòng', 'BN', NULL, NULL);

INSERT INTO HDHH (SoCT, NgayCT, MaKH, TKNoThanhToan, TKCoDoanhThu, TKCoThue, HanTT, TienThanhToan, TienDoanhThu, ThueSuat, TienThue, HTTT, TienCK, TyLeCK, TKChietKhau, DienGiai, MaCT) VALUES
('HD001',   '2024-02-01 01:32:00', 'KH009', '131', '156', '', 30, 20000000, 20000000, 0, 0, '', 0, 0, '', 'Khóa đào tạo tập trung AMIS KT cho công ty NGÔI NH', 'HD'),
('HD002',   '2024-02-05 01:33:26', 'KH004', '131', '156', '', 60, 9000000, 9000000, 0, 0, '', 0, 0, '', 'Khóa học phần mềm AMIS KT online cho CÔNG TY TRÁCH', 'HD'),
('HD003',   '2024-03-21 01:44:45', 'KH001', '131', '156', '', 30, 13690000, 13690000, 0, 0, '', 0, 0, '', 'Máy tính bảng, máy tính tiền CÔNG TY TNHH DỊCH VỤ', 'HD'),
('HD004',   '2024-03-25 01:42:21', 'KH005', '131', '156', '', 90, 31300000, 31300000, 0, 0, '', 0, 0, '', 'Khóa đào tạo phần mềm AMIS KT 1-1, máy chấm công c', 'HD'),
('HD005',   '2024-04-02 01:47:01', 'KH010', '131', '156', '', 20, 12690000, 12690000, 0, 0, '', 0, 0, '', 'Khóa đào tạo tập trung MISA SME (trên 10 người) ch', 'HD'),
('HD006',   '2024-04-24 01:26:45', 'KH006', '131', '156', '', 10, 18300000, 18300000, 8, 0, '', 0, 2, '', 'Máy tính tiền, camera cho CÔNG TY CỔ PHẦN DƯỢC MỸ', 'HD');

INSERT INTO HoaDonMuaHang (SoCT, NgayCT, MaKH, TKNoHang, TKNoThue, TKCoThanhToan, HanTT, TienThanhToan, TienHang, ThueSuat, TienThue, HTTT, TienCK, TyLeCK, TKChietKhau, DienGiai, MaCT) VALUES
('MH001',   '2024-04-14 00:00:00', 'NCC003', '642', '1331', '331', 10 ,28000000,  28000000, 0, 0, '', 0, 0, '', 'Mua nội thất cho phòng họp số 3', 'MH'),
('MH002',   '2024-03-02 00:00:00', 'NCC004', '642', '1331', '331',  30 ,2300000, 2300000, 0, 0, '', 0, 0, '', 'Dọn vệ sinh định kỳ', 'MH'),
('MH003',   '2024-04-03 00:00:00', 'NCC001', '642', '1331', '331', 20 ,  750000, 750000, 0, 0, '', 0, 0, '', 'Mua văn phòng phẩm tháng 4', 'MH'),
('TL001',   '2024-05-25 00:00:00', 'NCC002', '153', '133', '111', 0, 0 , 0, 0, 0, '', 0, 0, '', '', 'TL');
INSERT INTO NganHang (MaNH, TenNH) VALUES
('AGB', 'Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam'),
('BIDV', 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam'),
('VB', 'Ngân hàng Thương mại cổ phần Công Thương Việt Nam'),
('VCB', 'Ngân hàng Thương mại cổ phần Ngoại thương Việt Nam');

INSERT INTO NguoiDung (TenDN, MatKhau, TenNguoiDung, Quyen) VALUES
('1', '1', '1', 1),
('2', '2', '2', 1),
('thuynp', '123', 'Nguyễn Phương Thúy', 1);

INSERT INTO NoDauKy (Id, MaTK, MaKH, DuNo, DuCo) VALUES
(1, '131', 'KH009', 4000000, 0),
(2, '331', 'NCC001', 0, 12000000),
(3, '131', 'KH002', 20000000, 0),
(5, '131', 'KH004', 17000000, 0),
(6, '131', 'KH005', 11000000, 0),
(7, '131', 'KH008', 2100000, 0),
(8, '131', 'KH007', 19550000, 0),
(10, '131', 'KH009', 12500000, 0),
(11, '131', 'KH010', 50000000, 0),
(12, '331', 'NCC002', 0, 10000000),
(13, '331', 'NCC003', 0, 15000000),
(14, '331', 'NCC001', 0, 23000000),
(15, '331', 'NCC003', 0, 35000000),
(16, '131', 'KH006', 0, 6000000);

INSERT INTO PhieuKT (SoCT, NgayCT, MaKH, LyDo, CTLQ, MaCT) VALUES
('KT001', '2024-02-06', 'KH004', 'Xóa nợ cho công ty Hung Tech', '', 'KT'),
('KT002', '2024-04-10', 'KH009', 'Bù trừ công nợ Công ty Ngôi nhà Xanh', 'Biên bản bù trừ công nợ', 'KT'),
('KT003', '2024-03-12', 'KH010', 'Giảm giá hàng bán cho cty XUÂN TRƯỜNG KM', '', 'KT'),
('KT004', '2024-04-15', 'KH006', 'Chuyển trước tiền mua hàng cho CÔNG TY CỔ PHẦN DƯỢC MỸ PHẨM SANCHA', '', 'KT');

INSERT INTO PhieuTC (SoCT, NgayCT, MaKH, NguoiGD, LyDo, MaCT) VALUES
('PC001', '2024-03-18 04:28:02', 'NCC001', '', 'Chi tiền mua thiết bị văn phòng', 'PC'),
('PC002', '2024-05-17 04:30:17', 'NCC003', '', 'Trả tiền mua màn hình máy tính cho CÔNG TY CỔ PHẦN THƯƠNG MẠI MÁY TÍNH AN PHÁT', 'PC'),
('PC003', '2024-04-25 04:31:20', 'NCC004', '', 'Trả tiền thuốc diệt muỗi văn phòng cho CÔNG TY TNHH KỸ NGHỆ PHÚC ANH', 'PC'),
('PT001', '2024-03-05 01:23:49', 'KH009', '', 'Thu tiền khóa học pm của CÔNG TY CỔ PHẦN THƯƠNG MẠI VÀ PHÁT TRIỂN NGÔI NHÀ XANH', 'PT'),
('PT002', '2024-03-20 01:28:03', 'KH006', '', 'Thanh toán tiền Camera cho công ty ÔNG TY CỔ PHẦN DƯỢC MỸ PHẨM SANCHA', 'PT'),
('PT003', '2024-04-02 04:24:24', 'KH010', '', 'Thu tiền đào tạo phần mềm của công ty XUÂN TRƯỜNG KM', 'PT'),
('PT004', '2024-04-27 04:25:42', 'KH002', '', 'Thu tiền Token của CÔNG TY TNHH THIẾT BỊ THÔNG MINH SSEHOME', 'PT');

INSERT INTO SanPham (MaSanPham, TenSanPham) VALUES
('SP001', 'SP sdoos 1'),
('SP002', 'Sản phaamnr số 2');

INSERT INTO SoDuDauKy (MaTK, DuNo, DuCo) VALUES
('131', 161200000, 0),
('331', 0, 118000000);
