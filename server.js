const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const db = new sqlite3.Database('./kt.db');

// Cấu hình để Express có thể xử lý dữ liệu từ form
app.use(express.json()); // Xử lý dữ liệu dạng JSON
app.use(express.urlencoded({ extended: true })); // Xử lý dữ liệu từ form HTML

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'assets')));

// Route GET giao diện login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'assets', 'index.html'));
});

// Route xử lý đăng nhập
app.post('/login', (req, res) => {
  const { TenDN, MatKhau } = req.body;

  db.get("SELECT * FROM NguoiDung WHERE TenDN = ? AND MatKhau = ?", [TenDN, MatKhau], (err, row) => {
      if (err) {
          console.error(err);
          return res.status(500).send("Lỗi máy chủ.");
      }

      if (row) {
          // Chuyển hướng sang home.html nếu đăng nhập thành công
          res.redirect('/home.html');
      } else {
          // Sai tài khoản hoặc mật khẩu
          res.send(`
              <script>
                  alert("Tên đăng nhập hoặc mật khẩu không đúng!");
                  window.location.href = "/";
              </script>
          `);
      }
  });
});
// BẢNG DMTK
// API: Lấy danh sách DMTK
app.get('/api/dmtk', (req, res) => {
    db.all("SELECT * FROM DMTK", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// API: Lấy 1 dòng theo MaTK
app.get('/api/dmtk/:matk', (req, res) => {
    db.get("SELECT * FROM DMTK WHERE MaTK = ?", [req.params.matk], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Không tìm thấy tài khoản." });
        res.json(row);
    });
});

// API: Thêm mới DMTK
app.post('/api/dmtk', (req, res) => {
    // Kiểm tra dữ liệu gửi lên
    console.log(req.body); // Kiểm tra dữ liệu gửi từ client

    const { MaTK, TenTK, CapTK, TKCapTren } = req.body;

    if (!MaTK || !TenTK || CapTK === undefined) {
        return res.status(400).send('Thiếu dữ liệu');
    }

    const sql = `INSERT INTO DMTK (MaTK, TenTK, CapTK, TKCapTren) VALUES (?, ?, ?, ?)`;
    db.run(sql, [MaTK, TenTK, CapTK, TKCapTren || null], function (err) {
        if (err) {
            console.error("Lỗi thêm mới:", err.message);
            return res.status(500).send(err.message);
        }
        res.json({ success: true, id: this.lastID });
    });
});



// API sửa
app.put('/api/dmtk/:matk', (req, res) => {
    const { TenTK, CapTK, TKCapTren } = req.body; // Khớp tên với các tham số trong frontend
    const matk = req.params.matk;

    // Cập nhật thông tin trong cơ sở dữ liệu
    db.run("UPDATE DMTK SET TenTK = ?, CapTK = ?, TKCapTren = ? WHERE MaTK = ?",
        [TenTK, CapTK, TKCapTren, matk], err => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ success: true });
        });
});


// API xóa
app.delete('/api/dmtk/:matk', (req, res) => {
    db.run("DELETE FROM DMTK WHERE MaTK = ?", [req.params.matk], err => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// BẢNG NGÂN HÀNG
// API: Lấy danh sách dữ liệu bảng ngân hàng
app.get('/api/nganhang', (req, res) => {
    db.all("SELECT * FROM NganHang", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// API: Lấy 1 dòng theo MaNH
app.get('/api/nganhang/:manh', (req, res) => {
    db.get("SELECT * FROM NganHang WHERE MaNH = ?", [req.params.matk], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Không tìm thấy ngân hàng." });
        res.json(row);
    });
});

// API: Thêm mới dữ liệu bảng ngân hàng
app.post('/api/nganhang', (req, res) => {
    // Kiểm tra dữ liệu gửi lên
    console.log(req.body); // Kiểm tra dữ liệu gửi từ client

    const { MaNH, TenNH } = req.body;

    if (!MaNH || !TenNH === undefined) {
        return res.status(400).send('Thiếu dữ liệu');
    }

    const sql = `INSERT INTO NganHang (MaNH, TenNH) VALUES (?, ?)`;
    db.run(sql, [MaNH, TenNH || null], function (err) {
        if (err) {
            console.error("Lỗi thêm mới:", err.message);
            return res.status(500).send(err.message);
        }
        res.json({ success: true, id: this.lastID });
    });
});



// API sửa dữ liệu ngân hàngs
app.put('/api/nganhang/:manh', (req, res) => {
    const { TenNH } = req.body; // Khớp tên với các tham số trong frontend
    const manh = req.params.manh;

    // Cập nhật thông tin trong cơ sở dữ liệu
    db.run("UPDATE NganHang SET TenNH = ? WHERE MaNH = ?",
        [TenNH, manh], err => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ success: true });
        });
});


// API xóa dữ liệu bảng ngân hàng
app.delete('/api/nganhang/:manh', (req, res) => {
    db.run("DELETE FROM NganHang WHERE MaNH = ?", [req.params.manh], err => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// BẢNG TÀI KHOẢN NGÂN HÀNG
// API: Lấy danh sách dữ liệu bảng tài khoản ngân hàng
app.get('/api/tknganhang', (req, res) => {
    db.all("SELECT * FROM TaiKhoanNH", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// API: Lấy 1 dòng theo sotknh
app.get('/api/tknganhang/:sotknh', (req, res) => {
    db.get("SELECT * FROM TaiKhoanNH WHERE SoTKNH = ?", [req.params.sotknh], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Không tìm thấy tài khoản ngân hàng." });
        res.json(row);
    });
});

// API: Thêm mới dữ liệu bảng tk ngân hàng
app.post('/api/tknganhang', (req, res) => {
    // Kiểm tra dữ liệu gửi lên
    console.log(req.body); // Kiểm tra dữ liệu gửi từ client

    const { SoTKNH, ChuTaiKhoan, ChiNhanh, MaNH } = req.body;

    if (!SoTKNH || !ChuTaiKhoan || !ChiNhanh || !MaNH === undefined) {
        return res.status(400).send('Thiếu dữ liệu');
    }

    const sql = `INSERT INTO TaiKhoanNH (SoTKNH, ChuTaiKhoan, ChiNhanh, MaNH) VALUES (?, ?, ?, ?)`;
    db.run(sql, [SoTKNH, ChuTaiKhoan,  ChiNhanh, MaNH|| null], function (err) {
        if (err) {
            console.error("Lỗi thêm mới:", err.message);
            return res.status(500).send(err.message);
        }
        res.json({ success: true, id: this.lastID });
    });
});



// API sửa dữ liệu tài khoản ngân hàng
app.put('/api/tknganhang/:sotknh', (req, res) => {
    const { ChuTaiKhoan, ChiNhanh, MaNH } = req.body; // Khớp tên với các tham số trong frontend
    const sotknh = req.params.sotknh;

    // Cập nhật thông tin trong cơ sở dữ liệu
    db.run("UPDATE TaiKhoanNH SET ChuTaiKhoan = ?, ChiNhanh = ?, MaNH = ? WHERE SoTKNH = ?",
        [ChuTaiKhoan, ChiNhanh, MaNH, sotknh], err => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ success: true });
        });
});

// API sửa
app.put('/api/dmtk/:matk', (req, res) => {
    const { TenTK, CapTK, TKCapTren } = req.body; // Khớp tên với các tham số trong frontend
    const matk = req.params.matk;

    // Cập nhật thông tin trong cơ sở dữ liệu
    db.run("UPDATE DMTK SET TenTK = ?, CapTK = ?, TKCapTren = ? WHERE MaTK = ?",
        [TenTK, CapTK, TKCapTren, matk], err => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ success: true });
        });
});

// BẢNG TÀI KHOẢN NGÂN HÀNG
// API: Lấy danh sách dữ liệu bảng tài khoản ngân hàng
app.get('/api/tknganhang', (req, res) => {
    db.all("SELECT * FROM TaiKhoanNH", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// API: Lấy 1 dòng theo sotknh
app.get('/api/tknganhang/:sotknh', (req, res) => {
    db.get("SELECT * FROM TaiKhoanNH WHERE SoTKNH = ?", [req.params.sotknh], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Không tìm thấy tài khoản ngân hàng." });
        res.json(row);
    });
});

// API: Thêm mới dữ liệu bảng tk ngân hàng
app.post('/api/tknganhang', (req, res) => {
    // Kiểm tra dữ liệu gửi lên
    console.log(req.body); // Kiểm tra dữ liệu gửi từ client

    const { SoTKNH, ChuTaiKhoan, ChiNhanh, MaNH } = req.body;

    if (!SoTKNH || !ChuTaiKhoan || !ChiNhanh || !MaNH === undefined) {
        return res.status(400).send('Thiếu dữ liệu');
    }

    const sql = `INSERT INTO TaiKhoanNH (SoTKNH, ChuTaiKhoan, ChiNhanh, MaNH) VALUES (?, ?, ?, ?)`;
    db.run(sql, [SoTKNH, ChuTaiKhoan,  ChiNhanh, MaNH|| null], function (err) {
        if (err) {
            console.error("Lỗi thêm mới:", err.message);
            return res.status(500).send(err.message);
        }
        res.json({ success: true, id: this.lastID });
    });
});



// API sửa dữ liệu tài khoản ngân hàng
app.put('/api/tknganhang/:sotknh', (req, res) => {
    const { ChuTaiKhoan, ChiNhanh, MaNH } = req.body; // Khớp tên với các tham số trong frontend
    const sotknh = req.params.sotknh;

    // Cập nhật thông tin trong cơ sở dữ liệu
    db.run("UPDATE TaiKhoanNH SET ChuTaiKhoan = ?, ChiNhanh = ?, MaNH = ? WHERE SoTKNH = ?",
        [ChuTaiKhoan, ChiNhanh, MaNH, sotknh], err => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ success: true });
        });
});



// API xóa dữ liệu bảng tài khoản ngân hàng
app.delete('/api/tknganhang/:sotknh', (req, res) => {
    db.run("DELETE FROM TaiKhoanNH WHERE SoTKNH = ?", [req.params.sotknh], err => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// BẢNG DANH MỤC HÀNG HÓA - DMHH
// API: Lấy danh sách dữ liệu bảng DMHH
app.get('/api/dmhh', (req, res) => {
    db.all("SELECT * FROM DMHH", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// API: Lấy 1 dòng theo mahh
app.get('/api/dmhh/:mahh', (req, res) => {
    db.get("SELECT * FROM DMHH WHERE MaHH = ?", [req.params.mahh], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Không tìm thấy hàng hóa." });
        res.json(row);
    });
});

// API: Thêm mới dữ liệu bảng danh muc hàng hóa
app.post('/api/dmhh', (req, res) => {
    // Kiểm tra dữ liệu gửi lên
    console.log(req.body); // Kiểm tra dữ liệu gửi từ client

    const { MaHH, TenHH, DVT } = req.body;

    if (!MaHH || !TenHH || !DVT  === undefined) {
        return res.status(400).send('Thiếu dữ liệu');
    }

    const sql = `INSERT INTO DMHH (MaHH, TenHH, DVT) VALUES (?, ?, ?)`;
    db.run(sql, [MaHH, TenHH,  DVT], function (err) {
        if (err) {
            console.error("Lỗi thêm mới:", err.message);
            return res.status(500).send(err.message);
        }
        res.json({ success: true, id: this.lastID });
    });
});



// API sửa dữ liệu danh muc hàng hóa
app.put('/api/dmhh/:mahh', (req, res) => {
    const { TenHH, DVT} = req.body; // Khớp tên với các tham số trong frontend
    const mahh = req.params.mahh;

    // Cập nhật thông tin trong cơ sở dữ liệu
    db.run("UPDATE DMHH SET TenHH = ?, DVT = ? WHERE MaHH = ?",
        [TenHH, DVT, mahh], err => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ success: true });
        });
});



// API xóa dữ liệu bảng danh muc hàng hóa
app.delete('/api/dmhh/:mahh', (req, res) => {
    db.run("DELETE FROM DMHH WHERE MaHH = ?", [req.params.mahh], err => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// BẢNG DANH MỤC KHÁCH HÀNG - DMKH
// API: Lấy danh sách dữ liệu bảng DMKH
app.get('/api/dmkh', (req, res) => {
    db.all("SELECT * FROM DMKH", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// API: Lấy 1 dòng theo makh
app.get('/api/dmkh/:makh', (req, res) => {
    db.get("SELECT * FROM DMKH WHERE MaKH = ?", [req.params.makh], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Không tìm thấy khách hàng." });
        res.json(row);
    });
});

// API: Thêm mới dữ liệu bảng danh muc khách hàng
app.post('/api/dmkh', (req, res) => {
    // Kiểm tra dữ liệu gửi lên
    console.log(req.body); // Kiểm tra dữ liệu gửi từ client

    const { MaKH, TenKH, DiaChi, Email, DienThoai, MaSoThue} = req.body;

    if (!MaKH || !TenKH  === undefined) {
        return res.status(400).send('Thiếu dữ liệu');
    }

    const sql = `INSERT INTO DMKH (MaKH, TenKH, DiaChi, Email, DienThoai, MaSoThue ) VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(sql, [MaKH, TenKH,  DiaChi, Email, DienThoai, MaSoThue], function (err) {
        if (err) {
            console.error("Lỗi thêm mới:", err.message);
            return res.status(500).send(err.message);
        }
        res.json({ success: true, id: this.lastID });
    });
});



// API sửa dữ liệu danh muc khách hàng
app.put('/api/dmkh/:makh', (req, res) => {
    const { TenKH, DiaChi, Email, DienThoai, MaSoThue} = req.body; // Khớp tên với các tham số trong frontend
    const makh = req.params.makh;

    // Cập nhật thông tin trong cơ sở dữ liệu
    db.run("UPDATE DMKH SET TenKH = ?, DiaChi = ?, Email = ?, DienThoai = ?, MaSoThue = ? WHERE MaKH = ?",
        [TenKH, DiaChi, Email, DienThoai, MaSoThue, makh], err => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ success: true });
        });
});



// API xóa dữ liệu bảng danh muc hàng hóa
app.delete('/api/dmkh/:makh', (req, res) => {
    db.run("DELETE FROM DMKH WHERE MaKH = ?", [req.params.makh], err => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

app.get("/congno", (req, res) => {
    const fromDate = req.query.from;
    const toDate = req.query.to;
  
    const query = `
      SELECT
        kh.MaKH AS "Mã KH/NCC",
        kh.TenKH AS "Tên KH/NCC",
        kh.MaSoThue AS "Mã số thuế",
        IFNULL(ndk.DuNo, 0) AS "Nợ đầu kỳ",
        IFNULL(ndk.DuCo, 0) AS "Có đầu kỳ",
        IFNULL(ps_ban.PhatSinhNo, 0) AS "Phát sinh nợ",
        IFNULL(ps_mua.PhatSinhCo, 0) AS "Phát sinh có",
        (IFNULL(ndk.DuNo, 0) + IFNULL(ps_ban.PhatSinhNo, 0)) AS "Nợ cuối kỳ",
        (IFNULL(ndk.DuCo, 0) + IFNULL(ps_mua.PhatSinhCo, 0)) AS "Có cuối kỳ"
      FROM DMKH kh
      LEFT JOIN (
        SELECT MaKH, SUM(DuNo) AS DuNo, SUM(DuCo) AS DuCo
        FROM NoDauKy
        WHERE MaTK = '131'
        GROUP BY MaKH
      ) ndk ON kh.MaKH = ndk.MaKH
      LEFT JOIN (
        SELECT hd.MaKH, SUM(cthd.ThanhTien) AS PhatSinhNo
        FROM HoaDon hd
        JOIN CTHoaDon cthd ON hd.SoCT = cthd.SoCT
        WHERE hd.NgayCT BETWEEN ? AND ? AND hd.MaTK = '131'
        GROUP BY hd.MaKH
      ) ps_ban ON kh.MaKH = ps_ban.MaKH
      LEFT JOIN (
        SELECT MaKH, SUM(TienThanhToan) AS PhatSinhCo
        FROM HoaDonMuaHang
        WHERE NgayCT BETWEEN ? AND ? AND MaTK = '131'
        GROUP BY MaKH
      ) ps_mua ON kh.MaKH = ps_mua.MaKH
      WHERE (IFNULL(ndk.DuNo, 0) + IFNULL(ndk.DuCo, 0) + 
             IFNULL(ps_ban.PhatSinhNo, 0) + IFNULL(ps_mua.PhatSinhCo, 0)) > 0
      ORDER BY kh.MaKH
    `;
  
    db.all(query, [fromDate, toDate, fromDate, toDate], (err, rows) => {
        if (err) {
            console.error("Lỗi SQLite:", err.message);
            return res.status(500).json({ error: err.message });
          };
          
      res.json(rows);
    });
  });

// Khởi động server
app.listen(3000, () => {
    console.log('Server chạy tại http://localhost:3000');
});
