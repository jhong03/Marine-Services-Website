<?php

/**
 * Generates placeholder "drone over open water" frames for the homepage
 * cinematic. Pure GD (bundled with PHP) → real .webp, no extra dependency.
 *
 * Usage:  php scripts/generate-placeholder-frames.php [frameCount]
 *
 * Writes:
 *   public/cinematic/frames/frame-0001.webp ...     (full res, 1600x900)
 *   public/cinematic/frames-sm/frame-0001.webp ...  (mobile,    800x450)
 *
 * Swap in REAL footage with the ffmpeg pipeline in scripts/extract-frames.md
 * (keep the same count + naming). The runtime frame count is the single source
 * of truth in resources/js/components/cinematic/config.ts (FRAME_COUNT) — keep
 * the count passed here in sync with it.
 */
$count = isset($argv[1]) ? max(2, (int) $argv[1]) : 150;
$root = dirname(__DIR__);

function lerp(float $a, float $b, float $t): float
{
    return $a + ($b - $a) * $t;
}

function clamp01(float $t): float
{
    return max(0.0, min(1.0, $t));
}

function smoothstep(float $e0, float $e1, float $x): float
{
    if ($e1 === $e0) {
        return $x < $e0 ? 0.0 : 1.0;
    }
    $t = clamp01(($x - $e0) / ($e1 - $e0));

    return $t * $t * (3 - 2 * $t);
}

function renderSet(string $dir, int $w, int $h, int $count, int $quality): void
{
    if (! is_dir($dir)) {
        mkdir($dir, 0775, true);
    }
    foreach (glob($dir.'/frame-*.webp') ?: [] as $old) {
        @unlink($old);
    }

    for ($f = 0; $f < $count; $f++) {
        $p = $count > 1 ? $f / ($count - 1) : 0.0;
        $im = imagecreatetruecolor($w, $h);
        imagealphablending($im, true);

        // Horizon climbs in from off-screen (top-down) and settles ~40% height.
        $hz = smoothstep(0.18, 0.72, $p);
        $horizonY = (int) round((-0.18 + $hz * 0.58) * $h);

        // Sky — dawn navy → brass glow at the horizon.
        $maxSky = max(0, min($h, $horizonY));
        for ($y = 0; $y < $maxSky; $y++) {
            $t = $maxSky > 0 ? $y / $maxSky : 0;
            $col = imagecolorallocate(
                $im,
                (int) lerp(14, 200, $t),
                (int) lerp(26, 150, $t),
                (int) lerp(40, 80, $t),
            );
            imagefilledrectangle($im, 0, $y, $w, $y, $col);
        }

        // Water — teal at the horizon → deep teal-navy up close.
        $wStart = max(0, $horizonY);
        for ($y = $wStart; $y < $h; $y++) {
            $t = $h > $wStart ? ($y - $wStart) / ($h - $wStart) : 0;
            $col = imagecolorallocate(
                $im,
                (int) lerp(33, 9, $t),
                (int) lerp(80, 28, $t),
                (int) lerp(92, 40, $t),
            );
            imagefilledrectangle($im, 0, $y, $w, $y, $col);
        }

        // Sun glint near the horizon.
        if ($horizonY > 0 && $horizonY < $h) {
            $glow = imagecolorallocatealpha($im, 240, 200, 130, 95);
            for ($i = 6; $i >= 1; $i--) {
                $rad = (int) ($w * 0.04 * $i);
                imagefilledellipse($im, (int) ($w * 0.62), $horizonY, $rad, (int) ($rad * 0.5), $glow);
            }
        }

        // Faint wave streaks, bunched toward the horizon for a sense of depth.
        $streak = imagecolorallocatealpha($im, 200, 220, 225, 112);
        $base = max($horizonY, 0);
        for ($i = 1; $i <= 14; $i++) {
            $yy = (int) ($base + pow($i / 14, 1.8) * ($h - $base));
            if ($yy <= $base + 2 || $yy >= $h) {
                continue;
            }
            imageline($im, 0, $yy, $w, $yy, $streak);
        }

        // Vessel — a speck on the horizon that grows and drifts past.
        $scale = lerp(0.02, 0.55, pow($p, 1.6));
        $len = max(3, (int) ($w * $scale));
        $vx = (int) (lerp(0.5, 0.72, smoothstep(0.45, 1.0, $p)) * $w);
        $baseY = $horizonY > 0 ? $horizonY : (int) (0.46 * $h);
        $vy = (int) ($baseY + 0.05 * $h + $p * 0.12 * $h);
        $hull = imagecolorallocate($im, 11, 22, 31);
        $rim = imagecolorallocatealpha($im, 205, 163, 92, 60);
        $refl = imagecolorallocatealpha($im, 11, 22, 31, 100);
        imagefilledellipse($im, $vx, $vy + (int) ($len * 0.12), (int) ($len * 0.6), (int) ($len * 0.10), $refl);
        imagefilledellipse($im, $vx, $vy, $len, max(2, (int) ($len * 0.34)), $hull);
        $cabW = max(2, (int) ($len * 0.42));
        $cabH = max(2, (int) ($len * 0.20));
        imagefilledrectangle($im, $vx - (int) ($cabW / 2), $vy - $cabH, $vx + (int) ($cabW / 2), $vy, $hull);
        imageline($im, $vx - (int) ($len / 2), $vy - (int) ($len * 0.04), $vx + (int) ($len / 2), $vy - (int) ($len * 0.04), $rim);

        // Cinematic letterbox vignette.
        $vig = imagecolorallocatealpha($im, 0, 0, 0, 95);
        imagefilledrectangle($im, 0, 0, $w, (int) ($h * 0.10), $vig);
        imagefilledrectangle($im, 0, (int) ($h * 0.90), $w, $h, $vig);

        // Hand-off: darken into the navy release section at the very end.
        $darkT = smoothstep(0.84, 1.0, $p);
        if ($darkT > 0) {
            $nd = imagecolorallocatealpha($im, 16, 30, 44, (int) max(0, 127 - $darkT * 95));
            imagefilledrectangle($im, 0, 0, $w, $h, $nd);
        }

        imagewebp($im, sprintf('%s/frame-%04d.webp', $dir, $f + 1), $quality);
        imagedestroy($im);
    }
}

renderSet($root.'/public/cinematic/frames', 1600, 900, $count, 72);
renderSet($root.'/public/cinematic/frames-sm', 800, 450, $count, 70);

echo "Generated {$count} placeholder frames (full + sm) into public/cinematic/\n";
