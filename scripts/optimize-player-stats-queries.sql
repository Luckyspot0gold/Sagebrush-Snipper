-- WyoVerse Database Performance Optimization Script
-- Optimizing d1_player_stats table for better query performance

-- First, let's analyze the current table structure
SELECT 
    schemaname,
    tablename,
    attname,
    n_distinct,
    correlation
FROM pg_stats 
WHERE tablename = 'd1_player_stats';

-- Create primary index on player_id (most common lookup)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_player_stats_player_id 
ON d1_player_stats(player_id);

-- Create composite indexes for common query patterns
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_player_stats_player_game 
ON d1_player_stats(player_id, game_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_player_stats_game_date 
ON d1_player_stats(game_id, created_at);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_player_stats_score_ranking 
ON d1_player_stats(score DESC, player_id);

-- Create partial index for active players only
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_player_stats_active 
ON d1_player_stats(player_id, last_active) 
WHERE status = 'active';

-- Update table statistics for better query planning
ANALYZE d1_player_stats;

-- Create function to monitor query performance
CREATE OR REPLACE FUNCTION check_player_stats_performance(p_player_id INTEGER)
RETURNS TABLE(
    query_type TEXT,
    execution_time_ms NUMERIC,
    rows_examined INTEGER,
    index_used TEXT
) AS $$
DECLARE
    start_time TIMESTAMP;
    end_time TIMESTAMP;
    explain_result TEXT;
BEGIN
    -- Test basic player lookup
    start_time := clock_timestamp();
    PERFORM * FROM d1_player_stats WHERE player_id = p_player_id;
    end_time := clock_timestamp();
    
    query_type := 'Single Player Lookup';
    execution_time_ms := EXTRACT(MILLISECONDS FROM (end_time - start_time));
    
    -- Get explain plan to check index usage
    EXECUTE format('EXPLAIN (FORMAT JSON) SELECT * FROM d1_player_stats WHERE player_id = %s', p_player_id)
    INTO explain_result;
    
    index_used := CASE 
        WHEN explain_result LIKE '%idx_player_stats_player_id%' THEN 'Index Scan'
        ELSE 'Sequential Scan'
    END;
    
    rows_examined := (SELECT count(*) FROM d1_player_stats WHERE player_id = p_player_id);
    
    RETURN NEXT;
END;
$$ LANGUAGE plpgsql;

-- Create monitoring view for ongoing performance tracking
CREATE OR REPLACE VIEW player_stats_performance_monitor AS
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan as index_scans,
    idx_tup_read as tuples_read,
    idx_tup_fetch as tuples_fetched,
    CASE 
        WHEN idx_scan = 0 THEN 'UNUSED'
        WHEN idx_scan < 100 THEN 'LOW_USAGE'
        ELSE 'ACTIVE'
    END as usage_status
FROM pg_stat_user_indexes 
WHERE tablename = 'd1_player_stats'
ORDER BY idx_scan DESC;

-- Test query performance before and after optimization
DO $$
DECLARE
    before_time TIMESTAMP;
    after_time TIMESTAMP;
    test_player_id INTEGER := 123;
BEGIN
    RAISE NOTICE 'Testing query performance for player_id: %', test_player_id;
    
    -- Test the optimized query
    before_time := clock_timestamp();
    PERFORM * FROM d1_player_stats WHERE player_id = test_player_id;
    after_time := clock_timestamp();
    
    RAISE NOTICE 'Query execution time: % ms', 
        EXTRACT(MILLISECONDS FROM (after_time - before_time));
END $$;

-- Create maintenance procedure for ongoing optimization
CREATE OR REPLACE FUNCTION maintain_player_stats_performance()
RETURNS VOID AS $$
BEGIN
    -- Update statistics weekly
    ANALYZE d1_player_stats;
    
    -- Reindex if fragmentation is high
    IF (SELECT pg_relation_size('d1_player_stats') > 1000000000) THEN
        REINDEX TABLE d1_player_stats;
        RAISE NOTICE 'Reindexed d1_player_stats due to size';
    END IF;
    
    -- Log performance metrics
    INSERT INTO performance_log (table_name, optimization_date, notes)
    VALUES ('d1_player_stats', NOW(), 'Routine maintenance completed');
END;
$$ LANGUAGE plpgsql;

-- Create performance log table if it doesn't exist
CREATE TABLE IF NOT EXISTS performance_log (
    id SERIAL PRIMARY KEY,
    table_name VARCHAR(100),
    optimization_date TIMESTAMP DEFAULT NOW(),
    notes TEXT
);

-- Final verification queries
SELECT 'Optimization Complete' as status;
SELECT indexname, indexdef FROM pg_indexes WHERE tablename = 'd1_player_stats';
SELECT * FROM player_stats_performance_monitor;
