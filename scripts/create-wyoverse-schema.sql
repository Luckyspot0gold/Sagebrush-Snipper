-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255),
  username VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  wallet_address VARCHAR(255),
  provider VARCHAR(50) NOT NULL,
  stones_balance DECIMAL(18, 8) DEFAULT 0,
  tatonka_balance DECIMAL(18, 8) DEFAULT 0,
  artifact_balance DECIMAL(18, 8) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create user_assets table for NFTs and items
CREATE TABLE IF NOT EXISTS user_assets (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) REFERENCES users(id),
  asset_type VARCHAR(50) NOT NULL, -- 'nft', 'land_deed', 'item'
  asset_id VARCHAR(255) NOT NULL,
  asset_name VARCHAR(255),
  asset_image TEXT,
  rarity VARCHAR(50),
  acquired_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create marketplace_listings table
CREATE TABLE IF NOT EXISTS marketplace_listings (
  id SERIAL PRIMARY KEY,
  seller_id VARCHAR(255) REFERENCES users(id),
  asset_id VARCHAR(255) NOT NULL,
  asset_type VARCHAR(50) NOT NULL,
  price DECIMAL(18, 8) NOT NULL,
  currency VARCHAR(10) DEFAULT 'STONES',
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'sold', 'cancelled'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create game_scores table
CREATE TABLE IF NOT EXISTS game_scores (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) REFERENCES users(id),
  game_type VARCHAR(50) NOT NULL, -- 'crypto_clashers_boxing', 'crypto_clashers_racing', 'digital_rodeo'
  score INTEGER NOT NULL,
  metadata JSONB, -- Store game-specific data
  achieved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create user_achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) REFERENCES users(id),
  achievement_type VARCHAR(100) NOT NULL,
  achievement_name VARCHAR(255) NOT NULL,
  description TEXT,
  earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_wallet_address ON users(wallet_address);
CREATE INDEX IF NOT EXISTS idx_user_assets_user_id ON user_assets(user_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_listings_status ON marketplace_listings(status);
CREATE INDEX IF NOT EXISTS idx_game_scores_user_game ON game_scores(user_id, game_type);
