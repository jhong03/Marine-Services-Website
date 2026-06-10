import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import {
    FRAME_COUNT,
    MOBILE_MAX_WIDTH,
    PIN_VH_DESKTOP,
    PIN_VH_MOBILE,
} from './config';
import { useFrameSequence } from './useFrameSequence';

gsap.registerPlugin(ScrollTrigger);

export type CinematicMoment = {
    id: string;
    /** Progress (0–1) at which this moment starts fading in. */
    start: number;
    /** Progress (0–1) at which it has finished fading out. */
    end: number;
    content: ReactNode;
};

type Props = {
    moments: CinematicMoment[];
    /** Fires (at most a couple of times) as the hero enters/leaves view, so the
     *  page can swap the overlaid nav between transparent and solid. */
    onHeroVisibilityChange?: (heroVisible: boolean) => void;
};

const FADE = 0.06; // fraction of progress each moment fades over

function matches(query: string): boolean {
    return typeof window !== 'undefined' && window.matchMedia(query).matches;
}

export default function CinematicScroll({
    moments,
    onHeroVisibilityChange,
}: Props) {
    // Resolved once on mount — client-rendered app, so window is available.
    const [sm] = useState(() => matches(`(max-width: ${MOBILE_MAX_WIDTH}px)`));
    const [reduced] = useState(() =>
        matches('(prefers-reduced-motion: reduce)'),
    );

    const { canvasRef, drawFrame, preloadInitial, loadRemaining, resize } =
        useFrameSequence(sm);
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const overlayRefs = useRef<Map<string, HTMLDivElement>>(new Map());
    const hintRef = useRef<HTMLDivElement | null>(null);
    const endFadeRef = useRef<HTMLDivElement | null>(null);
    const heroVisibleRef = useRef(true);

    const setHeroVisible = (visible: boolean) => {
        if (visible !== heroVisibleRef.current) {
            heroVisibleRef.current = visible;
            onHeroVisibilityChange?.(visible);
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        resize();
        const ro = new ResizeObserver(() => resize());
        ro.observe(canvas);

        const setMomentStyle = (p: number) => {
            for (const m of moments) {
                const el = overlayRefs.current.get(m.id);

                if (!el) {
                    continue;
                }

                let opacity = 0;
                let y = 24;

                if (p < m.start) {
                    opacity = 0;
                    y = 24;
                } else if (p > m.end) {
                    opacity = 0;
                    y = -24;
                } else {
                    const inT = Math.min(1, (p - m.start) / FADE);
                    const outT = Math.min(1, (m.end - p) / FADE);
                    opacity = Math.max(0, Math.min(inT, outT));
                    y = inT < outT ? 24 * (1 - inT) : -24 * (1 - outT);
                }

                el.style.opacity = String(opacity);
                el.style.transform = `translate3d(0, ${y}px, 0)`;
            }

            if (hintRef.current) {
                hintRef.current.style.opacity = String(
                    Math.max(0, 1 - p / 0.04),
                );
            }

            // End-fade: darken the bright final frames into the navy release
            // section (and lift legibility of the closing line).
            if (endFadeRef.current) {
                const e = Math.max(0, Math.min(1, (p - 0.82) / 0.18));
                endFadeRef.current.style.opacity = String(
                    e * e * (3 - 2 * e) * 0.92,
                );
            }
        };

        let lenis: Lenis | null = null;
        let st: ScrollTrigger | null = null;
        let tickerFn: ((time: number) => void) | null = null;
        let scrollHandler: (() => void) | null = null;
        let cancelled = false;

        const setupScroll = () => {
            const pinVh = sm ? PIN_VH_MOBILE : PIN_VH_DESKTOP;

            lenis = new Lenis();
            lenis.on('scroll', ScrollTrigger.update);
            tickerFn = (time: number) => lenis?.raf(time * 1000);
            gsap.ticker.add(tickerFn);
            gsap.ticker.lagSmoothing(0);

            st = ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top top',
                end: () => `+=${window.innerHeight * (pinVh / 100)}`,
                pin: true,
                pinSpacing: true,
                // Numeric scrub adds catch-up smoothing: fast flicks ease through
                // the frames over ~0.85s instead of hard-jumping (no chunkiness).
                scrub: 0.85,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    const p = self.progress;
                    drawFrame(p * (FRAME_COUNT - 1));
                    setMomentStyle(p);
                    setHeroVisible(p < 0.92);
                },
            });

            setMomentStyle(0);
            setHeroVisible(true);
        };

        const setupStatic = () => {
            // No pin/scrub: show the first moment over a static first frame.
            setMomentStyle(reduced ? 0.02 : 0);
            const firstMoment = moments[0];

            if (firstMoment) {
                const el = overlayRefs.current.get(firstMoment.id);

                if (el) {
                    el.style.opacity = '1';
                    el.style.transform = 'translate3d(0,0,0)';
                }
            }

            scrollHandler = () => {
                setHeroVisible(window.scrollY < window.innerHeight * 0.8);
            };
            window.addEventListener('scroll', scrollHandler, {
                passive: true,
            });
            scrollHandler();
        };

        preloadInitial().then(() => {
            if (cancelled) {
                return;
            }

            drawFrame(0, true);

            if (reduced) {
                setupStatic();
            } else {
                setupScroll();
            }

            loadRemaining();
            // Recalculate pin math once the first frames + layout settle.
            ScrollTrigger.refresh();
        });

        return () => {
            cancelled = true;
            ro.disconnect();

            if (scrollHandler) {
                window.removeEventListener('scroll', scrollHandler);
            }

            if (st) {
                st.kill();
            }

            if (tickerFn) {
                gsap.ticker.remove(tickerFn);
            }

            if (lenis) {
                lenis.destroy();
            }

            ScrollTrigger.refresh();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative h-screen w-full overflow-hidden bg-navy-deep"
            aria-label="Introduction"
        >
            <canvas
                ref={canvasRef}
                className="absolute inset-0 h-full w-full"
            />
            {/* Legibility scrim — theme-agnostic, sits over footage. */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-deep/40 via-transparent to-navy-deep/70" />

            {/* End-fade — ramps up over the last frames to hand off into navy. */}
            <div
                ref={endFadeRef}
                className="pointer-events-none absolute inset-0 bg-navy-deep opacity-0"
            />

            {/* Overlay "moments" — real DOM text (SEO + a11y). */}
            <div className="pointer-events-none absolute inset-0">
                {moments.map((m) => (
                    <div
                        key={m.id}
                        ref={(el) => {
                            if (el) {
                                overlayRefs.current.set(m.id, el);
                            } else {
                                overlayRefs.current.delete(m.id);
                            }
                        }}
                        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center opacity-0 will-change-[transform,opacity]"
                    >
                        {m.content}
                    </div>
                ))}
            </div>

            {/* Scroll cue */}
            <div
                ref={hintRef}
                className="pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-1 text-paper/70"
            >
                <span className="text-[0.65rem] font-semibold tracking-[0.3em] uppercase">
                    Scroll
                </span>
                <ChevronDown className="h-5 w-5 animate-bounce" />
            </div>
        </section>
    );
}
