import { Head, Link } from '@inertiajs/react';
import {
    Wrench,
    Droplets,
    Gauge,
    Ship,
    PaintBucket,
    LifeBuoy,
    ArrowRight,
} from 'lucide-react';
import PublicLayout from '@/layouts/public-layout';

const SERVICES = [
    {
        icon: Wrench,
        title: 'Engine Service & Repair',
        description:
            'Routine servicing, fault diagnostics, and full repairs for inboard and outboard engines — petrol and diesel.',
    },
    {
        icon: Droplets,
        title: 'Hull Cleaning & Antifoul',
        description:
            'Pressure washing, antifoul stripping and application, and propeller polishing to protect performance.',
    },
    {
        icon: Gauge,
        title: 'Marine Electronics',
        description:
            'Supply and installation of chartplotters, radar, AIS, VHF, and instrumentation — fully calibrated.',
    },
    {
        icon: Ship,
        title: 'Rigging & Sails',
        description:
            'Standing and running rigging inspection, replacement, and tuning for sailing vessels of all sizes.',
    },
    {
        icon: PaintBucket,
        title: 'Gelcoat & Finishing',
        description:
            'Gelcoat repair, polishing, and detailing to keep your vessel looking its best above the waterline.',
    },
    {
        icon: LifeBuoy,
        title: 'Safety & Compliance',
        description:
            'Safety equipment checks, servicing of liferafts and extinguishers, and survey preparation.',
    },
];

export default function Services() {
    return (
        <PublicLayout>
            <Head title="Services" />

            <section className="bg-gradient-to-br from-slate-900 to-sky-900 text-white">
                <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Our Services</h1>
                    <p className="mt-4 max-w-2xl text-lg text-slate-300">
                        Comprehensive marine servicing and repair, delivered by certified
                        technicians at your berth or in our fully equipped yard.
                    </p>
                </div>
            </section>

            <section className="bg-slate-50 py-20">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {SERVICES.map((service) => (
                            <div
                                key={service.title}
                                className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
                            >
                                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600 transition-colors group-hover:bg-sky-600 group-hover:text-white">
                                    <service.icon className="h-6 w-6" />
                                </span>
                                <h2 className="mt-6 text-xl font-semibold text-slate-900">
                                    {service.title}
                                </h2>
                                <p className="mt-3 leading-relaxed text-slate-600">
                                    {service.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-white py-16">
                <div className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-slate-900">
                        Don't see what you need?
                    </h2>
                    <p className="mt-3 text-slate-600">
                        We take on custom jobs and project work. Get in touch and we'll let you know
                        how we can help.
                    </p>
                    <Link
                        href="/contact"
                        className="mt-6 inline-flex items-center gap-2 rounded-md bg-sky-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-sky-700"
                    >
                        Request a quote
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </section>
        </PublicLayout>
    );
}
