APP.JS
// ==========================
// DATA PRODUK
// ==========================
const products = {

  // ======================
  // MESIN FOTOCOPY
  // ======================
  fotocopy: [
    { 
      name: "HP LaserJet Pro MFP M28w",
      price: 2000000,
      year: 2023,
      spec: "Print • Scan • Copy • Wireless",
      img: "img/fotocopy/M28w.jpg"
    },
    { 
      name: "HP LaserJet Pro MFP M225dn",
      price: 25700000,
      year: 2022,
      spec: "Duplex • Network • Print/Scan/Copy",
      img: "img/fotocopy/M225dn.jpg"
    },
    { 
      name: "HP LaserJet P3010 Series",
      price: 2500000,
      year: 2021,
      spec: "Print Only • Heavy Duty",
      img: "img/fotocopy/P3010.jpg"
    },
    { 
      name: "HP Color LaserJet Pro MFP M477fdw",
      price: 6800000,
      year: 2022,
      spec: "Warna • Duplex • WiFi",
      img: "img/fotocopy/M477fdw.jpg"
    },
    { 
      name: "HP LaserJet Pro MFP 3101sdw",
      price: 2000000,
      year: 2023,
      spec: "Print/Scan/Copy • Wireless",
      img: "img/fotocopy/3101sdw.jpg"
    },
    { 
      name: "HP LaserJet M110we",
      price: 6000000,
      year: 2023,
      spec: "Print Only • Wireless",
      img: "img/fotocopy/M110we.jpg"
    },
    { 
      name: "HP LaserJet Pro 4002dw",
      price: 6000000,
      year: 2023,
      spec: "Duplex • WiFi",
      img: "img/fotocopy/4002dw.jpg"
    }
  ],


  // ======================
  // PRINTER (sesuai foldermu)
  // ======================
  printer: [
    { 
      name: "Epson EcoTank Pro ET-5880",
      price: 15800000,
      year: 2023,
      spec:"Print • Scan • Copy • Fax • InkTank",
      img: "img/printer/ET-5880.jpg"
    },
    { 
      name: "Epson FastFoto FF-680W",
      price: 7200000,
      year: 2022,
      spec:"High Speed Photo Scanner • Wireless",
      img: "img/printer/FF-680W.jpg"
    },
    { 
      name: "Epson EcoTank L2310",
      price: 2500000,
      year: 2023,
      spec:"Print • Scan • Copy • InkTank",
      img: "img/printer/L2310.jpg"
    },
    { 
      name: "Epson EcoTank L3210",
      price: 2800000,
      year: 2023,
      spec:"Print • Scan • Copy • Hemat Tinta",
      img: "img/printer/L3210.jpg"
    },
    { 
      name: "Epson EcoTank L5290",
      price: 3600000,
      year: 2023,
      spec:"Print • Scan • Copy • Fax • WiFi",
      img: "img/printer/L5290.jpg"
    },
    { 
      name: "Epson SureColor SCT5160",
      price: 22500000,
      year: 2022,
      spec:"Large Format Printer • PrecisionCore",
      img: "img/printer/SCT5160.jpg"
    }
  ],


  // ======================
  // MESIN PERCETAKAN
  // ======================
  percetakan: [
    { 
      name: "Riso ComColor GD",
      price: 45000000,
      year: 2020,
      img:"img/percetakan/percetakan1.jpg",
      spec:"Mesin Cetak Kecepatan Tinggi • Full Color"
    },
    { 
      name: "Duplo DP-U950",
      price: 25000000,
      year: 2019,
      img:"img/percetakan/percetakan2.jpg",
      spec:"Mesin Duplikasi Digital • Volume Besar"
    }
  ]
};


const produkList = document.getElementById("produkList");
const kategoriBtn = document.querySelectorAll(".btnKategori");


// ==========================
// SISTEM KERANJANG
// ==========================
let cartItems = [];
const cartDisplay = document.getElementById("cartCount");

function renderCart() {
  const cartList = document.getElementById("cartList");
  const cartTotal = document.getElementById("cartTotal");

  cartList.innerHTML = "";
  let total = 0;
  let totalQty = 0;

  cartItems.forEach((item, index) => {
    total += item.price * item.qty;
    totalQty += item.qty;

    cartList.innerHTML += `
      <div class="cart-item">
        <img src="${item.img}">
        <div style="flex:1;">
          <h4>${item.name}</h4>
          <p>Harga: Rp ${item.price.toLocaleString()}</p>

          <div style="display:flex;align-items:center;gap:10px;">
            <button class="qtyBtn" onclick="decreaseQty(${index})">−</button>
            <span>${item.qty}</span>
            <button class="qtyBtn" onclick="increaseQty(${index})">+</button>
          </div>
        </div>
      </div>
    `;
  });

  cartTotal.innerText = "Total: Rp " + total.toLocaleString();
  cartDisplay.innerText = totalQty;
}

function addToCart(p) {
  const auth = JSON.parse(localStorage.getItem("auth"));
  if (!auth) {
    alert("Silakan login untuk menambahkan ke keranjang!");
    showPopup("login");
    return;
  }

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

function increaseQty(i) {
  cartItems[i].qty++;
  renderCart();
}

function decreaseQty(i) {
  cartItems[i].qty--;
  if (cartItems[i].qty <= 0) cartItems.splice(i, 1);
  renderCart();
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
// TAMPILKAN PRODUK
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

kategoriBtn.forEach(btn => {
  btn.addEventListener("click", () => {
    tampilkanProduk(products[btn.dataset.kategori]);
  });
});


// ==========================
// POPUP DETAIL PRODUK
// ==========================
function openDetail(p) {
  const auth = JSON.parse(localStorage.getItem("auth"));
  if (!auth) {
    alert("Silakan login dulu sebelum melihat detail produk!");
    showPopup("login");
    return;
  }

  document.getElementById("popupDetail").style.display = "flex";

  document.getElementById("detailImg").src = p.img;
  document.getElementById("detailName").innerText = p.name;
  document.getElementById("detailPrice").innerText = "Harga: Rp " + p.price.toLocaleString();

  const specText = `
    <b>Spesifikasi:</b><br>${p.spec}<br><br>
    <b>Fungsi Spesifikasi:</b><br>
    ${p.spec.toLowerCase().includes("ink") ? "- Hemat tinta (InkTank kapasitas besar).<br>" : ""}
    ${p.spec.toLowerCase().includes("scan") ? "- Bisa scan ke PDF/JPG.<br>" : ""}
    ${p.spec.toLowerCase().includes("copy") ? "- Fotokopi cepat tanpa komputer.<br>" : ""}
    ${p.spec.toLowerCase().includes("wireless") ? "- Bisa print dari HP tanpa kabel.<br>" : ""}
    ${p.spec.toLowerCase().includes("duplex") ? "- Cetak bolak balik otomatis.<br>" : ""}
    ${p.spec.toLowerCase().includes("fax") ? "- Bisa kirim fax langsung dari printer.<br>" : ""}
  `;

  document.getElementById("detailSpec").innerHTML = specText;
  document.getElementById("detailRating").innerText = "Rating: ⭐⭐⭐⭐⭐";

  document.getElementById("addCartDetail").onclick = () => {
    addToCart(p);
    alert(p.name + " berhasil ditambahkan ke keranjang!");
  };
}

function closeDetail() {
  document.getElementById("popupDetail").style.display = "none";
}


// ==========================
// LOGIN SYSTEM
// ==========================
const loginPopup = document.getElementById("loginPopup");
const btnLogin = document.getElementById("btnLogin");
const loginSubmit = document.getElementById("loginSubmit");
const registerBtn = document.getElementById("registerBtn");
const closePopup = document.getElementById("closePopup");
const popupTitle = document.getElementById("popupTitle");

btnLogin.onclick = () => showPopup("login");
closePopup.onclick = () => (loginPopup.style.display = "none");

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

function updateLoginUI() {
  const auth = JSON.parse(localStorage.getItem("auth"));

  if (auth) {
    btnLogin.innerText = Logout (${auth.phone});
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