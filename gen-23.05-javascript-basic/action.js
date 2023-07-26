// Fungsi untuk ganti gambar
function gantiGambar(sumberGambar) {
    // Ambil elemen gambar depan yang akan diganti
    const gambarDepan = document.querySelector('.leftchild img');
    
    // Ganti sumber gambar depan dengan sumber gambar yang diklik
    gambarDepan.src = sumberGambar;
}





// Fungsi untuk tombol ukuran dan kuantitas
// Ambil semua elemen tombol ukuran
const buttons = document.querySelectorAll('.button-size');

// Ambil elemen input untuk quantity
const quantityInput = document.getElementById('Quantity');

// Tambahkan event listener untuk setiap tombol ukuran
buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Periksa apakah tombol memiliki kelas 'button-size-active'
        const isActive = button.classList.contains('button-size-active');

        // Jika tombol sudah aktif, maka hapus kelas 'button-size-active'
        if (isActive) {
            button.classList.remove('button-size-active');
            // Set nilai quantity menjadi 0 saat tombol dinonaktifkan
            quantityInput.value = '0';
        } else {
            // Jika tombol belum aktif, maka jalankan logika seperti sebelumnya
            const activeButton = document.querySelector('.button-size-active');
            if (activeButton) {
                activeButton.classList.remove('button-size-active');
            }

            button.classList.add('button-size-active');

            // Set nilai quantity menjadi 1 saat tombol diaktifkan
            quantityInput.value = '1';
        }
    });
});

// Ambil elemen tombol untuk Tambah dan Kurang
const plusButton = document.querySelector('.button-quantity-plus');
const minusButton = document.querySelector('.button-quantity-minus');

// Tambahkan event listener untuk tombol Tambah
plusButton.addEventListener('click', () => {
    // Konversi nilai quantity menjadi angka
    let currentQuantity = parseInt(quantityInput.value);
    
    // Tambahkan 1 ke nilai quantity
    currentQuantity++;
    
    // Update nilai quantity pada input element
    quantityInput.value = currentQuantity;
});

// Tambahkan event listener untuk tombol Kurang
minusButton.addEventListener('click', () => {
    // Konversi nilai quantity menjadi angka
    let currentQuantity = parseInt(quantityInput.value);
    
    // Kurangi 1 dari nilai quantity, tetapi pastikan tidak lebih kecil dari 0
    currentQuantity = Math.max(currentQuantity - 1, 0);
    
    // Update nilai quantity pada input element
    quantityInput.value = currentQuantity;
});





// Fungsi untuk menangani klik tombol "Tambah ke Keranjang"
function addToCart() {
    // Menampilkan popup konfirmasi
    var konfirmasi = confirm("Tambahkan item ini ke keranjang?");
    
    // Jika pengguna mengklik OK pada popup konfirmasi, lakukan tindakan yang diinginkan
    if (konfirmasi) {
        // Menampilkan pesan alert untuk menunjukkan bahwa item telah ditambahkan.
        alert("Item berhasil ditambahkan ke keranjang!");
    }
}

// Mengaitkan fungsi addToCart ke acara klik tombol "Tambah ke Keranjang"
document.querySelector(".button-add-to-cart").addEventListener("click", addToCart);





// fungsi ...