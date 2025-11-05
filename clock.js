// clock.js - Jam Digital CLI dengan ASCII Full-Block
// Jalankan dengan: node clock.js

// Definisi bentuk setiap digit menggunakan karakter full-block
const digitShapes = {
  '0': [
    '█████',
    '█   █',
    '█   █',
    '█   █',
    '█   █',
    '█   █',
    '█████'
  ],
  '1': [
    '  █  ',
    ' ██  ',
    '  █  ',
    '  █  ',
    '  █  ',
    '  █  ',
    '█████'
  ],
  '2': [
    '█████',
    '    █',
    '    █',
    '█████',
    '█    ',
    '█    ',
    '█████'
  ],
  '3': [
    '█████',
    '    █',
    '    █',
    '█████',
    '    █',
    '    █',
    '█████'
  ],
  '4': [
    '█   █',
    '█   █',
    '█   █',
    '█████',
    '    █',
    '    █',
    '    █'
  ],
  '5': [
    '█████',
    '█    ',
    '█    ',
    '█████',
    '    █',
    '    █',
    '█████'
  ],
  '6': [
    '█████',
    '█    ',
    '█    ',
    '█████',
    '█   █',
    '█   █',
    '█████'
  ],
  '7': [
    '█████',
    '    █',
    '    █',
    '    █',
    '    █',
    '    █',
    '    █'
  ],
  '8': [
    '█████',
    '█   █',
    '█   █',
    '█████',
    '█   █',
    '█   █',
    '█████'
  ],
  '9': [
    '█████',
    '█   █',
    '█   █',
    '█████',
    '    █',
    '    █',
    '█████'
  ],
  ':': [
    '   ',
    '   ',
    ' █ ',
    '   ',
    ' █ ',
    '   ',
    '   '
  ]
};

// Fungsi untuk mendapatkan waktu saat ini dalam format HH:MM:SS
function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

// Fungsi untuk merender jam dalam ASCII art
function renderClock(timeString) {
  const chars = timeString.split('');
  const height = digitShapes['0'].length;
  
  // Render baris demi baris (horizontal)
  for (let row = 0; row < height; row++) {
    let line = '';
    
    // Untuk setiap karakter dalam string waktu
    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];
      const shape = digitShapes[char];
      
      if (shape) {
        line += shape[row];
        // Tambahkan spasi pemisah antar digit (kecuali untuk titik dua)
        if (i < chars.length - 1 && char !== ':' && chars[i + 1] !== ':') {
          line += '  ';
        }
      }
    }
    
    console.log(line);
  }
}

// Fungsi untuk menampilkan jam
function displayClock() {
  console.clear();
  
  // Tambahkan header
  console.log('\n');
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║           JAM DIGITAL CLI - ASCII FULL-BLOCK               ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('\n');
  
  const timeString = getCurrentTime();
  renderClock(timeString);
  
  // Tambahkan footer
  console.log('\n');
  console.log('─────────────────────────────────────────────────────────────');
  console.log('  Tekan Ctrl+C untuk keluar');
  console.log('\n');
}

// Fungsi utama
function main() {
  // Tampilkan jam pertama kali
  displayClock();
  
  // Update setiap detik
  const intervalId = setInterval(displayClock, 1000);
  
  // Handle graceful exit
  process.on('SIGINT', () => {
    clearInterval(intervalId);
    console.clear();
    console.log('\n👋 Terima kasih telah menggunakan Jam Digital CLI!\n');
    process.exit(0);
  });
}

// Jalankan aplikasi
main();