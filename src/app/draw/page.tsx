'use client';

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";

import { BrandLogo } from "@/components/BrandLogo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Bot,
  CheckCircle2,
  CircleDot,
  Focus,
  LayoutGrid,
  MessageSquare,
  Palette,
  Send,
  Sparkles,
  Target,
  Timer,
  Users
} from "lucide-react";

const Excalidraw = dynamic(
  () => import("@excalidraw/excalidraw").then((mod) => mod.Excalidraw),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
        Preparing your collaborative canvas…
      </div>
    )
  }
);

type AgendaItem = {
  title: string;
  description: string;
  duration: string;
  status: "complete" | "active" | "up-next";
};

const agenda: AgendaItem[] = [
  {
    title: "Arrival & priming",
    description: "Quick wins, energy check and context sharing",
    duration: "05 min",
    status: "complete"
  },
  {
    title: "Frame sprint challenge",
    description: "Define friction moments from the last launch",
    duration: "15 min",
    status: "active"
  },
  {
    title: "Diverge & cluster",
    description: "Capture ideas, auto-cluster themes and vote",
    duration: "20 min",
    status: "up-next"
  },
  {
    title: "Decide & plan",
    description: "Assign owners, clarify experiments and next steps",
    duration: "15 min",
    status: "up-next"
  }
];

const ritualKits = [
  {
    label: "Sprint ritual",
    description: "Structured warmups, lightning demos and votes",
    accent: "from-sky-100 via-white to-white"
  },
  {
    label: "Research playback",
    description: "Highlight key clips and dot vote on insights",
    accent: "from-emerald-100 via-white to-white"
  },
  {
    label: "Decision jam",
    description: "Frame problems, swarm solutions and select",
    accent: "from-amber-100 via-white to-white"
  }
];

const participants = [
  { initials: "AK", name: "Amelia Kim", role: "Facilitator", status: "Timer owner" },
  { initials: "LS", name: "Luca Singh", role: "Design", status: "Adding stickies" },
  { initials: "JM", name: "Jordan Moss", role: "Product", status: "Dot voting" },
  { initials: "EV", name: "Esha Verne", role: "Research", status: "Summarising" }
];

const followUps = [
  {
    channel: "Slack",
    description: "Workshop digest scheduled for #growth-experiments",
    icon: MessageSquare
  },
  {
    channel: "Notion",
    description: "Synthesis doc ready in ‘Sprint rituals’ space",
    icon: LayoutGrid
  },
  {
    channel: "Jira",
    description: "Three actions drafted as tickets for triage",
    icon: Target
  }
];

type VotingPhase = "warmup" | "dot-voting" | "review";

function useStageTimer(initialSeconds: number) {
  const [secondsRemaining, setSecondsRemaining] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const minutes = useMemo(() => Math.floor(secondsRemaining / 60).toString().padStart(2, "0"), [secondsRemaining]);
  const seconds = useMemo(() => (secondsRemaining % 60).toString().padStart(2, "0"), [secondsRemaining]);

  const toggle = () => setIsRunning((prev) => !prev);
  const reset = (seconds: number) => {
    setSecondsRemaining(seconds);
    setIsRunning(false);
  };

  return { minutes, seconds, secondsRemaining, isRunning, toggle, reset, setSecondsRemaining, setIsRunning };
}

export default function DrawPage() {
  const [votingPhase, setVotingPhase] = useState<VotingPhase>("warmup");
  const [focusMode, setFocusMode] = useState(false);
  const { minutes, seconds, isRunning, toggle, reset } = useStageTimer(15 * 60);

  return (
    <div className="flex h-screen flex-col bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <header className="flex items-center justify-between border-b border-slate-200/70 bg-white/60 px-10 py-6 backdrop-blur">
        <div className="flex items-center gap-4">
          <BrandLogo withWordmark />
          <div className="hidden h-8 w-px bg-slate-200 sm:block" aria-hidden />
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Sprint ritual · Week 12</p>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Users className="h-4 w-4" />
              <span>4 collaborators in canvas</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-slate-200 bg-white/80 text-slate-700 hover:bg-slate-50">
            Share session
          </Button>
          <Button className="bg-slate-900 text-white shadow-[0_20px_45px_-24px_rgba(15,23,42,0.65)] hover:bg-slate-800">
            Export canvas
          </Button>
        </div>
      </header>

      <main className="flex flex-1 gap-6 overflow-hidden px-8 py-6">
        <section className="hidden w-[320px] flex-col gap-6 lg:flex">
          <Card className="flex-1 overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-slate-500" /> Ritual agenda
              </CardTitle>
              <CardDescription>
                Guided frames, timed prompts and live facilitation states keep everyone focused.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pb-8">
              {agenda.map((item) => (
                <div
                  key={item.title}
                  className={cn(
                    "rounded-3xl border px-5 py-4 transition",
                    item.status === "active" && "border-slate-900/60 bg-slate-900/5",
                    item.status === "complete" && "border-slate-200 bg-white/60",
                    item.status === "up-next" && "border-slate-200/70 bg-white/40"
                  )}
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-slate-400">
                    <span>{item.duration}</span>
                    {item.status === "complete" && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                    {item.status === "active" && <CircleDot className="h-4 w-4 text-slate-900" />}
                    {item.status === "up-next" && <CircleDot className="h-4 w-4 text-slate-300" />}
                  </div>
                  <p className="mt-3 text-sm font-semibold text-slate-800">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="space-y-4 p-6">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              <span>Template kits</span>
              <LayoutGrid className="h-4 w-4 text-slate-400" />
            </div>
            <div className="space-y-3">
              {ritualKits.map((kit) => (
                <button
                  key={kit.label}
                  className="w-full rounded-3xl border border-slate-200 bg-white/80 p-4 text-left transition hover:-translate-y-0.5 hover:shadow-[0_25px_60px_-35px_rgba(15,23,42,0.35)]"
                >
                  <div className={cn("rounded-2xl bg-gradient-to-br p-3 text-xs font-semibold text-slate-700", kit.accent)}>
                    {kit.label}
                  </div>
                  <p className="mt-3 text-xs text-slate-500">{kit.description}</p>
                </button>
              ))}
            </div>
          </Card>
        </section>

        <section className="flex min-w-0 flex-1 flex-col gap-6">
          <Card className="flex h-full flex-col overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/70 bg-white/70 px-8 py-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Current frame</p>
                <div className="mt-2 flex items-center gap-3 text-sm text-slate-600">
                  <div className="flex items-center gap-2 rounded-full bg-slate-900/5 px-3 py-1">
                    <Palette className="h-4 w-4 text-slate-500" />
                    <span>Story map playground</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-slate-900/5 px-3 py-1">
                    <Target className="h-4 w-4 text-slate-500" />
                    <span>Goal: remove adoption friction</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-white/60 px-4 py-3 text-sm text-slate-600">
                <Timer className="h-5 w-5 text-slate-500" />
                <span className="text-2xl font-semibold tracking-tight text-slate-900">
                  {minutes}:{seconds}
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={toggle}
                    className="border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  >
                    {isRunning ? "Pause" : "Resume"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => reset(15 * 60)}
                    className="border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </div>

            <div className="relative flex flex-1 flex-col bg-slate-50/80">
              <div className="absolute inset-0">
                <Excalidraw />
              </div>
              <div className="pointer-events-none absolute left-8 top-8 flex max-w-sm flex-col gap-4 text-xs text-slate-500">
                <div className="rounded-3xl border border-white/60 bg-white/90 p-4 shadow-[0_25px_70px_-45px_rgba(15,23,42,0.35)]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-400">Prompt</p>
                  <p className="mt-2 text-sm font-semibold text-slate-800">&ldquo;Where do teams stall adopting the ritual?&rdquo;</p>
                  <p className="mt-1 text-xs text-slate-500">Capture ideas in stickies. Themes cluster automatically.</p>
                </div>
                <div className="rounded-3xl border border-white/60 bg-white/90 p-4 shadow-[0_25px_70px_-45px_rgba(15,23,42,0.35)]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-400">Facilitator cue</p>
                  <p className="mt-2 text-xs text-slate-500">Focus mode hides sidebars for participants until reveal.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200/70 bg-white/70 px-8 py-6">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                <span>Dot voting</span>
                <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium text-slate-600">
                  <Sparkles className="h-3.5 w-3.5 text-slate-400" />
                  Auto cluster insights
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                {["warmup", "dot-voting", "review"].map((phase) => (
                  <button
                    key={phase}
                    onClick={() => setVotingPhase(phase as VotingPhase)}
                    className={cn(
                      "rounded-full border px-4 py-2 capitalize transition",
                      votingPhase === phase
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                    )}
                  >
                    {phase.replace('-', ' ')}
                  </button>
                ))}
                <button
                  onClick={() => setFocusMode((prev) => !prev)}
                  className={cn(
                    "flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition",
                    focusMode ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                  )}
                >
                  <Focus className="h-4 w-4" />
                  {focusMode ? "Focus mode on" : "Focus mode"}
                </button>
              </div>
            </div>
          </Card>
        </section>

        <aside className="hidden w-[320px] flex-col gap-6 lg:flex">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-slate-500" /> Collaborators
              </CardTitle>
              <CardDescription>Live cursors and roles keep everyone in sync.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pb-8">
              {participants.map((participant) => (
                <div
                  key={participant.initials}
                  className="flex items-start gap-3 rounded-3xl border border-slate-200 bg-white/80 p-4"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900/5 text-sm font-semibold text-slate-700">
                    {participant.initials}
                  </span>
                  <div className="space-y-1 text-sm text-slate-600">
                    <p className="font-semibold text-slate-800">{participant.name}</p>
                    <p className="text-xs uppercase tracking-[0.26em] text-slate-400">{participant.role}</p>
                    <p className="text-xs text-slate-500">{participant.status}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bot className="h-5 w-5 text-slate-500" /> AI notes queue
              </CardTitle>
              <CardDescription>Summaries land moments after you wrap.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pb-8 text-sm text-slate-600">
              <div className="rounded-3xl border border-slate-200 bg-white/80 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Highlights</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                    Beta users stalled onboarding at &ldquo;invite teammates&rdquo; step.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                    Biggest opportunity is pre-populating templates with brand assets.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                    Esha to validate friction with five onboarding interviews.
                  </li>
                </ul>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white/80 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Auto follow-ups</p>
                <div className="mt-3 space-y-3">
                  {followUps.map((item) => (
                    <div key={item.channel} className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white/90 p-3">
                      <item.icon className="mt-0.5 h-4 w-4 text-slate-500" />
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{item.channel}</p>
                        <p className="text-xs text-slate-500">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white/80 p-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Share recap</p>
                  <p className="text-sm text-slate-600">Send decisions to stakeholders instantly.</p>
                </div>
                <Button size="sm" className="bg-slate-900 text-white hover:bg-slate-800">
                  <Send className="mr-2 h-4 w-4" /> Ship
                </Button>
              </div>
            </CardContent>
          </Card>
        </aside>
      </main>
    </div>
  );
}
