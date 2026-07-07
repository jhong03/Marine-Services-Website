<?php

use Database\Seeders\ContentSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

it('renders the home page with DB-driven props', function () {
    $this->seed(ContentSeeder::class);

    $this->get('/')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('welcome')
            ->has('projects')
            ->has('testimonials')
            ->has('siteSettings.company_name')
        );
});

it('renders a pillar page with services and projects', function () {
    $this->seed(ContentSeeder::class);

    $this->get('/industrial')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('pillar')
            ->where('category', 'industrial')
            ->has('services')
            ->has('projects')
        );
});

it('renders the projects showcase page', function () {
    $this->seed(ContentSeeder::class);

    $this->get('/projects')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('projects')
            ->has('projects')
        );
});

it('renders the home page even with no content seeded', function () {
    $this->get('/')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('welcome')
            ->has('projects')
            ->has('testimonials')
        );
});
