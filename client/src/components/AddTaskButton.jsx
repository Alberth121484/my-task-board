/**
 * AddTaskButton component - Styled button to add new tasks
 * @param {Object} props
 * @param {function} props.onClick - Click handler
 */
export default function AddTaskButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-task-yellow-light p-4 rounded-task flex items-center gap-4 
                 cursor-pointer hover:opacity-90 transition-all duration-200
                 text-left focus:outline-none focus:ring-2 focus:ring-task-yellow-dark focus:ring-offset-2"
    >
      <div className="w-12 h-12 rounded-icon flex items-center justify-center bg-task-yellow-dark flex-shrink-0">
        <img 
          src="/icons/Add_round_duotone.svg" 
          alt="Add" 
          className="w-6 h-6" 
        />
      </div>
      <span className="text-task-title text-gray-800">Add new task</span>
    </button>
  );
}
