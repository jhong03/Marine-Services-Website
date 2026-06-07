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

        $this->command->info('Admin user ready: '.$user->email.' (id '.$user->id.')');
    }
}
