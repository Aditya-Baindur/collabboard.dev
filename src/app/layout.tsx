import { type Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import Script from 'next/script';

import { Analytics } from '@vercel/analytics/next';

import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'Colabboard',
  description: 'Collaborative whiteboarding powered by Excalidraw.',
};

const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-sans' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${plusJakarta.variable} antialiased bg-white text-slate-900 selection:bg-logo-mint`}
        >
          {children}
          <Toaster richColors position="top-center" />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
