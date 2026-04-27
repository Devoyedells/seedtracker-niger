# Niger State Seed Tracker — Visual Refresh PRD

## Original Problem Statement
Apply a strong, distinct visual identity to the Niger State edition of Seed Tracker so it does not look like a recolored Nigerian version. Tailwind CSS only. Do NOT modify server, API logic, auth logic, services/api.ts, package.json, or .env files. Backend keys (registrationState, stateCounts) preserved. Use existing motion library (no new deps).

## Architecture (untouched)
- Vite + React 18 + TS + Tailwind v4 in `/app/client`
- Server in `/app/server` — NOT modified
- API client `services/api.ts`, AuthContext — NOT modified

## Niger State Design System (in theme.css)
### Tokens
- `brand-green` #0d4d2c · `brand-green-deep` #083820 · `brand-green-ink` #052716
- `brand-soft` #e7f1e8 · `brand-mist` #f4f9f4
- `brand-sun` #b98a2e · `brand-sun-deep` #8f681f · `brand-sun-bright` #d6b25a
- `brand-cream` #fbf6e7

### Custom utility classes
- `niger-rule`, `niger-rule-wide` — gold heading dividers
- `niger-ticket` — chamfered ticket-style card clip-path
- `niger-clip-tl` — chamfered top-left corner
- `niger-slant-top`, `niger-slant-bottom` — diagonal section dividers
- `niger-grain-light`, `niger-grain-dark` — subtle agricultural grain pattern
- `niger-weave` — premium woven hero/sidebar background
- `niger-emblem-ring` — gold ring used around icons
- `niger-btn-primary`, `niger-btn-gold` — premium pressable buttons (gold linear gradient)
- `niger-stat-card` — dashboard stat with gold left rail + grain
- `niger-seal` — conic-gradient stamp/seal effect
- `niger-lift`, `niger-lift-gold` — card hover lift

### Animations (no new deps)
- `niger-shimmer` (gold sweep)
- `niger-float`, `niger-float-slow` (subtle Y bob)
- `niger-pulse-ring` (gold pulse)
- `niger-spin-slow` (24s emblem text rotation)
- `niger-slide-up`, `niger-fade-in` (entrance)
- `niger-marquee` (LGA name strip)
- `niger-stamp-in` (stamped reveal)
- `niger-grain-drift` (drifting bg)
- All animations respect `prefers-reduced-motion`.

## Implemented Visual Refresh (2026-01)
### New components
- **`components/NigerEmblem.tsx`** — Animated SVG state seal with rotating gold-text ring ("NIGER STATE · POWER · EXCELLENCE · HARVEST"), 24 tick marks, deep-green inner stamp ("NIGER STATE · EST · 1976"), and gold pulse ring.

### Hero (full restructure)
- 12-column asymmetric layout: 7-col headline cluster + 5-col Niger emblem
- Massive split-line headline ("The Power State's [SEED] Network. *rooted in Niger.*")
- Gold marker-highlighted "Seed" word, italic gold tagline
- Niger weave background, animated vertical light beam, radial vignette
- Floating glass stat badges anchored around the emblem (live data only)
- 4-column government-plaque stat strip (live counts: total actors, states, types, LGAs)
- Bottom Niger LGA marquee strip (Bida, Minna, Suleja, Kontagora, Lapai, Borgu, Mokwa…)
- Diagonal SVG hand-off into next section

### Header
- Top gold government ribbon: "Niger State · Government Initiative" with phone & "Power · Excellence · Harvest"
- Always visible (not just on scroll) — gives every page the official-portal feel
- Logo with corner-rule accents + animated gold pip
- Five-link nav with sliding gold underline on hover
- Gold-gradient `niger-btn-gold` CTA buttons

### Footer
- Diagonal SVG entry from page above
- Niger emblem on left + 3-col nav (Platform / Resources / Niger State)
- Animated drifting grain background + double gold rule top
- Contact strip (Niger State Office, Helpline, Email) with hover gold-fill icons
- Bottom row pill badge "★ NIGER STATE" + dotted hover underline

### ActorRegistration (full restructure)
- New ticket-style cards (`niger-ticket` clip-path) with:
  - Gold left rail peeking behind
  - "NO. 0X" green ribbon ribbon in top-right
  - Dotted "perforation" line at bottom
  - Card hover lift + icon rotate
- Right column: Niger State Pledge stamp card with gold corner accents, "EST · 1976", verified-checklist, "Activate My Niger Profile" CTA, and verification footer

### DashboardLayout
- Sidebar: niger-weave background, gold top rule, sun-icon pip on logo, gold left-rail for active nav items, gold-gradient active state
- Topbar: government gold ribbon + gold rule + breadcrumb pill, gradient avatar chip

### DashboardPage
- Welcome banner: niger-weave + gold corner accents, gold "★ Niger State Edition" pill, white sparkle accent
- Stat cards now use `niger-stat-card` (gold left rail, hover lift, "NS · 01/02..." mono corner mark)

### Other pages
- Login/Register: brand-sun stat cards, gold "Niger State Edition" pill, gold rule above heading
- ConnectionsPage / ActorMap: Niger State boundary now drawn in warm gold; Niger appears first in filter
- All "Nigeria" copy → "Niger State" / "Power State" copy

## What was NOT touched (per instructions)
- `/app/server/**`
- `/app/client/src/services/api.ts`
- `/app/client/src/context/AuthContext.tsx`
- `/app/client/package.json`, `.env`, `vite.config.ts`
- Backend identifiers: `registrationState`, `stateCounts`, `actorTypeCounts`

## Verification
- ESLint: ✅ no issues
- `yarn build`: ✅ 6.97s, no errors
- Live dev preview screenshots: landing (top + below-fold + footer), login — all confirmed Niger State distinct identity

## Backlog
- P2: Add a small Niger LGA heat-map widget to dashboard welcome banner
- P2: Replace stock testimonial avatars with Niger State agriculture photography
- P2: Extract palette to design-tokens file for future Anambra / Ekiti per-state themes
