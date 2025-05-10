use anchor_lang::prelude::*;
use crate::state::counter::*;

pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
    let counter = &mut ctx.accounts.counter;
    counter.count = 0;

    msg!("Greetings from: {:?}", ctx.program_id);
    Ok(())
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = user,
        space = Counter::INIT_SPACE,
        seeds = [b"counter", user.key().as_ref()],  // Use the user's public key as a seed for the PDA
        bump
    )]
    pub counter: Account<'info, Counter>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}
