# st&u — Demo penelusuran klaim

Demo statis ini menampilkan alur dan tampilan hasil contoh. Semua hasil bertanda **SIMULASI**: aplikasi tidak memeriksa klaim, tidak mengambil paper, dan tidak membuat sitasi. Tombol pencarian hanya membuka layanan eksternal dengan kata kunci.

Tidak membutuhkan API, database, atau token.

## Jalankan lokal

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

## Deploy ke Vercel

Impor repository sebagai proyek Vite. Gunakan root directory proyek ini, build command `npm run build`, dan output directory `dist`. Berkas `vercel.json` sudah menetapkan build dan output tersebut.
