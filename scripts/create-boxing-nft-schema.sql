-- Create wallet users table
CREATE TABLE IF NOT EXISTS wallet_users (
    id VARCHAR(255) PRIMARY KEY,
    wallet_address VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) NOT NULL,
    balance VARCHAR(50) DEFAULT '0',
    wins INTEGER DEFAULT 0,
    losses INTEGER DEFAULT 0,
    total_fights INTEGER DEFAULT 0,
    nft_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    last_login TIMESTAMP DEFAULT NOW(),
    last_fight TIMESTAMP
);

-- Create boxing NFTs table
CREATE TABLE IF NOT EXISTS boxing_nfts (
    id VARCHAR(255) PRIMARY KEY,
    token_id INTEGER UNIQUE NOT NULL,
    owner VARCHAR(255) NOT NULL,
    fighter VARCHAR(255) NOT NULL,
    opponent VARCHAR(255) NOT NULL,
    victory BOOLEAN NOT NULL,
    tokens_earned INTEGER DEFAULT 0,
    transaction_hash VARCHAR(255) NOT NULL,
    metadata JSONB NOT NULL,
    minted_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (owner) REFERENCES wallet_users(wallet_address)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_wallet_users_address ON wallet_users(wallet_address);
CREATE INDEX IF NOT EXISTS idx_boxing_nfts_owner ON boxing_nfts(owner);
CREATE INDEX IF NOT EXISTS idx_boxing_nfts_token_id ON boxing_nfts(token_id);

-- Create function to get user stats
CREATE OR REPLACE FUNCTION get_user_boxing_stats(user_address VARCHAR)
RETURNS TABLE(
    username VARCHAR,
    total_fights INTEGER,
    wins INTEGER,
    losses INTEGER,
    win_rate DECIMAL,
    nft_count INTEGER,
    total_tokens_earned INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        wu.username,
        wu.total_fights,
        wu.wins,
        wu.losses,
        CASE 
            WHEN wu.total_fights > 0 THEN ROUND((wu.wins::DECIMAL / wu.total_fights) * 100, 2)
            ELSE 0
        END as win_rate,
        wu.nft_count,
        COALESCE(SUM(bn.tokens_earned), 0)::INTEGER as total_tokens_earned
    FROM wallet_users wu
    LEFT JOIN boxing_nfts bn ON wu.wallet_address = bn.owner
    WHERE wu.wallet_address = user_address
    GROUP BY wu.username, wu.total_fights, wu.wins, wu.losses, wu.nft_count;
END;
$$ LANGUAGE plpgsql;
