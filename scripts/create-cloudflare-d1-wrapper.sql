-- Create Cloudflare D1 Foreign Data Wrapper for WyoVerse
-- This enables direct integration between Supabase and Cloudflare D1

-- Create the WASM foreign data wrapper
CREATE FOREIGN DATA WRAPPER wasm_wrapper
  HANDLER wasm_fdw_handler
  VALIDATOR wasm_fdw_validator;

-- Install the Cloudflare D1 FDW extension
-- Version: 0.1.0
-- Source: https://github.com/supabase/wrappers/releases/download/wasm_cfd1_fdw_v0.1.0/cfd1_fdw.wasm
-- Hash: 783232834bb29dbd3ee6b09618c16f8a847286e63d05c54397d56c3e703fad31

-- Store Cloudflare D1 API credentials securely in Vault
SELECT vault.create_secret(
  'Wyo_Pio_D1_Token',
  '<D1 API token>', -- Replace with actual Cloudflare D1 API token
  'cfd1',
  'Cloudflare D1 API key for WyoVerse Wrappers integration'
);

-- Create foreign server connection to Cloudflare D1
CREATE SERVER wyoverse_d1_server
  FOREIGN DATA WRAPPER wasm_wrapper
  OPTIONS (
    fdw_package_url 'https://github.com/supabase/wrappers/releases/download/wasm_cfd1_fdw_v0.1.0/cfd1_fdw.wasm',
    fdw_package_name 'cfd1_fdw',
    fdw_package_version '0.1.0',
    fdw_package_checksum '783232834bb29dbd3ee6b09618c16f8a847286e63d05c54397d56c3e703fad31',
    api_url 'https://api.cloudflare.com/client/v4',
    account_id '<your-cloudflare-account-id>',
    database_id '<your-d1-database-id>',
    api_token 'Wyo_Pio_D1_Token'
  );

-- Create user mapping for the foreign server
CREATE USER MAPPING FOR postgres
  SERVER wyoverse_d1_server
  OPTIONS (
    api_token 'Wyo_Pio_D1_Token'
  );

-- Create foreign tables to mirror D1 database structure
CREATE FOREIGN TABLE d1_player_stats (
  id INTEGER,
  user_id TEXT,
  game_type TEXT,
  score INTEGER,
  achievements JSONB,
  last_played TIMESTAMP,
  created_at TIMESTAMP
)
SERVER wyoverse_d1_server
OPTIONS (
  table 'player_stats'
);

CREATE FOREIGN TABLE d1_game_sessions (
  session_id TEXT,
  user_id TEXT,
  game_type TEXT,
  start_time TIMESTAMP,
  end_time TIMESTAMP,
  score INTEGER,
  metadata JSONB
)
SERVER wyoverse_d1_server
OPTIONS (
  table 'game_sessions'
);

CREATE FOREIGN TABLE d1_leaderboards (
  id INTEGER,
  game_type TEXT,
  user_id TEXT,
  username TEXT,
  score INTEGER,
  rank INTEGER,
  updated_at TIMESTAMP
)
SERVER wyoverse_d1_server
OPTIONS (
  table 'leaderboards'
);

-- Create views for easy access to D1 data
CREATE VIEW wyoverse_global_leaderboard AS
SELECT 
  game_type,
  username,
  score,
  rank,
  updated_at
FROM d1_leaderboards
ORDER BY game_type, rank;

CREATE VIEW wyoverse_player_performance AS
SELECT 
  ps.user_id,
  ps.game_type,
  ps.score as best_score,
  ps.achievements,
  COUNT(gs.session_id) as total_sessions,
  AVG(gs.score) as average_score,
  MAX(gs.end_time) as last_played
FROM d1_player_stats ps
LEFT JOIN d1_game_sessions gs ON ps.user_id = gs.user_id AND ps.game_type = gs.game_type
GROUP BY ps.user_id, ps.game_type, ps.score, ps.achievements;

-- Create functions for common D1 operations
CREATE OR REPLACE FUNCTION sync_player_stats_to_d1(
  p_user_id TEXT,
  p_game_type TEXT,
  p_score INTEGER,
  p_achievements JSONB DEFAULT '{}'::jsonb
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Insert or update player stats in D1
  INSERT INTO d1_player_stats (user_id, game_type, score, achievements, last_played, created_at)
  VALUES (p_user_id, p_game_type, p_score, p_achievements, NOW(), NOW())
  ON CONFLICT (user_id, game_type) 
  DO UPDATE SET 
    score = GREATEST(d1_player_stats.score, EXCLUDED.score),
    achievements = EXCLUDED.achievements,
    last_played = EXCLUDED.last_played;
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RAISE LOG 'Failed to sync player stats to D1: %', SQLERRM;
    RETURN FALSE;
END;
$$;

CREATE OR REPLACE FUNCTION record_game_session_to_d1(
  p_session_id TEXT,
  p_user_id TEXT,
  p_game_type TEXT,
  p_score INTEGER,
  p_metadata JSONB DEFAULT '{}'::jsonb
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Record game session in D1
  INSERT INTO d1_game_sessions (session_id, user_id, game_type, start_time, end_time, score, metadata)
  VALUES (p_session_id, p_user_id, p_game_type, NOW() - INTERVAL '5 minutes', NOW(), p_score, p_metadata);
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RAISE LOG 'Failed to record game session to D1: %', SQLERRM;
    RETURN FALSE;
END;
$$;

-- Create triggers to automatically sync data to D1
CREATE OR REPLACE FUNCTION trigger_sync_to_d1()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Sync game scores to D1
  IF TG_TABLE_NAME = 'game_scores' THEN
    PERFORM sync_player_stats_to_d1(
      NEW.user_id,
      NEW.game_type,
      NEW.score,
      NEW.metadata
    );
    
    PERFORM record_game_session_to_d1(
      gen_random_uuid()::text,
      NEW.user_id,
      NEW.game_type,
      NEW.score,
      NEW.metadata
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Apply trigger to game_scores table
DROP TRIGGER IF EXISTS sync_game_scores_to_d1 ON game_scores;
CREATE TRIGGER sync_game_scores_to_d1
  AFTER INSERT OR UPDATE ON game_scores
  FOR EACH ROW
  EXECUTE FUNCTION trigger_sync_to_d1();

-- Create health check function for D1 connection
CREATE OR REPLACE FUNCTION check_d1_connection()
RETURNS TABLE(
  status TEXT,
  message TEXT,
  last_sync TIMESTAMP
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    'healthy'::TEXT as status,
    'D1 connection active'::TEXT as message,
    MAX(updated_at) as last_sync
  FROM d1_leaderboards
  LIMIT 1;
EXCEPTION
  WHEN OTHERS THEN
    RETURN QUERY
    SELECT 
      'error'::TEXT as status,
      SQLERRM::TEXT as message,
      NULL::TIMESTAMP as last_sync;
END;
$$;

-- Grant necessary permissions
GRANT USAGE ON FOREIGN SERVER wyoverse_d1_server TO authenticated;
GRANT SELECT ON d1_player_stats TO authenticated;
GRANT SELECT ON d1_game_sessions TO authenticated;
GRANT SELECT ON d1_leaderboards TO authenticated;
GRANT SELECT ON wyoverse_global_leaderboard TO authenticated;
GRANT SELECT ON wyoverse_player_performance TO authenticated;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_d1_player_stats_user_game ON d1_player_stats(user_id, game_type);
CREATE INDEX IF NOT EXISTS idx_d1_game_sessions_user ON d1_game_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_d1_leaderboards_game_rank ON d1_leaderboards(game_type, rank);

-- Insert initial test data
INSERT INTO d1_player_stats (user_id, game_type, score, achievements, last_played, created_at)
VALUES 
  ('test-user-1', 'crypto_clashers_boxing', 1500, '{"first_win": true, "knockout_artist": true}'::jsonb, NOW(), NOW()),
  ('test-user-2', 'digital_rodeo', 2300, '{"bull_rider": true, "champion": false}'::jsonb, NOW(), NOW()),
  ('test-user-3', 'osha_training', 95, '{"safety_expert": true, "perfect_score": false}'::jsonb, NOW(), NOW());

-- Log successful setup
INSERT INTO system_status (component, status, message, timestamp)
VALUES ('cloudflare_d1_integration', 'active', 'D1 foreign data wrapper configured successfully', NOW())
ON CONFLICT (component) DO UPDATE SET
  status = EXCLUDED.status,
  message = EXCLUDED.message,
  timestamp = EXCLUDED.timestamp;

-- Success message
DO $$
BEGIN
  RAISE NOTICE '🎉 Cloudflare D1 integration setup complete!';
  RAISE NOTICE '✅ Foreign data wrapper created';
  RAISE NOTICE '✅ Foreign tables configured';
  RAISE NOTICE '✅ Sync functions deployed';
  RAISE NOTICE '✅ Triggers activated';
  RAISE NOTICE '🚀 WyoVerse is now connected to Cloudflare D1!';
END $$;
