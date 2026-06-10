# Marine Services Website — Project Checkpoint

> Resume context for the Marine Services Company website.
> **Last updated:** 2026-06-10

---

## 1. Overview

A website for a **Marine Services Company** (boat servicing, repairs, maintenance).
Goals: smooth UX, strong SEO (local services business), and a simple admin so
**non-technical staff** can manage content.

**Status:** **Phase 1 + Phase 2 complete**, plus a full **"weathered heritage" visual
redesign** and a **FrankenPHP + Octane** production runtime. Public marketing site
(light + dark), unified auth, and a Filament admin where staff manage all content (which
the public pages render live from the database). All content is still **placeholder**
pending real branding/copy.

---

## 2. Tech Stack

| Layer | Choice | Version |
|---|---|---|
| Backend framework | Laravel | 13.14 |
| Language runtime | PHP (via Laravel Herd) | 8.4.22 (app needs ≥ 8.4.1) |
| Frontend | React + Inertia.js | 19 / 3 |
| Styling | Tailwind CSS | 4 |
| UI components | shadcn-style + lucide-react icons | — |
| Fonts | Instrument Sans (body) + **Lora** (serif display, via Bunny Fonts) | — |
| Animation | GSAP + ScrollTrigger + Lenis (homepage cinematic only) | — |
| Admin panel | Filament | 5.6.6 |
| Database | SQLite (dev) / Postgres (prod via Neon) | — |
| Testing | Pest | — |
| Auth | Fortify + starter kit (login, register, 2FA, passkeys) | — |
| Prod runtime | FrankenPHP + Laravel Octane (worker mode) | — |

Single-codebase Laravel + Inertia (not Next.js + separate API): less to secure/deploy,
SSR-capable for SEO, Filament gives a staff admin almost for free.

---

## 3. Environment & How to Run

- **OS:** Windows 11. Node v24.12.0, npm 11.6.2, Git 2.53.0.
- **PHP/Composer:** via **Laravel Herd**, binaries in `C:\Users\ojh20\.config\herd\bin`
  (`php84\php.exe`, `composer.phar`, `laravel.phar`).
- **PATH gotcha:** tool/background shells may not have Herd on PATH. Prepend it:
  ```powershell
  $env:Path = "$([System.Environment]::GetEnvironmentVariable('Path','Machine'));$([System.Environment]::GetEnvironmentVariable('Path','User'))"
  ```

**Run the app:**
```powershell
php artisan serve --port=8000      # backend (serves built assets)
npm run dev                        # Vite HMR (second terminal, for live editing)
# OR: composer run dev             # server + queue + vite + logs
npm run build                      # rebuild assets if not running `npm run dev`
```
**Checks before commit (CI runs these):** `vendor/bin/pint --parallel`,
`npm run lint`, `npm run build`, `php artisan test`.

- **Public site:** http://localhost:8000
- **Admin:** http://localhost:8000/admin → unified login → `admin@marineservices.test` / `password`

---

## 4. What's Been Built

### Public marketing site ("weathered heritage": aged paper, deep navy, brass + rope; light + dark)
Pages in `resources/js/pages/`: `welcome` (home), `services`, `fleet`, `about`, `contact`.
- Shared `resources/js/layouts/public-layout.tsx` — nav + footer + theme toggle + auth area
  (logged out: Log in/Sign up; logged in: avatar dropdown with Settings / Admin / Log out).
- `resources/js/components/marine.tsx` — shared heritage pieces reused across every page:
  `Eyebrow` (brass small-caps label), `PageBanner` (navy hero w/ compass watermark + wave edge),
  `WaveEdge`, `RopeDivider`, `SectionHeading`, `CompassRose`. **Reuse these** for new sections.
- `resources/js/components/theme-toggle.tsx` — light/dark toggle (`useAppearance`).
- All pages render **live DB content** via `App\Http\Controllers\PageController` +
  globally-shared `siteSettings` (see §5). Routes are plain `Route::get` in `routes/web.php`.

### Admin (Phase 2) — Filament at `/admin`
- Resources (CRUD, drag-reorder by `sort_order`, publish toggle), grouped **Content**:
  Services (curated icon dropdown), Fleet & Equipment, Team Members, Testimonials.
- **Settings** group: Site Settings (singleton resource) — company name, tagline, contact
  details, hero copy, stats + values (repeaters). Edits appear on the site immediately.
- **No Filament Dashboard** — `/admin` redirects to the first resource. "Back to website"
  link is a **user-menu item** (avatar dropdown), Sign out is Filament's built-in.
- Access gated by `User::canAccessPanel()` → `is_admin`.

### Models / migrations
`Service`, `FleetItem`, `TeamMember`, `Testimonial`, `SiteSetting` + `is_admin` on `users`.
Seeded by `ContentSeeder` (placeholders) and `AdminUserSeeder` (admin) via `DatabaseSeeder`.

### Auth (unified)
- One login for everyone. Filament has **no own login** (removed `->login()`); guests at
  `/admin` redirect to the app `/login`, then back. Marine split-screen auth layout with
  "Back to website".
- Post-login lands on **home** (`config/fortify.php` `home` = `/`).
- **Customer dashboard fully removed** (route, page, `app-header`/`app-sidebar` nav point to
  home). Profile + logout live in the public header avatar dropdown.
- **Settings pages** (`settings/profile|security|appearance`) now render inside the marine
  `PublicLayout` (see `resources/js/layouts/settings/layout.tsx`), not the starter app-shell.

---

## 5. Key Decisions & Notes

- **Layout resolver** (`resources/js/app.tsx`): public pages (`welcome|services|fleet|about|contact`)
  return `null`; `auth/*` → `AuthLayout`; `settings/*` → `SettingsLayout` (which wraps `PublicLayout`).
  New public pages MUST be added to the `null` list or they get a wrapping layout.
- **Shared site settings:** `app/Http/Middleware/HandleInertiaRequests.php` shares `siteSettings`
  globally (guarded by `Schema::hasTable`). The layout/footer + hero/stats/about read from it.
- **Service icons:** stored as string keys; mapped to lucide in `resources/js/lib/icons.ts`.
  Keep keys in sync with the Select options in `ServiceForm.php`.
- **Design system / theme** (`resources/css/app.css`): "weathered heritage" palette as Tailwind
  utilities — `bg-paper`/`paper-deep`/`surface`, `text-ink`/`ink-soft`, `bg-navy`/`navy-deep`,
  `text-brass`/`brass-bright`, `rope`, `timber`, `seafog` (hairline borders). The shadcn semantic
  tokens (`--background`/`--foreground`/`--primary`=brass/…) are also remapped, so buttons,
  dropdowns and forms inherit the warmth. Headings use `font-serif` (Lora). Utilities `.paper-grain`
  (noise overlay) and dark mode via `.dark` + `dark:` variants. These are **fixed-hex** utilities, so
  dark mode is per-element `dark:` (e.g. `bg-paper dark:bg-navy-deep`), not automatic.
  - **Gotcha:** a `group-hover:`/`hover:` colour that also has a `dark:` base needs a paired
    `dark:group-hover:`/`dark:hover:` variant, or the dark base wins.
  - **Gotcha:** the starter kit hardcoded `sky`/`slate` in a few shared components
    (`text-link.tsx`, `passkey-verify.tsx`, auth submit buttons) — these bypass the theme and were
    re-pointed at brass/paper/navy. Watch for the same when pulling in new starter components.
- **Filament home redirect** (`RedirectToHomeController`) targets the **first navigation item** —
  do NOT add a top-level `navigationItems` entry that links away (it'll hijack `/admin`). External
  links belong in `userMenuItems` (that's where "Back to website" lives).
- **App needs PHP ≥ 8.4.1** (locked Symfony 8.1). CI tests only on 8.4 (`.github/workflows/tests.yml`).
- **SEO/SSR:** client-rendered (no SSR). Enable Inertia SSR before launch for SEO/social previews.
- **Registration is open** to the public (customers get no admin access). Disable if unwanted.

---

## 6. Placeholders To Replace (now editable in `/admin`, not in code)

- **Site Settings:** company name, tagline, address/email/phone/hours, hero heading/subtext,
  stats, about story + values. (`APP_NAME` in `.env` is a separate, secondary placeholder.)
- **Services / Fleet / Team / Testimonials:** all editable rows (seeded with placeholder copy).
- **Brand:** logo is a brass anchor on a navy "porthole"; palette is aged paper + deep navy + brass.
  Real photos for Fleet/Team are deferred (need object storage — see §10).

---

## 7. Git Status

- `cf2f726` — Phase 1 scaffold
- `5224ec6` — Phase 1 UI (dark mode, nav auth links, auth redesign)
- `11b962d` / `3c078d6` — Docker deploy config (Render + Neon)
- `a2f7c6b` / `c69d6b4` — CI green (formatting + PHP 8.4-only test matrix)
- `8e0425f` — Phase 2 (admin + DB content) + unified auth + dashboard removal + admin/settings redesign
- `72661f9` / `b462769` — Perf: FrankenPHP + Octane runtime (+ strip frankenphp file caps for Render)
- `84b486c` — "Weathered heritage" visual redesign across every page + auth/settings;
  Lora serif; shared `marine.tsx` components; brass theme; cleared sky/slate starter stragglers
- `18e279a` — Homepage cinematic (scroll-scrubbed frame sequence; GSAP + Lenis); cinematic
  copy fields in Site Settings; real footage (160 frames) + frame pipeline (see §11)
- `91a0c67` / `aebcab6` / `3305c1e` — deploy fixes for the npm lockfile (see §10 build gotcha);
  final fix: Dockerfile uses `npm install` (not `npm ci`). **Cinematic is deployed & live.**

Remote: `https://github.com/jhong03/Marine-Services-Website` (branch `main`). CI (lint + tests)
is green. **Render uses the public-repo deploy** → push then **Manual Deploy** in the Render
dashboard (auto-deploy is off unless the GitHub App is connected to the `jhong03` account).

---

## 8. Roadmap / Next Steps

- **Phase 3 — Enquiries / contact backend:** add an `Enquiry` model + Filament inbox, wire the
  contact form (`contact.tsx`) to persist + email (currently a client-side stub).
- **Phase 4 (optional) — Customer portal:** accounts, bookings, invoices/payments.
- **Real content/branding:** fill in via `/admin`.
- **Homepage cinematic — real footage:** replace the placeholder frames with a real drone clip
  (see §11 + `scripts/extract-frames.md`).
- **Pre-launch:** Inertia SSR for SEO, object storage for image uploads, production `.env`,
  change the seeded admin password, decide on open registration.

---

## 9. Useful References

- Memory notes: `C:\Users\ojh20\.claude\projects\c--Users-ojh20-Downloads-MarineServiceWebsite\memory\`
- Laravel: https://laravel.com/docs · Filament: https://filamentphp.com/docs · Inertia: https://inertiajs.com

---

## 10. Deployment — Render + Neon (free, no card)

> Laravel Cloud / Fly / Railway require a card. Chosen no-card path: **Render** (free web
> service, runs our Docker image) + **Neon** (free Postgres).

**Repo deploy files (committed):**
- `Dockerfile` — multi-stage **FrankenPHP + Laravel Octane** image (`dunglas/frankenphp:1-php8.4`).
  Build stage adds Node + Composer and compiles assets (Wayfinder needs PHP); runtime stage boots
  with `migrate` → `db:seed --force` (admin + content) → cache config/routes/views →
  `php artisan octane:start --server=frankenphp` (worker mode).
- `docker/opcache.ini` — production OPcache (JIT off; see file for why).
- `.dockerignore`; `bootstrap/app.php` has `trustProxies(at: '*')` for HTTPS behind Render.

> **Build gotcha — do NOT switch the Dockerfile back to `npm ci`.** The JS step uses
> `npm install` deliberately. `package-lock.json` is authored on **Windows**, so it records
> the Windows resolution of Tailwind v4's platform-specific optional deps
> (`@tailwindcss/oxide` → `@emnapi/*`). The Linux build needs different optional entries that a
> Windows-generated lock can't contain, so `npm ci`'s strict cross-platform check fails every
> time (regardless of npm version). `npm install` reconciles to the Linux platform at build time.
> The proper long-term fix is to regenerate the lock on Linux (e.g. in CI) — until then, keep
> `npm install`.

**Why this stack (perf):** the old `php artisan serve` was single-process — one page load's
assets queued behind PHP, which on Render free's throttled 0.1 CPU read as *minutes per click*.
FrankenPHP (Caddy) serves static assets directly and Octane keeps Laravel booted in memory, so
requests skip the per-request bootstrap. `OCTANE_WORKERS` (default 2) can be raised on bigger tiers.

**Step 1 — Neon:** sign up (no card) → create project → copy the connection string
(`postgresql://user:pass@ep-xxx.region.aws.neon.tech/dbname?sslmode=require`).

**Step 2 — Render:** New → Web Service → for the repo use the **Public Git Repository** tab and
paste `https://github.com/jhong03/Marine-Services-Website` (Render's connected GitHub account is
`JY-21`, which can't see the `jhong03` repo). Runtime **Docker**, instance **Free**. Env vars:
- `APP_NAME=Marine Services`, `APP_ENV=production`, `APP_DEBUG=true`
- `APP_KEY=` → `php artisan key:generate --show` and paste
- `APP_URL=https://<service>.onrender.com`
- `DB_CONNECTION=pgsql`, `DB_URL=<Neon connection string>`

On boot the container migrates + seeds. Open the URL; admin at `/admin`.

**Keep it awake (fixes the cold-start lag):** Render free still spins the instance down after
~15 min idle, so the *first* hit after a nap is slow even with Octane. Point a free uptime pinger
(e.g. cron-job.org / UptimeRobot) at `https://<service>.onrender.com/up` every ~10 min — Laravel's
built-in health route — to keep it warm during testing.

**Caveats:** free tier is still a throttled 0.1 CPU (Octane makes it usable, not instant); change
the seeded admin password before sharing widely; image uploads need object storage (ephemeral disk
won't persist). For a genuinely snappy always-on demo, a paid Starter instance or a tunnel from your
local machine (full CPU) will beat free hosting.

---

## 11. Homepage cinematic system

The home page (`welcome`) opens with an **Apple-style scroll-scrubbed frame
sequence**: as you scroll, a `<canvas>` plays pre-extracted WebP frames (drone
descending over water toward a vessel) while serif overlay "moments" fade in/out,
then the page **releases** into the normal DB-driven content sections. There is
**no real-time 3D** — it's just frames on a canvas driven by scroll.

**Files**
- `resources/js/components/cinematic/config.ts` — **`FRAME_COUNT`** (single source
  of truth), `FRAME_EXT`, `framePath()`, pin distances, preload count.
- `resources/js/components/cinematic/useFrameSequence.ts` — imperative canvas
  driver: progressive image loading (first 20 eager, rest lazy), DPR-aware
  cover-fit draw, `ResizeObserver` sizing. **No per-scroll React state.**
- `resources/js/components/cinematic/CinematicScroll.tsx` — pins the section
  (GSAP `ScrollTrigger`, `scrub`), maps progress → frame index + overlay fades,
  Lenis smooth-scroll, and the fallbacks. Reusable (could drive e.g. the fleet
  page later). Takes `moments[]` + `onHeroVisibilityChange`.
- `resources/js/pages/welcome.tsx` — builds the `moments` from **DB copy**
  (company name/tagline, stats, `cinematic_capability`, `cinematic_handoff`),
  renders its **own** `SiteHeader overlay solid={navSolid}` + `SiteFooter`
  (welcome does NOT use `PublicLayout`), then the release sections (reusing
  `marine.tsx`). It stays in the `null` layout-resolver list in `app.tsx`.

**Overlay copy is DB-driven** (Site Settings): `company_name`, `tagline`, `stats`
(trust line), `cinematic_capability`, `cinematic_handoff`. The last two are
editable in Filament (Site Settings) and seeded by `ContentSeeder`.

**Frame pipeline** — frames live in `public/cinematic/frames/` (full ~1200px) and
`frames-sm/` (mobile ~720px), named `frame-%04d.webp`, 1-indexed. They are
**static files** (FrankenPHP/Caddy serves them directly).
- **Current footage:** an aerial cruise-ship clip (`cruisedroneshot.mp4`, gitignored)
  sampled to **129 frames** (`FRAME_COUNT = 129`), ~9.2 MB full set. A baked-in
  performance HUD was cropped out (`crop=1920:952:0:64`). The closing frames are a
  bright top-down wake, so `CinematicScroll` ramps an **end-fade to navy** over the
  last ~18% of scroll to hand off cleanly into the release section.
- **Swap in new footage:** drop a clip in the root and run the ffmpeg commands in
  `scripts/extract-frames.md` — note `-c:v libwebp -f image2` is REQUIRED (else
  ffmpeg writes one animated webp), then update `FRAME_COUNT`. Budget ≤ ~10 MB.
- Pure-GD placeholder generator still available: `php scripts/generate-placeholder-frames.php`.

**Fallbacks (built in):** `prefers-reduced-motion` → static first-frame hero +
first headline, no pin/scrub. Mobile (<768px) → small frame set + shorter pin.
Canvas is DPR-capped at 2; scroll is passive; pin uses `pinSpacing` (no layout
shift). The nav is transparent over the cinematic and solidifies as it releases
(driven by `onHeroVisibilityChange`). Pin distance (`PIN_VH_DESKTOP`, currently
520) controls scrub speed — larger = slower/more cinematic.

**Possible upgrade:** the current clip is a screen-capture (cropped); a true
licensed/owned drone shot of the client's own vessel could replace it later via the
same one-command pipeline.
