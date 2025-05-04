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

// ================= $(document).ready =================
$(document).ready(function () {
    loadHDGTGT();
});
