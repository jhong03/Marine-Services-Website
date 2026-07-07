import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, Clock, Cog, Quote, ShieldCheck } from 'lucide-react';
import {
    CompassRose,
    Eyebrow,
    RopeDivider,
    SectionHeading,
    WaveEdge,
} from '@/components/marine';
import ProjectsGrid from '@/components/projects-grid';
import PublicLayout from '@/layouts/public-layout';
import { PILLARS } from '@/lib/projects';
import type { Project, Stat, Testimonial } from '@/types';

const WHY_US = [
    {
        icon: ShieldCheck,
        title: 'Certified & compliant',
        description:
            'Qualified technicians and full safety compliance across every industrial and marine job we take on.',
    },
    {
        icon: Cog,
        title: 'One capable team',
        description:
            'Maintenance, fabrication, electrical, marine servicing and spare-parts supply — all under one roof.',
    },
    {
        icon: Clock,
        title: 'On-site & on-time',
        description:
            'We come to your plant or berth and keep your operation running with minimal downtime.',
    },
];

const DEFAULT_STATS: Stat[] = [
    { value: '25+', label: 'Years of expertise' },
    { value: '900+', label: 'Projects delivered' },
    { value: '2', label: 'Core divisions' },
    { value: '24/7', label: 'Emergency support' },
];

type Props = {
    projects: Project[];
    testimonials: Testimonial[];
};

export default function Welcome({ projects, testimonials }: Props) {
    const { siteSettings } = usePage().props;

    const stats = siteSettings?.stats?.length
        ? siteSettings.stats
        : DEFAULT_STATS;
    const heroHeading =
        siteSettings?.hero_heading ??
        'Precision industrial & marine services you can trust';
    const heroSubtext =
        siteSettings?.hero_subtext ??
        'From plant maintenance and fabrication to marine servicing and spare-parts supply — one experienced team, on-site and on-time.';
    const testimonial = testimonials[0];

    return (
        <PublicLayout>
            <Head title="Industrial & Marine Services">
                <meta
                    name="description"
                    content={
                        siteSettings?.tagline ??
                        'Veritas Industrial Services — industrial and marine services, and genuine spare parts.'
                    }
                    head-key="desc"
                />
            </Head>

            {/* Hero (static) */}
            <section className="relative overflow-hidden bg-navy text-paper dark:bg-navy-deep">
                <div className="paper-grain pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-soft-light" />
                <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-brass/15 blur-3xl" />
                <CompassRose className="pointer-events-none absolute -bottom-24 -left-20 h-96 w-96 text-brass-bright/[0.07]" />

                <div className="relative mx-auto w-full max-w-4xl px-4 pt-28 pb-28 text-center sm:px-6 lg:px-8 lg:pt-36">
                    <Eyebrow light center>
                        Industrial · Marine · Spare Parts
                    </Eyebrow>
                    <h1 className="mt-6 font-serif text-4xl leading-[1.1] font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                        {heroHeading}
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-paper/75">
                        {heroSubtext}
                    </p>
                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 rounded-md bg-brass-bright px-6 py-3 text-base font-semibold text-navy-deep shadow-lg shadow-black/20 transition-colors hover:bg-rope"
                        >
                            View our work
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 rounded-md border border-paper/25 px-6 py-3 text-base font-semibold text-paper transition-colors hover:bg-paper/10"
                        >
                            Contact us
                        </Link>
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

            {/* Pillars */}
            <section className="border-y border-seafog bg-paper-deep/50 py-20 dark:border-navy dark:bg-navy">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <SectionHeading
                        center
                        eyebrow="What we do"
                        title="Three divisions, one standard"
                    >
                        Whatever the job, you get the same precision and care —
                        across industry, on the water, and in the parts store.
                    </SectionHeading>

                    <div className="mt-14 grid gap-7 md:grid-cols-3">
                        {PILLARS.map((pillar) => {
                            const Icon = pillar.icon;

                            return (
                                <Link
                                    key={pillar.key}
                                    href={pillar.href}
                                    className="group relative overflow-hidden rounded-xl border border-seafog bg-surface p-7 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/5 dark:border-navy dark:bg-navy-deep"
                                >
                                    <span className="absolute inset-x-0 top-0 h-0.5 bg-brass opacity-0 transition-opacity group-hover:opacity-100" />
                                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-brass-bright ring-1 ring-brass/30 transition-colors group-hover:bg-brass group-hover:text-paper dark:bg-navy">
                                        <Icon className="h-6 w-6" />
                                    </span>
                                    <h3 className="mt-5 font-serif text-xl font-semibold text-ink dark:text-paper">
                                        {pillar.label}
                                    </h3>
                                    <p className="mt-3 leading-relaxed text-ink-soft dark:text-paper/65">
                                        {pillar.blurb}
                                    </p>
                                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brass dark:text-brass-bright">
                                        Explore
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Featured projects */}
            {projects.length > 0 && (
                <section className="bg-paper py-20 dark:bg-navy-deep">
                    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                        <SectionHeading
                            center
                            eyebrow="Recent work"
                            title="Projects we're proud of"
                        >
                            A snapshot of jobs we've delivered — tap any card
                            for photos, video and the story.
                        </SectionHeading>
                        <div className="mt-14">
                            <ProjectsGrid projects={projects} />
                        </div>
                        <div className="mt-12 text-center">
                            <Link
                                href="/projects"
                                className="inline-flex items-center gap-2 text-base font-semibold text-brass hover:text-timber dark:text-brass-bright dark:hover:text-rope"
                            >
                                View all projects
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
                                eyebrow="Why Veritas"
                                title="Precise work, honestly done"
                            >
                                Decades of hands-on experience, a fully equipped
                                workshop, and a team that treats your equipment
                                and vessels like their own.
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
                        Let's talk about your next job
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-lg text-paper/70">
                        Reach out and our team will be glad to help — whatever
                        the scope.
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
