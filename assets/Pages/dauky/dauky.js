// ================= PHÂN TRANG CHUNG =================
const pageSize = 5;
let currentPageNodauky = 1;
let currentPageDudauky = 1;
let allDudauky = [];
let allNodauky = [];
let filteredDudauky = [];    // dữ liệu sau lọc
let filteredNodauky = [];    // dữ liệu sau lọc

// ================= SỐ DƯ ĐẦU KỲ (SoDuDauKy) =================
function renderPageSoDuDauKy(page) {
  const start = (page - 1) * pageSize;
  const pageData = filteredNodauky.slice(start, start + pageSize);
  const tbody = $("#SoDuDauKyTable tbody");
  tbody.empty();

  pageData.forEach((item) => {
    const row = `
      <tr>
        <td><input type="checkbox" value="${item.MaTK}"></td>
        <td>${item.MaTK}</td>
        <td>${item.DuNo}</td>
        <td>${item.DuCo}</td>
        <td>
          <button class="btn btn-primary btn-sm" onclick="editSoDuDauKy('${item.MaTK}')"><i class="fas fa-edit"></i></button>
          <button class="btn btn-danger btn-sm" onclick="deleteSoDuDauKy('${item.MaTK}')"><i class="fas fa-trash-alt"></i></button>
        </td>
      </tr>`;
    tbody.append(row);
  });
}

function renderPaginationSoDuDauKy() {
  const totalPages = Math.ceil(filteredSoDuDauKy.length / pageSize);
  const pagination = $("#paginationSoDuDauKy");
  pagination.empty();

  for (let i = 1; i <= totalPages; i++) {
    const btn = `<button class="btn btn-sm ${i === currentPageSoDuDauKy ? 'btn-primary' : 'btn-light'}" onclick="goToPageSoDuDauKy(${i})">${i}</button>`;
    pagination.append(btn);
  }
}

function goToPageSoDuDauKy(page) {
  currentPageNodauky = page;
  renderPageSoDuDauKy(page);
  renderPaginationSoDuDauKy();
}

function loadSoDuDauKy() {
  $.get("/api/dudauky", function (data) {
    if (!Array.isArray(data)) {
      console.error("Dữ liệu trả về không hợp lệ:", data);
      return;
    }
    allDudauky = data;
    filteredDudauky = data;
    renderPageNodauky(currentPageSoDuDauKy);
    renderPaginationSoDuDauKy();
  }).fail(function () {
    alert("Không thể tải dữ liệu.");
  });
}

function myFunctionSoDuDauKy() {
  const keyword = $("#myInput").val().toLowerCase();
  filteredDudauky = allSoDuDauKy.filter(item =>
    item.MaTK.toLowerCase().includes(keyword)
  );
  currentPageSoDuDauKy = 1;
  renderPageNodauky(currentPageSoDuDauKyy);
  renderPaginationSoDuDauKy();
}

function editSoDuDauKy(matk) {
  const item = allSoDuDauKy.find(d => d.MaTK === matk);
  if (!item) return alert("Không tìm thấy dữ liệu.");

  document.getElementById('MaTKEdit').value = item.MaTK;
  document.getElementById('DuNoEdit').value = item.DuNo;
    document.getElementById('DuCoEdit').value = item.DuCo;

  $('#ModalEditSoDuDauKy').modal('show');
}

function updateSoDuDauKy() {
  const data = {
    MaNH: document.getElementById('MaTKEdit').value,
    DuNo: document.getElementById('DuNoEdit').value || null,
    DuCo: document.getElementById('DuCoEdit').value || null
  };

  fetch(`/api/dudauky/${data.MaTK}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => {
    if (response.ok) {
      alert("Cập nhật thành công!");
      loadSoDuDauKy();
    } else {
      alert("Lỗi khi cập nhật dữ liệu.");S
    }
  });
}
function deleteNodauky(matk) {
  if (confirm("Bạn có chắc chắn muốn xóa không?")) {
    $.ajax({
      url: `/api/dudauky/${matk}`,
      type: "DELETE",
      success: function () {
        alert("Đã xóa thành công!");
        loadSoDuDauKy();
      },
      error: function () {
        alert("Lỗi khi xóa.");
      },
    });
  }
}

function setupAddSoDuDauKyForm() {
  const form = document.getElementById("addFormSoDuDauKy");
  if (form) {
    form.addEventListener("submitAddSoDuDauKy", function (event) {
      event.preventDefault(); // Ngăn form submit mặc định

      const formData = {
        MaTK: document.getElementById("MaTKAdd").value.trim(),
        DuNo: document.getElementById("DuNoAdd").value.trim()  || null,
        DuCo: document.getElementById("DucoAdd").value.trim()  || null
      };

      fetch("/api/dudauky", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (response.ok) {
          alert("Thêm thành công!");
          $('#ModalAddSoDuDauKy').modal('hide');
          form.reset();
          loadSoDuDauKy();
        } else {
          alert("Lỗi khi thêm!");
        }
      })
      .catch(() => alert("Lỗi kết nối khi thêm ngân hàng."));
    });
  }
}

// ================= NỢ ĐẦU KỲ (Nodauky) =================
function renderPageNodauky(page) {
  const start = (page - 1) * pageSize;
  const pageData = filteredNodauky.slice(start, start + pageSize);
  const tbody = $("#NodaukyTable tbody");
  tbody.empty();

  pageData.forEach((item) => {
    const row = `
      <tr>
        <td><input type="checkbox" value="${item.ID}"></td>
        <td>${item.ID}</td>
        <td>${item.MaTK}</td>
        <td>${item.MaKH}</td>
        <td>${item.DuNo}</td>
        <td>${item.DuCo}</td>
        <td>
          <button class="btn btn-primary btn-sm" onclick="editNodauky('${item.ID}')"><i class="fas fa-edit"></i></button>
          <button class="btn btn-danger btn-sm" onclick="deleteNodauky('${item.ID}')"><i class="fas fa-trash-alt"></i></button>
        </td>
      </tr>`;
    tbody.append(row);
  });
}

function renderPaginationNodauky() {
  const totalPages = Math.ceil(filteredNodauky.length / pageSize);
  const pagination = $("#paginationNodauky");
  pagination.empty();

  for (let i = 1; i <= totalPages; i++) {
    const btn = `<button class="btn btn-sm ${i === currentPageNodauky ? 'btn-primary' : 'btn-light'}" onclick="goToPageNodauky(${i})">${i}</button>`;
    pagination.append(btn);
  }
}

function goToPageNodauky(page) {
  currentPageNodauky = page;
  renderPageNodauky(page);
  renderPaginationNodauky();
}

function loadNodauky() {
  $.get("/api/nodauky", function (data) {
    if (!Array.isArray(data)) {
      console.error("Dữ liệu trả về không hợp lệ:", data);
      return;
    }
    allNodauky = data;
    filteredNodauky = data;
    renderPageNodauky(currentPageNodauky);
    renderPaginationNodauky();
  }).fail(function () {
    alert("Không thể tải dữ liệu ngân hàng.");
  });
}

function myFunctionNodauky() {
  const keyword = $("#myInput").val().toLowerCase();
  filteredNodauky = allNodauky.filter(item =>
    item.MaTK.toLowerCase().includes(keyword) ||
    item.MaKH.toLowerCase().includes(keyword)
  );
  currentPageNodauky = 1;
  renderPageNodauky(currentPageNodauky);
  renderPaginationNodauky();
}

function editNodauky(id) {
  const item = allNodauky.find(d => d.ID === id);
  if (!item) return alert("Không tìm thấy dữ liệu.");

  document.getElementById('IDEdit').value = item.ID;
  document.getElementById('MaTKEdit').value = item.MaTK;
  document.getElementById('MaKHEdit').value = item.MaKH;
  document.getElementById('DuNoEdit').value = item.DuNo;
  document.getElementById('DuCoEdit').value = item.DuCo;

  $('#ModalEditNodauky').modal('show');
}

function updateNodauky() {
  const data = {
    MaTK: document.getElementById('IDEdit').value,
    TenNH: document.getElementById('MaTKEdit').value || null,
     MaKH: document.getElementById('MaKHEdit').value || null,
      DuNo: document.getElementById('DuNoEdit').value || null,
       DuCo: document.getElementById('DuCoEdit').value || null
  };

  fetch(`/api/nodauky/${data.ID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => {
    if (response.ok) {
      alert("Cập nhật thành công!");
      loadNodauky();
    } else {
      alert("Lỗi khi cập nhật dữ liệu.");S
    }
  });
}
function deleteNodauky(id) {
  if (confirm("Bạn có chắc chắn muốn xóa ngân hàng này không?")) {
    $.ajax({
      url: `/api/nodauky/${id}`,
      type: "DELETE",
      success: function () {
        alert("Đã xóa thành công!");
        loadNodauky();
      },
      error: function () {
        alert("Lỗi khi xóa ngân hàng.");
      },
    });
  }
}

function setupAddNodaukyForm() {
  const form = document.getElementById("addFormNodauky");
  if (form) {
    form.addEventListener("submitAddNodauky", function (event) {
      event.preventDefault(); // Ngăn form submit mặc định

      const formData = {
        ID: document.getElementById("IDAdd").value.trim(),
        MaTK: document.getElementById("MaTKAdd").value.trim()  || null,
        MaKH: document.getElementById("MaKHAdd").value.trim(),
        DuNo: document.getElementById("DuNoAdd").value.trim()  || null,
        DuCo: document.getElementById("DuCoAdd").value.trim() || null
      };

      fetch("/api/nodauky", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (response.ok) {
          alert("Thêm thành công!");
          $('#ModalAddNodauky').modal('hide');
          form.reset();
          loadNodauky();
        } else {
          alert("Lỗi khi thêm!");
        }
      })
      .catch(() => alert("Lỗi kết nối khi thêm."));
    });
  }
}



// ================= $(document).ready =================
$(document).ready(function () {
  loadSoDuDauKy();
  loadNodauky();
  setupAddNodaukyForm();
  setupAddSoDuDauKyForm();
});