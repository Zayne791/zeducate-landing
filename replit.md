# Zeducate Landing Page

## Overview
A Next.js landing page for Zeducate, an expert tutoring service. The site features a quiz form to help users check if their child qualifies for a free trial lesson.

## Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom configuration
- **Animations**: Framer Motion
- **Icons**: Heroicons

## Project Structure
```
src/
├── app/
│   ├── layout.tsx    # Root layout with fonts and meta
│   ├── page.tsx      # Homepage
│   └── globals.css   # Global styles
└── components/
    ├── Hero.tsx          # Hero section
    ├── QuizForm.tsx      # Lead capture form
    ├── Benefits.tsx      # Benefits section
    └── SmoothScroll.tsx  # Scroll behavior
```

## Development
- Run: `npm run dev -- -p 5000 -H 0.0.0.0`
- Build: `npm run build`
- Production: `npm run start -- -p 5000`

## Configuration
- `next.config.js` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS customization
- `tsconfig.json` - TypeScript settings
