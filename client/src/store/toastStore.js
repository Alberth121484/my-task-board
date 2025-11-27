import { create } from 'zustand';

/**
 * Toast store for managing notifications
 */
const useToastStore = create((set, get) => ({
  toasts: [],

  /**
   * Add a toast notification
   */
  addToast: (message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random();
    const toast = { id, message, type, duration };
    
    set((state) => ({
      toasts: [...state.toasts, toast],
    }));

    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => {
        get().removeToast(id);
      }, duration);
    }

    return id;
  },

  /**
   * Remove a toast by ID
   */
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },

  /**
   * Show success toast
   */
  success: (message, duration) => {
    return get().addToast(message, 'success', duration);
  },

  /**
   * Show error toast
   */
  error: (message, duration = 5000) => {
    return get().addToast(message, 'error', duration);
  },

  /**
   * Show info toast
   */
  info: (message, duration) => {
    return get().addToast(message, 'info', duration);
  },

  /**
   * Clear all toasts
   */
  clearAll: () => {
    set({ toasts: [] });
  },
}));

export default useToastStore;
