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
          className="fixed bottom-24 right-6 md:w-[400px] md:h-[600px] w-[calc(100vw-2rem)] h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl flex flex-col z-[9999] overflow-hidden border border-gray-100"
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-semibold text-lg">AI Task Assistant</h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
              <X size={20} />
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
