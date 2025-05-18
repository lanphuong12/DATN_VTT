// ================= PHÂN TRANG CHUNG =================
const pageSize = 5;
let currentPageHDGTGT = 1;
let currentPageHDMH = 1;
let currentPagePKT = 1;
let allHDGTGT = [];
let allHDMH = [];
let allPKT = [];

// ================= HÓA ĐƠN GIÁ TRỊ GIA TĂNG =================
function renderPageHDGTGT(page) {
  const start = (page - 1) * pageSize;
  const pageData = allHDGTGT.slice(start, start + pageSize);
  const tbody = $("#HDGTGTTable tbody");
  tbody.empty();

  pageData.forEach((item) => {
    const row = `
      <tr>
        <td><input type="checkbox" value="${item.SoCT}"></td>
        <td>${item.SoCT}</td>
        <td>${item.NgayCT || ""}</td>
        <td>${item.MaKH || ""}</td>
        <td>${item.DienGiai || ""}</td>
        <td>${item.TienThanhToan || ""}</td>
        <td>
            <button class="btn btn-primary btn-sm" onclick="detailHDGTGT('${item.SoCT}')"><i class="fas fa-book"></i></button>
          <button class="btn btn-primary btn-sm" onclick="editHDGTGT('${item.SoCT}')"><i class="fas fa-edit"></i></button>
          <button class="btn btn-danger btn-sm" onclick="deletHDGTGT('${item.SoCT}')"><i class="fas fa-trash-alt"></i></button>
        </td>
      </tr>`;
    tbody.append(row);
  });
}

function renderPaginationHDGTGT() {
  const totalPages = Math.ceil(allHDGTGT.length / pageSize);
  const pagination = $("#paginationHDGTGT");
  pagination.empty();

  for (let i = 1; i <= totalPages; i++) {
    const btn = `<button class="btn btn-sm ${i === currentPageHDGTGT ? 'btn-primary' : 'btn-light'}" onclick="goToPageHDGTGT(${i})">${i}</button>`;
    pagination.append(btn);
  }
}

function goToPageHDGTGT(page) {
    currentPageHDGTGT = page;
  renderPageHDGTGT(page);
  renderPaginationHDGTGT();
}

function loadHDGTGT() {
  $.get("/api/hdgtgt", function (data) {
    if (!Array.isArray(data)) {
      console.error("Dữ liệu trả về không hợp lệ:", data);
      return;
    }
    allHDGTGT = data;
    renderPageHDGTGT(currentPageHDGTGT);
    renderPaginationHDGTGT();
  }).fail(function () {
    alert("Không thể tải dữ liệu hóa đơn giá trị gia tăng.");
  });
}

// function detailHDGTGT(soct) {
//     window.location.href = `form.html?soct=${soct}`;
//   }
function detailHDGTGT(soct) {
    window.open(`formGTGT.html?soct=${soct}`, '_blank');
}

// Gọi khi click nút Sửa
// Hiện modal và load header + details
$(function() {
  let dmhhList = [];
  // 1) Load danh sách Mã hàng từ DMHH
  $.getJSON('/api/dmhh', data => {
    dmhhList = data;
  });

  // 2) Hàm mở modal và load dữ liệu
  window.editHDGTGT = function(soCT) {
    $.getJSON(`/api/hdhhedit?soCT=${soCT}`, ({ header, details }) => {
      // Header
      let [datePart, timePart] = header.NgayCT.split(' ');
      $('#NgayDate').val(datePart);
      $('#NgayTime').val(timePart);
      $('#editHDForm [name=SoCT]').val(header.SoCT);
      $('#editHDForm [name=MaKH]').val(header.MaKH);
      $('#editHDForm [name=TKNoThanhToan]').val(header.TKNoThanhToan);
      $('#editHDForm [name=TKCoDoanhThu]').val(header.TKCoDoanhThu);
      $('#editHDForm [name=TKCoThue]').val(header.TKCoThue);
      $('#editHDForm [name=HanTT]').val(header.HanTT);
      $('#editHDForm [name=TienThanhToan]').val(header.TienThanhToan);
      $('#editHDForm [name=TienDoanhThu]').val(header.TienDoanhThu);
      $('#editHDForm [name=ThueSuat]').val(header.ThueSuat);
      $('#editHDForm [name=TienThue]').val(header.TienThue);
      $('#editHDForm [name=HTTT]').val(header.HTTT);
      $('#editHDForm [name=TienCK]').val(header.TienCK);
      $('#editHDForm [name=TyLeCK]').val(header.TyLeCK);
      $('#editHDForm [name=TKChietKhau]').val(header.TKChietKhau);
      $('#editHDForm [name=DienGiai]').val(header.DienGiai);
      $('#editHDForm [name=MaCT]').val(header.MaCT);


      // Details: CTHoaDon
      const tb = $('#editDetailTable tbody').empty();
      details.forEach(d => appendDetailRow(d));
      $('#editHDModal').modal('show');
    }).fail((xhr, status, err) => {
      alert('Không tải được dữ liệu: ' + err);
    });
  };

  // 3) Thêm dòng chi tiết CTHoaDon editable, có select Mã HH
  function appendDetailRow(data = {}) {
    const selectHH = $('<select class="form-control maHH"><option value="">--Chọn HH--</option></select>');
    dmhhList.forEach(hh => {
      selectHH.append(`<option value="${hh.MaHH}">${hh.MaHH}</option>`);
    });
    if (data.MaHH) selectHH.val(data.MaHH);

    const row = $(
      `<tr>
        <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
      </tr>`
    );
    const cols = row.find('td');
    cols.eq(0).append(selectHH);
    cols.eq(1).append('<input type="text" class="form-control tenHH" readonly>');
    cols.eq(2).append('<input type="text" class="form-control dvt" readonly>');
    cols.eq(3).append(`<input type="number" class="form-control soLuong" value="${data.SoLuong||0}">`);
    cols.eq(4).append(`<input type="number" class="form-control donGia" value="${data.DonGia||0}">`);
    cols.eq(5).append(`<input type="number" class="form-control thanhTien" value="${data.ThanhTien||0}" readonly>`);
    cols.eq(6).append('<button type="button" class="btn btn-sm btn-danger removeRow"><i class="fas fa-trash"></i></button>');

    if (data.MaHH) {
      const hh = dmhhList.find(x => x.MaHH === data.MaHH);
      if (hh) {
        row.find('.tenHH').val(hh.TenHH);
        row.find('.dvt').val(hh.DVT);
      }
    }
    row.find('.maHH').on('change', function() {
      const val = $(this).val();
      const hh = dmhhList.find(x => x.MaHH === val) || {};
      row.find('.tenHH').val(hh.TenHH || '');
      row.find('.dvt').val(hh.DVT || '');
    });
    row.find('.soLuong, .donGia').on('input', () => {
      const sl = parseFloat(row.find('.soLuong').val())||0;
      const dg = parseFloat(row.find('.donGia').val())||0;
      row.find('.thanhTien').val((sl*dg).toFixed(2));
    });
    row.find('.removeRow').on('click', () => row.remove());

    $('#editDetailTable tbody').append(row);
  }

  // 4) Thêm dòng mới
  $('#addRowBtn').on('click', () => appendDetailRow());

  // 5) Lưu header + details về server
  $('#saveHDBtn').on('click', function() {
    const SoCT    = $('#editHDForm [name=SoCT]').val();
    const MaKH    = $('#editHDForm [name=MaKH]').val();
    const TKNoThanhToan    = $('#editHDForm [name=TKNoThanhToan]').val();
    const TKCoDoanhThu    = $('#editHDForm [name=TKCoDoanhThu]').val();
    const TKCoThue    = $('#editHDForm [name=TKCoThue]').val();
    const HanTT    = $('#editHDForm [name=HanTT]').val();
    const TienThanhToan    = $('#editHDForm [name=TienThanhToan]').val();
    const TienDoanhThu    = $('#editHDForm [name=TienDoanhThu]').val();
    const ThueSuat    = $('#editHDForm [name=ThueSuat]').val();
    const TienThue    = $('#editHDForm [name=TienThue]').val();
    const HTTT    = $('#editHDForm [name=HTTT]').val();
    const TienCK    = $('#editHDForm [name=TienCK]').val();
    const TyLeCK    = $('#editHDForm [name=TyLeCK]').val();
    const TKChietKhau    = $('#editHDForm [name=TKChietKhau]').val();
    const DienGiai    = $('#editHDForm [name=DienGiai]').val();
    const MaCT    = $('#editHDForm [name=MaCT]').val();
    const datePart = $('#NgayDate').val();
    const timePart = $('#NgayTime').val();
    const NgayCT   = `${datePart} ${timePart}`;
    const header = { SoCT, NgayCT, MaKH, TKNoThanhToan, TKCoDoanhThu, TKCoThue, HanTT, TienThanhToan, TienDoanhThu, ThueSuat, TienThue, HTTT, TienCK, TyLeCK, TKChietKhau, DienGiai, MaCT };

    const details = [];
    $('#editDetailTable tbody tr').each((_, tr) => {
      const $tr = $(tr);
      const MaHH      = $tr.find('.maHH').val();
      const SoLuong   = parseFloat($tr.find('.soLuong').val())||0;
      const DonGia    = parseFloat($tr.find('.donGia').val())   ||0;
      const ThanhTien = parseFloat($tr.find('.thanhTien').val())||0;
      if (MaHH) details.push({ SoCT, MaHH, SoLuong, DonGia, ThanhTien });
    });

    $.ajax({
      url: '/api/hdhhupdate',
      method: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({ header, details }),
    })
    .done(res => {
      if (res.success) {
        alert('Lưu thành công!');
        $('#editHDModal').modal('hide');
        // renderPageHDGTGT(currentPage);
        loadHDGTGT();
      } else {
        alert('Lưu thất bại: ' + JSON.stringify(res));
      }
    })
    .fail((xhr, status, err) => {
      console.error('AJAX LỖI:', status, err, xhr.responseText);
      alert('Lỗi khi lưu: ' + (xhr.responseText||status));
    });
  });
});




// ================= PHIẾU KẾ TOÁN =================
function renderPagePKT(page) {
  const start = (page - 1) * pageSize;
  const pageData = allPKT.slice(start, start + pageSize);
  const tbody = $("#PKTTable tbody");
  tbody.empty();

  pageData.forEach((item) => {
    const row = `
      <tr>
        <td><input type="checkbox" value="${item.SoCT}"></td>
        <td>${item.SoCT}</td>
        <td>${item.NgayCT || ""}</td>
        <td>${item.MaKH || ""}</td>
        <td>${item.LyDo || ""}</td>
        <td>
            <button class="btn btn-primary btn-sm" onclick="detailPKT('${item.SoCT}')"><i class="fas fa-book"></i></button>
          <button class="btn btn-primary btn-sm" onclick="editPKT('${item.SoCT}')"><i class="fas fa-edit"></i></button>
          <button class="btn btn-danger btn-sm" onclick="deletePKT('${item.SoCT}')"><i class="fas fa-trash-alt"></i></button>
        </td>
      </tr>`;
    tbody.append(row);
  });
}

function renderPaginationPKT() {
  const totalPages = Math.ceil(allPKT.length / pageSize);
  const pagination = $("#paginationPKT");
  pagination.empty();

  for (let i = 1; i <= totalPages; i++) {
    const btn = `<button class="btn btn-sm ${i === currentPagePKT ? 'btn-primary' : 'btn-light'}" onclick="goToPagePKT(${i})">${i}</button>`;
    pagination.append(btn);
  }
}

function goToPagePKT(page) {
    currentPagePKT = page;
  renderPagePKT(page);
  renderPaginationPKT();
}

function loadPKT() {
  $.get("/api/pkt", function (data) {
    if (!Array.isArray(data)) {
      console.error("Dữ liệu trả về không hợp lệ:", data);
      return;
    }
    allPKT = data;
    renderPagePKT(currentPagePKT);
    renderPaginationPKT();
  }).fail(function () {
    alert("Không thể tải dữ liệu phiếu kế toán.");
  });
}

function detailPKT(soct) {
    window.open(`formPKT.html?soct=${soct}`, '_blank');
}

// ================= HÓA ĐƠN MUA HÀNG =================
function renderPageHDMH(page) {
  const start = (page - 1) * pageSize;
  const pageData = allHDMH.slice(start, start + pageSize);
  const tbody = $("#HDMHTable tbody");
  tbody.empty();

  pageData.forEach((item) => {
    const row = `
      <tr>
        <td><input type="checkbox" value="${item.SoCT}"></td>
        <td>${item.SoCT}</td>
        <td>${item.NgayCT || ""}</td>
        <td>${item.MaKH || ""}</td>
        <td>${item.DienGiai || ""}</td>
        <td>${item.TienThanhToan || ""}</td>
        <td>
            <button class="btn btn-primary btn-sm" onclick="detailHDMH('${item.SoCT}')"><i class="fas fa-book"></i></button>
          <button class="btn btn-primary btn-sm" onclick="editHDMH('${item.SoCT}')"><i class="fas fa-edit"></i></button>
          <button class="btn btn-danger btn-sm" onclick="deletHDGTGT('${item.SoCT}')"><i class="fas fa-trash-alt"></i></button>
        </td>
      </tr>`;
    tbody.append(row);
  });
}

function renderPaginationHDMH() {
  const totalPages = Math.ceil(allHDGTGT.length / pageSize);
  const pagination = $("#paginationHDMH");
  pagination.empty();

  for (let i = 1; i <= totalPages; i++) {
    const btn = `<button class="btn btn-sm ${i === currentPageHDMH ? 'btn-primary' : 'btn-light'}" onclick="goToPageHDMH(${i})">${i}</button>`;
    pagination.append(btn);
  }
}

function goToPageHDMH(page) {
    currentPageHDMH = page;
  renderPageHDMH(page);
  renderPaginationHDMH();
}

function loadHDMH() {
  $.get("/api/hdmh", function (data) {
    if (!Array.isArray(data)) {
      console.error("Dữ liệu trả về không hợp lệ:", data);
      return;
    }
    allHDMH = data;
    renderPageHDMH(currentPageHDGTGT);
    renderPaginationHDMH();
  }).fail(function () {
    alert("Không thể tải dữ liệu hóa đơn giá trị gia tăng.");
  });
}

// function detailHDGTGT(soct) {
//     window.open(`formGTGT.html?soct=${soct}`, '_blank');
// }

$(function() {
  let dmhhList = [];
  // 1) Load danh sách Mã hàng từ DMHH
  $.getJSON('/api/dmhh', data => {
    dmhhList = data;
  });

  // 2) Hàm mở modal và load dữ liệu
  window.editHDMH = function(soCT) {
    $.getJSON(`/api/hdmhedit?soCT=${soCT}`, ({ header, details }) => {
      // Header
      let [datePart, timePart] = header.NgayCT.split(' ');
      $('#NgayDate').val(datePart);
      $('#NgayTime').val(timePart);
      $('#editHDMHForm [name=SoCT]').val(header.SoCT);
      $('#editHDMHForm [name=MaKH]').val(header.MaKH);
      $('#editHDMHForm [name=TKNoHang]').val(header.TKNoHang);
      $('#editHDMHForm [name=TKNoThue]').val(header.TKNoThue);
      $('#editHDMHForm [name=TKCoThanhToan]').val(header.TKCoThanhToan);
      $('#editHDMHForm [name=HanTT]').val(header.HanTT);
      $('#editHDMHForm [name=TienThanhToan]').val(header.TienThanhToan);
      $('#editHDMHForm [name=TienHang]').val(header.TienHang);
      $('#editHDMHForm [name=ThueSuat]').val(header.ThueSuat);
      $('#editHDMHForm [name=TienThue]').val(header.TienThue);
      $('#editHDMHForm [name=HTTT]').val(header.HTTT);
      $('#editHDMHForm [name=TienCK]').val(header.TienCK);
      $('#editHDMHForm [name=TyLeCK]').val(header.TyLeCK);
      $('#editHDMHForm [name=TKChietKhau]').val(header.TKChietKhau);
      $('#editHDMHForm [name=DienGiai]').val(header.DienGiai);
      $('#editHDMHForm [name=MaCT]').val(header.MaCT);


      // Details: CTHoaDon
      const tb = $('#editDetailCTHDMHTable tbody').empty();
      details.forEach(d => appendDetailRowCTHDMH(d));
      $('#editHDMHModal').modal('show');
    }).fail((xhr, status, err) => {
      alert('Không tải được dữ liệu: ' + err);
    });
  };

  // 3) Thêm dòng chi tiết CTHoaDon editable, có select Mã HH
  function appendDetailRowCTHDMH(data = {}) {
    const selectHH = $('<select class="form-control maHH"><option value="">--Chọn HH--</option></select>');
    dmhhList.forEach(hh => {
      selectHH.append(`<option value="${hh.MaHH}">${hh.MaHH}</option>`);
    });
    if (data.MaHH) selectHH.val(data.MaHH);

    const row = $(
      `<tr>
        <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
      </tr>`
    );
    const cols = row.find('td');
    cols.eq(0).append(selectHH);
    cols.eq(1).append('<input type="text" class="form-control tenHH" readonly>');
    cols.eq(2).append('<input type="text" class="form-control dvt" readonly>');
    cols.eq(3).append(`<input type="number" class="form-control soLuong" value="${data.SoLuong||0}">`);
    cols.eq(4).append(`<input type="number" class="form-control donGia" value="${data.DonGia||0}">`);
    cols.eq(5).append(`<input type="number" class="form-control thanhTien" value="${data.ThanhTien||0}" readonly>`);
    cols.eq(6).append('<button type="button" class="btn btn-sm btn-danger removeRow"><i class="fas fa-trash"></i></button>');

    if (data.MaHH) {
      const hh = dmhhList.find(x => x.MaHH === data.MaHH);
      if (hh) {
        row.find('.tenHH').val(hh.TenHH);
        row.find('.dvt').val(hh.DVT);
      }
    }
    row.find('.maHH').on('change', function() {
      const val = $(this).val();
      const hh = dmhhList.find(x => x.MaHH === val) || {};
      row.find('.tenHH').val(hh.TenHH || '');
      row.find('.dvt').val(hh.DVT || '');
    });
    row.find('.soLuong, .donGia').on('input', () => {
      const sl = parseFloat(row.find('.soLuong').val())||0;
      const dg = parseFloat(row.find('.donGia').val())||0;
      row.find('.thanhTien').val((sl*dg).toFixed(2));
    });
    row.find('.removeRow').on('click', () => row.remove());

    $('#editDetailCTHDMHTable tbody').append(row);
  }

  // 4) Thêm dòng mới
  $('#addRowCTHDMHBtn').on('click', () => appendDetailRowCTHDMH());

  // 5) Lưu header + details về server
  $('#saveHDMHBtn').on('click', function() {
    const SoCT    = $('#editHDMHForm [name=SoCT]').val();
    const MaKH    = $('#editHDMHForm [name=MaKH]').val();
    const TKNoHang    = $('#editHDMHForm [name=TKNoHang]').val();
    const TKNoThue    = $('#editHDMHForm [name=TKNoThue]').val();
    const TKCoThanhToan    = $('#editHDMHForm [name=TKCoThanhToan]').val();
    const HanTT    = $('#editHDMHForm [name=HanTT]').val();
    const TienThanhToan    = $('#editHDMHForm [name=TienThanhToan]').val();
    const TienHang    = $('#editHDMHForm [name=TienHang]').val();
    const ThueSuat    = $('#editHDMHForm [name=ThueSuat]').val();
    const TienThue    = $('#editHDMHForm [name=TienThue]').val();
    const HTTT    = $('#editHDMHForm [name=HTTT]').val();
    const TienCK    = $('#editHDMHForm [name=TienCK]').val();
    const TyLeCK    = $('#editHDMHForm [name=TyLeCK]').val();
    const TKChietKhau    = $('#editHDMHForm [name=TKChietKhau]').val();
    const DienGiai    = $('#editHDMHForm [name=DienGiai]').val();
    const MaCT    = $('#editHDMHForm [name=MaCT]').val();
    const datePart = $('#NgayDate').val();
    const timePart = $('#NgayTime').val();
    const NgayCT   = `${datePart} ${timePart}`;
    const header = { SoCT, NgayCT, MaKH, TKNoHang, TKNoThue, TKCoThanhToan, HanTT, TienThanhToan, TienHang, ThueSuat, TienThue, HTTT, TienCK, TyLeCK, TKChietKhau, DienGiai, MaCT };

    const details = [];
    $('#editDetailCTHDMHTable tbody tr').each((_, tr) => {
      const $tr = $(tr);
      const MaHH      = $tr.find('.maHH').val();
      const SoLuong   = parseFloat($tr.find('.soLuong').val())||0;
      const DonGia    = parseFloat($tr.find('.donGia').val())   ||0;
      const ThanhTien = parseFloat($tr.find('.thanhTien').val())||0;
      if (MaHH) details.push({ SoCT, MaHH, SoLuong, DonGia, ThanhTien });
    });

    $.ajax({
      url: '/api/hdmhupdate',
      method: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({ header, details }),
    })
    .done(res => {
      if (res.success) {
        alert('Lưu thành công!');
        $('#editHDMHModal').modal('hide');
        // renderPageHDGTGT(currentPage);
        loadHDMH()
      } else {
        alert('Lưu thất bại: ' + JSON.stringify(res));
      }
    })
    .fail((xhr, status, err) => {
      console.error('AJAX LỖI:', status, err, xhr.responseText);
      alert('Lỗi khi lưu: ' + (xhr.responseText||status));
    });
  });
});
// ================= $(document).ready =================
$(document).ready(function () {
    loadHDGTGT();
    loadPKT();
    loadHDMH();
});
