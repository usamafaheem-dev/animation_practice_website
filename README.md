# Animation Practice Website

A modern Next.js 16 website focused on motion-heavy UI, 3D hero visuals, and scroll-driven animation sections.

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- Framer Motion
- Three.js + React Three Fiber + Drei

## Features

- Interactive 3D hero scene with animated objects
- Scroll-synced frame animation section (`/public/frames`)
- Animated testimonials marquee
- Reusable section-based landing page layout
- Responsive design for desktop and mobile

## Getting Started

### 1) Install dependencies

```bash
pnpm install
```

### 2) Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `pnpm dev` – run development server
- `pnpm build` – create production build
- `pnpm start` – start production server
- `pnpm lint` – run ESLint

## Project Structure

```text
app/
  components/        # Page sections and UI components
  page.tsx           # Main landing page composition
public/
  frames/            # Image sequence for scroll animation
lib/
  utils.ts           # Shared helpers
```

## Notes

- The 3D scene is client-rendered and dynamically imported to avoid SSR issues.
- Frame-sequence animation is optimized to preload on larger screens.
