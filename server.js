const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const fs = require('fs');
const os = require('os');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const MENU_FILE = path.join(DATA_DIR, 'menu.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Helpers for Data Reading & Writing
function readJSON(filePath, fallback = []) {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2), 'utf-8');
      return fallback;
    }
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return fallback;
  }
}

function writeJSON(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
    return false;
  }
}

// In-Memory state synced to JSON
let orders = readJSON(ORDERS_FILE, []);
let menu = readJSON(MENU_FILE, { categories: [], items: [] });
let settings = readJSON(SETTINGS_FILE, {
  storeName: "Nasi Pecel Bu Ning's",
  storeTagline: "Cita Rasa Asli Madiun & Tradisional Lezat",
  storeAddress: "Jl. Raya Pecel Madiun No. 88, Jawa Timur",
  storePhone: "0812-3456-7890",
  runningText: "SELATAT DATANG DI NASI PECEL BU NING'S • BUMBU ASLI KACANG SANGRAI KHAS MADIUN TANPA PENGAWET • MOHON PERIKSA NOMOR ANTREAN PADA STRUK ANDA • TERSEDIA BUMBU PECEL KEMASAN OLEH-OLEH & ANEKA PEYEK RENYAH • MENERIMA PESANAN NASI KOTAK & CATERING",
  currentOrderNumber: 105,
  audioEnabled: true,
  voiceEnabled: true
});

// REST API Endpoints

// 1. MENU API
app.get('/api/menu', (req, res) => {
  res.json(menu);
});

app.post('/api/menu/item', (req, res) => {
  const newItem = {
    id: `item-${Date.now()}`,
    name: req.body.name || 'Menu Baru',
    category: req.body.category || 'pecel',
    price: parseInt(req.body.price, 10) || 10000,
    description: req.body.description || '',
    image: req.body.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80',
    badge: req.body.badge || '',
    available: req.body.available !== false,
    options: req.body.options || {}
  };

  menu.items.push(newItem);
  writeJSON(MENU_FILE, menu);
  io.emit('menu:updated', menu);
  res.status(201).json(newItem);
});

app.put('/api/menu/item/:id', (req, res) => {
  const { id } = req.params;
  const idx = menu.items.findIndex(it => it.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Menu tidak ditemukan' });
  }

  menu.items[idx] = { ...menu.items[idx], ...req.body };
  writeJSON(MENU_FILE, menu);
  io.emit('menu:updated', menu);
  res.json(menu.items[idx]);
});

app.delete('/api/menu/item/:id', (req, res) => {
  const { id } = req.params;
  menu.items = menu.items.filter(it => it.id !== id);
  writeJSON(MENU_FILE, menu);
  io.emit('menu:updated', menu);
  res.json({ success: true });
});

// 2. SETTINGS API
app.get('/api/settings', (req, res) => {
  res.json(settings);
});

app.post('/api/settings', (req, res) => {
  settings = { ...settings, ...req.body };
  writeJSON(SETTINGS_FILE, settings);
  io.emit('settings:updated', settings);
  res.json({ success: true, settings });
});

// 3. ORDERS API
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.post('/api/orders', (req, res) => {
  const { customerName, orderType, items, paymentMethod, notes } = req.body;
  if (!items || !items.length) {
    return res.status(400).json({ error: 'Daftar item pesanan tidak boleh kosong' });
  }

  // Increment order number
  let nextNum = (parseInt(settings.currentOrderNumber, 10) || 100) + 1;
  settings.currentOrderNumber = nextNum;
  writeJSON(SETTINGS_FILE, settings);

  const orderNumberStr = String(nextNum).padStart(2, '0');
  const total = items.reduce((sum, it) => sum + (it.price * (it.qty || 1)), 0);

  const newOrder = {
    id: `ord-${Date.now()}`,
    orderNumber: orderNumberStr,
    customerName: customerName ? customerName.trim() : `Pelanggan #${orderNumberStr}`,
    orderType: orderType || 'dine-in', // 'dine-in' | 'takeaway'
    status: 'preparing', // 'preparing' | 'ready' | 'completed' | 'cancelled'
    paymentMethod: paymentMethod || 'Tunai',
    items,
    notes: notes || '',
    total,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  orders.unshift(newOrder);
  writeJSON(ORDERS_FILE, orders);

  // Broadcast to all connected clients
  io.emit('order:created', newOrder);
  io.emit('orders:sync', orders);

  res.status(201).json(newOrder);
});

app.patch('/api/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['preparing', 'ready', 'completed', 'cancelled'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Status pesanan tidak valid' });
  }

  const orderIndex = orders.findIndex(o => o.id === id || o.orderNumber === id);
  if (orderIndex === -1) {
    return res.status(404).json({ error: 'Pesanan tidak ditemukan' });
  }

  const order = orders[orderIndex];
  const oldStatus = order.status;
  order.status = status;
  order.updatedAt = new Date().toISOString();

  writeJSON(ORDERS_FILE, orders);

  io.emit('order:updated', order);
  io.emit('orders:sync', orders);

  // If newly moved to READY, trigger announcement
  if (status === 'ready' && oldStatus !== 'ready') {
    io.emit('order:call', {
      orderNumber: order.orderNumber,
      orderType: order.orderType,
      customerName: order.customerName,
      message: `Nomor antrean ${order.orderNumber}, silakan ambil di kasir`
    });
  }

  res.json(order);
});

// Re-call order (repeat announcement)
app.post('/api/orders/:id/call', (req, res) => {
  const { id } = req.params;
  const order = orders.find(o => o.id === id || o.orderNumber === id);
  if (!order) {
    return res.status(404).json({ error: 'Pesanan tidak ditemukan' });
  }

  io.emit('order:call', {
    orderNumber: order.orderNumber,
    orderType: order.orderType,
    customerName: order.customerName,
    message: `Panggilan ulang: Nomor antrean ${order.orderNumber}, silakan ambil di kasir`
  });

  res.json({ success: true, message: 'Panggilan berhasil dikirim' });
});

// Delete / Cancel order
app.delete('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  const idx = orders.findIndex(o => o.id === id || o.orderNumber === id);
  if (idx !== -1) {
    orders[idx].status = 'cancelled';
    orders[idx].updatedAt = new Date().toISOString();
    writeJSON(ORDERS_FILE, orders);
    io.emit('order:updated', orders[idx]);
    io.emit('orders:sync', orders);
  }
  res.json({ success: true });
});

// Reset Day API
app.post('/api/orders/reset', (req, res) => {
  const { resetCounter, startNumber, clearAll } = req.body;
  
  if (clearAll) {
    orders = [];
  } else {
    // Only keep preparing and ready orders
    orders = orders.filter(o => o.status === 'preparing' || o.status === 'ready');
  }
  
  if (resetCounter) {
    settings.currentOrderNumber = parseInt(startNumber, 10) || 0;
    writeJSON(SETTINGS_FILE, settings);
    io.emit('settings:updated', settings);
  }

  writeJSON(ORDERS_FILE, orders);
  io.emit('orders:sync', orders);
  res.json({ success: true, count: orders.length });
});

// 4. REPORTS SUMMARY API
app.get('/api/reports/summary', (req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  
  const todayOrders = orders.filter(o => o.createdAt && o.createdAt.slice(0, 10) === today);
  const completedOrders = todayOrders.filter(o => o.status === 'completed');
  const activeOrders = todayOrders.filter(o => o.status === 'preparing' || o.status === 'ready');
  const cancelledOrders = todayOrders.filter(o => o.status === 'cancelled');

  const totalRevenue = completedOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  const potentialRevenue = todayOrders.reduce((sum, o) => o.status !== 'cancelled' ? sum + (o.total || 0) : sum, 0);

  // Top selling items
  const itemMap = {};
  todayOrders.forEach(order => {
    if (order.status !== 'cancelled') {
      (order.items || []).forEach(it => {
        if (!itemMap[it.name]) {
          itemMap[it.name] = { name: it.name, qty: 0, revenue: 0 };
        }
        itemMap[it.name].qty += (it.qty || 1);
        itemMap[it.name].revenue += ((it.price || 0) * (it.qty || 1));
      });
    }
  });

  const topItems = Object.values(itemMap).sort((a, b) => b.qty - a.qty).slice(0, 5);

  res.json({
    date: today,
    totalTransactions: todayOrders.length,
    completedCount: completedOrders.length,
    activeCount: activeOrders.length,
    cancelledCount: cancelledOrders.length,
    totalRevenue,
    potentialRevenue,
    topItems,
    recentOrders: todayOrders.slice(0, 20)
  });
});

// Helper for Network IP
function getLocalIPs() {
  const interfaces = os.networkInterfaces();
  const addresses = [];
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        addresses.push(net.address);
      }
    }
  }
  return addresses;
}

// Socket.IO Events
io.on('connection', (socket) => {
  socket.emit('orders:sync', orders);
  socket.emit('menu:updated', menu);
  socket.emit('settings:updated', settings);

  socket.on('order:create', (orderData, ack) => {
    let nextNum = (parseInt(settings.currentOrderNumber, 10) || 100) + 1;
    settings.currentOrderNumber = nextNum;
    writeJSON(SETTINGS_FILE, settings);

    const orderNumberStr = String(nextNum).padStart(2, '0');
    const total = (orderData.items || []).reduce((sum, it) => sum + (it.price * (it.qty || 1)), 0);

    const newOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNumberStr,
      customerName: orderData.customerName ? orderData.customerName.trim() : `Pelanggan #${orderNumberStr}`,
      orderType: orderData.orderType || 'dine-in',
      status: 'preparing',
      paymentMethod: orderData.paymentMethod || 'Tunai',
      items: orderData.items || [],
      notes: orderData.notes || '',
      total,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    orders.unshift(newOrder);
    writeJSON(ORDERS_FILE, orders);

    io.emit('order:created', newOrder);
    io.emit('orders:sync', orders);

    if (typeof ack === 'function') ack({ success: true, order: newOrder });
  });

  socket.on('order:update-status', ({ id, status }, ack) => {
    const orderIndex = orders.findIndex(o => o.id === id || o.orderNumber === id);
    if (orderIndex !== -1) {
      const order = orders[orderIndex];
      const oldStatus = order.status;
      order.status = status;
      order.updatedAt = new Date().toISOString();
      writeJSON(ORDERS_FILE, orders);

      io.emit('order:updated', order);
      io.emit('orders:sync', orders);

      if (status === 'ready' && oldStatus !== 'ready') {
        io.emit('order:call', {
          orderNumber: order.orderNumber,
          orderType: order.orderType,
          customerName: order.customerName,
          message: `Nomor antrean ${order.orderNumber}, silakan ambil di kasir`
        });
      }
      if (typeof ack === 'function') ack({ success: true, order });
    }
  });

  socket.on('order:call', ({ id }) => {
    const order = orders.find(o => o.id === id || o.orderNumber === id);
    if (order) {
      io.emit('order:call', {
        orderNumber: order.orderNumber,
        orderType: order.orderType,
        customerName: order.customerName,
        message: `Nomor antrean ${order.orderNumber}, silakan ambil di kasir`
      });
    }
  });
});

server.listen(PORT, () => {
  const ips = getLocalIPs();
  console.log(`\n======================================================`);
  console.log(`🍲  SISTEM TERINTEGRASI DISPLAY ORDER & POS NASI PECEL BU NING'S  🍲`);
  console.log(`======================================================`);
  console.log(`🖥️  Aplikasi aktif di:`);
  console.log(`   - Local PC : http://localhost:${PORT}`);
  ips.forEach(ip => {
    console.log(`   - Jaringan Wi-Fi / TV : http://${ip}:${PORT}`);
  });
  console.log(`======================================================\n`);
});
