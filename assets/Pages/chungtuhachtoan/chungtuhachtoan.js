// ================= PHÂN TRANG CHUNG =================
const pageSize = 5;
let currentPageGBC = 1;
let currentPageGBN = 1;
let currentPagePCT = 1;
let currentPagePTT = 1;
let allGBC = [];
let allGBN = [];
let allPCT = [];
let allPTT = [];
let filteredGBC = [];    // dữ liệu sau lọc
let filteredGBN = [];    // dữ liệu sau lọc
let filteredPCT = [];    // dữ liệu sau lọc
let filteredPTT = [];    // dữ liệu sau lọc

// ================= GIẤY BÁO CÓ =================
function renderPageGBC(page) {
  const start = (page - 1) * pageSize;
  const pageData = filteredGBC.slice(start, start + pageSize);
  const tbody = $("#GBCTable tbody");
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
            <button class="btn btn-primary btn-sm" onclick="detailGBC('${item.SoCT}')"><i class="fas fa-book"></i></button>
          <button class="btn btn-primary btn-sm" onclick="editGBC('${item.SoCT}')"><i class="fas fa-edit"></i></button>
          <button class="btn btn-danger btn-sm" onclick="deletGBC('${item.SoCT}')"><i class="fas fa-trash-alt"></i></button>
        </td>
      </tr>`;
    tbody.append(row);
  });
}

function renderPaginationGBC() {
  const totalPages = Math.ceil(filteredGBC.length / pageSize);
  const pagination = $("#paginationGBC");
  pagination.empty();

  for (let i = 1; i <= totalPages; i++) {
    const btn = `<button class="btn btn-sm ${i === currentPageGBC ? 'btn-primary' : 'btn-light'}" onclick="goToPageGBC(${i})">${i}</button>`;
    pagination.append(btn);
  }
}

function goToPageGBC(page) {
    currentPageGBC = page;
  renderPageGBC(page);
  renderPaginationGBC();
}

function loadGBC() {
  $.get("/api/gbc", function (data) {
    if (!Array.isArray(data)) {
      console.error("Dữ liệu trả về không hợp lệ:", data);
      return;
    }
    allGBC = data;
    filteredGBC = data;
    renderPageGBC(currentPageGBC);
    renderPaginationGBC();
  }).fail(function () {
    alert("Không thể tải dữ liệu hóa đơn giá trị gia tăng.");
  });
}

function myFunctionGBC() {
    const keyword = $("#myInput").val().toLowerCase();
    filteredGBC = allGBC.filter(item =>
      item.SoCT.toLowerCase().includes(keyword) ||
      item.LyDo.toLowerCase().includes(keyword) 
    );
    currentPageGBC = 1;
    renderPageGBC(currentPageGBC);
    renderPaginationGBC();
  }
  
  function detailGBC(soct) {
    window.open(`formgiaybaoco.html?soct=${soct}`, '_blank');
  }  

// ================= GIẤY BÁO NỢ =================
function renderPageGBN(page) {
    const start = (page - 1) * pageSize;
    const pageData = filteredGBN.slice(start, start + pageSize);
    const tbody = $("#GBNTable tbody");
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
              <button class="btn btn-primary btn-sm" onclick="detailGBN('${item.SoCT}')"><i class="fas fa-book"></i></button>
            <button class="btn btn-primary btn-sm" onclick="editGBN('${item.SoCT}')"><i class="fas fa-edit"></i></button>
            <button class="btn btn-danger btn-sm" onclick="deletGBN('${item.SoCT}')"><i class="fas fa-trash-alt"></i></button>
          </td>
        </tr>`;
      tbody.append(row);
    });
  }
  
  function renderPaginationGBN() {
    const totalPages = Math.ceil(filteredGBN.length / pageSize);
    const pagination = $("#paginationGBN");
    pagination.empty();
  
    for (let i = 1; i <= totalPages; i++) {
      const btn = `<button class="btn btn-sm ${i === currentPageGBN ? 'btn-primary' : 'btn-light'}" onclick="goToPageGBN(${i})">${i}</button>`;
      pagination.append(btn);
    }
  }
  
  function goToPageGBN(page) {
      currentPageGBN = page;
    renderPageGBN(page);
    renderPaginationGBN();
  }
  
  function loadGBN() {
    $.get("/api/gbn", function (data) {
      if (!Array.isArray(data)) {
        console.error("Dữ liệu trả về không hợp lệ:", data);
        return;
      }
      allGBN = data;
      filteredGBN = data;
      renderPageGBN(currentPageGBN);
      renderPaginationGBN();
    }).fail(function () {
      alert("Không thể tải dữ liệu hóa đơn giá trị gia tăng.");
    });
  }
  
  function myFunctionGBN() {
      const keyword = $("#myInput").val().toLowerCase();
      filteredGBN = allGBN.filter(item =>
        item.SoCT.toLowerCase().includes(keyword) ||
        item.LyDo.toLowerCase().includes(keyword) 
      );
      currentPageGBN = 1;
      renderPageGBN(currentPageGBN);
      renderPaginationGBN();
    }
    
  function detailGBN(soct) {
      window.open(`formgiaybaono.html?soct=${soct}`, '_blank');
  }

  // ================= PHIẾU CHI TIỀN =================
function renderPagePCT(page) {
    const start = (page - 1) * pageSize;
    const pageData = filteredPCT.slice(start, start + pageSize);
    const tbody = $("#PCTTable tbody");
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
              <button class="btn btn-primary btn-sm" onclick="detailPCT('${item.SoCT}')"><i class="fas fa-book"></i></button>
            <button class="btn btn-primary btn-sm" onclick="editPCT('${item.SoCT}')"><i class="fas fa-edit"></i></button>
            <button class="btn btn-danger btn-sm" onclick="deletPCT('${item.SoCT}')"><i class="fas fa-trash-alt"></i></button>
          </td>
        </tr>`;
      tbody.append(row);
    });
  }
  
  function renderPaginationPCT() {
    const totalPages = Math.ceil(filteredPCT.length / pageSize);
    const pagination = $("#paginationPCT");
    pagination.empty();
  
    for (let i = 1; i <= totalPages; i++) {
      const btn = `<button class="btn btn-sm ${i === currentPagePCT ? 'btn-primary' : 'btn-light'}" onclick="goToPagePCT(${i})">${i}</button>`;
      pagination.append(btn);
    }
  }
  
  function goToPagePCT(page) {
      currentPagePCT = page;
    renderPagePCT(page);
    renderPaginationPCT();
  }
  
  function loadPCT() {
    $.get("/api/pct", function (data) {
      if (!Array.isArray(data)) {
        console.error("Dữ liệu trả về không hợp lệ:", data);
        return;
      }
      allPCT = data;
      filteredPCT = data;
      renderPagePCT(currentPagePCT);
      renderPaginationPCT();
    }).fail(function () {
      alert("Không thể tải dữ liệu hóa đơn giá trị gia tăng.");
    });
  }
  
  function myFunctionPCT() {
      const keyword = $("#myInput").val().toLowerCase();
      filteredPCT = allPCT.filter(item =>
        item.SoCT.toLowerCase().includes(keyword) ||
        item.LyDo.toLowerCase().includes(keyword) 
      );
      currentPagePCT = 1;
      renderPagePCT(currentPagePCT);
      renderPaginationPCT();
    }
    
  function detailPCT(soct) {
      window.open(`formphieuchitien.html?soct=${soct}`, '_blank');
  }

  // ================= PHIẾU THU TIỀN =================
function renderPagePTT(page) {
    const start = (page - 1) * pageSize;
    const pageData = filteredPTT.slice(start, start + pageSize);
    const tbody = $("#PTTTable tbody");
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
              <button class="btn btn-primary btn-sm" onclick="detailPTT('${item.SoCT}')"><i class="fas fa-book"></i></button>
            <button class="btn btn-primary btn-sm" onclick="editPTT('${item.SoCT}')"><i class="fas fa-edit"></i></button>
            <button class="btn btn-danger btn-sm" onclick="deletPTT('${item.SoCT}')"><i class="fas fa-trash-alt"></i></button>
          </td>
        </tr>`;
      tbody.append(row);
    });
  }
  
  function renderPaginationPTT() {
    const totalPages = Math.ceil(filteredPTT.length / pageSize);
    const pagination = $("#paginationPTT");
    pagination.empty();
  
    for (let i = 1; i <= totalPages; i++) {
      const btn = `<button class="btn btn-sm ${i === currentPagePTT ? 'btn-primary' : 'btn-light'}" onclick="goToPagePTT(${i})">${i}</button>`;
      pagination.append(btn);
    }
  }
  
  function goToPagePTT(page) {
      currentPagePTT = page;
    renderPagePTT(page);
    renderPaginationPTT();
  }
  
  function loadPTT() {
    $.get("/api/ptt", function (data) {
      if (!Array.isArray(data)) {
        console.error("Dữ liệu trả về không hợp lệ:", data);
        return;
      }
      allPTT = data;
      filteredPTT = data;
      renderPagePTT(currentPagePTT);
      renderPaginationPTT();
    }).fail(function () {
      alert("Không thể tải dữ liệu hóa đơn giá trị gia tăng.");
    });
  }
  
  function myFunctionPTT() {
      const keyword = $("#myInput").val().toLowerCase();
      filteredPTT = allPTT.filter(item =>
        item.SoCT.toLowerCase().includes(keyword) ||
        item.LyDo.toLowerCase().includes(keyword) 
      );
      currentPagePTT = 1;
      renderPagePTT(currentPagePTT);
      renderPaginationPTT();
    }
    
  function detailPTT(soct) {
      window.open(`formphieuthutien.html?soct=${soct}`, '_blank');
  }

// ================= $(document).ready =================
$(document).ready(function () {
    loadGBC();
    loadGBN();
    loadPTT();
    loadPCT();
});