import { Router } from 'express';
import { createTask } from '../models/Task.js';
import { 
  createBoard, 
  getBoardById, 
  updateBoard, 
  deleteBoard 
} from '../models/Board.js';

const router = Router();

/**
 * GET /api/boards/:id
 * Get a board by ID with all its tasks
 */
router.get('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const board = getBoardById(id);

    if (!board) {
      return res.status(404).json({ 
        error: 'Board not found',
        message: `No board found with ID: ${id}`
      });
    }

    res.json(board);
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/boards
 * Create a new board with default tasks
 * Body: { name?: string, description?: string }
 */
router.post('/', (req, res, next) => {
  try {
    const { name, description } = req.body;
    const board = createBoard({ name, description });

    res.status(201).json(board);
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/boards/:id
 * Update a board's name and/or description
 * Body: { name?: string, description?: string }
 */
router.put('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    // Check if board exists
    const existingBoard = getBoardById(id);
    if (!existingBoard) {
      return res.status(404).json({ 
        error: 'Board not found',
        message: `No board found with ID: ${id}`
      });
    }

    // Update the board
    const board = updateBoard(id, { name, description });

    res.json(board);
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/boards/:id
 * Delete a board and all its tasks
 */
router.delete('/:id', (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = deleteBoard(id);

    if (!deleted) {
      return res.status(404).json({ 
        error: 'Board not found',
        message: `No board found with ID: ${id}`
      });
    }

    res.json({ 
      success: true,
      message: 'Board deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/boards/:id/tasks
 * Create a new task for a board
 * Body: { name?: string, description?: string, icon?: string, status?: string }
 */
router.post('/:id/tasks', (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, icon, status } = req.body;

    // Check if board exists
    const board = getBoardById(id);
    if (!board) {
      return res.status(404).json({ 
        error: 'Board not found',
        message: `No board found with ID: ${id}`
      });
    }

    // Create the task
    const task = createTask(id, { name, description, icon, status });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
});

export default router;
