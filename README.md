# Portfolio — Vercel Ready + Supabase config.js

Versi ini dibuat supaya deployment Vercel sederhana: **`index.html` berada di ROOT repository**, jadi tidak perlu mengatur Root Directory ke `frontend`.

## Struktur
- `index.html` — halaman public
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

## Penting
`sb_publishable_...` boleh berada di frontend. Jangan pernah menaruh `sb_secret_...` atau service-role key di `config.js` atau repository.
