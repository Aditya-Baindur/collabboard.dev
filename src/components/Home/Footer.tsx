import Link from 'next/link';

const links = [
  { title: 'Product', items: ['Features', 'Pricing', 'Templates', 'Changelog'] },
  { title: 'Company', items: ['About', 'Careers', 'Press', 'Contact'] },
  { title: 'Resources', items: ['Help center', 'Facilitation hub', 'Community', 'Status'] }
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 py-16 text-slate-400">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="max-w-sm space-y-4">
            <div className="flex items-center gap-3 text-white">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                cb
              </span>
              <span className="text-lg font-semibold">colabboard</span>
            </div>
            <p>
              Run high-impact workshops, retros and rituals with live Excalidraw frames, facilitation tools and AI-driven follow-ups.
            </p>
            <div className="text-sm text-slate-500">© {new Date().getFullYear()} Colabboard. All rights reserved.</div>
          </div>

          <div className="grid flex-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            {links.map((section) => (
              <div key={section.title} className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">{section.title}</h3>
                <ul className="space-y-2 text-sm">
                  {section.items.map((item) => (
                    <li key={item}>
                      <Link href="#" className="transition hover:text-white">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
