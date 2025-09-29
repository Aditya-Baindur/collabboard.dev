const faqs = [
  {
    question: 'Does everyone need an account to collaborate?',
    answer:
      'No. Guests can join with a shared link, contribute to frames and vote in rituals. Only facilitators and workspace admins require licenses.',
  },
  {
    question: 'Can I export boards to other tools?',
    answer:
      'Yes! Send highlights to Notion, Jira or Linear with one click, export high-res images or share live links with view-only access.',
  },
  {
    question: 'Is there support for large enterprises?',
    answer:
      'Workspace includes SSO, SCIM provisioning, audit logs and dedicated onboarding help. Contact us for custom agreements.',
  },
  {
    question: 'Do you integrate with Excalidraw libraries?',
    answer:
      'Import your existing Excalidraw libraries or publish house-made components to your workspace template gallery.',
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="bg-company-bg py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-12">
        <div className="text-center">
          <p className="mx-auto inline-flex items-center rounded-full bg-slate-900/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-600">
            FAQ
          </p>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Everything you need to know
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            We built colabboard with facilitation in mind. If you have more questions, reach out and
            we’ll hop on a quick walkthrough.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-3xl border border-slate-200 bg-white px-6 py-6 transition hover:border-emerald-200"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-lg font-semibold text-slate-900">
                {faq.question}
                <span className="text-sm font-medium text-emerald-600 opacity-0 transition group-open:opacity-100">
                  Answered
                </span>
              </summary>
              <p className="mt-4 text-base leading-relaxed text-slate-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
