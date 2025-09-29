import { LayoutGrid, MessageSquareQuote, Palette, TimerReset } from 'lucide-react';

const features = [
  {
    title: 'Calm, guided canvases',
    description:
      'Beautiful Excalidraw frames with timers, agendas and prompts built in — ready to duplicate for every ritual.',
    icon: LayoutGrid,
  },
  {
    title: 'Facilitation superpowers',
    description:
      'Dot voting, focus mode and breakout spaces run smoothly without leaving the board or breaking the flow.',
    icon: TimerReset,
  },

  {
    title: 'Brand-native visuals',
    description:
      'Lock in colors, typography and reusable libraries so every workshop looks like your team — not a generic template.',
    icon: Palette,
  },
  {
    title: 'AI follow-ups that land',
    description:
      'Summaries, actions and highlights ship to Slack, Notion or Jira moments after everyone says goodbye.',
    icon: MessageSquareQuote,
  },
];

export default function FeatureHighlights() {
  return (
    <section
      id="features"
      className="bg-gradient-to-b from-[var(--color-company-bg)] via-white to-white py-24"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-14 px-6 lg:flex-row lg:items-start lg:gap-20 lg:px-12">
        <div className="max-w-xl space-y-6">
          <p className="inline-flex items-center rounded-full bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-600 shadow-sm">
            Built for facilitators
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Everything you need to guide brilliant collaboration, without the chaos.
          </h2>
          <p className="text-lg text-slate-600">
            colabboard layers structure, presence and thoughtful automation onto the Excalidraw
            canvas so your team can stay focused on outcomes.
          </p>
        </div>

        <div className="grid flex-1 gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-3xl border border-white/70 bg-white/90 p-6 shadow-[0_45px_90px_-70px_rgba(79,155,255,0.45)] backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_55px_120px_-70px_rgba(138,107,255,0.45)]"
            >
              <div
                className="absolute -right-10 -top-10 h-28 w-28 rounded-full"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(79,155,255,0.18), rgba(96,246,195,0.18))',
                }}
                aria-hidden
              />
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-logo-blue)]/15 text-[var(--color-logo-blue)]">
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
