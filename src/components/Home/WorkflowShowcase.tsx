'use client';

import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import type { ExcalidrawInitialDataState } from '@excalidraw/excalidraw/dist/types/excalidraw/types';
import '@excalidraw/excalidraw/dist/excalidraw.min.css';

import { PenSquare, PlaySquare, Share2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

const Excalidraw = dynamic(async () => (await import('@excalidraw/excalidraw')).Excalidraw, {
  ssr: false
});

type WorkflowStep = {
  title: string;
  description: string;
  cta: string;
  icon: typeof PenSquare;
  scene: ExcalidrawInitialDataState;
};

const baseElement = (
  overrides: Record<string, unknown>,
  seed: number
): Record<string, unknown> => ({
  type: 'rectangle',
  version: 1,
  versionNonce: seed,
  isDeleted: false,
  id: `element-${seed}`,
  fillStyle: 'hachure',
  strokeWidth: 2,
  strokeStyle: 'solid',
  roughness: 1,
  opacity: 100,
  angle: 0,
  x: 0,
  y: 0,
  strokeColor: '#0f172a',
  backgroundColor: '#ffffff',
  width: 200,
  height: 120,
  seed,
  groupIds: [],
  frameId: null,
  roundness: null,
  boundElements: [],
  updated: 1,
  link: null,
  locked: false,
  index: 'a0',
  ...overrides
});

const textElement = (
  overrides: Record<string, unknown>,
  seed: number
): Record<string, unknown> => ({
  type: 'text',
  version: 1,
  versionNonce: seed,
  isDeleted: false,
  id: `text-${seed}`,
  fillStyle: 'hachure',
  strokeWidth: 1,
  strokeStyle: 'solid',
  roughness: 0,
  opacity: 100,
  angle: 0,
  x: 0,
  y: 0,
  strokeColor: '#0f172a',
  backgroundColor: 'transparent',
  width: 200,
  height: 40,
  seed,
  groupIds: [],
  frameId: null,
  roundness: null,
  boundElements: [],
  updated: 1,
  link: null,
  locked: false,
  text: 'Text',
  fontSize: 24,
  fontFamily: 1,
  textAlign: 'center',
  verticalAlign: 'middle',
  baseline: 28,
  containerId: null,
  originalText: 'Text',
  autoResize: true,
  lineHeight: 1.2 as unknown as number,
  ...overrides
});

const sticky = (
  seed: number,
  position: { x: number; y: number },
  color: string,
  text: string
): Record<string, unknown>[] => [
  baseElement(
    {
      x: position.x,
      y: position.y,
      width: 220,
      height: 150,
      backgroundColor: color,
      strokeColor: '#0f172a',
      index: `a${seed}`
    },
    seed
  ),
  textElement(
    {
      x: position.x + 10,
      y: position.y + 55,
      width: 200,
      height: 60,
      text,
      originalText: text,
      textAlign: 'left',
      verticalAlign: 'top',
      baseline: 20,
      lineHeight: 1.4 as unknown as number,
      fontSize: 18,
      strokeColor: '#0f172a'
    },
    seed + 1
  )
];

const boardFrame = (
  seed: number,
  overrides: Record<string, unknown> = {}
): Record<string, unknown> =>
  baseElement(
    {
      width: 620,
      height: 380,
      backgroundColor: '#f8fafc',
      strokeColor: '#0f172a',
      x: 40,
      y: 60,
      ...overrides
    },
    seed
  );

const scenes: WorkflowStep[] = [
  {
    title: 'Gather ideas in seconds',
    description: 'Launch your favorite template and invite the team. Everyone can sketch simultaneously inside structured frames.',
    cta: 'Start with the ideation kit',
    icon: PenSquare,
    scene: {
      elements: [
        boardFrame(1000),
        ...sticky(1010, { x: 100, y: 120 }, '#fef3c7', 'How might we onboard faster?'),
        ...sticky(1020, { x: 230, y: 180 }, '#bae6fd', 'Where do customers stumble?'),
        ...sticky(1030, { x: 360, y: 120 }, '#ddd6fe', 'What delights existing fans?')
      ],
      appState: {
        gridSize: 20,
        viewBackgroundColor: '#f8fafc',
        currentItemStrokeColor: '#0f172a',
        currentItemBackgroundColor: '#fef3c7'
      },
      files: {}
    }
  },
  {
    title: 'Cluster themes with magic grouping',
    description: 'Highlight any region to smart-group duplicates, tag sentiment and add voting rounds without leaving the canvas.',
    cta: 'See clustering in action',
    icon: PlaySquare,
    scene: {
      elements: [
        boardFrame(2000),
        ...sticky(2010, { x: 110, y: 140 }, '#fef9c3', 'Onboarding email feels generic'),
        ...sticky(2020, { x: 300, y: 150 }, '#bae6fd', 'Need guided tour for new dashboards'),
        ...sticky(2030, { x: 230, y: 260 }, '#f5d0fe', 'Celebrate first win inside the product'),
        baseElement(
          {
            x: 90,
            y: 120,
            width: 280,
            height: 220,
            strokeColor: '#22c55e',
            backgroundColor: 'transparent',
            strokeWidth: 3,
            strokeStyle: 'dashed',
            index: 'a2100'
          },
          2100
        )
      ],
      appState: {
        gridSize: 20,
        viewBackgroundColor: '#f8fafc',
        currentItemStrokeColor: '#22c55e',
        currentItemBackgroundColor: '#fef9c3'
      },
      files: {}
    }
  },
  {
    title: 'Turn insight into action',
    description: 'Convert selected stickies into action items and owners. Sync decisions with Jira, Notion or Linear instantly.',
    cta: 'Automate follow-ups',
    icon: Share2,
    scene: {
      elements: [
        boardFrame(3000),
        baseElement(
          {
            x: 120,
            y: 120,
            width: 480,
            height: 240,
            backgroundColor: '#ffffff',
            strokeColor: '#e2e8f0',
            index: 'a3001'
          },
          3001
        ),
        ...[0, 1, 2].flatMap((row) =>
          [0, 1, 2].map((column) =>
            textElement(
              {
                x: 150 + column * 150,
                y: 150 + row * 70,
                width: 120,
                height: 50,
                text: row === 0 ? ['Owner', 'Next step', 'Due'][column] : ['Jules', 'Draft welcome tour', 'Fri'][column],
                originalText: row === 0 ? ['Owner', 'Next step', 'Due'][column] : ['Jules', 'Draft welcome tour', 'Fri'][column],
                textAlign: column === 1 ? 'left' : 'center',
                verticalAlign: 'top',
                lineHeight: 1.4 as unknown as number,
                fontSize: row === 0 ? 16 : 18,
                strokeColor: row === 0 ? '#475569' : '#0f172a'
              },
              3100 + row * 10 + column
            )
          )
        )
      ],
      appState: {
        gridSize: 20,
        viewBackgroundColor: '#f8fafc',
        currentItemStrokeColor: '#0f172a',
        currentItemBackgroundColor: '#ffffff'
      },
      files: {}
    }
  }
];

const steps = scenes satisfies WorkflowStep[];

export default function WorkflowShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeScene = useMemo(() => steps[activeIndex], [activeIndex]);

  return (
    <section id="workflow" className="bg-white py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 lg:flex-row lg:items-start lg:gap-16 lg:px-12">
        <div className="flex-1 space-y-6">
          <p className="inline-flex items-center rounded-full bg-slate-900/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-600">
            Guided Excalidraw flows
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Every frame tells the story of your workshop.
          </h2>
          <p className="text-lg text-slate-600">
            Switch between the journey stages to preview live Excalidraw boards. Each step updates instantly, just like in a real session.
          </p>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <button
                key={step.title}
                onClick={() => setActiveIndex(index)}
                className={`w-full rounded-3xl border p-6 text-left transition ${
                  activeIndex === index
                    ? 'border-emerald-300 bg-emerald-50/70 shadow-[0_25px_65px_-45px_rgba(16,185,129,0.5)]'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                    <step.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{step.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <Button className="mt-6 inline-flex items-center gap-2 bg-emerald-500 text-white hover:bg-emerald-400">
            {activeScene.cta}
          </Button>
        </div>

        <div className="flex-1">
          <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-slate-50 shadow-[0_60px_120px_-60px_rgba(15,23,42,0.35)]">
            <div className="flex items-center justify-between border-b border-slate-200/80 bg-white px-6 py-4 text-sm text-slate-500">
              <span className="font-semibold text-slate-700">{activeScene.title}</span>
              <span>View only</span>
            </div>
            <div className="h-[26rem] w-full bg-white">
              <Excalidraw
                initialData={activeScene.scene}
                viewModeEnabled
                zenModeEnabled
                gridModeEnabled
                UIOptions={{
                  canvasActions: {
                    changeViewBackgroundColor: false,
                    clearCanvas: false,
                    loadScene: false,
                    saveToActiveFile: false,
                    saveAsImage: false,
                    export: false,
                    toggleTheme: false
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
