-- Bar Keep Bill AI System Database Schema
-- Enhanced tables for LangGraph agent with human oversight

-- Player interactions and conversation history
CREATE TABLE IF NOT EXISTS bill_conversations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    player_id TEXT NOT NULL,
    message_role TEXT NOT NULL CHECK (message_role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    bill_mood TEXT DEFAULT 'cheerful',
    energy_level INTEGER DEFAULT 75 CHECK (energy_level >= 0 AND energy_level <= 100),
    wisdom_points INTEGER DEFAULT 0,
    event_type TEXT DEFAULT 'idle',
    requires_review BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Human review queue for sensitive interactions
CREATE TABLE IF NOT EXISTS bill_human_reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    player_id TEXT NOT NULL,
    conversation_context JSONB NOT NULL,
    proposed_response TEXT,
    review_reason TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'modified')),
    reviewer_id TEXT,
    reviewer_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    final_response TEXT
);

-- Market events that trigger Bill's responses
CREATE TABLE IF NOT EXISTS market_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_type TEXT NOT NULL,
    market_data JSONB,
    price_change DECIMAL(10,4),
    volume BIGINT,
    triggered_responses INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Player state tracking for Bill's memory
CREATE TABLE IF NOT EXISTS player_bill_state (
    player_id TEXT PRIMARY KEY,
    total_interactions INTEGER DEFAULT 0,
    wisdom_points INTEGER DEFAULT 0,
    favorite_drink TEXT,
    last_mood TEXT DEFAULT 'cheerful',
    last_interaction TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    conversation_summary TEXT,
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bill's drink inventory and effects
CREATE TABLE IF NOT EXISTS saloon_drinks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    price DECIMAL(8,2) DEFAULT 0.00,
    alcohol_content INTEGER DEFAULT 0,
    mood_effect TEXT,
    energy_effect INTEGER DEFAULT 0,
    wisdom_effect INTEGER DEFAULT 0,
    available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert Bill's drink menu
INSERT INTO saloon_drinks (name, description, price, alcohol_content, mood_effect, energy_effect, wisdom_effect) VALUES
('Snipers Sarsaparilla', 'Non-alcoholic frontier favorite with a sharp kick', 2.50, 0, 'alert', 10, 2),
('Prairie Pilsner', 'Light beer brewed with Wyoming barley', 3.00, 5, 'relaxed', -5, 1),
('Wyoverse Whiskey', 'Premium frontier whiskey aged in digital oak', 5.00, 40, 'confident', -10, 5),
('Buffalo Bourbon', 'Smooth bourbon with hints of prairie grass', 6.00, 45, 'bold', -15, 8),
('Fresh Frontier Milk', 'Cold milk for the young pioneers', 1.50, 0, 'wholesome', 5, 1),
('Mountain Spring Water', 'Pure water from the Grand Tetons', 1.00, 0, 'refreshed', 3, 0);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_bill_conversations_player_id ON bill_conversations(player_id);
CREATE INDEX IF NOT EXISTS idx_bill_conversations_created_at ON bill_conversations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bill_human_reviews_status ON bill_human_reviews(status);
CREATE INDEX IF NOT EXISTS idx_market_events_created_at ON market_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_player_bill_state_last_interaction ON player_bill_state(last_interaction DESC);

-- Functions for Bill's AI system
CREATE OR REPLACE FUNCTION update_player_bill_state()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO player_bill_state (player_id, total_interactions, last_interaction, last_mood)
    VALUES (NEW.player_id, 1, NEW.created_at, NEW.bill_mood)
    ON CONFLICT (player_id) 
    DO UPDATE SET
        total_interactions = player_bill_state.total_interactions + 1,
        last_interaction = NEW.created_at,
        last_mood = NEW.bill_mood,
        updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update player state
CREATE TRIGGER trigger_update_player_bill_state
    AFTER INSERT ON bill_conversations
    FOR EACH ROW
    EXECUTE FUNCTION update_player_bill_state();

-- Function to get Bill's current mood based on recent market events
CREATE OR REPLACE FUNCTION get_bill_current_mood()
RETURNS TEXT AS $$
DECLARE
    recent_event market_events%ROWTYPE;
    current_mood TEXT DEFAULT 'cheerful';
BEGIN
    -- Get most recent market event
    SELECT * INTO recent_event
    FROM market_events
    WHERE created_at > NOW() - INTERVAL '1 hour'
    ORDER BY created_at DESC
    LIMIT 1;
    
    IF recent_event.event_type IS NOT NULL THEN
        CASE recent_event.event_type
            WHEN 'market_boom' THEN current_mood := 'excited';
            WHEN 'market_crash' THEN current_mood := 'concerned';
            WHEN 'high_activity' THEN current_mood := 'energetic';
            ELSE current_mood := 'cheerful';
        END CASE;
    END IF;
    
    RETURN current_mood;
END;
$$ LANGUAGE plpgsql;

-- Real-time subscription setup for human review notifications
CREATE OR REPLACE FUNCTION notify_human_review()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM pg_notify('bill_human_review', json_build_object(
        'id', NEW.id,
        'player_id', NEW.player_id,
        'review_reason', NEW.review_reason,
        'created_at', NEW.created_at
    )::text);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_notify_human_review
    AFTER INSERT ON bill_human_reviews
    FOR EACH ROW
    EXECUTE FUNCTION notify_human_review();

-- Grant permissions for the application
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- Insert sample market event for testing
INSERT INTO market_events (event_type, market_data, price_change, volume) VALUES
('market_boom', '{"symbol": "AVAX", "price": 45.50}', 8.5, 1500000);

COMMIT;
