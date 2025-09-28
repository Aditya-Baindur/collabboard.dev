import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';

import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Colabboard',
  description: 'Collaborative whiteboarding powered by Excalidraw.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${plusJakarta.variable} antialiased bg-white text-slate-900 selection:bg-logo-mint`}
      >
        {children}
      </body>
    </html>
  );
}
