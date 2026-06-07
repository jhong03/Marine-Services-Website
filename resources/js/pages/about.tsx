import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, Compass, Heart, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import PublicLayout from '@/layouts/public-layout';
import type { CoreValue, Stat, TeamMember } from '@/types';

const VALUE_ICONS: LucideIcon[] = [Compass, Heart, Users];

const DEFAULT_VALUES: CoreValue[] = [
    {
        title: 'Craftsmanship',
        description:
            'We do the job properly the first time, with attention to every detail.',
    },
    {
        title: 'Honesty',
        description:
            'Clear quotes, straight advice, and no work done without your say-so.',
    },
    {
        title: 'Local & loyal',
        description:
            'A part of the boating community, looking after our customers for the long haul.',
    },
];

const DEFAULT_STATS: Stat[] = [
    { value: '20+', label: 'Years experience' },
    { value: '1,200+', label: 'Vessels serviced' },
    { value: '15', label: 'Team members' },
    { value: '24/7', label: 'Emergency support' },
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
    const stats = siteSettings?.stats?.length
        ? siteSettings.stats
        : DEFAULT_STATS;
    const storyParagraphs = (
        siteSettings?.about_story ??
        "Marine Services was founded with a simple goal: deliver dependable, honest marine servicing the local boating community can trust.\n\nShare your real history and we'll bring it to life."
    )
        .split('\n\n')
        .map((p) => p.trim())
        .filter(Boolean);

    return (
        <PublicLayout>
            <Head title="About Us" />

            <section className="bg-gradient-to-br from-slate-900 to-sky-900 text-white dark:from-black dark:to-sky-950">
                <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                        About Us
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg text-slate-300">
                        A team of dedicated marine professionals committed to
                        keeping your vessel in top condition.
                    </p>
                </div>
            </section>

            {/* Story + stats */}
            <section className="bg-white py-20 dark:bg-slate-950">
                <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Our story
                        </h2>
                        <div className="mt-4 space-y-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                            {storyParagraphs.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                    <div className="rounded-3xl bg-gradient-to-br from-sky-600 to-cyan-500 p-10 text-white shadow-xl">
                        <div className="grid grid-cols-2 gap-8">
                            {stats.map((stat) => (
                                <div key={stat.label}>
                                    <div className="text-4xl font-bold">
                                        {stat.value}
                                    </div>
                                    <div className="mt-1 text-sm text-sky-100">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Team */}
            {team.length > 0 && (
                <section className="bg-white py-4 pb-20 dark:bg-slate-950">
                    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                                Meet the team
                            </h2>
                        </div>
                        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {team.map((member) => (
                                <div
                                    key={member.id}
                                    className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800"
                                >
                                    <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-sky-600 to-cyan-500 text-lg font-semibold text-white">
                                        {initials(member.name) || '—'}
                                    </span>
                                    <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">
                                        {member.name}
                                    </h3>
                                    {member.role && (
                                        <div className="text-sm font-medium text-sky-600 dark:text-sky-400">
                                            {member.role}
                                        </div>
                                    )}
                                    {member.bio && (
                                        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
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
            <section className="bg-slate-50 py-20 dark:bg-slate-900">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                            What we stand for
                        </h2>
                    </div>
                    <div className="mt-12 grid gap-8 md:grid-cols-3">
                        {values.map((value, index) => {
                            const Icon =
                                VALUE_ICONS[index % VALUE_ICONS.length];

                            return (
                                <div
                                    key={value.title}
                                    className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800"
                                >
                                    <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-950 dark:text-sky-400">
                                        <Icon className="h-6 w-6" />
                                    </span>
                                    <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                                        {value.title}
                                    </h3>
                                    <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-400">
                                        {value.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="bg-slate-900 dark:bg-slate-900">
                <div className="mx-auto w-full max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold tracking-tight text-white">
                        Let's look after your vessel
                    </h2>
                    <Link
                        href="/contact"
                        className="mt-8 inline-flex items-center gap-2 rounded-md bg-sky-500 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-sky-400"
                    >
                        Contact us
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </section>
        </PublicLayout>
    );
}
