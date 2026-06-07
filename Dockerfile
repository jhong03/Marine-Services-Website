# Marine Services — FrankenPHP + Laravel Octane image (worker mode).
#
# Why this is fast on constrained free hosting:
#  - FrankenPHP (built on Caddy) serves the built JS/CSS assets DIRECTLY, so they
#    never queue behind PHP (the main cause of the old "minutes per click").
#  - Octane keeps Laravel BOOTED in memory between requests, skipping the
#    expensive per-request framework bootstrap — the single biggest win when the
#    CPU is throttled.
#  - OPcache + cached config/routes/views remove recompilation overhead.
#
# PHP must be present during the frontend build because the Wayfinder Vite plugin
# invokes `php artisan` to generate route helpers — the FrankenPHP image ships a
# `php` CLI, so the build stage uses the same base.

# ---- Base: FrankenPHP runtime with required PHP extensions ----
FROM dunglas/frankenphp:1-php8.4 AS base
RUN install-php-extensions pdo_pgsql mbstring bcmath zip intl opcache pcntl

# Render (and other hosts) run containers with `no-new-privileges`, under which the
# kernel refuses to exec a binary that carries file capabilities — the symptom is
# `exec: /usr/local/bin/frankenphp: Operation not permitted`. The image ships
# frankenphp with cap_net_bind_service so it can bind :80/:443 as non-root, but we
# bind a high port ($PORT), so the cap is unnecessary. Strip it by recreating the
# binary — a plain `cp` drops the `security.capability` xattr.
RUN cp /usr/local/bin/frankenphp /usr/local/bin/frankenphp.nocap \
    && mv -f /usr/local/bin/frankenphp.nocap /usr/local/bin/frankenphp \
    && chmod 0755 /usr/local/bin/frankenphp

COPY docker/opcache.ini /usr/local/etc/php/conf.d/zz-opcache.ini
RUN cp "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"
WORKDIR /app

# ---- Build: add Node + Composer, install deps, compile assets ----
FROM base AS build
RUN apt-get update && apt-get install -y --no-install-recommends \
        git unzip curl gnupg ca-certificates \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && rm -rf /var/lib/apt/lists/*
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# PHP deps first (better layer caching). No scripts yet — app isn't copied.
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-interaction --no-progress --prefer-dist --no-scripts

# JS deps
COPY package.json package-lock.json ./
RUN npm ci

# Application source
COPY . .

# Baked into the JS bundle at build time (page titles).
ENV VITE_APP_NAME="Marine Services"

# Finalise autoloader + package discovery, then build assets (Wayfinder needs PHP).
RUN composer dump-autoload --optimize --no-dev \
    && npm run build \
    && rm -rf node_modules

# ---- Runtime ----
FROM base AS runtime
# Worker count kept low for the 512 MB free tier (override via env if you scale up).
ENV OCTANE_WORKERS=2
COPY --from=build /app /app
RUN chmod -R ug+rwX storage bootstrap/cache
EXPOSE 8000

# On boot: migrate, ensure admin/content exist, link storage, cache framework
# state, then start Octane on FrankenPHP. `exec` lets signals reach Octane for
# graceful shutdown. route:cache/event:cache are guarded so an edge case can't
# brick the container.
CMD ["sh", "-c", "php artisan migrate --force && (php artisan db:seed --force || true) && (php artisan storage:link || true) && php artisan config:cache && php artisan view:cache && (php artisan event:cache || true) && (php artisan route:cache || true) && exec php artisan octane:start --server=frankenphp --host=0.0.0.0 --port=${PORT:-8000} --workers=${OCTANE_WORKERS:-2} --max-requests=500"]
