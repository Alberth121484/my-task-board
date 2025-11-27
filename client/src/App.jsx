import { useState, useEffect } from 'react';
import { 
  Layout, 
  BoardHeader,
  TaskCard,
  AddTaskButton,
  Button, 
  Input, 
  TextArea, 
  Modal, 
  IconSelector, 
  StatusSelector 
} from './components';
import { useBoardStore } from './store';

// Default editing task state
const DEFAULT_TASK = {
  name: 'New Task',
  description: '',
  icon: '📝',
  status: 'todo',
};

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
    addTask,
    updateTask,
    deleteTask,
    openEditModal,
    openAddModal,
    closeModal,
    createBoard,
    fetchBoard,
  } = useBoardStore();

  // Local state for form editing
  const [editingTask, setEditingTask] = useState(DEFAULT_TASK);

  // Initialize board on mount (for demo, create a new board if none exists)
  useEffect(() => {
    const initBoard = async () => {
      // Check if there's a board ID in localStorage
      const savedBoardId = localStorage.getItem('boardId');
      
      if (savedBoardId) {
        try {
          await fetchBoard(savedBoardId);
        } catch (err) {
          // If board not found, create a new one
          console.log('Board not found, creating new one...');
          const newBoard = await createBoard();
          localStorage.setItem('boardId', newBoard.id);
        }
      } else {
        // Create a new board
        const newBoard = await createBoard();
        localStorage.setItem('boardId', newBoard.id);
      }
    };

    initBoard();
  }, [fetchBoard, createBoard]);

  // Update editing task when selectedTask changes
  useEffect(() => {
    if (selectedTask) {
      setEditingTask({
        name: selectedTask.name,
        description: selectedTask.description || '',
        icon: selectedTask.icon,
        status: selectedTask.status,
      });
    } else {
      setEditingTask(DEFAULT_TASK);
    }
  }, [selectedTask]);

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

  const handleTaskClick = (task) => {
    openEditModal(task);
  };

  const handleAddTask = () => {
    openAddModal();
  };

  const handleSaveTask = async () => {
    try {
      if (selectedTask) {
        await updateTask(selectedTask.id, editingTask);
      } else {
        await addTask(editingTask);
      }
    } catch (err) {
      console.error('Failed to save task:', err);
    }
  };

  const handleDeleteTask = async () => {
    if (selectedTask) {
      try {
        await deleteTask(selectedTask.id);
      } catch (err) {
        console.error('Failed to delete task:', err);
      }
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
            onClick={() => handleTaskClick(task)}
            isSelected={selectedTask?.id === task.id && isModalOpen}
          />
        ))}

        {/* Add New Task Button */}
        <AddTaskButton onClick={handleAddTask} />
      </div>

      {/* Task Edit Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal}
        title="Task details"
      >
        <div className="space-y-5">
          <Input
            label="Task name"
            value={editingTask.name}
            onChange={(e) => setEditingTask({ ...editingTask, name: e.target.value })}
            placeholder="Enter task name"
          />
          
          <TextArea
            label="Description"
            value={editingTask.description}
            onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
            placeholder="Enter a short description"
            rows={3}
          />
          
          <IconSelector
            label="Icon"
            value={editingTask.icon}
            onChange={(icon) => setEditingTask({ ...editingTask, icon })}
          />
          
          <StatusSelector
            label="Status"
            value={editingTask.status}
            onChange={(status) => setEditingTask({ ...editingTask, status })}
          />
          
          <div className="flex justify-end gap-3 pt-4">
            {selectedTask && (
              <Button 
                variant="danger"
                onClick={handleDeleteTask}
              >
                Delete
                <img src="/icons/Trash.svg" alt="Delete" className="w-5 h-5" />
              </Button>
            )}
            <Button 
              variant="primary"
              onClick={handleSaveTask}
            >
              Save
              <img src="/icons/Done_round.svg" alt="Save" className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
}

export default App;
