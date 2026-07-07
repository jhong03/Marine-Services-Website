import {
    Anchor,
    Boxes,
    Cog,
    Compass,
    Droplets,
    Factory,
    Gauge,
    HardHat,
    Hammer,
    LifeBuoy,
    Package,
    PaintBucket,
    Ship,
    ShieldCheck,
    Truck,
    Waves,
    Wrench,
    Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * Maps the icon keys stored in the admin (Services) to lucide components.
 * Keep these keys in sync with the Select options in ServiceForm.php.
 */
export const SERVICE_ICONS: Record<string, LucideIcon> = {
    // Industrial
    cog: Cog,
    wrench: Wrench,
    hammer: Hammer,
    gauge: Gauge,
    zap: Zap,
    factory: Factory,
    hardhat: HardHat,
    // Spare parts
    package: Package,
    boxes: Boxes,
    truck: Truck,
    // Marine
    ship: Ship,
    droplets: Droplets,
    anchor: Anchor,
    lifebuoy: LifeBuoy,
    waves: Waves,
    compass: Compass,
    paint: PaintBucket,
    shield: ShieldCheck,
};

export function serviceIcon(key?: string | null): LucideIcon {
    return (key && SERVICE_ICONS[key]) || Cog;
}
