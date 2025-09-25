import { Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const plans = [
  {
    name: 'Facilitator',
    price: '$24',
    cadence: 'per facilitator / month',
    description: 'Run high-energy workshops with timers, rituals and AI summaries included.',
    features: ['Unlimited Excalidraw boards', 'Timer, poll & voting rituals', 'AI notes + action items', 'Template gallery access'],
    highlighted: false
  },
  {
    name: 'Workspace',
    price: '$64',
    cadence: 'per workspace / month',
    description: 'Scale facilitation across product orgs with automations, governance and insights.',
    features: [
      'Shared template library & branding',
      '50 simultaneous cursors',
      'Automations & integrations',
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
          <p className="mx-auto inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Simple pricing, transparent value
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Start for free, scale when the whole team is ready.
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Every plan includes unlimited guests. Upgrade when you need deeper automation, security controls or advanced analytics.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative overflow-hidden rounded-[28px] border ${
                plan.highlighted ? 'border-slate-900 bg-white shadow-[0_55px_120px_-70px_rgba(15,23,42,0.55)]' : 'border-slate-200 bg-white'
              }`}
            >
              {plan.highlighted ? (
                <div className="absolute right-6 top-6 inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-[11px] font-medium text-white">
                  Most loved
                </div>
              ) : null}
              <CardHeader className="space-y-6">
                <div className="space-y-2 text-left">
                  <CardTitle className="text-2xl font-semibold text-slate-900">{plan.name}</CardTitle>
                  <CardDescription className="text-base text-slate-600">{plan.description}</CardDescription>
                </div>
                <div className="flex items-baseline gap-2 text-slate-900">
                  <span className="text-4xl font-semibold">{plan.price}</span>
                  <span className="text-sm font-medium text-slate-500">{plan.cadence}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                <ul className="space-y-3 text-sm text-slate-600">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900/5 text-slate-700">
                        <Check className="h-4 w-4" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    plan.highlighted
                      ? 'bg-slate-900 text-white hover:bg-slate-800'
                      : 'border border-slate-200 bg-white text-slate-800 hover:bg-slate-50'
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
