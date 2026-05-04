# 🌿 E4rth

**Premium AI-powered plant intelligence platform**
Diagnose plant diseases, generate care plans, track growth, and manage your botanical ecosystem with a modern, immersive SaaS experience.

---

## 🚀 Overview

E4rth is a full-stack SaaS application designed to bring **AI-driven plant care** into a clean, production-grade web platform.

It combines:

- 🌱 AI plant diagnosis
- 📊 growth & health analytics
- 🧠 AI chatbot assistant
- 🔔 real-time notifications
- 📈 lifecycle tracking

All wrapped in a **premium, nature-inspired UI** with scalable architecture.

---

## ✨ Core Features

### 🧠 AI Plant Diagnosis

- Upload plant images for instant analysis
- Detect diseases with confidence scores
- Get severity insights and treatment suggestions
- Maintain scan history

---

### 🌿 Plant Management

- Add and manage plants
- Categorize with tags (Indoor, Outdoor, etc.)
- Detailed plant profiles with lifecycle tracking

---

### 🌱 AI Care Plans

- AI-generated watering, sunlight, and fertilizer schedules
- Dynamic updates based on plant condition

---

### 📊 Growth & Health Analytics

- Track height, leaf count, and health scores
- Visualize trends using interactive charts
- Analyze plant health over time

---

### 🧾 Timeline & History

- Maintain plant logs and progress
- Visual timeline of growth and recovery

---

### 💬 AI Chat Assistant

- Ask plant-related questions
- Context-aware responses based on your plants
- Markdown-rendered responses with structured answers

---

### 🔔 Notifications System

- Care reminders
- Disease alerts
- Real-time updates (WebSocket-ready)

---

### ⚡ Performance & UX

- Smooth animations with Framer Motion
- Glassmorphism UI with botanical design
- Responsive and mobile-friendly
- Optimized data fetching via hooks/services

---

## 🧱 Tech Stack

### Frontend

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS v4**
- **Motion**
- **Chart.js**

### Backend

- **Next.js Route Handlers**
- **Drizzle ORM**
- **PostgreSQL via Neon**
- **Clerk Authentication**
- **Cloudinary**

### AI & Realtime

- **Google Gemini API**
- **Redis (Upstash)**
- **WebSockets (Socket.io)**

---

## 🏗️ Architecture

E4rth follows a **clean, scalable layered architecture**:

```txt
Frontend Component
   ↓
Hook
   ↓
Frontend Service
   ↓
API Route
   ↓
Server Service Layer
   ↓
Repository Layer
   ↓
Database
```

### Key Principles

- Separation of concerns
- Strong typing across layers
- Reusable services & hooks
- Minimal business logic in UI
- Modular feature-based structure

---

## ⚙️ Environment Variables

Create a `.env` file:

```env
# GEMINI
GEMINI_API_KEY=

# CLERK
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=

# DATABASE
DATABASE_URL=

# WEBSOCKET
WEBSOCKET_PORT=4001

# REDIS
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
REDIS_URL=

# STRIPE
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# CLOUDINARY
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_CLOUD_NAME=

# NEXT APP
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_WS_URL=
```

---

## 🧪 Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run Websocket
npm run websocket
```

---

## 🌍 Deployment

Recommended:

- **Vercel** for Main App
- **Render / Railway** for WebSocket

---

## 🧠 Design Philosophy

E4rth is designed to feel like:

- 🌿 calm & nature-first
- ✨ premium SaaS
- 🧠 intelligent and responsive
- 🎯 highly usable and polished

---

## 🔮 Roadmap

- [ ] Activate Stripe subscription system
- [ ] AI response streaming
- [ ] Advanced analytics insights
- [ ] Mobile app version
- [ ] Multi-user plant sharing

---

## 📄 License

MIT License

---

## 👨‍💻 Author

Built by a full-stack developer focused on:

- modern frontend systems
- scalable architecture
- premium UI/UX

---

## ⭐ If you like this project

Give it a star ⭐ — it helps a lot!
