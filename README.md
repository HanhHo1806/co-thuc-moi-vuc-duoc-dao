# 🍜 Có Thực Mới Vực Được Đạo

> *"Có Thực Mới Vực Được Đạo"* — You need to eat to have strength to follow the path

A **production-grade gamified web application** that transforms networking/cybersecurity/cloud certification studying into a Vietnamese food-reward system. Every learning activity earns virtual food with real calorie counts and authentic Vietnamese cuisine theming.

[![CI](https://github.com/HanhHo1806/co-thuc-moi-vuc-duoc-dao/actions/workflows/ci.yml/badge.svg)](https://github.com/HanhHo1806/co-thuc-moi-vuc-duoc-dao/actions/workflows/ci.yml)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Prisma](https://img.shields.io/badge/Prisma-5-2D3748)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC)

---

## ✨ Features

### 🧠 Scientifically Proven Learning Methods
- **Spaced Repetition (SM-2)** — Cards scheduled at optimal review intervals
- **Feynman Technique** — Explain concepts simply to identify knowledge gaps
- **Pomodoro Technique** — 25-minute focus intervals with automatic session logging
- **Active Recall** — Flashcard flip interface with quality ratings

### 🍜 Food Reward System
- **30+ Vietnamese dishes** with real nutritional data
- Rarity tiers: Common → Uncommon → Rare → Epic → Legendary
- Collection view with locked/unlocked states

### 🔥 Gamification Engine
- **Calorie Earning** — Different activities earn different calories
- **Streak Multipliers** — Up to 3x for 100-day streaks
- **Level System** — 10 levels from Novice Cook to Grand Master
- **XP Points** — Earn XP from calories and achievements
- **Achievements** — 21 achievements to unlock

### 📚 Certification Tracking
- **CCNA (200-301)** — Vietnamese 🇻🇳 cuisine theme, 48 topics
- **CompTIA Security+ (SY0-701)** — Korean 🇰🇷 cuisine theme
- **AWS Solutions Architect Associate** — Japanese 🇯🇵 cuisine theme
- **AWS Security Specialty** — Thai 🇹🇭 cuisine theme
- **Microsoft AZ-500** — Indian 🇮🇳 cuisine theme
- **CKS (Kubernetes Security)** — Mexican 🇲🇽 cuisine theme

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL database (Supabase recommended)
- npm 10+

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/HanhHo1806/co-thuc-moi-vuc-duoc-dao.git
cd co-thuc-moi-vuc-duoc-dao

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# 4. Generate Prisma client
npm run db:generate

# 5. Run database migrations
npm run db:migrate

# 6. Seed the database
npm run db:seed

# 7. Start the development server
npm run dev
```

Visit http://localhost:3000

### 🗄️ Supabase Setup (step-by-step)

This app uses [Supabase](https://supabase.com) as its PostgreSQL database and authentication provider. Follow these steps to get your environment variables.

#### 1 — Create a free Supabase project

1. Go to **https://supabase.com** and sign in (GitHub login works perfectly).
2. Click **"New project"**, give it a name, set a **strong database password** (save it somewhere safe!), choose the region nearest to you, then click **"Create new project"**.
3. Wait about 2 minutes while Supabase provisions your database.

#### 2 — Get your API keys

Open your project, then go to **Project Settings → API**:

| Variable | Where to find it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | **Project URL** — looks like `https://xxxxxxxxxxxxxxxxxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | **Project API keys → anon / public** — the long JWT labelled "anon public" (safe to use in browser) |
| `SUPABASE_SERVICE_ROLE_KEY` | **Project API keys → service_role / secret** — ⚠️ keep this secret, never commit it |

#### 3 — Get your database connection strings

Go to **Project Settings → Database → Connection string → URI**:

| Variable | Where to find it |
|---|---|
| `DATABASE_URL` | Switch to the **Transaction** pooler (port **6543**). Copy the URI and replace `[YOUR-PASSWORD]` with your database password. Add `?pgbouncer=true` at the end. |
| `DIRECT_URL` | Switch to the **Session** pooler or use the **Direct connection** (port **5432**). Copy the URI and replace `[YOUR-PASSWORD]` with your database password. No `?pgbouncer=true` needed. |

> **Why two URLs?**  
> Prisma uses `DATABASE_URL` (PgBouncer pooled) at runtime for fast connections, and `DIRECT_URL` (direct) only when running `prisma migrate` because migrations use prepared statements that PgBouncer doesn't support.

#### 4 — Fill in your `.env` file

```bash
cp .env.example .env
# Open .env and replace each placeholder with the real value
```

Your filled-in `.env` should look like:

```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY4MDAwMDAwMCwiZXhwIjoxOTk1MDAwMDAwfQ.XXXX
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjgwMDAwMDAwLCJleHAiOjE5OTUwMDAwMDB9.XXXX
DATABASE_URL=postgresql://postgres.abcdefghijklmnop:MyStr0ngP@ssw0rd@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres:MyStr0ngP@ssw0rd@db.abcdefghijklmnop.supabase.co:5432/postgres
```

> 📝 See `.env.example` in the repo root for additional inline comments on every variable.

---

## 🎮 Gamification Rules

### Calorie Earning
| Activity | Calories |
|----------|----------|
| Study (per 30 min) | 150 cal |
| Lab Complete | 450 cal |
| Quiz Pass (>=80%) | 350 cal |
| Quiz Perfect (100%) | 500 cal + rare food |
| Feynman Write | 200 cal |
| Debug Challenge | 500 cal |
| Teach Session | 300 cal |
| SRS Review (per 30 min) | 100 cal |

### Streak Multipliers
| Streak | Multiplier |
|--------|-----------|
| 3 days | 1.1x |
| 7 days | 1.25x |
| 14 days | 1.5x |
| 30 days | 2.0x |
| 60 days | 2.5x |
| 100 days | 3.0x |

---

## 🧪 Testing

```bash
npm run test
```

78 tests covering SM-2 algorithm, calorie engine, and streak tracker.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animations**: Framer Motion
- **Database**: PostgreSQL via Supabase
- **ORM**: Prisma 5
- **State**: Zustand
- **Charts**: Recharts
- **Testing**: Vitest
- **CI/CD**: GitHub Actions

---

## 📄 License

MIT License

---

*"Có Thực Mới Vực Được Đạo" — Study hard, eat well, achieve greatness.* 🍜
