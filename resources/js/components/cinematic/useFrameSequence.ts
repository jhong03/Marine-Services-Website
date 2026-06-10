import { useCallback, useRef } from 'react';
import type { RefObject } from 'react';
import { FRAME_COUNT, PRELOAD_COUNT, framePath } from './config';

export type FrameSequence = {
    canvasRef: RefObject<HTMLCanvasElement | null>;
    /** Draw a frame by index (clamped, rounded). Skips redundant redraws. */
    drawFrame: (index: number, force?: boolean) => void;
    /** Load the first PRELOAD_COUNT frames; resolves when they're ready. */
    preloadInitial: () => Promise<void>;
    /** Kick off loading the remaining frames in the background. */
    loadRemaining: () => void;
    /** Recompute the canvas backing store (DPR-aware) and repaint. */
    resize: () => void;
};

/**
 * Imperative canvas frame-sequence driver. All hot-path state lives in refs so
 * scrolling never triggers React re-renders — GSAP calls drawFrame() directly.
 */
export function useFrameSequence(sm: boolean): FrameSequence {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const imagesRef = useRef<(HTMLImageElement | null)[]>(
        Array(FRAME_COUNT).fill(null),
    );
    const loadedRef = useRef<boolean[]>(Array(FRAME_COUNT).fill(false));
    const lastDrawnRef = useRef<number>(-1);
    const currentRef = useRef<number>(0);
    const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });

    const nearestLoaded = (index: number): HTMLImageElement | null => {
        if (loadedRef.current[index]) {
            return imagesRef.current[index];
        }

        for (let d = 1; d < FRAME_COUNT; d++) {
            const lo = index - d;
            const hi = index + d;

            if (lo >= 0 && loadedRef.current[lo]) {
                return imagesRef.current[lo];
            }

            if (hi < FRAME_COUNT && loadedRef.current[hi]) {
                return imagesRef.current[hi];
            }
        }

        return null;
    };

    const paint = useCallback(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        const ctx = canvas.getContext('2d');

        if (!ctx) {
            return;
        }

        const img = nearestLoaded(currentRef.current);

        if (!img || !img.width) {
            return;
        }

        const { w, h, dpr } = sizeRef.current;
        const cw = Math.max(1, Math.floor(w * dpr));
        const ch = Math.max(1, Math.floor(h * dpr));
        const ir = img.width / img.height;
        const cr = cw / ch;
        let dw: number;
        let dh: number;
        let dx: number;
        let dy: number;

        if (ir > cr) {
            dh = ch;
            dw = ch * ir;
            dx = (cw - dw) / 2;
            dy = 0;
        } else {
            dw = cw;
            dh = cw / ir;
            dx = 0;
            dy = (ch - dh) / 2;
        }

        ctx.drawImage(img, dx, dy, dw, dh);
    }, []);

    const ensureFrame = useCallback(
        (i: number): Promise<void> =>
            new Promise<void>((resolve) => {
                if (loadedRef.current[i]) {
                    resolve();

                    return;
                }

                const existing = imagesRef.current[i];

                if (existing) {
                    existing.addEventListener('load', () => resolve(), {
                        once: true,
                    });
                    existing.addEventListener('error', () => resolve(), {
                        once: true,
                    });

                    return;
                }

                const img = new Image();
                img.decoding = 'async';
                imagesRef.current[i] = img;
                // Only mark a frame drawable once it's fully DECODED. Drawing a
                // merely-loaded image forces a synchronous decode at paint time,
                // which is what makes fast scrolls flash/tear.
                const markReady = () => {
                    loadedRef.current[i] = true;

                    // Paint immediately if this is the frame we're waiting on.
                    if (
                        currentRef.current === i ||
                        lastDrawnRef.current === -1
                    ) {
                        lastDrawnRef.current = i;
                        paint();
                    }

                    resolve();
                };
                img.onload = () => {
                    if (typeof img.decode === 'function') {
                        img.decode().then(markReady, markReady);
                    } else {
                        markReady();
                    }
                };
                img.onerror = () => resolve();
                img.src = framePath(i, sm);
            }),
        [paint, sm],
    );

    const drawFrame = useCallback(
        (index: number, force = false) => {
            const i = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(index)));
            currentRef.current = i;

            if (!force && i === lastDrawnRef.current && loadedRef.current[i]) {
                return;
            }

            lastDrawnRef.current = i;
            paint();
        },
        [paint],
    );

    const preloadInitial = useCallback(() => {
        const target = Math.min(PRELOAD_COUNT, FRAME_COUNT);
        const jobs: Promise<void>[] = [];

        for (let i = 0; i < target; i++) {
            jobs.push(ensureFrame(i));
        }

        return Promise.all(jobs).then(() => undefined);
    }, [ensureFrame]);

    const loadRemaining = useCallback(() => {
        for (let i = PRELOAD_COUNT; i < FRAME_COUNT; i++) {
            void ensureFrame(i);
        }
    }, [ensureFrame]);

    const resize = useCallback(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        sizeRef.current = { w, h, dpr };
        canvas.width = Math.max(1, Math.floor(w * dpr));
        canvas.height = Math.max(1, Math.floor(h * dpr));
        // Backing-store resize clears the canvas — force a repaint.
        lastDrawnRef.current = -1;
        paint();
    }, [paint]);

    return {
        canvasRef,
        drawFrame,
        preloadInitial,
        loadRemaining,
        resize,
    };
}
