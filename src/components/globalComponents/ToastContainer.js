import { useToast } from '@/context/ToastContext';
import { HiXMark, HiCheckCircle, HiExclamationCircle, HiExclamationTriangle, HiInformationCircle } from 'react-icons/hi2';
import { useEffect, useState } from 'react';

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
};

const Toast = ({ toast, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Animate in
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleRemove = () => {
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
      case 'info':
      default:
        return 'text-blue-800';
    }
  };

  return (
    <div
      className={`
        ${getBackgroundColor()} 
        border rounded-lg shadow-lg p-4 transition-all duration-300 ease-in-out transform
        ${isVisible && !isExiting ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        ${isExiting ? 'scale-95' : 'scale-100'}
      `}
    >
      <div className="flex items-start gap-3">
        {getIcon()}
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium ${getTextColor()}`}>
            {toast.message}
          </p>
        </div>
        <button
          onClick={handleRemove}
          className={`flex-shrink-0 rounded-full p-1 hover:bg-white/50 transition-colors ${getTextColor()}`}
        >
          <HiXMark className="text-sm" />
        </button>
      </div>
    </div>
  );
};

export default ToastContainer;