// Quiz Configuration Types
// Based on PRD.md JSON Schema

export interface QuizTheme {
  primary: string;
  background: string;
  text?: string;
}

export interface QuizMeta {
  id: string;
  title: string;
  description: string;
  theme: QuizTheme;
}

export interface GradingTier {
  min: number;
  max: number;
  title: string;
  emoji?: string;
}

export interface QuizGrading {
  total_questions: number;
  tiers: GradingTier[];
}

export type TriggerType = 'confetti' | 'shake_screen' | 'haptic' | null;

export interface Question {
  id: number;
  text: string;
  weight: number;
  trigger?: TriggerType;
  tag?: string;
}

export interface AchievementCondition {
  required_ids?: number[];
  mode?: 'all' | 'any';
  threshold?: number;
  tag?: string;
}

export interface Achievement {
  id: string;
  title: string;
  condition: AchievementCondition;
  reward?: string;
}

export interface QuizConfig {
  meta: QuizMeta;
  grading: QuizGrading;
  questions: Question[];
  achievements?: Achievement[];
}

// Quiz State Types
export interface QuizState {
  checkedIds: Set<number>;
  score: number;
  submitted: boolean;
}

// API Types
export interface SubmitScoreRequest {
  quiz_id: string;
  raw_score: number;
  checked_ids: number[];
  total_questions: number;
}

export interface SubmitScoreResponse {
  success: boolean;
  percentile: number;
  rank_title: string;
  achievements: Achievement[];
  session_id: string;
}
