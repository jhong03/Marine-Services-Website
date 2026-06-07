import { Link } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
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
            <section className="bg-gradient-to-br from-slate-900 to-sky-900 text-white dark:from-black dark:to-sky-950">
                <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Account Settings
                    </h1>
                    <p className="mt-3 max-w-2xl text-slate-300">
                        Manage your profile and account settings.
                    </p>
                </div>
            </section>

            {/* Body */}
            <section className="bg-slate-50 py-16 dark:bg-slate-900">
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
                                            ? 'bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300'
                                            : 'text-slate-600 hover:bg-white hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white',
                                    )}
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </nav>
                    </aside>

                    <div className="flex-1">
                        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                            <div className="space-y-12">{children}</div>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
