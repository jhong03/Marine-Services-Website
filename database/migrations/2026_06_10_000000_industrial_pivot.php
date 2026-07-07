<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Pivot to Veritas Industrial Services: services gain a pillar `category`
 * (industrial / marine / spare_parts), and a `projects` table powers the new
 * showcase gallery (photos, video links, experience write-ups).
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->string('category')->default('industrial')->after('id');
        });

        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('category')->default('industrial'); // industrial|marine|spare_parts
            $table->string('title');
            $table->string('summary')->nullable();
            $table->text('body')->nullable(); // the experience / write-up
            $table->string('client')->nullable();
            $table->string('location')->nullable();
            $table->string('year')->nullable();
            $table->string('cover_image')->nullable(); // /media/projects/... path or URL
            $table->json('images')->nullable(); // extra gallery image paths
            $table->string('video_url')->nullable(); // YouTube / Vimeo link
            $table->boolean('is_featured')->default(false);
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn('category');
        });
    }
};
