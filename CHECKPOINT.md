# Marine Services Website — Project Checkpoint

> Resume context for the Marine Services Company website.
> **Last updated:** 2026-06-07

---

## 1. Overview

A website for a **Marine Services Company** (boat servicing, repairs, maintenance).
Goals: smooth UX, strong SEO (local services business), and a simple admin so
**non-technical staff** can manage content.

**Status:** **Phase 1 + Phase 2 complete.** Public marketing site (light + dark),
unified auth, and a Filament admin where staff manage all content (which the public
pages render live from the database). All content is still **placeholder** pending
real branding/copy.

---

## 2. Tech Stack

| Layer | Choice | Version |
|---|---|---|
| Backend framework | Laravel | 13.14 |
| Language runtime | PHP (via Laravel Herd) | 8.4.22 (app needs ≥ 8.4.1) |
| Frontend | React + Inertia.js | 19 / 3 |
| Styling | Tailwind CSS | 4 |
| UI components | shadcn-style + lucide-react icons | — |
| Admin panel | Filament | 5.6.6 |
| Database | SQLite (dev) / Postgres (prod via Neon) | — |
| Testing | Pest | — |
| Auth | Fortify + starter kit (login, register, 2FA, passkeys) | — |

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

### Public marketing site (marine navy + sky/cyan, responsive, light + dark)
Pages in `resources/js/pages/`: `welcome` (home), `services`, `fleet`, `about`, `contact`.
- Shared `resources/js/layouts/public-layout.tsx` — nav + footer + theme toggle + auth area
  (logged out: Log in/Sign up; logged in: avatar dropdown with Settings / Admin / Log out).
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
- **Theme:** `--primary` token set to **sky** in `resources/css/app.css` (so all shadcn buttons
  match the brand). Dark mode via `.dark` class + `dark:` variants.
  - **Gotcha:** a `group-hover:`/`hover:` colour that also has a `dark:` base needs a paired
    `dark:group-hover:`/`dark:hover:` variant, or the dark base wins.
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
- **Brand:** logo is an Anchor icon; colours navy + sky/cyan. Real photos for Fleet/Team are
  deferred (need object storage — see §10).

---

## 7. Git Status

- `cf2f726` — Phase 1 scaffold
- `5224ec6` — Phase 1 UI (dark mode, nav auth links, auth redesign)
- `11b962d` / `3c078d6` — Docker deploy config (Render + Neon)
- `a2f7c6b` / `c69d6b4` — CI green (formatting + PHP 8.4-only test matrix)
- **`<this commit>`** — Phase 2 (admin + DB content) + unified auth + dashboard removal +
  admin/settings redesign

Remote: `https://github.com/jhong03/Marine-Services-Website` (branch `main`). CI (lint + tests)
is green. **Render uses the public-repo deploy** → push then **Manual Deploy** in the Render
dashboard (auto-deploy is off unless the GitHub App is connected to the `jhong03` account).

---

## 8. Roadmap / Next Steps

- **Phase 3 — Enquiries / contact backend:** add an `Enquiry` model + Filament inbox, wire the
  contact form (`contact.tsx`) to persist + email (currently a client-side stub).
- **Phase 4 (optional) — Customer portal:** accounts, bookings, invoices/payments.
- **Real content/branding:** fill in via `/admin`.
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
- `Dockerfile` — single PHP 8.4 + Node image; installs deps, builds assets (Wayfinder needs PHP),
  boots with `migrate` → `db:seed --force` (admin + content) → `php artisan serve`.
- `.dockerignore`; `bootstrap/app.php` has `trustProxies(at: '*')` for HTTPS behind Render.

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

**Caveats:** free instances sleep after ~15 min (slow first hit); `php artisan serve` is
test-grade; change the seeded admin password before sharing widely; image uploads need object
storage (ephemeral disk won't persist).
