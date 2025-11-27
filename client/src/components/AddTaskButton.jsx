/**
 * AddTaskButton component - Styled button to add new tasks
 * @param {Object} props
 * @param {function} props.onClick - Click handler
 */
export default function AddTaskButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-task-yellow-light p-3 sm:p-4 rounded-task flex items-center gap-3 sm:gap-4 
                 cursor-pointer transition-all duration-200
                 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]
                 text-left focus:outline-none focus:ring-2 focus:ring-task-yellow-dark focus:ring-offset-2"
    >
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-icon flex items-center justify-center bg-task-yellow-dark flex-shrink-0">
        <img 
          src="/icons/Add_round_duotone.svg" 
          alt="Add" 
          className="w-5 h-5 sm:w-6 sm:h-6" 
        />
      </div>
      <span className="text-sm sm:text-task-title text-gray-800">Add new task</span>
    </button>
  );
}
