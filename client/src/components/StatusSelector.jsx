/**
 * StatusSelector component - Status options with colored indicators
 * @param {Object} props
 * @param {string} props.value - Currently selected status
 * @param {function} props.onChange - Change handler
 * @param {string} props.label - Label text
 */

const STATUSES = [
  { 
    id: 'in_progress', 
    label: 'In Progress', 
    bgColor: 'bg-task-yellow-dark',
    icon: '/icons/Time_atack_duotone.svg'
  },
  { 
    id: 'completed', 
    label: 'Completed', 
    bgColor: 'bg-task-green',
    icon: '/icons/Done_round.svg'
  },
  { 
    id: 'wont_do', 
    label: "Won't do", 
    bgColor: 'bg-task-red',
    icon: '/icons/close_ring_duotone.svg'
  },
];

export default function StatusSelector({ 
  value, 
  onChange, 
  label = 'Status' 
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="text-label text-task-gray mb-2 block">
          {label}
        </label>
      )}
      <div className="grid grid-cols-2 gap-3">
        {STATUSES.map(({ id, label: statusLabel, bgColor, icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={`flex items-center gap-3 p-3 rounded-task border-2 transition-all duration-200
                       ${value === id 
                         ? 'border-task-blue bg-blue-50' 
                         : 'border-task-gray-light hover:border-gray-300'
                       }`}
          >
            <div className={`w-10 h-10 rounded-icon flex items-center justify-center ${bgColor}`}>
              <img src={icon} alt={statusLabel} className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-gray-700">{statusLabel}</span>
            {value === id && (
              <div className="ml-auto">
                <svg className="w-5 h-5 text-task-blue" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export { STATUSES };
