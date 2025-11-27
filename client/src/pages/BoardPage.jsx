import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Layout, 
  BoardHeader,
  TaskCard,
  AddTaskButton,
  TaskEditModal,
} from '../components';
import { useBoardStore } from '../store';

/**
 * BoardPage - Displays a board with its tasks
 * Accessible via /board/:boardId
 */
export default function BoardPage() {
  const { boardId } = useParams();
  const navigate = useNavigate();

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
    fetchBoard,
    reset,
  } = useBoardStore();

  // Fetch board when boardId changes
  useEffect(() => {
    if (boardId) {
      fetchBoard(boardId).catch((err) => {
        console.error('Failed to fetch board:', err);
      });
    }

    // Reset store when leaving the page
    return () => {
      reset();
    };
  }, [boardId, fetchBoard, reset]);

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
          <div className="text-task-gray text-lg">Loading board...</div>
        </div>
      </Layout>
    );
  }

  // Error state - board not found
  if (error && !board) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <div className="text-task-red text-lg">Board not found</div>
          <p className="text-task-gray">The board you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-task-blue text-white rounded-button hover:bg-blue-600 transition-colors"
          >
            Create New Board
          </button>
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
