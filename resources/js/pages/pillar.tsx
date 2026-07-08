import { Head } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import {
    CompassRose,
    PageBanner,
    RopeDivider,
    SectionHeading,
} from '@/components/marine';
import ProjectsGrid from '@/components/projects-grid';
import VideoTile from '@/components/video-tile';
import PublicLayout from '@/layouts/public-layout';
import { serviceIcon } from '@/lib/icons';
import { pillarByKey } from '@/lib/projects';
import type { Project, Service } from '@/types';

type Props = {
    category: string;
    services: Service[];
    projects: Project[];
};

export default function Pillar({ category, services, projects }: Props) {
    const pillar = pillarByKey(category);
    const label = pillar?.label ?? 'Our Services';
    const videos = projects
        .flatMap((project) => project.videos ?? [])
        .filter(Boolean);

    return (
        <PublicLayout>
            <Head title={label} />

            <PageBanner eyebrow="What we do" title={label}>
                {pillar?.blurb}
            </PageBanner>

            {/* Capabilities */}
            <section className="bg-paper py-20 dark:bg-navy-deep">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <SectionHeading
                        center
                        eyebrow="Capabilities"
                        title="What we deliver"
                    />

                    {services.length > 0 ? (
                        <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                            {services.map((service) => {
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
                    ) : (
                        <p className="mt-10 text-center text-ink-soft dark:text-paper/60">
                            Details coming soon.
                        </p>
                    )}
                </div>
            </section>

            {/* Work in action — self-hosted clips from this pillar's jobs */}
            {videos.length > 0 && (
                <section className="border-t border-seafog bg-paper py-20 dark:border-navy dark:bg-navy-deep">
                    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                        <SectionHeading
                            center
                            eyebrow="Work in action"
                            title="On board with our crew"
                        >
                            Short, unedited clips from recent jobs — real work
                            as it happened on the vessel.
                        </SectionHeading>
                        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {videos.map((src, i) => (
                                <VideoTile
                                    key={i}
                                    src={src}
                                    className="aspect-video w-full rounded-xl border border-seafog bg-navy-deep dark:border-navy"
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Recent work in this pillar */}
            <section className="border-t border-seafog bg-paper-deep/40 py-20 dark:border-navy dark:bg-navy">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <SectionHeading
                        center
                        eyebrow="Recent work"
                        title="Projects & case studies"
                    >
                        A selection of jobs we've delivered — tap any card for
                        photos and the full story.
                    </SectionHeading>
                    <div className="mt-14">
                        <ProjectsGrid projects={projects} />
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
                        Have a job in mind?
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-lg text-paper/70">
                        Get in touch and our team will talk you through how we
                        can help.
                    </p>
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
