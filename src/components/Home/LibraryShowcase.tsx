import { ArrowUpRight } from 'lucide-react';

const boards = [
  {
    title: 'Launch blueprint',
    description: 'A structured journey from kickoff to retrospective with voting rounds built in.',
    tags: ['Product', 'Sprint'],
    gradient: 'linear-gradient(135deg, rgba(79,155,255,0.18), rgba(255,255,255,0.92))',
    accentColor: 'var(--color-logo-blue)',
    accentBackground: 'rgba(79,155,255,0.18)',
  },
  {
    title: 'Insight mural',
    description:
      'Capture research learnings, cluster themes and let AI draft playback slides for you.',
    tags: ['Research', 'AI'],
    gradient: 'linear-gradient(135deg, rgba(96,246,195,0.22), rgba(255,255,255,0.92))',
    accentColor: 'var(--color-logo-mint)',
    accentBackground: 'rgba(96,246,195,0.25)',
  },
  {
    title: 'Leadership huddle',
    description: 'Weekly rituals with metrics, blockers and focus questions that reset the team.',
    tags: ['Ops', 'Rhythm'],
    gradient: 'linear-gradient(135deg, rgba(138,107,255,0.22), rgba(255,255,255,0.92))',
    accentColor: 'var(--color-logo-purple)',
    accentBackground: 'rgba(138,107,255,0.22)',
  },
];

export default function LibraryShowcase() {
  return (
    <section
      id="library"
      className="bg-gradient-to-b from-white via-[var(--color-company-bg)]/80 to-white py-24"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col gap-6 text-center">
          <p className="mx-auto inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-600 shadow-sm">
            Template library
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Crafted artifacts that feel AI-assisted, ready to remix.
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Start from curated rituals inspired by high-performing teams. Every board layers in
            motion, color and clarity — no monk mascots required.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-7">
          {boards.map((board, i) => (
            <div
              key={board.title}
              className={`
                group relative overflow-hidden rounded-[32px] border border-white/60 bg-white/90 p-6
                shadow-[0_55px_120px_-70px_rgba(79,155,255,0.35)] backdrop-blur transition
                hover:-translate-y-2 hover:shadow-[0_60px_140px_-70px_rgba(138,107,255,0.45)]
                ${i === 1 ? 'md:col-span-3 -translate-y-4' : 'md:col-span-2'}
              `}
            >
              {/* Background gradient */}
              <div
                className="absolute inset-0 opacity-80"
                style={{ background: board.gradient }}
                aria-hidden
              />
              <div
                className="absolute -left-10 top-1/4 h-32 w-32 rotate-12 rounded-3xl bg-white/70 blur-2xl"
                aria-hidden
              />
              <div
                className="absolute -right-16 bottom-8 h-36 w-36 -rotate-6 rounded-full bg-white/40 blur-3xl"
                aria-hidden
              />

              {/* Card content */}
              <div className="relative flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <span
                    className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium"
                    style={{
                      backgroundColor: board.accentBackground,
                      color: board.accentColor,
                    }}
                  >
                    {board.tags.join(' • ')}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-slate-400 transition group-hover:text-slate-700" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{board.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{board.description}</p>

                {/* Example inner panel */}
                <div className="relative mt-6 h-65 overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-4 shadow-[0_30px_80px_-65px_rgba(15,23,42,0.5)]">
                  <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(79,155,255,0.12),_transparent_60%)]"
                    aria-hidden
                  />
                  <div className="relative flex h-full flex-col justify-between text-xs text-slate-500">
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.25em] pb-2">
                      <span>Agenda</span>
                      <span>Live</span>
                    </div>
                    <div className="space-y-2">
                      <div className="rounded-2xl border border-slate-100 bg-white/90 p-3 shadow-sm">
                        <div className="text-[11px] font-semibold text-slate-400">Step 1</div>
                        <div className="text-sm font-semibold text-slate-800">Warm-up sketch</div>
                        <div className="text-xs text-slate-400">
                          2 min timer • everyone contributes
                        </div>
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
