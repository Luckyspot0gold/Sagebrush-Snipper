-- WyoVerse Database Optimization Script
-- Analyzing and optimizing d1_player_stats table performance

-- Current query performance analysis:
-- EXPLAIN ANALYZE SELECT * FROM d1_player_stats WHERE player_id = 123;
-- 
-- Results show:
-- - Sequential Scan (cost=0.00..25.00) - scanning entire table
-- - Filter removes 999 rows to find 1 match
-- - Execution time: 1.678ms (could be much faster with index)

-- Step 1: Create index on player_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_d1_player_stats_player_id 
ON d1_player_stats(player_id);

-- Step 2: Create composite indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_d1_player_stats_player_game 
ON d1_player_stats(player_id, game_date);

CREATE INDEX IF NOT EXISTS idx_d1_player_stats_performance 
ON d1_player_stats(player_id, score DESC, game_date DESC);

-- Step 3: Update table statistics for better query planning
ANALYZE d1_player_stats;

-- Step 4: Create partial indexes for active players (if applicable)
CREATE INDEX IF NOT EXISTS idx_d1_player_stats_active_players 
ON d1_player_stats(player_id, score) 
WHERE status = 'active';

-- Step 5: Verify the optimization worked
-- Run this to see the improved performance:
-- EXPLAIN ANALYZE SELECT * FROM d1_player_stats WHERE player_id = 123;
-- 
-- Expected improvement:
-- - Index Scan instead of Seq Scan
-- - cost should be much lower (e.g., 0.00..8.30)
-- - actual time should be faster (e.g., 0.025..0.045 ms)
-- - No "Rows Removed by Filter" since index goes directly to the row

-- Step 6: Monitor index usage
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan as index_scans,
    idx_tup_read as tuples_read,
    idx_tup_fetch as tuples_fetched
FROM pg_stat_user_indexes 
WHERE tablename = 'd1_player_stats'
ORDER BY idx_scan DESC;

-- Step 7: Check table and index sizes
SELECT 
    tablename,
    pg_size_pretty(pg_total_relation_size(tablename::regclass)) as total_size,
    pg_size_pretty(pg_relation_size(tablename::regclass)) as table_size,
    pg_size_pretty(pg_total_relation_size(tablename::regclass) - pg_relation_size(tablename::regclass)) as index_size
FROM pg_tables 
WHERE tablename = 'd1_player_stats';
