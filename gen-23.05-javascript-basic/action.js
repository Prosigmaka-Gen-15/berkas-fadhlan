function gantiGambar(sumberGambar) {
    // Ambil elemen gambar depan yang akan diganti
    const gambarDepan = document.querySelector('.leftchild img');

    // Ganti sumber gambar depan dengan sumber gambar yang diklik
    gambarDepan.src = sumberGambar;
}