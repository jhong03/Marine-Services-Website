import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { CompassRose, Eyebrow } from '@/components/marine';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

function BrandMark({ light = false }: { light?: boolean }) {
    return (
        <span
            className={
                light
                    ? 'flex h-9 w-9 items-center justify-center rounded-full bg-paper/10 font-serif text-lg leading-none font-semibold text-brass-bright ring-1 ring-brass/50'
                    : 'flex h-9 w-9 items-center justify-center rounded-full bg-navy font-serif text-lg leading-none font-semibold text-brass-bright ring-1 ring-brass/50'
            }
            aria-hidden
        >
            V
        </span>
    );
}

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    const year = new Date().getFullYear();

    return (
        <div className="flex min-h-svh bg-paper text-ink dark:bg-navy-deep dark:text-paper">
            {/* Heritage brand panel (desktop only) */}
            <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-navy p-12 text-paper lg:flex dark:bg-navy-deep">
                <div className="paper-grain pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-soft-light" />
                <div className="pointer-events-none absolute -top-24 -right-16 h-96 w-96 rounded-full bg-brass/15 blur-3xl" />
                <CompassRose className="pointer-events-none absolute -right-20 -bottom-24 h-[28rem] w-[28rem] text-brass-bright/10" />

                <Link
                    href={home()}
                    className="relative flex items-center gap-3"
                >
                    <BrandMark light />
                    <span className="font-serif text-lg font-semibold tracking-tight">
                        Veritas Industrial Services
                    </span>
                </Link>

                <div className="relative max-w-md">
                    <Eyebrow light>Team access</Eyebrow>
                    <h2 className="mt-5 font-serif text-3xl leading-tight font-semibold">
                        Sign in to manage your site
                    </h2>
                    <p className="mt-4 leading-relaxed text-paper/70">
                        Update services, projects and company details — keeping
                        the Veritas website current, all in one place.
                    </p>
                </div>

                <div className="relative text-sm text-paper/45">
                    © {year} Veritas Industrial Services
                </div>
            </div>

            {/* Form side */}
            <div className="flex w-full flex-col lg:w-1/2">
                <div className="p-6">
                    <Link
                        href={home()}
                        className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-paper-deep hover:text-ink dark:text-paper/70 dark:hover:bg-navy dark:hover:text-paper"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to website
                    </Link>
                </div>

                <div className="flex flex-1 items-center justify-center px-6 pb-16">
                    <div className="w-full max-w-sm">
                        {/* Mobile brand */}
                        <Link
                            href={home()}
                            className="mb-8 flex items-center justify-center gap-3 lg:hidden"
                        >
                            <BrandMark />
                            <span className="font-serif text-lg font-semibold tracking-tight text-ink dark:text-paper">
                                Veritas Industrial Services
                            </span>
                        </Link>

                        <div className="space-y-2 text-center lg:text-left">
                            <h1 className="font-serif text-2xl font-semibold tracking-tight text-ink dark:text-paper">
                                {title}
                            </h1>
                            <p className="text-sm text-ink-soft dark:text-paper/60">
                                {description}
                            </p>
                        </div>

                        <div className="mt-8">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
