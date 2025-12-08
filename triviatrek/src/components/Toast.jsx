import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

const Toast = ({ isOpen, onClose, message, type = "success", duration = 3000 }) => {
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "error":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          text: "text-red-700",
          icon: <XCircle size={20} className="text-red-600" />,
        };
      case "info":
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          text: "text-blue-700",
          icon: <Info size={20} className="text-blue-600" />,
        };
      default: // success
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          text: "text-green-700",
          icon: <CheckCircle size={20} className="text-green-600" />,
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`fixed top-4 right-4 z-[110] ${styles.bg} ${styles.border} border-2 rounded-xl shadow-lg p-4 min-w-[300px] max-w-md`}
          role="alert"
        >
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">{styles.icon}</div>
            <p className={`flex-1 font-medium ${styles.text}`}>{message}</p>
            <button
              onClick={onClose}
              className={`flex-shrink-0 ${styles.text} hover:opacity-70 transition-opacity p-1 rounded`}
              aria-label="Close notification"
            >
              <X size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;

