import { Anchor } from 'lucide-react';
import type { ReactNode, SVGProps } from 'react';
import { cn } from '@/lib/utils';

/**
 * Shared "weathered heritage" design pieces — brass eyebrows, a navy page
 * banner with a hand-drawn wave edge, rope dividers and section headings.
 * Keeping them here means every page speaks the same visual language.
 */

/** Small-caps brass label with a hairline rule, sat above a heading. */
export function Eyebrow({
    children,
    center = false,
    light = false,
    className,
}: {
    children: ReactNode;
    center?: boolean;
    light?: boolean;
    className?: string;
}) {
    const rule = (
        <span className="h-px w-8 bg-current opacity-50" aria-hidden />
    );

    return (
        <span
            className={cn(
                'inline-flex items-center gap-3 text-[0.7rem] font-semibold tracking-[0.28em] uppercase',
                light ? 'text-brass-bright' : 'text-brass',
                className,
            )}
        >
            {rule}
            {children}
            {center && rule}
        </span>
    );
}

/** Compass-rose watermark used behind dark banners. */
export function CompassRose({ className, ...props }: SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 100 100"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.25}
            aria-hidden
            {...props}
        >
            <circle cx="50" cy="50" r="47" />
            <circle cx="50" cy="50" r="35" />
            <path
                fill="currentColor"
                stroke="none"
                d="M50 4 L57 50 L50 96 L43 50 Z"
                opacity={0.55}
            />
            <path
                fill="currentColor"
                stroke="none"
                d="M4 50 L50 43 L96 50 L50 57 Z"
                opacity={0.3}
            />
        </svg>
    );
}

/** Hand-drawn wave that transitions a dark section into the paper body. */
export function WaveEdge({ className }: { className?: string }) {
    return (
        <svg
            className={cn(
                'block w-full text-paper dark:text-navy-deep',
                className,
            )}
            viewBox="0 0 1440 64"
            preserveAspectRatio="none"
            aria-hidden
        >
            <path
                fill="currentColor"
                d="M0,40 C240,8 480,8 720,28 C960,48 1200,56 1440,28 L1440,64 L0,64 Z"
            />
        </svg>
    );
}

/** Navy hero banner for the secondary pages (Services, Fleet, About, Contact). */
export function PageBanner({
    eyebrow,
    title,
    children,
}: {
    eyebrow?: string;
    title: string;
    children?: ReactNode;
}) {
    return (
        <section className="relative overflow-hidden bg-navy text-paper dark:bg-navy-deep">
            <CompassRose className="pointer-events-none absolute -top-12 -right-16 h-80 w-80 text-brass-bright/10" />
            <div className="paper-grain pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-soft-light" />
            <div className="relative mx-auto w-full max-w-7xl px-4 pt-20 pb-24 sm:px-6 lg:px-8 lg:pt-24">
                {eyebrow && <Eyebrow light>{eyebrow}</Eyebrow>}
                <h1 className="mt-5 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                    {title}
                </h1>
                {children && (
                    <p className="mt-5 max-w-2xl text-lg leading-relaxed text-paper/70">
                        {children}
                    </p>
                )}
            </div>
            <WaveEdge />
        </section>
    );
}

/** Rope-and-anchor divider for breaking up paper sections. */
export function RopeDivider({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                'flex items-center justify-center gap-4 text-rope',
                className,
            )}
            aria-hidden
        >
            <span className="h-px w-16 bg-current opacity-60 sm:w-28" />
            <Anchor className="h-4 w-4" />
            <span className="h-px w-16 bg-current opacity-60 sm:w-28" />
        </div>
    );
}

/** Eyebrow + serif heading + optional lead, centred or left-aligned. */
export function SectionHeading({
    eyebrow,
    title,
    children,
    center = false,
    className,
}: {
    eyebrow?: string;
    title: string;
    children?: ReactNode;
    center?: boolean;
    className?: string;
}) {
    return (
        <div
            className={cn(center && 'mx-auto max-w-2xl text-center', className)}
        >
            {eyebrow && <Eyebrow center={center}>{eyebrow}</Eyebrow>}
            <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl dark:text-paper">
                {title}
            </h2>
            {children && (
                <p className="mt-4 text-lg leading-relaxed text-ink-soft dark:text-paper/70">
                    {children}
                </p>
            )}
        </div>
    );
}
