import {
    getAssociatedTokenAddress,
  } from '@solana/spl-token';
  import {
    Connection,
    PublicKey,
  } from '@solana/web3.js';
  import { WalletContextState } from '@solana/wallet-adapter-react';
  import * as anchor from '@project-serum/anchor';
  import rawIdl from '../../../../anchor/target/idl/grains_swap.json';
import type { Idl } from '@project-serum/anchor';

const idl = rawIdl as unknown as Idl;
  
  const PROGRAM_ID = new PublicKey('4cK1LWtwoiJeqFNh1AE7HGtE7a4G2Am3TqbB2oo5FEXS');
  const USDC_MINT = new PublicKey('4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU');
  const GRAIN_MINT = new PublicKey('8ZQ1g5pmLpgGqgmvyZhGpYuNLWz6HcRvc6kipvnLW1SX');
  const TREASURY_PUBKEY = new PublicKey('CfsS89AAYER3zMSuWjSdX8iN89B6BzY16ienfKwifXQ1');
  
  export const swapUSDCForGrain = async ({
    connection,
    wallet,
    amount,
  }: {
    connection: Connection;
    wallet: WalletContextState;
    amount: number;
  }) => {
    if (!wallet.publicKey) throw new Error('Wallet not connected');
  
    const provider = new anchor.AnchorProvider(connection, wallet as any, {
      preflightCommitment: 'processed',
    });
  
    const program = new anchor.Program(idl as anchor.Idl, PROGRAM_ID, provider);
  
    const user = wallet.publicKey;
    const amountInUSDC = amount * 10 ** 6;
  
    const userUSDC = await getAssociatedTokenAddress(USDC_MINT, user);
    const userGrain = await getAssociatedTokenAddress(GRAIN_MINT, user);
    const treasuryUSDC = await getAssociatedTokenAddress(USDC_MINT, TREASURY_PUBKEY);
    const treasuryGrain = await getAssociatedTokenAddress(GRAIN_MINT, TREASURY_PUBKEY);
  
    const txSig = await program.methods
      .swap(new anchor.BN(amountInUSDC))
      .accounts({
        user,
        userUsdc: userUSDC,
        userGrain: userGrain,
        treasuryUsdc: treasuryUSDC,
        treasuryGrain: treasuryGrain,
        tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
      })
      .rpc();
  
    console.log('Swap transaction signature:', txSig);
    return txSig;
  };
  