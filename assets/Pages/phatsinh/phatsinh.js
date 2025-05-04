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
          <button class="btn btn-primary btn-sm" onclick="editHDGTGT('${item.SoCT}')"><i class="fas fa-edit"></i></button>
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

// ================= $(document).ready =================
$(document).ready(function () {
    loadHDGTGT();
    loadPKT();
    loadHDMH();
});
