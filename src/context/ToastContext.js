import { createContext, useContext, useState, useCallback, useRef } from 'react';

const ToastContext = createContext({});

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const nextId = useRef(0);

  const addToast = useCallback((message, type = 'info', options = {}) => {
    const id = nextId.current++;
    const {
      duration = type === 'error' ? 7000 : 5000,
      action,
      dismissible = true,
      persistent = false,
      position = 'top-right'
    } = options;

    const toast = { 
      id, 
      message, 
      type, 
      duration, 
      action, 
      dismissible, 
      persistent,
      position,
      createdAt: Date.now()
    };
    
    setToasts(prev => [...prev, toast]);

    // Auto remove toast after duration (unless persistent)
    if (!persistent && duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const updateToast = useCallback((id, updates) => {
    setToasts(prev => prev.map(toast => 
      toast.id === id ? { ...toast, ...updates } : toast
    ));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Convenience methods
  const showSuccess = useCallback((message, options) => 
    addToast(message, 'success', options), [addToast]);
  
  const showError = useCallback((message, options) => 
    addToast(message, 'error', options), [addToast]);
  
  const showWarning = useCallback((message, options) => 
    addToast(message, 'warning', options), [addToast]);
  
  const showInfo = useCallback((message, options) => 
    addToast(message, 'info', options), [addToast]);

  // Special toast types
  const showLoading = useCallback((message, options) => {
    return addToast(message, 'loading', { 
      persistent: true, 
      dismissible: false,
      ...options 
    });
  }, [addToast]);

  const showProgress = useCallback((message, progress = 0, options) => {
    return addToast(message, 'progress', { 
      persistent: true, 
      dismissible: false,
      progress,
      ...options 
    });
  }, [addToast]);

  const value = {
    toasts,
    addToast,
    removeToast,
    updateToast,
    clearAllToasts,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showLoading,
    showProgress,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
