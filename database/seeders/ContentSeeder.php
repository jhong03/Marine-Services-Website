<?php

namespace Database\Seeders;

use App\Models\FleetItem;
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
        $this->seedFleet();
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
            ['icon' => 'wrench', 'title' => 'Engine Service & Repair', 'description' => 'Routine servicing, fault diagnostics, and full repairs for inboard and outboard engines — petrol and diesel.'],
            ['icon' => 'droplets', 'title' => 'Hull Cleaning & Antifoul', 'description' => 'Pressure washing, antifoul stripping and application, and propeller polishing to protect performance.'],
            ['icon' => 'gauge', 'title' => 'Marine Electronics', 'description' => 'Supply and installation of chartplotters, radar, AIS, VHF, and instrumentation — fully calibrated.'],
            ['icon' => 'ship', 'title' => 'Rigging & Sails', 'description' => 'Standing and running rigging inspection, replacement, and tuning for sailing vessels of all sizes.'],
            ['icon' => 'paint', 'title' => 'Gelcoat & Finishing', 'description' => 'Gelcoat repair, polishing, and detailing to keep your vessel looking its best above the waterline.'],
            ['icon' => 'lifebuoy', 'title' => 'Safety & Compliance', 'description' => 'Safety equipment checks, servicing of liferafts and extinguishers, and survey preparation.'],
        ];

        foreach ($services as $i => $service) {
            Service::create([...$service, 'sort_order' => $i, 'is_published' => true]);
        }
    }

    private function seedFleet(): void
    {
        if (FleetItem::query()->exists()) {
            return;
        }

        $fleet = [
            ['name' => 'Service Tender', 'spec' => 'Rapid on-water response', 'description' => 'Our mobile service tender brings tools and technicians directly to your mooring.'],
            ['name' => 'Haul-Out Trailer', 'spec' => 'Up to 12m / 8 tonnes', 'description' => 'Hydraulic trailer for safe haul-out, transport, and hardstand storage of your vessel.'],
            ['name' => 'Workshop & Yard', 'spec' => 'Undercover servicing bays', 'description' => 'Fully equipped workshop for engine rebuilds, fabrication, and finishing work.'],
            ['name' => 'Dive Support', 'spec' => 'In-water inspection', 'description' => 'Commercial divers for hull cleaning, prop changes, and underwater inspections.'],
        ];

        foreach ($fleet as $i => $item) {
            FleetItem::create([...$item, 'sort_order' => $i, 'is_published' => true]);
        }
    }

    private function seedTeam(): void
    {
        if (TeamMember::query()->exists()) {
            return;
        }

        $team = [
            ['name' => '[Team member name]', 'role' => 'Lead Marine Technician', 'bio' => 'Placeholder bio — add this team member\'s experience and specialties.'],
            ['name' => '[Team member name]', 'role' => 'Workshop Manager', 'bio' => 'Placeholder bio — add this team member\'s experience and specialties.'],
            ['name' => '[Team member name]', 'role' => 'Customer Service', 'bio' => 'Placeholder bio — add this team member\'s experience and specialties.'],
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
            ['quote' => 'Fast, professional, and honest. They had our engine sorted and us back on the water within days.', 'author' => 'Placeholder testimonial, happy customer'],
            ['quote' => 'Booked in for a haul-out and antifoul — great communication and the boat came back looking brand new.', 'author' => 'Placeholder testimonial, returning customer'],
        ];

        foreach ($testimonials as $i => $testimonial) {
            Testimonial::create([...$testimonial, 'sort_order' => $i, 'is_published' => true]);
        }
    }

    private function seedSettings(): void
    {
        $settings = SiteSetting::current();

        if (filled($settings->company_name)) {
            return;
        }

        $settings->update([
            'company_name' => 'Marine Services',
            'tagline' => 'Professional marine servicing, repairs, and maintenance — keeping your vessel safe, reliable, and ready for the water.',
            'email' => 'hello@marineservices.test',
            'phone' => '+00 0000 000000',
            'address' => 'Marina Drive, Harbourside',
            'hours' => 'Mon–Sat, 8am–6pm',
            'hero_heading' => 'Expert care for your vessel, on and off the water',
            'hero_subtext' => 'Servicing, repairs, and maintenance delivered by certified marine technicians. Keep your boat safe, reliable, and ready for every voyage.',
            'cinematic_capability' => 'Servicing, repairs & maintenance — done properly, by people who live on the water.',
            'cinematic_handoff' => 'Welcome aboard.',
            'about_story' => "[Placeholder company story] — Marine Services was founded with a simple goal: deliver dependable, honest marine servicing the local boating community can trust.\n\nOver the years we've grown from a single workshop into a full-service marine operation, but our values haven't changed. Share your real history and we'll bring it to life.",
            'stats' => [
                ['value' => '20+', 'label' => 'Years on the water'],
                ['value' => '1,200+', 'label' => 'Vessels serviced'],
                ['value' => '24/7', 'label' => 'Emergency callout'],
                ['value' => '100%', 'label' => 'Certified technicians'],
            ],
            'core_values' => [
                ['title' => 'Craftsmanship', 'description' => 'We do the job properly the first time, with attention to every detail.'],
                ['title' => 'Honesty', 'description' => 'Clear quotes, straight advice, and no work done without your say-so.'],
                ['title' => 'Local & loyal', 'description' => 'A part of the boating community, looking after our customers for the long haul.'],
            ],
        ]);
    }
}
