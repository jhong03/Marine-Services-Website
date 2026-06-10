# Homepage cinematic — frame pipeline

The homepage hero is a **scroll-scrubbed frame sequence** (Apple-style). At
runtime a `<canvas>` draws one pre-extracted WebP frame per scroll position —
there is **no real-time 3D**. This doc covers how to (re)generate those frames.

## Where frames live

```
public/cinematic/frames/      frame-0001.webp … frame-0150.webp   # full res ~1600px wide
public/cinematic/frames-sm/   frame-0001.webp … frame-0150.webp   # mobile  ~800px wide
```

- Naming is **`frame-%04d.webp`**, 1-indexed.
- The frame **count** is the single source of truth in
  [`resources/js/components/cinematic/config.ts`](../resources/js/components/cinematic/config.ts)
  (`FRAME_COUNT`). If you change the number of frames, update that constant too.
- The runtime expects **both** a full and an `-sm` set (mobile uses the small set).

## Current state

Real footage is wired in: a 1920×1080 aerial cruise-ship clip, sampled to
**129 frames** (`FRAME_COUNT = 129`), ~9.2 MB full set. (A pure-GD placeholder
generator also still exists — `php scripts/generate-placeholder-frames.php 150` —
if you ever need stand-in frames with no footage.)

## Swapping in new footage (one command per set)

Drop your clip in the project root (e.g. `source.mp4`) and run **ffmpeg**:

```bash
# Full-resolution set (~1200px wide). -f image2 + -c:v libwebp is REQUIRED —
# without them ffmpeg writes ONE animated .webp instead of a frame sequence.
ffmpeg -y -i source.mp4 -vf "fps=3.7,scale=1200:-2" \
  -c:v libwebp -quality 58 -f image2 public/cinematic/frames/frame-%04d.webp

# Mobile set (~720px wide) — same clip, smaller
ffmpeg -y -i source.mp4 -vf "fps=3.7,scale=720:-2" \
  -c:v libwebp -quality 55 -f image2 public/cinematic/frames-sm/frame-%04d.webp
```

Useful filter add-ons (chain inside `-vf`, comma-separated, before `scale`):

- **Crop a baked-in overlay/HUD:** `crop=1920:952:0:64` (trims 64px off top+bottom
  of a 1080p source) — used for the current clip.
- **Frame count:** `fps=N` sets the sampling rate. `frames ≈ clip_seconds × N`.
  Pick N so you land ~120–160 frames (e.g. a 35s clip → `fps=3.7` ≈ 129).

Then:

1. **Count the frames** (`ls public/cinematic/frames | wc -l`).
2. Set `FRAME_COUNT` in `config.ts` to that number.
3. **Bump `FRAMES_VERSION`** in `config.ts` — frame filenames are reused, so the
   `?v=` query is what busts stale browser/CDN caches after a re-extract.
4. Watch the full-set weight. ~10 MB is the comfortable target for the free tier,
   but higher is fine if you want maximum sharpness (the current set is ~44 MB at
   1600px/q85). Tune `-quality` / `scale` / `fps`; photographic frames are far
   heavier than flat graphics, and higher resolution also raises browser decode
   memory (keep an eye on low-end devices).

> Tip: clear the folders first (`rm public/cinematic/frames/*.webp
> public/cinematic/frames-sm/*.webp`) so stale frames don't linger if the new
> clip yields fewer.

These are static files — FrankenPHP/Caddy serves them directly (no PHP), so they
are cheap to serve once cached.

## What real assets are still needed

- A licensed/owned **drone clip** of open water with a vessel (ideally the
  client's own boat) following the beat described above. ~8–12 s, 15 fps.
- Optionally a colour-grade pass so the final frames hand off into the deep-navy
  release section (the placeholder darkens the last ~15% of frames to match).
