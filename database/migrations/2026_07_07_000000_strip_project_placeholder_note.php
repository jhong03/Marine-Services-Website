<?php

use App\Models\Project;
use Illuminate\Database\Migrations\Migration;

/**
 * One-off data cleanup: remove the "Vessel, client, location and date to be
 * confirmed and added in the admin panel." note the seeder used to append to
 * project write-ups. No-op on rows that don't contain it (e.g. fresh installs).
 */
return new class extends Migration
{
    public function up(): void
    {
        $note = 'Vessel, client, location and date to be confirmed and added in the admin panel.';

        Project::query()
            ->where('body', 'like', '%'.$note.'%')
            ->get()
            ->each(function (Project $project) use ($note) {
                $project->update([
                    'body' => rtrim(str_replace($note, '', (string) $project->body)),
                ]);
            });
    }

    public function down(): void
    {
        // Irreversible data cleanup.
    }
};
