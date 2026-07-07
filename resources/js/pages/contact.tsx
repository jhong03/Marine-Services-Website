import { Head, usePage } from '@inertiajs/react';
import { Clock, Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PageBanner } from '@/components/marine';
import PublicLayout from '@/layouts/public-layout';

type Detail = { icon: LucideIcon; label: string; value: string; href?: string };

export default function Contact() {
    const { siteSettings } = usePage().props;

    const details: Detail[] = [
        siteSettings?.address && {
            icon: MapPin,
            label: 'Visit us',
            value: siteSettings.address,
        },
        siteSettings?.email && {
            icon: Mail,
            label: 'Email',
            value: siteSettings.email,
            href: `mailto:${siteSettings.email}`,
        },
        siteSettings?.phone && {
            icon: Phone,
            label: 'Call',
            value: siteSettings.phone,
            href: `tel:${siteSettings.phone.replace(/\s+/g, '')}`,
        },
        siteSettings?.hours && {
            icon: Clock,
            label: 'Hours',
            value: siteSettings.hours,
        },
    ].filter(Boolean) as Detail[];

    const socials: Detail[] = [
        siteSettings?.facebook_url && {
            icon: Facebook,
            label: 'Facebook',
            value: 'Facebook',
            href: siteSettings.facebook_url,
        },
        siteSettings?.instagram_url && {
            icon: Instagram,
            label: 'Instagram',
            value: 'Instagram',
            href: siteSettings.instagram_url,
        },
    ].filter(Boolean) as Detail[];

    return (
        <PublicLayout>
            <Head title="Contact" />

            <PageBanner eyebrow="Get in touch" title="Contact Us">
                Reach out by phone or email and our team will be glad to help —
                whatever the job, industrial or marine.
            </PageBanner>

            <section className="bg-paper py-20 dark:bg-navy-deep">
                <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-6 sm:grid-cols-2">
                        {details.map((detail) => {
                            const inner = (
                                <>
                                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy text-brass-bright ring-1 ring-brass/30 dark:bg-navy-deep">
                                        <detail.icon className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <div className="text-xs font-semibold tracking-[0.15em] text-ink-soft uppercase dark:text-paper/55">
                                            {detail.label}
                                        </div>
                                        <div className="mt-0.5 text-base font-semibold text-ink dark:text-paper">
                                            {detail.value}
                                        </div>
                                    </div>
                                </>
                            );

                            const cls =
                                'flex items-center gap-4 rounded-2xl border border-seafog bg-surface p-6 shadow-sm dark:border-navy dark:bg-navy';

                            return detail.href ? (
                                <a
                                    key={detail.label}
                                    href={detail.href}
                                    className={`${cls} transition-colors hover:border-brass/40`}
                                >
                                    {inner}
                                </a>
                            ) : (
                                <div key={detail.label} className={cls}>
                                    {inner}
                                </div>
                            );
                        })}
                    </div>

                    {socials.length > 0 && (
                        <div className="mt-10 flex items-center justify-center gap-4">
                            {socials.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={s.label}
                                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-seafog text-ink-soft transition-colors hover:border-brass/40 hover:text-brass dark:border-navy dark:text-paper/70 dark:hover:text-brass-bright"
                                >
                                    <s.icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    )}

                    {details.length === 0 && (
                        <p className="text-center text-ink-soft dark:text-paper/60">
                            Contact details will appear here soon.
                        </p>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
