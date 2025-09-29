import Link from 'next/link';

export default function About() {
  const contactEmail =
    'mailto:hello@collabboard.dev?subject=Hello%20Colabboard&body=Hi%20Colabboard%20team%2C%0A%0AI%20had%20a%20question%20about%20colabboard.%0A%0AThanks%2C%0A';

  return (
    <section
      id="about"
      className="bg-gradient-to-b from-white via-[var(--color-company-bg)]/40 to-white py-24"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-600 shadow-sm">
            About Colabboard
          </p>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Helping facilitators orchestrate their best work together
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Colabboard was created to solve a simple but painful problem: team workshops often feel
            chaotic and unproductive. Whether on Zoom, in hybrid meetings, or in person,
            facilitators spend more time wrestling with tools than guiding people. Colabboard layers
            structure, presence, and AI follow-ups onto the Excalidraw canvas so teams can focus on
            outcomes — not logistics.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-10 lg:grid-cols-[3fr,2fr]">
          <div className="rounded-3xl border border-white/60 bg-white/90 p-10 text-left shadow-[0_50px_110px_-80px_rgba(138,107,255,0.35)] backdrop-blur">
            <h3 className="text-2xl font-semibold text-slate-900">Who We Are</h3>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Colabboard is a student-built exploration into how digital tools can improve
              collaboration rituals for modern, remote-first teams. Our mission is to blend
              structure with creativity so facilitators can guide sessions with confidence, clarity,
              and a touch of delight.
            </p>
          </div>

          <div className="flex flex-col justify-between gap-6 rounded-3xl border border-white/60 bg-white/90 p-10 text-left shadow-[0_50px_110px_-80px_rgba(138,107,255,0.35)] backdrop-blur">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900">Stay in Touch</h3>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                We love meeting facilitators, researchers, and teams experimenting with better
                rituals. Reach out anytime — we’re always trading notes.
              </p>
            </div>
            <div className="space-y-3 text-base font-medium text-slate-700">
              <Link
                href={contactEmail}
                className="mr-4 inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2 transition hover:border-[var(--color-logo-purple)] hover:text-[var(--color-logo-purple)]"
              >
                hello@colabboard.dev
              </Link>
              <Link
                href="https://x.com/collabboard_dev"
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-logo-purple)] px-5 py-2 text-white transition hover:bg-[var(--color-logo-purple)]/90"
              >
                Follow us on X
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
