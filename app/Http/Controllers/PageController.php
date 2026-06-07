<?php

namespace App\Http\Controllers;

use App\Models\FleetItem;
use App\Models\Service;
use App\Models\TeamMember;
use App\Models\Testimonial;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('welcome', [
            'services' => Service::query()
                ->where('is_published', true)
                ->orderBy('sort_order')
                ->get(['id', 'icon', 'title', 'description']),
            'testimonials' => Testimonial::query()
                ->where('is_published', true)
                ->orderBy('sort_order')
                ->get(['id', 'quote', 'author']),
        ]);
    }

    public function services(): Response
    {
        return Inertia::render('services', [
            'services' => Service::query()
                ->where('is_published', true)
                ->orderBy('sort_order')
                ->get(['id', 'icon', 'title', 'description']),
        ]);
    }

    public function fleet(): Response
    {
        return Inertia::render('fleet', [
            'fleet' => FleetItem::query()
                ->where('is_published', true)
                ->orderBy('sort_order')
                ->get(['id', 'name', 'spec', 'description']),
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
