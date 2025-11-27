/**
 * Button component with variants
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'danger'} props.variant - Button style variant
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.disabled - Disabled state
 */
export default function Button({ 
  variant = 'primary', 
  children, 
  className = '', 
  disabled = false,
  ...props 
}) {
  const baseStyles = 'px-6 py-2 rounded-button font-medium text-button transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-task-blue text-white hover:bg-blue-600',
    secondary: 'bg-task-gray-light text-gray-700 hover:bg-gray-300',
    danger: 'bg-task-gray text-white hover:bg-task-red',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
