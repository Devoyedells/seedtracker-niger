# Niger State Seed Tracker — Visual Refresh PRD

## Original Problem Statement
Apply a visual refresh to the Niger State edition of the Seed Tracker platform (https://github.com/Devoyedells/seedtracker-niger) so it does not look identical to the general Nigerian version. Tailwind CSS only. Do NOT modify server, API logic, auth logic, services/api.ts, package.json, or .env files. Backend keys (registrationState, stateCounts) must remain unchanged. Keep existing motion/animations.

## Architecture (existing, untouched)
- **Frontend**: Vite + React 18 + TypeScript + Tailwind CSS v4 (in `/app/client`)
- **Backend**: Node/Express server in `/app/server` (NOT modified)
- **API client**: `/app/client/src/services/api.ts` (NOT modified)
- **Auth**: `/app/client/src/context/AuthContext.tsx` (NOT modified)

## Visual System Implemented
- **Primary palette** (`theme.css`):
  - `--color-brand-green`: #0d4d2c (deep Niger State green)
  - `--color-brand-green-deep`: #083820 (hover/press)
  - `--color-brand-soft`: #e7f1e8 (soft green BG)
  - `--color-brand-mist`: #f4f9f4 (very light wash)
  - `--color-brand-sun`: #b98a2e (warm honey gold — premium, not bright)
  - `--color-brand-sun-deep`: #8f681f (gold hover/press)
  - `--color-brand-cream`: #fbf6e7 (warm cream)
- **Typography**: Montserrat (kept), heading letter-spacing tightened, gold ::selection.
- **Signature elements**: `niger-rule` (3px gold gradient divider used on hero, sections, auth panel), Sprout-icon logo with gold pip, "Niger State Edition" pill badge.

## What's Been Implemented (2026-01)
### Branding refresh
- Header: "Niger State Seed Tracker" with gold tagline "Power · Excellence · Harvest"
- Footer: Niger State Office contact block (Minna), gold rule top border
- Sidebar logo: "Niger State / Seed Tracker"
- AuthLayout: Niger State Edition badge, gold rule, Niger-themed hero copy
- Verify-email toast / hero copy updated to Niger State

### Page-level refresh
- **Hero**: New "Powering Niger State's Seed Harvest" headline with gold underline, animated Niger State Edition pill, gold CTA, gold "Niger Listings" floating card.
- **Dashboard**: Welcome banner now uses brand-green gradient with "Niger State Edition" watermark; user empty state references Niger State; cards use new shadow + brand-green/8 borders.
- **ActorRegistration**: Soft-green gradient section, gold "Join Niger State" badge, gold-accent registration cards, gold "Niger State Roles Available" floating stat.
- **ValueChainMap / ValueChainVisibility / StakeholderBenefits / FAQ**: All updated to Niger-state copy + niger-rule + gold pills.
- **ActorMap & ConnectionsPage**: Niger State boundary now drawn in warm gold (#b98a2e); Niger appears first in state filters.
- **FAQ content**: Rewritten to position the Niger State edition while clarifying the platform serves Niger, Anambra, Ekiti.

### Component polish
- **StatCard / breakdown / recent actors**: Brand-green/8 borders, deeper soft shadows, soft-green bg icon wells, gold hover linking to brand-sun.
- **Buttons**: Primary CTA shifted to gold `bg-brand-sun → hover:bg-brand-sun-deep` with gold-tinted shadow; auth submit kept brand-green.
- **Badges/pills**: Niger State Edition pill, gold-tinted pills with `bg-brand-sun/15 border border-brand-sun/30`.

## What was NOT touched (per instructions)
- `/app/server/**` (backend)
- `/app/client/src/services/api.ts`
- `/app/client/src/context/AuthContext.tsx` (auth logic)
- `/app/client/package.json`, `.env`, `vite.config.ts`
- Backend field labels: `registrationState`, `stateCounts`, `actorTypeCounts`, etc.

## Verification
- ESLint: ✅ no issues
- `yarn build`: ✅ built in 12.49s (no errors)
- Dev preview screenshots: ✅ landing & login confirmed

## Backlog / Next Action Items
- P1: Run testing agent against the backend once API keys/env are configured (out of scope here).
- P2: Optional — replace remaining stock testimonial avatars (`/assets/images/testimonial-user-*.jpg`) with Niger State agriculture photography.
- P2: Optional — add a 12-LGA mini-map widget to the Dashboard welcome banner for extra Niger State flavor.
