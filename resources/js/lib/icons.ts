import {
    Anchor,
    Compass,
    Droplets,
    Gauge,
    LifeBuoy,
    PaintBucket,
    Ship,
    ShieldCheck,
    Waves,
    Wrench,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * Maps the icon keys stored in the admin (Services) to lucide components.
 * Keep these keys in sync with the Select options in ServiceForm.php.
 */
export const SERVICE_ICONS: Record<string, LucideIcon> = {
    wrench: Wrench,
    droplets: Droplets,
    gauge: Gauge,
    ship: Ship,
    paint: PaintBucket,
    lifebuoy: LifeBuoy,
    anchor: Anchor,
    shield: ShieldCheck,
    compass: Compass,
    waves: Waves,
};

export function serviceIcon(key?: string | null): LucideIcon {
    return (key && SERVICE_ICONS[key]) || Wrench;
}
