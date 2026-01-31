Here is the Product Requirements Document (PRD) formatted in clean Markdown. You can copy this directly into a file named `README.md` or `PRD.md` for your project repository.

---

# Product Requirements Document (PRD)

**Project Name:** Viral Quiz Engine (VQE)
**Working Title:** "The ANY Quiz Platform"
**Version:** 1.0
**Status:** Draft
**Target Audience:** Gen Z / Millennials (Mobile-first social media users)

---

## 1. Product Overview

### 1.1 Objective

To build a high-performance, aesthetically pleasing, and highly shareable web application that allows users to take "checklist-style" quizzes, receive a statistical ranking, and share personalized results on social media. The system must be modular to allow for unlimited future quizzes via simple configuration files.

### 1.2 Core Value Proposition

- **For Users:** A frictionless, fun, and visually rewarding way to "measure" their identity and compare it with peers (e.g., "How Taipei Are You?", "How Senior Dev Are You?").
- **For the Creator:** A "Quiz Engine" that can launch new viral trends in minutes by simply swapping a text file, with zero code changes required.

---

## 2. Functional Requirements (The "Must-Haves")

### 2.1 The Quiz Engine (Frontend)

- **Config-Driven Rendering:** The app must render questions dynamically based on a loaded JSON configuration file.
- _Requirement:_ Changing the JSON `title`, `theme_color`, or `questions` must instantly update the UI without redeploying code.

- **Local State Management:**
- Must track checked/unchecked status of up to 100 questions with zero latency.
- Must update a visual progress bar in real-time.

- **Interaction Triggers:**
- **Confetti:** Support a `trigger: "confetti"` property in JSON that fires a visual particle effect when specific checkboxes are clicked.
- **Haptics:** (Mobile only) Trigger `navigator.vibrate` on selection for tactile feedback.

### 2.2 The Scoring System (Backend)

- **Submission Handling:**
- Securely receive a payload containing: `quiz_id`, `raw_score`, and `checked_ids`.
- Store submission with a timestamp and a unique `session_id` (anonymous).

- **Statistical Calculation:**
- Calculate the user's **Percentile** against the historical dataset for that specific `quiz_id`.
- _Logic:_ `(Count of users with lower score / Total users) * 100`.

- **Achievement Logic:**
- Backend must parse `checked_ids` against defined "Combo Rules" (e.g., if IDs 1, 5, and 9 are checked, return badge "Night Owl").

### 2.3 The Viral Generator (Social Sharing)

- **Dynamic OG Image Generation:**
- The system must generate a unique image (PNG/JPG) for every result.
- **Required Elements in Image:** Large Score (%), Rank Title (e.g., "Certified Local"), Percentile text ("Top 10%"), and Domain Name.

- **Platform Optimization:**
- The share button must detect the user's device.
- _Mobile:_ Open native share sheet (Instagram Stories, Copy Link).
- _Desktop:_ Copy Link to clipboard.

### 2.4 The Quiz Generator (User Generated Content)

- **Creation Form:** A public-facing page (`/create`) allowing users to input a Title and a list of Questions.
- **Validation:** Prevent submission of empty questions or quizzes with < 5 questions.
- **Output:** Generate a unique, permanent URL for the user's new quiz (e.g., `site.com/quiz/xyz-123`).

---

## 3. Non-Functional Requirements (The "Quality Attributes")

### 3.1 Performance & Scalability

- **"Viral Spike" Handling:** The backend (Supabase/Vercel) must handle sudden traffic bursts (e.g., 10,000 concurrent users from a viral Tweet) without crashing.
- _Strategy:_ Use aggressive caching (ISR - Incremental Static Regeneration) for static assets.

- **Load Time:** First Contentful Paint (FCP) must be under **1.0 seconds** on 4G mobile networks.
- **Bundle Size:** Main JavaScript bundle must be < 100KB (Gzipped) to ensure instant interactivity.

### 3.2 UI/UX Design "Vibe Check"

- **Mobile-First:** All click targets (checkboxes) must be at least **44x44 pixels**.
- **Aesthetics:**
- Use "Neo-Brutalism" or "Clean Minimalist" style (high contrast, bold type, electric blue accents).
- Support Dark Mode/Light Mode toggling.

- **Frictionless:** No Login Required. No Email Collection. No "Next Page" buttons (Single Page Scroll).

### 3.3 Security & Privacy

- **Anonymity:** No Personally Identifiable Information (PII) shall be stored.
- **Rate Limiting:** Prevent a single IP from spamming the "Submit" endpoint to skew statistics (limit: 1 submission per minute per IP).
- **Input Sanitization:** Sanitize all inputs in the "Create Quiz" form to prevent XSS (Cross-Site Scripting) attacks.

---

## 4. System Architecture

### 4.1 Module Breakdown

1. **Module A (Quiz Engine):** Frontend React components responsible for rendering and user interaction.
2. **Module B (Registry):** Storage layer (Supabase JSON/Table) holding quiz configurations.
3. **Module C (Statistician):** Backend API responsible for scoring, percentile calculation, and database writes.
4. **Module D (Social Generator):** `@vercel/og` service for dynamic image creation.

---

## 5. Data Model Schema (JSON Configuration)

The system relies on a strict JSON schema. This is the "contract" between the content and the engine.

```json
{
  "meta": {
    "id": "taipei-og-test",
    "title": "How Taipei Are You?",
    "description": "The ultimate test for true locals.",
    "theme": {
      "primary": "#3B82F6",
      "background": "#FFFFFF"
    }
  },
  "grading": {
    "total_questions": 30,
    "tiers": [
      { "min": 0, "max": 10, "title": "Tourist 📷" },
      { "min": 11, "max": 25, "title": "Expat 🍺" },
      { "min": 26, "max": 30, "title": "Certified Local 🇹🇼" }
    ]
  },
  "questions": [
    {
      "id": 1,
      "text": "Have you ever chased a garbage truck?",
      "weight": 1,
      "trigger": "confetti"
    },
    {
      "id": 2,
      "text": "Do you own a Rain Card?",
      "weight": 1,
      "trigger": null
    }
  ],
  "achievements": [
    {
      "id": "trash_master",
      "title": "♻️ Recycling Pro",
      "condition": {
        "required_ids": [1],
        "mode": "all"
      }
    }
  ]
}
```

---

## 6. Implementation Roadmap

### Phase 1: The MVP (Days 1-3)

- **Setup:** Next.js repo + Supabase project.
- **Core:** Hardcode one JSON file. Build the rendering engine.
- **Backend:** Basic score counting and submission API.
- **Goal:** A working link you can send to 5 friends.

### Phase 2: The Viral Polish (Days 4-7)

- **Visuals:** Add animations (Framer Motion), confetti, and haptics.
- **Sharing:** Implement `@vercel/og` for dynamic social images.
- **Goal:** The site looks professional and "Instagrammable."

### Phase 3: The Generator (Week 2)

- **Expansion:** Build the `/create` page.
- **Database:** Update schema to support dynamic quiz storage (User Generated Content).
- **Goal:** Allow users to create their own content.
