'use client';

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock,
  Download,
  ListChecks,
  NotebookPen,
  Share2,
  Sparkles,
  Users
} from 'lucide-react';

import { BrandLogo } from '@/components/BrandLogo';
import { Button } from '@/components/ui/button';

const Excalidraw = dynamic(
  () => import('@excalidraw/excalidraw').then((mod) => mod.Excalidraw),
  { ssr: false }
);

type Stage = {
  id: string;
  title: string;
  duration: string;
  description: string;
  checklist: string[];
  tags: string[];
};

type Template = {
  id: string;
  name: string;
  description: string;
};

type SummarySet = {
  headline: string;
  summary: string;
  insights: string[];
  followUps: string[];
};

type Participant = {
  initials: string;
  name: string;
  role: string;
  color: string;
};

type InitialData = {
  appState: {
    theme: 'light' | 'dark';
    currentItemStrokeColor: string;
    currentItemBackgroundColor: string;
    viewBackgroundColor: string;
    gridModeEnabled: boolean;
  };
};

const stages: Stage[] = [
  {
    id: 'intent',
    title: 'Arrival & Intent',
    duration: '05 min',
    description:
      'Warm the room, remind the team what momentum looks like, and capture intentions before you dive into the map.',
    checklist: [
      'Clarify today\'s objective and success signals',
      'Invite each squad to share a current friction',
      'Pin priorities to the warm-up frame'
    ],
    tags: ['Group warm-up', 'Live note capture']
  },
  {
    id: 'friction',
    title: 'Map Friction & Signals',
    duration: '12 min',
    description:
      'Work the canvas in silence first, then narrate the hotspots. Group stickies by the journey moments that feel fragile.',
    checklist: [
      'Timebox silent sticky pass (5 min)',
      'Cluster issues by customer journey stage',
      'Highlight blockers with red tag marker'
    ],
    tags: ['Silent ideation', 'Affinity clustering']
  },
  {
    id: 'decide',
    title: 'Vote & Decide',
    duration: '08 min',
    description:
      'Bring focus to the friction that matters. Use the guided votes to prioritise, then ask: what action unlocks momentum now?',
    checklist: [
      'Run 2-dot vote with live cursors',
      'Ask owner to narrate the winning cluster',
      'Capture decision + owner on the commitments card'
    ],
    tags: ['Live votes', 'Decision log']
  },
  {
    id: 'next',
    title: 'Next Steps & Broadcast',
    duration: '06 min',
    description:
      'Package the learning while the energy is high. Auto-publish the AI notes to your delivery tools and define the next check-in.',
    checklist: [
      'Summarise top 3 insights with AI co-pilot',
      'Push action items to Linear + Notion',
      'Schedule retro follow-up in calendar'
    ],
    tags: ['AI notes', 'Workflow handoff']
  }
];

const templates: Template[] = [
  {
    id: 'kickoff',
    name: 'Sprint Kickoff Ritual',
    description: 'Structured intent, brainstorm, vote and commit frames in 45 minutes.'
  },
  {
    id: 'research',
    name: 'Research Playback',
    description: 'Review insights, surface patterns and record reactions with AI summaries.'
  },
  {
    id: 'calibration',
    name: 'Weekly Calibration',
    description: '10-minute async canvas to pulse sentiment and unblock delivery.'
  }
];

const summarySets: SummarySet[] = [
  {
    headline: 'Momentum is lost at onboarding hand-off',
    summary:
      'The squad is confident in acquisition, but new teams churn at the configuration hand-off. AI grouped today\'s stickies into three breakpoints to fix next sprint.',
    insights: [
      'Top friction: "no live walkthrough" for new workspaces',
      'Two squads duplicated setup docs, signalling unclear ownership',
      'Latency in billing approvals stalls enterprise pilots for 4-6 days'
    ],
    followUps: [
      'Assign onboarding kit refresh to Growth Ops',
      'Draft shared "first week" checklist with Customer Success',
      'Coordinate legal + billing SLA review before next retro'
    ]
  },
  {
    headline: 'Experiment backlog outpaces delivery confidence',
    summary:
      'Voting concentrated on ideas that reduce ambiguity. Patterns show the squad needs faster validation loops and clearer guardrails for testing.',
    insights: [
      'Discovery work is blocked by inconsistent research briefs',
      'Design requests wait 3+ days because capacity isn\'t visible',
      'Ops sees repeat questions about how to measure success'
    ],
    followUps: [
      'Spin up shared experiment tracker in Notion',
      'Book paired synthesis session with Research on Tuesday',
      'Publish metric definitions as tooltips inside the ritual canvas'
    ]
  },
  {
    headline: 'Team energy spikes around customer narratives',
    summary:
      'When founders played back real customer quotes, alignment snapped into place. The AI co-pilot suggests baking narrative moments into every ritual.',
    insights: [
      'Customer storytelling drove two immediate commitments',
      'Ops wants reusable storyboard frame for future rituals',
      'Engineers requested async digest for teammates in APAC'
    ],
    followUps: [
      'Insert playback slot into recurring Monday ritual',
      'Auto-send digest clip to APAC engineering channel',
      'Produce template narrative cards with visuals and metrics'
    ]
  }
];

const participants: Participant[] = [
  { initials: 'AK', name: 'Amelia Khan', role: 'Facilitator', color: 'bg-sky-100 text-sky-700' },
  { initials: 'JM', name: 'Jesse Miller', role: 'Product', color: 'bg-emerald-100 text-emerald-700' },
  { initials: 'LS', name: 'Lina Soto', role: 'Design', color: 'bg-amber-100 text-amber-700' },
  { initials: 'EV', name: 'Ethan Voss', role: 'Engineering', color: 'bg-violet-100 text-violet-700' }
];

type StageCardProps = {
  stage: Stage;
  isActive: boolean;
  completedItems: number;
  onClick: () => void;
  variant?: 'default' | 'compact';
};

function StageCard({ stage, isActive, completedItems, onClick, variant = 'default' }: StageCardProps) {
  const totalItems = stage.checklist.length;
  const padding = variant === 'compact' ? 'px-4 py-3' : 'px-4 py-4';
  const descriptionVisible = variant !== 'compact';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-3xl border text-left transition-all ${
        isActive
          ? 'border-slate-900 bg-slate-900 text-white shadow-[0_25px_60px_-45px_rgba(15,23,42,0.45)]'
          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
      } ${padding}`}
    >
      <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.28em]">
        <span>{stage.duration}</span>
        <span>
          {completedItems}/{totalItems}
        </span>
      </div>
      <h3 className={`mt-3 text-base font-semibold ${isActive ? 'text-white' : 'text-slate-800'}`}>{stage.title}</h3>
      {descriptionVisible && (
        <p className={`mt-2 text-xs leading-relaxed ${isActive ? 'text-white/70' : 'text-slate-400'}`}>{stage.description}</p>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        {stage.tags.map((tag) => (
          <span
            key={tag}
            className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium ${
              isActive ? 'bg-white/15 text-white' : 'bg-slate-900/5 text-slate-500'
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
}

export default function DrawPage() {
  const [activeStageId, setActiveStageId] = useState(stages[0].id);
  const [summaryIndex, setSummaryIndex] = useState(0);
  const [checklistProgress, setChecklistProgress] = useState<Record<string, boolean>>({});
  const [actionedFollowUps, setActionedFollowUps] = useState<Record<string, boolean>>({});
  const [isStageMenuOpen, setIsStageMenuOpen] = useState(false);

  const activeStage = useMemo(
    () => stages.find((stage) => stage.id === activeStageId) ?? stages[0],
    [activeStageId]
  );

  const summary = summarySets[summaryIndex];

  const toggleChecklistItem = (stageId: string, item: string) => {
    const key = `${stageId}:${item}`;
    setChecklistProgress((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const toggleFollowUp = (item: string) => {
    setActionedFollowUps((prev) => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const handleCycleSummary = () => {
    setSummaryIndex((prev) => (prev + 1) % summarySets.length);
  };

  const checklistCompletion = useMemo(() => {
    const total = activeStage.checklist.length;
    const completed = activeStage.checklist.filter((item) => checklistProgress[`${activeStage.id}:${item}`]).length;
    return Math.round((completed / total) * 100);
  }, [activeStage, checklistProgress]);

  const initialData = useMemo<InitialData>(
    () => ({
      appState: {
        theme: 'light',
        currentItemStrokeColor: '#0f172a',
        currentItemBackgroundColor: '#0f172a11',
        viewBackgroundColor: '#f8fafc',
        gridModeEnabled: true
      }
    }),
    []
  );

  const renderStageCard = (stage: Stage, variant: 'default' | 'compact' = 'default') => (
    <StageCard
      key={`${variant}-${stage.id}`}
      stage={stage}
      isActive={stage.id === activeStage.id}
      completedItems={stage.checklist.filter((item) => checklistProgress[`${stage.id}:${item}`]).length}
      onClick={() => {
        setActiveStageId(stage.id);
        setIsStageMenuOpen(false);
      }}
      variant={variant}
    />
  );

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6 lg:px-8">
        <div className="flex flex-1 min-w-0 items-center gap-3">
          <Link href="/" className="flex flex-shrink-0 items-center gap-2 text-slate-600">
            <BrandLogo className="h-9 w-auto" withWordmark />
          </Link>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
              <span className="flex items-center gap-1 rounded-full bg-slate-900/5 px-3 py-1 text-[10px] tracking-[0.3em] text-slate-600">
                Ritual
              </span>
              Product Sprint Session 08
            </div>
            <p className="mt-1 text-sm text-slate-400">Guided workspace for hybrid rituals with AI notes & handoffs.</p>
          </div>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <div className="flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600">
            <Clock className="h-4 w-4 text-slate-400" />
            24:12 remaining
          </div>
          <Button
            variant="outline"
            className="w-full border-slate-200 bg-white text-slate-700 hover:bg-slate-50 sm:w-auto"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Invite team
          </Button>
          <Button className="w-full bg-slate-900 text-white shadow-[0_25px_60px_-45px_rgba(15,23,42,0.65)] hover:bg-slate-800 sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Export ritual
          </Button>
        </div>
      </header>

      <div className="flex flex-1 flex-col lg:flex-row lg:overflow-hidden">
        <aside className="hidden w-full flex-shrink-0 flex-col border-b border-slate-200 bg-white shadow-sm lg:flex lg:w-80 lg:max-w-sm lg:border-b-0 lg:border-r lg:shadow-none lg:resize-x">
          <div className="border-b border-slate-200 px-6 pb-5 pt-6">
            <h2 className="text-sm font-semibold text-slate-700">Ritual flow</h2>
            <p className="mt-1 text-xs text-slate-400">Guided steps with timers, prompts and auto-notes.</p>
          </div>
          <nav className="flex-1 space-y-2 overflow-y-auto px-5 pb-6 pt-4 lg:min-h-0">
            {stages.map((stage) => renderStageCard(stage))}
          </nav>
          <div className="border-t border-slate-200 px-6 pb-6 pt-5">
            <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
              <span>Library</span>
              <Link href="#" className="text-slate-500 transition hover:text-slate-900">
                View all
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {templates.map((template) => (
                <div key={template.id} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-slate-700">{template.name}</p>
                  <p className="mt-1 text-xs text-slate-400">{template.description}</p>
                  <button className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-slate-600 transition hover:text-slate-900">
                    <ArrowRight className="h-3.5 w-3.5" />
                    Load canvas
                  </button>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main className="flex flex-1 flex-col bg-slate-50/60 lg:min-h-0">
          <section className="border-b border-slate-200 bg-white px-4 py-6 shadow-sm sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,1fr),22rem] lg:items-start lg:gap-12">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">Current stage</p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-900">{activeStage.title}</h2>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600">
                    <Sparkles className="h-4 w-4 text-slate-400" />
                    AI co-pilot live
                  </div>
                </div>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-500">{activeStage.description}</p>
                <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                  <div className="flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-4">
                    <Users className="h-4 w-4 text-slate-400" />
                    4 live collaborators
                  </div>
                  <div className="flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-4">
                    <ListChecks className="h-4 w-4 text-slate-400" />
                    {checklistCompletion}% checklist
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
                  <span>Checklist</span>
                  <span>
                    {activeStage.checklist.filter((item) => checklistProgress[`${activeStage.id}:${item}`]).length}/
                    {activeStage.checklist.length}
                  </span>
                </div>
                <ul className="mt-3 space-y-2">
                  {activeStage.checklist.map((item) => {
                    const checked = Boolean(checklistProgress[`${activeStage.id}:${item}`]);
                    return (
                      <li key={item}>
                        <button
                          type="button"
                          onClick={() => toggleChecklistItem(activeStage.id, item)}
                          className={`flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left text-sm transition ${
                            checked
                              ? 'border-slate-900 bg-slate-900 text-white'
                              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <span
                            className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold ${
                              checked
                                ? 'border-transparent bg-white/15 text-white'
                                : 'border-slate-200 bg-slate-100 text-slate-500'
                            }`}
                          >
                            {checked ? <Check className="h-4 w-4" /> : activeStage.checklist.indexOf(item) + 1}
                          </span>
                          <span className={checked ? 'text-white' : 'text-slate-600'}>{item}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4 lg:hidden">
              <button
                type="button"
                onClick={() => setIsStageMenuOpen((prev) => !prev)}
                className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-slate-600 shadow-sm"
              >
                <span>Ritual flow</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isStageMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              {isStageMenuOpen && (
                <div className="grid gap-2">
                  {stages.map((stage) => renderStageCard(stage, 'compact'))}
                </div>
              )}

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
                  <span>Library</span>
                  <Link href="#" className="text-slate-500 transition hover:text-slate-900">
                    View all
                  </Link>
                </div>
                <div className="mt-3 space-y-3">
                  {templates.map((template) => (
                    <div key={`mobile-${template.id}`} className="rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="text-sm font-semibold text-slate-700">{template.name}</p>
                      <p className="mt-1 text-xs text-slate-400">{template.description}</p>
                      <button className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-slate-600 transition hover:text-slate-900">
                        <ArrowRight className="h-3.5 w-3.5" />
                        Load canvas
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="flex flex-1 flex-col gap-6 px-4 pb-12 pt-6 sm:px-6 lg:px-8 lg:min-h-0">
            <div className="relative flex-1 min-h-[320px] overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_45px_120px_-60px_rgba(15,23,42,0.35)]">
              <Excalidraw
                initialData={initialData}
                UIOptions={{ canvasActions: { loadScene: false } }}
                renderTopRightUI={() => (
                  <div className="flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-500 shadow-sm">
                    <Sparkles className="h-3.5 w-3.5 text-slate-400" />
                    Ritual template locked in
                  </div>
                )}
              />
            </div>

            <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/90 px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-3">
                {participants.map((participant) => (
                  <div key={participant.initials} className="flex items-center gap-3">
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full border border-white text-[11px] font-semibold shadow-sm ${participant.color}`}
                    >
                      {participant.initials}
                    </span>
                    <div className="hidden text-xs text-slate-500 sm:block">
                      <p className="font-semibold text-slate-600">{participant.name}</p>
                      <p>{participant.role}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Sparkles className="h-4 w-4 text-slate-300" />
                Ritual autosaves to cloud • Live cursors synced
              </div>
            </div>
          </section>
        </main>

        <aside className="border-t border-slate-200 bg-white shadow-inner lg:order-3 lg:flex lg:w-full lg:max-w-sm lg:flex-shrink-0 lg:border-t-0 lg:border-l lg:shadow-none lg:resize-x xl:max-w-md">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-5 sm:px-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">AI notes</p>
              <h2 className="mt-1 text-lg font-semibold text-slate-900">Workshop digest</h2>
            </div>
            <Button
              variant="outline"
              className="border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              onClick={handleCycleSummary}
            >
              <Sparkles className="mr-2 h-4 w-4 text-slate-400" />
              Refresh
            </Button>
          </div>

          <div className="flex max-h-[520px] flex-1 flex-col gap-8 overflow-y-auto px-4 pb-8 pt-6 sm:px-6 lg:max-h-none">
            <section className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">Headline</p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">{summary.headline}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">{summary.summary}</p>
            </section>

            <section>
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-slate-700">Top insights</h4>
                <span className="text-xs text-slate-400">AI grouped • Updated just now</span>
              </div>
              <ul className="mt-3 space-y-2">
                {summary.insights.map((insight) => (
                  <li key={insight} className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
                    <div className="flex items-start gap-3">
                      <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900/5 text-[11px] font-semibold text-slate-500">
                        <Sparkles className="h-3.5 w-3.5 text-slate-400" />
                      </span>
                      <span>{insight}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-slate-700">Follow-up commitments</h4>
                <span className="text-xs text-slate-400">Auto-sync to your tools</span>
              </div>
              <ul className="mt-3 space-y-2">
                {summary.followUps.map((item) => {
                  const actioned = Boolean(actionedFollowUps[item]);
                  return (
                    <li key={item}>
                      <button
                        type="button"
                        onClick={() => toggleFollowUp(item)}
                        className={`flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition ${
                          actioned
                            ? 'border-slate-900 bg-slate-900 text-white'
                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={`mt-1 flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold ${
                              actioned
                                ? 'border-transparent bg-white/15 text-white'
                                : 'border-slate-200 bg-slate-100 text-slate-500'
                            }`}
                          >
                            {actioned ? <Check className="h-4 w-4" /> : '→'}
                          </span>
                          <span className={actioned ? 'text-white' : 'text-slate-600'}>{item}</span>
                        </div>
                        <span className={`text-xs font-semibold ${actioned ? 'text-white/70' : 'text-slate-400'}`}>
                          {actioned ? 'Synced' : 'Send'}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">Broadcast</p>
                  <h4 className="mt-2 text-sm font-semibold text-slate-700">Push ritual digest</h4>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    Ship notes and boards to Notion, Linear and Slack with one click. The share includes recordings and vote data.
                  </p>
                </div>
                <NotebookPen className="h-10 w-10 text-slate-200" />
              </div>
              <Button className="mt-4 w-full bg-slate-900 text-white shadow-[0_25px_60px_-40px_rgba(15,23,42,0.55)] hover:bg-slate-800">
                Push to Notion & Slack
              </Button>
            </section>
          </div>
        </aside>
      </div>
    </div>
  );
}
