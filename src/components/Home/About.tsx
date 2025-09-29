import Link from 'next/link';

export default function About() {
  const contactEmail =
    'mailto:hello@collabboard.dev?subject=Hello%20Colabboard&body=Hi%20Colabboard%20team%2C%0A%0AI%20had%20a%20question%20about%20colabboard.%0A%0AThanks%2C%0A';

  return (
    <section id="about" className="bg-white py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            About Colabboard
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Colabboard was created to solve a simple but painful problem: team workshops often feel
            chaotic and unproductive. Whether on Zoom, in hybrid meetings, or in person,
            facilitators spend more time wrestling with tools than guiding people. Colabboard layers
            structure, presence, and AI follow-ups onto the Excalidraw canvas so teams can focus on
            outcomes — not logistics.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-3xl gap-12 text-left text-slate-600 md:grid-cols-2">
          <div>
            <h3 className="text-2xl font-semibold text-slate-900">Who We Are</h3>
            <p className="mt-4 text-lg leading-8">
              This is a student project built as part of a website testing assignment at the
              University of Ottawa. The goal: explore how digital tools can improve collaboration
              rituals for modern, remote-first teams.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-slate-900">Contact Us</h3>
            <p>
              Email us at :{' '}
              <Link href={contactEmail} className="bg-logo-mint rounded-xl px-2 py-1/2">
                {' '}
                hello@colabboard.dev{' '}
              </Link>
              <br />
              Or reach out on{' '}
              <Link
                href="https://x.com/collabboard_dev"
                className="bg-logo-mint rounded-xl px-2 py-1/2"
              >
                X
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
