<?php

use Database\Seeders\ContentSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

it('renders the cinematic home page with DB-driven props', function () {
    $this->seed(ContentSeeder::class);

    $this->get('/')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('welcome')
            ->has('services')
            ->has('testimonials')
            ->has('siteSettings.cinematic_capability')
            ->has('siteSettings.cinematic_handoff')
        );
});

it('renders the home page even with no content seeded', function () {
    $this->get('/')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('welcome')
            ->has('services')
            ->has('testimonials')
        );
});
