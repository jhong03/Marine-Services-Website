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
    about_story: string | null;
    stats: Stat[] | null;
    core_values: CoreValue[] | null;
};

export type Service = {
    id: number;
    icon: string | null;
    title: string;
    description: string;
};

export type FleetItem = {
    id: number;
    name: string;
    spec: string | null;
    description: string;
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
