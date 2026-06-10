import { Head, Link, usePage } from '@inertiajs/react';
import { Anchor, ArrowRight, Quote, ShieldCheck, Ship } from 'lucide-react';
import { useState } from 'react';
import CinematicScroll from '@/components/cinematic/CinematicScroll';
import type { CinematicMoment } from '@/components/cinematic/CinematicScroll';
import {
    CompassRose,
    Eyebrow,
    RopeDivider,
    SectionHeading,
} from '@/components/marine';
import { SiteFooter, SiteHeader } from '@/layouts/public-layout';
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

const headlineShadow = 'drop-shadow-[0_2px_16px_rgba(0,0,0,0.55)]';

type Props = {
    services: Service[];
    testimonials: Testimonial[];
};

export default function Welcome({ services, testimonials }: Props) {
    const { siteSettings } = usePage().props;
    const [navSolid, setNavSolid] = useState(false);

    const company = siteSettings?.company_name ?? 'Marine Services';
    const tagline =
        siteSettings?.tagline ??
        'Honest marine servicing, repairs, and maintenance — keeping your vessel ready for the water.';
    const stats = siteSettings?.stats?.length
        ? siteSettings.stats
        : DEFAULT_STATS;
    const capability =
        siteSettings?.cinematic_capability ??
        'Servicing, repairs & maintenance — done properly, by people who live on the water.';
    const handoff = siteSettings?.cinematic_handoff ?? 'Welcome aboard.';
    const heroHeading =
        siteSettings?.hero_heading ??
        'Expert care for your vessel, on and off the water';
    const heroSubtext =
        siteSettings?.hero_subtext ??
        'Servicing, repairs, and maintenance delivered by certified marine technicians.';

    const featured = services.slice(0, 3);
    const testimonial = testimonials[0];
    const trustStats = stats.slice(0, 2);

    const moments: CinematicMoment[] = [
        {
            id: 'intro',
            start: 0,
            end: 0.16,
            content: (
                <div className="max-w-3xl">
                    <Eyebrow light center>
                        Marine craftsmanship
                    </Eyebrow>
                    <h1
                        className={`mt-6 font-serif text-5xl font-semibold tracking-tight text-paper sm:text-6xl lg:text-7xl ${headlineShadow}`}
                    >
                        {company}
                    </h1>
                    <p
                        className={`mx-auto mt-6 max-w-2xl text-lg text-paper/85 sm:text-xl ${headlineShadow}`}
                    >
                        {tagline}
                    </p>
                </div>
            ),
        },
        {
            id: 'trust',
            start: 0.3,
            end: 0.5,
            content: (
                <div className="flex flex-wrap items-start justify-center gap-x-12 gap-y-8">
                    {trustStats.map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div
                                className={`font-serif text-5xl font-semibold text-brass-bright sm:text-6xl ${headlineShadow}`}
                            >
                                {stat.value}
                            </div>
                            <div
                                className={`mt-2 text-xs font-semibold tracking-[0.22em] text-paper/80 uppercase ${headlineShadow}`}
                            >
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            ),
        },
        {
            id: 'capability',
            start: 0.6,
            end: 0.8,
            content: (
                <h2
                    className={`mx-auto max-w-4xl font-serif text-3xl leading-tight font-semibold text-paper sm:text-5xl ${headlineShadow}`}
                >
                    {capability}
                </h2>
            ),
        },
        {
            id: 'handoff',
            start: 0.85,
            end: 1,
            content: (
                <div className="max-w-2xl">
                    <h2
                        className={`font-serif text-4xl font-semibold tracking-tight text-paper sm:text-6xl ${headlineShadow}`}
                    >
                        {handoff}
                    </h2>
                </div>
            ),
        },
    ];

    return (
        <div className="flex min-h-screen flex-col bg-paper text-ink dark:bg-navy-deep dark:text-paper">
            <Head title="Marine Servicing & Repairs">
                <meta name="description" content={tagline} head-key="desc" />
            </Head>

            <SiteHeader overlay solid={navSolid} />

            <main className="flex-1">
                <CinematicScroll
                    moments={moments}
                    onHeroVisibilityChange={(visible) => setNavSolid(!visible)}
                />

                {/* Hand-off: the cinematic's dark final frames melt into paper */}
                <div
                    className="h-24 bg-gradient-to-b from-navy-deep to-paper dark:to-navy-deep"
                    aria-hidden
                />

                {/* Intro — uses the editable hero heading/subtext */}
                <section className="bg-paper pb-4 dark:bg-navy-deep">
                    <div className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                        <SectionHeading
                            center
                            eyebrow="Marine servicing"
                            title={heroHeading}
                        >
                            {heroSubtext}
                        </SectionHeading>
                    </div>
                </section>

                {/* Services preview */}
                {featured.length > 0 && (
                    <section className="py-20">
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
                                            className="group relative overflow-hidden rounded-xl border border-seafog bg-surface p-7 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/5 dark:border-navy dark:bg-navy"
                                        >
                                            <span className="absolute inset-x-0 top-0 h-0.5 bg-brass opacity-0 transition-opacity group-hover:opacity-100" />
                                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-brass-bright ring-1 ring-brass/30 transition-colors group-hover:bg-brass group-hover:text-paper dark:bg-navy-deep">
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

                {/* Why us + testimonial */}
                <section className="border-y border-seafog bg-paper-deep/50 py-20 dark:border-navy dark:bg-navy">
                    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                            <div>
                                <SectionHeading
                                    eyebrow="Why crews choose us"
                                    title="Old-fashioned care, done properly"
                                >
                                    Decades of hands-on experience, a fully
                                    equipped yard, and a team that treats every
                                    boat that comes in like its own pride and
                                    joy.
                                </SectionHeading>
                                <div className="mt-10 space-y-7">
                                    {WHY_US.map((item) => (
                                        <div
                                            key={item.title}
                                            className="flex gap-5"
                                        >
                                            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-surface text-brass ring-1 ring-seafog dark:bg-navy-deep dark:text-brass-bright dark:ring-navy">
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
                                <figure className="relative overflow-hidden rounded-2xl bg-navy p-10 text-paper shadow-xl dark:bg-navy-deep">
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
                            Tell us what you need and we'll come back to you
                            with an honest quote — no pressure, no jargon.
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
            </main>

            <SiteFooter />
        </div>
    );
}
