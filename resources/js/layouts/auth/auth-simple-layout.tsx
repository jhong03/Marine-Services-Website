import { Link } from '@inertiajs/react';
import { Anchor, ArrowLeft, Waves } from 'lucide-react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="flex min-h-svh bg-white text-slate-800 dark:bg-slate-950 dark:text-slate-200">
            {/* Marine brand panel (desktop only) */}
            <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-sky-900 p-12 text-white lg:flex">
                <div className="absolute inset-0 opacity-20">
                    <Waves className="absolute -right-12 -bottom-12 h-[28rem] w-[28rem] text-sky-400" />
                </div>

                <Link href={home()} className="relative flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-sky-600 to-cyan-500 text-white shadow-sm">
                        <Anchor className="h-5 w-5" />
                    </span>
                    <span className="text-lg font-semibold tracking-tight">Marine Services</span>
                </Link>

                <div className="relative max-w-md">
                    <h2 className="text-3xl font-bold leading-tight">
                        Your vessel, in expert hands
                    </h2>
                    <p className="mt-4 text-slate-300">
                        Manage your bookings, track your servicing history, and stay on top of your
                        boat's maintenance — all in one place.
                    </p>
                </div>

                <div className="relative text-sm text-slate-400">
                    © {new Date().getFullYear()} Marine Services
                </div>
            </div>

            {/* Form side */}
            <div className="flex w-full flex-col lg:w-1/2">
                <div className="p-6">
                    <Link
                        href={home()}
                        className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
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
                            className="mb-8 flex items-center justify-center gap-2 lg:hidden"
                        >
                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-sky-600 to-cyan-500 text-white shadow-sm">
                                <Anchor className="h-5 w-5" />
                            </span>
                            <span className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                                Marine Services
                            </span>
                        </Link>

                        <div className="space-y-2 text-center lg:text-left">
                            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                {title}
                            </h1>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
                        </div>

                        <div className="mt-8">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
