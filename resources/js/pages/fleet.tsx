import { Head, Link } from '@inertiajs/react';
import { Ship, ArrowRight } from 'lucide-react';
import PublicLayout from '@/layouts/public-layout';

const FLEET = [
    {
        name: 'Service Tender',
        spec: 'Rapid on-water response',
        description:
            'Our mobile service tender brings tools and technicians directly to your mooring.',
    },
    {
        name: 'Haul-Out Trailer',
        spec: 'Up to 12m / 8 tonnes',
        description:
            'Hydraulic trailer for safe haul-out, transport, and hardstand storage of your vessel.',
    },
    {
        name: 'Workshop & Yard',
        spec: 'Undercover servicing bays',
        description:
            'Fully equipped workshop for engine rebuilds, fabrication, and finishing work.',
    },
    {
        name: 'Dive Support',
        spec: 'In-water inspection',
        description:
            'Commercial divers for hull cleaning, prop changes, and underwater inspections.',
    },
];

export default function Fleet() {
    return (
        <PublicLayout>
            <Head title="Fleet & Equipment" />

            <section className="bg-gradient-to-br from-slate-900 to-sky-900 text-white dark:from-black dark:to-sky-950">
                <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                        Fleet & Equipment
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg text-slate-300">
                        The right gear for every job — from on-water response to
                        full haul-out and workshop servicing.
                    </p>
                </div>
            </section>

            <section className="bg-slate-50 py-20 dark:bg-slate-900">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8 sm:grid-cols-2">
                        {FLEET.map((item) => (
                            <div
                                key={item.name}
                                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800"
                            >
                                <div className="flex h-40 items-center justify-center bg-gradient-to-br from-sky-600 to-cyan-500 text-white">
                                    <Ship className="h-16 w-16 opacity-90" />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                                            {item.name}
                                        </h2>
                                        <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                                            {item.spec}
                                        </span>
                                    </div>
                                    <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-400">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="mt-10 text-center text-sm text-slate-500 dark:text-slate-400">
                        Images are placeholders — real photos of your fleet can
                        be managed from the admin panel.
                    </p>
                </div>
            </section>

            <section className="bg-white py-16 dark:bg-slate-950">
                <div className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Need a haul-out or callout?
                    </h2>
                    <p className="mt-3 text-slate-600 dark:text-slate-400">
                        Book our equipment and crew for your next service.
                    </p>
                    <Link
                        href="/contact"
                        className="mt-6 inline-flex items-center gap-2 rounded-md bg-sky-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-sky-700"
                    >
                        Get in touch
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </section>
        </PublicLayout>
    );
}
