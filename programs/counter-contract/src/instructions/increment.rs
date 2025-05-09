use anchor_lang::prelude::*;
use crate::state::counter::*;

pub fn increment(ctx: Context<Update>) -> Result<()> {
    let counter = &mut ctx.accounts.counter;
    msg!("Previous counter: {}", counter.count);

    counter.count += 1;
    msg!("Counter incremented. Current count: {}", counter.count);
    Ok(())
}
