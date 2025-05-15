'use client';

import Link from 'next/link';
import ConnectWalletButton from './ConnectWalletButton';

export function Navbar() {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      {/* Logo or site name */}
      <div className="text-xl font-bold text-indigo-600">
        <Link href="/">Grains</Link>
      </div>

      {/* Navigation links */}
      <nav className="flex space-x-6 text-gray-700 text-sm font-medium">
        <Link href="/exchange" className="hover:text-indigo-600">Exchange</Link>
        <Link href="/treasuries" className="hover:text-indigo-600">Treasuries</Link>
        <Link href="/portfolio" className="hover:text-indigo-600">Portfolio</Link>
      </nav>

      {/* Wallet connect */}
      <div>
        <ConnectWalletButton />
      </div>
    </header>
  );
}
