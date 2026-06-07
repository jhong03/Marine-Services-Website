import { Link, usePage } from '@inertiajs/react';
import { Anchor, Menu, X } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { login, register, dashboard } from '@/routes';
import ThemeToggle from '@/components/theme-toggle';

const NAV_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Fleet', href: '/fleet' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
];

function isActive(current: string, href: string): boolean {
    if (href === '/') {
        return current === '/';
    }

    return current.startsWith(href);
}

export default function PublicLayout({ children }: { children: ReactNode }) {
    const { url, props } = usePage();
    const { auth } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="flex min-h-screen flex-col bg-white text-slate-800 dark:bg-slate-950 dark:text-slate-200">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
                <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-sky-600 to-cyan-500 text-white shadow-sm">
                            <Anchor className="h-5 w-5" />
                        </span>
                        <span className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                            Marine Services
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden items-center gap-1 md:flex">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                                    isActive(url, link.href)
                                        ? 'text-sky-700 dark:text-sky-400'
                                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        <ThemeToggle className="ml-1" />

                        <span className="mx-2 h-5 w-px bg-slate-200 dark:bg-slate-700" aria-hidden />

                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={register()}
                                    className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                                >
                                    Sign up
                                </Link>
                            </>
                        )}

                        <Link
                            href="/contact"
                            className="ml-1 rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-700"
                        >
                            Get a Quote
                        </Link>
                    </nav>

                    {/* Mobile controls */}
                    <div className="flex items-center gap-1 md:hidden">
                        <ThemeToggle />
                        <button
                            type="button"
                            onClick={() => setMobileOpen((open) => !open)}
                            className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                            aria-label="Toggle navigation"
                        >
                            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile nav */}
                {mobileOpen && (
                    <nav className="border-t border-slate-200 bg-white px-4 pb-4 md:hidden dark:border-slate-800 dark:bg-slate-950">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className={`block rounded-md px-3 py-2 text-base font-medium ${
                                    isActive(url, link.href)
                                        ? 'bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300'
                                        : 'text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        <div className="my-2 h-px bg-slate-200 dark:bg-slate-800" />

                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                onClick={() => setMobileOpen(false)}
                                className="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    onClick={() => setMobileOpen(false)}
                                    className="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={register()}
                                    onClick={() => setMobileOpen(false)}
                                    className="mt-1 block rounded-md border border-slate-300 px-3 py-2 text-center text-base font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                                >
                                    Sign up
                                </Link>
                            </>
                        )}

                        <Link
                            href="/contact"
                            onClick={() => setMobileOpen(false)}
                            className="mt-2 block rounded-md bg-sky-600 px-3 py-2 text-center text-base font-semibold text-white"
                        >
                            Get a Quote
                        </Link>
                    </nav>
                )}
            </header>

            <main className="flex-1">{children}</main>

            {/* Footer */}
            <footer className="border-t border-slate-200 bg-slate-900 text-slate-300 dark:border-slate-800 dark:bg-slate-950">
                <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2">
                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-sky-600 to-cyan-500 text-white">
                                <Anchor className="h-5 w-5" />
                            </span>
                            <span className="text-lg font-semibold text-white">Marine Services</span>
                        </div>
                        <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
                            Professional marine servicing, repairs, and maintenance — keeping your
                            vessel safe, reliable, and ready for the water.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white">Explore</h3>
                        <ul className="mt-4 space-y-2 text-sm">
                            {NAV_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-400 transition-colors hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white">Get in touch</h3>
                        <ul className="mt-4 space-y-2 text-sm text-slate-400">
                            <li>Marina Drive, Harbourside</li>
                            <li>hello@marineservices.test</li>
                            <li>+00 0000 000000</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-slate-800">
                    <div className="mx-auto w-full max-w-7xl px-4 py-6 text-center text-xs text-slate-500 sm:px-6 lg:px-8">
                        © {new Date().getFullYear()} Marine Services. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
