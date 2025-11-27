// Server entry point - will be implemented in Step 3
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.json({ message: 'My Task Board API' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
