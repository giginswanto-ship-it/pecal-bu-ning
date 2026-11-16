/**
 * Self-Order Kiosk Logic (Model McD)
 * For Nasi Pecel Bu Ning's
 */

let kioskMenu = { categories: [], items: [] };
let kioskCart = [];
let kioskOrderType = 'dine-in';
let kioskCategory = 'all';
let pendingKioskItem = null;
let kioskPaymentMethod = 'QRIS';
let kioskAutoResetTimer = null;

document.addEventListener('DOMContentLoaded', () => {
  loadKioskMenu();
});

async function loadKioskMenu() {
  try {
    const res = await fetch('/api/menu');
    if (res.ok) {
      kioskMenu = await res.json();
      renderKioskCategories();
      renderKioskMenu();
    }
  } catch (err) {
    console.error('Gagal memuat menu kiosk:', err);
  }
}

function startKioskOrder(type) {
  kioskOrderType = type;
  document.getElementById('kioskOrderTypeLabel').textContent = type === 'takeaway' ? 'Bawa Pulang (Bungkus)' : 'Makan di Tempat';
  document.getElementById('kioskWelcome').style.display = 'none';
}

function resetToWelcome() {
  kioskCart = [];
  updateKioskCartUI();
  document.getElementById('kioskWelcome').style.display = 'flex';
  document.getElementById('kioskTicketScreen').style.display = 'none';
  if (kioskAutoResetTimer) clearTimeout(kioskAutoResetTimer);
}

function renderKioskCategories() {
  const bar = document.getElementById('kioskCategoryBar');
  if (!bar) return;

  const catsHTML = (kioskMenu.categories || []).map(cat => `
    <button class="cat-btn" data-cat="${cat.id}" onclick="filterKioskCategory('${cat.id}')">
      <i class="fa-solid ${cat.icon || 'fa-tag'}"></i> ${escapeHTML(cat.name)}
    </button>
  `).join('');

  bar.innerHTML = `
    <button class="cat-btn active" data-cat="all" onclick="filterKioskCategory('all')">
      <i class="fa-solid fa-border-all"></i> Semua Menu
    </button>
    ${catsHTML}
  `;
}

function filterKioskCategory(catId) {
  kioskCategory = catId;
  document.querySelectorAll('#kioskCategoryBar .cat-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.cat === catId);
  });
  renderKioskMenu();
}

function renderKioskMenu() {
  const grid = document.getElementById('kioskMenuGrid');
  if (!grid) return;

  let items = kioskMenu.items || [];
  if (kioskCategory !== 'all') {
    items = items.filter(it => it.category === kioskCategory);
  }

  grid.innerHTML = items.map(item => `
    <div class="menu-card" onclick="handleKioskItemClick('${item.id}')" style="border-radius: 18px;">
      ${item.badge ? `<span class="menu-card-badge">${escapeHTML(item.badge)}</span>` : ''}
      <img src="${item.image}" alt="${escapeHTML(item.name)}" class="menu-card-img" style="height: 145px;" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80'">
      <div class="menu-card-body">
        <h4 class="menu-card-title" style="font-size: 1.05rem;">${escapeHTML(item.name)}</h4>
        <p class="menu-card-desc">${escapeHTML(item.description)}</p>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-top: auto;">
          <div class="menu-card-price">${formatRupiah(item.price)}</div>
          <button style="background: #1b5e20; border: none; color: white; width: 34px; height: 34px; border-radius: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1rem;">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function handleKioskItemClick(itemId) {
  const item = (kioskMenu.items || []).find(it => it.id === itemId);
  if (!item) return;

  if (item.options && (item.options.spiceLevels || item.options.servingTypes)) {
    openKioskOptions(item);
  } else {
    addKioskItem({
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

function openKioskOptions(item) {
  pendingKioskItem = item;
  document.getElementById('kioskModalItemTitle').textContent = `Pilihan: ${item.name}`;

  // Spice Levels
  const spiceGroup = document.getElementById('kioskSpiceGroup');
  const spiceOptions = document.getElementById('kioskSpiceOptions');
  if (item.options && item.options.spiceLevels) {
    spiceGroup.style.display = 'block';
    spiceOptions.innerHTML = item.options.spiceLevels.map((lvl, idx) => `
      <div class="option-pill ${idx === 1 ? 'active' : ''}" onclick="selectKioskOption(this)">${escapeHTML(lvl)}</div>
    `).join('');
  } else {
    spiceGroup.style.display = 'none';
  }

  // Serving Types
  const servingGroup = document.getElementById('kioskServingGroup');
  const servingOptions = document.getElementById('kioskServingOptions');
  if (item.options && item.options.servingTypes) {
    servingGroup.style.display = 'block';
    servingOptions.innerHTML = item.options.servingTypes.map((srv, idx) => `
      <div class="option-pill ${idx === 0 ? 'active' : ''}" onclick="selectKioskOption(this)">${escapeHTML(srv)}</div>
    `).join('');
  } else {
    servingGroup.style.display = 'none';
  }

  document.getElementById('kioskItemNotes').value = '';
  document.getElementById('kioskOptionsModal').style.display = 'flex';
}

function selectKioskOption(el) {
  el.parentElement.querySelectorAll('.option-pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
}

function closeKioskOptions() {
  document.getElementById('kioskOptionsModal').style.display = 'none';
  pendingKioskItem = null;
}

function confirmKioskAddItem() {
  if (!pendingKioskItem) return;

  const activeSpice = document.querySelector('#kioskSpiceOptions .option-pill.active');
  const activeServing = document.querySelector('#kioskServingOptions .option-pill.active');
  const notes = document.getElementById('kioskItemNotes').value.trim();

  addKioskItem({
    id: pendingKioskItem.id,
    name: pendingKioskItem.name,
    price: pendingKioskItem.price,
    qty: 1,
    spiceLevel: activeSpice ? activeSpice.textContent : '',
    servingType: activeServing ? activeServing.textContent : '',
    eggType: '',
    notes: notes
  });

  closeKioskOptions();
}

function addKioskItem(newItem) {
  const existing = kioskCart.find(c => 
    c.id === newItem.id &&
    c.spiceLevel === newItem.spiceLevel &&
    c.servingType === newItem.servingType &&
    c.notes === newItem.notes
  );

  if (existing) {
    existing.qty += 1;
  } else {
    kioskCart.push(newItem);
  }

  updateKioskCartUI();
}

function updateKioskCartUI() {
  const countEl = document.getElementById('kioskCartCount');
  const totalEl = document.getElementById('kioskCartTotal');
  const btnCheckout = document.getElementById('btnKioskCheckout');

  const totalQty = kioskCart.reduce((sum, it) => sum + it.qty, 0);
  const totalPrice = kioskCart.reduce((sum, it) => sum + (it.price * it.qty), 0);

  if (countEl) countEl.textContent = totalQty;
  if (totalEl) totalEl.textContent = formatRupiah(totalPrice);
  if (btnCheckout) btnCheckout.disabled = totalQty === 0;
}

/* Review & Payment */
function openKioskReviewModal() {
  if (kioskCart.length === 0) return;

  const listEl = document.getElementById('kioskReviewItemsList');
  const totalEl = document.getElementById('kioskReviewTotal');
  const totalPrice = kioskCart.reduce((sum, it) => sum + (it.price * it.qty), 0);

  listEl.innerHTML = kioskCart.map((item, idx) => `
    <div class="cart-item">
      <div class="cart-item-header">
        <span>${escapeHTML(item.name)}</span>
        <span style="color: #4ade80;">${formatRupiah(item.price * item.qty)}</span>
      </div>
      ${item.spiceLevel || item.servingType ? `
        <div class="cart-item-sub">${item.spiceLevel ? item.spiceLevel : ''} ${item.servingType ? `• ${item.servingType}` : ''}</div>
      ` : ''}
      <div class="cart-item-controls">
        <div class="qty-control">
          <button class="btn-qty" onclick="changeKioskQty(${idx}, -1)">-</button>
          <span class="qty-text">${item.qty}</span>
          <button class="btn-qty" onclick="changeKioskQty(${idx}, 1)">+</button>
        </div>
      </div>
    </div>
  `).join('');

  totalEl.textContent = formatRupiah(totalPrice);
  document.getElementById('kioskReviewModal').style.display = 'flex';
}

function changeKioskQty(idx, delta) {
  if (kioskCart[idx]) {
    kioskCart[idx].qty += delta;
    if (kioskCart[idx].qty <= 0) {
      kioskCart.splice(idx, 1);
    }
  }
  updateKioskCartUI();
  if (kioskCart.length === 0) {
    closeKioskReview();
  } else {
    openKioskReviewModal();
  }
}

function closeKioskReview() {
  document.getElementById('kioskReviewModal').style.display = 'none';
}

function setKioskPayment(method) {
  kioskPaymentMethod = method;
  document.getElementById('payOptQRIS').classList.toggle('active', method === 'QRIS');
  document.getElementById('payOptCash').classList.toggle('active', method !== 'QRIS');
}

/* Submit Final Kiosk Order */
async function submitKioskOrder() {
  const custName = document.getElementById('kioskCustomerName').value.trim() || 'Pelanggan Mandiri';
  const btn = document.getElementById('btnKioskFinalSubmit');

  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Memproses Pesanan...';

  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerName: custName,
        orderType: kioskOrderType,
        paymentMethod: kioskPaymentMethod,
        items: kioskCart,
        notes: ''
      })
    });

    if (!res.ok) throw new Error('Gagal mengirim pesanan');

    const createdOrder = await res.json();
    closeKioskReview();

    // Show Final Confirmation Ticket Screen
    showKioskTicket(createdOrder);

  } catch (err) {
    alert(`Terjadi kesalahan: ${err.message}`);
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Konfirmasi & Cetak Nomor Antrean';
  }
}

function showKioskTicket(order) {
  document.getElementById('kioskFinalOrderNo').textContent = `#${order.orderNumber}`;
  document.getElementById('kioskFinalType').textContent = order.orderType === 'takeaway' ? 'Bawa Pulang (Bungkus)' : 'Makan di Tempat';
  document.getElementById('kioskFinalPayment').textContent = order.paymentMethod;
  document.getElementById('kioskFinalTotal').textContent = formatRupiah(order.total);

  document.getElementById('kioskTicketScreen').style.display = 'flex';

  // Automatically reset to welcome screen after 15 seconds
  if (kioskAutoResetTimer) clearTimeout(kioskAutoResetTimer);
  kioskAutoResetTimer = setTimeout(() => {
    finishKioskOrder();
  }, 15000);
}

function finishKioskOrder() {
  resetToWelcome();
}

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
