# Lacaronexus — Creative Developer Portfolio

A cinematic, performance-first personal portfolio built with **Next.js 14 App Router**, **Three.js**, **Framer Motion**, **GSAP**, and **Tailwind CSS**.

---

## ✦ Why Next.js (App Router)?

| Concern | Solution |
|---|---|
| SEO | Metadata API built‑in — no extra library |
| Performance | `dynamic()` with `ssr: false` lazy-loads Three.js only in the browser |
| API routes | `/api/contact` handler lives in the same project |
| Routing | File-system routing, no boilerplate |
| Bundle splitting | Automatic per-layout/page |

---

## 📁 Folder Tree

```
Lacaronexus/
│
├── public/
│   ├── images/          # Project screenshot images
│   ├── fonts/           # Self-hosted webfonts (optional)
│   └── models/          # 3D .glb/.gltf assets (optional)
│
├── api/
│   └── contact/
│       └── route.js     # Mock contact form endpoint
│
├── src/
│   ├── app/
│   │   ├── layout.jsx   # Root layout (metadata, font preconnect, body)
│   │   ├── page.jsx     # Home page — assembles all sections
│   │   └── globals.css  # Tailwind directives + base styles
│   │
│   ├── components/
│   │   ├── Hero/        # Full-screen cinematic entry (ThreeScene + typed text)
│   │   ├── About/       # GSAP scroll-reveal text blocks + stats counter
│   │   ├── Skills/      # Interactive category tabs with animated skill badges
│   │   ├── Projects/    # Card grid + detail modal (filter by category)
│   │   ├── Certificates/# Scrolling certificate grid
│   │   ├── Footer/      # Contact CTA + animated email + socials
│   │   └── ThreeScene/  # @react-three/fiber particle cloud canvas
│   │
│   ├── hooks/
│   │   └── useScrollAnimation.js  # GSAP + ScrollTrigger custom hook
│   │
│   ├── data/
│   │   ├── projects.js       # Project entries (edit this to customize)
│   │   ├── certificates.js   # Certificate entries
│   │   └── skills.js         # Skill groups by category
│   │
│   ├── styles/
│   │   └── variables.css     # CSS custom properties (design tokens)
│   │
│   └── utils/
│       └── animationHelpers.js  # GSAP factory functions (fadeUpIn, stagger, etc.)
│
├── .gitignore
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

---

## 🎨 Design System

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#0a0a0a` | Canvas / page background |
| `--color-surface` | `#111111` | Cards, panels |
| `--color-accent` | `#e8ff47` | Electric lime — CTAs, active states |
| `--color-accent-2` | `#00ffe0` | Cyan — secondary highlights |
| `--color-muted` | `#6b6b6b` | Helper / body text |
| Font Display | Syne 800 | Bold headings |
| Font Sans | Inter | Body text |
| Font Mono | JetBrains Mono | Labels, badges, code |

---

## 🎬 Animation Logic

### Three.js (ThreeScene)
- **800 particles** in a `BufferGeometry` — single GPU draw call
- Per-frame: slow global rotation + sin-wave camera breathing
- Mouse → smooth lerp nudge (parallax feel), no physics lib needed

### Framer Motion (Hero)
- `variants` + `staggerChildren` — words slide up from `y: 110%` (overflow-hidden clipping)
- `layoutId="active-tab-bg"` — spring-animated pill follows active tab in Skills/Projects

### GSAP + ScrollTrigger (About, Certificates)
- `useScrollAnimation` hook attaches `gsap.from()` to any ref
- Triggers at `top 82%` and plays once (`toggleActions: 'play none none none'`)
- Cleanup kills tween + ScrollTrigger on component unmount to prevent memory leaks

### CSS-only
- Typewriter cursor: `animate-blink` (step-end keyframe)
- Scroll indicator: Framer Motion `y` keyframe loop
- Email underline: width transition `0 → 100%` on group-hover

---

## 🚀 Running Locally

### 1. Install dependencies
```bash
npm install
```

### 2. Start the dev server
```bash
npm run dev
```

### 3. Open in browser
```
http://localhost:3000
```

### 4. Build for production
```bash
npm run build
npm start
```

---

## ✏️ Customization

| File | What to edit |
|---|---|
| `src/data/projects.js` | Add / remove project cards |
| `src/data/skills.js` | Edit skill groups |
| `src/data/certificates.js` | Add certificates |
| `tailwind.config.js` | Change brand colors |
| `src/styles/variables.css` | CSS token tweaks |
| `src/components/Hero/Hero.jsx` | Edit headline / roles |
| `api/contact/route.js` | Wire real email sender |

---

## 🌐 Deploy

Recommended: **Vercel** (zero-config Next.js hosting)

```bash
npx vercel
```

---

## 📄 License

MIT — free to use and modify for personal and commercial projects.
