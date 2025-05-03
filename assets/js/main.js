const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const db = new sqlite3.Database('./kt.db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'assets')));

// Route GET giao diện login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
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

// Khởi động server
app.listen(3000, () => {
    console.log('Server chạy tại http://localhost:3000');
});


/*  PHẦN NỘI DUNG KHÔI PHỤC MẬT KHẨU   */

/* =========================================== */
/* =========================================== */
//  function validate() {
//      var email = document.getElementById("email").value;
//     if (email == null || email == "") {
//        swal("Bạn Chưa Nhập Email", "Vui Lòng Kiểm Tra", "warning");
//        return false;
//    }
//}
function RegexEmail(emailInputBox) {
    var emailStr = document.getElementById(emailInputBox).value;
    var emailRegexStr = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var isvalid = emailRegexStr.test(emailStr);
    if (!isvalid) {
        swal({
            title: "",
            text: "Bạn vui lòng nhập đúng định dạng email...",
            icon: "error",
            close: true,
            button: "Thử lại",
          });
        
        emailInputBox.focus;
    } else {
        swal({
            title: "",
            text: "Chúng tôi vừa gửi cho bạn email hướng dẫn đặt lại mật khẩu vào địa chỉ cho bạn",
            icon: "success",
            close: true,
            button: "Đóng",
          });
        emailInputBox.focus;
        window.location = "#";

    }
}