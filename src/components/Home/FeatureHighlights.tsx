import { BrainCircuit, Clock, Palette, Wand2 } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    title: 'Facilitator playbooks',
    description:
      'Launch with timeboxed prompts, checklists and talking points that keep every workshop on track from welcome to retro.',
    icon: Wand2,
    accent: 'from-emerald-200/80 via-emerald-100 to-white'
  },
  {
    title: 'Real-time rituals',
    description:
      'Timers, polls and dot voting live inside each frame so you never leave the flow or lose momentum again.',
    icon: Clock,
    accent: 'from-sky-200/80 via-sky-100 to-white'
  },
  {
    title: 'Branded visuals in seconds',
    description:
      'Apply your design system with saved color palettes, typography rules and reusable Excalidraw components.',
    icon: Palette,
    accent: 'from-fuchsia-200/80 via-fuchsia-100 to-white'
  },
  {
    title: 'AI co-facilitator',
    description:
      'Summarize whiteboards into action plans, highlight patterns and suggest the next activity using your voice or chat.',
    icon: BrainCircuit,
    accent: 'from-amber-200/80 via-amber-100 to-white'
  }
];

export default function FeatureHighlights() {
  return (
    <section id="features" className="relative -mt-24 bg-slate-50 pb-24 pt-32">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-900 via-slate-900/80 to-transparent" aria-hidden />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 lg:px-12">
        <div className="max-w-3xl">
          <p className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
            Why teams love colabboard
          </p>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Build momentum from kickoff to follow-through with the toolkit built for modern facilitators.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Every interaction is co-created inside beautiful Excalidraw frames, structured into journeys that keep your team in sync
            and energized.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <Card key={feature.title} className="relative overflow-hidden">
              <div className={`absolute inset-x-0 top-0 h-1 w-full bg-gradient-to-r ${feature.accent}`} aria-hidden />
              <CardHeader className="min-h-[160px]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900/5 text-slate-900">
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-2xl font-semibold text-slate-900">{feature.title}</CardTitle>
                <CardDescription className="text-base text-slate-600">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between text-sm text-slate-500">
                <span>Designed for hybrid teams</span>
                <span className="font-medium text-emerald-600">Learn more →</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
