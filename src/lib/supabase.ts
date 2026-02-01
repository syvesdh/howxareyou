import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create a single supabase client for the browser
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types (for future Supabase integration)
export interface QuizSubmission {
  id?: string;
  quiz_id: string;
  session_id: string;
  raw_score: number;
  checked_ids: number[];
  percentile?: number;
  created_at?: string;
}

/**
 * Submit a quiz score to the database
 * For MVP: This will be a simple mock until Supabase is set up
 */
export async function submitQuizScore(submission: Omit<QuizSubmission, 'id' | 'created_at'>): Promise<{
  percentile: number;
  totalSubmissions: number;
}> {
  // TODO: Implement actual Supabase storage in Phase 2
  // For now, return mock data
  
  // Simulate percentile calculation
  // In production, this would query the database
  const mockPercentile = Math.min(95, Math.max(5, submission.raw_score * 4));
  
  return {
    percentile: mockPercentile,
    totalSubmissions: 1000 + Math.floor(Math.random() * 500),
  };
}

/**
 * Get statistics for a quiz
 */
export async function getQuizStats(quizId: string): Promise<{
  totalSubmissions: number;
  averageScore: number;
}> {
  // TODO: Implement actual Supabase query
  return {
    totalSubmissions: 1247,
    averageScore: 14.3,
  };
}
