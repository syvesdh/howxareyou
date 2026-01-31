# 🚀 Viral Quiz Engine (VQE) **[This is a Template for the markdown file]**
![Status](https://img.shields.io/badge/Status-In%20Development-yellow)
![License](https://img.shields.io/badge/license-Apache%202.0-blue)

<!-- TODO: later we can change to this auto update badge when we have a CI/CD pipeline
![Build Status](https://img.shields.io/badge/build-passing-brightgreen) -->
> **Build the next viral hit. Zero boilerplate. Just JSON.**

A high-performance, config-driven engine for creating viral "checklist-style" quizzes (e.g., _"How Taipei Are You?"_, _"The Developer Purity Test"_). Built to handle viral traffic spikes with a serverless architecture and generate dynamic, shareable social media images on the fly.

**[View Demo](https://your-demo-link.com)** · **[Report Bug](https://www.google.com/search?q=https://github.com/yourusername/repo/issues)** · **[Request Feature](https://www.google.com/search?q=https://github.com/yourusername/repo/issues)**

Created: 13/01/2026
Last Updated: 20/01/2026

---

## ✨ Features

- **📄 Config-Driven Architecture:** Create entirely new quizzes just by editing a single `JSON` file. No code changes required.
- **📊 Real-Time Percentiles:** Backend logic calculates exactly how a user stacks up against the global average (e.g., _"You scored higher than 82% of users"_).
- **🖼️ Dynamic Social Images:** Automatically generates unique Open Graph (OG) images for Instagram/Twitter sharing with the user's specific score and rank.
- **🎉 "Delight" Triggers:** Built-in support for confetti explosions, haptic feedback, and easter egg achievements based on specific answer combinations.
- **⚡ High Performance:** <1s load times, optimized for mobile traffic, and fully serverless (Next.js + Supabase).

## 🛠️ Tech Stack

- **Frontend:** Next.js 14 (App Router), Tailwind CSS, Framer Motion
- **Backend:** Supabase (PostgreSQL + Edge Functions)
- **Image Gen:** `@vercel/og`
- **State:** React Context + Local Storage (for persistence)

---

## 📋 Table of Contents

1. [Prerequisites & Setup](#1-clone-the-repo)
2. [Running the Code](#2-configure-environment)
3. [Configuration](#3-run-locally)
4. [How to Create a New Quiz](#4-how-to-create-a-new-quiz)

---


## 🚀 Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/viral-quiz-engine.git
cd viral-quiz-engine
npm install

```

### 2. Configure Environment

Rename `.env.example` to `.env.local` and add your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key

```

### 3. Run Locally

```bash
npm run dev

```

Open `http://localhost:3000` to see the engine in action.

---

## 🧩 How to Create a New Quiz

You don't need to touch the React code. Just modify `config/quiz-data.json`:

```json
{
  "meta": {
    "title": "The OG Developer Test",
    "theme": "#10b981"
  },
  "questions": [
    {
      "id": 1,
      "text": "Have you ever deployed to production on a Friday?",
      "trigger": "confetti"
    },
    {
      "id": 2,
      "text": "Do you understand how to quit Vim?"
    }
  ],
  "grading": [
    { "min": 0, "max": 10, "rank": "Junior Dev" },
    { "min": 11, "max": 20, "rank": "10x Engineer" }
  ]
}
```

## 📸 Screenshots

| Quiz Interface                                    | Shareable Result                                    |
| ------------------------------------------------- | --------------------------------------------------- |
| <img src="/docs/screenshot-quiz.png" width="200"> | <img src="/docs/screenshot-result.png" width="200"> |

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

### 🌟 Star this repo if you find it useful!
