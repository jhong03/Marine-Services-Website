import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { PageBanner } from '@/components/marine';
import ProjectsGrid from '@/components/projects-grid';
import PublicLayout from '@/layouts/public-layout';
import { PILLARS } from '@/lib/projects';
import { cn } from '@/lib/utils';
import type { Project } from '@/types';

type Props = {
    projects: Project[];
};

export default function Projects({ projects }: Props) {
    const [filter, setFilter] = useState<string>('all');

    const tabs = [
        { key: 'all', label: 'All' },
        ...PILLARS.map((p) => ({ key: p.key, label: p.short })),
    ];
    const filtered =
        filter === 'all'
            ? projects
            : projects.filter((p) => p.category === filter);

    return (
        <PublicLayout>
            <Head title="Projects" />

            <PageBanner eyebrow="Our work" title="Projects & Experience">
                A showcase of past jobs across industrial, marine and
                spare-parts work — photos, recordings and the stories behind
                them.
            </PageBanner>

            <section className="bg-paper py-16 dark:bg-navy-deep">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Filter tabs */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                type="button"
                                onClick={() => setFilter(tab.key)}
                                className={cn(
                                    'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                                    filter === tab.key
                                        ? 'bg-brass text-paper dark:bg-brass-bright dark:text-navy-deep'
                                        : 'border border-seafog text-ink-soft hover:bg-paper-deep dark:border-navy dark:text-paper/70 dark:hover:bg-navy',
                                )}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="mt-12">
                        <ProjectsGrid projects={filtered} />
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
