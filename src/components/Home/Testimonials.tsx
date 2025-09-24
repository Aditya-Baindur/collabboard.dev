import { Quote } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

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
    <section className="bg-slate-900 py-24 text-white">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">
              Trusted by facilitators everywhere
            </p>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
              Crafted for teams that care about the experience and the outcome.
            </h2>
          </div>
          <div className="text-sm text-slate-300">
            Loved by product, design and research teams at <span className="font-semibold text-white">Intercom</span>,{' '}
            <span className="font-semibold text-white">Ramp</span> and <span className="font-semibold text-white">Figma</span>.
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="bg-white/10 text-left text-slate-100">
              <CardContent className="flex h-full flex-col gap-6 p-8">
                <Quote className="h-8 w-8 text-emerald-300" />
                <p className="text-lg leading-relaxed text-slate-100/90">“{testimonial.quote}”</p>
                <div className="mt-auto">
                  <div className="text-base font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-slate-300">{testimonial.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
