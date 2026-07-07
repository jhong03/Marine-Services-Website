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

            // Marine
            ['category' => 'marine', 'icon' => 'ship', 'title' => 'Marine Engine Service & Repair', 'description' => 'Servicing, diagnostics and repair for inboard and outboard marine engines — petrol and diesel.'],
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

        $projects = [
            ['category' => 'industrial', 'title' => 'Refinery Pump Overhaul', 'summary' => 'Full overhaul of critical process pumps during a planned plant shutdown.', 'client' => '[Client name]', 'location' => '[Location]', 'year' => '2024', 'is_featured' => true],
            ['category' => 'industrial', 'title' => 'Structural Steel Fabrication', 'summary' => 'Design and fabrication of custom structural steelwork for a processing facility.', 'year' => '2023', 'is_featured' => false],
            ['category' => 'marine', 'title' => 'Tanker Main Engine Rebuild', 'summary' => 'Complete rebuild and recommissioning of a marine main engine.', 'client' => '[Client name]', 'year' => '2024', 'is_featured' => true],
            ['category' => 'marine', 'title' => 'Hull Recoat & Antifoul', 'summary' => 'Haul-out, blast and full protective coating system on a working vessel.', 'year' => '2023', 'is_featured' => false],
            ['category' => 'spare_parts', 'title' => 'Emergency Parts Supply', 'summary' => 'Sourced and delivered critical spares within 24 hours to avert downtime.', 'year' => '2024', 'is_featured' => true],
        ];

        foreach ($projects as $i => $project) {
            Project::create([...$project, 'body' => $placeholder, 'sort_order' => $i, 'is_published' => true]);
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
            'email' => 'info@veritasindustrial.example',
            'phone' => '+00 0000 000000',
            'address' => '[Company address]',
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
