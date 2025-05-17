'use client';

import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { ThemeProvider } from 'next-themes';
import WalletContextProvider from './WalletContextProvider';
import { ConnectionProvider } from '@solana/wallet-adapter-react';
import { clusterApiUrl } from '@solana/web3.js';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ConnectionProvider endpoint={clusterApiUrl('devnet')}>
        <WalletContextProvider>
          <WalletModalProvider>
            {children}
          </WalletModalProvider>
        </WalletContextProvider>
      </ConnectionProvider>
    </ThemeProvider>
  );
}
