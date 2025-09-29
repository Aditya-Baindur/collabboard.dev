import Link from 'next/link';

import { BrandLogo } from '@/components/BrandLogo';

const contactEmail =
  'mailto:hello@collabboard.dev?subject=Hello%20Colabboard&body=Hi%20Colabboard%20team%2C%0A%0AI%20had%20a%20question%20about%20colabboard.%0A%0AThanks%2C%0A';

const links = [
  {
    title: 'Product',
    items: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Templates', href: '#library' },
      { label: 'Changelog', href: '/def' },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'About', href: 'https://www.collabboard.dev' },
      { label: 'Careers', href: 'https://www.collabboard.dev#careers' },
      { label: 'Press', href: 'https://www.collabboard.dev#press' },
      { label: 'Contact', href: contactEmail },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'Help center', href: '/def' },
      { label: 'Facilitation hub', href: 'https://www.collabboard.dev#resources' },
      { label: 'Community', href: 'https://www.collabboard.dev#community' },
      { label: 'Status', href: 'https://status.collabboard.dev' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/70 bg-gradient-to-b from-white to-[var(--color-company-bg)]/60 py-16 text-slate-500">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="max-w-sm space-y-5">
            <BrandLogo className="text-slate-900" />
            <p className="text-sm leading-relaxed text-slate-500">
              Run high-impact workshops, retros and rituals with live Excalidraw frames,
              facilitation tools and AI-driven follow-ups.
            </p>
            <div className="text-xs text-slate-400">
              © {new Date().getFullYear()} Colabboard. All rights reserved.
            </div>
          </div>

          <div className="grid flex-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            {links.map((section) => (
              <div key={section.title} className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
                  {section.title}
                </h3>
                <ul className="space-y-2 text-sm">
                  {section.items.map((item) => {
                    const isInternal = item.href.startsWith('/') || item.href.startsWith('#');

                    return (
                      <li key={item.label}>
                        {isInternal ? (
                          <Link
                            href={item.href}
                            className="transition hover:text-[var(--color-logo-purple)]"
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <a
                            href={item.href}
                            className="transition hover:text-[var(--color-logo-purple)]"
                            target="_blank"
                            rel="noreferrer"
                          >
                            {item.label}
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
