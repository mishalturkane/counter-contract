use anchor_lang::prelude::*;
use crate::state::counter::*;

pub fn decrement(ctx: Context<Update>) -> Result<()> {
    let counter = &mut ctx.accounts.counter;
    msg!("Previous count: {}", counter.count);

    counter.count -= 1;
    msg!("Counter decremented. Current count: {}", counter.count);
    Ok(())
}
