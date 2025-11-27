import { useEffect } from 'react';
import { 
  Layout, 
  BoardHeader,
  TaskCard,
  AddTaskButton,
  TaskEditModal,
} from './components';
import { useBoardStore } from './store';

function App() {
  // Zustand store
  const {
    board,
    tasks,
    isLoading,
    error,
    selectedTask,
    isModalOpen,
    updateBoardName,
    updateBoardDescription,
    openEditModal,
    openAddModal,
    createBoard,
    fetchBoard,
  } = useBoardStore();

  // Initialize board on mount
  useEffect(() => {
    const initBoard = async () => {
      const savedBoardId = localStorage.getItem('boardId');
      
      if (savedBoardId) {
        try {
          await fetchBoard(savedBoardId);
        } catch (err) {
          console.log('Board not found, creating new one...');
          const newBoard = await createBoard();
          localStorage.setItem('boardId', newBoard.id);
        }
      } else {
        const newBoard = await createBoard();
        localStorage.setItem('boardId', newBoard.id);
      }
    };

    initBoard();
  }, [fetchBoard, createBoard]);

  const handleBoardNameChange = async (newName) => {
    try {
      await updateBoardName(newName);
    } catch (err) {
      console.error('Failed to update board name:', err);
    }
  };

  const handleBoardDescriptionChange = async (newDescription) => {
    try {
      await updateBoardDescription(newDescription);
    } catch (err) {
      console.error('Failed to update board description:', err);
    }
  };

  // Loading state
  if (isLoading && !board) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-task-gray">Loading...</div>
        </div>
      </Layout>
    );
  }

  // Error state
  if (error && !board) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-task-red">Error: {error}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Board Header */}
      <BoardHeader
        name={board?.name || 'My Task Board'}
        description={board?.description || 'Tasks to keep organised'}
        onNameChange={handleBoardNameChange}
        onDescriptionChange={handleBoardDescriptionChange}
      />

      {/* Task Cards */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => openEditModal(task)}
            isSelected={selectedTask?.id === task.id && isModalOpen}
          />
        ))}

        {/* Add New Task Button */}
        <AddTaskButton onClick={openAddModal} />
      </div>

      {/* Task Edit Modal */}
      <TaskEditModal />
    </Layout>
  );
}

export default App;
