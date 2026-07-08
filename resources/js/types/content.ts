export type Stat = { value: string; label: string };
export type CoreValue = { title: string; description: string };

export type SiteSettings = {
    company_name: string | null;
    tagline: string | null;
    email: string | null;
    phone: string | null;
    address: string | null;
    hours: string | null;
    facebook_url: string | null;
    instagram_url: string | null;
    hero_heading: string | null;
    hero_subtext: string | null;
    cinematic_capability: string | null;
    cinematic_handoff: string | null;
    about_story: string | null;
    stats: Stat[] | null;
    core_values: CoreValue[] | null;
};

export type Service = {
    id: number;
    category: string;
    icon: string | null;
    title: string;
    description: string;
};

export type ProjectCategory = 'industrial' | 'marine' | 'spare_parts';

export type Project = {
    id: number;
    category: string;
    title: string;
    summary: string | null;
    body: string | null;
    client: string | null;
    location: string | null;
    year: string | null;
    cover_image: string | null;
    images: string[] | null;
    video_url: string | null;
    videos: string[] | null;
};

export type TeamMember = {
    id: number;
    name: string;
    role: string | null;
    bio: string | null;
};

export type Testimonial = {
    id: number;
    quote: string;
    author: string | null;
};
