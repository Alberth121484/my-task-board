import { Link } from 'react-router-dom';
import { Layout } from '../components';

/**
 * NotFoundPage - 404 page for unknown routes
 */
export default function NotFoundPage() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <h1 className="text-4xl font-bold text-task-gray">404</h1>
        <p className="text-task-gray text-lg">Page not found</p>
        <Link
          to="/"
          className="px-6 py-2 bg-task-blue text-white rounded-button hover:bg-blue-600 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </Layout>
  );
}
