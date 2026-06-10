<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Copy for the homepage cinematic overlay "moments" — kept in the DB so
     * staff can edit it in Filament rather than in code.
     */
    public function up(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {
            $table->text('cinematic_capability')->nullable()->after('hero_subtext');
            $table->string('cinematic_handoff')->nullable()->after('cinematic_capability');
        });
    }

    public function down(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {
            $table->dropColumn(['cinematic_capability', 'cinematic_handoff']);
        });
    }
};
