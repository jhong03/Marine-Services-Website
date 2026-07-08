<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Service;
use App\Models\SiteSetting;
use App\Models\TeamMember;
use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class ContentSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedServices();
        $this->seedProjects();
        $this->seedTeam();
        $this->seedTestimonials();
        $this->seedSettings();
    }

    private function seedServices(): void
    {
        if (Service::query()->exists()) {
            return;
        }

        $services = [
            // Industrial
            ['category' => 'industrial', 'icon' => 'cog', 'title' => 'Mechanical Maintenance', 'description' => 'Preventive and corrective maintenance for industrial plant, pumps, compressors and rotating equipment.'],
            ['category' => 'industrial', 'icon' => 'hammer', 'title' => 'Fabrication & Welding', 'description' => 'Custom steel fabrication, structural welding, and on-site repairs built to specification.'],
            ['category' => 'industrial', 'icon' => 'gauge', 'title' => 'Instrumentation & Controls', 'description' => 'Installation, calibration and servicing of industrial instrumentation and control systems.'],
            ['category' => 'industrial', 'icon' => 'zap', 'title' => 'Electrical Services', 'description' => 'Industrial electrical installation, panel building and fault-finding by certified electricians.'],
            ['category' => 'industrial', 'icon' => 'hardhat', 'title' => 'Shutdowns & Turnarounds', 'description' => 'Planned shutdown support, overhauls and turnaround crews to get you back online fast.'],

            // Marine — commercial ship engineering
            ['category' => 'marine', 'icon' => 'wrench', 'title' => 'Main Engine Service & Overhaul', 'description' => 'Overhaul, top-end work and running maintenance for medium- and slow-speed marine diesel main engines and auxiliaries.'],
            ['category' => 'marine', 'icon' => 'cog', 'title' => 'Engine-Room Systems & Machinery', 'description' => 'Pumps, compressors, separators, coolers and piping systems kept reliable throughout the engine room.'],
            ['category' => 'marine', 'icon' => 'zap', 'title' => 'Marine Electrical & Switchboard', 'description' => 'Main switchboard, generators, alarm and control systems — fault-finding and repair by marine electricians.'],
            ['category' => 'marine', 'icon' => 'gauge', 'title' => 'Steering Gear & Hydraulics', 'description' => 'Steering gear, hydraulic power packs and deck machinery serviced, tested and kept survey-ready.'],
            ['category' => 'marine', 'icon' => 'compass', 'title' => 'Navigation & Bridge Systems', 'description' => 'ECDIS, radar and wheelhouse console installation, servicing and troubleshooting.'],

            // Marine — small craft
            ['category' => 'marine', 'icon' => 'ship', 'title' => 'Small-Craft Engine Service', 'description' => 'Servicing, diagnostics and repair for inboard and outboard engines on small craft — petrol and diesel.'],
            ['category' => 'marine', 'icon' => 'droplets', 'title' => 'Hull Cleaning & Coatings', 'description' => 'Pressure washing, antifoul and protective coatings to keep vessels performing.'],
            ['category' => 'marine', 'icon' => 'anchor', 'title' => 'Deck & Rigging', 'description' => 'Standing and running rigging, deck hardware and on-water repairs for all vessel types.'],
            ['category' => 'marine', 'icon' => 'lifebuoy', 'title' => 'Marine Safety & Survey', 'description' => 'Safety equipment servicing, liferaft checks and survey preparation.'],

            // Spare parts
            ['category' => 'spare_parts', 'icon' => 'package', 'title' => 'Genuine & OEM Parts', 'description' => 'Supply of genuine and OEM spare parts for industrial and marine equipment.'],
            ['category' => 'spare_parts', 'icon' => 'boxes', 'title' => 'Sourcing & Inventory', 'description' => 'Hard-to-find part sourcing, stock management and fast turnaround.'],
            ['category' => 'spare_parts', 'icon' => 'truck', 'title' => 'Delivery & Logistics', 'description' => 'Expedited shipping and delivery to keep your downtime to a minimum.'],
        ];

        foreach ($services as $i => $service) {
            Service::create([...$service, 'sort_order' => $i, 'is_published' => true]);
        }
    }

    private function seedProjects(): void
    {
        if (Project::query()->exists()) {
            return;
        }

        $placeholder = 'Placeholder project — add real photos, a video link and the story of this job in the admin panel.';

        $mediaBase = '/media/projects';

        $projects = [
            // ---- Marine: real jobs from on-board media ----
            [
                'category' => 'marine',
                'title' => 'Marine Main Engine Overhaul',
                'summary' => "Top-end overhaul and running maintenance on a vessel's main propulsion engine and engine-room machinery.",
                'body' => 'Hands-on overhaul of a marine diesel main engine and its supporting machinery, carried out on board. Work included opening up the cylinder units and valve gear for inspection and servicing, and attending to the surrounding engine-room systems to bring the plant back to reliable running order.',
                'client' => null,
                'location' => null,
                'year' => null,
                'cover_image' => "{$mediaBase}/main-engine-overhaul/cover.jpg",
                'images' => ["{$mediaBase}/main-engine-overhaul/01.jpg"],
                'videos' => [
                    "{$mediaBase}/main-engine-overhaul/clip-01.mp4",
                    "{$mediaBase}/main-engine-overhaul/clip-02.mp4",
                    "{$mediaBase}/main-engine-overhaul/clip-03.mp4",
                    "{$mediaBase}/main-engine-overhaul/clip-04.mp4",
                    "{$mediaBase}/main-engine-overhaul/clip-05.mp4",
                    "{$mediaBase}/main-engine-overhaul/clip-06.mp4",
                ],
                'is_featured' => true,
            ],
            [
                'category' => 'marine',
                'title' => 'Bridge & Navigation Systems',
                'summary' => 'Support for wheelhouse navigation and manoeuvring equipment — ECDIS, radar and bridge consoles.',
                'body' => 'Attending to the vessel\'s bridge equipment, including the ECDIS and radar navigation consoles and the main manoeuvring console. Work of this kind covers checking, servicing and troubleshooting the wheelhouse systems the crew rely on at sea.',
                'client' => null,
                'location' => null,
                'year' => null,
                'cover_image' => "{$mediaBase}/bridge-navigation/cover.jpg",
                'images' => ["{$mediaBase}/bridge-navigation/01.jpg"],
                'videos' => null,
                'is_featured' => false,
            ],
            [
                'category' => 'marine',
                'title' => 'Switchboard & Steering Gear Service',
                'summary' => 'Main switchboard, electrical distribution and steering-gear hydraulics inspected and maintained.',
                'body' => 'Servicing of the engine-control-room main switchboard and electrical distribution alongside the steering-gear compartment — including the hydraulic power packs that drive the steering. Regular attention here keeps a vessel\'s power and steering dependable and survey-ready.',
                'client' => null,
                'location' => null,
                'year' => null,
                'cover_image' => "{$mediaBase}/engine-room-systems/cover.jpg",
                'images' => ["{$mediaBase}/engine-room-systems/01.jpg"],
                'videos' => null,
                'is_featured' => false,
            ],

            // ---- Industrial & spare parts: placeholders (media to come) ----
            ['category' => 'industrial', 'title' => 'Refinery Pump Overhaul', 'summary' => 'Full overhaul of critical process pumps during a planned plant shutdown.', 'body' => $placeholder, 'client' => '[Client name]', 'location' => '[Location]', 'year' => '2024', 'cover_image' => null, 'images' => null, 'videos' => null, 'is_featured' => true],
            ['category' => 'industrial', 'title' => 'Structural Steel Fabrication', 'summary' => 'Design and fabrication of custom structural steelwork for a processing facility.', 'body' => $placeholder, 'client' => null, 'location' => null, 'year' => '2023', 'cover_image' => null, 'images' => null, 'videos' => null, 'is_featured' => false],
            ['category' => 'spare_parts', 'title' => 'Emergency Parts Supply', 'summary' => 'Sourced and delivered critical spares within 24 hours to avert downtime.', 'body' => $placeholder, 'client' => null, 'location' => null, 'year' => '2024', 'cover_image' => null, 'images' => null, 'videos' => null, 'is_featured' => true],
        ];

        foreach ($projects as $i => $project) {
            Project::create([...$project, 'sort_order' => $i, 'is_published' => true]);
        }
    }

    private function seedTeam(): void
    {
        if (TeamMember::query()->exists()) {
            return;
        }

        $team = [
            ['name' => '[Team member name]', 'role' => 'Operations Manager', 'bio' => "Placeholder bio — add this team member's experience and specialties."],
            ['name' => '[Team member name]', 'role' => 'Lead Engineer', 'bio' => "Placeholder bio — add this team member's experience and specialties."],
            ['name' => '[Team member name]', 'role' => 'Parts & Logistics', 'bio' => "Placeholder bio — add this team member's experience and specialties."],
        ];

        foreach ($team as $i => $member) {
            TeamMember::create([...$member, 'sort_order' => $i, 'is_published' => true]);
        }
    }

    private function seedTestimonials(): void
    {
        if (Testimonial::query()->exists()) {
            return;
        }

        $testimonials = [
            ['quote' => 'Professional, precise and dependable — they handled our shutdown on time and to spec.', 'author' => 'Placeholder testimonial, industrial client'],
            ['quote' => 'Sourced a hard-to-find part overnight and kept our vessel on schedule. Outstanding service.', 'author' => 'Placeholder testimonial, marine client'],
        ];

        foreach ($testimonials as $i => $testimonial) {
            Testimonial::create([...$testimonial, 'sort_order' => $i, 'is_published' => true]);
        }
    }

    private function seedSettings(): void
    {
        $settings = SiteSetting::current();

        if (filled($settings->company_name) && $settings->company_name !== 'Marine Services') {
            return;
        }

        $settings->update([
            'company_name' => 'Veritas Industrial Services',
            'tagline' => 'Industrial and marine services, plus genuine spare parts — delivered with precision and care.',
            'email' => 'veritas.is@outlook.com',
            'phone' => '+6017-505 1431',
            'address' => '22, JALAN KRIAN, 10400, GEORGETOWN, PENANG, MALAYSIA',
            'hours' => 'Mon–Fri, 8am–6pm',
            'hero_heading' => 'Precision industrial & marine services you can trust',
            'hero_subtext' => 'From plant maintenance and fabrication to marine servicing and spare-parts supply — one experienced team, on-site and on-time.',
            'about_story' => "[Placeholder company story] — Veritas Industrial Services was built on a simple principle: honest, precise work our clients can rely on.\n\nWe deliver industrial and marine services and genuine spare parts across the region. Share your real history and we'll bring it to life here.",
            'stats' => [
                ['value' => '25+', 'label' => 'Years of expertise'],
                ['value' => '900+', 'label' => 'Projects delivered'],
                ['value' => '2', 'label' => 'Core divisions'],
                ['value' => '24/7', 'label' => 'Emergency support'],
            ],
            'core_values' => [
                ['title' => 'Craftsmanship', 'description' => 'We do the job properly the first time, with attention to every detail.'],
                ['title' => 'Integrity', 'description' => 'Straight advice, clear pricing and work you can stand behind — the meaning of Veritas.'],
                ['title' => 'Reliability', 'description' => 'On-site and on-time, keeping your operation running with minimal downtime.'],
            ],
        ]);
    }
}
