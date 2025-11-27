/**
 * EmptyState component - Display when no data is available
 * @param {Object} props
 * @param {string} props.icon - Emoji or icon
 * @param {string} props.title - Main message
 * @param {string} props.description - Secondary message
 * @param {React.ReactNode} props.action - Optional action button
 */
export default function EmptyState({ 
  icon = '📝', 
  title = 'No items yet',
  description,
  action 
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-full bg-task-gray-light flex items-center justify-center mb-4">
        <span className="text-3xl">{icon}</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-700 mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-task-gray max-w-xs">{description}</p>
      )}
      {action && (
        <div className="mt-4">{action}</div>
      )}
    </div>
  );
}
