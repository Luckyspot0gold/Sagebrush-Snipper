-- Create affiliate_clicks table
CREATE OR REPLACE FUNCTION create_affiliate_clicks_table()
RETURNS void AS $$
BEGIN
  CREATE TABLE IF NOT EXISTS affiliate_clicks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ad_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    commission DECIMAL(10,2) NOT NULL,
    tier VARCHAR(50) NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    referral_code VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );
  
  -- Create index for performance
  CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_user_id ON affiliate_clicks(user_id);
  CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_ad_id ON affiliate_clicks(ad_id);
  CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_timestamp ON affiliate_clicks(timestamp);
END;
$$ LANGUAGE plpgsql;

-- Create ad_slots table
CREATE OR REPLACE FUNCTION create_ad_slots_table()
RETURNS void AS $$
BEGIN
  CREATE TABLE IF NOT EXISTS ad_slots (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    position VARCHAR(50) NOT NULL,
    current_bid DECIMAL(10,2) NOT NULL DEFAULT 0,
    advertiser VARCHAR(255) NOT NULL,
    destination_url TEXT NOT NULL,
    commission_rate DECIMAL(5,4) NOT NULL DEFAULT 0.05,
    is_active BOOLEAN DEFAULT false,
    ad_content JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );
  
  -- Create unique constraint on position for active ads
  CREATE UNIQUE INDEX IF NOT EXISTS idx_ad_slots_position_active 
  ON ad_slots(position) WHERE is_active = true;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate user earnings
CREATE OR REPLACE FUNCTION get_user_earnings(user_id_param VARCHAR(255))
RETURNS DECIMAL(10,2) AS $$
DECLARE
  total_earnings DECIMAL(10,2);
BEGIN
  SELECT COALESCE(SUM(commission), 0) INTO total_earnings
  FROM affiliate_clicks
  WHERE user_id = user_id_param;
  
  RETURN total_earnings;
END;
$$ LANGUAGE plpgsql;

-- Function to get revenue share breakdown
CREATE OR REPLACE FUNCTION get_revenue_share(total_revenue_param DECIMAL(10,2))
RETURNS TABLE(platform_share DECIMAL(10,2), affiliate_share DECIMAL(10,2)) AS $$
BEGIN
  RETURN QUERY SELECT 
    (total_revenue_param * 0.30) as platform_share,
    (total_revenue_param * 0.70) as affiliate_share;
END;
$$ LANGUAGE plpgsql;
