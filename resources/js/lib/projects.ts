import { Factory, Package, Ship } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type Pillar = {
    key: 'industrial' | 'marine' | 'spare_parts';
    label: string;
    short: string;
    href: string;
    icon: LucideIcon;
    blurb: string;
};

/** The three business pillars — single source of truth for nav + pages. */
export const PILLARS: Pillar[] = [
    {
        key: 'industrial',
        label: 'Industrial Services',
        short: 'Industrial',
        href: '/industrial',
        icon: Factory,
        blurb: 'Maintenance, fabrication, electrical and shutdown support for industrial plant and equipment.',
    },
    {
        key: 'marine',
        label: 'Marine Services',
        short: 'Marine',
        href: '/marine',
        icon: Ship,
        blurb: 'Engine service, hull coatings, rigging and survey for vessels of every kind.',
    },
    {
        key: 'spare_parts',
        label: 'Spare Parts',
        short: 'Spare Parts',
        href: '/spare-parts',
        icon: Package,
        blurb: 'Genuine and OEM parts, hard-to-find sourcing and fast delivery to reduce downtime.',
    },
];

export function pillarByKey(key: string): Pillar | undefined {
    return PILLARS.find((p) => p.key === key);
}

export function pillarLabel(key: string): string {
    return pillarByKey(key)?.label ?? key;
}

/** Convert a YouTube/Vimeo watch URL into an embeddable iframe src (or null). */
export function videoEmbedUrl(url?: string | null): string | null {
    if (!url) {
        return null;
    }

    try {
        const u = new URL(url);
        const host = u.hostname.replace(/^www\./, '');

        if (host === 'youtu.be') {
            return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
        }

        if (host.endsWith('youtube.com')) {
            const id =
                u.searchParams.get('v') ??
                u.pathname.split('/').filter(Boolean).pop();

            return id ? `https://www.youtube.com/embed/${id}` : null;
        }

        if (host.endsWith('vimeo.com')) {
            const id = u.pathname.split('/').filter(Boolean).pop();

            return id ? `https://player.vimeo.com/video/${id}` : null;
        }
    } catch {
        return null;
    }

    return null;
}
