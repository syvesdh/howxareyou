"use client";

import { motion } from "framer-motion";
import { Achievement } from "@/types/quiz";

interface ResultCardProps {
  score: number;
  totalQuestions: number;
  percentile: number;
  rankTitle: string;
  achievements: Achievement[];
  themeColor?: string;
  onShare: () => void;
  onRetry: () => void;
}

export default function ResultCard({
  score,
  totalQuestions,
  percentile,
  rankTitle,
  achievements,
  themeColor = "#3B82F6",
  onShare,
  onRetry,
}: ResultCardProps) {
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", duration: 0.6 }}
      className="w-full max-w-md mx-auto"
    >
      {/* Main Result Card */}
      <div
        className="rounded-2xl border-2 overflow-hidden"
        style={{
          borderColor: themeColor,
          background: `linear-gradient(135deg, ${themeColor}10, ${themeColor}05)`,
        }}
      >
        {/* Header */}
        <div
          className="p-6 text-center"
          style={{ backgroundColor: `${themeColor}20` }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-6xl font-bold mb-2"
            style={{ color: themeColor }}
          >
            {percentage}%
          </motion.div>
          <p className="text-gray-400 text-sm">
            {score} out of {totalQuestions} checked
          </p>
        </div>

        {/* Rank Title */}
        <div className="p-6 border-t border-gray-700/50">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <p className="text-gray-400 text-sm mb-2">Your Rank</p>
            <h2 className="text-2xl font-bold text-white">{rankTitle}</h2>
          </motion.div>
        </div>

        {/* Percentile */}
        <div className="px-6 pb-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center p-4 rounded-xl bg-gray-800/50 border border-gray-700"
          >
            <p className="text-sm text-gray-400">
              You scored higher than{" "}
              <span className="font-bold text-white">{percentile}%</span> of all
              users
            </p>
          </motion.div>
        </div>

        {/* Achievements */}
        {achievements.length > 0 && (
          <div className="px-6 pb-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-sm text-gray-400 mb-3">🏆 Badges Earned</p>
              <div className="flex flex-wrap gap-2">
                {achievements.map((achievement, i) => (
                  <motion.span
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + i * 0.1 }}
                    className="px-3 py-1.5 rounded-full bg-gray-800 border border-gray-700 text-sm"
                  >
                    {achievement.title}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="flex gap-3 mt-6"
      >
        <button
          onClick={onRetry}
          className="flex-1 py-3 px-6 rounded-xl border-2 border-gray-700 text-gray-300 font-semibold
            hover:border-gray-600 hover:bg-gray-800 transition-all duration-200"
        >
          Try Again
        </button>
        <button
          onClick={onShare}
          className="flex-1 py-3 px-6 rounded-xl font-semibold text-white transition-all duration-200
            hover:opacity-90 hover:scale-105"
          style={{ backgroundColor: themeColor }}
        >
          Share Result 📤
        </button>
      </motion.div>
    </motion.div>
  );
}
