import { create } from 'zustand';
import { boardApi, taskApi } from '../services/api';

/**
 * Board store using Zustand for global state management
 */
const useBoardStore = create((set, get) => ({
  // State
  board: null,
  tasks: [],
  isLoading: false,
  error: null,

  // Modal state
  selectedTask: null,
  isModalOpen: false,

  // Actions - Board
  /**
   * Fetch a board by ID
   */
  fetchBoard: async (boardId) => {
    set({ isLoading: true, error: null });
    try {
      const board = await boardApi.getBoard(boardId);
      set({ 
        board: {
          id: board.id,
          name: board.name,
          description: board.description,
        },
        tasks: board.tasks || [],
        isLoading: false,
      });
      return board;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  /**
   * Create a new board
   */
  createBoard: async (data = {}) => {
    set({ isLoading: true, error: null });
    try {
      const board = await boardApi.createBoard(data);
      set({ 
        board: {
          id: board.id,
          name: board.name,
          description: board.description,
        },
        tasks: board.tasks || [],
        isLoading: false,
      });
      return board;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  /**
   * Update board name
   */
  updateBoardName: async (name) => {
    const { board } = get();
    if (!board) return;

    // Optimistic update
    set({ board: { ...board, name } });
    
    try {
      await boardApi.updateBoard(board.id, { name });
    } catch (error) {
      // Revert on error
      set({ board, error: error.message });
      throw error;
    }
  },

  /**
   * Update board description
   */
  updateBoardDescription: async (description) => {
    const { board } = get();
    if (!board) return;

    // Optimistic update
    set({ board: { ...board, description } });
    
    try {
      await boardApi.updateBoard(board.id, { description });
    } catch (error) {
      // Revert on error
      set({ board, error: error.message });
      throw error;
    }
  },

  // Actions - Tasks
  /**
   * Add a new task to the board
   */
  addTask: async (taskData) => {
    const { board, tasks } = get();
    if (!board) return;

    set({ isLoading: true, error: null });
    try {
      const newTask = await boardApi.addTask(board.id, taskData);
      set({ 
        tasks: [...tasks, newTask],
        isLoading: false,
        isModalOpen: false,
        selectedTask: null,
      });
      return newTask;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  /**
   * Update an existing task
   */
  updateTask: async (taskId, taskData) => {
    const { tasks } = get();
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return;

    // Optimistic update
    const oldTask = tasks[taskIndex];
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = { ...oldTask, ...taskData };
    set({ tasks: updatedTasks });

    try {
      const updatedTask = await taskApi.updateTask(taskId, taskData);
      // Update with server response
      const finalTasks = [...get().tasks];
      const idx = finalTasks.findIndex(t => t.id === taskId);
      if (idx !== -1) {
        finalTasks[idx] = updatedTask;
        set({ tasks: finalTasks, isModalOpen: false, selectedTask: null });
      }
      return updatedTask;
    } catch (error) {
      // Revert on error
      const revertedTasks = [...get().tasks];
      const idx = revertedTasks.findIndex(t => t.id === taskId);
      if (idx !== -1) {
        revertedTasks[idx] = oldTask;
        set({ tasks: revertedTasks, error: error.message });
      }
      throw error;
    }
  },

  /**
   * Delete a task
   */
  deleteTask: async (taskId) => {
    const { tasks } = get();
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return;

    // Optimistic update
    const oldTask = tasks[taskIndex];
    const filteredTasks = tasks.filter(t => t.id !== taskId);
    set({ tasks: filteredTasks });

    try {
      await taskApi.deleteTask(taskId);
      set({ isModalOpen: false, selectedTask: null });
    } catch (error) {
      // Revert on error
      set({ 
        tasks: [...get().tasks.slice(0, taskIndex), oldTask, ...get().tasks.slice(taskIndex)],
        error: error.message,
      });
      throw error;
    }
  },

  // Actions - Modal
  /**
   * Open modal to edit a task
   */
  openEditModal: (task) => {
    set({ selectedTask: task, isModalOpen: true });
  },

  /**
   * Open modal to add a new task
   */
  openAddModal: () => {
    set({ selectedTask: null, isModalOpen: true });
  },

  /**
   * Close the modal
   */
  closeModal: () => {
    set({ isModalOpen: false, selectedTask: null });
  },

  // Actions - Reset
  /**
   * Clear error state
   */
  clearError: () => {
    set({ error: null });
  },

  /**
   * Reset the store
   */
  reset: () => {
    set({
      board: null,
      tasks: [],
      isLoading: false,
      error: null,
      selectedTask: null,
      isModalOpen: false,
    });
  },
}));

export default useBoardStore;
