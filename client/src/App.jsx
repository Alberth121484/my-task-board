function App() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="center-container">
        {/* Board Header */}
        <div className="flex items-center gap-3 mb-2">
          <img src="/icons/Logo.svg" alt="Logo" className="w-10 h-10" />
          <h1 className="text-title font-outfit">My Task Board</h1>
          <img src="/icons/Edit_duotone.svg" alt="Edit" className="w-6 h-6 cursor-pointer" />
        </div>
        <p className="text-description text-task-gray mb-6">Tasks to keep organised</p>

        {/* Sample Task Cards */}
        <div className="space-y-4">
          {/* In Progress Task */}
          <div className="task-status-in_progress p-4 rounded-task flex items-center gap-4">
            <div className="icon-container">
              <img src="/icons/Time_atack_duotone.svg" alt="Time" className="w-5 h-5" />
            </div>
            <span className="text-task-title flex-1">Task in Progress</span>
            <div className="status-badge-in_progress w-10 h-10 rounded-icon flex items-center justify-center">
              <img src="/icons/Time_atack_duotone.svg" alt="Status" className="w-5 h-5" />
            </div>
          </div>

          {/* Completed Task */}
          <div className="task-status-completed p-4 rounded-task flex items-center gap-4">
            <div className="icon-container">
              <span className="text-xl">🏆</span>
            </div>
            <span className="text-task-title flex-1">Task Completed</span>
            <div className="status-badge-completed w-10 h-10 rounded-icon flex items-center justify-center">
              <img src="/icons/Done_round.svg" alt="Done" className="w-5 h-5" />
            </div>
          </div>

          {/* Won't Do Task */}
          <div className="task-status-wont_do p-4 rounded-task flex items-center gap-4">
            <div className="icon-container">
              <span className="text-xl">☕</span>
            </div>
            <span className="text-task-title flex-1">Task Won't Do</span>
            <div className="status-badge-wont_do w-10 h-10 rounded-icon flex items-center justify-center">
              <img src="/icons/close_ring_duotone.svg" alt="Close" className="w-5 h-5" />
            </div>
          </div>

          {/* To Do Task */}
          <div className="task-status-todo p-4 rounded-task flex items-center gap-4">
            <div className="icon-container">
              <span className="text-xl">📚</span>
            </div>
            <div className="flex-1">
              <span className="text-task-title block">Task To Do</span>
              <p className="text-description text-task-gray text-sm">
                Work on a Challenge on devChallenges.io, learn TypeScript.
              </p>
            </div>
          </div>

          {/* Add New Task Button */}
          <div className="bg-task-yellow-light p-4 rounded-task flex items-center gap-4 cursor-pointer hover:opacity-90 transition-base">
            <div className="w-12 h-12 rounded-icon flex items-center justify-center bg-task-yellow-dark">
              <img src="/icons/Add_round_duotone.svg" alt="Add" className="w-6 h-6" />
            </div>
            <span className="text-task-title">Add new task</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
