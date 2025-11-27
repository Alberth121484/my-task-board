import { v4 as uuidv4 } from 'uuid';
import db from '../database/connection.js';

// Valid status values
export const VALID_STATUSES = ['todo', 'in_progress', 'completed', 'wont_do'];

// Default icons available for tasks
export const AVAILABLE_ICONS = ['👤', '💬', '🏠', '🏆', '📚', '⏰'];

/**
 * Create a new task for a board
 * @param {string} boardId - Board ID
 * @param {Object} data - Task data
 * @returns {Object} Created task
 */
export function createTask(boardId, data = {}) {
  const taskId = uuidv4();
  
  // Get the highest order number for the board
  const maxOrder = db.prepare(`
    SELECT COALESCE(MAX(task_order), -1) as max_order
    FROM tasks
    WHERE board_id = ?
  `).get(boardId);

  const task = {
    id: taskId,
    board_id: boardId,
    name: data.name || 'New Task',
    description: data.description || '',
    icon: data.icon || '📝',
    status: data.status || 'todo',
    task_order: maxOrder.max_order + 1
  };

  const stmt = db.prepare(`
    INSERT INTO tasks (id, board_id, name, description, icon, status, task_order)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    task.id,
    task.board_id,
    task.name,
    task.description,
    task.icon,
    task.status,
    task.task_order
  );

  return getTaskById(taskId);
}

/**
 * Get a task by ID
 * @param {string} id - Task ID
 * @returns {Object|null} Task or null if not found
 */
export function getTaskById(id) {
  return db.prepare(`
    SELECT id, board_id, name, description, icon, status, task_order, created_at, updated_at
    FROM tasks
    WHERE id = ?
  `).get(id);
}

/**
 * Get all tasks for a board
 * @param {string} boardId - Board ID
 * @returns {Array} Array of tasks
 */
export function getTasksByBoardId(boardId) {
  return db.prepare(`
    SELECT id, board_id, name, description, icon, status, task_order, created_at, updated_at
    FROM tasks
    WHERE board_id = ?
    ORDER BY task_order ASC
  `).all(boardId);
}

/**
 * Update a task by ID
 * @param {string} id - Task ID
 * @param {Object} data - Data to update (name, description, icon, status)
 * @returns {Object|null} Updated task or null if not found
 */
export function updateTask(id, data) {
  const task = getTaskById(id);
  if (!task) {
    return null;
  }

  const updates = [];
  const values = [];

  if (data.name !== undefined) {
    updates.push('name = ?');
    values.push(data.name);
  }

  if (data.description !== undefined) {
    updates.push('description = ?');
    values.push(data.description);
  }

  if (data.icon !== undefined) {
    updates.push('icon = ?');
    values.push(data.icon);
  }

  if (data.status !== undefined) {
    if (!VALID_STATUSES.includes(data.status)) {
      throw new Error(`Invalid status: ${data.status}. Valid values: ${VALID_STATUSES.join(', ')}`);
    }
    updates.push('status = ?');
    values.push(data.status);
  }

  if (data.task_order !== undefined) {
    updates.push('task_order = ?');
    values.push(data.task_order);
  }

  if (updates.length === 0) {
    return task;
  }

  values.push(id);

  const stmt = db.prepare(`
    UPDATE tasks
    SET ${updates.join(', ')}
    WHERE id = ?
  `);

  stmt.run(...values);

  return getTaskById(id);
}

/**
 * Delete a task by ID
 * @param {string} id - Task ID
 * @returns {boolean} True if deleted, false if not found
 */
export function deleteTask(id) {
  const task = getTaskById(id);
  if (!task) {
    return false;
  }

  const stmt = db.prepare('DELETE FROM tasks WHERE id = ?');
  stmt.run(id);

  return true;
}

/**
 * Check if a task exists
 * @param {string} id - Task ID
 * @returns {boolean} True if exists
 */
export function taskExists(id) {
  const result = db.prepare('SELECT 1 FROM tasks WHERE id = ?').get(id);
  return !!result;
}

/**
 * Reorder tasks within a board
 * @param {string} boardId - Board ID
 * @param {Array} taskIds - Array of task IDs in new order
 */
export function reorderTasks(boardId, taskIds) {
  const updateOrder = db.prepare(`
    UPDATE tasks
    SET task_order = ?
    WHERE id = ? AND board_id = ?
  `);

  const reorder = db.transaction((ids) => {
    ids.forEach((taskId, index) => {
      updateOrder.run(index, taskId, boardId);
    });
  });

  reorder(taskIds);
}

export default {
  createTask,
  getTaskById,
  getTasksByBoardId,
  updateTask,
  deleteTask,
  taskExists,
  reorderTasks,
  VALID_STATUSES,
  AVAILABLE_ICONS
};
