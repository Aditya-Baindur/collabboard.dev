import { LayoutGrid, MessageSquareQuote, Palette, TimerReset } from 'lucide-react';

const features = [
  {
    title: 'Calm, guided canvases',
    description: 'Beautiful Excalidraw frames with timers, agendas and prompts built in — ready to duplicate for every ritual.',
    icon: LayoutGrid
  },
  {
    title: 'Facilitation superpowers',
    description: 'Dot voting, focus mode and breakout spaces run smoothly without leaving the board or breaking the flow.',
    icon: TimerReset
  },
  {
    title: 'Brand-native visuals',
    description: 'Lock in colors, typography and reusable libraries so every workshop looks like your team — not a generic template.',
    icon: Palette
  },
  {
    title: 'AI follow-ups that land',
    description: 'Summaries, actions and highlights ship to Slack, Notion or Jira moments after everyone says goodbye.',
    icon: MessageSquareQuote
  }
];

export default function FeatureHighlights() {
  return (
    <section id="features" className="bg-white py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-14 px-6 lg:flex-row lg:items-start lg:gap-20 lg:px-12">
        <div className="max-w-xl space-y-6">
          <p className="inline-flex items-center rounded-full bg-slate-900/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-600">
            Built for facilitators
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Everything you need to guide brilliant collaboration, without the chaos.
          </h2>
          <p className="text-lg text-slate-600">
            colabboard layers structure, presence and thoughtful automation onto the Excalidraw canvas so your team can stay focused on outcomes.
          </p>
        </div>

        <div className="grid flex-1 gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_45px_90px_-70px_rgba(15,23,42,0.6)] transition hover:-translate-y-1"
            >
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br from-slate-100 via-white to-transparent" aria-hidden />
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900/5 text-slate-700">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
