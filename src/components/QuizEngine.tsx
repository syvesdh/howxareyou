"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import confetti from "canvas-confetti";
import { QuizConfig, Achievement } from "@/types/quiz";
import {
  calculateScore,
  getRankTitle,
  calculateAchievements,
} from "@/lib/quiz-loader";
import QuestionItem from "./QuestionItem";
import ProgressBar from "./ProgressBar";
import ResultCard from "./ResultCard";

interface QuizEngineProps {
  config: QuizConfig;
}

export default function QuizEngine({ config }: QuizEngineProps) {
  const [checkedIds, setCheckedIds] = useState<Set<number>>(new Set());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [percentile, setPercentile] = useState(0);
  const [earnedAchievements, setEarnedAchievements] = useState<Achievement[]>(
    [],
  );
  const [unlockedAchievementIds, setUnlockedAchievementIds] = useState<
    Set<string>
  >(new Set());

  const score = calculateScore(config, Array.from(checkedIds));
  const rankTitle = getRankTitle(config, score);
  const themeColor = config.meta.theme.primary;

  // Check for newly unlocked achievements
  useEffect(() => {
    const achievements = calculateAchievements(config, Array.from(checkedIds));

    // Track which achievements are new
    const newAchievements: Achievement[] = [];

    setUnlockedAchievementIds((prev) => {
      const newSet = new Set(prev);
      achievements.forEach((achievement) => {
        if (!prev.has(achievement.id)) {
          newSet.add(achievement.id);
          newAchievements.push(achievement);
        }
      });
      return newSet;
    });

    // Show toast for each new achievement (outside setState)
    newAchievements.forEach((achievement) => {
      toast.success(
        <div className="text-center">
          <div className="text-lg font-bold">🏆 Achievement Unlocked!</div>
          <div className="text-sm">{achievement.title}</div>
        </div>,
        {
          duration: 3000,
          style: {
            background: "#1f2937",
            color: "#fff",
            border: `1px solid ${themeColor}`,
          },
        },
      );
    });
  }, [checkedIds, config, themeColor]);

  const handleToggle = useCallback((id: number, checked: boolean) => {
    setCheckedIds((prev) => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  }, []);

  const handleSubmit = async () => {
    // Fire celebration confetti
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 },
    });

    // Calculate final achievements
    const achievements = calculateAchievements(config, Array.from(checkedIds));
    setEarnedAchievements(achievements);

    // Mock API call - in production this would hit /api/submit-score
    const mockPercentile = Math.min(95, Math.max(5, score * 4));
    setPercentile(mockPercentile);

    setIsSubmitted(true);
  };

  const handleShare = async () => {
    const shareText = `I scored ${Math.round((score / config.grading.total_questions) * 100)}% on "${config.meta.title}" - ${rankTitle}! 🎉`;
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";

    if (navigator.share) {
      try {
        await navigator.share({
          title: config.meta.title,
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // User cancelled or share failed
        await copyToClipboard(shareUrl);
      }
    } else {
      await copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Link copied to clipboard!", {
        style: {
          background: "#1f2937",
          color: "#fff",
        },
      });
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleRetry = () => {
    setCheckedIds(new Set());
    setIsSubmitted(false);
    setPercentile(0);
    setEarnedAchievements([]);
    setUnlockedAchievementIds(new Set());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <Toaster position="top-center" />

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ color: themeColor }}
          >
            {config.meta.title}
          </h1>
          <p className="text-gray-400 text-lg">{config.meta.description}</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Progress Bar */}
              <div className="sticky top-4 z-10 bg-gray-900/95 backdrop-blur-sm p-4 rounded-xl border border-gray-800 mb-6">
                <ProgressBar
                  current={checkedIds.size}
                  total={config.grading.total_questions}
                  themeColor={themeColor}
                />
              </div>

              {/* Questions */}
              <div className="space-y-3 mb-8">
                {config.questions.map((question, index) => (
                  <QuestionItem
                    key={question.id}
                    question={question}
                    isChecked={checkedIds.has(question.id)}
                    onToggle={handleToggle}
                    themeColor={themeColor}
                    index={index}
                  />
                ))}
              </div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="sticky bottom-4"
              >
                <button
                  onClick={handleSubmit}
                  disabled={checkedIds.size === 0}
                  className={`
                    w-full py-4 rounded-xl font-bold text-lg text-white
                    transition-all duration-300 shadow-brutal
                    hover:shadow-brutal-hover hover:translate-x-[-2px] hover:translate-y-[-2px]
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
                    disabled:hover:translate-x-0 disabled:hover:translate-y-0
                  `}
                  style={{
                    backgroundColor: themeColor,
                  }}
                >
                  Calculate My Score 🚀
                </button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <ResultCard
                score={score}
                totalQuestions={config.grading.total_questions}
                percentile={percentile}
                rankTitle={rankTitle}
                achievements={earnedAchievements}
                themeColor={themeColor}
                onShare={handleShare}
                onRetry={handleRetry}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
