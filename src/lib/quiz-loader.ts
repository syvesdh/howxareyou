import { QuizConfig, Achievement } from '@/types/quiz';
import quizData from '@/config/quiz-data.json';

/**
 * Load quiz configuration by ID
 * In the MVP, we only have one hardcoded quiz
 * In Phase 3, this will fetch from Supabase
 */
export function loadQuizConfig(quizId: string): QuizConfig | null {
  // For MVP: return hardcoded quiz if ID matches
  if (quizId === quizData.meta.id || quizId === 'default') {
    return quizData as QuizConfig;
  }
  return null;
}

/**
 * Get the rank title based on score
 */
export function getRankTitle(config: QuizConfig, score: number): string {
  const tier = config.grading.tiers.find(
    (t) => score >= t.min && score <= t.max
  );
  return tier?.title || 'Unknown Rank';
}

/**
 * Calculate earned achievements based on checked IDs
 */
export function calculateAchievements(
  config: QuizConfig,
  checkedIds: number[]
): Achievement[] {
  if (!config.achievements) return [];

  return config.achievements.filter((achievement) => {
    const { condition } = achievement;

    // Check "all required" mode
    if (condition.required_ids && condition.mode === 'all') {
      return condition.required_ids.every((id) => checkedIds.includes(id));
    }

    // Check "any of" mode
    if (condition.required_ids && condition.mode === 'any') {
      return condition.required_ids.some((id) => checkedIds.includes(id));
    }

    // Check threshold with tag (future feature)
    if (condition.threshold && condition.tag) {
      // Would need questions to have tags
      return false;
    }

    return false;
  });
}

/**
 * Calculate score from checked question IDs
 */
export function calculateScore(config: QuizConfig, checkedIds: number[]): number {
  return config.questions
    .filter((q) => checkedIds.includes(q.id))
    .reduce((sum, q) => sum + q.weight, 0);
}

/**
 * Calculate percentage score
 */
export function calculatePercentage(config: QuizConfig, score: number): number {
  return Math.round((score / config.grading.total_questions) * 100);
}
