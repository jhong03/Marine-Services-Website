import { Head, usePage } from '@inertiajs/react';
import { ArrowRight, Compass, Heart, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {
    CompassRose,
    PageBanner,
    RopeDivider,
    SectionHeading,
} from '@/components/marine';
import PublicLayout from '@/layouts/public-layout';
import type { CoreValue, TeamMember } from '@/types';

const VALUE_ICONS: LucideIcon[] = [Compass, Heart, Users];

const DEFAULT_VALUES: CoreValue[] = [
    {
        title: 'Craftsmanship',
        description:
            'We do the job properly the first time, with care taken over every detail — the way it ought to be done.',
    },
    {
        title: 'Integrity',
        description:
            'Straight advice, clear pricing and work you can stand behind — the very meaning of Veritas.',
    },
    {
        title: 'Reliability',
        description:
            'On-site and on-time, keeping your operation running with minimal downtime.',
    },
];

function initials(name: string): string {
    return name
        .replace(/[[\]]/g, '')
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? '')
        .join('');
}

type Props = {
    team: TeamMember[];
};

export default function About({ team }: Props) {
    const { siteSettings } = usePage().props;

    const values = siteSettings?.core_values?.length
        ? siteSettings.core_values
        : DEFAULT_VALUES;
    const storyParagraphs = (
        siteSettings?.about_story ??
        "Veritas Industrial Services was built on a simple promise: dependable, honest work our clients can trust — across industry and on the water.\n\nShare your real history and we'll bring it to life right here."
    )
        .split('\n\n')
        .map((p) => p.trim())
        .filter(Boolean);

    return (
        <PublicLayout>
            <Head title="About Us" />

            <PageBanner eyebrow="Our story" title="About Us">
                A team of dedicated industrial and marine professionals who take
                pride in precise, dependable work — and in getting your
                operation back up and running.
            </PageBanner>

            {/* Story */}
            <section className="bg-paper py-20 dark:bg-navy-deep">
                <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
                    <SectionHeading
                        eyebrow="How we started"
                        title="Built on precision, trusted for results"
                    />
                    <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-soft dark:text-paper/70">
                        {storyParagraphs.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            {team.length > 0 && (
                <section className="border-t border-seafog bg-paper-deep/40 py-20 dark:border-navy dark:bg-navy">
                    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                        <SectionHeading
                            center
                            eyebrow="Our people"
                            title="Meet the team"
                        />
                        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {team.map((member) => (
                                <div
                                    key={member.id}
                                    className="rounded-2xl border border-seafog bg-surface p-8 text-center shadow-sm dark:border-navy dark:bg-navy-deep"
                                >
                                    <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-navy font-serif text-lg font-semibold text-brass-bright ring-1 ring-brass/40">
                                        {initials(member.name) || '—'}
                                    </span>
                                    <h3 className="mt-5 font-serif text-lg font-semibold text-ink dark:text-paper">
                                        {member.name}
                                    </h3>
                                    {member.role && (
                                        <div className="mt-0.5 text-xs font-semibold tracking-[0.15em] text-brass uppercase dark:text-brass-bright">
                                            {member.role}
                                        </div>
                                    )}
                                    {member.bio && (
                                        <p className="mt-3 text-sm leading-relaxed text-ink-soft dark:text-paper/65">
                                            {member.bio}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Values */}
            <section className="bg-paper py-20 dark:bg-navy-deep">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <SectionHeading
                        center
                        eyebrow="Our values"
                        title="What we stand for"
                    />
                    <div className="mt-14 grid gap-8 md:grid-cols-3">
                        {values.map((value, index) => {
                            const Icon =
                                VALUE_ICONS[index % VALUE_ICONS.length];

                            return (
                                <div
                                    key={value.title}
                                    className="rounded-2xl border border-seafog bg-surface p-8 text-center shadow-sm dark:border-navy dark:bg-navy"
                                >
                                    <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-brass-bright ring-1 ring-brass/30 dark:bg-navy-deep">
                                        <Icon className="h-6 w-6" />
                                    </span>
                                    <h3 className="mt-6 font-serif text-xl font-semibold text-ink dark:text-paper">
                                        {value.title}
                                    </h3>
                                    <p className="mt-3 leading-relaxed text-ink-soft dark:text-paper/65">
                                        {value.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative overflow-hidden bg-navy dark:bg-navy-deep">
                <div className="paper-grain pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-soft-light" />
                <CompassRose className="pointer-events-none absolute -bottom-20 -left-16 h-80 w-80 text-brass-bright/[0.07]" />
                <div className="relative mx-auto w-full max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
                    <RopeDivider className="mb-8 text-brass-bright/60" />
                    <h2 className="font-serif text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
                        Let's talk about your next job
                    </h2>
                    <a
                        href="/contact"
                        className="mt-9 inline-flex items-center gap-2 rounded-md bg-brass-bright px-6 py-3 text-base font-semibold text-navy-deep shadow-lg shadow-black/20 transition-colors hover:bg-rope"
                    >
                        Contact us
                        <ArrowRight className="h-4 w-4" />
                    </a>
                </div>
            </section>
        </PublicLayout>
    );
}
