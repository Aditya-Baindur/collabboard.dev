import { ArrowUpRight } from 'lucide-react';

const boards = [
  {
    title: 'Launch blueprint',
    description: 'A structured journey from kickoff to retrospective with voting rounds built in.',
    tags: ['Product', 'Sprint'],
    gradient: 'from-[#E0ECFF] via-white to-white',
    accent: 'bg-[#4F9BFF]/10 text-[#326CD9]'
  },
  {
    title: 'Insight mural',
    description: 'Capture research learnings, cluster themes and let AI draft playback slides for you.',
    tags: ['Research', 'AI'],
    gradient: 'from-[#CFF6E4] via-white to-white',
    accent: 'bg-[#22C55E]/10 text-[#168A44]'
  },
  {
    title: 'Leadership huddle',
    description: 'Weekly rituals with metrics, blockers and focus questions that reset the team.',
    tags: ['Ops', 'Rhythm'],
    gradient: 'from-[#E8D9FF] via-white to-white',
    accent: 'bg-[#A855F7]/10 text-[#7C3AED]'
  }
];

export default function LibraryShowcase() {
  return (
    <section id="library" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <div className="flex flex-col gap-6 text-center">
          <p className="mx-auto inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Template library
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Crafted artifacts that feel AI-assisted, ready to remix.
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Start from curated rituals inspired by high-performing teams. Every board layers in motion, color and clarity — no monk mascots required.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {boards.map((board) => (
            <div
              key={board.title}
              className="group relative overflow-hidden rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_55px_120px_-70px_rgba(15,23,42,0.25)] transition hover:-translate-y-1"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${board.gradient} opacity-70`} aria-hidden />
              <div className="absolute -left-10 top-1/4 h-32 w-32 rotate-12 rounded-3xl bg-white/70 blur-2xl" aria-hidden />
              <div className="absolute -right-16 bottom-8 h-36 w-36 -rotate-6 rounded-full bg-white/40 blur-3xl" aria-hidden />

              <div className="relative flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium ${board.accent}`}>
                    {board.tags.join(' • ')}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-slate-400 transition group-hover:text-slate-700" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{board.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{board.description}</p>
                <div className="relative mt-6 h-40 overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-4 shadow-[0_30px_80px_-65px_rgba(15,23,42,0.5)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(79,155,255,0.12),_transparent_60%)]" aria-hidden />
                  <div className="relative flex h-full flex-col justify-between text-xs text-slate-500">
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.25em]">
                      <span>Agenda</span>
                      <span>Live</span>
                    </div>
                    <div className="space-y-2">
                      <div className="rounded-2xl border border-slate-100 bg-white/90 p-3 shadow-sm">
                        <div className="text-[11px] font-semibold text-slate-400">Step 1</div>
                        <div className="text-sm font-semibold text-slate-800">Warm-up sketch</div>
                        <div className="text-xs text-slate-400">2 min timer • everyone contributes</div>
                      </div>
                      <div className="rounded-2xl border border-slate-100 bg-white/90 p-3 shadow-sm">
                        <div className="text-[11px] font-semibold text-slate-400">Step 2</div>
                        <div className="text-sm font-semibold text-slate-800">Cluster & vote</div>
                        <div className="text-xs text-slate-400">AI suggests tags automatically</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Auto-exporting notes…</span>
                      <span>Notion + Slack</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
