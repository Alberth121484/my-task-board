import { useEffect } from 'react';

/**
 * Toast component - Notification popup
 * @param {Object} props
 * @param {string} props.message - Toast message
 * @param {string} props.type - Type: 'success', 'error', 'info'
 * @param {function} props.onClose - Close handler
 * @param {number} props.duration - Auto-close duration in ms (default 3000)
 */
export default function Toast({ 
  message, 
  type = 'info', 
  onClose, 
  duration = 3000 
}) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const typeStyles = {
    success: 'bg-task-green text-white',
    error: 'bg-task-red text-white',
    info: 'bg-task-blue text-white',
  };

  const icons = {
    success: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  return (
    <div className={`
      fixed bottom-4 right-4 z-50 flex items-center gap-3 
      px-4 py-3 rounded-task shadow-lg
      animate-slide-in-right
      ${typeStyles[type]}
    `}>
      {icons[type]}
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 hover:opacity-70 transition-opacity"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
