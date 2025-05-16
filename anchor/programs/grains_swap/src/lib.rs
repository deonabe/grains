use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

declare_id!("4cK1LWtwoiJeqFNh1AE7HGtE7a4G2Am3TqbB2oo5FEXS");

#[program]
pub mod grains_swap {
    use super::*;

    pub fn swap(ctx: Context<Swap>, amount: u64, bump: u8) -> Result<()> {
        // Transfer USDC from user to treasury
        token::transfer(
            ctx.accounts.into_transfer_to_treasury_context(),
            amount,
        )?;

        // The correct way to create seeds for PDA signing
        let bump_bytes = &[bump];
        let seeds = &[b"treasury_authority".as_ref(), bump_bytes];
        
        // Transfer GRAIN from treasury to user, signed by treasury authority PDA
        token::transfer(
            ctx.accounts
                .into_transfer_to_user_context()
                .with_signer(&[&seeds[..]]),
            amount * 1000,
        )?;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Swap<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    
    #[account(mut)]
    pub user_usdc: Account<'info, TokenAccount>,
    
    #[account(mut)]
    pub user_grain: Account<'info, TokenAccount>,
    
    #[account(mut)]
    pub treasury_usdc: Account<'info, TokenAccount>,
    
    #[account(mut)]
    pub treasury_grain: Account<'info, TokenAccount>,
    
    /// CHECK: This is the PDA authority for treasury token accounts
    pub treasury_authority: UncheckedAccount<'info>,
    
    pub token_program: Program<'info, Token>,
}

impl<'info> Swap<'info> {
    fn into_transfer_to_treasury_context(&self) -> CpiContext<'_, '_, '_, 'info, Transfer<'info>> {
        let cpi_accounts = Transfer {
            from: self.user_usdc.to_account_info().clone(),
            to: self.treasury_usdc.to_account_info().clone(),
            authority: self.user.to_account_info().clone(),
        };
        CpiContext::new(self.token_program.to_account_info().clone(), cpi_accounts)
    }

    fn into_transfer_to_user_context(&self) -> CpiContext<'_, '_, '_, 'info, Transfer<'info>> {
        let cpi_accounts = Transfer {
            from: self.treasury_grain.to_account_info().clone(),
            to: self.user_grain.to_account_info().clone(),
            authority: self.treasury_authority.to_account_info().clone(),
        };
        CpiContext::new(self.token_program.to_account_info().clone(), cpi_accounts)
    }
}