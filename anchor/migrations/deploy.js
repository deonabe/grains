const anchor = require('@project-serum/anchor');
const { SystemProgram } = anchor.web3;

async function main() {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.GrainsSwap;

  // Find PDA
  const [treasuryAuthority, bump] = await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from("treasury_authority")],
    program.programId
  );

  console.log("Treasury Authority PDA:", treasuryAuthority.toBase58());

  // You might create treasury token accounts owned by treasuryAuthority PDA beforehand using spl-token CLI or your script
  // This migration can also handle that if you want

  // After deploying program, you can call it from tests or frontend
}

main().catch(err => {
  console.error(err);
});
