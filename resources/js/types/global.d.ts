import type { Auth } from '@/types/auth';
import type { SiteSettings } from '@/types/content';

declare module 'react' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface InputHTMLAttributes<T> {
        passwordrules?: string;
    }
}

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            sidebarOpen: boolean;
            siteSettings: SiteSettings | null;
            /** True only when running locally — self-hosted clips are then
             *  served via the /stream route so seeking works on `php artisan
             *  serve` (which can't do Range requests). Prod serves them
             *  statically (Caddy handles Range). */
            mediaStreaming: boolean;
            [key: string]: unknown;
        };
    }
}
