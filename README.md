# Bilyapay 🏆

[![Nuxt UI](https://img.shields.io/badge/Made%20with-Nuxt%20UI-00DC82?logo=nuxt&labelColor=020420)](https://ui.nuxt.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Google AI](https://img.shields.io/badge/Google_AI-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)

Bilyapay, Bilyoner verilerini kullanarak yapay zeka destekli futbol maçı tahminleri yapan modern bir web uygulamasıdır. Google Generative AI (Gemini) ile gelişmiş analizler sunar.

## ✨ Özellikler

- 🔍 **Gerçek Zamanlı Veri**: Bilyoner API'si üzerinden güncel maç verileri
- 🤖 **AI Destekli Analiz**: Google Gemini ile detaylı maç tahminleri
- 📊 **Kapsamlı İstatistikler**: Maç sonuçları, oyuncu performansları, lig durumu
- 👥 **Oyuncu Takibi**: Sakat ve cezalı oyuncu bilgileri
- 💬 **Topluluk Yorumları**: Kullanıcı yorumları ve bahis oranları
- 📱 **Responsive Tasarım**: Mobil uyumlu modern arayüz
- 🎯 **Tahmin Matrisi**: Kazanma olasılıkları ve gol beklentileri

## 🛠️ Teknoloji Stack

### Frontend
- **Nuxt 4** - Vue.js tabanlı full-stack framework
- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Tip güvenliği
- **Nuxt UI** - Modern UI bileşenleri
- **Tailwind CSS** - Utility-first CSS framework

### Backend & AI
- **Google Generative AI (Gemini)** - AI analiz motoru
- **Nuxt Server API** - Server-side endpoints
- **AI SDK** - Google AI entegrasyonu

### Veri Kaynağı
- **Bilyoner API** - Futbol maç verileri ve istatistikler

## 📋 Gereksinimler

- **Node.js** >= 22.12.0
- **pnpm** >= 10.26.1
- **Google AI API Key** (Gemini için)

## 🚀 Kurulum

### 1. Repoyu Klonlayın

```bash
git clone https://github.com/selimdoyranli/bilyapay.git
cd bilyapay
```

### 2. Bağımlılıkları Yükleyin

```bash
pnpm install
```

### 3. Environment Değişkenlerini Ayarlayın

`.env` dosyasını oluşturun ve aşağıdaki değişkenleri ekleyin:

```env
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key_here
```

> **Not**: Google AI API anahtarınızı almak için [Google AI Studio](https://makersuite.google.com/app/apikey)'ya gidin.

### 4. Geliştirme Sunucusunu Başlatın

```bash
pnpm dev
```

Uygulama `http://localhost:3000` adresinde çalışacaktır.

## 🔧 API Endpoints

### Bilyoner API Entegrasyonları

- `GET /api/bilyoner/match-detail?matchId={id}` - Maç detayları
- `GET /api/bilyoner/match-statistics?matchId={id}` - Maç istatistikleri
- `GET /api/bilyoner/match-missing-players?matchId={id}` - Eksik oyuncular
- `GET /api/bilyoner/match-comments?matchId={id}` - Maç yorumları
- `GET /api/bilyoner/trending-matches` - Trend maçlar

### AI Chat Endpoint

- `POST /api/chat` - AI analiz isteği

## 🎯 Nasıl Çalışır?

1. **Maç Seçimi**: Kullanıcı trend maçlar arasından bir maç seçer
2. **Veri Toplama**: Bilyoner API'sinden maç detayları, istatistikler, oyuncu bilgileri çekilir
3. **AI Analiz**: Google Gemini, toplanan verileri analiz eder ve tahmin üretir
4. **Sonuç Gösterimi**: Detaylı analiz raporu kullanıcıya sunulur

### AI Analiz İçeriği

AI aşağıdaki verileri kullanarak analiz yapar:
- Takım istatistikleri ve form durumu
- Oyuncu kadrosu ve eksik oyuncular
- Bahis oranları ve piyasa beklentileri
- Lig pozisyonu ve tarihsel performans
- Hakem ve stadyum bilgileri

## 🏗️ Geliştirme

### Kullanılabilir Komutlar

```bash
# Geliştirme sunucusu
pnpm dev

# Production build
pnpm build

# Production preview
pnpm preview

# TypeScript kontrolü
pnpm typecheck

# Lint kontrolü
pnpm lint
```

### Kod Kalitesi

Proje aşağıdaki araçlarla kod kalitesini korumaktadır:

- **ESLint** - Kod linting
- **TypeScript** - Tip kontrolü
- **Nuxt DevTools** - Geliştirme araçları

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 Creator

- **GitHub**: [@selimdoyranli](https://github.com/selimdoyranli)
- **Proje**: [Bilyapay](https://github.com/selimdoyranli/bilyapay)

---
