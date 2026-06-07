import { Head, usePage } from '@inertiajs/react';
import { CheckCircle2, Clock, Mail, MapPin, Phone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import PublicLayout from '@/layouts/public-layout';

const inputClass =
    'mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30 focus:outline-none dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500';
const labelClass =
    'block text-sm font-medium text-slate-700 dark:text-slate-300';

type Detail = { icon: LucideIcon; label: string; value: string };

export default function Contact() {
    const { siteSettings } = usePage().props;
    const [submitted, setSubmitted] = useState(false);

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

            <section className="bg-gradient-to-br from-slate-900 to-sky-900 text-white dark:from-black dark:to-sky-950">
                <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                        Get in Touch
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg text-slate-300">
                        Tell us about your vessel and what you need — we'll get
                        back to you with a quote.
                    </p>
                </div>
            </section>

            <section className="bg-slate-50 py-20 dark:bg-slate-900">
                <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
                    {/* Details */}
                    <div className="space-y-6">
                        {details.map((detail) => (
                            <div key={detail.label} className="flex gap-4">
                                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600 dark:bg-sky-950 dark:text-sky-400">
                                    <detail.icon className="h-5 w-5" />
                                </span>
                                <div>
                                    <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                        {detail.label}
                                    </div>
                                    <div className="text-base font-semibold text-slate-900 dark:text-white">
                                        {detail.value}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-2">
                        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                            {submitted ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <CheckCircle2 className="h-14 w-14 text-emerald-500" />
                                    <h2 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-white">
                                        Thanks for reaching out!
                                    </h2>
                                    <p className="mt-2 max-w-md text-slate-600 dark:text-slate-400">
                                        This is a placeholder confirmation. Once
                                        the backend is wired up (Phase 3), your
                                        enquiry will be saved and emailed to the
                                        team.
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
                                        className="w-full rounded-md bg-sky-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-sky-700 sm:w-auto"
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
