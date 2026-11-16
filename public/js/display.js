/**
 * Display TV Logic (McDonald's Style Order Board)
 * For Nasi Pecel Bu Ning's - Resilient Edition
 */

const DEFAULT_ORDERS_DISPLAY = [
  { orderNumber: "101", orderType: "dine-in", status: "ready" },
  { orderNumber: "102", orderType: "takeaway", status: "ready" },
  { orderNumber: "103", orderType: "dine-in", status: "preparing" },
  { orderNumber: "104", orderType: "takeaway", status: "preparing" }
];

let socket;
let broadcastChannel;
let currentOrders = [];
let newlyReadyOrders = new Set();
let promoIndex = 0;
let popupTimeout = null;

const promoItems = [
  "<span>Paket Mantap Bu Ning:</span> Nasi Pecel Pincuk Daun Pisang + Telur Dadar + Rempeyek Gurih + Es Teh Melati Rp 22.000!",
  "<span>Paket Juara Empal Sapi:</span> Daging sapi ungkep empuk meresap + Es Jeruk Segar hanya Rp 35.000!",
  "<span>Sambal Tumpang Istimewa:</span> Kuah tempe semangit kental beraroma kencur gurih khas Madiun asli.",
  "<span>Bumbu Pecel Bu Ning:</span> Sangrai tanpa minyak, tahan hingga 6 bulan. Tersedia kemasan 250gr & 500gr!"
];

document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initBroadcast();
  initSocket();
  initPromos();
  loadInitialData();

  document.body.addEventListener('click', () => {
    enableAudio();
  }, { once: true });
});

function initBroadcast() {
  if (typeof BroadcastChannel !== 'undefined') {
    try {
      broadcastChannel = new BroadcastChannel('pecel_sync_channel');
      broadcastChannel.onmessage = (event) => {
        const { type, payload } = event.data;
        if (type === 'orders:sync') {
          currentOrders = payload;
          renderOrders();
        } else if (type === 'order:call') {
          handleOrderCall(payload);
        } else if (type === 'settings:updated') {
          applySettings(payload);
        }
      };
    } catch (e) {}
  }
}

/* Live Clock & Date */
function initClock() {
  const timeEl = document.getElementById('liveTime');
  const dateEl = document.getElementById('liveDate');

  function update() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    if (timeEl) timeEl.textContent = `${hours}:${minutes}:${seconds}`;

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    if (dateEl) dateEl.textContent = now.toLocaleDateString('id-ID', options);
  }

  update();
  setInterval(update, 1000);
}

/* Socket.IO Connection */
function initSocket() {
  if (typeof io !== 'undefined' && window.location.protocol.startsWith('http')) {
    try {
      socket = io();

      socket.on('orders:sync', (orders) => {
        currentOrders = orders || [];
        renderOrders();
      });

      socket.on('order:created', (newOrder) => {
        if (!currentOrders.some(o => o.id === newOrder.id)) {
          currentOrders.unshift(newOrder);
          renderOrders();
        }
      });

      socket.on('order:updated', (updatedOrder) => {
        const idx = currentOrders.findIndex(o => o.id === updatedOrder.id);
        if (idx !== -1) currentOrders[idx] = updatedOrder;
        else currentOrders.push(updatedOrder);
        renderOrders();
      });

      socket.on('order:call', (callData) => {
        handleOrderCall(callData);
      });

      socket.on('settings:updated', (settings) => {
        applySettings(settings);
      });
    } catch (e) {}
  }
}

/* Initial Data Fetch */
async function loadInitialData() {
  if (window.location.protocol.startsWith('http')) {
    try {
      const [ordersRes, settingsRes] = await Promise.all([
        fetch('/api/orders'),
        fetch('/api/settings')
      ]);

      if (ordersRes.ok) currentOrders = await ordersRes.json();
      if (settingsRes.ok) applySettings(await settingsRes.json());
    } catch (err) {}
  }

  // Fallback to local storage or defaults
  if (!currentOrders || currentOrders.length === 0) {
    try {
      const cached = localStorage.getItem('pecel_orders');
      currentOrders = cached ? JSON.parse(cached) : DEFAULT_ORDERS_DISPLAY;
    } catch (e) {
      currentOrders = DEFAULT_ORDERS_DISPLAY;
    }
  }

  renderOrders();
}

function applySettings(settings) {
  if (!settings) return;
  if (settings.storeName) {
    const titleEl = document.getElementById('brandTitle');
    if (titleEl) titleEl.textContent = settings.storeName.toUpperCase();
  }
  if (settings.storeTagline) {
    const taglineEl = document.getElementById('brandTagline');
    if (taglineEl) taglineEl.textContent = settings.storeTagline;
  }
  if (settings.runningText) {
    const tickerEl = document.getElementById('runningText');
    if (tickerEl) tickerEl.textContent = settings.runningText;
  }
}

/* Render McDonald's 2-Column Board */
function renderOrders() {
  const gridPreparing = document.getElementById('gridPreparing');
  const gridReady = document.getElementById('gridReady');
  const countPreparing = document.getElementById('countPreparing');
  const countReady = document.getElementById('countReady');

  if (!gridPreparing || !gridReady) return;

  const preparingOrders = currentOrders.filter(o => o.status === 'preparing');
  const readyOrders = currentOrders.filter(o => o.status === 'ready');

  if (countPreparing) countPreparing.textContent = preparingOrders.length;
  if (countReady) countReady.textContent = readyOrders.length;

  if (preparingOrders.length === 0) {
    gridPreparing.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; color: #64748b; padding: 40px 20px;">
        <i class="fa-solid fa-clock" style="font-size: 2.5rem; margin-bottom: 10px; opacity: 0.4;"></i>
        <p style="font-size: 1.1rem; font-weight: 700;">Tidak ada pesanan sedang disiapkan</p>
      </div>
    `;
  } else {
    gridPreparing.innerHTML = preparingOrders.map(order => `
      <div class="order-chip preparing">
        <div class="order-number">${escapeHTML(order.orderNumber)}</div>
        <div class="order-tag ${order.orderType || 'dine-in'}">
          ${order.orderType === 'takeaway' ? 'Bungkus' : 'Makan Sini'}
        </div>
      </div>
    `).join('');
  }

  if (readyOrders.length === 0) {
    gridReady.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; color: #64748b; padding: 40px 20px;">
        <i class="fa-solid fa-bell-concierge" style="font-size: 2.5rem; margin-bottom: 10px; opacity: 0.4;"></i>
        <p style="font-size: 1.1rem; font-weight: 700;">Belum ada nomor yang siap diambil</p>
      </div>
    `;
  } else {
    gridReady.innerHTML = readyOrders.map(order => {
      const isNewlyReady = newlyReadyOrders.has(order.orderNumber);
      return `
        <div class="order-chip ready ${isNewlyReady ? 'newly-ready' : ''}">
          <div class="order-number">${escapeHTML(order.orderNumber)}</div>
          <div class="order-tag ${order.orderType || 'dine-in'}">
            ${order.orderType === 'takeaway' ? 'Bungkus' : 'Makan Sini'}
          </div>
        </div>
      `;
    }).join('');
  }
}

/* Handle Order Ready & Announcement */
function handleOrderCall(callData) {
  const { orderNumber, customerName } = callData;

  newlyReadyOrders.add(orderNumber);
  renderOrders();

  setTimeout(() => {
    newlyReadyOrders.delete(orderNumber);
    renderOrders();
  }, 25000);

  showCallPopup(orderNumber, customerName);

  if (window.soundManager) {
    window.soundManager.announceOrder(orderNumber, customerName);
  }
}

function showCallPopup(orderNumber, customerName) {
  const popup = document.getElementById('orderCallPopup');
  const numberEl = document.getElementById('popupOrderNumber');
  const custEl = document.getElementById('popupCustomerName');

  if (!popup) return;

  numberEl.textContent = `#${orderNumber}`;
  if (customerName && !customerName.startsWith('Pelanggan')) {
    custEl.textContent = `Atas Nama: ${customerName}`;
    custEl.style.display = 'block';
  } else {
    custEl.style.display = 'none';
  }

  popup.style.display = 'flex';

  if (popupTimeout) clearTimeout(popupTimeout);
  popupTimeout = setTimeout(() => {
    closeCallPopup();
  }, 6500);
}

function closeCallPopup() {
  const popup = document.getElementById('orderCallPopup');
  if (popup) popup.style.display = 'none';
}

function initPromos() {
  const textEl = document.getElementById('promoText');
  setInterval(() => {
    promoIndex = (promoIndex + 1) % promoItems.length;
    if (textEl) {
      textEl.style.opacity = '0';
      setTimeout(() => {
        textEl.innerHTML = promoItems[promoIndex];
        textEl.style.opacity = '1';
      }, 300);
    }
  }, 8000);
}

function enableAudio() {
  if (window.soundManager) {
    window.soundManager.unlockAudio().then(() => {
      const banner = document.getElementById('audioAlertBanner');
      if (banner) banner.style.display = 'none';
    });
  }
}

function testAudio() {
  enableAudio();
  if (window.soundManager) {
    window.soundManager.announceOrder("101", "Pak Bambang");
  }
}

function toggleMute() {
  if (window.soundManager) {
    const isMuted = window.soundManager.toggleMute();
    const icon = document.getElementById('soundIcon');
    if (icon) {
      icon.className = isMuted ? 'fa-solid fa-volume-xmark' : 'fa-solid fa-volume-high';
    }
  }
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    if (document.exitFullscreen) document.exitFullscreen();
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
