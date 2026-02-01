"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Question, TriggerType } from "@/types/quiz";

interface QuestionItemProps {
  question: Question;
  isChecked: boolean;
  onToggle: (id: number, checked: boolean) => void;
  themeColor?: string;
  index: number;
}

export default function QuestionItem({
  question,
  isChecked,
  onToggle,
  themeColor = "#3B82F6",
  index,
}: QuestionItemProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const fireConfetti = useCallback(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6, x: 0.5 },
      colors: [themeColor, "#10b981", "#f59e0b", "#ef4444"],
    });
  }, [themeColor]);

  const triggerHaptic = useCallback(() => {
    if ("vibrate" in navigator) {
      navigator.vibrate(50);
    }
  }, []);

  const handleTrigger = useCallback(
    (trigger: TriggerType) => {
      switch (trigger) {
        case "confetti":
          fireConfetti();
          break;
        case "haptic":
          triggerHaptic();
          break;
        case "shake_screen":
          setIsAnimating(true);
          setTimeout(() => setIsAnimating(false), 500);
          break;
      }
    },
    [fireConfetti, triggerHaptic],
  );

  const handleClick = () => {
    const newChecked = !isChecked;
    onToggle(question.id, newChecked);

    // Fire trigger on check (not uncheck)
    if (newChecked && question.trigger) {
      handleTrigger(question.trigger);
    }

    // Always provide haptic on mobile
    triggerHaptic();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        x: isAnimating ? [0, -5, 5, -5, 5, 0] : 0,
      }}
      transition={{
        delay: index * 0.03,
        duration: 0.3,
        x: { duration: 0.4 },
      }}
      className="w-full"
    >
      <button
        onClick={handleClick}
        className={`
          w-full p-4 rounded-xl border-2 transition-all duration-200
          flex items-start gap-4 text-left
          ${
            isChecked
              ? "border-transparent bg-gradient-to-r from-primary-500/20 to-accent/20"
              : "border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:bg-gray-800"
          }
        `}
        style={{
          borderColor: isChecked ? themeColor : undefined,
          boxShadow: isChecked ? `0 0 20px ${themeColor}30` : undefined,
        }}
      >
        {/* Custom Checkbox */}
        <div
          className={`
            w-6 h-6 rounded-md border-2 flex-shrink-0
            flex items-center justify-center transition-all duration-200
            ${isChecked ? "border-transparent" : "border-gray-600"}
          `}
          style={{
            backgroundColor: isChecked ? themeColor : "transparent",
          }}
        >
          <AnimatePresence>
            {isChecked && (
              <motion.svg
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </motion.svg>
            )}
          </AnimatePresence>
        </div>

        {/* Question Text */}
        <span
          className={`
          text-base leading-relaxed transition-colors duration-200
          ${isChecked ? "text-white" : "text-gray-300"}
        `}
        >
          {question.text}
        </span>
      </button>
    </motion.div>
  );
}
