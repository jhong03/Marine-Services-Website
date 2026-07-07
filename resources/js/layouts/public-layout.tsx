import { Link, usePage } from '@inertiajs/react';
import { LogOut, Menu, Settings, Shield, X } from 'lucide-react';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { CompassRose } from '@/components/marine';
import ThemeToggle from '@/components/theme-toggle';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { login, logout, register } from '@/routes';
import { edit } from '@/routes/profile';

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

/** Brass "V" monogram on a navy disc — brand mark for Veritas. */
function BrandMark({ light = false }: { light?: boolean }) {
    return (
        <span
            className={cn(
                'flex h-9 w-9 items-center justify-center rounded-full font-serif text-lg leading-none font-semibold text-brass-bright ring-1 ring-brass/50',
                light ? 'bg-paper/10' : 'bg-navy',
            )}
            aria-hidden
        >
            V
        </span>
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
    const { auth, siteSettings } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const getInitials = useInitials();

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
                    <BrandMark light={light} />
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

                    <span
                        className={cn(
                            'mx-2 h-5 w-px',
                            light ? 'bg-paper/20' : 'bg-seafog dark:bg-navy',
                        )}
                        aria-hidden
                    />

                    {auth.user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button
                                    type="button"
                                    aria-label="Account menu"
                                    className={cn(
                                        'ml-1 flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold text-brass-bright ring-1 ring-brass/50',
                                        light ? 'bg-paper/10' : 'bg-navy',
                                    )}
                                >
                                    {getInitials(auth.user.name)}
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <UserMenuContent user={auth.user} />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <>
                            <Link
                                href={login()}
                                className={cn(
                                    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                    light
                                        ? 'text-paper/80 hover:text-paper'
                                        : 'text-ink-soft hover:text-ink dark:text-paper/70 dark:hover:text-paper',
                                )}
                            >
                                Log in
                            </Link>
                            <Link
                                href={register()}
                                className={cn(
                                    'rounded-md border px-4 py-2 text-sm font-semibold transition-colors',
                                    light
                                        ? 'border-paper/30 text-paper hover:bg-paper/10'
                                        : 'border-seafog text-ink hover:bg-paper-deep dark:border-navy dark:text-paper dark:hover:bg-navy',
                                )}
                            >
                                Sign up
                            </Link>
                        </>
                    )}
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

                    <div className="my-2 h-px bg-seafog dark:bg-navy" />

                    {auth.user ? (
                        <>
                            {auth.user.is_admin ? (
                                <a
                                    href="/admin"
                                    className="flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-ink-soft hover:bg-paper-deep dark:text-paper/80 dark:hover:bg-navy"
                                >
                                    <Shield className="h-4 w-4" />
                                    Admin panel
                                </a>
                            ) : null}
                            <Link
                                href={edit()}
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-ink-soft hover:bg-paper-deep dark:text-paper/80 dark:hover:bg-navy"
                            >
                                <Settings className="h-4 w-4" />
                                Settings
                            </Link>
                            <Link
                                href={logout()}
                                as="button"
                                onClick={() => setMobileOpen(false)}
                                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-base font-medium text-ink-soft hover:bg-paper-deep dark:text-paper/80 dark:hover:bg-navy"
                            >
                                <LogOut className="h-4 w-4" />
                                Log out
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                href={login()}
                                onClick={() => setMobileOpen(false)}
                                className="block rounded-md px-3 py-2 text-base font-medium text-ink-soft hover:bg-paper-deep dark:text-paper/80 dark:hover:bg-navy"
                            >
                                Log in
                            </Link>
                            <Link
                                href={register()}
                                onClick={() => setMobileOpen(false)}
                                className="mt-1 block rounded-md border border-seafog px-3 py-2 text-center text-base font-semibold text-ink hover:bg-paper-deep dark:border-navy dark:text-paper dark:hover:bg-navy"
                            >
                                Sign up
                            </Link>
                        </>
                    )}
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
