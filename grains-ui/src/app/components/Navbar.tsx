'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import ConnectWalletButton from './ConnectWalletButton';

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="w-full bg-black text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo + Brand */}
        <div className="flex items-center space-x-3">
          <Link href="/">
            <Image
            src="/images/logo.png"
            alt="Grains logo"
            width={80} // from 24 or 32 → 40–48 is perfect
            height={80}
            className="rounded"
            />
          </Link>
          <Link href="/" className="text-3xl font-bold text-yellow-400 hover:opacity-80">
            Grains
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <Link href="/exchange" className="text-xl hover:text-yellow-300">Swap</Link>
          <Link href="/portfolio" className="text-xl hover:text-yellow-300">Farm Yield</Link>
          <Link href="/treasuries" className="text-xl hover:text-yellow-300">Treasuries</Link>
          <Link href="/docs" className="text-xl hover:text-yellow-300">Docs</Link>
        </nav>

        {/* Wallet + Theme */}
        <div className="flex items-center space-x-4">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-white border border-white px-2 py-1 rounded hover:bg-white hover:text-black transition"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          )}
          <ConnectWalletButton />
        </div>
      </div>
    </header>
  );
}
