import { useToast } from '@/context/ToastContext';
import { useCallback } from 'react';

export function useAsyncToast() {
  const { showLoading, showSuccess, showError, removeToast, updateToast } = useToast();

  const executeWithToast = useCallback(async (
    asyncFunction,
    options = {}
  ) => {
    const {
      loadingMessage = 'Chargement...',
      successMessage = 'Opération réussie !',
      errorMessage = 'Une erreur s\'est produite',
      showSuccess: shouldShowSuccess = true,
      showError: shouldShowError = true,
    } = options;

    // Show loading toast
    const loadingToastId = showLoading(loadingMessage);

    try {
      const result = await asyncFunction();
      
      // Remove loading toast
      removeToast(loadingToastId);
      
      // Show success toast
      if (shouldShowSuccess) {
        showSuccess(successMessage);
      }
      
      return result;
    } catch (error) {
      // Remove loading toast
      removeToast(loadingToastId);
      
      // Show error toast
      if (shouldShowError) {
        const message = error.userMessage || error.message || errorMessage;
        showError(message);
      }
      
      throw error;
    }
  }, [showLoading, showSuccess, showError, removeToast]);

  const executeWithProgress = useCallback(async (
    asyncFunction,
    options = {}
  ) => {
    const {
      loadingMessage = 'Traitement en cours...',
      successMessage = 'Terminé !',
      errorMessage = 'Erreur lors du traitement',
    } = options;

    // Show progress toast
    const progressToastId = showLoading(loadingMessage);

    try {
      const result = await asyncFunction((progress) => {
        updateToast(progressToastId, {
          type: 'progress',
          progress,
          message: `${loadingMessage} ${Math.round(progress)}%`
        });
      });
      
      // Remove progress toast
      removeToast(progressToastId);
      
      // Show success toast
      showSuccess(successMessage);
      
      return result;
    } catch (error) {
      // Remove progress toast
      removeToast(progressToastId);
      
      // Show error toast
      const message = error.userMessage || error.message || errorMessage;
      showError(message);
      
      throw error;
    }
  }, [showLoading, showSuccess, showError, removeToast, updateToast]);

  return { executeWithToast, executeWithProgress };
}