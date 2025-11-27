import { Router } from 'express';

const router = Router();

// PUT /api/tasks/:id - Update a task
router.put('/:id', (req, res) => {
  // TODO: Implement in Step 6
  res.json({ message: 'Update task endpoint - to be implemented' });
});

// DELETE /api/tasks/:id - Delete a task
router.delete('/:id', (req, res) => {
  // TODO: Implement in Step 6
  res.json({ message: 'Delete task endpoint - to be implemented' });
});

export default router;
