import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components';
import { useBoardStore } from '../store';

/**
 * HomePage - Landing page that creates a new board or redirects to existing one
 */
export default function HomePage() {
  const navigate = useNavigate();
  const { createBoard } = useBoardStore();
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initBoard = async () => {
      // Check for existing board ID in localStorage
      const savedBoardId = localStorage.getItem('boardId');
      
      if (savedBoardId) {
        // Redirect to existing board
        navigate(`/board/${savedBoardId}`, { replace: true });
        return;
      }

      // Create a new board
      setIsCreating(true);
      try {
        const newBoard = await createBoard();
        localStorage.setItem('boardId', newBoard.id);
        navigate(`/board/${newBoard.id}`, { replace: true });
      } catch (err) {
        console.error('Failed to create board:', err);
        setError('Failed to create board. Please try again.');
        setIsCreating(false);
      }
    };

    initBoard();
  }, [navigate, createBoard]);

  const handleRetry = async () => {
    setError(null);
    setIsCreating(true);
    try {
      const newBoard = await createBoard();
      localStorage.setItem('boardId', newBoard.id);
      navigate(`/board/${newBoard.id}`, { replace: true });
    } catch (err) {
      console.error('Failed to create board:', err);
      setError('Failed to create board. Please try again.');
      setIsCreating(false);
    }
  };

  const handleCreateNew = async () => {
    // Clear existing board and create a new one
    localStorage.removeItem('boardId');
    setError(null);
    setIsCreating(true);
    try {
      const newBoard = await createBoard();
      localStorage.setItem('boardId', newBoard.id);
      navigate(`/board/${newBoard.id}`, { replace: true });
    } catch (err) {
      console.error('Failed to create board:', err);
      setError('Failed to create board. Please try again.');
      setIsCreating(false);
    }
  };

  if (error) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <div className="text-task-red text-lg">{error}</div>
          <button
            onClick={handleRetry}
            className="px-6 py-2 bg-task-blue text-white rounded-button hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <div className="flex items-center gap-3">
          <img src="/icons/Logo.svg" alt="Logo" className="w-12 h-12" />
          <h1 className="text-2xl font-semibold">My Task Board</h1>
        </div>
        {isCreating ? (
          <p className="text-task-gray">Creating your board...</p>
        ) : (
          <button
            onClick={handleCreateNew}
            className="px-6 py-2 bg-task-blue text-white rounded-button hover:bg-blue-600 transition-colors"
          >
            Create New Board
          </button>
        )}
      </div>
    </Layout>
  );
}
