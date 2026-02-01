import { NextRequest, NextResponse } from 'next/server';
import { loadQuizConfig, getRankTitle, calculateAchievements } from '@/lib/quiz-loader';
import { submitQuizScore } from '@/lib/supabase';
import { SubmitScoreRequest, SubmitScoreResponse } from '@/types/quiz';

// Rate limiting (simple in-memory for MVP)
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const lastSubmit = rateLimitMap.get(ip);
  
  if (lastSubmit && now - lastSubmit < RATE_LIMIT_WINDOW) {
    return true;
  }
  
  rateLimitMap.set(ip, now);
  return false;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';

    // Check rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait before submitting again.' },
        { status: 429 }
      );
    }

    // Parse request body
    const body: SubmitScoreRequest = await request.json();
    const { quiz_id, raw_score, checked_ids, total_questions } = body;

    // Validate required fields
    if (!quiz_id || raw_score === undefined || !checked_ids || !total_questions) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Load quiz config to validate and calculate achievements
    const config = loadQuizConfig(quiz_id);
    if (!config) {
      return NextResponse.json(
        { error: 'Quiz not found' },
        { status: 404 }
      );
    }

    // Generate session ID
    const session_id = crypto.randomUUID();

    // Submit score and get percentile
    const { percentile } = await submitQuizScore({
      quiz_id,
      session_id,
      raw_score,
      checked_ids,
    });

    // Calculate rank and achievements
    const rank_title = getRankTitle(config, raw_score);
    const achievements = calculateAchievements(config, checked_ids);

    const response: SubmitScoreResponse = {
      success: true,
      percentile,
      rank_title,
      achievements,
      session_id,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error submitting score:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    message: 'Submit Score API is running'
  });
}
