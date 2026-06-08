import { Head, Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { PageBanner, RopeDivider } from '@/components/marine';
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

            <PageBanner eyebrow="What we offer" title="Our Services">
                Comprehensive marine servicing and repair, delivered by
                certified technicians at your berth or in our fully equipped
                yard — the same care, whatever your boat.
            </PageBanner>

            <section className="bg-paper py-20 dark:bg-navy-deep">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                        {services.map((service, index) => {
                            const Icon = serviceIcon(service.icon);

                            return (
                                <article
                                    key={service.id}
                                    className="group relative overflow-hidden rounded-xl border border-seafog bg-surface p-7 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/5 dark:border-navy dark:bg-navy"
                                >
                                    <span className="absolute inset-x-0 top-0 h-0.5 bg-brass opacity-0 transition-opacity group-hover:opacity-100" />
                                    <div className="flex items-start justify-between">
                                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-brass-bright ring-1 ring-brass/30 transition-colors group-hover:bg-brass group-hover:text-paper dark:bg-navy-deep">
                                            <Icon className="h-6 w-6" />
                                        </span>
                                        <span className="font-serif text-2xl text-seafog dark:text-navy-deep">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                    </div>
                                    <h2 className="mt-5 font-serif text-xl font-semibold text-ink dark:text-paper">
                                        {service.title}
                                    </h2>
                                    <p className="mt-3 leading-relaxed text-ink-soft dark:text-paper/65">
                                        {service.description}
                                    </p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="border-t border-seafog bg-paper-deep/50 py-16 dark:border-navy dark:bg-navy">
                <div className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                    <RopeDivider className="mb-8" />
                    <h2 className="font-serif text-2xl font-semibold text-ink dark:text-paper">
                        Don't see what you need?
                    </h2>
                    <p className="mt-3 text-ink-soft dark:text-paper/65">
                        We take on custom jobs and project work too. Tell us
                        what you're after and we'll let you know how we can
                        help.
                    </p>
                    <Link
                        href="/contact"
                        className="mt-7 inline-flex items-center gap-2 rounded-md bg-brass px-6 py-3 text-base font-semibold text-paper transition-colors hover:bg-timber dark:bg-brass-bright dark:text-navy-deep dark:hover:bg-rope"
                    >
                        Request a quote
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </section>
        </PublicLayout>
    );
}
