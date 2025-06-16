import { useToast } from '@/context/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiXMark, 
  HiCheckCircle, 
  HiExclamationCircle, 
  HiExclamationTriangle, 
  HiInformationCircle 
} from 'react-icons/hi2';
import { useState, useEffect } from 'react';

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  // Group toasts by position
  const toastsByPosition = toasts.reduce((acc, toast) => {
    const position = toast.position || 'top-right';
    if (!acc[position]) acc[position] = [];
    acc[position].push(toast);
    return acc;
  }, {});

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
  };

  return (
    <>
      {Object.entries(toastsByPosition).map(([position, positionToasts]) => (
        <div
          key={position}
          className={`fixed z-50 space-y-2 max-w-sm w-full ${positionClasses[position]}`}
        >
          <AnimatePresence mode="popLayout">
            {positionToasts.map((toast) => (
              <Toast key={toast.id} toast={toast} onRemove={removeToast} />
            ))}
          </AnimatePresence>
        </div>
      ))}
    </>
  );
};

const Toast = ({ toast, onRemove }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!toast.persistent && toast.duration > 0) {
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, toast.duration - elapsed);
        const progressPercent = (remaining / toast.duration) * 100;
        setProgress(progressPercent);
        
        if (remaining <= 0) {
          clearInterval(interval);
        }
      }, 50);

      return () => clearInterval(interval);
    }
  }, [toast.duration, toast.persistent]);

  const handleRemove = () => {
    if (!toast.dismissible) return;
    setIsExiting(true);
    setTimeout(() => onRemove(toast.id), 300);
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <HiCheckCircle className="text-green-500 text-xl flex-shrink-0" />;
      case 'error':
        return <HiExclamationCircle className="text-red-500 text-xl flex-shrink-0" />;
      case 'warning':
        return <HiExclamationTriangle className="text-yellow-500 text-xl flex-shrink-0" />;
      case 'loading':
        return (
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin flex-shrink-0" />
        );
      case 'progress':
        return (
          <div className="relative w-5 h-5 flex-shrink-0">
            <svg className="w-5 h-5 transform -rotate-90" viewBox="0 0 20 20">
              <circle
                cx="10"
                cy="10"
                r="8"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-gray-300"
              />
              <circle
                cx="10"
                cy="10"
                r="8"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 8}`}
                strokeDashoffset={`${2 * Math.PI * 8 * (1 - (toast.progress || 0) / 100)}`}
                className="text-blue-500 transition-all duration-300"
                strokeLinecap="round"
              />
            </svg>
          </div>
        );
      case 'info':
      default:
        return <HiInformationCircle className="text-blue-500 text-xl flex-shrink-0" />;
    }
  };

  const getBackgroundColor = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'loading':
      case 'progress':
        return 'bg-blue-50 border-blue-200';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const getTextColor = () => {
    switch (toast.type) {
      case 'success':
        return 'text-green-800';
      case 'error':
        return 'text-red-800';
      case 'warning':
        return 'text-yellow-800';
      case 'loading':
      case 'progress':
        return 'text-blue-800';
      case 'info':
      default:
        return 'text-blue-800';
    }
  };

  const slideDirection = toast.position?.includes('left') ? -100 : 100;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: slideDirection, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: slideDirection, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`
        ${getBackgroundColor()} 
        border rounded-lg shadow-lg overflow-hidden backdrop-blur-sm
        ${isExiting ? 'pointer-events-none' : ''}
      `}
    >
      {/* Progress bar */}
      {!toast.persistent && toast.duration > 0 && (
        <div className="h-1 bg-gray-200">
          <motion.div
            className="h-full bg-current opacity-30"
            initial={{ width: '100%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start gap-3">
          {getIcon()}
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium ${getTextColor()}`}>
              {toast.message}
            </p>
            {toast.action && (
              <div className="mt-2">
                <button
                  onClick={toast.action.onClick}
                  className={`text-xs font-medium underline hover:no-underline ${getTextColor()}`}
                >
                  {toast.action.label}
                </button>
              </div>
            )}
          </div>
          {toast.dismissible && (
            <button
              onClick={handleRemove}
              className={`flex-shrink-0 rounded-full p-1 hover:bg-white/50 transition-colors ${getTextColor()}`}
            >
              <HiXMark className="text-sm" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ToastContainer;