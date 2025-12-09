# SoLBot Database Setup Guide for Testing & Research

## Quick Setup Steps (No Migrations Needed)

Since you're in testing phase and don't need to preserve data, follow these steps:

### Step 1: Run the Enhanced Schema
✅ **You've already done this** - Run `enhanced_analytics_schema.sql` in Supabase SQL Editor

### Step 2: Use the Fixed Analytics Queries
❌ **Don't use the original** `research_analytics_queries.sql` (has type casting issues)
✅ **Use instead:** `research_analytics_queries_fixed.sql` (handles empty tables properly)

### Step 3: Verify Setup
Run this query first to check your tables:
```sql
-- Check what data exists in each table
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
```

## What You Have Now

### ✅ Core Tables (From Original Schema)
- `users` - User profiles
- `sessions` - User journeys  
- `messages` - All conversations
- `assessments` - Submissions and evaluations (enhanced with revision tracking)

### ✅ New Analytics Tables (From Enhanced Schema)
- `user_video_analytics` - Video engagement tracking
- `user_chat_analytics` - Chat interaction patterns
- `user_revision_tracking` - Revision attempts and improvements
- `knowledge_check_attempts` - Quiz performance tracking
- `phase_completion_analytics` - Learning progression
- `user_engagement_sessions` - Time tracking by activity
- `content_interaction_logs` - Granular interaction logging

### ✅ Research Views & Functions
- Pre-built views for common analytics
- Safe calculation functions with error handling

## Testing Phase Recommendations

### 1. Start with Basic Queries
Use these queries from the fixed file to verify everything works:
```sql
-- Basic user activity overview
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
```

### 2. Monitor Data Collection
As users interact with your app, data will automatically populate these tables:
- `messages` - Every chat interaction
- `assessments` - Every submission and evaluation
- Analytics tables - Will need to be populated by your app code

### 3. Key Research Queries to Use
Once you have data, these queries will be most valuable:

**User Engagement Summary:**
```sql
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
```

**Revision Patterns:**
```sql
SELECT 
    u.name,
    urt.phase,
    urt.component,
    COUNT(*) as revision_attempts,
    ROUND(COALESCE(MIN(urt.previous_score), 0)::numeric, 2) as starting_score,
    ROUND(COALESCE(MAX(urt.new_score), 0)::numeric, 2) as final_score,
    ROUND(COALESCE(MAX(urt.new_score) - MIN(urt.previous_score), 0)::numeric, 2) as total_improvement
FROM user_revision_tracking urt
JOIN users u ON urt.user_id = u.id
GROUP BY u.id, u.name, urt.phase, urt.component
HAVING COUNT(*) > 1
ORDER BY total_improvement DESC;
```

## No Migrations Needed!

Since you're in testing phase:
- ✅ Just run the SQL files directly in Supabase
- ✅ No need for complex migration setup
- ✅ Can reset/recreate tables anytime during testing
- ✅ All analytics queries handle empty tables gracefully

## Next Steps

1. **Run the fixed queries file** in Supabase SQL Editor
2. **Test with sample data** as users interact with your app
3. **Use the verification queries** to check data collection
4. **Run analytics queries** to see insights as data accumulates

The database is now optimized for comprehensive research analysis while being efficient for testing! 