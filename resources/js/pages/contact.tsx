import { Head, usePage } from '@inertiajs/react';
import { Anchor, Clock, Mail, MapPin, Phone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { PageBanner } from '@/components/marine';
import PublicLayout from '@/layouts/public-layout';

const inputClass =
    'mt-1.5 w-full rounded-md border border-seafog bg-paper px-3.5 py-2.5 text-ink shadow-sm transition focus:border-brass focus:ring-2 focus:ring-brass/25 focus:outline-none dark:border-navy dark:bg-navy-deep dark:text-paper dark:placeholder-paper/40';
const labelClass = 'block text-sm font-medium text-ink dark:text-paper/80';

type Detail = { icon: LucideIcon; label: string; value: string };

export default function Contact() {
    const { siteSettings } = usePage().props;
    const [submitted, setSubmitted] = useState(false);

    const details: Detail[] = [
        siteSettings?.address && {
            icon: MapPin,
            label: 'Visit the yard',
            value: siteSettings.address,
        },
        siteSettings?.email && {
            icon: Mail,
            label: 'Email',
            value: siteSettings.email,
        },
        siteSettings?.phone && {
            icon: Phone,
            label: 'Call',
            value: siteSettings.phone,
        },
        siteSettings?.hours && {
            icon: Clock,
            label: 'Hours',
            value: siteSettings.hours,
        },
    ].filter(Boolean) as Detail[];

    // NOTE: Phase 3 will replace this with an Inertia form POST that persists
    // the enquiry to the database and emails the team.
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmitted(true);
    }

    return (
        <PublicLayout>
            <Head title="Contact" />

            <PageBanner eyebrow="Say hello" title="Get in Touch">
                Tell us about your vessel and what you need — we'll come back to
                you with an honest quote and a friendly word.
            </PageBanner>

            <section className="bg-paper py-20 dark:bg-navy-deep">
                <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
                    {/* Details */}
                    <div className="space-y-6">
                        <h2 className="font-serif text-xl font-semibold text-ink dark:text-paper">
                            Drop by or drop us a line
                        </h2>
                        {details.map((detail) => (
                            <div key={detail.label} className="flex gap-4">
                                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy text-brass-bright ring-1 ring-brass/30 dark:bg-navy">
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
                            </div>
                        ))}
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-2">
                        <div className="rounded-2xl border border-seafog bg-surface p-8 shadow-sm dark:border-navy dark:bg-navy">
                            {submitted ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-navy text-brass-bright ring-1 ring-brass/40">
                                        <Anchor className="h-8 w-8" />
                                    </span>
                                    <h2 className="mt-5 font-serif text-2xl font-semibold text-ink dark:text-paper">
                                        Thanks for reaching out!
                                    </h2>
                                    <p className="mt-2 max-w-md text-ink-soft dark:text-paper/65">
                                        This is a placeholder confirmation. Once
                                        the backend is wired up (Phase 3), your
                                        enquiry will be saved and emailed
                                        straight to the team.
                                    </p>
                                </div>
                            ) : (
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-5"
                                >
                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <div>
                                            <label
                                                htmlFor="name"
                                                className={labelClass}
                                            >
                                                Name
                                            </label>
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                required
                                                className={inputClass}
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className={labelClass}
                                            >
                                                Email
                                            </label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                className={inputClass}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="vessel"
                                            className={labelClass}
                                        >
                                            Vessel / service needed
                                        </label>
                                        <input
                                            id="vessel"
                                            name="vessel"
                                            type="text"
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="message"
                                            className={labelClass}
                                        >
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={5}
                                            required
                                            className={inputClass}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full rounded-md bg-brass px-6 py-3 text-base font-semibold text-paper shadow-sm transition-colors hover:bg-timber sm:w-auto dark:bg-brass-bright dark:text-navy-deep dark:hover:bg-rope"
                                    >
                                        Send enquiry
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
