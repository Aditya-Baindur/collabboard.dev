import { Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const plans = [
  {
    name: 'Facilitator',
    price: '$24',
    cadence: 'per facilitator / month',
    description: 'Everything you need to run high-energy workshops with up to 25 participants.',
    features: ['Unlimited Excalidraw boards', 'Timer, poll & voting rituals', 'AI summaries & next steps', 'Template gallery access'],
    highlighted: false
  },
  {
    name: 'Workspace',
    price: '$64',
    cadence: 'per workspace / month',
    description: 'Advanced collaboration, automations and reporting for distributed product teams.',
    features: [
      'Shared template library & branding',
      '50 simultaneous cursors',
      'Workspace automations & integrations',
      'Advanced reporting & exports'
    ],
    highlighted: true
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <div className="flex flex-col gap-6 text-center">
          <p className="mx-auto inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
            Simple pricing, transparent value
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Start free, scale with your team.
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            No per-seat surprises. Upgrade when you want more automation, deeper insights and enterprise-grade governance.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`${
                plan.highlighted
                  ? 'border-emerald-400 bg-white shadow-[0_35px_85px_-45px_rgba(16,185,129,0.55)]'
                  : 'border-white/70 bg-white/80'
              }`}
            >
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-slate-900">{plan.name}</CardTitle>
                <CardDescription className="text-base text-slate-600">{plan.description}</CardDescription>
                <div className="mt-6 flex items-baseline gap-2 text-slate-900">
                  <span className="text-4xl font-semibold">{plan.price}</span>
                  <span className="text-sm font-medium text-slate-500">{plan.cadence}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3 text-sm text-slate-600">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <Check className="h-4 w-4" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`${
                    plan.highlighted
                      ? 'w-full bg-emerald-500 text-white hover:bg-emerald-400'
                      : 'w-full border border-slate-300 bg-white text-slate-900 hover:bg-slate-100'
                  }`}
                  variant={plan.highlighted ? 'default' : 'outline'}
                >
                  {plan.highlighted ? 'Upgrade workspace' : 'Start free'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
