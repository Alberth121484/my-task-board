import { v4 as uuidv4 } from 'uuid';
import db from '../database/connection.js';

// Default tasks that are created with a new board
const DEFAULT_TASKS = [
  {
    name: 'Task in Progress',
    description: '',
    icon: '⏰',
    status: 'in_progress',
    task_order: 0
  },
  {
    name: 'Task Completed',
    description: '',
    icon: '🏆',
    status: 'completed',
    task_order: 1
  },
  {
    name: "Task Won't Do",
    description: '',
    icon: '☕',
    status: 'wont_do',
    task_order: 2
  },
  {
    name: 'Task To Do',
    description: 'Work on a Challenge on devChallenges.io, learn TypeScript.',
    icon: '📚',
    status: 'todo',
    task_order: 3
  }
];

/**
 * Create a new board with default tasks
 * @param {Object} data - Board data (name, description)
 * @returns {Object} Created board with tasks
 */
export function createBoard(data = {}) {
  const boardId = uuidv4();
  const name = data.name || 'My Task Board';
  const description = data.description || 'Tasks to keep organised';

  // Insert board
  const insertBoard = db.prepare(`
    INSERT INTO boards (id, name, description)
    VALUES (?, ?, ?)
  `);
  
  insertBoard.run(boardId, name, description);

  // Insert default tasks
  const insertTask = db.prepare(`
    INSERT INTO tasks (id, board_id, name, description, icon, status, task_order)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const insertTasks = db.transaction((tasks) => {
    for (const task of tasks) {
      insertTask.run(
        uuidv4(),
        boardId,
        task.name,
        task.description,
        task.icon,
        task.status,
        task.task_order
      );
    }
  });

  insertTasks(DEFAULT_TASKS);

  // Return the created board with tasks
  return getBoardById(boardId);
}

/**
 * Get a board by ID with all its tasks
 * @param {string} id - Board ID
 * @returns {Object|null} Board with tasks or null if not found
 */
export function getBoardById(id) {
  const board = db.prepare(`
    SELECT id, name, description, created_at, updated_at
    FROM boards
    WHERE id = ?
  `).get(id);

  if (!board) {
    return null;
  }

  const tasks = db.prepare(`
    SELECT id, board_id, name, description, icon, status, task_order, created_at, updated_at
    FROM tasks
    WHERE board_id = ?
    ORDER BY task_order ASC
  `).all(id);

  return {
    ...board,
    tasks
  };
}

/**
 * Update a board by ID
 * @param {string} id - Board ID
 * @param {Object} data - Data to update (name, description)
 * @returns {Object|null} Updated board or null if not found
 */
export function updateBoard(id, data) {
  const board = getBoardById(id);
  if (!board) {
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

  if (updates.length === 0) {
    return board;
  }

  values.push(id);

  const stmt = db.prepare(`
    UPDATE boards
    SET ${updates.join(', ')}
    WHERE id = ?
  `);

  stmt.run(...values);

  return getBoardById(id);
}

/**
 * Delete a board and all its tasks
 * @param {string} id - Board ID
 * @returns {boolean} True if deleted, false if not found
 */
export function deleteBoard(id) {
  const board = getBoardById(id);
  if (!board) {
    return false;
  }

  // Tasks are deleted automatically due to CASCADE
  const stmt = db.prepare('DELETE FROM boards WHERE id = ?');
  stmt.run(id);

  return true;
}

/**
 * Check if a board exists
 * @param {string} id - Board ID
 * @returns {boolean} True if exists
 */
export function boardExists(id) {
  const result = db.prepare('SELECT 1 FROM boards WHERE id = ?').get(id);
  return !!result;
}

export default {
  createBoard,
  getBoardById,
  updateBoard,
  deleteBoard,
  boardExists,
  DEFAULT_TASKS
};
