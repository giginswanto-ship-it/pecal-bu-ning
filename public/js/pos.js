/**
 * POS (Cashier) System Logic
 * For Nasi Pecel Bu Ning's
 */

let menuData = { categories: [], items: [] };
let cart = [];
let currentCategory = 'all';
let currentOrderType = 'dine-in';
let pendingItem = null;

document.addEventListener('DOMContentLoaded', () => {
  loadMenu();
});

async function loadMenu() {
  try {
    const res = await fetch('/api/menu');
    if (res.ok) {
      menuData = await res.json();
      renderCategories();
      renderMenu();
    }
  } catch (err) {
    console.error('Gagal memuat menu:', err);
  }
}

function renderCategories() {
  const bar = document.getElementById('categoryBar');
  if (!bar) return;

  const catsHTML = (menuData.categories || []).map(cat => `
    <button class="cat-btn" data-cat="${cat.id}" onclick="filterCategory('${cat.id}')">
      <i class="fa-solid ${cat.icon || 'fa-tag'}"></i> ${escapeHTML(cat.name)}
    </button>
  `).join('');

  bar.innerHTML = `
    <button class="cat-btn active" data-cat="all" onclick="filterCategory('all')">
      <i class="fa-solid fa-border-all"></i> Semua Menu
    </button>
    ${catsHTML}
  `;
}

function filterCategory(catId) {
  currentCategory = catId;
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.cat === catId);
  });
  renderMenu();
}

function renderMenu() {
  const grid = document.getElementById('menuGrid');
  if (!grid) return;

  let items = menuData.items || [];
  if (currentCategory !== 'all') {
    items = items.filter(it => it.category === currentCategory);
  }

  if (items.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <i class="fa-solid fa-box-open"></i>
        <p>Tidak ada menu pada kategori ini</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = items.map(item => `
    <div class="menu-card" onclick="handleItemClick('${item.id}')">
      ${item.badge ? `<span class="menu-card-badge">${escapeHTML(item.badge)}</span>` : ''}
      <img src="${item.image}" alt="${escapeHTML(item.name)}" class="menu-card-img" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80'">
      <div class="menu-card-body">
        <h4 class="menu-card-title">${escapeHTML(item.name)}</h4>
        <p class="menu-card-desc">${escapeHTML(item.description)}</p>
        <div class="menu-card-price">${formatRupiah(item.price)}</div>
      </div>
    </div>
  `).join('');
}

function handleItemClick(itemId) {
  const item = (menuData.items || []).find(it => it.id === itemId);
  if (!item) return;

  if (item.options && (item.options.spiceLevels || item.options.servingTypes || item.options.eggTypes)) {
    openOptionsModal(item);
  } else {
    addItemToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      qty: 1,
      spiceLevel: '',
      servingType: '',
      eggType: '',
      notes: ''
    });
  }
}

/* Customization Modal */
function openOptionsModal(item) {
  pendingItem = item;
  document.getElementById('modalItemTitle').textContent = `Kustomisasi: ${item.name}`;

  // Spice Levels
  const spiceGroup = document.getElementById('spiceGroup');
  const spiceOptions = document.getElementById('spiceOptions');
  if (item.options && item.options.spiceLevels) {
    spiceGroup.style.display = 'block';
    spiceOptions.innerHTML = item.options.spiceLevels.map((lvl, idx) => `
      <div class="option-pill ${idx === 1 ? 'active' : ''}" onclick="selectOption(this, 'spice')">${escapeHTML(lvl)}</div>
    `).join('');
  } else {
    spiceGroup.style.display = 'none';
  }

  // Serving Types
  const servingGroup = document.getElementById('servingGroup');
  const servingOptions = document.getElementById('servingOptions');
  if (item.options && item.options.servingTypes) {
    servingGroup.style.display = 'block';
    servingOptions.innerHTML = item.options.servingTypes.map((srv, idx) => `
      <div class="option-pill ${idx === 0 ? 'active' : ''}" onclick="selectOption(this, 'serving')">${escapeHTML(srv)}</div>
    `).join('');
  } else {
    servingGroup.style.display = 'none';
  }

  // Egg Types
  const eggGroup = document.getElementById('eggGroup');
  const eggOptions = document.getElementById('eggOptions');
  if (item.options && item.options.eggTypes) {
    eggGroup.style.display = 'block';
    eggOptions.innerHTML = item.options.eggTypes.map((eg, idx) => `
      <div class="option-pill ${idx === 0 ? 'active' : ''}" onclick="selectOption(this, 'egg')">${escapeHTML(eg)}</div>
    `).join('');
  } else {
    eggGroup.style.display = 'none';
  }

  document.getElementById('modalItemNotes').value = '';
  document.getElementById('optionsModal').style.display = 'flex';
}

function selectOption(el, group) {
  el.parentElement.querySelectorAll('.option-pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
}

function closeOptionsModal() {
  document.getElementById('optionsModal').style.display = 'none';
  pendingItem = null;
}

function confirmAddItem() {
  if (!pendingItem) return;

  const activeSpice = document.querySelector('#spiceOptions .option-pill.active');
  const activeServing = document.querySelector('#servingOptions .option-pill.active');
  const activeEgg = document.querySelector('#eggOptions .option-pill.active');
  const notes = document.getElementById('modalItemNotes').value.trim();

  addItemToCart({
    id: pendingItem.id,
    name: pendingItem.name,
    price: pendingItem.price,
    qty: 1,
    spiceLevel: activeSpice ? activeSpice.textContent : '',
    servingType: activeServing ? activeServing.textContent : '',
    eggType: activeEgg ? activeEgg.textContent : '',
    notes: notes
  });

  closeOptionsModal();
}

/* Cart Management */
function addItemToCart(newItem) {
  // Check if identical item (same options & notes) already exists
  const existingIdx = cart.findIndex(c => 
    c.id === newItem.id &&
    c.spiceLevel === newItem.spiceLevel &&
    c.servingType === newItem.servingType &&
    c.eggType === newItem.eggType &&
    c.notes === newItem.notes
  );

  if (existingIdx !== -1) {
    cart[existingIdx].qty += 1;
  } else {
    cart.push(newItem);
  }

  renderCart();
}

function changeQty(index, delta) {
  if (cart[index]) {
    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
  }
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

function clearCart() {
  cart = [];
  renderCart();
}

function setOrderType(type) {
  currentOrderType = type;
  document.getElementById('btnDineIn').classList.toggle('active', type === 'dine-in');
  document.getElementById('btnTakeaway').classList.toggle('active', type === 'takeaway');
}

function renderCart() {
  const listEl = document.getElementById('cartItemsList');
  const totalEl = document.getElementById('cartTotalText');
  const btnProcess = document.getElementById('btnProcessOrder');

  if (!listEl) return;

  if (cart.length === 0) {
    listEl.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-basket-shopping"></i>
        <p>Keranjang masih kosong</p>
        <span style="font-size: 0.85rem; color: #64748b;">Pilih menu di sebelah kiri untuk menambah pesanan</span>
      </div>
    `;
    totalEl.textContent = 'Rp 0';
    btnProcess.disabled = true;
    return;
  }

  let total = 0;
  listEl.innerHTML = cart.map((item, index) => {
    const subtotal = item.price * item.qty;
    total += subtotal;

    return `
      <div class="cart-item">
        <div class="cart-item-header">
          <span>${escapeHTML(item.name)}</span>
          <span style="font-family: var(--font-mono); color: #4ade80;">${formatRupiah(subtotal)}</span>
        </div>
        ${item.spiceLevel ? `<div class="cart-item-sub"><i class="fa-solid fa-pepper-hot"></i> ${escapeHTML(item.spiceLevel)}</div>` : ''}
        ${item.servingType ? `<div class="cart-item-sub"><i class="fa-solid fa-leaf"></i> ${escapeHTML(item.servingType)}</div>` : ''}
        ${item.eggType ? `<div class="cart-item-sub"><i class="fa-solid fa-egg"></i> ${escapeHTML(item.eggType)}</div>` : ''}
        ${item.notes ? `<div class="cart-item-sub" style="color: #f87171;"><i class="fa-solid fa-pen"></i> "${escapeHTML(item.notes)}"</div>` : ''}

        <div class="cart-item-controls">
          <div class="qty-control">
            <button class="btn-qty" onclick="changeQty(${index}, -1)">-</button>
            <span class="qty-text">${item.qty}</span>
            <button class="btn-qty" onclick="changeQty(${index}, 1)">+</button>
          </div>
          <button class="btn-icon" style="width: 26px; height: 26px; font-size: 0.8rem; background: rgba(239, 68, 68, 0.2); color: #ef4444;" onclick="removeItem(${index})">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');

  totalEl.textContent = formatRupiah(total);
  btnProcess.disabled = false;
}

/* Process Order & Receipt Generation */
async function processOrder() {
  if (cart.length === 0) return;

  const customerName = document.getElementById('customerNameInput').value.trim();
  const paymentMethod = document.getElementById('paymentMethodSelect').value;
  const btnProcess = document.getElementById('btnProcessOrder');

  btnProcess.disabled = true;
  btnProcess.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengirim Pesanan...';

  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerName: customerName,
        orderType: currentOrderType,
        paymentMethod: paymentMethod,
        items: cart,
        notes: ''
      })
    });

    if (!res.ok) {
      throw new Error('Gagal memproses pesanan di server');
    }

    const createdOrder = await res.json();

    // Show Receipt Modal
    showReceiptModal(createdOrder);

    // Reset Form
    clearCart();
    document.getElementById('customerNameInput').value = '';
  } catch (err) {
    alert(`Terjadi kesalahan: ${err.message}`);
  } finally {
    btnProcess.disabled = false;
    btnProcess.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Kirim Pesanan & Cetak Struk';
  }
}

function showReceiptModal(order) {
  document.getElementById('receiptOrderNo').textContent = `#${order.orderNumber}`;
  document.getElementById('receiptOrderType').textContent = order.orderType === 'takeaway' ? 'BUNGKUS (BAWA PULANG)' : 'MAKAN DI TEMPAT';
  document.getElementById('receiptPayment').textContent = order.paymentMethod;
  document.getElementById('receiptTotalAmount').textContent = formatRupiah(order.total);

  const now = new Date(order.createdAt);
  document.getElementById('receiptTimestamp').textContent = now.toLocaleString('id-ID');

  const itemsListEl = document.getElementById('receiptItemsList');
  itemsListEl.innerHTML = (order.items || []).map(it => `
    <div class="receipt-item-line">
      <span>${it.qty}x ${escapeHTML(it.name)}</span>
      <span>${formatRupiah(it.price * it.qty)}</span>
    </div>
    ${it.spiceLevel || it.servingType ? `
      <div style="font-size: 0.72rem; color: #555; padding-left: 14px; margin-bottom: 2px;">
        ${it.spiceLevel ? `• ${it.spiceLevel} ` : ''}${it.servingType ? `• ${it.servingType}` : ''}
      </div>
    ` : ''}
  `).join('');

  document.getElementById('receiptModal').style.display = 'flex';
}

function closeReceiptModal() {
  document.getElementById('receiptModal').style.display = 'none';
}

/* Helpers */
function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(number);
}

function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
