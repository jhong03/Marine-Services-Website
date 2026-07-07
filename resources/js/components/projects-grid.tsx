import { Building2, Calendar, MapPin, PlayCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { pillarByKey, pillarLabel, videoEmbedUrl } from '@/lib/projects';
import type { Project } from '@/types';

function CategoryIcon({ category }: { category: string }) {
    const Icon = pillarByKey(category)?.icon;

    return Icon ? <Icon className="h-10 w-10 text-brass-bright/70" /> : null;
}

/** Branded fallback shown when a project has no cover image yet. */
function CoverFallback({ category }: { category: string }) {
    return (
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-navy dark:bg-navy-deep">
            <div className="paper-grain pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-soft-light" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-navy via-navy to-timber/40" />
            <CategoryIcon category={category} />
        </div>
    );
}

function ProjectCard({
    project,
    onOpen,
}: {
    project: Project;
    onOpen: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onOpen}
            className="group overflow-hidden rounded-xl border border-seafog bg-surface text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/5 dark:border-navy dark:bg-navy"
        >
            <div className="relative aspect-[4/3] overflow-hidden">
                {project.cover_image ? (
                    <img
                        src={project.cover_image}
                        alt={project.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <CoverFallback category={project.category} />
                )}
                <span className="absolute top-3 left-3 rounded-full border border-brass/30 bg-navy-deep/80 px-3 py-1 text-xs font-semibold tracking-wide text-brass-bright backdrop-blur">
                    {pillarLabel(project.category)}
                </span>
                {project.video_url && (
                    <span className="absolute right-3 bottom-3 inline-flex items-center gap-1 rounded-full bg-navy-deep/80 px-2.5 py-1 text-xs font-medium text-paper backdrop-blur">
                        <PlayCircle className="h-4 w-4" /> Video
                    </span>
                )}
            </div>
            <div className="p-5">
                <h3 className="font-serif text-lg font-semibold text-ink dark:text-paper">
                    {project.title}
                </h3>
                {project.summary && (
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft dark:text-paper/65">
                        {project.summary}
                    </p>
                )}
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-soft/80 dark:text-paper/50">
                    {project.client && (
                        <span className="inline-flex items-center gap-1">
                            <Building2 className="h-3.5 w-3.5" />
                            {project.client}
                        </span>
                    )}
                    {project.year && (
                        <span className="inline-flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {project.year}
                        </span>
                    )}
                </div>
            </div>
        </button>
    );
}

function ProjectModal({
    project,
    onClose,
}: {
    project: Project;
    onClose: () => void;
}) {
    const embed = videoEmbedUrl(project.video_url);
    const gallery = [project.cover_image, ...(project.images ?? [])].filter(
        (src): src is string => Boolean(src),
    );

    return (
        <div
            className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-navy-deep/80 p-4 backdrop-blur-sm sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            onClick={onClose}
        >
            <div
                className="relative my-8 w-full max-w-3xl overflow-hidden rounded-2xl border border-seafog bg-surface shadow-2xl dark:border-navy dark:bg-navy"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute top-4 right-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-navy-deep/70 text-paper backdrop-blur transition-colors hover:bg-navy-deep"
                >
                    <X className="h-5 w-5" />
                </button>

                {embed ? (
                    <div className="aspect-video w-full bg-navy-deep">
                        <iframe
                            src={embed}
                            title={project.title}
                            className="h-full w-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                ) : gallery[0] ? (
                    <img
                        src={gallery[0]}
                        alt={project.title}
                        className="max-h-[55vh] w-full object-cover"
                    />
                ) : (
                    <div className="aspect-video w-full">
                        <CoverFallback category={project.category} />
                    </div>
                )}

                <div className="p-6 sm:p-8">
                    <span className="text-xs font-semibold tracking-[0.18em] text-brass uppercase dark:text-brass-bright">
                        {pillarLabel(project.category)}
                    </span>
                    <h2 className="mt-2 font-serif text-2xl font-semibold text-ink sm:text-3xl dark:text-paper">
                        {project.title}
                    </h2>

                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-soft dark:text-paper/60">
                        {project.client && (
                            <span className="inline-flex items-center gap-1.5">
                                <Building2 className="h-4 w-4" />
                                {project.client}
                            </span>
                        )}
                        {project.location && (
                            <span className="inline-flex items-center gap-1.5">
                                <MapPin className="h-4 w-4" />
                                {project.location}
                            </span>
                        )}
                        {project.year && (
                            <span className="inline-flex items-center gap-1.5">
                                <Calendar className="h-4 w-4" />
                                {project.year}
                            </span>
                        )}
                    </div>

                    {project.body && (
                        <div className="mt-5 space-y-4 leading-relaxed text-ink-soft dark:text-paper/70">
                            {project.body
                                .split('\n\n')
                                .map((p) => p.trim())
                                .filter(Boolean)
                                .map((para, i) => (
                                    <p key={i}>{para}</p>
                                ))}
                        </div>
                    )}

                    {/* Extra photos (when there's also a video, or more than one image) */}
                    {(embed ? gallery : gallery.slice(1)).length > 0 && (
                        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                            {(embed ? gallery : gallery.slice(1)).map(
                                (src, i) => (
                                    <img
                                        key={i}
                                        src={src}
                                        alt={`${project.title} ${i + 1}`}
                                        loading="lazy"
                                        className="aspect-square w-full rounded-lg object-cover"
                                    />
                                ),
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
    const [active, setActive] = useState<Project | null>(null);

    useEffect(() => {
        if (!active) {
return;
}

        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
setActive(null);
}
        };
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [active]);

    if (projects.length === 0) {
        return (
            <p className="rounded-xl border border-dashed border-seafog bg-surface p-10 text-center text-ink-soft dark:border-navy dark:bg-navy dark:text-paper/60">
                Projects will appear here soon.
            </p>
        );
    }

    return (
        <>
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        onOpen={() => setActive(project)}
                    />
                ))}
            </div>
            {active && (
                <ProjectModal
                    project={active}
                    onClose={() => setActive(null)}
                />
            )}
        </>
    );
}
