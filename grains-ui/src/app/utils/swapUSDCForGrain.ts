import {
  getAssociatedTokenAddress,
} from '@solana/spl-token';
import {
  Connection,
  PublicKey,
} from '@solana/web3.js';
import { WalletContextState } from '@solana/wallet-adapter-react';
import * as anchor from '@project-serum/anchor';
import rawIdl from './idl/grains_swap.json'; 
import type { Idl } from '@project-serum/anchor';
import { DEMO_MODE } from './constants';

const idl = rawIdl as unknown as Idl;
const PROGRAM_ID = new PublicKey('4cK1LWtwoiJeqFNh1AE7HGtE7a4G2Am3TqbB2oo5FEXS');
const USDC_MINT = new PublicKey('4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU');
const GRAIN_MINT = new PublicKey('8ZQ1g5pmLpgGqgmvyZhGpYuNLWz6HcRvc6kipvnLW1SX');

export const swapUSDCForGrain = async ({
  connection,
  wallet,
  amount,
  treasuryAddress,
}: {
  connection: Connection;
  wallet: WalletContextState;
  amount: number;
  treasuryAddress: string;
}) => {
  if (DEMO_MODE) {
    console.log('🧪 Demo mode active — simulating swap...');
    await new Promise((r) => setTimeout(r, 1000));
    return 'SIMULATED_TX_SIGNATURE';
  }

  if (!wallet.publicKey) throw new Error('Wallet not connected');

  const provider = new anchor.AnchorProvider(connection, wallet as any, {
    preflightCommitment: 'processed',
  });

  const program = new anchor.Program(idl as anchor.Idl, PROGRAM_ID, provider);
  const user = wallet.publicKey;
  const amountInUSDC = amount * 10 ** 6;
  const treasuryPubkey = new PublicKey(treasuryAddress);

  const userUSDC = await getAssociatedTokenAddress(USDC_MINT, user);
  const userGrain = await getAssociatedTokenAddress(GRAIN_MINT, user);
  const treasuryUSDC = await getAssociatedTokenAddress(USDC_MINT, treasuryPubkey);
  const treasuryGrain = await getAssociatedTokenAddress(GRAIN_MINT, treasuryPubkey);

  const [treasuryAuthority, bump] = await PublicKey.findProgramAddress(
    [Buffer.from("treasury_authority")],
    PROGRAM_ID
  );

  const txSig = await program.methods
    .swap(new anchor.BN(amountInUSDC), bump)
    .accounts({
      user,
      userUsdc: userUSDC,
      userGrain: userGrain,
      treasuryUsdc: treasuryUSDC,
      treasuryGrain: treasuryGrain,
      treasuryAuthority,
      tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
    })
    .rpc();

  console.log('✅ Swap transaction signature:', txSig);
  return txSig;
};
