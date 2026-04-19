"use client";
import { motion, useScroll, useTransform } from "framer-motion";

export function LandingNavbar() {
  const { scrollY } = useScroll();
  const shadow = useTransform(scrollY, [0, 50], ["shadow-none", "shadow-md"]);

  return (
    <motion.nav 
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md"
      style={{ boxShadow: shadow }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">✓</span>
          </div>
          <span className="font-bold text-xl text-gray-900">Taskly</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium">Features</a>
          <motion.a 
            href="/signup" 
            className="px-5 py-2 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started →
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
}
