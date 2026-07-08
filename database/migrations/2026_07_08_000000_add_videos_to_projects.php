<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Self-hosted clips for the Projects showcase: `videos` holds an array of local
 * MP4 paths (e.g. /media/projects/…/clip.mp4) served directly by the site,
 * alongside the existing single `video_url` YouTube/Vimeo embed.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->json('videos')->nullable()->after('video_url');
        });
    }

    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn('videos');
        });
    }
};
