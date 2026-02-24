"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useStudyStore } from "@/stores/study-store";
import { useEffect } from "react";

export function FoodEarnedAnimation() {
  const { showFoodAnimation, clearFoodAnimation, lastEarnedFood } =
    useStudyStore();

  useEffect(() => {
    if (showFoodAnimation) {
      const timer = setTimeout(() => {
        clearFoodAnimation();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showFoodAnimation, clearFoodAnimation]);

  return (
    <AnimatePresence>
      {showFoodAnimation && lastEarnedFood && (
        <motion.div
          className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-2 bg-card border border-border rounded-xl p-4 shadow-2xl"
          initial={{ opacity: 0, y: 50, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          role="status"
          aria-live="polite"
        >
          <motion.span
            className="text-5xl"
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5, delay: 0.2 }}
            aria-hidden="true"
          >
            {lastEarnedFood.emoji}
          </motion.span>
          <p className="text-sm font-semibold text-foreground">
            {lastEarnedFood.name}
          </p>
          <p className="text-xs text-green-400">Food earned! 🎉</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
