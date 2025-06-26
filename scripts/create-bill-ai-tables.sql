-- Create tables for Bill's AI system
CREATE TABLE IF NOT EXISTS bill_interactions (
    id SERIAL PRIMARY KEY,
    event_type VARCHAR(50) NOT NULL,
    context TEXT,
    response TEXT NOT NULL,
    confidence DECIMAL(3,2),
    player_id UUID REFERENCES users(id),
    executed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bill_responses_review (
    id SERIAL PRIMARY KEY,
    event_type VARCHAR(50) NOT NULL,
    context TEXT,
    proposed_response TEXT NOT NULL,
    confidence DECIMAL(3,2),
    requires_approval BOOLEAN DEFAULT TRUE,
    status VARCHAR(20) DEFAULT 'pending_review',
    reviewed_by UUID,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    approved BOOLEAN,
    feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS market_events (
    id SERIAL PRIMARY KEY,
    symbol VARCHAR(10) NOT NULL,
    price_change DECIMAL(10,4),
    volume DECIMAL(20,8),
    significance VARCHAR(20),
    triggered_response BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS player_events (
    id SERIAL PRIMARY KEY,
    player_id UUID REFERENCES users(id),
    event_type VARCHAR(50) NOT NULL,
    event_data JSONB,
    bill_responded BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_bill_interactions_event_type ON bill_interactions(event_type);
CREATE INDEX IF NOT EXISTS idx_bill_interactions_executed_at ON bill_interactions(executed_at);
CREATE INDEX IF NOT EXISTS idx_bill_responses_review_status ON bill_responses_review(status);
CREATE INDEX IF NOT EXISTS idx_market_events_symbol ON market_events(symbol);
CREATE INDEX IF NOT EXISTS idx_market_events_created_at ON market_events(created_at);
CREATE INDEX IF NOT EXISTS idx_player_events_player_id ON player_events(player_id);
CREATE INDEX IF NOT EXISTS idx_player_events_event_type ON player_events(event_type);

-- Functions for Bill's AI
CREATE OR REPLACE FUNCTION notify_bill_event()
RETURNS TRIGGER AS $$
BEGIN
    -- Notify Bill's agent of new events
    PERFORM pg_notify('bill_event', json_build_object(
        'event_type', NEW.event_type,
        'player_id', NEW.player_id,
        'event_data', NEW.event_data
    )::text);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for player events
CREATE TRIGGER bill_event_trigger
    AFTER INSERT ON player_events
    FOR EACH ROW
    EXECUTE FUNCTION notify_bill_event();

-- Insert some sample data for testing
INSERT INTO market_events (symbol, price_change, volume, significance) VALUES
('AVAX', 12.5, 1500000, 'high'),
('STONES', -8.2, 500000, 'medium'),
('TATONKA', 3.1, 250000, 'low');

-- Grant permissions
GRANT ALL ON bill_interactions TO authenticated;
GRANT ALL ON bill_responses_review TO authenticated;
GRANT ALL ON market_events TO authenticated;
GRANT ALL ON player_events TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
