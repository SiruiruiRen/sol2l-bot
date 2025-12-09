-- Quick check for data in new analytics tables
-- Run this in Supabase to see if analytics tables have data

SELECT 'Analytics Tables Data Check' as status;

-- Check each analytics table for data
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
UNION ALL
SELECT 'content_interaction_logs' as table_name, COUNT(*) as record_count FROM content_interaction_logs
ORDER BY record_count DESC;

-- Note: These tables will be empty until your app code starts populating them
-- The tables exist and are ready, but need to be populated by your application logic 