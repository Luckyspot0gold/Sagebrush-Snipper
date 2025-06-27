// contracts/boxing_protocol.rs - Wyoming-Compliant
use anchor_lang::prelude::*;
use chainlink_solana::prelude::*;

declare_id!("BoxingProtocol11111111111111111111111111111111");

#[program]
pub mod boxing_protocol {
    use super::*;
    
    pub fn initialize_boxer(ctx: Context<Initialize>, token: String) -> Result<()> {
        let boxer = &mut ctx.accounts.boxer;
        boxer.token = token;
        boxer.health = 100;
        boxer.attack_power = 0;
        boxer.defense_power = 0;
        Ok(())
    }
    
    pub fn process_market_move(ctx: Context, signal: MarketSignal) -> Result<()> {
        let boxer = &mut ctx.accounts.boxer;
        boxer.attack_power = calculate_attack(signal)?;
        boxer.defense_power = calculate_defense(signal)?;
        trigger_animation(signal)?;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 32 + 1024)]
    pub boxer: Account<'info, Boxer>,
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Process<'info> {
    #[account(mut)]
    pub boxer: Account<'info, Boxer>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Boxer {
    pub token: String,
    pub health: u8,
    pub attack_power: u8,
    pub defense_power: u8,
    pub last_move: MarketMove,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq, Debug)]
pub enum MarketMove {
    Jab,
    Hook,
    Uppercut,
    Dodge,
    Combo,
    Stumble,
}
