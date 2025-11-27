/**
 * API service for making HTTP requests to the backend
 */

const API_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * Generic fetch wrapper with error handling
 */
async function fetchApi(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  const response = await fetch(url, config);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || error.error || 'Request failed');
  }

  return response.json();
}

// Board API
export const boardApi = {
  /**
   * Get a board by ID with all its tasks
   */
  getBoard: (boardId) => fetchApi(`/boards/${boardId}`),

  /**
   * Create a new board with default tasks
   */
  createBoard: (data = {}) => fetchApi('/boards', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  /**
   * Update a board's name and/or description
   */
  updateBoard: (boardId, data) => fetchApi(`/boards/${boardId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  /**
   * Delete a board and all its tasks
   */
  deleteBoard: (boardId) => fetchApi(`/boards/${boardId}`, {
    method: 'DELETE',
  }),

  /**
   * Add a new task to a board
   */
  addTask: (boardId, data) => fetchApi(`/boards/${boardId}/tasks`, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

// Task API
export const taskApi = {
  /**
   * Get a single task by ID
   */
  getTask: (taskId) => fetchApi(`/tasks/${taskId}`),

  /**
   * Update a task
   */
  updateTask: (taskId, data) => fetchApi(`/tasks/${taskId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  /**
   * Delete a task
   */
  deleteTask: (taskId) => fetchApi(`/tasks/${taskId}`, {
    method: 'DELETE',
  }),
};

export default { boardApi, taskApi };
