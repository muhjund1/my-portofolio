Simpan foto kegiatan dan sertifikat di folder ini.

Lalu tambahkan datanya ke array galleryItems di ../js/gallery.js:
- type: "activity" untuk kegiatan atau "certificate" untuk sertifikat
- title: judul kegiatan/sertifikat
- description: keterangan singkat (opsional)
- date: tanggal atau tahun (opsional)
- image: path gambar, misalnya "./assets/gallery/nama-foto.jpg"
- link: path gambar/PDF atau URL sertifikat (opsional)

Sertifikat MHQ 10 Juz yang sudah tersedia ditampilkan sebagai contoh pertama.
Untuk sertifikat baru, salin blok objek yang sudah ada di galleryItems,
kemudian sesuaikan judul, keterangan, tanggal, dan nama file.
