# Media drop folder (project showcase photos)

Drop your **project/job photos** in here and I'll optimize them (resize + WebP)
and commit the results into `public/media/projects/…`, then wire them into the
Projects gallery. Raw files in this folder are **gitignored** (not committed) —
only the optimized versions ship.

## How to organise

Make one sub-folder per project (name it however you like — a short slug is
ideal), and drop that project's photos inside. Example:

```
media/
  harbour-crane-overhaul/
    01.jpg
    02.jpg
    cover.jpg
  tanker-engine-rebuild/
    ...
  warehouse-spare-parts/
    ...
```

- Any common format is fine (jpg, png, heic, webp).
- Landscape shots work best for cards/cover; a few portraits are fine for galleries.
- If you have a preferred **cover** image, name it `cover.*` (otherwise I'll pick one).
- **Videos:** don't drop large video files — instead give me the **YouTube / Vimeo
  links** and I'll embed them (keeps the site fast and free to host).

Tell me the project **title, category (Industrial / Marine / Spare Parts), and a
sentence or two of description** for each folder (or I'll start with placeholders
you can edit later in `/admin`).
