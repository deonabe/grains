'use client';

import './globals.css';
import { ReactNode } from 'react';
import { WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import WalletContextProvider from './providers/WalletContextProvider';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';

import Link from 'next/link';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import ClientWalletButton from './components/ClientWalletButton';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Grains</title>
      </head>
      <body>
        <ConnectionProvider endpoint={clusterApiUrl('devnet')}>
          <WalletContextProvider>
            <WalletModalProvider>
              <nav className="flex justify-between items-center px-6 py-4 bg-black text-white shadow-md">
                <div className="flex space-x-4">
                  <Link href="/" className="hover:underline">Grains</Link>
                  <Link href="/exchange" className="hover:underline">Exchange</Link>
                  <Link href="/treasuries" className="hover:underline">Treasuries</Link>
                  <Link href="/portfolio" className="hover:underline">Portfolio</Link>
                </div>
                <ClientWalletButton />
              </nav>

              {/* Main Content */}
              <main className="p-6">{children}</main>
            </WalletModalProvider>
          </WalletContextProvider>
        </ConnectionProvider>
      </body>
    </html>
  );
}
