import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote:
      'The built-in rituals mean I spend my energy facilitating instead of wrestling with tools. Our product reviews are faster and far more actionable.',
    name: 'Priya Narayanan',
    role: 'Director of Product, Baseflow'
  },
  {
    quote:
      'My distributed design team finally feels like we’re in the same room. The Excalidraw frames are gorgeous out of the box and easy to customize.',
    name: 'Leo Morales',
    role: 'Head of Design Ops, Nova Bank'
  },
  {
    quote:
      'Colabboard turned chaotic brainstorming into a measurable process. Stakeholders join for 30 minutes and leave with clear decisions and owners.',
    name: 'Sasha Kim',
    role: 'Chief of Staff, Fieldnote'
  }
];

export default function Testimonials() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl space-y-4">
            <p className="inline-flex items-center rounded-full bg-slate-900/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-600">
              Loved by modern teams
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              The facilitation layer that keeps remote, hybrid and in-person rituals energised.
            </h2>
          </div>
          <div className="text-sm text-slate-500">
            Trusted inside product orgs at <span className="font-semibold text-slate-700">Intercom</span>,{' '}
            <span className="font-semibold text-slate-700">Ramp</span> and <span className="font-semibold text-slate-700">Figma</span>.
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="flex h-full flex-col gap-6 rounded-3xl border border-slate-200 bg-slate-50/80 p-8 shadow-[0_50px_110px_-80px_rgba(15,23,42,0.6)]"
            >
              <Quote className="h-8 w-8 text-slate-400" />
              <p className="text-lg leading-relaxed text-slate-600">“{testimonial.quote}”</p>
              <div className="mt-auto">
                <div className="text-base font-semibold text-slate-900">{testimonial.name}</div>
                <div className="text-sm text-slate-500">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
