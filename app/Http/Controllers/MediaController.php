<?php

namespace App\Http\Controllers;

use Symfony\Component\HttpFoundation\BinaryFileResponse;

class MediaController extends Controller
{
    /**
     * Serve a file from public/media with HTTP Range support so browsers can
     * seek self-hosted video clips. Used only in local dev (see the
     * `mediaStreaming` shared prop) because `php artisan serve` can't do Range
     * requests; production serves these files statically via Caddy/FrankenPHP.
     *
     * `response()->file()` returns a BinaryFileResponse, which honours the
     * `Range` header (206 Partial Content) automatically.
     */
    public function stream(string $path): BinaryFileResponse
    {
        // Only files under public/media, and no path traversal.
        abort_unless(str_starts_with($path, 'media/'), 404);

        $real = realpath(public_path($path));
        $base = realpath(public_path('media'));

        abort_if(
            $real === false || $base === false || ! str_starts_with($real, $base),
            404,
        );

        return response()->file($real);
    }
}
