# 🍲 Aplikasi Display Order & KDS Model McD - Nasi Pecel Bu Ning's

Aplikasi sistem antrean pemesanan modern ala McDonald's yang dirancang khusus untuk restoran tradisional **Nasi Pecel Bu Ning's**. Dilengkapi dengan pemanggilan nomor otomatis (suara bel ding-dong & pengumuman suara Bahasa Indonesia), Layar Dapur (KDS), Layar Kasir (POS), dan Kiosk Pemesanan Mandiri.

---

## 🌟 Fitur Utama

1. **Layar Display TV Pelanggan (Model McD)** (`/display.html`)
   - Pembagian 2 Kolom Kontras Tinggi:
     - **SEDANG DIPERSIAPKAN** (*In Preparation*)
     - **SIAP DIAMBIL** (*Ready for Pickup*) dengan efek highlight berpendar.
   - **Suara Bel Ding-Dong & Panggilan Suara**:
     - Nada bel sintetis 3-tone ala restoran modern (tanpa ketergantungan file eksternal).
     - Suara Text-To-Speech (TTS) Bahasa Indonesia: *"Nomor antrean 102, silakan ambil di kasir"*.
   - **Pop-Up Panggilan Nomor Raksasa**: Banner notifikasi animasi saat nomor pelanggan dipanggil.
   - **Running Text (Ticker)**: Teks pengumuman berjalan di bagian bawah layar.
   - **Banner Promo Carousel**: Menampilkan menu spesial & oleh-oleh secara bergantian.
   - **Jam Digital Real-Time & Tanggal** dalam format Bahasa Indonesia.
   - Tombol **Layar Penuh (F11 / Fullscreen)** untuk TV.

2. **Layar Dapur / Barista (Kitchen Display System - KDS)** (`/kds.html`)
   - Tiket pesanan otomatis masuk secara real-time via WebSocket.
   - Timer durasi memasak dengan indikator warna:
     - 🟢 Hijau (< 5 menit)
     - 🟡 Kuning (5-10 menit)
     - 🔴 Merah Berkedip (> 10 menit)
   - Rincian pesanan lengkap (Level pedas, jenis wadah pincuk daun pisang / piring / bungkus, catatan khusus).
   - Tombol aksi satu klik:
     - **Mulai Siapkan**
     - **Panggil / Siap Diambil** (langsung membunyikan bel & suara di TV!)
     - **Panggil Ulang** (mengulangi panggilan suara di TV)
     - **Selesai (Sudah Diambil)**
   - Nada notifikasi saat ada pesanan baru masuk dari kasir/kiosk.

3. **Layar Kasir & Order Entry (POS)** (`/pos.html`)
   - Katalog menu visual dengan tab kategori:
     - *Paket Hemat & Juara*
     - *Nasi & Lontong Pecel*
     - *Lauk Tambahan (Empal Daging, Ayam Lengkuas, Paru, Telur Asin, dll)*
     - *Gorengan & Aneka Peyek*
     - *Minuman Segar (Es Teh Melati, Wedang Uwuh, Es Cendol Dawet)*
     - *Oleh-Oleh & Bumbu Pecel Sangrai*
   - Popup kustomisasi pesanan (Pilihan pedas, wadah, telur dadar/ceplok, catatan).
   - Pilihan Makan di Tempat (*Dine-In*) vs Bungkus (*Takeaway*).
   - Penomoran antrean otomatis (#101, #102, ...).
   - **Cetak Struk Virtual**: Format thermal receipt 58mm/80mm lengkap dengan nomor antrean raksasa.

4. **Kiosk Pemesanan Mandiri Pelanggan** (`/kiosk.html`)
   - Tampilan sentuh ramah pelanggan ala kiosk McDonald's.
   - Layar awal selamat datang: Pilih *Makan di Sini* atau *Bawa Pulang*.
   - Pelanggan memilih menu dan level pedas sendiri.
   - Konfirmasi pesanan & tiket nomor antrean mandiri.

5. **Portal Hub & Pengaturan** (`/index.html`)
   - Dashboard pusat untuk membuka semua layar.
   - Statistik antrean langsung (*Live Counter*).
   - Form ganti Teks Berjalan di TV (*Running Text*).
   - Tombol **Mulai Hari Baru** untuk mereset nomor antrean kembali ke #01 atau #100.

---

## 🚀 Cara Menjalankan

### Cara Cepat (Windows):
Cukup klik ganda (double-click) file:
👉 **`JALANKAN_APLIKASI.bat`**

Browser akan otomatis terbuka mengarah ke Portal Hub di `http://localhost:3000`.

### Cara Manual via Terminal:
```bash
npm start
```

---

## 📺 Menghubungkan ke Smart TV / Android TV / Tablet Kasir (Satu Jaringan Wi-Fi)

Jika Anda memiliki Smart TV di restoran atau ingin membuka Kasir dari Tablet/HP lain:
1. Pastikan Smart TV dan komputer ini terhubung ke jaringan **Wi-Fi yang sama**.
2. Di browser Smart TV (atau HP kasir/dapur), buka alamat IP komputer:
   - **Layar TV Display**: `http://192.168.18.19:3000/display.html`
   - **Layar Kasir (POS)**: `http://192.168.18.19:3000/pos.html`
   - **Layar Dapur (KDS)**: `http://192.168.18.19:3000/kds.html`
   - **Kiosk Mandiri**: `http://192.168.18.19:3000/kiosk.html`

> **Tips Layar TV**: Setelah membuka `display.html` di browser TV, tekan tombol Fullscreen di pojok kanan atas atau klik banner kuning untuk mengaktifkan izin suara bel & pemanggilan otomatis.

---

## 📁 Struktur File Proyek

```
PECEL BU NING'S/
├── package.json               # Konfigurasi dependensi (Express, Socket.IO)
├── server.js                 # Server backend REST API & WebSocket Realtime
├── JALANKAN_APLIKASI.bat      # Script 1-klik jalan aplikasi
├── BUKA_LAYAR_TV.bat          # Pintasan membuka layar TV
├── data/
│   ├── menu.json             # Menu lengkap Nasi Pecel Bu Ning's
│   ├── orders.json           # Data antrean pesanan tersimpan
│   └── settings.json         # Pengaturan toko & teks berjalan
└── public/
    ├── css/
    │   └── style.css         # Desain responsif tema McD & Bu Ning
    ├── js/
    │   ├── sound.js          # Generator bel ding-dong & TTS Bahasa Indonesia
    │   ├── display.js        # Logika Layar TV Display Pelanggan
    │   ├── kds.js            # Logika Layar Dapur KDS
    │   ├── pos.js            # Logika Kasir & Struk Thermal
    │   └── kiosk.js          # Logika Kiosk Mandiri
    ├── index.html            # Portal Hub / Dashboard Utama
    ├── display.html          # Layar TV Display Antrean Model McD
    ├── kds.html              # Layar Dapur KDS
    ├── pos.html              # Layar Kasir POS
    └── kiosk.html            # Layar Kiosk Mandiri
```

Selamat menyajikan Nasi Pecel Bu Ning's dengan pengalaman antrean modern kelas dunia! 🍛✨
