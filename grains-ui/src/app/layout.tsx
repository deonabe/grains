import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ClientProviders from './components/ClientProviders';
import { Navbar } from './components/Navbar';

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

export const metadata: Metadata = {
  title: 'Grains',
  description: 'Accessible yield. Powered by Treasuries.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen text-black dark:text-white`}
      >
        {/* 🌄 Fullscreen background image */}
        <div className="fixed inset-0 -z-20 bg-[url('/images/background.png')] bg-cover bg-center bg-no-repeat opacity-20 dark:opacity-10" />

        {/* 🎨 Gradient overlay for theme */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-b from-orange-50 to-yellow-100 dark:from-black dark:to-orange-900" />

        {/* Content */}
        <ClientProviders>
          <Navbar />
          <main className="max-w-7xl mx-auto px-6 py-10 relative z-10">{children}</main>
        </ClientProviders>
      </body>
    </html>
  );
}
