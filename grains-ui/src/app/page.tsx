'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center">
      {/* Logo + Title */}
      <div className="mb-6">
        <Image
          src="/images/logo.png"
          alt="Grains Logo"
          width={200} // increase from 64
          height={200}
          className="mx-auto mb-6"
        />
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">Grains</h1>

        <p className="mt-4 text-xl sm:text-2xl font-medium text-gray-700 dark:text-gray-300">
          Accessible yield. Powered by Treasuries. For everyone.
        </p>

      </div>

      {/* Call to Action */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <Link
          href="/exchange"
          className="bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white font-semibold px-6 py-3 rounded-full shadow hover:opacity-90 transition"
        >
          Get Started
        </Link>
        <Link
          href="/docs"
          className="border border-gray-700 dark:border-white px-6 py-3 rounded-full font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          Learn More
        </Link>
      </div>

      {/* Footer */}
      <footer className="mt-20 flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <Link href="https://solana.com" target="_blank" rel="noopener noreferrer">
          Built on Solana
        </Link>
        <span>•</span>
        <Link href="https://github.com/deonabe/grains" target="_blank" rel="noopener noreferrer">
          View on GitHub
        </Link>
      </footer>
    </div>
  );
}
