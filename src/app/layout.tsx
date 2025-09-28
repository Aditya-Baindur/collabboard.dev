import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Colabboard',
  description: 'Collaborative whiteboarding powered by Excalidraw.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
