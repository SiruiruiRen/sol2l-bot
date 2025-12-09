-- Enhanced Analytics Schema for SoLBot Research
-- This script adds comprehensive tracking tables for detailed user behavior analysis

-- Step 1: Drop existing analytics tables if they exist
DROP TABLE IF EXISTS "user_video_analytics" CASCADE;
DROP TABLE IF EXISTS "user_chat_analytics" CASCADE;
DROP TABLE IF EXISTS "user_revision_tracking" CASCADE;
DROP TABLE IF EXISTS "knowledge_check_attempts" CASCADE;
DROP TABLE IF EXISTS "phase_completion_analytics" CASCADE;
DROP TABLE IF EXISTS "user_engagement_sessions" CASCADE;
DROP TABLE IF EXISTS "content_interaction_logs" CASCADE;

-- Step 2: Enhanced assessments table with better tracking
-- First, let's add missing columns to the existing assessments table
ALTER TABLE assessments 
ADD COLUMN IF NOT EXISTS time_spent_seconds INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS revision_count INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS previous_scores JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS improvement_trajectory TEXT,
ADD COLUMN IF NOT EXISTS submission_quality_change REAL;

-- Update the comment to reflect new capabilities
COMMENT ON TABLE "assessments" IS 'Enhanced: Captures every submission with detailed revision tracking and performance analytics.';

-- Step 3: Create user_engagement_sessions table for detailed time tracking
CREATE TABLE user_engagement_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    activity_type TEXT NOT NULL CHECK (activity_type IN ('video', 'chat', 'knowledge_check', 'reading', 'navigation')),
    phase TEXT,
    component TEXT,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ,
    duration_seconds INTEGER,
    interaction_count INTEGER DEFAULT 0,
    completion_percentage REAL DEFAULT 0,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_engagement_session_id ON user_engagement_sessions(session_id);
CREATE INDEX idx_engagement_user_id ON user_engagement_sessions(user_id);
CREATE INDEX idx_engagement_activity_type ON user_engagement_sessions(activity_type);
CREATE INDEX idx_engagement_phase ON user_engagement_sessions(phase);

COMMENT ON TABLE "user_engagement_sessions" IS 'Tracks detailed time spent on different activities for engagement analysis.';

-- Step 4: Create user_video_analytics table for video engagement tracking
CREATE TABLE user_video_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    phase TEXT NOT NULL,
    video_name TEXT NOT NULL,
    total_duration_seconds INTEGER,
    watched_duration_seconds INTEGER DEFAULT 0,
    completion_percentage REAL DEFAULT 0,
    play_count INTEGER DEFAULT 1,
    pause_count INTEGER DEFAULT 0,
    rewind_count INTEGER DEFAULT 0,
    fast_forward_count INTEGER DEFAULT 0,
    watch_patterns JSONB DEFAULT '[]'::jsonb, -- Array of {timestamp, action, position}
    completed_at TIMESTAMPTZ,
    first_play_at TIMESTAMPTZ DEFAULT NOW(),
    last_interaction_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_video_analytics_session_id ON user_video_analytics(session_id);
CREATE INDEX idx_video_analytics_user_id ON user_video_analytics(user_id);
CREATE INDEX idx_video_analytics_phase ON user_video_analytics(phase);

COMMENT ON TABLE "user_video_analytics" IS 'Comprehensive video engagement tracking for learning analytics.';

-- Step 5: Create user_chat_analytics table for chat interaction analysis
CREATE TABLE user_chat_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    phase TEXT,
    component TEXT,
    chat_start_time TIMESTAMPTZ,
    chat_end_time TIMESTAMPTZ,
    total_duration_seconds INTEGER,
    message_count INTEGER DEFAULT 0,
    user_message_count INTEGER DEFAULT 0,
    bot_message_count INTEGER DEFAULT 0,
    average_response_time_seconds REAL,
    longest_pause_seconds INTEGER,
    typing_patterns JSONB DEFAULT '[]'::jsonb,
    engagement_score REAL, -- Calculated based on interaction patterns
    completion_quality TEXT CHECK (completion_quality IN ('incomplete', 'basic', 'thorough', 'excellent')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_chat_analytics_session_id ON user_chat_analytics(session_id);
CREATE INDEX idx_chat_analytics_user_id ON user_chat_analytics(user_id);
CREATE INDEX idx_chat_analytics_phase ON user_chat_analytics(phase);

COMMENT ON TABLE "user_chat_analytics" IS 'Detailed chat interaction patterns and engagement metrics.';

-- Step 6: Create user_revision_tracking table for revision analysis
CREATE TABLE user_revision_tracking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    assessment_id UUID REFERENCES assessments(id) ON DELETE CASCADE,
    phase TEXT,
    component TEXT,
    revision_number INTEGER NOT NULL,
    previous_score REAL,
    new_score REAL,
    score_improvement REAL,
    content_changes JSONB, -- Track what specifically changed
    time_between_revisions_seconds INTEGER,
    feedback_addressed JSONB, -- Which feedback points were addressed
    learning_progression TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_revision_tracking_session_id ON user_revision_tracking(session_id);
CREATE INDEX idx_revision_tracking_user_id ON user_revision_tracking(user_id);
CREATE INDEX idx_revision_tracking_assessment_id ON user_revision_tracking(assessment_id);

COMMENT ON TABLE "user_revision_tracking" IS 'Tracks every revision attempt with detailed improvement analysis.';

-- Step 7: Create knowledge_check_attempts table for quiz/assessment tracking
CREATE TABLE knowledge_check_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    phase TEXT,
    question_id TEXT,
    question_text TEXT,
    attempt_number INTEGER DEFAULT 1,
    selected_answer TEXT,
    correct_answer TEXT,
    is_correct BOOLEAN,
    time_to_answer_seconds INTEGER,
    confidence_level INTEGER CHECK (confidence_level BETWEEN 1 AND 5),
    help_used BOOLEAN DEFAULT FALSE,
    answer_changed BOOLEAN DEFAULT FALSE,
    thinking_time_seconds INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_knowledge_check_session_id ON knowledge_check_attempts(session_id);
CREATE INDEX idx_knowledge_check_user_id ON knowledge_check_attempts(user_id);
CREATE INDEX idx_knowledge_check_phase ON knowledge_check_attempts(phase);

COMMENT ON TABLE "knowledge_check_attempts" IS 'Detailed tracking of knowledge check questions and learning assessment.';

-- Step 8: Create phase_completion_analytics table for learning progression tracking
CREATE TABLE phase_completion_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    phase TEXT NOT NULL,
    phase_start_time TIMESTAMPTZ,
    phase_end_time TIMESTAMPTZ,
    total_time_seconds INTEGER,
    video_time_seconds INTEGER DEFAULT 0,
    chat_time_seconds INTEGER DEFAULT 0,
    knowledge_check_time_seconds INTEGER DEFAULT 0,
    revision_count INTEGER DEFAULT 0,
    final_assessment_score REAL,
    learning_efficiency_score REAL, -- Score/time ratio
    engagement_quality TEXT CHECK (engagement_quality IN ('low', 'medium', 'high', 'excellent')),
    completed_successfully BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_phase_completion_session_id ON phase_completion_analytics(session_id);
CREATE INDEX idx_phase_completion_user_id ON phase_completion_analytics(user_id);
CREATE INDEX idx_phase_completion_phase ON phase_completion_analytics(phase);

COMMENT ON TABLE "phase_completion_analytics" IS 'Comprehensive phase completion tracking for learning outcome analysis.';

-- Step 9: Create content_interaction_logs table for granular interaction tracking
CREATE TABLE content_interaction_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    interaction_type TEXT NOT NULL,
    content_type TEXT NOT NULL,
    phase TEXT,
    component TEXT,
    interaction_data JSONB NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    sequence_number INTEGER -- For ordering interactions
);

CREATE INDEX idx_content_logs_session_id ON content_interaction_logs(session_id);
CREATE INDEX idx_content_logs_user_id ON content_interaction_logs(user_id);
CREATE INDEX idx_content_logs_timestamp ON content_interaction_logs(timestamp);

COMMENT ON TABLE "content_interaction_logs" IS 'Granular logging of all user interactions for behavioral analysis.';

-- Step 10: Create useful views for research analysis

-- View 1: User Learning Journey Overview
CREATE OR REPLACE VIEW user_learning_journey AS
SELECT 
    u.id as user_id,
    u.name,
    u.email,
    s.id as session_id,
    s.created_at as journey_start,
    COUNT(DISTINCT pca.phase) as phases_completed,
    SUM(pca.total_time_seconds) as total_learning_time,
    AVG(pca.final_assessment_score) as average_score,
    SUM(pca.revision_count) as total_revisions,
    MAX(pca.created_at) as last_activity
FROM users u
JOIN sessions s ON u.id = s.user_id
LEFT JOIN phase_completion_analytics pca ON s.id = pca.session_id
GROUP BY u.id, u.name, u.email, s.id, s.created_at;

-- View 2: Revision Patterns Analysis
CREATE OR REPLACE VIEW revision_patterns_analysis AS
SELECT 
    urt.user_id,
    urt.phase,
    urt.component,
    COUNT(*) as total_revisions,
    AVG(urt.score_improvement) as avg_score_improvement,
    AVG(urt.time_between_revisions_seconds) as avg_revision_interval,
    MIN(urt.previous_score) as initial_score,
    MAX(urt.new_score) as final_score,
    (MAX(urt.new_score) - MIN(urt.previous_score)) as total_improvement
FROM user_revision_tracking urt
GROUP BY urt.user_id, urt.phase, urt.component;

-- View 3: Video Engagement Summary
CREATE OR REPLACE VIEW video_engagement_summary AS
SELECT 
    uva.user_id,
    uva.phase,
    uva.video_name,
    uva.completion_percentage,
    uva.play_count,
    uva.pause_count,
    uva.rewind_count,
    (uva.watched_duration_seconds::REAL / NULLIF(uva.total_duration_seconds, 0)) * 100 as watch_efficiency,
    CASE 
        WHEN uva.completion_percentage >= 90 THEN 'Complete'
        WHEN uva.completion_percentage >= 50 THEN 'Partial'
        ELSE 'Minimal'
    END as engagement_level
FROM user_video_analytics uva;

-- View 4: Knowledge Check Performance
CREATE OR REPLACE VIEW knowledge_check_performance AS
SELECT 
    kca.user_id,
    kca.phase,
    COUNT(*) as total_attempts,
    SUM(CASE WHEN kca.is_correct THEN 1 ELSE 0 END) as correct_answers,
    (SUM(CASE WHEN kca.is_correct THEN 1 ELSE 0 END)::REAL / COUNT(*)) * 100 as accuracy_percentage,
    AVG(kca.time_to_answer_seconds) as avg_response_time,
    AVG(kca.confidence_level) as avg_confidence
FROM knowledge_check_attempts kca
GROUP BY kca.user_id, kca.phase;

-- Step 11: Insert system message to confirm setup
INSERT INTO public.messages (id, role, content, phase, component) 
VALUES (gen_random_uuid(), 'system', 'Enhanced analytics schema created successfully with comprehensive tracking capabilities.', 'system', 'analytics_setup');

-- Step 12: Create functions for calculating derived metrics

-- Function to calculate engagement score
CREATE OR REPLACE FUNCTION calculate_engagement_score(
    session_id_param UUID,
    phase_param TEXT DEFAULT NULL
) RETURNS REAL AS $$
DECLARE
    engagement_score REAL := 0;
    video_score REAL := 0;
    chat_score REAL := 0;
    knowledge_score REAL := 0;
BEGIN
    -- Video engagement (0-30 points)
    SELECT COALESCE(AVG(completion_percentage), 0) * 0.3
    INTO video_score
    FROM user_video_analytics 
    WHERE session_id = session_id_param 
    AND (phase_param IS NULL OR phase = phase_param);
    
    -- Chat engagement (0-40 points)
    SELECT COALESCE(AVG(
        CASE 
            WHEN engagement_score IS NOT NULL THEN engagement_score
            ELSE LEAST(message_count * 2, 40)
        END
    ), 0) * 0.4
    INTO chat_score
    FROM user_chat_analytics 
    WHERE session_id = session_id_param
    AND (phase_param IS NULL OR phase = phase_param);
    
    -- Knowledge check performance (0-30 points)
    SELECT COALESCE(AVG(
        CASE WHEN is_correct THEN 30 ELSE 0 END
    ), 0) * 0.3
    INTO knowledge_score
    FROM knowledge_check_attempts 
    WHERE session_id = session_id_param
    AND (phase_param IS NULL OR phase = phase_param);
    
    engagement_score := video_score + chat_score + knowledge_score;
    
    RETURN LEAST(engagement_score, 100); -- Cap at 100
END;
$$ LANGUAGE plpgsql;

-- Function to calculate learning efficiency
CREATE OR REPLACE FUNCTION calculate_learning_efficiency(
    user_id_param UUID,
    phase_param TEXT
) RETURNS REAL AS $$
DECLARE
    final_score REAL;
    total_time INTEGER;
    revision_count INTEGER;
    efficiency REAL := 0;
BEGIN
    SELECT 
        COALESCE(final_assessment_score, 0),
        COALESCE(total_time_seconds, 1),
        COALESCE(revision_count, 1)
    INTO final_score, total_time, revision_count
    FROM phase_completion_analytics
    WHERE user_id = user_id_param AND phase = phase_param;
    
    -- Efficiency = (Score * 100) / (Time in hours * Revision penalty)
    efficiency := (final_score * 100) / ((total_time / 3600.0) * POWER(revision_count, 0.5));
    
    RETURN efficiency;
END;
$$ LANGUAGE plpgsql;

SELECT 'Enhanced analytics schema with comprehensive tracking capabilities created successfully!' AS status; 