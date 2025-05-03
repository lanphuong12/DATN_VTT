// ================= PHÂN TRANG CHUNG =================
const pageSize = 5;
let currentPageDMTK = 1;
let currentPageDMNH = 1;
let currentPageDMTKNH = 1;
let currentPageDMHH = 1;
let currentPageDMKH = 1;
let allDMTK = [];
let allDMNH = [];
let allDMTKNH = [];
let allDMHH = [];
let allDMKH = [];

// ================= DANH MỤC TÀI KHOẢN (DMTK) =================
function renderPageDMTK(page) {
  const start = (page - 1) * pageSize;
  const pageData = allDMTK.slice(start, start + pageSize);
  const tbody = $("#dmtkTable tbody");
  tbody.empty();

  pageData.forEach((item) => {
    const row = `
      <tr>
        <td><input type="checkbox" value="${item.MaTK}"></td>
        <td>${item.MaTK}</td>
        <td>${item.TenTK}</td>
        <td>${item.CapTK}</td>
        <td>${item.TKCapTren || ""}</td>
        <td>
          <button class="btn btn-primary btn-sm" onclick="editDMTK('${item.MaTK}')"><i class="fas fa-edit"></i></button>
          <button class="btn btn-danger btn-sm" onclick="deleteDMTK('${item.MaTK}')"><i class="fas fa-trash-alt"></i></button>
        </td>
      </tr>`;
    tbody.append(row);
  });
}

function renderPaginationDMTK() {
  const totalPages = Math.ceil(allDMTK.length / pageSize);
  const pagination = $("#pagination");
  pagination.empty();

  for (let i = 1; i <= totalPages; i++) {
    const btn = `<button class="btn btn-sm ${i === currentPageDMTK ? 'btn-primary' : 'btn-light'}" onclick="goToPageDMTK(${i})">${i}</button>`;
    pagination.append(btn);
  }
}

function goToPageDMTK(page) {
  currentPageDMTK = page;
  renderPageDMTK(page);
  renderPaginationDMTK();
}

function loadDMTK() {
  $.get("/api/dmtk", function (data) {
    if (!Array.isArray(data)) {
      console.error("Dữ liệu trả về không hợp lệ:", data);
      return;
    }
    allDMTK = data;
    renderPageDMTK(currentPageDMTK);
    renderPaginationDMTK();
  }).fail(function () {
    alert("Không thể tải dữ liệu danh mục tài khoản.");
  });
}


function setupAddDMTKForm() {
  const form = document.getElementById("addFormTK");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Ngăn form submit mặc định

      const formData = {
        MaTK: document.getElementById("MaTKAdd").value.trim(),
        TenTK: document.getElementById("TenTKAdd").value.trim(),
        CapTK: parseInt(document.getElementById("CapTKAdd").value),
        TKCapTren: document.getElementById("TKCapTrenAdd").value.trim() || null
      };

      fetch("/api/dmtk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (response.ok) {
          alert("Thêm tài khoản thành công!");
          $('#ModalAddTK').modal('hide');
          form.reset();
          loadDMTK();
        } else {
          alert("Lỗi khi thêm tài khoản!");
        }
      })
      .catch(() => alert("Lỗi kết nối khi thêm tài khoản."));
    });
  }
}


function editDMTK(matk) {
  const item = allDMTK.find(d => d.MaTK === matk);
  if (!item) return alert("Không tìm thấy dữ liệu.");

  document.getElementById('MaTKEdit').value = item.MaTK;
  document.getElementById('TenTKEdit').value = item.TenTK;
  document.getElementById('CapTKEdit').value = item.CapTK;
  document.getElementById('TKCapTrenEdit').value = item.TKCapTren || "";

  $('#ModalUP').modal('show');
}

function updateDMTK() {
  const data = {
    MaTK: document.getElementById('MaTKEdit').value,
    TenTK: document.getElementById('TenTKEdit').value,
    CapTK: parseInt(document.getElementById('CapTKEdit').value),
    TKCapTren: document.getElementById('TKCapTrenEdit').value || null
  };

  fetch(`/api/dmtk/${data.MaTK}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => {
    if (response.ok) {
      alert("Cập nhật thành công!");
      loadDMTK();
    } else {
      alert("Lỗi khi cập nhật dữ liệu.");
    }
  });
}

function deleteDMTK(matk) {
  if (confirm("Bạn có chắc chắn muốn xóa tài khoản này không?")) {
    $.ajax({
      url: `/api/dmtk/${matk}`,
      type: "DELETE",
      success: function () {
        alert("Đã xóa thành công!");
        loadDMTK();
      },
      error: function () {
        alert("Lỗi khi xóa tài khoản.");
      },
    });
  }
}

// ================= DANH MỤC NGÂN HÀNG (DMNH) =================
function renderPageDMNH(page) {
  const start = (page - 1) * pageSize;
  const pageData = allDMNH.slice(start, start + pageSize);
  const tbody = $("#nganhangTable tbody");
  tbody.empty();

  pageData.forEach((item) => {
    const row = `
      <tr>
        <td><input type="checkbox" value="${item.MaNH}"></td>
        <td>${item.MaNH}</td>
        <td>${item.TenNH}</td>
        <td>
          <button class="btn btn-primary btn-sm" onclick="editDMNH('${item.MaNH}')"><i class="fas fa-edit"></i></button>
          <button class="btn btn-danger btn-sm" onclick="deleteDMNH('${item.MaNH}')"><i class="fas fa-trash-alt"></i></button>
        </td>
      </tr>`;
    tbody.append(row);
  });
}

function renderPaginationDMNH() {
  const totalPages = Math.ceil(allDMNH.length / pageSize);
  const pagination = $("#paginationNH");
  pagination.empty();

  for (let i = 1; i <= totalPages; i++) {
    const btn = `<button class="btn btn-sm ${i === currentPageDMNH ? 'btn-primary' : 'btn-light'}" onclick="goToPageDMNH(${i})">${i}</button>`;
    pagination.append(btn);
  }
}

function goToPageDMNH(page) {
  currentPageDMNH = page;
  renderPageDMNH(page);
  renderPaginationDMNH();
}

function loadDMNH() {
  $.get("/api/nganhang", function (data) {
    if (!Array.isArray(data)) {
      console.error("Dữ liệu trả về không hợp lệ:", data);
      return;
    }
    allDMNH = data;
    renderPageDMNH(currentPageDMNH);
    renderPaginationDMNH();
  }).fail(function () {
    alert("Không thể tải dữ liệu ngân hàng.");
  });
}

function editDMNH(manh) {
  const item = allDMNH.find(d => d.MaNH === manh);
  if (!item) return alert("Không tìm thấy dữ liệu.");

  document.getElementById('MaNHEdit').value = item.MaNH;
  document.getElementById('TenNHEdit').value = item.TenNH;

  $('#ModalEditNH').modal('show');
}

function updateDMNH() {
  const data = {
    MaNH: document.getElementById('MaNHEdit').value,
    TenNH: document.getElementById('TenNHEdit').value || null
  };

  fetch(`/api/nganhang/${data.MaNH}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => {
    if (response.ok) {
      alert("Cập nhật thành công!");
      loadDMNH();
    } else {
      alert("Lỗi khi cập nhật dữ liệu.");S
    }
  });
}
function deleteDMNH(manh) {
  if (confirm("Bạn có chắc chắn muốn xóa ngân hàng này không?")) {
    $.ajax({
      url: `/api/nganhang/${manh}`,
      type: "DELETE",
      success: function () {
        alert("Đã xóa thành công!");
        loadDMNH();
      },
      error: function () {
        alert("Lỗi khi xóa ngân hàng.");
      },
    });
  }
}

function setupAddDMNHForm() {
  const form = document.getElementById("addFormNH");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Ngăn form submit mặc định

      const formData = {
        MaNH: document.getElementById("MaNHAdd").value.trim(),
        TenNH: document.getElementById("TenNHAdd").value.trim()  || null
      };

      fetch("/api/nganhang", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (response.ok) {
          alert("Thêm ngân hàng thành công!");
          $('#ModalAddDMNH').modal('hide');
          form.reset();
          loadDMNH();
        } else {
          alert("Lỗi khi thêm ngân hàng!");
        }
      })
      .catch(() => alert("Lỗi kết nối khi thêm ngân hàng."));
    });
  }
}

// ================= DANH MỤC TÀI KHOẢN NGÂN HÀNG (TKNH) =================
function renderPageDMTKNH(page) {
  const start = (page - 1) * pageSize;
  const pageData = allDMTKNH.slice(start, start + pageSize);
  const tbody = $("#TKnganhangTable tbody");
  tbody.empty();

  pageData.forEach((item) => {
    const row = `
      <tr>
        <td><input type="checkbox" value="${item.SoTKNH}"></td>
        <td>${item.SoTKNH}</td>
        <td>${item.ChuTaiKhoan}</td>
        <td>${item.ChiNhanh}</td>
        <td>${item.MaNH}</td>
        <td>
          <button class="btn btn-primary btn-sm" onclick="editDMTKNH('${item.SoTKNH}')"><i class="fas fa-edit"></i></button>
          <button class="btn btn-danger btn-sm" onclick="deleteDMTKNH('${item.SoTKNH}')"><i class="fas fa-trash-alt"></i></button>
        </td>
      </tr>`;
    tbody.append(row);
  });
}

function renderPaginationDMTKNH() {
  const totalPages = Math.ceil(allDMTKNH.length / pageSize);
  const pagination = $("#paginationTKNH");
  pagination.empty();

  for (let i = 1; i <= totalPages; i++) {
    const btn = `<button class="btn btn-sm ${i === currentPageDMTKNH ? 'btn-primary' : 'btn-light'}" onclick="goToPageDMTKNH(${i})">${i}</button>`;
    pagination.append(btn);
  }
}

function goToPageDMTKNH(page) {
  currentPageDMTKNH = page;
  renderPageDMTKNH(page);
  renderPaginationDMTKNH();
}

function loadDMTKNH() {
  $.get("/api/tknganhang", function (data) {
    if (!Array.isArray(data)) {
      console.error("Dữ liệu trả về không hợp lệ:", data);
      return;
    }
    allDMTKNH = data;
    renderPageDMTKNH(currentPageDMTKNH);
    renderPaginationDMTKNH();
  }).fail(function () {
    alert("Không thể tải dữ liệu tài khoản ngân hàng.");
  });
}

function editDMTKNH(sotknh) {
  const item = allDMTKNH.find(d => d.SoTKNH === sotknh);
  if (!item) return alert("Không tìm thấy dữ liệu.");

  document.getElementById('SoTKNHEdit').value = item.SoTKNH;
  document.getElementById('ChuTaiKhoanEdit').value = item.ChuTaiKhoan;
  document.getElementById('ChiNhanhEdit').value = item.ChiNhanh;
  document.getElementById('MaNHEdit').value = item.MaNH;

  $('#ModalEditTKNH').modal('show');
}

function updateDMTKNH() {
  const data = {
    SoTKNH: document.getElementById('SoTKNHEdit').value,
    ChuTaiKhoan: document.getElementById('ChuTaiKhoanEdit').value,
    ChiNhanh: document.getElementById('ChiNhanhEdit').value,
    MaNH: document.getElementById('MaNHEdit').value || null
  };

  fetch(`/api/tknganhang/${data.SoTKNH}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => {
    if (response.ok) {
      alert("Cập nhật thành công!");
      loadDMTKNH();
    } else {
      alert("Lỗi khi cập nhật dữ liệu.");S
    }
  });
}
function deleteDMTKNH(sotknh) {
  if (confirm("Bạn có chắc chắn muốn xóa tài khoản ngân hàng này không?")) {
    $.ajax({
      url: `/api/tknganhang/${sotknh}`,
      type: "DELETE",
      success: function () {
        alert("Đã xóa thành công!");
        loadDMTKNH();
      },
      error: function () {
        alert("Lỗi khi xóa tài khoản ngân hàng.");
      },
    });
  }
}

function setupAddDMTKNHForm() {
  const form = document.getElementById("addFormTKNH");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Ngăn form submit mặc định

      const formData = {
        SoTKNH: document.getElementById("SoTKNHAdd").value.trim(),
        ChuTaiKhoan: document.getElementById("ChuTaiKhoanAdd").value.trim(),
        ChiNhanh: document.getElementById("ChiNhanhAdd").value.trim(),
        MaNH: document.getElementById("MaNHAdd").value.trim()  || null
      };

      fetch("/api/tknganhang", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (response.ok) {
          alert("Thêm tài khoản ngân hàng thành công!");
          $('#ModalAddDMTKNH').modal('hide');
          form.reset();
          loadDMTKNH();
        } else {
          alert("Lỗi khi thêm tài khoản ngân hàng!");
        }
      })
      .catch(() => alert("Lỗi kết nối khi thêm tài khoản ngân hàng."));
    });
  }
}

// ================= DANH MỤC HÀNG HÓA (DMHH) =================
function renderPageDMHH(page) {
  const start = (page - 1) * pageSize;
  const pageData = allDMHH.slice(start, start + pageSize);
  const tbody = $("#dmhhTable tbody");
  tbody.empty();

  pageData.forEach((item) => {
    const row = `
      <tr>
        <td><input type="checkbox" value="${item.MaHH}"></td>
        <td>${item.MaHH}</td>
        <td>${item.TenHH}</td>
        <td>${item.DVT}</td>
        <td>
          <button class="btn btn-primary btn-sm" onclick="editDMHH('${item.MaHH}')"><i class="fas fa-edit"></i></button>
          <button class="btn btn-danger btn-sm" onclick="deleteDMHH('${item.MaHH}')"><i class="fas fa-trash-alt"></i></button>
        </td>
      </tr>`;
    tbody.append(row);
  });
}

function renderPaginationDMHH() {
  const totalPages = Math.ceil(allDMHH.length / pageSize);
  const pagination = $("#paginationHH");
  pagination.empty();

  for (let i = 1; i <= totalPages; i++) {
    const btn = `<button class="btn btn-sm ${i === currentPageDMHH ? 'btn-primary' : 'btn-light'}" onclick="goToPageDMHH(${i})">${i}</button>`;
    pagination.append(btn);
  }
}

function goToPageDMHH(page) {
  currentPageDMHH = page;
  renderPageDMHH(page);
  renderPaginationDMHH();
}

function loadDMHH() {
  $.get("/api/dmhh", function (data) {
    if (!Array.isArray(data)) {
      console.error("Dữ liệu trả về không hợp lệ:", data);
      return;
    }
    allDMHH = data;
    renderPageDMHH(currentPageDMHH);
    renderPaginationDMHH();
  }).fail(function () {
    alert("Không thể tải dữ liệu danh mục hàng hóa.");
  });
}


function setupAddDMHHForm() {
  const form = document.getElementById("addFormHH");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Ngăn form submit mặc định

      const formData = {
        MaHH: document.getElementById("MaHHAdd").value.trim(),
        TenHH: document.getElementById("TenHHAdd").value.trim(),
        DVT: document.getElementById("TenHHAdd").value.trim()
      };

      fetch("/api/dmhh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (response.ok) {
          alert("Thêm hàng hóa thành công!");
          $('#ModalAddHH').modal('hide');
          form.reset();
          loadDMHH();
        } else {
          alert("Lỗi khi thêm hàng hóa!");
        }
      })
      .catch(() => alert("Lỗi kết nối khi thêm hàng hóa."));
    });
  }
}


function editDMHH(mahh) {
  const item = allDMHH.find(d => d.MaHH === mahh);
  if (!item) return alert("Không tìm thấy dữ liệu.");

  document.getElementById('MaHHEdit').value = item.MaHH;
  document.getElementById('TenHHEdit').value = item.TenHH;
  document.getElementById('DVTEdit').value = item.DVT;

  $('#ModalEditHH').modal('show');
}

function updateDMHH() {
  const data = {
    MaHH: document.getElementById('MaHHEdit').value,
    TenHH: document.getElementById('TenHHEdit').value,
    DVT: parseInt(document.getElementById('DVTEdit').value)
  };

  fetch(`/api/dmhh/${data.MaHH}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => {
    if (response.ok) {
      alert("Cập nhật thành công!");
      loadDMHH();
    } else {
      alert("Lỗi khi cập nhật dữ liệu.");
    }
  });
}

function deleteDMHH(mahh) {
  if (confirm("Bạn có chắc chắn muốn xóa hàng hóa này không?")) {
    $.ajax({
      url: `/api/dmhh/${mahh}`,
      type: "DELETE",
      success: function () {
        alert("Đã xóa thành công!");
        loadDMHH();
      },
      error: function () {
        alert("Lỗi khi xóa hàng hóa.");
      },
    });
  }
}


// ================= DANH MỤC KHÁCH HÀNG (DMKH) =================
function renderPageDMKH(page) {
  const start = (page - 1) * pageSize;
  const pageData = allDMKH.slice(start, start + pageSize);
  const tbody = $("#dmkhTable tbody");
  tbody.empty();

  pageData.forEach((item) => {
    const row = `
      <tr>
        <td><input type="checkbox" value="${item.MaKH}"></td>
        <td>${item.MaKH}</td>
        <td>${item.TenKH}</td>
        <td>${item.DiaChi || ""}</td>
        <td>${item.Email || ""}</td>
        <td>${item.DienThoai || ""}</td>
        <td>${item.MaSoThue || ""}</td>
        <td>
          <button class="btn btn-primary btn-sm" onclick="editDMKH('${item.MaKH}')"><i class="fas fa-edit"></i></button>
          <button class="btn btn-danger btn-sm" onclick="deleteDMKH('${item.MaKH}')"><i class="fas fa-trash-alt"></i></button>
        </td>
      </tr>`;
    tbody.append(row);
  });
}

function renderPaginationDMKH() {
  const totalPages = Math.ceil(allDMKH.length / pageSize);
  const pagination = $("#paginationKH");
  pagination.empty();

  for (let i = 1; i <= totalPages; i++) {
    const btn = `<button class="btn btn-sm ${i === currentPageDMKH ? 'btn-primary' : 'btn-light'}" onclick="goToPageDMKH(${i})">${i}</button>`;
    pagination.append(btn);
  }
}

function goToPageDMKH(page) {
  currentPageDMKH = page;
  renderPageDMKH(page);
  renderPaginationDMKH();
}

function loadDMKH() {
  $.get("/api/dmkh", function (data) {
    if (!Array.isArray(data)) {
      console.error("Dữ liệu trả về không hợp lệ:", data);
      return;
    }
    allDMKH = data;
    renderPageDMKH(currentPageDMKH);
    renderPaginationDMKH();
  }).fail(function () {
    alert("Không thể tải dữ liệu danh mục khách hàng.");
  });
}


function setupAddDMKHForm() {
  const form = document.getElementById("addFormKH");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Ngăn form submit mặc định

      const formData = {
        MaKH: document.getElementById("MaKHAdd").value.trim(),
        TenKH: document.getElementById("TenKHAdd").value.trim(),
        DiaChi: document.getElementById("DiaChiAdd").value.trim() || null,
        Email: document.getElementById("EmailAdd").value.trim() || null,
        DienThoai: document.getElementById("DienThoaiAdd").value.trim() || null,
        MaSoThue: document.getElementById("MaSoThueAdd").value.trim() || null
      };

      fetch("/api/dmkh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (response.ok) {
          alert("Thêmkhách hàng thành công!");
          $('#ModalAddKH').modal('hide');
          form.reset();
          loadDMKH();
        } else {
          alert("Lỗi khi thêm khách hàng!");
        }
      })
      .catch(() => alert("Lỗi kết nối khi thêm khách hàng."));
    });
  }
}


function editDMKH(makh) {
  const item = allDMKH.find(d => d.MaKH === makh);
  if (!item) return alert("Không tìm thấy dữ liệu.");

  document.getElementById('MaKHEdit').value = item.MaKH;
  document.getElementById('TenKHEdit').value = item.TenKH;
  document.getElementById('DiaChiEdit').value = item.DiaChi || "";
  document.getElementById('EmailEdit').value = item.Email || "";
  document.getElementById('DienThoaiEdit').value = item.DienThoai || "";
  document.getElementById('MaSoThueEdit').value = item.MaSoThue || "";

  $('#ModalEditKH').modal('show');
}

function updateDMTK() {
  const data = {
    MaKH: document.getElementById('MaKHEdit').value,
    TenKH: document.getElementById('TenKHEdit').value,
    DiaChi: document.getElementById('DiaChiEdit').value || null,
    Email: document.getElementById('EmailEdit').value || null,
    DienThoai: document.getElementById('DienThoaiEdit').value || null,
    MaSoThue: document.getElementById('MaSoThueEdit').value || null
  };

  fetch(`/api/dmkh/${data.MaKH}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => {
    if (response.ok) {
      alert("Cập nhật thành công!");
      loadDMKH();
    } else {
      alert("Lỗi khi cập nhật dữ liệu.");
    }
  });
}

function deleteDMKH(makh) {
  if (confirm("Bạn có chắc chắn muốn xóa khách hàng này không?")) {
    $.ajax({
      url: `/api/dmkh/${makh}`,
      type: "DELETE",
      success: function () {
        alert("Đã xóa thành công!");
        loadDMKH();
      },
      error: function () {
        alert("Lỗi khi xóa khách hàng.");
      },
    });
  }
}

// ================= $(document).ready =================
$(document).ready(function () {
  loadDMTK();
  loadDMNH();
  loadDMTKNH();
  loadDMHH();
  loadDMKH();
  setupAddDMTKForm();
  setupAddDMNHForm();
  setupAddDMTKNHForm();
  setupAddDMHHForm();
  setupAddDMKHForm();
});
