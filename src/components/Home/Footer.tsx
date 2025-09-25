import Link from 'next/link';

import { BrandLogo } from '@/components/BrandLogo';

const links = [
  { title: 'Product', items: ['Features', 'Pricing', 'Templates', 'Changelog'] },
  { title: 'Company', items: ['About', 'Careers', 'Press', 'Contact'] },
  { title: 'Resources', items: ['Help center', 'Facilitation hub', 'Community', 'Status'] }
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-16 text-slate-500">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="max-w-sm space-y-5">
            <BrandLogo withWordmark className="text-slate-900" />
            <p className="text-sm leading-relaxed text-slate-500">
              Run high-impact workshops, retros and rituals with live Excalidraw frames, facilitation tools and AI-driven follow-ups.
            </p>
            <div className="text-xs text-slate-400">© {new Date().getFullYear()} Colabboard. All rights reserved.</div>
          </div>

          <div className="grid flex-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            {links.map((section) => (
              <div key={section.title} className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">{section.title}</h3>
                <ul className="space-y-2 text-sm">
                  {section.items.map((item) => (
                    <li key={item}>
                      <Link href="#" className="transition hover:text-slate-900">
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
