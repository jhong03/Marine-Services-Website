import { Head, Link, usePage } from '@inertiajs/react';
import { Anchor, ArrowRight, Quote, ShieldCheck, Ship } from 'lucide-react';
import {
    CompassRose,
    Eyebrow,
    RopeDivider,
    SectionHeading,
    WaveEdge,
} from '@/components/marine';
import PublicLayout from '@/layouts/public-layout';
import { serviceIcon } from '@/lib/icons';
import type { Service, Stat, Testimonial } from '@/types';

const WHY_US = [
    {
        icon: ShieldCheck,
        title: 'Certified & insured',
        description:
            'Fully qualified marine technicians and comprehensive cover on every job — so you can hand over the keys with an easy mind.',
    },
    {
        icon: Anchor,
        title: 'On-site & in-water',
        description:
            'We come to your berth or haul out at our yard — whatever suits you and your vessel best.',
    },
    {
        icon: Ship,
        title: 'Every kind of boat',
        description:
            'From little day boats and weekend yachts to working commercial craft, we look after them all.',
    },
];

const DEFAULT_STATS: Stat[] = [
    { value: '20+', label: 'Years on the water' },
    { value: '1,200+', label: 'Vessels cared for' },
    { value: '24/7', label: 'Emergency callout' },
    { value: '100%', label: 'Certified hands' },
];

type Props = {
    services: Service[];
    testimonials: Testimonial[];
};

export default function Welcome({ services, testimonials }: Props) {
    const { siteSettings } = usePage().props;

    const stats = siteSettings?.stats?.length
        ? siteSettings.stats
        : DEFAULT_STATS;
    const heroHeading =
        siteSettings?.hero_heading ??
        'Looking after your vessel like it were our own';
    const heroSubtext =
        siteSettings?.hero_subtext ??
        'Servicing, repairs, and maintenance from marine hands who have spent a lifetime on the water. We keep your boat safe, sound, and ready for every voyage.';
    const featured = services.slice(0, 3);
    const testimonial = testimonials[0];
    const year = new Date().getFullYear();

    return (
        <PublicLayout>
            <Head title="Marine Servicing & Repairs" />

            {/* Hero */}
            <section className="relative overflow-hidden bg-navy text-paper dark:bg-navy-deep">
                <div className="paper-grain pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-soft-light" />
                <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-brass/15 blur-3xl" />
                <CompassRose className="pointer-events-none absolute -bottom-24 -left-20 h-96 w-96 text-brass-bright/[0.07]" />

                <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 pt-20 pb-28 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:px-8 lg:pt-28">
                    <div className="max-w-2xl">
                        <Eyebrow light>Trusted marine specialists</Eyebrow>
                        <h1 className="mt-6 font-serif text-4xl leading-[1.1] font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                            {heroHeading}
                        </h1>
                        <p className="mt-6 text-lg leading-relaxed text-paper/70">
                            {heroSubtext}
                        </p>
                        <div className="mt-10 flex flex-wrap gap-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 rounded-md bg-brass-bright px-6 py-3 text-base font-semibold text-navy-deep shadow-lg shadow-black/20 transition-colors hover:bg-rope"
                            >
                                Request a quote
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link
                                href="/services"
                                className="inline-flex items-center gap-2 rounded-md border border-paper/25 px-6 py-3 text-base font-semibold text-paper transition-colors hover:bg-paper/10"
                            >
                                Our services
                            </Link>
                        </div>
                    </div>

                    {/* Brass emblem — a crafted "maker's seal" */}
                    <div className="hidden justify-center lg:flex">
                        <div className="relative h-72 w-72">
                            <CompassRose className="absolute inset-0 h-full w-full text-brass-bright/25" />
                            <div className="absolute inset-9 flex flex-col items-center justify-center rounded-full border border-brass/40 text-center">
                                <Anchor className="h-12 w-12 text-brass-bright" />
                                <span className="mt-4 font-serif text-2xl font-semibold text-paper">
                                    Est. {year - 20}
                                </span>
                                <span className="mt-2 text-[0.6rem] font-semibold tracking-[0.3em] text-brass-bright uppercase">
                                    Marine Craft
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <WaveEdge />
            </section>

            {/* Stats band */}
            <section className="bg-paper dark:bg-navy-deep">
                <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-y-8 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:divide-x lg:divide-seafog lg:px-8 dark:lg:divide-navy">
                    {stats.map((stat) => (
                        <div key={stat.label} className="px-4 text-center">
                            <div className="font-serif text-4xl font-semibold text-brass sm:text-5xl dark:text-brass-bright">
                                {stat.value}
                            </div>
                            <div className="mt-2 text-xs font-semibold tracking-[0.18em] text-ink-soft uppercase dark:text-paper/55">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Services preview */}
            {featured.length > 0 && (
                <section className="border-y border-seafog bg-paper-deep/50 py-20 dark:border-navy dark:bg-navy">
                    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                        <SectionHeading
                            center
                            eyebrow="What we do"
                            title="A full range of marine care"
                        >
                            Everything your vessel needs to stay seaworthy,
                            under one roof and one trusted crew.
                        </SectionHeading>

                        <div className="mt-14 grid gap-7 md:grid-cols-3">
                            {featured.map((service) => {
                                const Icon = serviceIcon(service.icon);

                                return (
                                    <article
                                        key={service.id}
                                        className="group relative overflow-hidden rounded-xl border border-seafog bg-surface p-7 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/5 dark:border-navy dark:bg-navy-deep"
                                    >
                                        <span className="absolute inset-x-0 top-0 h-0.5 bg-brass opacity-0 transition-opacity group-hover:opacity-100" />
                                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-brass-bright ring-1 ring-brass/30 transition-colors group-hover:bg-brass group-hover:text-paper dark:bg-navy">
                                            <Icon className="h-6 w-6" />
                                        </span>
                                        <h3 className="mt-5 font-serif text-xl font-semibold text-ink dark:text-paper">
                                            {service.title}
                                        </h3>
                                        <p className="mt-3 leading-relaxed text-ink-soft dark:text-paper/65">
                                            {service.description}
                                        </p>
                                    </article>
                                );
                            })}
                        </div>

                        <div className="mt-12 text-center">
                            <Link
                                href="/services"
                                className="inline-flex items-center gap-2 text-base font-semibold text-brass hover:text-timber dark:text-brass-bright dark:hover:text-rope"
                            >
                                View all services
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Why us */}
            <section className="bg-paper py-20 dark:bg-navy-deep">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                        <div>
                            <SectionHeading
                                eyebrow="Why crews choose us"
                                title="Old-fashioned care, done properly"
                            >
                                Decades of hands-on experience, a fully equipped
                                yard, and a team that treats every boat that
                                comes in like it's their own pride and joy.
                            </SectionHeading>
                            <div className="mt-10 space-y-7">
                                {WHY_US.map((item) => (
                                    <div
                                        key={item.title}
                                        className="flex gap-5"
                                    >
                                        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-paper-deep text-brass ring-1 ring-seafog dark:bg-navy dark:text-brass-bright dark:ring-navy">
                                            <item.icon className="h-5 w-5" />
                                        </span>
                                        <div>
                                            <h3 className="font-serif text-lg font-semibold text-ink dark:text-paper">
                                                {item.title}
                                            </h3>
                                            <p className="mt-1.5 text-ink-soft dark:text-paper/65">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {testimonial && (
                            <figure className="relative overflow-hidden rounded-2xl bg-navy p-10 text-paper shadow-xl dark:bg-navy">
                                <CompassRose className="pointer-events-none absolute -top-12 -right-12 h-56 w-56 text-brass-bright/10" />
                                <Quote className="relative h-10 w-10 text-brass-bright" />
                                <blockquote className="relative mt-6 font-serif text-xl leading-relaxed font-medium text-paper/90 italic">
                                    “{testimonial.quote}”
                                </blockquote>
                                {testimonial.author && (
                                    <figcaption className="relative mt-6 text-sm font-semibold tracking-wide text-brass-bright">
                                        — {testimonial.author}
                                    </figcaption>
                                )}
                            </figure>
                        )}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative overflow-hidden bg-navy dark:bg-navy-deep">
                <div className="paper-grain pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-soft-light" />
                <CompassRose className="pointer-events-none absolute -right-16 -bottom-20 h-80 w-80 text-brass-bright/[0.07]" />
                <div className="relative mx-auto w-full max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
                    <RopeDivider className="mb-8 text-brass-bright/60" />
                    <h2 className="font-serif text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
                        Ready to book your vessel in?
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-lg text-paper/70">
                        Tell us what you need and we'll come back to you with an
                        honest quote — no pressure, no jargon.
                    </p>
                    <Link
                        href="/contact"
                        className="mt-9 inline-flex items-center gap-2 rounded-md bg-brass-bright px-6 py-3 text-base font-semibold text-navy-deep shadow-lg shadow-black/20 transition-colors hover:bg-rope"
                    >
                        Get in touch
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </section>
        </PublicLayout>
    );
}
