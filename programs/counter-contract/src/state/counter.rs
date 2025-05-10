use anchor_lang::prelude::*;

#[account]
pub struct Counter {
    pub count: u64,
}

impl Space for Counter {
    const INIT_SPACE: usize = 8 + 8;
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(
        mut,
        seeds = [b"counter", user.key().as_ref()],  // Use the user's public key as a seed for the PDA
        bump
    )]
    pub counter: Account<'info, Counter>,
    pub user: Signer<'info>,
}
