import { Head, Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import PublicLayout from '@/layouts/public-layout';
import { serviceIcon } from '@/lib/icons';
import type { Service } from '@/types';

type Props = {
    services: Service[];
};

export default function Services({ services }: Props) {
    return (
        <PublicLayout>
            <Head title="Services" />

            <section className="bg-gradient-to-br from-slate-900 to-sky-900 text-white dark:from-black dark:to-sky-950">
                <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                        Our Services
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg text-slate-300">
                        Comprehensive marine servicing and repair, delivered by
                        certified technicians at your berth or in our fully
                        equipped yard.
                    </p>
                </div>
            </section>

            <section className="bg-slate-50 py-20 dark:bg-slate-900">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {services.map((service) => {
                            const Icon = serviceIcon(service.icon);

                            return (
                                <div
                                    key={service.id}
                                    className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
                                >
                                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600 transition-colors group-hover:bg-sky-600 group-hover:text-white dark:bg-sky-950 dark:text-sky-400 dark:group-hover:bg-sky-500 dark:group-hover:text-white">
                                        <Icon className="h-6 w-6" />
                                    </span>
                                    <h2 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                                        {service.title}
                                    </h2>
                                    <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-400">
                                        {service.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="bg-white py-16 dark:bg-slate-950">
                <div className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Don't see what you need?
                    </h2>
                    <p className="mt-3 text-slate-600 dark:text-slate-400">
                        We take on custom jobs and project work. Get in touch
                        and we'll let you know how we can help.
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
