# Portfolio — Vercel Ready + Supabase config.js

Versi ini dibuat supaya deployment Vercel sederhana: **`index.html` berada di ROOT repository**, jadi tidak perlu mengatur Root Directory ke `frontend`.

## Struktur
- `index.html` — halaman public
- `about.html` — profil, pendidikan, dan skills
- `project.html` — daftar proyek
- `contact.html` — formulir kontak
- `gallery.html` — galeri kegiatan dan sertifikat
- `admin.html` — dashboard admin, tidak ditautkan dari public
- `config.js` — URL Supabase + Publishable Key
- `css/`, `js/`, `assets/` — file frontend
- `supabase.sql` — struktur database/RLS
- `vercel.json` — alias `/admin` ke `admin.html`

## Setup lokal
1. Isi `config.js`:
```js
window.SUPABASE_URL = "https://PROJECT.supabase.co";
window.SUPABASE_PUBLISHABLE_KEY = "sb_publishable_...";
```
2. Jalankan dengan Live Server.
3. Public: `http://localhost:3000/`
4. Admin: `http://localhost:3000/admin`

## Setup Supabase
1. Jalankan `supabase.sql`.
2. Buat user pada Authentication > Users.
3. Masukkan UUID user ke `public.admin` dengan role `admin`.

## Deploy ke Vercel
1. Push isi folder ini ke root repository GitHub.
2. Di Vercel pilih repository tersebut.
3. **Root Directory biarkan kosong/default (`./`)**.
4. Framework Preset: `Other` / static site.
5. Build Command: kosong.
6. Output Directory: kosong.
7. Deploy.

Setelah deploy:
- Public: `https://domain-kamu.vercel.app/`
- Admin: `https://domain-kamu.vercel.app/admin`

Tidak ada tombol Admin di public.

## Status pesan dan balasan email
Dashboard admin menampilkan status **Pending**, **Terkonfirmasi**, dan **Dibatalkan**. Untuk mengirim balasan, tulis jawaban pada pesan lalu klik **Konfirmasi & kirim email**. Email dikirim ke alamat yang dicantumkan pengirim melalui Resend, dan status menjadi terkonfirmasi setelah email berhasil dikirim.

1. Verifikasi domain pengirim di Resend.
2. Deploy fungsi Supabase dari root repository menggunakan Supabase CLI:
   `supabase functions deploy send-message-reply`
3. Simpan secret di project Supabase (jangan di `config.js`):
   `supabase secrets set RESEND_API_KEY=re_... MAIL_FROM="Muhammad Jundi <balasan@domain-terverifikasi.com>"`
4. Jalankan ulang `supabase.sql` di SQL Editor Supabase agar kolom status dan kebijakan admin tersedia.

Untuk tindakan **Pending** dan **Batalkan**, dashboard memperbarui status tanpa mengirim email. Jika pengiriman gagal, status tidak akan ditandai terkonfirmasi.

## Galeri kegiatan dan sertifikat
Pratinjau galeri ditampilkan di beranda. Halaman galeri lengkap dapat dibuka
dari menu **Galeri** atau `gallery.html`. Untuk menampilkan dokumentasi, simpan
file di `assets/gallery/` lalu tambahkan
judul, tipe (`activity` atau `certificate`), dan path file pada array
`galleryItems` di `js/gallery.js`. Sertifikat juga dapat menggunakan tautan
PDF pada properti `link`. Galeri menampilkan pesan kosong sampai datanya
ditambahkan.

## Penting
`sb_publishable_...` boleh berada di frontend. Jangan pernah menaruh `sb_secret_...` atau service-role key di `config.js` atau repository.
