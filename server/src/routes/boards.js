import { Router } from 'express';

const router = Router();

// GET /api/boards/:id - Get board by ID with its tasks
router.get('/:id', (req, res) => {
  // TODO: Implement in Step 5
  res.json({ message: 'Get board endpoint - to be implemented' });
});

// POST /api/boards - Create a new board
router.post('/', (req, res) => {
  // TODO: Implement in Step 5
  res.json({ message: 'Create board endpoint - to be implemented' });
});

// PUT /api/boards/:id - Update a board
router.put('/:id', (req, res) => {
  // TODO: Implement in Step 5
  res.json({ message: 'Update board endpoint - to be implemented' });
});

// DELETE /api/boards/:id - Delete a board
router.delete('/:id', (req, res) => {
  // TODO: Implement in Step 5
  res.json({ message: 'Delete board endpoint - to be implemented' });
});

export default router;
