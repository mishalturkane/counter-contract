pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;

declare_id!("4zaSmrWTcHFrFz517UwwPhRw4f2HWr9rExXnzJ6kVBno");

#[program]
pub mod counter_contract {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        instructions::initialize::initialize(ctx)
    }

    pub fn increment(ctx: Context<Update>) -> Result<()>{
        instructions::increment::increment(ctx)
    }

    pub fn decrement(ctx: Context<Update>)-> Result<()>{
        instructions::decrement::decrement(ctx)
    }
}
