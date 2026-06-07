<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::firstOrCreate(
            ['email' => 'admin@marineservices.test'],
            ['name' => 'Admin', 'password' => 'password'],
        );

        // Ensure the account can reach the Filament admin panel.
        if (! $user->is_admin) {
            $user->forceFill(['is_admin' => true])->save();
        }

        $this->command->info('Admin user ready: '.$user->email.' (id '.$user->id.')');
    }
}
