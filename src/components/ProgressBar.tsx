"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
  themeColor?: string;
}

export default function ProgressBar({
  current,
  total,
  themeColor = "#3B82F6",
}: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-400">Progress</span>
        <span className="text-sm font-bold" style={{ color: themeColor }}>
          {current} / {total}
        </span>
      </div>

      <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden border-2 border-gray-700">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: themeColor }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
        />
      </div>

      <div className="text-center mt-2">
        <span className="text-2xl font-bold" style={{ color: themeColor }}>
          {percentage}%
        </span>
      </div>
    </div>
  );
}
