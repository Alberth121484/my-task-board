import { Routes, Route } from 'react-router-dom';
import { HomePage, BoardPage, NotFoundPage } from './pages';

/**
 * App component - Main router
 */
function App() {
  return (
    <Routes>
      {/* Home page - creates new board or redirects to existing */}
      <Route path="/" element={<HomePage />} />
      
      {/* Board page - view/edit a specific board */}
      <Route path="/board/:boardId" element={<BoardPage />} />
      
      {/* 404 page for unknown routes */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
