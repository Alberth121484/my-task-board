/**
 * IconSelector component - Grid of selectable icons
 * @param {Object} props
 * @param {string} props.value - Currently selected icon
 * @param {function} props.onChange - Change handler
 * @param {string} props.label - Label text
 */

const ICONS = [
  { emoji: '👤', label: 'Person' },
  { emoji: '💬', label: 'Chat' },
  { emoji: '🏠', label: 'Home' },
  { emoji: '🏆', label: 'Trophy' },
  { emoji: '📚', label: 'Books' },
  { emoji: '⏰', label: 'Clock' },
];

export default function IconSelector({ 
  value, 
  onChange, 
  label = 'Icon' 
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="text-label text-task-gray mb-2 block">
          {label}
        </label>
      )}
      <div className="flex gap-2 sm:gap-3 flex-wrap">
        {ICONS.map(({ emoji, label: iconLabel }) => (
          <button
            key={emoji}
            type="button"
            onClick={() => onChange(emoji)}
            title={iconLabel}
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-icon flex items-center justify-center text-lg sm:text-xl
                       transition-all duration-200 border-2
                       ${value === emoji 
                         ? 'bg-task-yellow-light border-task-yellow-dark' 
                         : 'bg-task-gray-light border-transparent hover:bg-gray-200'
                       }`}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}

export { ICONS };
