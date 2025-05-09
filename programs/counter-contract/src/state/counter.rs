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
    #[account(mut)]
    pub counter: Account<'info, Counter>,
    pub user: Signer<'info>,
}
