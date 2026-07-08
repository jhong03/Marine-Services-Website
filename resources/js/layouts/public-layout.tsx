import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { CompassRose } from '@/components/marine';
import ThemeToggle from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'Industrial', href: '/industrial' },
    { label: 'Marine', href: '/marine' },
    { label: 'Spare Parts', href: '/spare-parts' },
    { label: 'Projects', href: '/projects' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
];

function isActive(current: string, href: string): boolean {
    if (href === '/') {
        return current === '/';
    }

    return current.startsWith(href);
}

/** Veritas brand logo. */
function BrandMark() {
    return (
        <img
            src="/images/veritas-logo.png"
            alt="Veritas Industrial Services"
            className="h-9 w-9 object-contain"
        />
    );
}

/**
 * Site header. `overlay` makes it fixed and transparent (for the homepage
 * cinematic); `solid` then controls whether it has solidified on scroll.
 */
export function SiteHeader({
    overlay = false,
    solid = true,
}: {
    overlay?: boolean;
    solid?: boolean;
}) {
    const { url, props } = usePage();
    const { siteSettings } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const companyName =
        siteSettings?.company_name ?? 'Veritas Industrial Services';
    // Light treatment: transparent header sitting over dark footage.
    const light = overlay && !solid;

    return (
        <header
            className={cn(
                'top-0 z-50 transition-colors duration-300',
                overlay ? 'fixed inset-x-0' : 'sticky',
                light
                    ? 'border-b border-transparent bg-transparent'
                    : 'border-b border-seafog/80 bg-paper/85 backdrop-blur dark:border-navy dark:bg-navy-deep/85',
            )}
        >
            <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-3">
                    <BrandMark />
                    <span
                        className={cn(
                            'font-serif text-lg font-semibold tracking-tight',
                            light ? 'text-paper' : 'text-ink dark:text-paper',
                        )}
                    >
                        {companyName}
                    </span>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden items-center gap-1 lg:flex">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                'relative rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                isActive(url, link.href)
                                    ? light
                                        ? 'text-brass-bright'
                                        : 'text-brass dark:text-brass-bright'
                                    : light
                                      ? 'text-paper/80 hover:text-paper'
                                      : 'text-ink-soft hover:text-ink dark:text-paper/70 dark:hover:text-paper',
                            )}
                        >
                            {link.label}
                            {isActive(url, link.href) && (
                                <span
                                    className={cn(
                                        'absolute inset-x-3 -bottom-px h-0.5 rounded-full',
                                        light
                                            ? 'bg-brass-bright'
                                            : 'bg-brass dark:bg-brass-bright',
                                    )}
                                />
                            )}
                        </Link>
                    ))}

                    <ThemeToggle
                        className={cn(
                            'ml-1',
                            light && 'text-paper/80 hover:text-paper',
                        )}
                    />
                </nav>

                {/* Mobile controls */}
                <div className="flex items-center gap-1 lg:hidden">
                    <ThemeToggle className={cn(light && 'text-paper/80')} />
                    <button
                        type="button"
                        onClick={() => setMobileOpen((open) => !open)}
                        className={cn(
                            'inline-flex items-center justify-center rounded-md p-2',
                            light
                                ? 'text-paper/90 hover:bg-paper/10'
                                : 'text-ink-soft hover:bg-paper-deep dark:text-paper/70 dark:hover:bg-navy',
                        )}
                        aria-label="Toggle navigation"
                    >
                        {mobileOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile nav (always solid panel for legibility) */}
            {mobileOpen && (
                <nav className="border-t border-seafog bg-paper px-4 pb-4 lg:hidden dark:border-navy dark:bg-navy-deep">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className={`block rounded-md px-3 py-2 text-base font-medium ${
                                isActive(url, link.href)
                                    ? 'bg-paper-deep text-brass dark:bg-navy dark:text-brass-bright'
                                    : 'text-ink-soft hover:bg-paper-deep dark:text-paper/80 dark:hover:bg-navy'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            )}
        </header>
    );
}

export function SiteFooter() {
    const { props } = usePage();
    const { siteSettings } = props;
    const companyName =
        siteSettings?.company_name ?? 'Veritas Industrial Services';

    return (
        <footer className="relative overflow-hidden bg-navy text-paper/70 dark:bg-navy-deep">
            <CompassRose className="pointer-events-none absolute -bottom-16 -left-16 h-72 w-72 text-brass-bright/[0.06]" />
            <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
                <div className="md:col-span-2">
                    <div className="flex items-center gap-3">
                        <BrandMark />
                        <span className="font-serif text-lg font-semibold text-paper">
                            {companyName}
                        </span>
                    </div>
                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/55">
                        {siteSettings?.tagline ??
                            'Industrial and marine services, and genuine spare parts — delivered with precision, integrity and care.'}
                    </p>
                </div>

                <div>
                    <h3 className="text-[0.7rem] font-semibold tracking-[0.2em] text-brass-bright uppercase">
                        Explore
                    </h3>
                    <ul className="mt-4 space-y-2.5 text-sm">
                        {NAV_LINKS.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="text-paper/60 transition-colors hover:text-paper"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-[0.7rem] font-semibold tracking-[0.2em] text-brass-bright uppercase">
                        Get in touch
                    </h3>
                    <ul className="mt-4 space-y-2.5 text-sm text-paper/60">
                        {siteSettings?.address && (
                            <li>{siteSettings.address}</li>
                        )}
                        {siteSettings?.email && <li>{siteSettings.email}</li>}
                        {siteSettings?.phone && <li>{siteSettings.phone}</li>}
                    </ul>
                </div>
            </div>
            <div className="relative border-t border-paper/10">
                <div className="mx-auto w-full max-w-7xl px-4 py-6 text-center text-xs text-paper/40 sm:px-6 lg:px-8">
                    © {new Date().getFullYear()} {companyName}. Industrial &
                    marine services, and genuine spare parts.
                </div>
            </div>
        </footer>
    );
}

export default function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col bg-paper text-ink dark:bg-navy-deep dark:text-paper">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
        </div>
    );
}
