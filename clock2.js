/**
 * clock.js
 * Skrip Node.js murni untuk menampilkan jam digital CLI
 * dengan rendering seni ASCII "full-block" kustom.
 *
 * Cara Menjalankan: node clock.js
 * Untuk Berhenti:    Ctrl+C
 */

// 1. Struktur Data Angka (ASCII "Full-Block")
// Setiap digit memiliki lebar 5 karakter dan tinggi 7 baris.
// Karakter '█' (full block) dan ' ' (spasi) digunakan.
const digitShapes = {
  '0': [
    ' ███ ',
    '█   █',
    '█   █',
    '█   █',
    '█   █',
    '█   █',
    ' ███ '
  ],
  '1': [
    '  █  ',
    ' ██  ',
    '  █  ',
    '  █  ',
    '  █  ',
    '  █  ',
    ' ███ '
  ],
  '2': [
    ' ███ ',
    '█   █',
    '    █',
    '   █ ',
    '  █  ',
    ' █   ',
    '█████'
  ],
  '3': [
    '████ ',
    '    █',
    '    █',
    '  ██ ',
    '    █',
    '    █',
    '████ '
  ],
  '4': [
    '█  █ ',
    '█  █ ',
    '█  █ ',
    '█████',
    '   █ ',
    '   █ ',
    '   █ '
  ],
  '5': [
    '█████',
    '█    ',
    '█    ',
    '████ ',
    '    █',
    '█   █',
    ' ███ '
  ],
  '6': [
    ' ███ ',
    '█    ',
    '█    ',
    '████ ',
    '█   █',
    '█   █',
    ' ███ '
  ],
  '7': [
    '█████',
    '    █',
    '    █',
    '   █ ',
    '  █  ',
    ' █   ',
    ' █   '
  ],
  '8': [
    ' ███ ',
    '█   █',
    '█   █',
    ' ███ ',
    '█   █',
    '█   █',
    ' ███ '
  ],
  '9': [
    ' ███ ',
    '█   █',
    '█   █',
    ' ████',
    '    █',
    '    █',
    ' ███ '
  ],
  ':': [
    '     ', // 5 spasi
    '  █  ',
    '  █  ',
    '     ',
    '  █  ',
    '  █  ',
    '     '
  ]
};

// 2. Fungsi untuk Mendapatkan Waktu (Format HH:MM:SS)
/**
 * Mengambil waktu saat ini dan memformatnya sebagai string HH:MM:SS.
 * @returns {string} String waktu yang diformat.
 */
function getTimeString() {
  const now = new Date();
  // Gunakan padStart untuk memastikan format 2 digit (misal: '1' menjadi '01')
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  return `${hours}:${minutes}:${seconds}`; // Contoh: "14:30:05"
}

// 3. Logika Rendering Inti
/**
 * Menggambar jam ke konsol berdasarkan string waktu.
 * @param {string} timeString - String waktu, misal "14:30:05".
 */
function drawClock(timeString) {
  // Ambil tinggi dari salah satu digit (semua sama)
  const height = digitShapes['0'].length;
  // Pisahkan string waktu menjadi array karakter
  const chars = timeString.split(''); // e.g., ['1', '4', ':', '3', '0', ':', '0', '5']
  
  // Tentukan jarak antar karakter. Ubah di sini jika perlu.
  const I_SPACING = '  '; // 2 spasi

  // Loop untuk setiap baris (i) dari 0 sampai tinggi-1
  for (let i = 0; i < height; i++) {
    let line = ''; // Inisialisasi baris output
    
    // Loop untuk setiap karakter (char) dalam string waktu
    for (const char of chars) {
      // Ambil irisan (baris ke-i) dari bentuk ASCII karakter
      // Jika karakter tidak ditemukan (seharusnya tidak terjadi), fallback ke 5 spasi
      const artSlice = digitShapes[char] ? digitShapes[char][i] : '     ';
      
      // Gabungkan irisan secara horizontal, tambahkan spasi pemisah
      line += artSlice + I_SPACING;
    }
    
    // Cetak baris yang sudah lengkap ke konsol
    console.log(line);
  }
}

// 4. Fungsi Loop Utama & Pembaruan
/**
 * Memulai loop jam, membersihkan layar, dan menggambar ulang setiap detik.
 */
function startClock() {
  setInterval(() => {
    // 1. Bersihkan konsol sebelum menggambar ulang
    console.clear();
    
    // 2. Dapatkan string waktu saat ini
    const time = getTimeString();
    
    // 3. Gambar jam ke konsol
    drawClock(time);
    
  }, 1000); // Ulangi setiap 1000 ms (1 detik)
}

// 5. Penanganan Keluar (Exit)
// Tangkap sinyal 'SIGINT' (misalnya, saat pengguna menekan Ctrl+C)
process.on('SIGINT', () => {
  console.clear(); // Bersihkan layar saat keluar
  console.log('Jam dihentikan. Sampai jumpa!');
  process.exit(0); // Keluar dari proses node dengan sukses
});

// --- Mulai Eksekusi ---
console.log('Memulai Jam Digital ASCII... (Tekan Ctrl+C untuk berhenti)');
// Tahan sebentar agar pesan di atas terlihat sebelum loop dimulai
setTimeout(startClock, 500);