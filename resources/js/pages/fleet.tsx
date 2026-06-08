import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Ship } from 'lucide-react';
import { PageBanner, RopeDivider } from '@/components/marine';
import PublicLayout from '@/layouts/public-layout';
import type { FleetItem } from '@/types';

type Props = {
    fleet: FleetItem[];
};

export default function Fleet({ fleet }: Props) {
    return (
        <PublicLayout>
            <Head title="Fleet & Equipment" />

            <PageBanner eyebrow="Our gear" title="Fleet & Equipment">
                The right kit for every job — from quick on-water response to
                full haul-out and workshop servicing, all maintained to the same
                standard we hold your boat to.
            </PageBanner>

            <section className="bg-paper py-20 dark:bg-navy-deep">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8 sm:grid-cols-2">
                        {fleet.map((item) => (
                            <article
                                key={item.id}
                                className="group overflow-hidden rounded-2xl border border-seafog bg-surface shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/5 dark:border-navy dark:bg-navy"
                            >
                                <div className="relative flex h-44 items-center justify-center overflow-hidden bg-navy dark:bg-navy-deep">
                                    <div className="paper-grain pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-soft-light" />
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-navy via-navy to-timber/40" />
                                    <Ship className="relative h-16 w-16 text-brass-bright/80 transition-transform duration-500 group-hover:scale-110" />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center justify-between gap-3">
                                        <h2 className="font-serif text-lg font-semibold text-ink dark:text-paper">
                                            {item.name}
                                        </h2>
                                        {item.spec && (
                                            <span className="rounded-full border border-brass/30 bg-paper-deep px-3 py-1 text-xs font-semibold tracking-wide text-brass dark:border-brass/40 dark:bg-navy-deep dark:text-brass-bright">
                                                {item.spec}
                                            </span>
                                        )}
                                    </div>
                                    <p className="mt-3 leading-relaxed text-ink-soft dark:text-paper/65">
                                        {item.description}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>

                    <p className="mt-10 text-center text-sm text-ink-soft/70 italic dark:text-paper/45">
                        Photographs are placeholders — real shots of your own
                        fleet can be dropped in later.
                    </p>
                </div>
            </section>

            <section className="border-t border-seafog bg-paper-deep/50 py-16 dark:border-navy dark:bg-navy">
                <div className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                    <RopeDivider className="mb-8" />
                    <h2 className="font-serif text-2xl font-semibold text-ink dark:text-paper">
                        Need a haul-out or callout?
                    </h2>
                    <p className="mt-3 text-ink-soft dark:text-paper/65">
                        Book our equipment and crew for your next service —
                        we'll sort the rest.
                    </p>
                    <Link
                        href="/contact"
                        className="mt-7 inline-flex items-center gap-2 rounded-md bg-brass px-6 py-3 text-base font-semibold text-paper transition-colors hover:bg-timber dark:bg-brass-bright dark:text-navy-deep dark:hover:bg-rope"
                    >
                        Get in touch
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </section>
        </PublicLayout>
    );
}
