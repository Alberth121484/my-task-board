import { Router } from 'express';
import { 
  getTaskById, 
  updateTask, 
  deleteTask,
  VALID_STATUSES 
} from '../models/Task.js';

const router = Router();

/**
 * GET /api/tasks/:id
 * Get a single task by ID
 */
router.get('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const task = getTaskById(id);

    if (!task) {
      return res.status(404).json({ 
        error: 'Task not found',
        message: `No task found with ID: ${id}`
      });
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/tasks/:id
 * Update a task's name, description, icon, or status
 * Body: { name?: string, description?: string, icon?: string, status?: string }
 */
router.put('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, icon, status } = req.body;

    // Check if task exists
    const existingTask = getTaskById(id);
    if (!existingTask) {
      return res.status(404).json({ 
        error: 'Task not found',
        message: `No task found with ID: ${id}`
      });
    }

    // Validate status if provided
    if (status && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({ 
        error: 'Invalid status',
        message: `Status must be one of: ${VALID_STATUSES.join(', ')}`
      });
    }

    // Update the task
    const task = updateTask(id, { name, description, icon, status });

    res.json(task);
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/tasks/:id
 * Delete a task
 */
router.delete('/:id', (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = deleteTask(id);

    if (!deleted) {
      return res.status(404).json({ 
        error: 'Task not found',
        message: `No task found with ID: ${id}`
      });
    }

    res.json({ 
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

export default router;
