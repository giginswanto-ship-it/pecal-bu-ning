/**
 * UNIFIED MASTER APPLICATION CONTROLLER (ANDROID MATERIAL 3 EDITION)
 * Nasi Pecel Bu Ning's - Resilient & Fully Activated
 */

const DEFAULT_MENU = {
  categories: [
    { id: "paket", name: "Paket Hemat & Juara", icon: "fa-star" },
    { id: "pecel", name: "Nasi & Lontong Pecel", icon: "fa-bowl-rice" },
    { id: "lauk", name: "Lauk Tambahan", icon: "fa-drumstick-bite" },
    { id: "gorengan", name: "Gorengan & Peyek", icon: "fa-cookie" },
    { id: "minuman", name: "Minuman Segar", icon: "fa-glass-water" },
    { id: "oleholeh", name: "Oleh-Oleh & Bumbu", icon: "fa-box-archive" }
  ],
  items: [
    {
      id: "pkt-1",
      name: "Paket Mantap Bu Ning (Pecel + Telur + Peyek + Es Teh)",
      category: "paket",
      price: 22000,
      description: "Nasi pecel pincuk daun pisang komplit sayuran, telur dadar/ceplok, rempeyek kacang renyah, dan es teh manis melati.",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80",
      badge: "Terlaris",
      available: true,
      options: {
        spiceLevels: ["Tidak Pedas (Manis)", "Sedang", "Pedas Mantap", "Pedas Gila (Rawit)"],
        servingTypes: ["Pincuk Daun Pisang", "Piring Keramik", "Bungkus Kertas Coklat"],
        eggTypes: ["Telur Dadar", "Telur Ceplok"]
      }
    },
    {
      id: "pkt-2",
      name: "Paket Juara Empal Sapi + Es Jeruk",
      category: "paket",
      price: 35000,
      description: "Nasi pecel pincuk istimewa, empal gepuk daging sapi manis gurih empuk, peyek renyah, dan es jeruk peras segar.",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&q=80",
      badge: "Rekomendasi",
      available: true,
      options: {
        spiceLevels: ["Tidak Pedas (Manis)", "Sedang", "Pedas Mantap", "Pedas Gila (Rawit)"],
        servingTypes: ["Pincuk Daun Pisang", "Piring Keramik", "Bungkus Kertas Coklat"]
      }
    },
    {
      id: "pkt-3",
      name: "Paket Sultan Ayam Lengkuas + Telur Asin",
      category: "paket",
      price: 38000,
      description: "Nasi pecel pincuk, ayam goreng serundeng lengkuas empuk, telur asin masir gurih, peyek teri, dan es dawet gula aren.",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=80",
      badge: "Komplit",
      available: true,
      options: {
        spiceLevels: ["Tidak Pedas (Manis)", "Sedang", "Pedas Mantap", "Pedas Gila (Rawit)"],
        servingTypes: ["Pincuk Daun Pisang", "Piring Keramik", "Bungkus Kertas Coklat"]
      }
    },
    {
      id: "pcl-1",
      name: "Nasi Pecel Pincuk Tradisional",
      category: "pecel",
      price: 14000,
      description: "Nasi hangat dengan aneka sayuran rebus segar disiram bumbu pecel sangrai khas Madiun dan rempeyek kacang.",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80",
      badge: "Favorit",
      available: true,
      options: {
        spiceLevels: ["Tidak Pedas (Manis)", "Sedang", "Pedas Mantap", "Pedas Gila (Rawit)"],
        servingTypes: ["Pincuk Daun Pisang", "Piring Keramik", "Bungkus Kertas Coklat"]
      }
    },
    {
      id: "lau-1",
      name: "Empal Daging Sapi Ungkep",
      category: "lauk",
      price: 17000,
      description: "Daging sapi pilihan diungkep bumbu ketumbar dan gula jawa lalu digoreng empuk meresap sampai ke serat.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80",
      available: true
    },
    {
      id: "gor-4",
      name: "Rempeyek Kacang Daun Jeruk (Porsi)",
      category: "gorengan",
      price: 4000,
      description: "Peyek kacang tanah renyah tipis bertabur irisan daun jeruk purut wangi.",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&q=80",
      available: true
    },
    {
      id: "min-1",
      name: "Es Teh Manis Melati",
      category: "minuman",
      price: 4000,
      description: "Teh wangi melati wasgitel segar disajikan dengan es batu kristal.",
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=500&q=80",
      available: true
    },
    {
      id: "min-2",
      name: "Es Jeruk Peras Segar",
      category: "minuman",
      price: 6000,
      description: "Perasan jeruk segar asli bukan sirup, manis alami dan kaya vitamin C.",
      image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=500&q=80",
      available: true
    },
    {
      id: "oleh-1",
      name: "Bumbu Pecel Asli Madiun Bu Ning (250 gr)",
      category: "oleholeh",
      price: 25000,
      description: "Bumbu pecel sangrai tanpa minyak, tahan hingga 6 bulan. Tinggal seduh air hangat.",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=500&q=80",
      available: true
    }
  ]
};

const DEFAULT_ORDERS = [
  {
    id: "ord-101",
    orderNumber: "101",
    customerName: "Pak Bambang",
    orderType: "dine-in",
    status: "ready",
    createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
    paymentMethod: "QRIS",
    items: [{ id: "pkt-1", name: "Paket Mantap Bu Ning (Pecel + Telur + Peyek + Es Teh)", price: 22000, qty: 2, spiceLevel: "Pedas Mantap" }],
    total: 44000
  },
  {
    id: "ord-102",
    orderNumber: "102",
    customerName: "Ibu Siti",
    orderType: "takeaway",
    status: "ready",
    createdAt: new Date(Date.now() - 12 * 60000).toISOString(),
    paymentMethod: "Tunai",
    items: [{ id: "pkt-2", name: "Paket Juara Empal Sapi + Es Jeruk", price: 35000, qty: 1, spiceLevel: "Sedang" }],
    total: 35000
  },
  {
    id: "ord-103",
    orderNumber: "103",
    customerName: "Mas Dimas",
    orderType: "dine-in",
    status: "preparing",
    createdAt: new Date(Date.now() - 6 * 60000).toISOString(),
    paymentMethod: "QRIS",
    items: [{ id: "pkt-3", name: "Paket Sultan Ayam Lengkuas + Telur Asin", price: 38000, qty: 1, spiceLevel: "Pedas Gila (Rawit)" }],
    total: 38000
  },
  {
    id: "ord-104",
    orderNumber: "104",
    customerName: "Mba Rini",
    orderType: "takeaway",
    status: "preparing",
    createdAt: new Date(Date.now() - 3 * 60000).toISOString(),
    paymentMethod: "Transfer",
    items: [{ id: "pcl-1", name: "Nasi Pecel Pincuk Tradisional", price: 14000, qty: 2, spiceLevel: "Sedang" }],
    total: 28000
  }
];

const App = {
  socket: null,
  broadcastChannel: null,
  activeView: 'display',
  orders: [],
  menu: DEFAULT_MENU,
  settings: {
    storeName: "Nasi Pecel Bu Ning's",
    storeTagline: "Cita Rasa Asli Madiun & Tradisional Lezat",
    runningText: "SELAMAT DATANG DI NASI PECEL BU NING'S • BUMBU ASLI KACANG SANGRAI KHAS MADIUN TANPA PENGAWET • MOHON PERIKSA NOMOR ANTREAN PADA STRUK ANDA • TERSEDIA BUMBU PECEL KEMASAN OLEH-OLEH & ANEKA PEYEK RENYAH • MENERIMA PESANAN NASI KOTAK & CATERING",
    currentOrderNumber: 104
  },
  newlyReadyOrders: new Set(),
  posCart: [],
  posCategory: 'all',
  posOrderType: 'dine-in',
  kdsFilter: 'all',
  kioskCart: [],
  kioskCategory: 'all',
  kioskOrderType: 'dine-in',
  kioskPaymentMethod: 'QRIS',
  pendingItem: null,
  pendingKioskItem: null,
  promoIndex: 0,
  popupTimeout: null,
  timerInterval: null,

  init() {
    this.initBroadcastChannel();
    this.initSocket();
    this.initNavigation();
    this.initClock();
    this.initPromos();
    this.loadInitialData();

    this.timerInterval = setInterval(() => {
      this.updateKDSTimers();
    }, 1000);

    document.body.addEventListener('click', () => {
      this.unlockAudio();
    }, { once: true });
  },

  /* BroadcastChannel fallback for multi-tab sync even on file:// protocol */
  initBroadcastChannel() {
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        this.broadcastChannel = new BroadcastChannel('pecel_sync_channel');
        this.broadcastChannel.onmessage = (event) => {
          const { type, payload } = event.data;
          if (type === 'orders:sync') {
            this.orders = payload;
            this.renderAllOrderViews();
          } else if (type === 'order:call') {
            this.handleOrderCall(payload);
          } else if (type === 'menu:updated') {
            this.menu = payload;
            this.renderPOSMenu();
            this.renderKioskMenu();
            this.renderMenuManager();
          } else if (type === 'settings:updated') {
            this.settings = payload;
            this.applySettings();
          }
        };
      } catch (e) {
        console.warn('BroadcastChannel not supported');
      }
    }
  },

  broadcast(type, payload) {
    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage({ type, payload });
      } catch (e) {}
    }
  },

  /* Socket.IO */
  initSocket() {
    if (typeof io !== 'undefined' && window.location.protocol.startsWith('http')) {
      try {
        this.socket = io();

        this.socket.on('connect', () => {
          const badge = document.getElementById('onlineStatusBadge');
          if (badge) badge.style.display = 'flex';
        });

        this.socket.on('orders:sync', (orders) => {
          this.orders = orders || [];
          this.saveLocal('pecel_orders', this.orders);
          this.renderAllOrderViews();
        });

        this.socket.on('order:created', (newOrder) => {
          if (window.soundManager) window.soundManager.playChime();
          this.showAndroidToast(`Pesanan #${newOrder.orderNumber} Diterima`);
          if (!this.orders.some(o => o.id === newOrder.id)) {
            this.orders.unshift(newOrder);
          }
          this.saveLocal('pecel_orders', this.orders);
          this.renderAllOrderViews();
        });

        this.socket.on('order:updated', (updatedOrder) => {
          const idx = this.orders.findIndex(o => o.id === updatedOrder.id);
          if (idx !== -1) this.orders[idx] = updatedOrder;
          else this.orders.push(updatedOrder);
          this.saveLocal('pecel_orders', this.orders);
          this.renderAllOrderViews();
        });

        this.socket.on('order:call', (callData) => {
          this.handleOrderCall(callData);
        });

        this.socket.on('menu:updated', (newMenu) => {
          this.menu = newMenu;
          this.saveLocal('pecel_menu', this.menu);
          this.renderPOSMenu();
          this.renderKioskMenu();
          this.renderMenuManager();
        });

        this.socket.on('settings:updated', (newSettings) => {
          this.settings = newSettings;
          this.saveLocal('pecel_settings', this.settings);
          this.applySettings();
        });
      } catch (err) {
        console.warn('Socket connection error, using local fallback');
      }
    }
  },

  /* Navigation & View Switching */
  initNavigation() {
    const hash = window.location.hash.replace('#', '') || 'display';
    this.switchView(hash, false);

    window.addEventListener('hashchange', () => {
      const newHash = window.location.hash.replace('#', '') || 'display';
      this.switchView(newHash, false);
    });

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('tv') === 'true' || urlParams.get('standalone') === 'true') {
      this.enableTVLockMode();
    }
  },

  switchView(viewName, updateHash = true) {
    const validViews = ['display', 'kds', 'pos', 'kiosk', 'reports', 'settings'];
    if (!validViews.includes(viewName)) viewName = 'display';

    this.activeView = viewName;
    if (updateHash) {
      window.location.hash = viewName;
    }

    // Android Bottom Nav active state
    document.querySelectorAll('.android-nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.view === viewName);
    });

    // Main views
    document.querySelectorAll('.view-panel').forEach(panel => {
      panel.classList.toggle('active', panel.id === `view-${viewName}`);
    });

    if (viewName === 'reports') this.loadReportsData();
    else if (viewName === 'settings') this.renderMenuManager();
    else if (viewName === 'kds') this.renderKDS();
    else if (viewName === 'pos') this.renderPOSMenu();
    else if (viewName === 'display') this.renderDisplayOrders();
  },

  enableTVLockMode() {
    document.body.classList.add('tv-lock-mode');
    this.switchView('display');
    this.unlockAudio();
    this.showAndroidToast('Mode Layar TV Aktif (Tekan Esc untuk keluar)');
  },

  exitTVLockMode() {
    document.body.classList.remove('tv-lock-mode');
  },

  /* Local Storage Helpers */
  getLocal(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  },

  saveLocal(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {}
  },

  async loadInitialData() {
    // Try fetching from server if HTTP
    if (window.location.protocol.startsWith('http')) {
      try {
        const [ordersRes, menuRes, settingsRes] = await Promise.all([
          fetch('/api/orders'),
          fetch('/api/menu'),
          fetch('/api/settings')
        ]);
        if (ordersRes.ok) this.orders = await ordersRes.json();
        if (menuRes.ok) this.menu = await menuRes.json();
        if (settingsRes.ok) this.settings = await settingsRes.json();
      } catch (err) {
        console.warn('API fetch failed, falling back to cached local data');
      }
    }

    // If still empty, use LocalStorage or Defaults
    if (!this.orders || this.orders.length === 0) {
      this.orders = this.getLocal('pecel_orders', DEFAULT_ORDERS);
    }
    if (!this.menu || !this.menu.items || this.menu.items.length === 0) {
      this.menu = this.getLocal('pecel_menu', DEFAULT_MENU);
    }
    this.settings = this.getLocal('pecel_settings', this.settings);

    this.applySettings();
    this.renderAllOrderViews();
    this.renderPOSCategories();
    this.renderPOSMenu();
    this.renderKioskCategories();
    this.renderKioskMenu();
    this.renderMenuManager();
  },

  renderAllOrderViews() {
    this.renderDisplayOrders();
    this.renderKDS();
    if (this.activeView === 'reports') this.loadReportsData();
    this.updateBadges();
  },

  updateBadges() {
    const prep = this.orders.filter(o => o.status === 'preparing').length;
    const ready = this.orders.filter(o => o.status === 'ready').length;

    const bDisplay = document.getElementById('badgeDisplay');
    const bKds = document.getElementById('badgeKds');
    if (bDisplay) {
      bDisplay.textContent = ready;
      bDisplay.style.display = ready > 0 ? 'inline-block' : 'none';
    }
    if (bKds) {
      bKds.textContent = prep;
      bKds.style.display = prep > 0 ? 'inline-block' : 'none';
    }
  },

  applySettings() {
    if (!this.settings) return;
    if (this.settings.storeName) {
      document.querySelectorAll('.store-name-text').forEach(el => el.textContent = this.settings.storeName.toUpperCase());
    }
    if (this.settings.storeTagline) {
      document.querySelectorAll('.store-tagline-text').forEach(el => el.textContent = this.settings.storeTagline);
    }
    if (this.settings.runningText) {
      const ticker = document.getElementById('runningText');
      if (ticker) ticker.textContent = this.settings.runningText;
      const input = document.getElementById('settingRunningText');
      if (input) input.value = this.settings.runningText;
    }
  },

  /* Android Snackbar / Toast Notification */
  showAndroidToast(msg) {
    let toast = document.getElementById('androidToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'androidToast';
      toast.style.cssText = 'position: fixed; bottom: 84px; left: 50%; transform: translateX(-50%); background: #1e293b; color: #f8fafc; padding: 12px 24px; border-radius: 9999px; font-size: 0.9rem; font-weight: 700; box-shadow: 0 10px 25px rgba(0,0,0,0.5); z-index: 99999; border: 1px solid #475569; display: flex; align-items: center; gap: 8px; transition: opacity 0.3s;';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #4ade80;"></i> <span>${this.escape(msg)}</span>`;
    toast.style.display = 'flex';
    toast.style.opacity = '1';

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => { toast.style.display = 'none'; }, 300);
    }, 3000);
  },

  /* ========================================================================
     VIEW 1: DISPLAY TV (McD MODEL)
     ======================================================================== */
  renderDisplayOrders() {
    const gridPrep = document.getElementById('gridPreparing');
    const gridReady = document.getElementById('gridReady');
    const countPrep = document.getElementById('countPreparing');
    const countReady = document.getElementById('countReady');

    if (!gridPrep || !gridReady) return;

    const prep = this.orders.filter(o => o.status === 'preparing');
    const ready = this.orders.filter(o => o.status === 'ready');

    if (countPrep) countPrep.textContent = prep.length;
    if (countReady) countReady.textContent = ready.length;

    // Preparing
    if (prep.length === 0) {
      gridPrep.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; color: #64748b; padding: 40px 20px;">
          <i class="fa-solid fa-clock" style="font-size: 2.5rem; margin-bottom: 10px; opacity: 0.4;"></i>
          <p style="font-size: 1.1rem; font-weight: 700;">Tidak ada pesanan sedang disiapkan</p>
        </div>
      `;
    } else {
      gridPrep.innerHTML = prep.map(o => `
        <div class="order-chip preparing">
          <div class="order-number">${this.escape(o.orderNumber)}</div>
          <div class="order-tag ${o.orderType || 'dine-in'}">
            ${o.orderType === 'takeaway' ? 'Bungkus' : 'Makan Sini'}
          </div>
        </div>
      `).join('');
    }

    // Ready
    if (ready.length === 0) {
      gridReady.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; color: #64748b; padding: 40px 20px;">
          <i class="fa-solid fa-bell-concierge" style="font-size: 2.5rem; margin-bottom: 10px; opacity: 0.4;"></i>
          <p style="font-size: 1.1rem; font-weight: 700;">Belum ada nomor yang siap diambil</p>
        </div>
      `;
    } else {
      gridReady.innerHTML = ready.map(o => {
        const isNew = this.newlyReadyOrders.has(o.orderNumber);
        return `
          <div class="order-chip ready ${isNew ? 'newly-ready' : ''}">
            <div class="order-number">${this.escape(o.orderNumber)}</div>
            <div class="order-tag ${o.orderType || 'dine-in'}">
              ${o.orderType === 'takeaway' ? 'Bungkus' : 'Makan Sini'}
            </div>
          </div>
        `;
      }).join('');
    }
  },

  handleOrderCall(callData) {
    const { orderNumber, customerName } = callData;

    this.newlyReadyOrders.add(orderNumber);
    this.renderDisplayOrders();
    this.updateBadges();

    setTimeout(() => {
      this.newlyReadyOrders.delete(orderNumber);
      this.renderDisplayOrders();
    }, 25000);

    this.showCallPopup(orderNumber, customerName);

    if (window.soundManager) {
      window.soundManager.announceOrder(orderNumber, customerName);
    }
  },

  showCallPopup(orderNumber, customerName) {
    const popup = document.getElementById('orderCallPopup');
    const noEl = document.getElementById('popupOrderNumber');
    const custEl = document.getElementById('popupCustomerName');
    if (!popup) return;

    noEl.textContent = `#${orderNumber}`;
    if (customerName && !customerName.startsWith('Pelanggan')) {
      custEl.textContent = `Atas Nama: ${customerName}`;
      custEl.style.display = 'block';
    } else {
      custEl.style.display = 'none';
    }

    popup.style.display = 'flex';
    if (this.popupTimeout) clearTimeout(this.popupTimeout);
    this.popupTimeout = setTimeout(() => {
      this.closeCallPopup();
    }, 6500);
  },

  closeCallPopup() {
    const popup = document.getElementById('orderCallPopup');
    if (popup) popup.style.display = 'none';
  },

  initClock() {
    const timeEl = document.getElementById('liveTime');
    const dateEl = document.getElementById('liveDate');
    const statusTimeEl = document.getElementById('androidStatusTime');

    const update = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      if (timeEl) timeEl.textContent = `${h}:${m}:${s}`;
      if (statusTimeEl) statusTimeEl.textContent = `${h}:${m}`;

      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      if (dateEl) dateEl.textContent = now.toLocaleDateString('id-ID', options);
    };
    update();
    setInterval(update, 1000);
  },

  initPromos() {
    const promoItems = [
      "<span>Paket Mantap Bu Ning:</span> Nasi Pecel Pincuk Daun Pisang + Telur Dadar + Rempeyek Gurih + Es Teh Melati Rp 22.000!",
      "<span>Paket Juara Empal Sapi:</span> Daging sapi ungkep empuk meresap + Es Jeruk Segar hanya Rp 35.000!",
      "<span>Sambal Tumpang Istimewa:</span> Kuah tempe semangit kental beraroma kencur gurih khas Madiun asli.",
      "<span>Bumbu Pecel Bu Ning:</span> Sangrai tanpa minyak, tahan hingga 6 bulan. Tersedia kemasan 250gr & 500gr!"
    ];

    const promoEl = document.getElementById('promoText');
    setInterval(() => {
      this.promoIndex = (this.promoIndex + 1) % promoItems.length;
      if (promoEl) {
        promoEl.style.opacity = '0';
        setTimeout(() => {
          promoEl.innerHTML = promoItems[this.promoIndex];
          promoEl.style.opacity = '1';
        }, 300);
      }
    }, 8000);
  },

  /* ========================================================================
     VIEW 2: KDS (KITCHEN DISPLAY)
     ======================================================================== */
  setKDSFilter(filter) {
    this.kdsFilter = filter;
    document.querySelectorAll('.kds-filter-tabs .android-chip').forEach(b => {
      b.classList.toggle('active', b.dataset.filter === filter);
    });
    this.renderKDS();
  },

  renderKDS() {
    const grid = document.getElementById('kdsGrid');
    if (!grid) return;

    const activeOrders = this.orders.filter(o => o.status === 'preparing' || o.status === 'ready');
    const prep = activeOrders.filter(o => o.status === 'preparing');
    const ready = activeOrders.filter(o => o.status === 'ready');

    const cAll = document.getElementById('countAll');
    const cPrep = document.getElementById('countPrep');
    const cRdy = document.getElementById('countReadyKds');
    if (cAll) cAll.textContent = activeOrders.length;
    if (cPrep) cPrep.textContent = prep.length;
    if (cRdy) cRdy.textContent = ready.length;

    let filtered = activeOrders;
    if (this.kdsFilter === 'preparing') filtered = prep;
    if (this.kdsFilter === 'ready') filtered = ready;

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; color: #64748b; padding: 60px 20px;">
          <i class="fa-solid fa-check-double" style="font-size: 3rem; color: #4ade80; margin-bottom: 12px;"></i>
          <p style="font-size: 1.3rem; font-weight: 800; color: #cbd5e1;">Semua Pesanan Dapur Selesai!</p>
          <span style="color: #64748b; font-size: 0.95rem;">Tidak ada tiket pesanan aktif pada kategori ini.</span>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(order => {
      const elapsed = this.getElapsedMinutes(order.createdAt);
      let tClass = 'timer-green';
      if (elapsed >= 10) tClass = 'timer-red';
      else if (elapsed >= 5) tClass = 'timer-yellow';

      return `
        <div class="kds-card status-${order.status}" id="kds-card-${order.id}">
          <div class="kds-card-header">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="kds-order-no">#${this.escape(order.orderNumber)}</span>
              <span class="order-tag ${order.orderType || 'dine-in'}">
                ${order.orderType === 'takeaway' ? 'Bungkus' : 'Makan Sini'}
              </span>
            </div>
            <div class="kds-timer-badge ${tClass}" data-created="${order.createdAt}">
              <i class="fa-regular fa-clock"></i>
              <span class="timer-value">${this.formatTimer(order.createdAt)}</span>
            </div>
          </div>

          <div class="kds-customer-info">
            <span><i class="fa-regular fa-user"></i> ${this.escape(order.customerName)}</span>
            <span style="color: #94a3b8;"><i class="fa-regular fa-credit-card"></i> ${this.escape(order.paymentMethod || 'Tunai')}</span>
          </div>

          <div class="kds-items-list">
            ${(order.items || []).map(it => `
              <div class="kds-item-row">
                <div class="kds-item-qty">${it.qty || 1}x</div>
                <div class="kds-item-details">
                  <div class="kds-item-name">${this.escape(it.name)}</div>
                  ${it.spiceLevel ? `<div class="kds-item-sub"><i class="fa-solid fa-pepper-hot"></i> ${this.escape(it.spiceLevel)}</div>` : ''}
                  ${it.servingType ? `<div class="kds-item-sub"><i class="fa-solid fa-leaf"></i> ${this.escape(it.servingType)}</div>` : ''}
                  ${it.eggType ? `<div class="kds-item-sub"><i class="fa-solid fa-egg"></i> ${this.escape(it.eggType)}</div>` : ''}
                  ${it.notes ? `<div class="kds-item-note"><i class="fa-solid fa-pen"></i> "${this.escape(it.notes)}"</div>` : ''}
                </div>
              </div>
            `).join('')}

            ${order.notes ? `
              <div style="background: rgba(239, 68, 68, 0.15); border: 1px dashed #ef4444; border-radius: 8px; padding: 8px; margin-top: 8px; font-size: 0.85rem; color: #fca5a5;">
                <strong>Catatan Pesanan:</strong> ${this.escape(order.notes)}
              </div>
            ` : ''}
          </div>

          <div class="kds-card-footer">
            ${order.status === 'preparing' ? `
              <button class="btn-kds btn-kds-call" onclick="App.updateOrderStatus('${order.id}', 'ready')">
                <i class="fa-solid fa-bell"></i> Panggil / Siap Diambil
              </button>
            ` : `
              <button class="btn-kds btn-kds-recall" onclick="App.recallOrder('${order.id}')" title="Ulangi Suara Panggilan di TV">
                <i class="fa-solid fa-volume-high"></i> Panggil Ulang
              </button>
              <button class="btn-kds btn-kds-complete" onclick="App.updateOrderStatus('${order.id}', 'completed')">
                <i class="fa-solid fa-check"></i> Selesai
              </button>
            `}
          </div>
        </div>
      `;
    }).join('');
  },

  async updateOrderStatus(orderId, newStatus) {
    const idx = this.orders.findIndex(o => o.id === orderId);
    if (idx !== -1) {
      const order = this.orders[idx];
      order.status = newStatus;
      order.updatedAt = new Date().toISOString();
      this.saveLocal('pecel_orders', this.orders);
      this.broadcast('orders:sync', this.orders);

      if (newStatus === 'ready') {
        const callData = {
          orderNumber: order.orderNumber,
          customerName: order.customerName,
          orderType: order.orderType
        };
        this.handleOrderCall(callData);
        this.broadcast('order:call', callData);
        this.showAndroidToast(`Nomor #${order.orderNumber} Dipanggil ke Kasir`);
      } else if (newStatus === 'completed') {
        this.showAndroidToast(`Pesanan #${order.orderNumber} Selesai Diserahkan`);
      }

      this.renderAllOrderViews();
    }

    // Also update server via HTTP if online
    if (window.location.protocol.startsWith('http')) {
      try {
        fetch(`/api/orders/${orderId}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus })
        }).catch(() => {});
      } catch (e) {}
    }
  },

  async recallOrder(orderId) {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      const callData = {
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        orderType: order.orderType
      };
      this.handleOrderCall(callData);
      this.broadcast('order:call', callData);
      this.showAndroidToast(`Panggilan Ulang #${order.orderNumber} Dikirim`);

      if (window.location.protocol.startsWith('http')) {
        fetch(`/api/orders/${orderId}/call`, { method: 'POST' }).catch(() => {});
      }
    }
  },

  updateKDSTimers() {
    document.querySelectorAll('.kds-timer-badge').forEach(badge => {
      const created = badge.dataset.created;
      const val = badge.querySelector('.timer-value');
      if (val && created) {
        val.textContent = this.formatTimer(created);
        const m = this.getElapsedMinutes(created);
        badge.classList.remove('timer-green', 'timer-yellow', 'timer-red');
        if (m >= 10) badge.classList.add('timer-red');
        else if (m >= 5) badge.classList.add('timer-yellow');
        else badge.classList.add('timer-green');
      }
    });
  },

  getElapsedMinutes(createdAt) {
    if (!createdAt) return 0;
    return Math.floor((Date.now() - new Date(createdAt).getTime()) / 60000);
  },

  formatTimer(createdAt) {
    if (!createdAt) return '00:00';
    const diff = Math.max(0, Math.floor((Date.now() - new Date(createdAt).getTime()) / 1000));
    const m = Math.floor(diff / 60);
    const s = diff % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  },

  /* ========================================================================
     VIEW 3: POS (KASIR)
     ======================================================================== */
  renderPOSCategories() {
    const bar = document.getElementById('categoryBar');
    if (!bar) return;

    const catsHTML = (this.menu.categories || []).map(cat => `
      <div class="android-chip" data-cat="${cat.id}" onclick="App.filterPOSCategory('${cat.id}')">
        <i class="fa-solid ${cat.icon || 'fa-tag'}"></i> <span>${this.escape(cat.name)}</span>
      </div>
    `).join('');

    bar.innerHTML = `
      <div class="android-chip active" data-cat="all" onclick="App.filterPOSCategory('all')">
        <i class="fa-solid fa-border-all"></i> <span>Semua Menu</span>
      </div>
      ${catsHTML}
    `;
  },

  filterPOSCategory(catId) {
    this.posCategory = catId;
    document.querySelectorAll('#categoryBar .android-chip').forEach(b => {
      b.classList.toggle('active', b.dataset.cat === catId);
    });
    this.renderPOSMenu();
  },

  renderPOSMenu() {
    const grid = document.getElementById('menuGrid');
    if (!grid) return;

    let items = this.menu.items || [];
    if (this.posCategory !== 'all') {
      items = items.filter(it => it.category === this.posCategory);
    }

    grid.innerHTML = items.map(item => {
      const isOutOfStock = item.available === false;
      return `
        <div class="menu-card ${isOutOfStock ? 'out-of-stock' : ''}" onclick="${isOutOfStock ? 'alert(\'Menu ini sedang habis!\')' : `App.handlePOSItemClick('${item.id}')`}">
          ${item.badge ? `<span class="menu-card-badge">${this.escape(item.badge)}</span>` : ''}
          ${isOutOfStock ? `<span class="menu-card-badge" style="background: #475569;">HABIS</span>` : ''}
          <img src="${item.image}" alt="${this.escape(item.name)}" class="menu-card-img" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80'">
          <div class="menu-card-body">
            <h4 class="menu-card-title">${this.escape(item.name)}</h4>
            <p class="menu-card-desc">${this.escape(item.description)}</p>
            <div class="menu-card-price">${this.formatRupiah(item.price)}</div>
          </div>
        </div>
      `;
    }).join('');
  },

  handlePOSItemClick(itemId) {
    const item = (this.menu.items || []).find(it => it.id === itemId);
    if (!item) return;

    if (item.options && (item.options.spiceLevels || item.options.servingTypes || item.options.eggTypes)) {
      this.openOptionsModal(item);
    } else {
      this.addItemToPOSCart({
        id: item.id,
        name: item.name,
        price: item.price,
        qty: 1,
        spiceLevel: '',
        servingType: '',
        eggType: '',
        notes: ''
      });
      this.showAndroidToast(`+1 ${item.name} ke Keranjang`);
    }
  },

  openOptionsModal(item) {
    this.pendingItem = item;
    document.getElementById('modalItemTitle').textContent = `Kustomisasi: ${item.name}`;

    const spiceGroup = document.getElementById('spiceGroup');
    const spiceOptions = document.getElementById('spiceOptions');
    if (item.options && item.options.spiceLevels) {
      spiceGroup.style.display = 'block';
      spiceOptions.innerHTML = item.options.spiceLevels.map((lvl, idx) => `
        <div class="option-pill ${idx === 1 ? 'active' : ''}" onclick="App.selectOptionPill(this)">${this.escape(lvl)}</div>
      `).join('');
    } else {
      spiceGroup.style.display = 'none';
    }

    const servingGroup = document.getElementById('servingGroup');
    const servingOptions = document.getElementById('servingOptions');
    if (item.options && item.options.servingTypes) {
      servingGroup.style.display = 'block';
      servingOptions.innerHTML = item.options.servingTypes.map((srv, idx) => `
        <div class="option-pill ${idx === 0 ? 'active' : ''}" onclick="App.selectOptionPill(this)">${this.escape(srv)}</div>
      `).join('');
    } else {
      servingGroup.style.display = 'none';
    }

    const eggGroup = document.getElementById('eggGroup');
    const eggOptions = document.getElementById('eggOptions');
    if (item.options && item.options.eggTypes) {
      eggGroup.style.display = 'block';
      eggOptions.innerHTML = item.options.eggTypes.map((eg, idx) => `
        <div class="option-pill ${idx === 0 ? 'active' : ''}" onclick="App.selectOptionPill(this)">${this.escape(eg)}</div>
      `).join('');
    } else {
      eggGroup.style.display = 'none';
    }

    document.getElementById('modalItemNotes').value = '';
    document.getElementById('optionsModal').style.display = 'flex';
  },

  selectOptionPill(el) {
    el.parentElement.querySelectorAll('.option-pill').forEach(p => p.classList.remove('active'));
    el.classList.add('active');
  },

  closeOptionsModal() {
    document.getElementById('optionsModal').style.display = 'none';
    this.pendingItem = null;
  },

  confirmAddPOSItem() {
    if (!this.pendingItem) return;

    const s = document.querySelector('#spiceOptions .option-pill.active');
    const v = document.querySelector('#servingOptions .option-pill.active');
    const e = document.querySelector('#eggOptions .option-pill.active');
    const notes = document.getElementById('modalItemNotes').value.trim();

    this.addItemToPOSCart({
      id: this.pendingItem.id,
      name: this.pendingItem.name,
      price: this.pendingItem.price,
      qty: 1,
      spiceLevel: s ? s.textContent : '',
      servingType: v ? v.textContent : '',
      eggType: e ? e.textContent : '',
      notes
    });

    this.showAndroidToast(`+1 ${this.pendingItem.name} ditambahkan`);
    this.closeOptionsModal();
  },

  addItemToPOSCart(newItem) {
    const existing = this.posCart.find(c => 
      c.id === newItem.id &&
      c.spiceLevel === newItem.spiceLevel &&
      c.servingType === newItem.servingType &&
      c.eggType === newItem.eggType &&
      c.notes === newItem.notes
    );

    if (existing) {
      existing.qty += 1;
    } else {
      this.posCart.push(newItem);
    }
    this.renderPOSCart();
  },

  changePOSQty(idx, delta) {
    if (this.posCart[idx]) {
      this.posCart[idx].qty += delta;
      if (this.posCart[idx].qty <= 0) this.posCart.splice(idx, 1);
    }
    this.renderPOSCart();
  },

  removePOSItem(idx) {
    this.posCart.splice(idx, 1);
    this.renderPOSCart();
  },

  clearPOSCart() {
    this.posCart = [];
    this.renderPOSCart();
    this.showAndroidToast('Keranjang Dikosongkan');
  },

  setPOSOrderType(type) {
    this.posOrderType = type;
    document.getElementById('btnDineIn').classList.toggle('active', type === 'dine-in');
    document.getElementById('btnTakeaway').classList.toggle('active', type === 'takeaway');
  },

  renderPOSCart() {
    const listEl = document.getElementById('cartItemsList');
    const totalEl = document.getElementById('cartTotalText');
    const btn = document.getElementById('btnProcessOrder');
    if (!listEl) return;

    if (this.posCart.length === 0) {
      listEl.innerHTML = `
        <div style="text-align: center; color: #64748b; padding: 40px 10px;">
          <i class="fa-solid fa-basket-shopping" style="font-size: 2.2rem; margin-bottom: 8px; opacity: 0.4;"></i>
          <p style="font-size: 0.95rem; font-weight: 700;">Keranjang masih kosong</p>
          <span style="font-size: 0.8rem; color: #64748b;">Sentuh menu di kiri untuk menambah pesanan</span>
        </div>
      `;
      totalEl.textContent = 'Rp 0';
      btn.disabled = true;
      return;
    }

    let total = 0;
    listEl.innerHTML = this.posCart.map((it, idx) => {
      const sub = it.price * it.qty;
      total += sub;
      return `
        <div class="cart-item">
          <div class="cart-item-header">
            <span>${this.escape(it.name)}</span>
            <span style="font-family: var(--font-mono); color: #4ade80;">${this.formatRupiah(sub)}</span>
          </div>
          ${it.spiceLevel ? `<div class="cart-item-sub"><i class="fa-solid fa-pepper-hot"></i> ${this.escape(it.spiceLevel)}</div>` : ''}
          ${it.servingType ? `<div class="cart-item-sub"><i class="fa-solid fa-leaf"></i> ${this.escape(it.servingType)}</div>` : ''}
          ${it.eggType ? `<div class="cart-item-sub"><i class="fa-solid fa-egg"></i> ${this.escape(it.eggType)}</div>` : ''}
          ${it.notes ? `<div class="cart-item-sub" style="color: #f87171;"><i class="fa-solid fa-pen"></i> "${this.escape(it.notes)}"</div>` : ''}

          <div class="cart-item-controls">
            <div class="qty-control">
              <button class="btn-qty" onclick="App.changePOSQty(${idx}, -1)">-</button>
              <span class="qty-text">${it.qty}</span>
              <button class="btn-qty" onclick="App.changePOSQty(${idx}, 1)">+</button>
            </div>
            <button class="android-icon-btn" style="width: 28px; height: 28px; font-size: 0.75rem; background: rgba(239, 68, 68, 0.2); color: #ef4444; border-color: transparent;" onclick="App.removePOSItem(${idx})">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');

    totalEl.textContent = this.formatRupiah(total);
    btn.disabled = false;
  },

  async processPOSOrder() {
    if (this.posCart.length === 0) return;

    const custName = document.getElementById('customerNameInput').value.trim();
    const paymentMethod = document.getElementById('paymentMethodSelect').value;
    const btn = document.getElementById('btnProcessOrder');

    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Memproses...';

    // Increment order number
    let nextNum = (parseInt(this.settings.currentOrderNumber, 10) || 100) + 1;
    this.settings.currentOrderNumber = nextNum;
    this.saveLocal('pecel_settings', this.settings);

    const orderNumberStr = String(nextNum).padStart(2, '0');
    const total = this.posCart.reduce((sum, it) => sum + (it.price * it.qty), 0);

    const newOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNumberStr,
      customerName: custName || `Pelanggan #${orderNumberStr}`,
      orderType: this.posOrderType,
      status: 'preparing',
      paymentMethod,
      items: [...this.posCart],
      notes: '',
      total,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.orders.unshift(newOrder);
    this.saveLocal('pecel_orders', this.orders);
    this.broadcast('orders:sync', this.orders);
    this.renderAllOrderViews();

    if (window.soundManager) window.soundManager.playChime();
    this.showAndroidToast(`Pesanan #${orderNumberStr} Berhasil Dibuat!`);

    // Show thermal receipt
    this.showReceiptModal(newOrder);
    this.clearPOSCart();
    document.getElementById('customerNameInput').value = '';

    // Also send to backend HTTP if available
    if (window.location.protocol.startsWith('http')) {
      fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: custName,
          orderType: this.posOrderType,
          paymentMethod,
          items: newOrder.items,
          notes: ''
        })
      }).catch(() => {});
    }

    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Kirim Pesanan & Cetak Struk';
  },

  showReceiptModal(order) {
    document.getElementById('receiptOrderNo').textContent = `#${order.orderNumber}`;
    document.getElementById('receiptOrderType').textContent = order.orderType === 'takeaway' ? 'BUNGKUS (BAWA PULANG)' : 'MAKAN DI TEMPAT';
    document.getElementById('receiptPayment').textContent = order.paymentMethod;
    document.getElementById('receiptTotalAmount').textContent = this.formatRupiah(order.total);

    const now = new Date(order.createdAt);
    document.getElementById('receiptTimestamp').textContent = now.toLocaleString('id-ID');

    document.getElementById('receiptItemsList').innerHTML = (order.items || []).map(it => `
      <div class="receipt-item-line">
        <span>${it.qty}x ${this.escape(it.name)}</span>
        <span>${this.formatRupiah(it.price * it.qty)}</span>
      </div>
      ${it.spiceLevel || it.servingType ? `
        <div style="font-size: 0.72rem; color: #555; padding-left: 14px; margin-bottom: 2px;">
          ${it.spiceLevel ? `• ${it.spiceLevel} ` : ''}${it.servingType ? `• ${it.servingType}` : ''}
        </div>
      ` : ''}
    `).join('');

    document.getElementById('receiptModal').style.display = 'flex';
  },

  closeReceiptModal() {
    document.getElementById('receiptModal').style.display = 'none';
  },

  /* ========================================================================
     VIEW 4: KIOSK MANDIRI
     ======================================================================== */
  startKiosk(type) {
    this.kioskOrderType = type;
    document.getElementById('kioskOrderTypeLabel').textContent = type === 'takeaway' ? 'Bawa Pulang (Bungkus)' : 'Makan di Tempat';
    document.getElementById('kioskWelcome').style.display = 'none';
  },

  resetKiosk() {
    this.kioskCart = [];
    this.updateKioskCartUI();
    document.getElementById('kioskWelcome').style.display = 'flex';
    document.getElementById('kioskTicketScreen').style.display = 'none';
  },

  renderKioskCategories() {
    const bar = document.getElementById('kioskCategoryBar');
    if (!bar) return;

    const catsHTML = (this.menu.categories || []).map(cat => `
      <div class="android-chip" data-cat="${cat.id}" onclick="App.filterKioskCategory('${cat.id}')">
        <i class="fa-solid ${cat.icon || 'fa-tag'}"></i> <span>${this.escape(cat.name)}</span>
      </div>
    `).join('');

    bar.innerHTML = `
      <div class="android-chip active" data-cat="all" onclick="App.filterKioskCategory('all')">
        <i class="fa-solid fa-border-all"></i> <span>Semua Menu</span>
      </div>
      ${catsHTML}
    `;
  },

  filterKioskCategory(catId) {
    this.kioskCategory = catId;
    document.querySelectorAll('#kioskCategoryBar .android-chip').forEach(b => {
      b.classList.toggle('active', b.dataset.cat === catId);
    });
    this.renderKioskMenu();
  },

  renderKioskMenu() {
    const grid = document.getElementById('kioskMenuGrid');
    if (!grid) return;

    let items = this.menu.items || [];
    if (this.kioskCategory !== 'all') {
      items = items.filter(it => it.category === this.kioskCategory);
    }

    grid.innerHTML = items.map(item => {
      const isOutOfStock = item.available === false;
      return `
        <div class="menu-card ${isOutOfStock ? 'out-of-stock' : ''}" onclick="${isOutOfStock ? 'alert(\'Menu ini sedang habis!\')' : `App.handleKioskItemClick('${item.id}')`}">
          ${item.badge ? `<span class="menu-card-badge">${this.escape(item.badge)}</span>` : ''}
          ${isOutOfStock ? `<span class="menu-card-badge" style="background: #475569;">HABIS</span>` : ''}
          <img src="${item.image}" alt="${this.escape(item.name)}" class="menu-card-img" style="height: 135px;" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80'">
          <div class="menu-card-body">
            <h4 class="menu-card-title">${this.escape(item.name)}</h4>
            <p class="menu-card-desc">${this.escape(item.description)}</p>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: auto;">
              <div class="menu-card-price">${this.formatRupiah(item.price)}</div>
              <button class="android-icon-btn" style="background: #1b5e20; border: none; width: 34px; height: 34px;">
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  handleKioskItemClick(itemId) {
    const item = (this.menu.items || []).find(it => it.id === itemId);
    if (!item) return;

    if (item.options && (item.options.spiceLevels || item.options.servingTypes)) {
      this.openKioskOptions(item);
    } else {
      this.addKioskItem({
        id: item.id,
        name: item.name,
        price: item.price,
        qty: 1,
        spiceLevel: '',
        servingType: '',
        eggType: '',
        notes: ''
      });
      this.showAndroidToast(`+1 ${item.name} ke Pesanan Kiosk`);
    }
  },

  openKioskOptions(item) {
    this.pendingKioskItem = item;
    document.getElementById('kioskModalItemTitle').textContent = `Pilihan: ${item.name}`;

    const spiceGroup = document.getElementById('kioskSpiceGroup');
    const spiceOptions = document.getElementById('kioskSpiceOptions');
    if (item.options && item.options.spiceLevels) {
      spiceGroup.style.display = 'block';
      spiceOptions.innerHTML = item.options.spiceLevels.map((lvl, idx) => `
        <div class="option-pill ${idx === 1 ? 'active' : ''}" onclick="App.selectOptionPill(this)">${this.escape(lvl)}</div>
      `).join('');
    } else {
      spiceGroup.style.display = 'none';
    }

    const servingGroup = document.getElementById('kioskServingGroup');
    const servingOptions = document.getElementById('kioskServingOptions');
    if (item.options && item.options.servingTypes) {
      servingGroup.style.display = 'block';
      servingOptions.innerHTML = item.options.servingTypes.map((srv, idx) => `
        <div class="option-pill ${idx === 0 ? 'active' : ''}" onclick="App.selectOptionPill(this)">${this.escape(srv)}</div>
      `).join('');
    } else {
      servingGroup.style.display = 'none';
    }

    document.getElementById('kioskItemNotes').value = '';
    document.getElementById('kioskOptionsModal').style.display = 'flex';
  },

  closeKioskOptions() {
    document.getElementById('kioskOptionsModal').style.display = 'none';
    this.pendingKioskItem = null;
  },

  confirmKioskAddItem() {
    if (!this.pendingKioskItem) return;

    const s = document.querySelector('#kioskSpiceOptions .option-pill.active');
    const v = document.querySelector('#kioskServingOptions .option-pill.active');
    const notes = document.getElementById('kioskItemNotes').value.trim();

    this.addKioskItem({
      id: this.pendingKioskItem.id,
      name: this.pendingKioskItem.name,
      price: this.pendingKioskItem.price,
      qty: 1,
      spiceLevel: s ? s.textContent : '',
      servingType: v ? v.textContent : '',
      eggType: '',
      notes
    });

    this.showAndroidToast(`+1 ${this.pendingKioskItem.name} ditambahkan`);
    this.closeKioskOptions();
  },

  addKioskItem(newItem) {
    const existing = this.kioskCart.find(c => 
      c.id === newItem.id &&
      c.spiceLevel === newItem.spiceLevel &&
      c.servingType === newItem.servingType &&
      c.notes === newItem.notes
    );

    if (existing) existing.qty += 1;
    else this.kioskCart.push(newItem);

    this.updateKioskCartUI();
  },

  updateKioskCartUI() {
    const cEl = document.getElementById('kioskCartCount');
    const tEl = document.getElementById('kioskCartTotal');
    const btn = document.getElementById('btnKioskCheckout');

    const totalQty = this.kioskCart.reduce((sum, it) => sum + it.qty, 0);
    const totalPrice = this.kioskCart.reduce((sum, it) => sum + (it.price * it.qty), 0);

    if (cEl) cEl.textContent = totalQty;
    if (tEl) tEl.textContent = this.formatRupiah(totalPrice);
    if (btn) btn.disabled = totalQty === 0;
  },

  openKioskReview() {
    if (this.kioskCart.length === 0) return;

    const listEl = document.getElementById('kioskReviewItemsList');
    const tEl = document.getElementById('kioskReviewTotal');
    const totalPrice = this.kioskCart.reduce((sum, it) => sum + (it.price * it.qty), 0);

    listEl.innerHTML = this.kioskCart.map((it, idx) => `
      <div class="cart-item">
        <div class="cart-item-header">
          <span>${this.escape(it.name)}</span>
          <span style="color: #4ade80;">${this.formatRupiah(it.price * it.qty)}</span>
        </div>
        ${it.spiceLevel || it.servingType ? `
          <div class="cart-item-sub">${it.spiceLevel || ''} ${it.servingType ? `• ${it.servingType}` : ''}</div>
        ` : ''}
        <div class="cart-item-controls">
          <div class="qty-control">
            <button class="btn-qty" onclick="App.changeKioskQty(${idx}, -1)">-</button>
            <span class="qty-text">${it.qty}</span>
            <button class="btn-qty" onclick="App.changeKioskQty(${idx}, 1)">+</button>
          </div>
        </div>
      </div>
    `).join('');

    tEl.textContent = this.formatRupiah(totalPrice);
    document.getElementById('kioskReviewModal').style.display = 'flex';
  },

  changeKioskQty(idx, delta) {
    if (this.kioskCart[idx]) {
      this.kioskCart[idx].qty += delta;
      if (this.kioskCart[idx].qty <= 0) this.kioskCart.splice(idx, 1);
    }
    this.updateKioskCartUI();
    if (this.kioskCart.length === 0) this.closeKioskReview();
    else this.openKioskReview();
  },

  closeKioskReview() {
    document.getElementById('kioskReviewModal').style.display = 'none';
  },

  setKioskPayment(m) {
    this.kioskPaymentMethod = m;
    document.getElementById('payOptQRIS').classList.toggle('active', m === 'QRIS');
    document.getElementById('payOptCash').classList.toggle('active', m !== 'QRIS');
  },

  async submitKioskOrder() {
    const custName = document.getElementById('kioskCustomerName').value.trim() || 'Pelanggan Mandiri';
    const btn = document.getElementById('btnKioskFinalSubmit');

    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Memproses...';

    let nextNum = (parseInt(this.settings.currentOrderNumber, 10) || 100) + 1;
    this.settings.currentOrderNumber = nextNum;
    this.saveLocal('pecel_settings', this.settings);

    const orderNumberStr = String(nextNum).padStart(2, '0');
    const total = this.kioskCart.reduce((sum, it) => sum + (it.price * it.qty), 0);

    const createdOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNumberStr,
      customerName: custName,
      orderType: this.kioskOrderType,
      status: 'preparing',
      paymentMethod: this.kioskPaymentMethod,
      items: [...this.kioskCart],
      notes: '',
      total,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.orders.unshift(createdOrder);
    this.saveLocal('pecel_orders', this.orders);
    this.broadcast('orders:sync', this.orders);
    this.renderAllOrderViews();

    if (window.soundManager) window.soundManager.playChime();
    this.showAndroidToast(`Tiket Kiosk #${orderNumberStr} Tercetak`);

    this.closeKioskReview();
    this.showKioskTicket(createdOrder);

    if (window.location.protocol.startsWith('http')) {
      fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: custName,
          orderType: this.kioskOrderType,
          paymentMethod: this.kioskPaymentMethod,
          items: createdOrder.items,
          notes: ''
        })
      }).catch(() => {});
    }

    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Konfirmasi & Cetak Nomor Antrean';
  },

  showKioskTicket(order) {
    document.getElementById('kioskFinalOrderNo').textContent = `#${order.orderNumber}`;
    document.getElementById('kioskFinalType').textContent = order.orderType === 'takeaway' ? 'Bawa Pulang (Bungkus)' : 'Makan di Tempat';
    document.getElementById('kioskFinalPayment').textContent = order.paymentMethod;
    document.getElementById('kioskFinalTotal').textContent = this.formatRupiah(order.total);

    document.getElementById('kioskTicketScreen').style.display = 'flex';

    setTimeout(() => {
      this.resetKiosk();
    }, 15000);
  },

  /* ========================================================================
     VIEW 5: REPORTS & ANALYTICS
     ======================================================================== */
  loadReportsData() {
    const today = new Date().toISOString().slice(0, 10);
    const todayOrders = this.orders.filter(o => o.createdAt && o.createdAt.slice(0, 10) === today);
    const completed = todayOrders.filter(o => o.status === 'completed');
    const active = todayOrders.filter(o => o.status === 'preparing' || o.status === 'ready');
    const cancelled = todayOrders.filter(o => o.status === 'cancelled');

    const totalRev = completed.reduce((sum, o) => sum + (o.total || 0), 0);

    const revEl = document.getElementById('statTotalRevenue');
    const compEl = document.getElementById('statCompletedCount');
    const actEl = document.getElementById('statActiveCount');
    const canEl = document.getElementById('statCancelledCount');

    if (revEl) revEl.textContent = this.formatRupiah(totalRev);
    if (compEl) compEl.textContent = completed.length;
    if (actEl) actEl.textContent = active.length;
    if (canEl) canEl.textContent = cancelled.length;

    // Top selling items
    const itemMap = {};
    todayOrders.forEach(o => {
      if (o.status !== 'cancelled') {
        (o.items || []).forEach(it => {
          if (!itemMap[it.name]) itemMap[it.name] = { name: it.name, qty: 0, revenue: 0 };
          itemMap[it.name].qty += (it.qty || 1);
          itemMap[it.name].revenue += ((it.price || 0) * (it.qty || 1));
        });
      }
    });

    const topItems = Object.values(itemMap).sort((a, b) => b.qty - a.qty).slice(0, 5);
    const topEl = document.getElementById('topSellingList');
    if (topEl) {
      if (topItems.length === 0) {
        topEl.innerHTML = '<p style="color: #64748b; font-size: 0.85rem;">Belum ada penjualan hari ini.</p>';
      } else {
        topEl.innerHTML = topItems.map((item, idx) => `
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px dashed #334155;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="width: 26px; height: 26px; border-radius: 50%; background: #334155; color: #facc15; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.8rem;">${idx + 1}</div>
              <div>
                <div style="font-weight: 800; color: #f8fafc; font-size: 0.9rem;">${this.escape(item.name)}</div>
                <div style="font-size: 0.75rem; color: #94a3b8;">${item.qty} porsi terjual</div>
              </div>
            </div>
            <div style="font-family: var(--font-mono); font-weight: 800; color: #4ade80;">
              ${this.formatRupiah(item.revenue)}
            </div>
          </div>
        `).join('');
      }
    }

    // Orders History Table
    const tbody = document.getElementById('orderHistoryTableBody');
    if (tbody) {
      if (this.orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: #64748b; padding: 20px;">Belum ada pesanan</td></tr>';
      } else {
        tbody.innerHTML = this.orders.map(o => {
          const time = new Date(o.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
          return `
            <tr>
              <td style="font-family: var(--font-mono); font-weight: 900; color: #facc15;">#${this.escape(o.orderNumber)}</td>
              <td>${time}</td>
              <td><strong>${this.escape(o.customerName)}</strong></td>
              <td>
                <span class="order-tag ${o.orderType || 'dine-in'}">
                  ${o.orderType === 'takeaway' ? 'Bungkus' : 'Makan Sini'}
                </span>
              </td>
              <td style="font-family: var(--font-mono); font-weight: 800;">${this.formatRupiah(o.total)}</td>
              <td><span class="status-badge ${o.status}">${o.status}</span></td>
              <td>
                <button class="android-icon-btn" style="width: 28px; height: 28px; font-size: 0.75rem; display: inline-flex;" title="Cetak Struk" onclick="App.reprintReceipt('${o.id}')">
                  <i class="fa-solid fa-receipt"></i>
                </button>
                ${o.status !== 'cancelled' ? `
                  <button class="android-icon-btn" style="width: 28px; height: 28px; font-size: 0.75rem; display: inline-flex; color: #f87171;" title="Batalkan" onclick="App.cancelOrder('${o.id}')">
                    <i class="fa-solid fa-ban"></i>
                  </button>
                ` : ''}
              </td>
            </tr>
          `;
        }).join('');
      }
    }
  },

  reprintReceipt(orderId) {
    const o = this.orders.find(ord => ord.id === orderId);
    if (o) this.showReceiptModal(o);
  },

  async cancelOrder(orderId) {
    if (!confirm('Apakah Anda yakin ingin membatalkan pesanan ini?')) return;
    const idx = this.orders.findIndex(o => o.id === orderId);
    if (idx !== -1) {
      this.orders[idx].status = 'cancelled';
      this.saveLocal('pecel_orders', this.orders);
      this.broadcast('orders:sync', this.orders);
      this.renderAllOrderViews();
      this.showAndroidToast('Pesanan Dibatalkan');

      if (window.location.protocol.startsWith('http')) {
        fetch(`/api/orders/${orderId}`, { method: 'DELETE' }).catch(() => {});
      }
    }
  },

  exportCSV() {
    if (!this.orders || this.orders.length === 0) return alert('Tidak ada data pesanan untuk diekspor');

    let csv = 'Nomor,Waktu,Pelanggan,Tipe,Metode Bayar,Status,Total (Rp)\n';
    this.orders.forEach(o => {
      const time = new Date(o.createdAt).toLocaleString('id-ID');
      csv += `"${o.orderNumber}","${time}","${o.customerName}","${o.orderType}","${o.paymentMethod}","${o.status}","${o.total}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `laporan_penjualan_bu_ning_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    this.showAndroidToast('File CSV Berhasil Diunduh');
  },

  /* ========================================================================
     VIEW 6: MENU & SETTINGS MANAGEMENT
     ======================================================================== */
  renderMenuManager() {
    const tbody = document.getElementById('menuManagerTableBody');
    if (!tbody) return;

    tbody.innerHTML = (this.menu.items || []).map(item => `
      <tr>
        <td>
          <img src="${item.image}" alt="${this.escape(item.name)}" style="width: 44px; height: 44px; border-radius: 8px; object-fit: cover;" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80'">
        </td>
        <td>
          <strong style="color: #ffffff;">${this.escape(item.name)}</strong>
          <div style="font-size: 0.78rem; color: #94a3b8;">${this.escape(item.category)}</div>
        </td>
        <td style="font-family: var(--font-mono); font-weight: 800; color: #4ade80;">
          ${this.formatRupiah(item.price)}
        </td>
        <td>
          <label class="switch">
            <input type="checkbox" ${item.available !== false ? 'checked' : ''} onchange="App.toggleItemStock('${item.id}', this.checked)">
            <span class="slider"></span>
          </label>
          <span style="font-size: 0.8rem; margin-left: 8px; font-weight: 700; color: ${item.available !== false ? '#4ade80' : '#f87171'};">
            ${item.available !== false ? 'Tersedia' : 'Habis'}
          </span>
        </td>
        <td>
          <button class="android-icon-btn" style="width: 32px; height: 32px; display: inline-flex;" title="Edit Menu" onclick="App.editMenuItemModal('${item.id}')">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button class="android-icon-btn" style="width: 32px; height: 32px; display: inline-flex; color: #f87171;" title="Hapus Menu" onclick="App.deleteMenuItem('${item.id}')">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `).join('');
  },

  toggleItemStock(itemId, available) {
    const item = (this.menu.items || []).find(it => it.id === itemId);
    if (item) {
      item.available = available;
      this.saveLocal('pecel_menu', this.menu);
      this.broadcast('menu:updated', this.menu);
      this.renderPOSMenu();
      this.renderKioskMenu();
      this.renderMenuManager();
      this.showAndroidToast(`Stok ${item.name}: ${available ? 'Tersedia' : 'Habis'}`);

      if (window.location.protocol.startsWith('http')) {
        fetch(`/api/menu/item/${itemId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ available })
        }).catch(() => {});
      }
    }
  },

  openAddMenuModal() {
    document.getElementById('editItemId').value = '';
    document.getElementById('menuFormTitle').textContent = 'Tambah Menu Baru';
    document.getElementById('itemFormName').value = '';
    document.getElementById('itemFormPrice').value = '';
    document.getElementById('itemFormCategory').value = 'pecel';
    document.getElementById('itemFormDesc').value = '';
    document.getElementById('itemFormImage').value = '';
    document.getElementById('itemFormBadge').value = '';
    document.getElementById('menuEditModal').style.display = 'flex';
  },

  editMenuItemModal(itemId) {
    const item = (this.menu.items || []).find(it => it.id === itemId);
    if (!item) return;

    document.getElementById('editItemId').value = item.id;
    document.getElementById('menuFormTitle').textContent = 'Edit Menu: ' + item.name;
    document.getElementById('itemFormName').value = item.name;
    document.getElementById('itemFormPrice').value = item.price;
    document.getElementById('itemFormCategory').value = item.category;
    document.getElementById('itemFormDesc').value = item.description || '';
    document.getElementById('itemFormImage').value = item.image || '';
    document.getElementById('itemFormBadge').value = item.badge || '';
    document.getElementById('menuEditModal').style.display = 'flex';
  },

  closeMenuEditModal() {
    document.getElementById('menuEditModal').style.display = 'none';
  },

  saveMenuItem() {
    const id = document.getElementById('editItemId').value;
    const name = document.getElementById('itemFormName').value.trim();
    const price = parseInt(document.getElementById('itemFormPrice').value, 10);
    const category = document.getElementById('itemFormCategory').value;
    const desc = document.getElementById('itemFormDesc').value.trim();
    const image = document.getElementById('itemFormImage').value.trim();
    const badge = document.getElementById('itemFormBadge').value.trim();

    if (!name || isNaN(price)) return alert('Nama menu dan harga harus diisi dengan benar');

    const payload = {
      name,
      price,
      category,
      description: desc,
      image: image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80',
      badge,
      available: true
    };

    if (id) {
      const idx = this.menu.items.findIndex(it => it.id === id);
      if (idx !== -1) this.menu.items[idx] = { ...this.menu.items[idx], ...payload };
    } else {
      payload.id = `item-${Date.now()}`;
      this.menu.items.push(payload);
    }

    this.saveLocal('pecel_menu', this.menu);
    this.broadcast('menu:updated', this.menu);
    this.renderPOSMenu();
    this.renderKioskMenu();
    this.renderMenuManager();
    this.closeMenuEditModal();
    this.showAndroidToast('Menu Berhasil Disimpan');

    if (window.location.protocol.startsWith('http')) {
      const endpoint = id ? `/api/menu/item/${id}` : '/api/menu/item';
      const method = id ? 'PUT' : 'POST';
      fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => {});
    }
  },

  deleteMenuItem(itemId) {
    if (!confirm('Apakah Anda yakin ingin menghapus menu ini?')) return;
    this.menu.items = this.menu.items.filter(it => it.id !== itemId);
    this.saveLocal('pecel_menu', this.menu);
    this.broadcast('menu:updated', this.menu);
    this.renderPOSMenu();
    this.renderKioskMenu();
    this.renderMenuManager();
    this.showAndroidToast('Menu Dihapus');

    if (window.location.protocol.startsWith('http')) {
      fetch(`/api/menu/item/${itemId}`, { method: 'DELETE' }).catch(() => {});
    }
  },

  saveSettings() {
    const storeName = document.getElementById('settingStoreName').value.trim();
    const storeTagline = document.getElementById('settingStoreTagline').value.trim();
    const runningText = document.getElementById('settingRunningText').value.trim();

    this.settings = { ...this.settings, storeName, storeTagline, runningText };
    this.saveLocal('pecel_settings', this.settings);
    this.broadcast('settings:updated', this.settings);
    this.applySettings();
    this.showAndroidToast('Pengaturan Toko & Teks TV Diperbarui');

    if (window.location.protocol.startsWith('http')) {
      fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ storeName, storeTagline, runningText })
      }).catch(() => {});
    }
  },

  openResetDayModal() {
    document.getElementById('resetModal').style.display = 'flex';
  },

  closeResetDayModal() {
    document.getElementById('resetModal').style.display = 'none';
  },

  executeResetDay() {
    const startNum = parseInt(document.getElementById('resetStartNumber').value, 10) || 100;
    const clearAll = document.getElementById('clearAllOrdersCheck').checked;

    if (clearAll) {
      this.orders = [];
    } else {
      this.orders = this.orders.filter(o => o.status === 'preparing' || o.status === 'ready');
    }

    this.settings.currentOrderNumber = startNum;
    this.saveLocal('pecel_orders', this.orders);
    this.saveLocal('pecel_settings', this.settings);
    this.broadcast('orders:sync', this.orders);
    this.broadcast('settings:updated', this.settings);
    this.renderAllOrderViews();
    this.closeResetDayModal();
    this.showAndroidToast(`Nomor Antrean Direset Mulai Dari #${startNum}`);

    if (window.location.protocol.startsWith('http')) {
      fetch('/api/orders/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resetCounter: true, startNumber: startNum, clearAll })
      }).catch(() => {});
    }
  },

  /* ========================================================================
     AUDIO & UTILITIES
     ======================================================================== */
  unlockAudio() {
    if (window.soundManager) {
      window.soundManager.unlockAudio().then(() => {
        const banner = document.getElementById('audioAlertBanner');
        if (banner) banner.style.display = 'none';
      });
    }
  },

  testSound(num = '101') {
    this.unlockAudio();
    if (window.soundManager) {
      window.soundManager.announceOrder(num, 'Pak Bambang');
      this.showAndroidToast(`Mengetes Bel & Panggilan #${num}`);
    }
  },

  toggleMute() {
    if (window.soundManager) {
      const isMuted = window.soundManager.toggleMute();
      const icon = document.getElementById('soundIcon');
      if (icon) {
        icon.className = isMuted ? 'fa-solid fa-volume-xmark' : 'fa-solid fa-volume-high';
      }
      this.showAndroidToast(isMuted ? 'Suara Dibisukan (Muted)' : 'Suara Diaktifkan');
    }
  },

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  },

  formatRupiah(num) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(num || 0);
  },

  escape(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
