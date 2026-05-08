# Frontend Design System — Dark Cinematic

**Reference aesthetic:** A24 films, Netflix, Apple editorial, Criterion Collection.
**Anti-reference:** Bootstrap, Material UI, Tailwind starter kits, generic SaaS dashboards, "AI startup" purple-gradient aesthetic.

---

## 1. Color Palette

Every color decision starts here. No exceptions.

### Core Tokens

```css
:root {
  /* Backgrounds — layered depth, never flat black */
  --bg:      #141414;   /* page base — warm near-black, not pure #000 */
  --bg2:     #181818;   /* card surface, sidebar */
  --bg3:     #232323;   /* elevated surface, hover state base */
  --bg4:     #2a2a2a;   /* tooltip, popover, highest elevation */

  /* Accent — one red, used sparingly */
  --red:     #e50914;   /* primary accent: Netflix red */
  --red2:    #f40612;   /* hover state of red */
  --red-dim: rgba(229,9,20,.15);   /* tinted background */
  --red-glow:rgba(229,9,20,.4);    /* box-shadow / text-shadow glow */

  /* Text — always slightly off-white, never pure #fff on dark */
  --text:    #e5e5e5;   /* body text */
  --dim:     #b3b3b3;   /* secondary text, captions */
  --muted:   #737373;   /* disabled, placeholder */
  --white:   #ffffff;   /* headlines only, high-contrast moments */

  /* Borders — invisible until needed */
  --border:      rgba(255,255,255,.08);
  --border-mid:  rgba(255,255,255,.12);
  --border-hi:   rgba(255,255,255,.20);
}
```

### Gradient Language

Gradients are directional storytelling. Every gradient has a reason.

```css
/* Page fade — content emerging from darkness */
background: linear-gradient(to bottom, #141414 0%, #0a0a0a 100%);

/* Hero vignette — cinematic depth-of-field feel */
background:
  linear-gradient(to right,  rgba(0,0,0,.85) 0%, rgba(0,0,0,.4) 50%, transparent 100%),
  linear-gradient(to top,    #141414 0%, transparent 40%);

/* Card overlay — text legibility on images */
background: linear-gradient(to top,
  rgba(0,0,0,.95) 0%,
  rgba(0,0,0,.6)  30%,
  rgba(0,0,0,.15) 65%,
  transparent     100%);

/* Ambient glow behind a carousel/featured section */
background: radial-gradient(60% 60% at 50% 45%, var(--glow-color), transparent 70%);
filter: blur(70px);
opacity: .7;

/* Red beam / light leak — adds drama to hero sections */
background: linear-gradient(180deg,
  transparent            0%,
  rgba(229,9,20,.04)    30%,
  rgba(229,9,20,.08)    50%,
  rgba(229,9,20,.04)    70%,
  transparent           100%);
transform: rotate(-15deg);
```

### What NOT to Do

- No purple, teal, or "AI blue" (`#6366f1`, `#8b5cf6`, `#06b6d4`) as accents.
- No pure `#000000` backgrounds — use `#141414` or `#0a0a0a` for depth.
- No pure `#ffffff` body text — use `#e5e5e5`.
- No flat color fills on cards — always a subtle gradient or dark radial.
- No more than **one accent color** active on a page simultaneously.

---

## 2. Typography

### Font Stack

```css
/* Headlines — Bebas Neue: cinematic weight, no apologies */
font-family: var(--font-bebas-neue), 'Bebas Neue', sans-serif;

/* Body — DM Sans: editorial, warm, slightly geometric */
font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
```

### Type Scale

Based on a **1.333 (perfect fourth)** ratio, anchored at 16px.

| Token       | Size (clamp)                          | Font         | Weight | Use                            |
|-------------|---------------------------------------|--------------|--------|--------------------------------|
| `--t-hero`  | `clamp(80px, 10vw, 140px)`            | Bebas Neue   | 400    | Hero name, single-word impact  |
| `--t-h1`    | `clamp(64px, 9vw, 120px)`            | Bebas Neue   | 400    | Section CTA                    |
| `--t-h2`    | `clamp(48px, 5vw, 72px)`             | Bebas Neue   | 400    | Section titles                 |
| `--t-h3`    | `clamp(28px, 2.4vw, 38px)`           | Bebas Neue   | 400    | Card titles, sub-sections      |
| `--t-h4`    | `22px`                                | Bebas Neue   | 400    | Row titles, skill names        |
| `--t-body`  | `17px`                                | DM Sans      | 400    | Primary body copy              |
| `--t-body-sm`| `14px`                               | DM Sans      | 400    | Secondary body, list items     |
| `--t-caption`| `12px`                               | DM Sans      | 500    | Metadata, labels               |
| `--t-label` | `11px`                                | DM Sans      | 700    | Overlines, section labels      |
| `--t-tag`   | `10.5px`                              | DM Sans      | 700    | Pill tags, badges              |

### Typography Rules

**Line heights:**
- Display (Bebas Neue): `0.88–0.95` — tight, cinematic
- Body: `1.7–1.8` — airy, readable
- Captions/labels: `1.2–1.4` — compact

**Letter spacing:**
- Bebas Neue headlines: `1px–2px` — slight opening, not tight
- Overline labels (`--t-label`): `4px` — always uppercase + tracking
- Tags/badges: `2–3px` — uppercase micro-type
- Body: `0` (default) — never track body text

**The overline pattern** — used before every section title:
```jsx
<div style={{
  fontSize: '11px', fontWeight: 700,
  letterSpacing: '4px', textTransform: 'uppercase',
  color: 'var(--red)', marginBottom: '16px',
}}>
  Section Label
</div>
<h2 style={{ fontFamily: 'var(--font-bebas-neue)', fontSize: 'clamp(48px,5vw,72px)' }}>
  Title Here<br/>
  With <span style={{ color: 'var(--red)' }}>Accent Word</span>
</h2>
```

---

## 3. Spacing System

**Base unit: 8px.** Every margin, padding, and gap is a multiple of 8.

```
4px  — micro (icon gap, tag internal padding)
8px  — xs    (tight inline spacing)
12px — sm    (between related elements)
16px — md    (standard gap)
24px — lg    (component internal padding)
32px — xl    (between sub-sections)
40px — 2xl   (component gap)
48px — 3xl   (section breathing room mobile)
60px — 4xl   (section padding desktop)
80px — 5xl   (section top/bottom padding)
120px— 6xl   (hero/CTA section padding)
```

**Section padding pattern:**
```css
/* Desktop */
padding: 80px 60px;

/* Mobile (max-width: 900px) */
padding: 60px 24px;
```

**Max-widths:**
```
Content column:  1400px
Wide grid:       1700px
Single video:    1280px
```

---

## 4. Component Patterns

### 4.1 — Card (Base)

Every card shares these foundations. Never deviate from the layering order.

```tsx
<div style={{
  position: 'relative',
  borderRadius: '20px',         /* 20px for large cards, 14px for medium, 8px for small */
  overflow: 'hidden',
  background: 'linear-gradient(145deg, #161616 0%, #0a0a0a 100%)',
  border: '1px solid var(--border)',
  boxShadow: '0 20px 50px -20px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.03) inset',
  isolation: 'isolate',         /* REQUIRED: prevents blend-mode bleed */
  transition: 'transform .5s cubic-bezier(.22,.85,.27,1.01), border-color .4s, box-shadow .5s',
}}>
  {/* Layer 1 (z:0): background image/video */}
  {/* Layer 2 (z:1): gradient overlay — text legibility */}
  {/* Layer 3 (z:2): content */}
  {/* Layer 4 (z:3+): interactive elements (play button, badge) */}
</div>
```

**Hover state — always lift, never just color change:**
```tsx
whileHover={{
  y: -4,
  borderColor: 'var(--border-hi)',
  boxShadow: '0 30px 70px -20px rgba(0,0,0,.85), 0 0 0 1px rgba(255,255,255,.12) inset, 0 0 80px -20px var(--card-glow)',
}}
```

### 4.2 — Glass Morphism

Used for overlays, mini-players, HUDs. Not for primary cards.

```css
/* Standard glass */
background: rgba(22,22,22,.55);
backdrop-filter: blur(28px) saturate(1.6);
-webkit-backdrop-filter: blur(28px) saturate(1.6);
border: 1px solid rgba(255,255,255,.08);
border-radius: 999px;  /* pill */
box-shadow: 0 22px 50px rgba(0,0,0,.45), 0 0 0 1px rgba(255,255,255,.03) inset;

/* Light glass (navigation, tooltips) */
background: rgba(20,20,20,.55);
backdrop-filter: blur(18px) saturate(1.6);
border: 1px solid rgba(255,255,255,.10);
border-radius: 50%;
```

**Rules:**
- Backdrop blur only on elements that float above content (nav, player, modal).
- Never blur behind static layout elements.
- Always pair with a subtle inset box-shadow for depth.

### 4.3 — Pill Badge / Tag

```tsx
/* Accent tag (live indicator, featured label) */
<span style={{
  display: 'inline-flex', alignItems: 'center', gap: '7px',
  fontSize: '10.5px', fontWeight: 700,
  letterSpacing: '2.5px', textTransform: 'uppercase',
  color: '#fff', padding: '5px 11px',
  background: 'rgba(255,255,255,.08)',
  border: '1px solid rgba(255,255,255,.18)',
  backdropFilter: 'blur(14px) saturate(1.4)',
  borderRadius: '999px',
}}>
  {/* Dot indicator — use with live/active states only */}
  <span style={{
    width: '6px', height: '6px', borderRadius: '50%',
    background: 'var(--red)',
    boxShadow: '0 0 10px var(--red)',
    animation: 'pulse 1.8s ease infinite',
  }} />
  LABEL
</span>

/* Red badge (flagship, featured) */
background: rgba(229,9,20,.85);
/* no backdrop-filter needed — solid enough */
```

### 4.4 — CTA Button

```tsx
/* Primary — white fill (cinematic inversion) */
<a style={{
  display: 'inline-flex', alignItems: 'center', gap: '8px',
  background: '#fff', color: '#000',
  padding: '14px 32px', fontWeight: 700, fontSize: '16px',
  textDecoration: 'none', transition: 'background .2s',
}}>
  <PlayIcon />
  View Work
</a>

/* Secondary — ghost / dark glass */
<a style={{
  background: 'rgba(109,109,110,.7)', color: '#fff',
  backdropFilter: 'blur(4px)',
  padding: '14px 32px', fontWeight: 600,
}}>
  My Story
</a>

/* Pill CTA — used in bento tiles, contact section */
<span style={{
  display: 'inline-flex', alignItems: 'center', gap: '8px',
  fontSize: '13px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase',
  color: '#fff', padding: '14px 24px',
  background: 'var(--red)', borderRadius: '999px',
  transition: 'transform .25s, background .2s, box-shadow .3s',
}}>
  Start a Project
  <ArrowIcon />
</span>
/* Hover: translateX(6px) on text content, box-shadow with red glow */
```

### 4.5 — Image Card (with cinematic overlay)

```tsx
/* Structure for any card with a background image */
<div style={{ position: 'relative', isolation: 'isolate', overflow: 'hidden' }}>
  {/* 1. The image */}
  <img style={{
    position: 'absolute', inset: 0, width: '100%', height: '100%',
    objectFit: 'cover',
    filter: 'saturate(1.05) contrast(1.05)',
    transition: 'transform .9s cubic-bezier(.22,.85,.27,1.01), filter .6s',
  }} />

  {/* 2. Cinematic gradient — always to top, dark at bottom */}
  <div style={{
    position: 'absolute', inset: 0, zIndex: 1,
    background: 'linear-gradient(to top, rgba(0,0,0,.95) 0%, rgba(0,0,0,.6) 25%, rgba(0,0,0,.15) 55%, transparent 80%)',
  }} />

  {/* 3. Optional: glass sheen (subtle iridescence) */}
  <div style={{
    position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
    background: 'linear-gradient(135deg, rgba(255,255,255,.18) 0%, transparent 25%, transparent 75%, rgba(120,180,255,.12) 100%)',
    mixBlendMode: 'overlay', opacity: .7,
  }} />

  {/* 4. Content — z-index 3+ */}
</div>

/* Hover: scale image 1.04–1.07, increase saturation */
/* img hover: transform: scale(1.05); filter: saturate(1.2) contrast(1.1) */
```

### 4.6 — Bento Grid Stat Tile

```tsx
<div style={{
  position: 'relative',
  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
  padding: '24px 24px 22px',
  '--bt-accent': '#ff7a00',   /* per-tile accent color */
} as CSSProperties}>

  {/* Top-right glyph icon */}
  <div style={{
    position: 'absolute', top: '18px', right: '20px',
    width: '36px', height: '36px',
    background: 'rgba(255,255,255,.05)',
    border: '1px solid rgba(255,255,255,.1)',
    borderRadius: '10px', color: 'var(--bt-accent)',
  }} />

  {/* Giant number — gradient text, bottom-aligned */}
  <div style={{
    fontFamily: 'var(--font-bebas-neue)',
    fontSize: 'clamp(70px, 7vw, 110px)',
    lineHeight: .85, marginTop: 'auto',
    /* gradient text via background-clip */
    background: 'linear-gradient(180deg, #fff 0%, var(--bt-accent) 130%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }} />

  {/* Label with accent dash */}
  <div style={{
    fontSize: '12px', fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase',
    color: 'rgba(255,255,255,.65)',
    display: 'flex', alignItems: 'center', gap: '8px',
  }}>
    <span style={{ width: '14px', height: '1px', background: 'var(--bt-accent)' }} />
    Label Here
  </div>
</div>
```

---

## 5. Animation Principles

### The Rules

1. **Dramatic, not frantic.** Slower than you think — 600–800ms for reveals.
2. **Ease is everything.** Always `cubic-bezier(.22,.85,.27,1.01)` — a slight overshoot that feels alive.
3. **Stagger reveals.** Never animate a group of elements at the same time. Delay each by 80–120ms.
4. **Depth through parallax.** Elements further back move slower. Foreground snaps.
5. **No bounces on utility elements.** Bounce/spring only on expressive moments (hero name, play button pop).
6. **Respect `prefers-reduced-motion`.** All animations off, no exceptions.

### Easing Tokens

```ts
const EASE       = [.22,.85,.27,1.01] as [number,number,number,number]  /* standard — slight overshoot */
const EASE_SNAP  = [.2,.8,.3,1]       as [number,number,number,number]  /* fast settle, no overshoot */
const EASE_SPRING= [.2,.85,.25,1.4]   as [number,number,number,number]  /* expressive spring, cards/icons */
```

### Scroll Reveal Pattern

**Every section** enters this way — no raw opacity-only fades.

```tsx
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-60px' }}
  transition={{ duration: .7, ease: EASE }}
>
```

**Staggered children** (cards, list items, grid tiles):
```tsx
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: .08 } },
}
const item = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: .6, ease: EASE } },
}

<motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}>
  {items.map(item => <motion.div variants={item} key={item.id} />)}
</motion.div>
```

**Word-by-word title reveal** (section headings):
```tsx
/* Split text into word spans, each with a clip + translateY reveal */
.reveal-word { display: inline-block; overflow: hidden; vertical-align: baseline; }
.reveal-word > span {
  display: inline-block;
  transform: translateY(110%); opacity: 0;
  transition: transform .85s cubic-bezier(.22,.85,.27,1.01), opacity .6s;
  transition-delay: calc(var(--w, 0) * 80ms + 100ms);
}
.visible .reveal-word > span { transform: translateY(0); opacity: 1; }
```

### Hero Name 3D Parallax

Letters respond to cursor proximity with lift + scale + glow:
```ts
const power = Math.max(0, 1 - distanceToCursor / RADIUS)   /* 0–1 falloff */
letter.style.setProperty('--lift',  `${-power * 22}px`)
letter.style.setProperty('--scale', `${1 + power * 0.18}`)
letter.style.setProperty('--glow',  `${power}`)
/* CSS reads these vars on .hn-letter via transform and text-shadow */
```

### Specific Timing Table

| Element                  | Duration | Delay      | Easing        |
|--------------------------|----------|------------|---------------|
| Section overline label   | 600ms    | 0ms        | EASE          |
| Section h2 reveal        | 700ms    | 100ms      | EASE          |
| Body paragraph           | 600ms    | 200ms      | EASE          |
| Card (each in grid)      | 600ms    | i × 100ms  | EASE          |
| Card hover lift          | 500ms    | —          | EASE          |
| Image zoom on hover      | 900ms    | —          | EASE          |
| Play button pop (spring) | 700ms    | —          | EASE_SPRING   |
| Marquee scroll           | 38s      | —          | linear        |
| Nav fade-in at load      | 800ms    | 0ms        | ease-out      |
| Hero badge               | 800ms    | 300ms      | fadeup        |
| Hero name letters        | 1000ms   | i × 55ms   | EASE_SPRING   |
| Hero portrait            | 1400ms   | 1100ms     | EASE          |
| Progress bar fill        | 8s       | —          | linear/loop   |

### Glow / Ambient Effects

Ambient glows are blurred absolutely-positioned divs — not box-shadows.

```tsx
/* Carousel ambient — changes color with active card */
<div style={{
  position: 'absolute', inset: '-8% -10%', zIndex: 0,
  pointerEvents: 'none',
  filter: 'blur(70px)', opacity: .7,
  transition: 'background 1.1s ease',  /* slow color crossfade */
  background: `radial-gradient(60% 60% at 50% 45%, ${activeGlow}, transparent 70%)`,
}} />

/* Card glow on hover — behind the card, not box-shadow */
.card::before {
  content: ''; position: absolute; inset: -3px; z-index: -1;
  border-radius: inherit;
  background: radial-gradient(60% 60% at 50% 50%, var(--card-glow), transparent 70%);
  filter: blur(22px); opacity: 0;
  transition: opacity .4s;
}
.card:hover::before { opacity: .85; }
```

---

## 6. The Anti-Patterns

These patterns immediately break the aesthetic. Never use them.

| Anti-pattern                            | Why it breaks the design                           | Correct alternative                            |
|-----------------------------------------|----------------------------------------------------|------------------------------------------------|
| `border-radius: 50%` on images          | Circular crops look social-media, not editorial    | `border-radius: 14–22px` with overflow:hidden  |
| Colored borders (blue, purple)          | Feels like a CMS template                          | `rgba(255,255,255,.08–.20)` only               |
| White or colored backgrounds            | Destroys the dark editorial immersion              | `#141414` → `#232323` range only               |
| Drop shadows with color (blue-shadow)   | Looks cheap, web-2.0                               | Only `rgba(0,0,0,X)` shadows + glow radials    |
| `font-weight: 900` on body text         | Screaming, not cinematic                           | Max 700 for UI labels, 400–500 for body        |
| Full-bleed bright images without overlay | Text unreadable, no cinematic depth               | Always layer gradient overlay over images      |
| `transform: scale(1.5)` on hover       | Panic hover, not confident hover                   | Max `scale(1.07)` on hover; `y: -4` to lift   |
| Rapid animations under 200ms           | Feels like a utility tool, not a film site         | Min 400ms for any visible motion               |
| Purple / teal as accent                 | "AI startup" cliché, destroys identity             | `#e50914` red and white only                   |
| Generic icon libraries (Heroicons raw) | Recognizable UI components break immersion         | Custom SVG or minimal stroke icons at 1.6–1.8w |
| `text-transform: uppercase` on body    | Aggressive, hard to read                           | Uppercase only for overlines, tags, labels     |
| `backdrop-filter` on everything        | Overuse makes it look like iOS settings            | Glass only on floating layers (nav, player)    |
| `@keyframes bounce`                    | Playful, not cinematic                             | Overshoot cubic-bezier only, no true bounce    |

---

## 7. Scan Lines & Texture

Subtle texture distinguishes premium dark UIs from flat dark UIs.

```css
/* CRT scan line overlay — barely visible, adds analog warmth */
.scan-lines {
  position: absolute; inset: 0; pointer-events: none;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0,0,0,.03) 2px,
    rgba(0,0,0,.03) 4px
  );
}

/* Film grain on hero sections (CSS, no image needed) */
.grain::after {
  content: ''; position: absolute; inset: 0;
  background-image: url("data:image/svg+xml,...");   /* SVG noise */
  opacity: .03; mix-blend-mode: overlay; pointer-events: none;
}

/* Inset highlight — gives surfaces a top-lit look */
box-shadow: 0 0 0 1px rgba(255,255,255,.06) inset;
```

---

## 8. Responsive Breakpoints

Two breakpoints only. Simple.

```
Desktop: > 900px   — full layout, 60px horizontal padding
Mobile:  ≤ 900px   — stacked layout, 24px horizontal padding
Wide:    > 1100px  — portrait images visible, expanded grids
```

```css
/* Desktop default — always write desktop-first */
padding: 80px 60px;
grid-template-columns: repeat(3, 1fr);

/* Mobile */
@media (max-width: 900px) {
  padding: 60px 24px;
  grid-template-columns: 1fr;
}
```

---

## 9. Quick Reference — What This Site Is

When in doubt, ask: **would this feel at home on the A24 website?**

- Dark. Every surface is a shade of near-black.
- Red is the only accent. One red. Nowhere else.
- Typography is the hero. Giant Bebas Neue headings. Sparse body copy.
- Images have overlays. Always. No raw images on dark backgrounds.
- Motion is slow, deliberate, inevitable — like a film reel starting.
- Glass is used surgically — player bar, navigation only.
- Spacing is generous. White space (black space here) is intentional.
- Components have depth. Shadows, glows, inset highlights — not flat.
