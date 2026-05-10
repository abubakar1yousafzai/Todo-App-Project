import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ChatPopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const ChatPopup = ({ isOpen, onClose, children }: ChatPopupProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-24 right-6 md:w-[400px] md:h-[600px] w-[calc(100vw-2rem)] h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-xl flex flex-col z-[9999] overflow-hidden border border-gray-100"
        >
          <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-orange-50 to-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <h3 className="font-semibold text-gray-900">AI Task Assistant</h3>
            </div>
            <button onClick={onClose} className="p-1.5 hover:bg-orange-100 rounded-full transition-colors">
              <X size={18} className="text-gray-500" />
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
