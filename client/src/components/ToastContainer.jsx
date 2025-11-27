import useToastStore from '../store/toastStore';
import Toast from './Toast';

/**
 * ToastContainer - Renders all active toasts
 * Place this component once at the root of your app
 */
export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={0} // Managed by store
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}
