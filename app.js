// ==========================
// DATA PRODUK
// ==========================
const products = {
  fotocopy: [
    { name: "Canon IR 3235", price: 12000000, year: 2021 },
    { name: "Fuji Xerox 3370", price: 10500000, year: 2020 }
  ],
  printer: [
    { name: "Epson L1800", price: 6500000, year: 2022 },
    { name: "Canon G3010", price: 2900000, year: 2023 }
  ],
  percetakan: [
    { name: "Riso ComColor GD", price: 45000000, year: 2020 },
    { name: "Duplo DP-U950", price: 25000000, year: 2019 }
  ]
};

const produkList = document.getElementById("produkList");
const kategoriBtn = document.querySelectorAll(".btnKategori");

// EVENT PILIH KATEGORI
kategoriBtn.forEach(btn => {
  btn.addEventListener("click", () => {
    const kat = btn.dataset.kategori;
    tampilkanProduk(products[kat]);
  });
});

// TAMPILKAN PRODUK
function tampilkanProduk(data) {
  produkList.innerHTML = "";
  data.forEach(p => {
    produkList.innerHTML += `
      <div class="produk-card">
        <h3>${p.name}</h3>
        <p>Harga: Rp ${p.price.toLocaleString()}</p>
        <p>Tahun: ${p.year}</p>
        <button class="addCart">Tambah Keranjang 🛒</button>
      </div>
    `;
  });
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

// BUKA POPUP
btnLogin.onclick = () => showPopup("login");

// TUTUP POPUP
closePopup.onclick = () => (loginPopup.style.display = "none");

// SHOW LOGIN / REGISTER MODE
function showPopup(mode) {
  loginPopup.style.display = "flex";
  loginSubmit.dataset.mode = mode;

  popupTitle.innerText = mode === "login" ? "Login" : "Register";
  loginSubmit.innerText = mode === "login" ? "Login" : "Register";
}

// SWITCH MODE LOGIN ↔ REGISTER
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

  // LOAD USER LIST
  let users = JSON.parse(localStorage.getItem("users") || "{}");

  if (mode === "register") {
    if (users[phone]) {
      alert("Nomor ini sudah terdaftar!");
      return;
    }

    // simpan user baru
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

    // simpan sesi login
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

// JALANKAN SAAT PAGE DIBUKA
updateLoginUI();