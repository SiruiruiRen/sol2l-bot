-- Fixed Research Analytics Queries for SoLBot
-- This file contains corrected queries with proper type casting and null handling

-- =====================================================
-- 1. USER ENGAGEMENT ANALYSIS (FIXED)
-- =====================================================

-- Query 1.1: Overall user engagement summary (Fixed)
SELECT 
    u.name,
    u.email,
    COUNT(DISTINCT s.id) as total_sessions,
    COUNT(DISTINCT pca.phase) as phases_completed,
    ROUND(COALESCE(SUM(pca.total_time_seconds), 0)::numeric / 3600.0, 2) as total_hours,
    ROUND(COALESCE(AVG(pca.final_assessment_score), 0)::numeric, 2) as avg_score,
    COALESCE(SUM(pca.revision_count), 0) as total_revisions
FROM users u
JOIN sessions s ON u.id = s.user_id
LEFT JOIN phase_completion_analytics pca ON s.id = pca.session_id
GROUP BY u.id, u.name, u.email
ORDER BY total_hours DESC;

-- Query 1.2: Phase-by-phase engagement breakdown (Fixed)
SELECT 
    phase,
    COUNT(DISTINCT user_id) as unique_users,
    ROUND(COALESCE(AVG(total_time_seconds), 0)::numeric / 60.0, 1) as avg_minutes_spent,
    ROUND(COALESCE(AVG(final_assessment_score), 0)::numeric, 2) as avg_final_score,
    ROUND(COALESCE(AVG(revision_count), 0)::numeric, 1) as avg_revisions,
    COUNT(CASE WHEN completed_successfully THEN 1 END) as successful_completions,
    ROUND(COUNT(CASE WHEN completed_successfully THEN 1 END)::numeric * 100.0 / GREATEST(COUNT(*), 1), 1) as completion_rate_percent
FROM phase_completion_analytics
GROUP BY phase
ORDER BY phase;

-- =====================================================
-- 2. REVISION PATTERN ANALYSIS (FIXED)
-- =====================================================

-- Query 2.1: User revision behavior patterns (Fixed)
SELECT 
    u.name,
    urt.phase,
    urt.component,
    COUNT(*) as revision_attempts,
    ROUND(COALESCE(MIN(urt.previous_score), 0)::numeric, 2) as starting_score,
    ROUND(COALESCE(MAX(urt.new_score), 0)::numeric, 2) as final_score,
    ROUND(COALESCE(MAX(urt.new_score) - MIN(urt.previous_score), 0)::numeric, 2) as total_improvement,
    ROUND(COALESCE(AVG(urt.time_between_revisions_seconds), 0)::numeric / 60.0, 1) as avg_minutes_between_revisions
FROM user_revision_tracking urt
JOIN users u ON urt.user_id = u.id
GROUP BY u.id, u.name, urt.phase, urt.component
HAVING COUNT(*) > 1  -- Only users who revised
ORDER BY total_improvement DESC;

-- Query 2.2: Revision effectiveness analysis (Fixed)
SELECT 
    revision_number,
    COUNT(*) as attempts_at_this_revision,
    ROUND(COALESCE(AVG(score_improvement), 0)::numeric, 3) as avg_score_improvement,
    ROUND(COALESCE(AVG(time_between_revisions_seconds), 0)::numeric / 60.0, 1) as avg_minutes_to_revise,
    COUNT(CASE WHEN score_improvement > 0 THEN 1 END) as improvements,
    ROUND(COUNT(CASE WHEN score_improvement > 0 THEN 1 END)::numeric * 100.0 / GREATEST(COUNT(*), 1), 1) as improvement_rate_percent
FROM user_revision_tracking
GROUP BY revision_number
ORDER BY revision_number;

-- =====================================================
-- 3. VIDEO ENGAGEMENT ANALYSIS (FIXED)
-- =====================================================

-- Query 3.1: Video engagement by phase (Fixed)
SELECT 
    phase,
    video_name,
    COUNT(*) as total_viewers,
    ROUND(COALESCE(AVG(completion_percentage), 0)::numeric, 1) as avg_completion_percent,
    ROUND(COALESCE(AVG(play_count), 0)::numeric, 1) as avg_play_count,
    ROUND(COALESCE(AVG(pause_count), 0)::numeric, 1) as avg_pause_count,
    ROUND(COALESCE(AVG(rewind_count), 0)::numeric, 1) as avg_rewind_count,
    COUNT(CASE WHEN completion_percentage >= 90 THEN 1 END) as full_completions,
    ROUND(COUNT(CASE WHEN completion_percentage >= 90 THEN 1 END)::numeric * 100.0 / GREATEST(COUNT(*), 1), 1) as full_completion_rate_percent
FROM user_video_analytics
GROUP BY phase, video_name
ORDER BY phase, avg_completion_percent DESC;

-- Query 3.2: User video watching patterns (Fixed)
SELECT 
    u.name,
    uva.phase,
    ROUND(COALESCE(AVG(uva.completion_percentage), 0)::numeric, 1) as avg_completion,
    COALESCE(SUM(uva.play_count), 0) as total_plays,
    COALESCE(SUM(uva.pause_count), 0) as total_pauses,
    COALESCE(SUM(uva.rewind_count), 0) as total_rewinds,
    ROUND(COALESCE(SUM(uva.watched_duration_seconds), 0)::numeric / 60.0, 1) as total_watch_minutes,
    CASE 
        WHEN AVG(uva.completion_percentage) >= 90 THEN 'High Engagement'
        WHEN AVG(uva.completion_percentage) >= 50 THEN 'Medium Engagement'
        ELSE 'Low Engagement'
    END as engagement_category
FROM user_video_analytics uva
JOIN users u ON uva.user_id = u.id
GROUP BY u.id, u.name, uva.phase
ORDER BY avg_completion DESC;

-- =====================================================
-- 4. CHAT INTERACTION ANALYSIS (FIXED)
-- =====================================================

-- Query 4.1: Chat engagement patterns by phase (Fixed)
SELECT 
    phase,
    component,
    COUNT(*) as chat_sessions,
    ROUND(COALESCE(AVG(total_duration_seconds), 0)::numeric / 60.0, 1) as avg_duration_minutes,
    ROUND(COALESCE(AVG(message_count), 0)::numeric, 1) as avg_total_messages,
    ROUND(COALESCE(AVG(user_message_count), 0)::numeric, 1) as avg_user_messages,
    ROUND(COALESCE(AVG(average_response_time_seconds), 0)::numeric, 1) as avg_response_time_seconds,
    COUNT(CASE WHEN completion_quality IN ('thorough', 'excellent') THEN 1 END) as high_quality_completions,
    ROUND(COUNT(CASE WHEN completion_quality IN ('thorough', 'excellent') THEN 1 END)::numeric * 100.0 / GREATEST(COUNT(*), 1), 1) as quality_rate_percent
FROM user_chat_analytics
WHERE phase IS NOT NULL
GROUP BY phase, component
ORDER BY phase, avg_duration_minutes DESC;

-- =====================================================
-- 5. KNOWLEDGE CHECK PERFORMANCE (FIXED)
-- =====================================================

-- Query 5.1: Knowledge check accuracy by phase (Fixed)
SELECT 
    phase,
    COUNT(*) as total_attempts,
    COUNT(DISTINCT user_id) as unique_users,
    ROUND(COALESCE(AVG(CASE WHEN is_correct THEN 1.0 ELSE 0.0 END), 0)::numeric * 100, 1) as accuracy_percent,
    ROUND(COALESCE(AVG(time_to_answer_seconds), 0)::numeric, 1) as avg_response_time_seconds,
    ROUND(COALESCE(AVG(confidence_level), 0)::numeric, 1) as avg_confidence,
    COUNT(CASE WHEN attempt_number > 1 THEN 1 END) as retry_attempts,
    ROUND(COUNT(CASE WHEN attempt_number > 1 THEN 1 END)::numeric * 100.0 / GREATEST(COUNT(*), 1), 1) as retry_rate_percent
FROM knowledge_check_attempts
WHERE phase IS NOT NULL
GROUP BY phase
ORDER BY phase;

-- =====================================================
-- 6. SIMPLE DATA VERIFICATION QUERIES
-- =====================================================

-- Query 6.1: Check what data exists in each table
SELECT 'users' as table_name, COUNT(*) as record_count FROM users
UNION ALL
SELECT 'sessions' as table_name, COUNT(*) as record_count FROM sessions
UNION ALL
SELECT 'messages' as table_name, COUNT(*) as record_count FROM messages
UNION ALL
SELECT 'assessments' as table_name, COUNT(*) as record_count FROM assessments
UNION ALL
SELECT 'user_video_analytics' as table_name, COUNT(*) as record_count FROM user_video_analytics
UNION ALL
SELECT 'user_chat_analytics' as table_name, COUNT(*) as record_count FROM user_chat_analytics
UNION ALL
SELECT 'user_revision_tracking' as table_name, COUNT(*) as record_count FROM user_revision_tracking
UNION ALL
SELECT 'knowledge_check_attempts' as table_name, COUNT(*) as record_count FROM knowledge_check_attempts
UNION ALL
SELECT 'phase_completion_analytics' as table_name, COUNT(*) as record_count FROM phase_completion_analytics
UNION ALL
SELECT 'user_engagement_sessions' as table_name, COUNT(*) as record_count FROM user_engagement_sessions
ORDER BY record_count DESC;

-- Query 6.2: Basic user activity overview
SELECT 
    u.name,
    u.email,
    s.created_at as session_start,
    COUNT(m.id) as total_messages,
    COUNT(a.id) as total_assessments
FROM users u
LEFT JOIN sessions s ON u.id = s.user_id
LEFT JOIN messages m ON s.id = m.session_id
LEFT JOIN assessments a ON s.id = a.session_id
GROUP BY u.id, u.name, u.email, s.id, s.created_at
ORDER BY s.created_at DESC;

-- Query 6.3: Recent activity summary
SELECT 
    DATE(created_at) as activity_date,
    COUNT(DISTINCT session_id) as active_sessions,
    COUNT(*) as total_messages,
    COUNT(CASE WHEN role = 'user' THEN 1 END) as user_messages,
    COUNT(CASE WHEN role = 'assistant' THEN 1 END) as bot_messages
FROM messages
WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
GROUP BY DATE(created_at)
ORDER BY activity_date DESC;

-- =====================================================
-- 7. TESTING PHASE SAMPLE DATA QUERIES
-- =====================================================

-- Query 7.1: Sample user journey (for testing)
SELECT 
    u.name,
    m.phase,
    m.component,
    COUNT(*) as interactions,
    MIN(m.created_at) as first_interaction,
    MAX(m.created_at) as last_interaction
FROM users u
JOIN sessions s ON u.id = s.user_id
JOIN messages m ON s.id = m.session_id
WHERE m.phase IS NOT NULL
GROUP BY u.id, u.name, m.phase, m.component
ORDER BY u.name, first_interaction;

-- Query 7.2: Assessment attempts and scores
SELECT 
    u.name,
    a.phase,
    a.component,
    a.attempt_number,
    a.overall_score,
    a.created_at
FROM users u
JOIN sessions s ON u.id = s.user_id
JOIN assessments a ON s.id = a.session_id
ORDER BY u.name, a.created_at;

-- =====================================================
-- 8. FUNCTIONS WITH BETTER ERROR HANDLING
-- =====================================================

-- Improved engagement score calculation function
CREATE OR REPLACE FUNCTION calculate_engagement_score_safe(
    session_id_param UUID,
    phase_param TEXT DEFAULT NULL
) RETURNS REAL AS $$
DECLARE
    engagement_score REAL := 0;
    video_score REAL := 0;
    chat_score REAL := 0;
    knowledge_score REAL := 0;
BEGIN
    -- Video engagement (0-30 points) with safe calculation
    SELECT COALESCE(AVG(completion_percentage), 0) * 0.3
    INTO video_score
    FROM user_video_analytics 
    WHERE session_id = session_id_param 
    AND (phase_param IS NULL OR phase = phase_param);
    
    -- Chat engagement (0-40 points) with safe calculation
    SELECT COALESCE(AVG(
        CASE 
            WHEN engagement_score IS NOT NULL THEN engagement_score
            ELSE LEAST(COALESCE(message_count, 0) * 2, 40)
        END
    ), 0) * 0.4
    INTO chat_score
    FROM user_chat_analytics 
    WHERE session_id = session_id_param
    AND (phase_param IS NULL OR phase = phase_param);
    
    -- Knowledge check performance (0-30 points) with safe calculation
    SELECT COALESCE(AVG(
        CASE WHEN is_correct THEN 30 ELSE 0 END
    ), 0) * 0.3
    INTO knowledge_score
    FROM knowledge_check_attempts 
    WHERE session_id = session_id_param
    AND (phase_param IS NULL OR phase = phase_param);
    
    engagement_score := COALESCE(video_score, 0) + COALESCE(chat_score, 0) + COALESCE(knowledge_score, 0);
    
    RETURN LEAST(engagement_score, 100); -- Cap at 100
END;
$$ LANGUAGE plpgsql;

SELECT 'Fixed analytics queries created successfully!' AS status; 