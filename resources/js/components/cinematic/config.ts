/**
 * Cinematic frame-sequence configuration.
 *
 * FRAME_COUNT is the single source of truth for how many frames the runtime
 * expects. If you regenerate the sequence with a different count (see
 * scripts/extract-frames.md), update this number — nothing else hardcodes it.
 */
export const FRAME_COUNT = 160;
export const FRAME_EXT = 'webp';

/** Bump when you re-extract frames (same filenames) so browsers/CDN don't serve
 *  stale cached frames. Appended as a `?v=` query to every frame URL. */
export const FRAMES_VERSION = 2;

/** Scroll distance the cinematic section is pinned for (in vh). Larger = the
 *  footage plays back more slowly per unit of scroll (more cinematic). */
export const PIN_VH_DESKTOP = 520;
export const PIN_VH_MOBILE = 340;

/** How many frames to preload (and decode) before the experience is enabled. */
export const PRELOAD_COUNT = 30;

/** Below this viewport width we use the small frame set + a shorter pin. */
export const MOBILE_MAX_WIDTH = 767;

/** Path to a frame (0-indexed). `sm` selects the mobile-resolution set. */
export function framePath(index: number, sm = false): string {
    const n = String(index + 1).padStart(4, '0');

    return `/cinematic/${sm ? 'frames-sm' : 'frames'}/frame-${n}.${FRAME_EXT}?v=${FRAMES_VERSION}`;
}
