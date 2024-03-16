import type { Metadata } from 'next';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

import { AI } from './action';
import { Header } from '@/components/header';
import { Providers } from '@/components/providers';

const meta = {
  title: 'Mentat',
  description:
    'Demo of an interactive market research assistant.',
};
export const metadata: Metadata = {
  ...meta,
  title: {
    default: 'Mentat',
    template: `%s - Mentat`,
  },
  icons: {
    icon: 'https://media.licdn.com/dms/image/D4E0BAQG_A6L_nHk4fg/company-logo_200_200/0/1695848222332?e=1718236800&v=beta&t=E8YpoBlEHcYRCMnITUFkjJwPv7t9v2YsexvUii_4cXM',
    shortcut: 'https://media.licdn.com/dms/image/D4E0BAQG_A6L_nHk4fg/company-logo_200_200/0/1695848222332?e=1718236800&v=beta&t=E8YpoBlEHcYRCMnITUFkjJwPv7t9v2YsexvUii_4cXM',
    apple: 'https://media.licdn.com/dms/image/D4E0BAQG_A6L_nHk4fg/company-logo_200_200/0/1695848222332?e=1718236800&v=beta&t=E8YpoBlEHcYRCMnITUFkjJwPv7t9v2YsexvUii_4cXM',
  },
  twitter: {
    ...meta,
    card: 'summary_large_image',
    site: '@vercel',
  },
  openGraph: {
    ...meta,
    locale: 'en-US',
    type: 'website',
  },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`font-sans antialiased ${GeistSans.variable} ${GeistMono.variable}`}
      >
        <Toaster />
        <AI>
          <Providers
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex flex-col flex-1 bg-muted/50">
                {children}
              </main>
            </div>
          </Providers>
        </AI>
        <Analytics />
      </body>
    </html>
  );
}

export const runtime = 'edge';
