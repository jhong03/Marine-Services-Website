<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Service;
use App\Models\TeamMember;
use App\Models\Testimonial;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    private const PROJECT_FIELDS = [
        'id', 'category', 'title', 'summary', 'body',
        'client', 'location', 'year', 'cover_image', 'images', 'video_url', 'videos',
    ];

    public function home(): Response
    {
        return Inertia::render('welcome', [
            'services' => Service::query()
                ->where('is_published', true)
                ->orderBy('sort_order')
                ->get(['id', 'category', 'icon', 'title', 'description']),
            'projects' => Project::query()
                ->where('is_published', true)
                ->where('is_featured', true)
                ->orderBy('sort_order')
                ->limit(6)
                ->get(self::PROJECT_FIELDS),
            'testimonials' => Testimonial::query()
                ->where('is_published', true)
                ->orderBy('sort_order')
                ->get(['id', 'quote', 'author']),
        ]);
    }

    public function industrial(): Response
    {
        return $this->pillar('industrial');
    }

    public function marine(): Response
    {
        return $this->pillar('marine');
    }

    public function spareParts(): Response
    {
        return $this->pillar('spare_parts');
    }

    private function pillar(string $category): Response
    {
        return Inertia::render('pillar', [
            'category' => $category,
            'services' => Service::query()
                ->where('is_published', true)
                ->where('category', $category)
                ->orderBy('sort_order')
                ->get(['id', 'category', 'icon', 'title', 'description']),
            'projects' => Project::query()
                ->where('is_published', true)
                ->where('category', $category)
                ->orderBy('sort_order')
                ->get(self::PROJECT_FIELDS),
        ]);
    }

    public function projects(): Response
    {
        return Inertia::render('projects', [
            'projects' => Project::query()
                ->where('is_published', true)
                ->orderBy('sort_order')
                ->get(self::PROJECT_FIELDS),
        ]);
    }

    public function about(): Response
    {
        return Inertia::render('about', [
            'team' => TeamMember::query()
                ->where('is_published', true)
                ->orderBy('sort_order')
                ->get(['id', 'name', 'role', 'bio']),
        ]);
    }

    public function contact(): Response
    {
        return Inertia::render('contact');
    }
}
