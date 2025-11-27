import db from './connection.js';

export function initializeDatabase() {
  console.log('Initializing database...');

  // Create boards table
  db.exec(`
    CREATE TABLE IF NOT EXISTS boards (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL DEFAULT 'My Task Board',
      description TEXT DEFAULT 'Tasks to keep organised',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create tasks table
  db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      board_id TEXT NOT NULL,
      name TEXT NOT NULL DEFAULT 'New Task',
      description TEXT DEFAULT '',
      icon TEXT DEFAULT '📝',
      status TEXT DEFAULT 'todo' CHECK(status IN ('todo', 'in_progress', 'completed', 'wont_do')),
      task_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (board_id) REFERENCES boards(id) ON DELETE CASCADE
    )
  `);

  // Create index for faster task queries by board
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_tasks_board_id ON tasks(board_id)
  `);

  // Create trigger to update updated_at on boards
  db.exec(`
    CREATE TRIGGER IF NOT EXISTS update_board_timestamp 
    AFTER UPDATE ON boards
    BEGIN
      UPDATE boards SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END
  `);

  // Create trigger to update updated_at on tasks
  db.exec(`
    CREATE TRIGGER IF NOT EXISTS update_task_timestamp 
    AFTER UPDATE ON tasks
    BEGIN
      UPDATE tasks SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END
  `);

  console.log('Database initialized successfully');
}

export default { initializeDatabase };
