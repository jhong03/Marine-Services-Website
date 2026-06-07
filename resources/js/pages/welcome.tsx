import { Head, Link } from '@inertiajs/react';
import {
    Anchor,
    Waves,
    Wrench,
    ShieldCheck,
    Ship,
    Gauge,
    Droplets,
    ArrowRight,
} from 'lucide-react';
import PublicLayout from '@/layouts/public-layout';

const SERVICES = [
    {
        icon: Wrench,
        title: 'Engine Service & Repair',
        description:
            'Inboard and outboard servicing, diagnostics, and repairs to keep you moving.',
    },
    {
        icon: Droplets,
        title: 'Hull Cleaning & Antifoul',
        description:
            'Pressure washing, antifoul application, and below-waterline maintenance.',
    },
    {
        icon: Gauge,
        title: 'Electronics & Rigging',
        description:
            'Navigation, instrumentation, and rigging installation, repair, and tuning.',
    },
];

const STATS = [
    { value: '20+', label: 'Years on the water' },
    { value: '1,200+', label: 'Vessels serviced' },
    { value: '24/7', label: 'Emergency callout' },
    { value: '100%', label: 'Certified technicians' },
];

const WHY_US = [
    {
        icon: ShieldCheck,
        title: 'Certified & insured',
        description:
            'Fully qualified marine technicians and comprehensive insurance on every job.',
    },
    {
        icon: Anchor,
        title: 'On-site & in-water',
        description:
            'We come to your berth or haul out at our yard — whatever suits your vessel.',
    },
    {
        icon: Ship,
        title: 'All vessel types',
        description:
            'From day boats and yachts to commercial craft, we service them all.',
    },
];

export default function Welcome() {
    return (
        <PublicLayout>
            <Head title="Marine Servicing & Repairs" />

            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-sky-900 text-white dark:from-black dark:via-slate-950 dark:to-sky-950">
                <div className="absolute inset-0 opacity-20">
                    <Waves className="absolute -right-10 -bottom-10 h-96 w-96 text-sky-400" />
                </div>
                <div className="relative mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
                    <div className="max-w-2xl">
                        <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1.5 text-sm font-medium text-sky-200">
                            <Anchor className="h-4 w-4" />
                            Trusted marine specialists
                        </span>
                        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                            Expert care for your vessel, on and off the water
                        </h1>
                        <p className="mt-6 text-lg leading-relaxed text-slate-300">
                            Servicing, repairs, and maintenance delivered by
                            certified marine technicians. Keep your boat safe,
                            reliable, and ready for every voyage.
                        </p>
                        <div className="mt-10 flex flex-wrap gap-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 rounded-md bg-sky-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-sky-900/30 transition-colors hover:bg-sky-400"
                            >
                                Request a quote
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link
                                href="/services"
                                className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/5 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
                            >
                                Our services
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="border-b border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-950">
                <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
                    {STATS.map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-3xl font-bold text-sky-600 sm:text-4xl dark:text-sky-400">
                                {stat.value}
                            </div>
                            <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Services preview */}
            <section className="bg-slate-50 py-20 dark:bg-slate-900">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                            What we do
                        </h2>
                        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                            A complete range of marine services under one roof.
                        </p>
                    </div>
                    <div className="mt-12 grid gap-8 md:grid-cols-3">
                        {SERVICES.map((service) => (
                            <div
                                key={service.title}
                                className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
                            >
                                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600 transition-colors group-hover:bg-sky-600 group-hover:text-white dark:bg-sky-950 dark:text-sky-400 dark:group-hover:bg-sky-500 dark:group-hover:text-white">
                                    <service.icon className="h-6 w-6" />
                                </span>
                                <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                                    {service.title}
                                </h3>
                                <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-400">
                                    {service.description}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 text-center">
                        <Link
                            href="/services"
                            className="inline-flex items-center gap-2 text-base font-semibold text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
                        >
                            View all services
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why us */}
            <section className="bg-white py-20 dark:bg-slate-950">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                                Why crews choose us
                            </h2>
                            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                                Decades of hands-on marine experience, a fully
                                equipped yard, and a team that treats every
                                vessel like its own.
                            </p>
                            <div className="mt-8 space-y-6">
                                {WHY_US.map((item) => (
                                    <div
                                        key={item.title}
                                        className="flex gap-4"
                                    >
                                        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600 dark:bg-sky-950 dark:text-sky-400">
                                            <item.icon className="h-5 w-5" />
                                        </span>
                                        <div>
                                            <h3 className="font-semibold text-slate-900 dark:text-white">
                                                {item.title}
                                            </h3>
                                            <p className="mt-1 text-slate-600 dark:text-slate-400">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-600 to-cyan-500 p-10 text-white shadow-xl">
                            <Ship className="h-12 w-12" />
                            <blockquote className="mt-6 text-xl leading-relaxed font-medium">
                                “Fast, professional, and honest. They had our
                                engine sorted and us back on the water within
                                days.”
                            </blockquote>
                            <div className="mt-6 text-sm text-sky-100">
                                — Placeholder testimonial, happy customer
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-slate-900 dark:bg-slate-900">
                <div className="mx-auto w-full max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold tracking-tight text-white">
                        Ready to book your vessel in?
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
                        Tell us what you need and we'll get back to you with a
                        quote.
                    </p>
                    <Link
                        href="/contact"
                        className="mt-8 inline-flex items-center gap-2 rounded-md bg-sky-500 px-6 py-3 text-base font-semibold text-white shadow-lg transition-colors hover:bg-sky-400"
                    >
                        Get in touch
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </section>
        </PublicLayout>
    );
}
