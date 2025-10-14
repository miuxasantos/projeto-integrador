import { toast } from 'react-toastify';
import { useCallback } from 'react';

export const useToast = () => {
  const showSuccess = useCallback((message, options = {}) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      ...options
    });
  }, []);

  const showError = useCallback((message, options = {}) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      ...options
    });
  }, []);

  const showInfo = useCallback((message, options = {}) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 3000,
      ...options
    });
  }, []);

  const showWarning = useCallback((message, options = {}) => {
    toast.warn(message, {
      position: "top-right",
      autoClose: 4000,
      ...options
    });
  }, []);

  const showLoading = useCallback((message = "Processando...") => {
    return toast.loading(message);
  }, []);

  const updateToast = useCallback((toastId, newConfig) => {
    toast.update(toastId, newConfig);
  }, []);

  const dismissToast = useCallback((toastId) => {
    toast.dismiss(toastId);
  }, []);

  return {
    showSuccess,
    showError,
    showInfo,
    showWarning,
    showLoading,
    updateToast,
    dismissToast
  };
};

export default useToast;