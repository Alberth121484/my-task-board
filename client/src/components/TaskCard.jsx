/**
 * TaskCard component - Displays a task with status-colored background
 * @param {Object} props
 * @param {Object} props.task - Task object
 * @param {string} props.task.id - Task ID
 * @param {string} props.task.name - Task name
 * @param {string} props.task.description - Task description
 * @param {string} props.task.icon - Task icon (emoji)
 * @param {string} props.task.status - Task status (todo, in_progress, completed, wont_do)
 * @param {function} props.onClick - Click handler
 * @param {boolean} props.isSelected - Whether task is selected/active
 */

// Status configuration for styling
const STATUS_CONFIG = {
  in_progress: {
    cardBg: 'bg-task-yellow',
    badgeBg: 'bg-task-yellow-dark',
    badgeIcon: '/icons/Time_atack_duotone.svg',
  },
  completed: {
    cardBg: 'bg-task-green-light',
    badgeBg: 'bg-task-green',
    badgeIcon: '/icons/Done_round.svg',
  },
  wont_do: {
    cardBg: 'bg-task-red-light',
    badgeBg: 'bg-task-red',
    badgeIcon: '/icons/close_ring_duotone.svg',
  },
  todo: {
    cardBg: 'bg-task-gray-light',
    badgeBg: null, // No badge for todo
    badgeIcon: null,
  },
};

export default function TaskCard({ 
  task, 
  onClick,
  isSelected = false 
}) {
  const { name, description, icon, status } = task;
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.todo;

  return (
    <div
      onClick={onClick}
      className={`
        ${config.cardBg} 
        p-3 sm:p-4 rounded-task flex items-center gap-3 sm:gap-4 
        cursor-pointer hover:opacity-90 transition-all duration-200
        ${isSelected ? 'ring-2 ring-task-blue ring-offset-2' : ''}
      `}
    >
      {/* Task Icon */}
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-icon flex items-center justify-center bg-white flex-shrink-0">
        <span className="text-lg sm:text-xl">{icon}</span>
      </div>

      {/* Task Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm sm:text-task-title text-gray-800 truncate">{name}</h3>
        {description && (
          <p className="text-xs sm:text-sm text-task-gray mt-0.5 sm:mt-1 line-clamp-2">
            {description}
          </p>
        )}
      </div>

      {/* Status Badge - only for non-todo tasks */}
      {config.badgeBg && (
        <div className={`
          w-8 h-8 sm:w-10 sm:h-10 rounded-icon flex items-center justify-center flex-shrink-0
          ${config.badgeBg}
        `}>
          <img 
            src={config.badgeIcon} 
            alt={status} 
            className="w-4 h-4 sm:w-5 sm:h-5" 
          />
        </div>
      )}
    </div>
  );
}

export { STATUS_CONFIG };
