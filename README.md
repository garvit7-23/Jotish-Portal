# 🔮 Astrology Portal --- Assignment Submission

A modern astrology discovery platform built with **Next.js (App
Router)** featuring protected routes, interactive maps, analytics
dashboards, and AI-style insights.

This project focuses on **clean architecture, strong UX, and
production-level frontend patterns** rather than only visual
implementation.

------------------------------------------------------------------------

## 🚀 Live Features

✅ Secure login flow with protected routes\
✅ Astrologer listing with responsive UI\
✅ Interactive astrologer map with glowing markers\
✅ Analytics dashboard with charts & KPIs\
✅ Camera capture → AI-style analysis simulation\
✅ Welcome popup with onboarding feedback\
✅ Responsive navbar & branded footer\
✅ Graceful API fallback using mock data

------------------------------------------------------------------------

## 🧠 Architectural Highlights

• Protected Layout Wrapper for centralized auth guarding\
• Reusable Navbar & Footer for consistent navigation\
• Resilient API layer with mock fallback for stability\
• SSR-safe Leaflet integration using dynamic imports\
• Component-driven UI with modular structure\
• Auth-aware navigation & route protection

------------------------------------------------------------------------

## 🔐 Login Credentials

Username: testuser\
Password: Test123

------------------------------------------------------------------------

## ⚙️ Tech Stack

-   Next.js 16 (App Router)
-   React
-   Tailwind CSS
-   Leaflet (Map)
-   Lucide Icons

------------------------------------------------------------------------

## 🌐 Environment Variables

Create a `.env.local` file:

NEXT_PUBLIC_API_URL=your_api_endpoint

If API is unavailable, the app automatically falls back to mock data.

------------------------------------------------------------------------

## 📦 Installation & Run

git clone `<repo>`{=html}\
cd astrology-portal\
npm install\
npm run dev

------------------------------------------------------------------------

## 📌 Assumptions

-   API contract was not strictly defined, so a defensive API layer was
    implemented\
-   Login is simulated using localStorage for assignment purposes\
-   AI analysis is mocked to demonstrate UX flow

------------------------------------------------------------------------

## 🚀 Future Improvements

-   Real authentication with JWT / cookies\
-   Real AI analysis integration\
-   Marker clustering & advanced map analytics\
-   Booking / consultation scheduling\
-   Backend integration for persistence

------------------------------------------------------------------------

## 🙌 Notes

The goal of this submission was to demonstrate:

-   strong UI/UX thinking\
-   architectural awareness\
-   handling SSR challenges\
-   building resilient frontend experiences

## 🌐 Live Demo

[🚀 View Live Application](https://jotish-portal.vercel.app)