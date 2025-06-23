-- WyoVerse CryptoClashers Database Schema
-- Run this script to set up your Neon database

-- Players table
CREATE TABLE IF NOT EXISTS players (
    id SERIAL PRIMARY KEY,
    firebase_uid VARCHAR(128) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    tonka_tokens INTEGER DEFAULT 1000,
    wyoming_land_deeds INTEGER DEFAULT 0,
    total_fights INTEGER DEFAULT 0,
    wins INTEGER DEFAULT 0,
    losses INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Fighters table (crypto characters)
CREATE TABLE IF NOT EXISTS fighters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    symbol VARCHAR(10) NOT NULL,
    base_attack INTEGER DEFAULT 50,
    base_defense INTEGER DEFAULT 50,
    base_speed INTEGER DEFAULT 50,
    special_move VARCHAR(100),
    rarity VARCHAR(20) DEFAULT 'common',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Fights table
CREATE TABLE IF NOT EXISTS fights (
    id SERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES players(id),
    fighter1_id INTEGER REFERENCES fighters(id),
    fighter2_id INTEGER REFERENCES fighters(id),
    winner_id INTEGER REFERENCES fighters(id),
    rounds INTEGER DEFAULT 3,
    bet_amount INTEGER DEFAULT 0,
    payout INTEGER DEFAULT 0,
    fight_duration INTEGER, -- in seconds
    wyoming_buff_applied BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Land deeds table
CREATE TABLE IF NOT EXISTS land_deeds (
    id SERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES players(id),
    deed_token_id VARCHAR(100) UNIQUE NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    yard_size INTEGER DEFAULT 1,
    purchase_price INTEGER NOT NULL,
    carbon_county_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default fighters
INSERT INTO fighters (name, symbol, base_attack, base_defense, base_speed, special_move, rarity) VALUES
('Bitcoin Bull', 'BTC', 85, 90, 60, 'Lightning Strike', 'legendary'),
('Ethereum Eagle', 'ETH', 80, 75, 85, 'Smart Contract Slam', 'epic'),
('Solana Stallion', 'SOL', 90, 65, 95, 'Speed Burst', 'epic'),
('Cardano Cowboy', 'ADA', 70, 85, 70, 'Proof of Stake', 'rare'),
('Dogecoin Doge', 'DOGE', 60, 60, 80, 'Meme Magic', 'common'),
('Polygon Pony', 'MATIC', 75, 70, 85, 'Layer 2 Leap', 'rare');

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_players_firebase_uid ON players(firebase_uid);
CREATE INDEX IF NOT EXISTS idx_fights_player_id ON fights(player_id);
CREATE INDEX IF NOT EXISTS idx_land_deeds_player_id ON land_deeds(player_id);

-- Update trigger for players table
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_players_updated_at BEFORE UPDATE ON players
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
