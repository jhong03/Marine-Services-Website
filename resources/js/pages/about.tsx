import { Head, Link } from '@inertiajs/react';
import { Compass, Heart, Users, ArrowRight } from 'lucide-react';
import PublicLayout from '@/layouts/public-layout';

const VALUES = [
    {
        icon: Compass,
        title: 'Craftsmanship',
        description: 'We do the job properly the first time, with attention to every detail.',
    },
    {
        icon: Heart,
        title: 'Honesty',
        description: 'Clear quotes, straight advice, and no work done without your say-so.',
    },
    {
        icon: Users,
        title: 'Local & loyal',
        description: 'A part of the boating community, looking after our customers for the long haul.',
    },
];

export default function About() {
    return (
        <PublicLayout>
            <Head title="About Us" />

            <section className="bg-gradient-to-br from-slate-900 to-sky-900 text-white">
                <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">About Us</h1>
                    <p className="mt-4 max-w-2xl text-lg text-slate-300">
                        A team of dedicated marine professionals committed to keeping your vessel in
                        top condition.
                    </p>
                </div>
            </section>

            <section className="bg-white py-20">
                <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                            Our story
                        </h2>
                        <div className="mt-4 space-y-4 text-lg leading-relaxed text-slate-600">
                            <p>
                                <span className="font-medium text-slate-800">
                                    [Placeholder company story]
                                </span>{' '}
                                — Marine Services was founded with a simple goal: deliver
                                dependable, honest marine servicing the local boating community can
                                trust.
                            </p>
                            <p>
                                Over the years we've grown from a single workshop into a full-service
                                marine operation, but our values haven't changed. This copy is a
                                placeholder — share your real history and we'll bring it to life.
                            </p>
                        </div>
                    </div>
                    <div className="rounded-3xl bg-gradient-to-br from-sky-600 to-cyan-500 p-10 text-white shadow-xl">
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <div className="text-4xl font-bold">20+</div>
                                <div className="mt-1 text-sm text-sky-100">Years experience</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold">1,200+</div>
                                <div className="mt-1 text-sm text-sky-100">Vessels serviced</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold">15</div>
                                <div className="mt-1 text-sm text-sky-100">Team members</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold">24/7</div>
                                <div className="mt-1 text-sm text-sky-100">Emergency support</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-slate-50 py-20">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                            What we stand for
                        </h2>
                    </div>
                    <div className="mt-12 grid gap-8 md:grid-cols-3">
                        {VALUES.map((value) => (
                            <div
                                key={value.title}
                                className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm"
                            >
                                <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                                    <value.icon className="h-6 w-6" />
                                </span>
                                <h3 className="mt-6 text-xl font-semibold text-slate-900">
                                    {value.title}
                                </h3>
                                <p className="mt-3 leading-relaxed text-slate-600">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-slate-900">
                <div className="mx-auto w-full max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold tracking-tight text-white">
                        Let's look after your vessel
                    </h2>
                    <Link
                        href="/contact"
                        className="mt-8 inline-flex items-center gap-2 rounded-md bg-sky-500 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-sky-400"
                    >
                        Contact us
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </section>
        </PublicLayout>
    );
}
