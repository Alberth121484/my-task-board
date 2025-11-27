/**
 * Layout component - Main wrapper with centered content
 * Responsive padding: smaller on mobile, larger on desktop
 */
export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-background py-6 px-4 sm:py-8 sm:px-6 md:py-10 md:px-8">
      <div className="max-w-board mx-auto">
        {children}
      </div>
    </div>
  );
}
