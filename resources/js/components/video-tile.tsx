import { Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

/**
 * Only `php artisan serve` (local dev) can't answer HTTP Range requests, so a
 * self-hosted /media clip won't seek there. Route those through the Range-capable
 * /stream Laravel route ONLY on localhost; every real host (Cloudflare Pages,
 * Caddy, …) serves /media statically with Range support. Decided by hostname at
 * runtime so it's correct no matter where/how the build was generated.
 */
function resolveClipUrl(src: string): string {
    if (!src.startsWith('/media/') || typeof window === 'undefined') {
        return src;
    }

    const isLocal = /^(localhost|127\.0\.0\.1|\[::1\])$/i.test(
        window.location.hostname,
    );

    return isLocal ? `/stream${src}` : src;
}

/** iOS Safari exposes fullscreen on the video element itself. */
type FullscreenableVideo = HTMLVideoElement & {
    webkitEnterFullscreen?: () => void;
};

/**
 * Minimal, chrome-free video tile for the showcase strips: single click to
 * play/pause, double click for fullscreen, no native control bar and no hover
 * UI. A soft play glyph shows only while paused so visitors can tell it's a
 * clip. Native controls are enabled only while fullscreen.
 */
export default function VideoTile({
    src,
    className,
}: {
    src: string;
    className?: string;
}) {
    const ref = useRef<HTMLVideoElement>(null);
    const clickTimer = useRef<number | null>(null);
    const [playing, setPlaying] = useState(false);

    const url = resolveClipUrl(src);

    // Show the native control bar only while fullscreen; bare tile otherwise.
    useEffect(() => {
        const onFullscreenChange = () => {
            const video = ref.current;

            if (video) {
                video.controls = document.fullscreenElement === video;
            }
        };

        document.addEventListener('fullscreenchange', onFullscreenChange);

        return () =>
            document.removeEventListener(
                'fullscreenchange',
                onFullscreenChange,
            );
    }, []);

    const togglePlay = () => {
        const video = ref.current;

        if (!video) {
            return;
        }

        if (video.paused) {
            void video.play().catch(() => {});
        } else {
            video.pause();
        }
    };

    const goFullscreen = () => {
        const video = ref.current as FullscreenableVideo | null;

        if (!video) {
            return;
        }

        if (video.requestFullscreen) {
            void video.requestFullscreen().catch(() => {});
        } else if (video.webkitEnterFullscreen) {
            video.webkitEnterFullscreen();
        }
    };

    // Distinguish single (play/pause) from double (fullscreen) clicks.
    const handleClick = () => {
        if (clickTimer.current !== null) {
            return;
        }

        clickTimer.current = window.setTimeout(() => {
            clickTimer.current = null;
            togglePlay();
        }, 220);
    };

    const handleDoubleClick = () => {
        if (clickTimer.current !== null) {
            clearTimeout(clickTimer.current);
            clickTimer.current = null;
        }

        goFullscreen();
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            aria-label={playing ? 'Pause clip' : 'Play clip'}
            title="Click to play · double-click for fullscreen"
            className={`relative overflow-hidden ${className ?? ''}`}
        >
            <video
                ref={ref}
                src={url}
                playsInline
                preload="metadata"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onEnded={() => setPlaying(false)}
                className="h-full w-full object-contain"
            />
            {!playing && (
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <Play
                        className="h-12 w-12 text-paper/85 drop-shadow-lg"
                        fill="currentColor"
                    />
                </span>
            )}
        </button>
    );
}
