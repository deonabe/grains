use anchor_lang::prelude::*;

declare_id!("4cK1LWtwoiJeqFNh1AE7HGtE7a4G2Am3TqbB2oo5FEXS");

#[program]
pub mod anchor {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
