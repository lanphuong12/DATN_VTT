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

// BẢNG HÓA ĐƠN GIÁ TRỊ GIA TĂNG (HDHH) - HDGTGT
// API: Lấy danh sách dữ liệu bảng HDHH
app.get('/api/hdgtgt', (req, res) => {
    db.all("SELECT * FROM HDHH", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// // API: Lấy 1 dòng theo socthdgtgt
// app.get('/api/hdgtgt/:socthdgtgt', (req, res) => {
//     db.get("SELECT * FROM HDHH WHERE SoCT = ?", [req.params.socthdgtgt], (err, row) => {
//         if (err) return res.status(500).json({ error: err.message });
//         if (!row) return res.status(404).json({ error: "Không tìm thấy hóa đơn." });
//         res.json(row);
//     });
// });

// API: Lấy chi tiết hóa đơn theo SoCT kèm thông tin hàng hóa từ DMHH
app.get('/api/hdgtgt/:socthdgtgt', (req, res) => {
    const soCT = req.params.socthdgtgt;

    // Lấy thông tin hóa đơn
    db.get("SELECT * FROM HDHH WHERE SoCT = ?", [soCT], (err, hoadon) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!hoadon) return res.status(404).json({ error: "Không tìm thấy hóa đơn." });

        // Lấy chi tiết hóa đơn có JOIN với bảng DMHH để lấy tên hàng hóa và đơn vị tính
        const queryCT = `
            SELECT 
                cth.*, 
                dmhh.TenHH, 
                dmhh.DVT 
            FROM 
                CTHoaDon cth
            JOIN 
                DMHH dmhh ON cth.MaHH = dmhh.MaHH
            WHERE 
                cth.SoCT = ?
        `;

        db.all(queryCT, [soCT], (err, cthoadon) => {
            if (err) return res.status(500).json({ error: err.message });

            // Lấy thông tin khách hàng
            db.get("SELECT * FROM DMKH WHERE MaKH = ?", [hoadon.MaKH], (err, khachhang) => {
                if (err) return res.status(500).json({ error: err.message });

                res.json({ hoadon, cthoadon, khachhang });
            });
        });
    });
});

// BẢNG PHIẾU KẾ TOÁN - PKT
// API: Lấy danh sách dữ liệu bảng PKT
app.get('/api/pkt', (req, res) => {
    db.all("SELECT * FROM PhieuKT", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.get('/api/pkt/:soct', (req, res) => {
    const soct = req.params.soct;
    const sql = `
SELECT 
        p.SoCT AS SoCTPhieu,
        p.NgayCT,
        p.MaKH,
        kh.TenKH,
        kh.DiaChi,
        kh.DienThoai,
        kh.MaSoThue,
        p.LyDo,
        p.CTLQ,
        p.MaCT,
        ct.Id,
        ct.TKNo,
        ct.TKCo,
        ct.NoiDung,
        ct.SoTien
    FROM PhieuKT p
    JOIN CTPhieu ct ON p.SoCT = ct.SoCT
    JOIN DMKH kh ON p.MaKH = kh.MaKH
    WHERE p.SoCT = ?;

    `;
    db.all(sql, [soct], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy phiếu với số chứng từ này.' });
        }
        res.json(rows);
    });
});


// BẢNG HÓA ĐƠN MUA HÀNG - HDMH
// API: Lấy danh sách dữ liệu bảng HDMH
app.get('/api/hdmh', (req, res) => {
    db.all("SELECT * FROM HoaDonMuaHang", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});
  
app.get('/api/socaiphaithu', (req, res) => {
    const { start, end, matk } = req.query;
  
    if (!start || !end || matk !== '131') {
      return res.status(400).json({ error: "Thiếu tham số hoặc mã tài khoản không hợp lệ." });
    }
  
    // 1. Lấy số dư đầu kỳ
    const sql1 = `SELECT * FROM SoDuDauKy WHERE MaTK = ?`;
    db.get(sql1, [matk], (err1, sodu) => {
      if (err1) return res.status(500).json({ error: err1.message });
  
      // 2. Lấy danh sách giấy báo từ GiayBao có SoCT bắt đầu bằng 'BN'
      const sql2 = `
        SELECT * FROM GiayBao 
        WHERE SoCT LIKE 'BC%' 
          AND NgayCT BETWEEN ? AND ?
      `;
      db.all(sql2, [start, end], (err2, giaybao) => {
        if (err2) return res.status(500).json({ error: err2.message });
  
        const socts = giaybao.map(row => row.SoCT);
        if (socts.length === 0) {
          return res.json({ sodudauky: sodu, giaybao: [], ctphieu: [] });
        }
  
        // 3. Lấy chi tiết phiếu từ CTPhieu có TKCo = '131' và SoCT nằm trong danh sách
        const placeholders = socts.map(() => '?').join(',');
        const sql3 = `
          SELECT * FROM CTPhieu 
          WHERE SoCT IN (${placeholders}) 
            AND TKCo = '131'
        `;
        db.all(sql3, socts, (err3, ctphieu) => {
          if (err3) return res.status(500).json({ error: err3.message });
  
          res.json({
            sodudauky: sodu,
            giaybao: giaybao,
            ctphieu: ctphieu
          });
        });
      });
    });
  });

  app.get('/api/socaiphaitra', (req, res) => {
    const { start, end, matk } = req.query;
  
    if (!start || !end || matk !== '331') {
      return res.status(400).json({ error: "Thiếu tham số hoặc mã tài khoản không hợp lệ." });
    }
  
    // 1. Lấy số dư đầu kỳ
    const sql1 = `SELECT * FROM SoDuDauKy WHERE MaTK = ?`;
    db.get(sql1, [matk], (err1, sodu) => {
      if (err1) return res.status(500).json({ error: err1.message });

      console.log(sodu); // Kiểm tra số dư đầu kỳ
      // 2. Lấy danh sách giấy báo từ GiayBao có SoCT bắt đầu bằng 'BN'
      const sql2 = `
        SELECT * FROM GiayBao 
        WHERE SoCT LIKE 'BN%' 
          AND NgayCT BETWEEN ? AND ?
      `;
      db.all(sql2, [start, end], (err2, giaybao) => {
        if (err2) return res.status(500).json({ error: err2.message });

        console.log(giaybao); // Kiểm tra danh sách giấy báo
        const socts = giaybao.map(row => row.SoCT);
        if (socts.length === 0) {
          return res.json({ sodudauky: sodu, giaybao: [], ctphieu: [] });
        }
  
        // 3. Lấy chi tiết phiếu từ CTPhieu có TKNo = '331' và SoCT nằm trong danh sách
        const placeholders = socts.map(() => '?').join(',');
        const sql3 = `
          SELECT * FROM CTPhieu 
          WHERE SoCT IN (${placeholders}) 
            AND TKNo = '331'
        `;
        db.all(sql3, socts, (err3, ctphieu) => {
          if (err3) return res.status(500).json({ error: err3.message });

          console.log(ctphieu); // Kiểm tra chi tiết phiếu
          res.json({
            sodudauky: sodu,
            giaybao: giaybao,
            ctphieu: ctphieu
          });
        });
      });
    });
  });

  app.get('/api/sochitietphaithu', (req, res) => {
    const { start, end, matk } = req.query;
  
    if (!start || !end || matk !== '131') {
      return res.status(400).json({ error: "Thiếu tham số hoặc mã tài khoản không hợp lệ." });
    }
  
    // 1. Lấy số dư đầu kỳ
    const sql1 = `SELECT * FROM SoDuDauKy WHERE MaTK = ?`;
    db.get(sql1, [matk], (err1, sodu) => {
      if (err1) return res.status(500).json({ error: err1.message });
  
      // 2. Lấy danh sách giấy báo từ PhieuTC có SoCT bắt đầu bằng 'PT'
      const sql2 = `
        SELECT * FROM PhieuTC 
        WHERE SoCT LIKE 'PT%' 
          AND NgayCT BETWEEN ? AND ?
      `;
      db.all(sql2, [start, end], (err2, phieutc) => {
        if (err2) return res.status(500).json({ error: err2.message });
  
        const socts = phieutc.map(row => row.SoCT);
        if (socts.length === 0) {
          return res.json({ sodudauky: sodu, phieutc: [], ctphieu: [] });
        }
  
        // 3. Lấy chi tiết phiếu từ CTPhieu có TKCo = '131' và SoCT nằm trong danh sách
        const placeholders = socts.map(() => '?').join(',');
        const sql3 = `
          SELECT * FROM CTPhieu 
          WHERE SoCT IN (${placeholders}) 
            AND TKCo = '131'
        `;
        db.all(sql3, socts, (err3, ctphieu) => {
          if (err3) return res.status(500).json({ error: err3.message });
  
          res.json({
            sodudauky: sodu,
            phieutc: phieutc,
            ctphieu: ctphieu
          });
        });
      });
    });
  });

  app.get('/api/sochitietphaitra', (req, res) => {
    const { start, end, matk } = req.query;
  
    if (!start || !end || matk !== '331') {
      return res.status(400).json({ error: "Thiếu tham số hoặc mã tài khoản không hợp lệ." });
    }
  
    // 1. Lấy số dư đầu kỳ
    const sql1 = `SELECT * FROM SoDuDauKy WHERE MaTK = ?`;
    db.get(sql1, [matk], (err1, sodu) => {
      if (err1) return res.status(500).json({ error: err1.message });

      console.log(sodu); // Kiểm tra số dư đầu kỳ
      // 2. Lấy danh sách giấy báo từ PhieuTC có SoCT bắt đầu bằng 'PC'
      const sql2 = `
        SELECT * FROM PhieuTC 
        WHERE SoCT LIKE 'PC%' 
          AND NgayCT BETWEEN ? AND ?
      `;
      db.all(sql2, [start, end], (err2, phieutc) => {
        if (err2) return res.status(500).json({ error: err2.message });

        console.log(phieutc); // Kiểm tra danh sách giấy báo
        const socts = phieutc.map(row => row.SoCT);
        if (socts.length === 0) {
          return res.json({ sodudauky: sodu, phieutc: [], ctphieu: [] });
        }
  
        // 3. Lấy chi tiết phiếu từ CTPhieu có TKNo = '331' và SoCT nằm trong danh sách
        const placeholders = socts.map(() => '?').join(',');
        const sql3 = `
          SELECT * FROM CTPhieu 
          WHERE SoCT IN (${placeholders}) 
            AND TKNo = '331'
        `;
        db.all(sql3, socts, (err3, ctphieu) => {
          if (err3) return res.status(500).json({ error: err3.message });

          console.log(ctphieu); // Kiểm tra chi tiết phiếu
          res.json({
            sodudauky: sodu,
            phieutc: phieutc,
            ctphieu: ctphieu
          });
        });
      });
    });
  });
  
// Khởi động server
app.listen(3000, () => {
    console.log('Server chạy tại http://localhost:3000');
});
