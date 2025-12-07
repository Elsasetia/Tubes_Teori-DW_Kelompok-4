// ==========================
// DATA PRODUK
// ==========================
const products = {
  fotocopy: [
    { 
      name: "HP LaserJet Pro MFP M28w",
      price: 2000000,
      year: 2023,
      spec: "Print • Scan • Copy • Wireless",
      img: "img/m28w.jpg"
    },
    { 
      name: "HP LaserJet Pro MFP M225dn",
      price: 25700000,
      year: 2022,
      spec: "Duplex • Network • Print/Scan/Copy",
      img: "img/m225dn.jpg"
    },
    { 
      name: "HP LaserJet P3010 Series",
      price: 2500000,
      year: 2021,
      spec: "Print Only • Heavy Duty",
      img: "img/p3010.jpg"
    },
    { 
      name: "HP Color LaserJet Pro MFP M477fdw",
      price: 6800000,
      year: 2022,
      spec: "Warna • Duplex • WiFi",
      img: "img/m477fdw.jpg"
    },
    { 
      name: "HP LaserJet Pro MFP 3101sdw",
      price: 2000000,
      year: 2023,
      spec: "Print/Scan/Copy • Wireless",
      img: "img/3101sdw.jpg"
    },
    { 
      name: "HP LaserJet M110we",
      price: 6000000,
      year: 2023,
      spec: "Print Only • Wireless",
      img: "img/m110we.jpg"
    },
    { 
      name: "HP LaserJet Pro 4002dw",
      price: 6000000,
      year: 2023,
      spec: "Duplex • WiFi",
      img: "img/4002dw.jpg"
    }
  ],

  printer: [
    { name: "Epson L1800", price: 6500000, year: 2022, img: "img/printer1.jpg", spec:"Printer Warna A3" },
    { name: "Canon G3010", price: 2900000, year: 2023, img: "img/printer2.jpg", spec:"Printer Ink Tank" }
  ],

  percetakan: [
    { name: "Riso ComColor GD", price: 45000000, year: 2020, img:"img/percetakan1.jpg", spec:"Mesin Cetak Kecepatan Tinggi" },
    { name: "Duplo DP-U950", price: 25000000, year: 2019, img:"img/percetakan2.jpg", spec:"Mesin Duplikasi Digital" }
  ]
};

const produkList = document.getElementById("produkList");
const kategoriBtn = document.querySelectorAll(".btnKategori");

// ==========================
// SISTEM KERANJANG
// ==========================
let cartItems = [];
let cartCount = 0;
const cartDisplay = document.getElementById("cartCount");

function addToCart(p) {
  const auth = JSON.parse(localStorage.getItem("auth"));
  if (!auth) {
    alert("Silakan login untuk menambahkan ke keranjang!");
    showPopup("login");
    return;
  }

  cartCount++;
  cartDisplay.innerText = cartCount;

  let item = cartItems.find(i => i.name === p.name);

  if (item) {
      item.qty++;
  } else {
      cartItems.push({
          name: p.name,
          price: p.price,
          img: p.img,
          qty: 1
      });
  }

  renderCart();
}

function renderCart() {
  const cartList = document.getElementById("cartList");
  const cartTotal = document.getElementById("cartTotal");

  cartList.innerHTML = "";
  let total = 0;

  cartItems.forEach(item => {
      total += item.price * item.qty;

      cartList.innerHTML += `
          <div class="cart-item">
              <img src="${item.img}">
              <div>
                  <h4>${item.name}</h4>
                  <p>Harga: Rp ${item.price.toLocaleString()}</p>
                  <p>Qty: ${item.qty}</p>
              </div>
          </div>
      `;
  });

  cartTotal.innerText = "Total: Rp " + total.toLocaleString();
}

function openCart() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  if (!auth) {
    alert("Silakan login untuk melihat keranjang!");
    showPopup("login");
    return;
  }

  document.getElementById("cartPopup").style.display = "flex";
  renderCart();
}

function closeCart() {
  document.getElementById("cartPopup").style.display = "none";
}


// ==========================
// EVENT PILIH KATEGORI
// ==========================
kategoriBtn.forEach(btn => {
  btn.addEventListener("click", () => {
    const kat = btn.dataset.kategori;
    tampilkanProduk(products[kat]);
  });
});


// ==========================
// TAMPILKAN PRODUK (GRID 4 ATAS 3 BAWAH)
// ==========================
function tampilkanProduk(data) {
  produkList.innerHTML = "";

  data.forEach(p => {
    produkList.innerHTML += `
      <div class="produk-card">
        <img src="${p.img}" class="produk-img" onclick='openDetail(${JSON.stringify(p)})'>
        <h3>${p.name}</h3>
        <p>Harga: Rp ${p.price.toLocaleString()}</p>
        <p>Tahun: ${p.year}</p>
      </div>
    `;
  });
}


// ==========================
// POPUP DETAIL PRODUK
// ==========================
function openDetail(p) {
  const auth = JSON.parse(localStorage.getItem("auth"));
  if (!auth) {
    alert("Silakan login terlebih dahulu untuk melihat detail produk!");
    showPopup("login");
    return;
  }

  document.getElementById("popupDetail").style.display = "flex";

  document.getElementById("detailImg").src = p.img;
  document.getElementById("detailName").innerText = p.name;
  document.getElementById("detailPrice").innerText = "Harga: Rp " + p.price.toLocaleString();
  document.getElementById("detailSpec").innerText = "Spesifikasi: " + p.spec;
  document.getElementById("detailRating").innerText = "Rating: ⭐⭐⭐⭐⭐";

  document.getElementById("addCartDetail").onclick = () => {
    addToCart(p);
    alert(p.name + " ditambahkan ke keranjang!");
  };
}

function closeDetail() {
  document.getElementById("popupDetail").style.display = "none";
}



// ================================
// LOGIN SYSTEM (LOCALSTORAGE)
// ================================
const loginPopup = document.getElementById("loginPopup");
const btnLogin = document.getElementById("btnLogin");
const loginSubmit = document.getElementById("loginSubmit");
const registerBtn = document.getElementById("registerBtn");
const closePopup = document.getElementById("closePopup");
const popupTitle = document.getElementById("popupTitle");

// BUKA POPUP LOGIN
btnLogin.onclick = () => showPopup("login");

// TUTUP POPUP LOGIN
closePopup.onclick = () => (loginPopup.style.display = "none");

// MODE LOGIN / REGISTER
function showPopup(mode) {
  loginPopup.style.display = "flex";
  loginSubmit.dataset.mode = mode;

  popupTitle.innerText = mode === "login" ? "Login" : "Register";
  loginSubmit.innerText = mode === "login" ? "Login" : "Register";
}

registerBtn.onclick = () => {
  const mode = loginSubmit.dataset.mode === "login" ? "register" : "login";
  showPopup(mode);
};


// SUBMIT LOGIN / REGISTER
loginSubmit.onclick = () => {
  const phone = document.getElementById("loginPhone").value.trim();
  const pass = document.getElementById("loginPass").value.trim();
  const mode = loginSubmit.dataset.mode;

  if (!phone || !pass) {
    alert("Nomor dan password wajib diisi!");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "{}");

  if (mode === "register") {
    if (users[phone]) {
      alert("Nomor ini sudah terdaftar!");
      return;
    }

    users[phone] = { phone, pass };
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registrasi berhasil, silakan login.");
    showPopup("login");
  }

  if (mode === "login") {
    if (!users[phone] || users[phone].pass !== pass) {
      alert("Nomor atau password salah.");
      return;
    }

    localStorage.setItem("auth", JSON.stringify({ phone }));

    loginPopup.style.display = "none";
    updateLoginUI();
  }
};


// UPDATE UI SETELAH LOGIN / LOGOUT
function updateLoginUI() {
  const auth = JSON.parse(localStorage.getItem("auth"));

  if (auth) {
    btnLogin.innerText = `Logout (${auth.phone})`;
    btnLogin.onclick = () => {
      localStorage.removeItem("auth");
      location.reload();
    };
  } else {
    btnLogin.innerText = "Login";
    btnLogin.onclick = () => showPopup("login");
  }
}

updateLoginUI();
