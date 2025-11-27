/**
 * Layout component - Main wrapper with centered content
 */
export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-board mx-auto">
        {children}
      </div>
    </div>
  );
}
