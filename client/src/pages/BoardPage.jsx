import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Layout, 
  BoardHeader,
  TaskCard,
  AddTaskButton,
  TaskEditModal,
  LoadingSpinner,
} from '../components';
import { useBoardStore } from '../store';

/**
 * BoardPage - Displays a board with its tasks
 * Accessible via /board/:boardId
 */
export default function BoardPage() {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [showCopied, setShowCopied] = useState(false);

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
    createBoard,
    reset,
  } = useBoardStore();

  // Fetch board when boardId changes
  useEffect(() => {
    if (boardId) {
      fetchBoard(boardId)
        .then(() => {
          // Save to localStorage when board is successfully loaded
          localStorage.setItem('boardId', boardId);
        })
        .catch((err) => {
          console.error('Failed to fetch board:', err);
        });
    }

    // Reset store when leaving the page
    return () => {
      reset();
    };
  }, [boardId, fetchBoard, reset]);

  // Copy board URL to clipboard
  const handleCopyUrl = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  // Create a new board
  const handleNewBoard = async () => {
    try {
      const newBoard = await createBoard();
      localStorage.setItem('boardId', newBoard.id);
      navigate(`/board/${newBoard.id}`);
    } catch (err) {
      console.error('Failed to create board:', err);
    }
  };

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
          <LoadingSpinner size="lg" text="Loading board..." />
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
      {/* Action Bar */}
      <div className="flex justify-end gap-2 mb-3 sm:mb-4">
        <button
          onClick={handleCopyUrl}
          className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm bg-task-gray-light text-gray-700 rounded-button 
                     hover:bg-gray-300 transition-colors flex items-center gap-1 sm:gap-1.5"
          title="Copy board URL"
        >
          {showCopied ? (
            <>
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-task-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="hidden xs:inline">Copied!</span>
              <span className="xs:hidden">✓</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span>Share</span>
            </>
          )}
        </button>
        <button
          onClick={handleNewBoard}
          className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm bg-task-blue text-white rounded-button 
                     hover:bg-blue-600 transition-colors flex items-center gap-1 sm:gap-1.5"
          title="Create new board"
        >
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="hidden sm:inline">New Board</span>
          <span className="sm:hidden">New</span>
        </button>
      </div>

      {/* Board Header */}
      <BoardHeader
        name={board?.name || 'My Task Board'}
        description={board?.description || 'Tasks to keep organised'}
        onNameChange={handleBoardNameChange}
        onDescriptionChange={handleBoardDescriptionChange}
      />

      {/* Task Cards */}
      <div className="space-y-3 sm:space-y-4 animate-stagger">
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
