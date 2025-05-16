const anchor = require("@coral-xyz/anchor");
const { PublicKey, Keypair } = require("@solana/web3.js");
const { 
  getAssociatedTokenAddress,
  createMint,
  createAssociatedTokenAccount,
  mintTo,
  getOrCreateAssociatedTokenAccount,
  TOKEN_PROGRAM_ID
} = require("@solana/spl-token");

describe("grains_swap", () => {
  anchor.setProvider(anchor.AnchorProvider.env());
  const provider = anchor.getProvider();
  const program = anchor.workspace.GrainsSwap;
  
  const PROGRAM_ID = new PublicKey("4cK1LWtwoiJeqFNh1AE7HGtE7a4G2Am3TqbB2oo5FEXS");
  
  // We'll create our own test mints instead of using existing ones
  let usdcMint, grainMint;
  let treasuryUsdc, treasuryGrain;
  
  // This will run once before all tests
  before(async () => {
    console.log("Setting up test environment...");
    
    // Create our own USDC mint (6 decimals)
    usdcMint = await createMint(
      provider.connection,
      provider.wallet.payer,     
      provider.wallet.publicKey, // Set mint authority to our wallet
      provider.wallet.publicKey, // Set freeze authority to our wallet
      6                          // 6 decimals like USDC
    );
    console.log("Created test USDC mint:", usdcMint.toString());
    
    // Create our own GRAIN mint (9 decimals)
    grainMint = await createMint(
      provider.connection,
      provider.wallet.payer,
      provider.wallet.publicKey, // Set mint authority to our wallet
      provider.wallet.publicKey, // Set freeze authority to our wallet
      9                          // 9 decimals for GRAIN
    );
    console.log("Created test GRAIN mint:", grainMint.toString());
    
    // Find the treasury authority PDA
    const [treasuryAuthority, bump] = await PublicKey.findProgramAddress(
      [Buffer.from("treasury_authority")],
      PROGRAM_ID
    );
    console.log("Treasury Authority PDA:", treasuryAuthority.toString(), "with bump:", bump);
    
    // Create treasury token accounts
    treasuryUsdc = await getOrCreateAssociatedTokenAccount(
      provider.connection,
      provider.wallet.payer,
      usdcMint,
      treasuryAuthority,
      true  // Allow owner off curve (for PDA)
    );
    console.log("Created treasury USDC account:", treasuryUsdc.address.toString());
    
    treasuryGrain = await getOrCreateAssociatedTokenAccount(
      provider.connection,
      provider.wallet.payer,
      grainMint,
      treasuryAuthority,
      true  // Allow owner off curve (for PDA)
    );
    console.log("Created treasury GRAIN account:", treasuryGrain.address.toString());
    
    // Mint 1000 GRAIN to treasury (so it has GRAIN to give to users)
    await mintTo(
      provider.connection,
      provider.wallet.payer,
      grainMint,
      treasuryGrain.address,
      provider.wallet.payer,
      1000_000_000_000  // 1000 GRAIN with 9 decimals
    );
    console.log("Minted 1000 GRAIN to treasury");
  });

  it("Swaps USDC for GRAIN", async () => {
    // Get user wallet
    const user = provider.wallet.publicKey;
    
    // Create or get user token accounts
    const userUsdc = await getOrCreateAssociatedTokenAccount(
      provider.connection,
      provider.wallet.payer,
      usdcMint,
      user
    );
    console.log("User USDC account:", userUsdc.address.toString());
    
    const userGrain = await getOrCreateAssociatedTokenAccount(
      provider.connection,
      provider.wallet.payer,
      grainMint,
      user
    );
    console.log("User GRAIN account:", userGrain.address.toString());

    // Mint some USDC to the user
    await mintTo(
      provider.connection,
      provider.wallet.payer,
      usdcMint,
      userUsdc.address,
      provider.wallet.payer,
      10_000_000  // 10 USDC with 6 decimals
    );
    console.log("Minted 10 USDC to user");

    // Find treasury authority PDA again for the test
    const [treasuryAuthority, bump] = await PublicKey.findProgramAddress(
      [Buffer.from("treasury_authority")],
      PROGRAM_ID
    );

    // Now perform the swap with our new test tokens
    const amount = new anchor.BN(1_000_000); // 1 USDC
    
    try {
      const tx = await program.methods
        .swap(amount, bump)
        .accounts({
          user: user,
          userUsdc: userUsdc.address,
          userGrain: userGrain.address,
          treasuryUsdc: treasuryUsdc.address,
          treasuryGrain: treasuryGrain.address,
          treasuryAuthority: treasuryAuthority,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .rpc();
      
      console.log("Swap transaction signature:", tx);
      console.log("Swap successful! User traded 1 USDC for 1000 GRAIN");
    } catch (error) {
      console.error("Error during swap:", error);
      throw error;
    }
  });
});