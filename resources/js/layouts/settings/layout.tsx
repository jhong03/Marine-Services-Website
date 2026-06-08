import { Link } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import { CompassRose, Eyebrow } from '@/components/marine';
import { useCurrentUrl } from '@/hooks/use-current-url';
import PublicLayout from '@/layouts/public-layout';
import { cn } from '@/lib/utils';
import { edit as editAppearance } from '@/routes/appearance';
import { edit } from '@/routes/profile';
import { edit as editSecurity } from '@/routes/security';
import type { NavItem } from '@/types';

const navItems: NavItem[] = [
    { title: 'Profile', href: edit(), icon: null },
    { title: 'Security', href: editSecurity(), icon: null },
    { title: 'Appearance', href: editAppearance(), icon: null },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
    const { isCurrentOrParentUrl } = useCurrentUrl();

    return (
        <PublicLayout>
            {/* Header */}
            <section className="relative overflow-hidden bg-navy text-paper dark:bg-navy-deep">
                <div className="paper-grain pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-soft-light" />
                <CompassRose className="pointer-events-none absolute -top-12 -right-16 h-72 w-72 text-brass-bright/[0.08]" />
                <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <Eyebrow light>Your account</Eyebrow>
                    <h1 className="mt-4 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                        Account Settings
                    </h1>
                    <p className="mt-3 max-w-2xl text-paper/70">
                        Manage your profile and account settings.
                    </p>
                </div>
            </section>

            {/* Body */}
            <section className="bg-paper py-16 dark:bg-navy-deep">
                <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:px-8">
                    <aside className="lg:w-56 lg:shrink-0">
                        <nav
                            className="flex flex-col gap-1"
                            aria-label="Settings"
                        >
                            {navItems.map((item) => (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className={cn(
                                        'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                        isCurrentOrParentUrl(item.href)
                                            ? 'bg-paper-deep text-brass dark:bg-navy dark:text-brass-bright'
                                            : 'text-ink-soft hover:bg-paper-deep hover:text-ink dark:text-paper/70 dark:hover:bg-navy dark:hover:text-paper',
                                    )}
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </nav>
                    </aside>

                    <div className="flex-1">
                        <div className="rounded-2xl border border-seafog bg-surface p-8 shadow-sm dark:border-navy dark:bg-navy">
                            <div className="space-y-12">{children}</div>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
