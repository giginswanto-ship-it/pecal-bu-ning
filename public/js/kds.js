/**
 * Kitchen Display System (KDS) Logic
 * For Nasi Pecel Bu Ning's
 */

let socket;
let kdsOrders = [];
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
  initSocket();
  loadKdsOrders();
  setInterval(updateTimers, 1000);
});

function initSocket() {
  if (typeof io !== 'undefined') {
    socket = io();

    socket.on('orders:sync', (orders) => {
      kdsOrders = orders || [];
      renderKDS();
    });

    socket.on('order:created', (newOrder) => {
      // Play a short alert chime for the kitchen staff
      if (window.soundManager) {
        window.soundManager.playChime();
      }
      kdsOrders.unshift(newOrder);
      renderKDS();
    });

    socket.on('order:updated', (updatedOrder) => {
      const idx = kdsOrders.findIndex(o => o.id === updatedOrder.id);
      if (idx !== -1) {
        kdsOrders[idx] = updatedOrder;
      }
      renderKDS();
    });
  } else {
    setInterval(loadKdsOrders, 3000);
  }
}

async function loadKdsOrders() {
  try {
    const res = await fetch('/api/orders');
    if (res.ok) {
      kdsOrders = await res.json();
      renderKDS();
    }
  } catch (err) {
    console.warn('Gagal memuat pesanan dapur:', err);
  }
}

function setFilter(filter) {
  currentFilter = filter;
  document.querySelectorAll('.filter-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
  renderKDS();
}

function renderKDS() {
  const grid = document.getElementById('kdsGrid');
  if (!grid) return;

  // Active orders only: preparing and ready
  const activeOrders = kdsOrders.filter(o => o.status === 'preparing' || o.status === 'ready');
  const prepOrders = activeOrders.filter(o => o.status === 'preparing');
  const readyOrders = activeOrders.filter(o => o.status === 'ready');

  // Update Counters
  document.getElementById('countAll').textContent = activeOrders.length;
  document.getElementById('countPrep').textContent = prepOrders.length;
  document.getElementById('countReadyKds').textContent = readyOrders.length;

  let filtered = activeOrders;
  if (currentFilter === 'preparing') filtered = prepOrders;
  if (currentFilter === 'ready') filtered = readyOrders;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1; min-height: 400px;">
        <i class="fa-solid fa-check-double" style="color: #4ade80;"></i>
        <p style="font-size: 1.3rem; color: #cbd5e1;">Semua Pesanan Bersih!</p>
        <span style="color: #64748b; font-size: 0.95rem;">Tidak ada tiket pesanan aktif pada filter ini.</span>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(order => {
    const elapsedMinutes = getElapsedMinutes(order.createdAt);
    let timerClass = 'timer-green';
    if (elapsedMinutes >= 10) timerClass = 'timer-red';
    else if (elapsedMinutes >= 5) timerClass = 'timer-yellow';

    return `
      <div class="kds-card status-${order.status}" id="card-${order.id}">
        <div class="kds-card-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="kds-order-no">#${escapeHTML(order.orderNumber)}</span>
            <span class="order-tag ${order.orderType || 'dine-in'}">
              ${order.orderType === 'takeaway' ? 'Bungkus' : 'Makan Sini'}
            </span>
          </div>
          <div class="kds-timer-badge ${timerClass}" data-created="${order.createdAt}">
            <i class="fa-regular fa-clock"></i>
            <span class="timer-value">${formatTimer(order.createdAt)}</span>
          </div>
        </div>

        <div class="kds-customer-info">
          <span><i class="fa-regular fa-user"></i> ${escapeHTML(order.customerName)}</span>
          <span style="color: #94a3b8;"><i class="fa-regular fa-credit-card"></i> ${escapeHTML(order.paymentMethod || 'Tunai')}</span>
        </div>

        <div class="kds-items-list">
          ${(order.items || []).map(item => `
            <div class="kds-item-row">
              <div class="kds-item-qty">${item.qty || 1}x</div>
              <div class="kds-item-details">
                <div class="kds-item-name">${escapeHTML(item.name)}</div>
                ${item.spiceLevel ? `<div class="kds-item-sub"><i class="fa-solid fa-pepper-hot"></i> ${escapeHTML(item.spiceLevel)}</div>` : ''}
                ${item.servingType ? `<div class="kds-item-sub"><i class="fa-solid fa-leaf"></i> ${escapeHTML(item.servingType)}</div>` : ''}
                ${item.eggType ? `<div class="kds-item-sub"><i class="fa-solid fa-egg"></i> ${escapeHTML(item.eggType)}</div>` : ''}
                ${item.notes ? `<div class="kds-item-note"><i class="fa-solid fa-pen"></i> "${escapeHTML(item.notes)}"</div>` : ''}
              </div>
            </div>
          `).join('')}

          ${order.notes ? `
            <div style="background: rgba(239, 68, 68, 0.15); border: 1px dashed #ef4444; border-radius: 8px; padding: 8px; margin-top: 8px; font-size: 0.85rem; color: #fca5a5;">
              <strong>Catatan Pesanan:</strong> ${escapeHTML(order.notes)}
            </div>
          ` : ''}
        </div>

        <div class="kds-card-footer">
          ${order.status === 'preparing' ? `
            <button class="btn-kds btn-kds-call" onclick="updateOrderStatus('${order.id}', 'ready')">
              <i class="fa-solid fa-bell"></i> Panggil / Siap Diambil
            </button>
          ` : `
            <button class="btn-kds btn-kds-recall" onclick="recallOrder('${order.id}')" title="Ulangi Suara Panggilan di TV">
              <i class="fa-solid fa-volume-high"></i> Panggil Ulang
            </button>
            <button class="btn-kds btn-kds-complete" onclick="updateOrderStatus('${order.id}', 'completed')">
              <i class="fa-solid fa-check"></i> Selesai
            </button>
          `}
        </div>
      </div>
    `;
  }).join('');
}

/* Elapsed Timer Calculation */
function getElapsedMinutes(createdAt) {
  if (!createdAt) return 0;
  const created = new Date(createdAt).getTime();
  const now = Date.now();
  return Math.floor((now - created) / 60000);
}

function formatTimer(createdAt) {
  if (!createdAt) return '00:00';
  const created = new Date(createdAt).getTime();
  const diffSec = Math.max(0, Math.floor((Date.now() - created) / 1000));
  const m = Math.floor(diffSec / 60);
  const s = diffSec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function updateTimers() {
  document.querySelectorAll('.kds-timer-badge').forEach(badge => {
    const createdAt = badge.dataset.created;
    const valueEl = badge.querySelector('.timer-value');
    if (valueEl && createdAt) {
      valueEl.textContent = formatTimer(createdAt);
      const m = getElapsedMinutes(createdAt);
      badge.classList.remove('timer-green', 'timer-yellow', 'timer-red');
      if (m >= 10) badge.classList.add('timer-red');
      else if (m >= 5) badge.classList.add('timer-yellow');
      else badge.classList.add('timer-green');
    }
  });
}

/* Status Update Actions */
async function updateOrderStatus(orderId, newStatus) {
  try {
    const res = await fetch(`/api/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    if (!res.ok) throw new Error('Gagal memperbarui status');
    loadKdsOrders();
  } catch (err) {
    alert(`Terjadi kesalahan: ${err.message}`);
  }
}

async function recallOrder(orderId) {
  try {
    const res = await fetch(`/api/orders/${orderId}/call`, {
      method: 'POST'
    });
    if (!res.ok) throw new Error('Gagal memanggil pesanan');
  } catch (err) {
    alert(`Terjadi kesalahan: ${err.message}`);
  }
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
