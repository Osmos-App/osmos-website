# Osmos Web Sitesi

[🇬🇧 English](README.md) · [🇹🇷 Türkçe](README.tr.md)

Bu depo, işletim sisteminize özel tasarlanmış yerel öncelikli sürüm kontrol sistemi olan **[Osmos](https://useosmos.com)** için hazırlanan ürün web sitesini ve bekleme listesi portalını içermektedir.

Site; güçlü bir CSS tasarım sistemi, akıcı tipografi, karanlık mod entegrasyonu ve Firebase destekli bekleme listesi mimarisi kullanılarak yüksek oranda optimize edilmiş, çok sayfalı bir ürün web sitesi olarak inşa edilmiştir.

> 🌐 [Read this in English](README.md)

---

## 🏗 Mimari ve Teknolojiler

- **Frontend Build Aracı:** Vite
- **Stil Yönetimi:** Vanilla CSS (TailwindCSS v4 utility tabanlı) ve özel tasarım token sistemi (`globals.css`).
- **Backend ve Hosting:** Firebase Hosting, Cloud Functions ve Firestore.
- **E2E Testleri:** Python Playwright (`test_osmos.py`).

---

## 📂 Dizin Yapısı

```text
├── src/
│   ├── globals.css         # Temel stil sistemi, tasarım değişkenleri (tokens)
│   └── main.js             # İstemci mantığı (Karanlık mod, formlar, animasyonlar)
├── public/                 # Statik dosyalar ve vektörel içerikler
├── index.html              # Ana HTML yapısı (Anasayfa)
├── privacy.html            # Gizlilik Politikası sayfası
├── macos/                  # macOS platform sayfası
├── windows/                # Windows platform sayfası
├── linux/                  # Linux platform sayfası
├── android/                # Android platform sayfası
├── features/               # Özellikler sayfası
├── security/               # Güvenlik sayfası
├── pricing/                # Fiyatlandırma sayfası
├── open-source/            # Açık Kaynak (Open Source) sayfası
├── docs/                   # Dokümantasyon sayfası
├── blog/                   # Blog sayfası
├── download/               # İndirme sayfası
├── vite.config.js          # Vite yapılandırma dosyası
├── firebase.json           # Firebase Hosting ve Emülatör ayarları
├── firestore.rules         # Firestore veritabanı güvenlik kuralları
├── test_osmos.py           # Playwright uçtan uca (E2E) Python test süiti
└── package.json            # Frontend paket ve script tanımları
```

---

## 🛠 Yerel Geliştirme (Local Development)

### Ön Koşullar

- Node.js (v22+)
- Firebase CLI (emülatör testleri ve dağıtım için)
- Python (E2E testleri çalıştırılacaksa `playwright` paketi ile)

### Siteyi Çalıştırma

1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

2. Vite geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```
   Site şu adreste yayına girecektir: `http://localhost:5173`.

### Üretime Hazırlama (Build)

Siteyi derlemek ve üretim ortamı için minimize etmek adına:
```bash
npm run build
```
Bu komut, yayınlanmaya hazır ve optimize edilmiş bundle'ı `dist/` klasörü içerisine oluşturur.

---

## 🧪 Firebase Emülatörleri (Backend Testleri)

Firestore veritabanı yazma işlemlerini ve Cloud Functions tetikleyicilerini yerel makinenizde test etmek için:

1. Firebase Emülatörünü başlatın:
   ```bash
   npx firebase-tools emulators:start
   ```

2. Emülatör paneline `http://localhost:4000` üzerinden, mock frontend'e ise `http://localhost:5002` üzerinden erişebilirsiniz.

---

## 🚀 CI/CD ve Dağıtım

Dağıtım süreçleri GitHub Actions ile tamamen otomatikleştirilmiştir:

| GitHub Event | Tetiklenen Action | Hedef |
| --- | --- | --- |
| Pull Request | `firebase-hosting-pull-request.yml` | İnceleme için geçici bir "preview" (önizleme) kanalı oluşturur. |
| Push/Merge to `main` | `firebase-hosting-merge.yml` | `useosmos.com` üzerinden canlı ortama dağıtım (deploy) yapar. |

Manuel olarak hosting alanına deploy yapmak için:
```bash
npx firebase-tools deploy --only hosting
```

---

## 📄 Lisans

Bu proje MIT Lisansı altında sunulmaktadır. Daha fazla detay için [LICENSE](LICENSE) dosyasına göz atabilirsiniz.
