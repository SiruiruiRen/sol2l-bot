import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { session_id, phase, component, start_time } = body;

    const { data: sessionData, error: sessionError } = await supabase
      .from('sessions')
      .select('user_id')
      .eq('id', session_id)
      .single();

    if (sessionError || !sessionData) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    const { data, error } = await supabase
      .from('user_chat_analytics')
      .insert({
        session_id,
        user_id: sessionData.user_id,
        phase,
        component,
        chat_start_time: start_time,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const id = url.pathname.split('/').pop();
        const body = await request.json();
        const { end_time, message_count } = body;

        const { data: existingEntry, error: fetchError } = await supabase
            .from('user_chat_analytics')
            .select('chat_start_time')
            .eq('id', id)
            .single();

        if (fetchError || !existingEntry) {
            return NextResponse.json({ error: 'Chat analytics entry not found' }, { status: 404 });
        }

        const startTime = new Date(existingEntry.chat_start_time);
        const endTime = new Date(end_time);
        const duration_seconds = Math.round((endTime.getTime() - startTime.getTime()) / 1000);

        const { data, error } = await supabase
            .from('user_chat_analytics')
            .update({
                chat_end_time: end_time,
                message_count,
                total_duration_seconds: duration_seconds,
            })
            .eq('id', id)
            .select()
            .single();
            
        if (error) {
            throw error;
        }

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
} 