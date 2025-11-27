/**
 * LoadingSpinner component - Animated loading indicator
 * @param {Object} props
 * @param {string} props.size - Size: 'sm', 'md', 'lg'
 * @param {string} props.text - Optional loading text
 */
export default function LoadingSpinner({ size = 'md', text }) {
  const sizes = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div 
        className={`${sizes[size]} border-task-gray-light border-t-task-blue rounded-full animate-spin`}
      />
      {text && (
        <p className="text-sm text-task-gray animate-pulse">{text}</p>
      )}
    </div>
  );
}
