# Marine Services — single-image build (PHP + Node) for Render (or any Docker host).
# PHP must be present during the frontend build because the Wayfinder Vite plugin
# invokes `php artisan` to generate route helpers.

FROM php:8.4-cli-bookworm

# System libraries, PHP extensions, and Node.js
RUN apt-get update && apt-get install -y --no-install-recommends \
        git unzip ca-certificates curl gnupg \
        libpq-dev libonig-dev libzip-dev libicu-dev \
    && docker-php-ext-install -j"$(nproc)" pdo_pgsql mbstring bcmath zip intl \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

# PHP dependencies first (better layer caching). No scripts yet — app isn't copied.
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-interaction --no-progress --prefer-dist --no-scripts

# JS dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Application source
COPY . .

# Baked into the JS bundle at build time (page titles).
ENV VITE_APP_NAME="Marine Services"

# Finalise autoloader + run package discovery, then build assets (Wayfinder needs PHP).
RUN composer dump-autoload --optimize --no-dev \
    && npm run build \
    && rm -rf node_modules \
    && chmod -R ug+rwX storage bootstrap/cache

EXPOSE 8000

# On boot: run migrations, ensure the admin user exists, then serve.
# PHP_CLI_SERVER_WORKERS lets the built-in server handle concurrent requests.
ENV PHP_CLI_SERVER_WORKERS=4
CMD ["sh", "-c", "php artisan migrate --force && (php artisan db:seed --class=AdminUserSeeder --force || true) && (php artisan storage:link || true) && php artisan serve --host=0.0.0.0 --port=${PORT:-8000}"]
