# Marine Services Website — Project Checkpoint

> Resume context for the Marine Services Company website.
> **Last updated:** 2026-06-07

---

## 1. Overview

A website for a **Marine Services Company** (boat servicing, repairs, maintenance).
Goals: smooth UX, strong SEO (local services business), and a simple admin so
**non-technical staff** can manage content.

**Status:** Phase 1 complete (scaffold + marketing site + admin shell + dark mode).
Content is still **placeholder** pending real branding/copy.

---

## 2. Tech Stack

| Layer | Choice | Version |
|---|---|---|
| Backend framework | Laravel | 13.14 |
| Language runtime | PHP (via Laravel Herd) | 8.4.22 |
| Frontend | React + Inertia.js | 19 / 3 |
| Styling | Tailwind CSS | 4 |
| UI components | shadcn-style + lucide-react icons | — |
| Admin panel | Filament | 5.6.6 |
| Database | SQLite (dev) | file-based |
| Testing | Pest | — |
| Auth | Fortify + starter kit (login, register, 2FA, passkeys) | — |

**Why single-codebase Laravel + Inertia (not Next.js + separate API):** less to
secure/deploy for a small team, SSR-capable for SEO, Filament gives a staff admin
almost for free. Can split later if it grows app-heavy.

---

## 3. Environment & How to Run

- **OS:** Windows 11. Node v24.12.0, npm 11.6.2, Git 2.53.0.
- **PHP/Composer:** provided by **Laravel Herd**. Binaries in
  `C:\Users\ojh20\.config\herd\bin` (`php84\php.exe`, `composer.phar`, `laravel.phar`).
- **PATH gotcha:** tool/background shells may not have Herd on PATH. Prepend it:
  ```powershell
  $env:Path = "$([System.Environment]::GetEnvironmentVariable('Path','Machine'));$([System.Environment]::GetEnvironmentVariable('Path','User'))"
  ```

**Run the app (two options):**
```powershell
# Backend (serves built assets)
php artisan serve --port=8000
# Frontend hot-reload (run in a second terminal for live editing)
npm run dev
# OR all-in-one (server + queue + vite + logs)
composer run dev
```
After editing React without `npm run dev` running, rebuild: `npm run build`.

- **Public site:** http://localhost:8000
- **Admin panel:** http://localhost:8000/admin
  - Login: `admin@marineservices.test` / `password`
  - (seeded via `database/seeders/AdminUserSeeder.php`)

---

## 4. What's Been Built

**Public marketing site** (marine navy + sky/cyan, fully responsive, light + dark):
- `resources/js/pages/welcome.tsx` — Home (hero, stats, services preview, why-us, testimonial, CTA)
- `resources/js/pages/services.tsx` — 6 service cards
- `resources/js/pages/fleet.tsx` — fleet/equipment cards
- `resources/js/pages/about.tsx` — story, stats, values
- `resources/js/pages/contact.tsx` — details + enquiry form (client-side only)
- `resources/js/layouts/public-layout.tsx` — shared nav + footer + auth links + theme toggle
- `resources/js/components/theme-toggle.tsx` — Sun/Moon light/dark toggle (uses `useAppearance`)

**Auth pages** (redesigned to match, light + dark):
- Split-screen marine layout: `resources/js/layouts/auth/auth-simple-layout.tsx`
- "Back to website" button on login/register
- `resources/js/pages/auth/login.tsx`, `register.tsx` (sky submit buttons)

**Admin:** Filament installed; panel at `/admin`. No resources/screens built yet.

**Routing:** `routes/web.php` uses `Route::inertia()` for public pages.
Public pages use **plain string hrefs** (not Wayfinder) for nav.

---

## 5. Key Decisions & Notes

- **Layout resolver** (`resources/js/app.tsx`): public pages (`welcome`, `services`,
  `fleet`, `about`, `contact`) return `null` (no global app layout) so they DON'T get
  the dashboard sidebar. New public pages MUST be added to that list.
- **Dark mode:** uses the `.dark` class + `dark:` Tailwind variants. Toggle is global
  (also affects dashboard/settings). `@custom-variant dark` is configured in
  `resources/css/app.css`.
  - **Gotcha:** any `group-hover:`/`hover:` colour that also has a `dark:` base needs a
    paired `dark:group-hover:`/`dark:hover:` variant, or the dark base overrides the hover.
- **SEO/SSR:** site is client-rendered (Inertia, no SSR). Raw HTML is a near-empty shell
  — fine for users, but **enable Inertia SSR before launch** for SEO/social previews.
- **Registration is open** to the public. Disable/hide if you want sign-ups closed until
  a customer portal exists (Phase 4).
- **APP_NAME** = "Marine Services" (placeholder) in `.env`.

---

## 6. Placeholders To Replace (need real info)

- **Brand:** company name + tagline, logo (currently an Anchor icon), colours (navy + sky/cyan)
- **Contact details** (footer + contact page): address, email, phone, hours
  — currently `Marina Drive, Harbourside` / `hello@marineservices.test` / `+00 0000 000000`
- **Home:** hero headline, 4 stats (20+ yrs, 1,200+ vessels, 24/7, 100%), 3 featured services, 3 why-us points, testimonial
- **Services:** 6 service cards (titles + descriptions)
- **Fleet:** 4 equipment items + real photos (currently gradient + ship icon)
- **About:** company story (2 paras), stats box, 3 values
- **Contact:** form confirmation copy

---

## 7. Uncommitted Changes (as of this checkpoint)

Initial commit `cf2f726` = Phase 1 scaffold. Since then, **uncommitted**:
1. Inner-page sidebar fix (`app.tsx` layout resolver)
2. Login/Sign-up links added to public nav
3. Auth pages redesigned + "Back" button
4. Auth component contrast fixes (text-link, passkey-verify)
5. Full dark mode + on-page theme toggle (marketing **and** auth)
6. Dark-mode icon hover fix (services + home)
7. This `CHECKPOINT.md`

> Next action the user paused before: **committing** the above.

---

## 8. Roadmap / Next Steps

- **Phase 2 — Admin panel (next):** Filament resources so staff can manage
  Services, Fleet, Team, and view Enquiries. Then bind public pages to DB content.
- **Phase 3 — Contact form backend:** persist enquiries to DB + email the team
  (replace the client-side stub in `contact.tsx`).
- **Phase 4 (optional) — Customer portal:** accounts, bookings, invoices/payments.
- **Pre-launch:** real content/branding, Inertia SSR for SEO, switch DB to
  MySQL/Postgres, production `.env`, deploy.

---

## 9. Useful References

- Memory notes: `C:\Users\ojh20\.claude\projects\c--Users-ojh20-Downloads-MarineServiceWebsite\memory\`
  (`project-stack.md`, `env-setup.md`)
- Laravel docs: https://laravel.com/docs
- Filament docs: https://filamentphp.com/docs
- Inertia docs: https://inertiajs.com
- Laravel Cloud: https://cloud.laravel.com

---

## 10. Deployment — Render + Neon (free, no card)

> Laravel Cloud / Fly / Railway all now require a card. Chosen no-card path:
> **Render** (free web service, runs our Docker image) + **Neon** (free Postgres).
> Code is on GitHub: `https://github.com/jhong03/Marine-Services-Website` (branch `main`).

**Repo deploy files (already committed):**
- `Dockerfile` — single image with PHP 8.4 + Node; installs deps, builds assets
  (Wayfinder needs PHP at build), boots with `migrate` → seed admin → `php artisan serve`.
- `.dockerignore` — keeps vendor/node_modules/.env/sqlite out of the image.
- `bootstrap/app.php` — `trustProxies(at: '*')` so HTTPS/asset URLs are correct behind Render.

**Step 1 — Neon (database):**
1. Sign up free at https://neon.tech (no card). Create a project (pick a region near Render's).
2. Copy the **connection string** (looks like `postgresql://user:pass@ep-xxx.region.aws.neon.tech/dbname?sslmode=require`).

**Step 2 — Render (web service):**
1. Sign up free at https://render.com (no card for free web services). Connect GitHub.
2. **New + → Web Service** → pick the `Marine-Services-Website` repo.
3. Runtime: **Docker** (auto-detected from the `Dockerfile`). Instance type: **Free**.
4. **Environment variables:**
   - `APP_NAME=Marine Services`
   - `APP_ENV=production`
   - `APP_DEBUG=true` (keep on while testing so errors show)
   - `APP_KEY=` → generate locally with `php artisan key:generate --show` and paste the `base64:...` value
   - `APP_URL=https://<your-service-name>.onrender.com` (the URL Render assigns — name it first, then set this)
   - `DB_CONNECTION=pgsql`
   - `DB_URL=<the Neon connection string from Step 1>`  ← simplest; Laravel parses the whole URL
   - (`SESSION_DRIVER`/`CACHE_STORE`/`QUEUE_CONNECTION` default to `database` — tables exist via migrations)
5. **Create Web Service** → Render builds the image and starts it. The container runs migrations
   and seeds the admin user automatically on boot.
6. Open the `…onrender.com` URL, share with testers. Admin at `/admin`
   (`admin@marineservices.test` / `password`).

**Notes / caveats:**
- **Free Render instances sleep after ~15 min idle** → first hit takes ~30–60s to wake, then fast.
- `php artisan serve` is a test-grade server (`PHP_CLI_SERVER_WORKERS=4` set for some concurrency).
  Fine for a handful of testers; swap to FrankenPHP/Octane or nginx+fpm for real traffic later.
- **Security:** seeded admin password is `password` and `/admin` is public — change it before sharing
  the link widely. Public **registration is also open** — disable if unwanted.
- Docker couldn't be built locally (Docker not installed) — Render's build log is the first real test.
- File uploads later (Fleet photos) need object storage; ephemeral container disk won't persist them.
