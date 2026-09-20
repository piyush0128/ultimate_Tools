import { Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/Button';

export function NotFoundPage() {
  return (
    <>
      <SEO title="Page Not Found — Ultimate Tools" description="The page you are looking for does not exist." />
      <div className="pt-28 pb-12 min-h-[60vh] flex items-center">
        <div className="container-page text-center">
          <p className="text-6xl sm:text-8xl font-extrabold text-gradient font-mono">404</p>
          <h1 className="mt-4 text-xl font-bold text-content-primary">Page not found</h1>
          <p className="mt-2 text-sm text-content-muted max-w-sm mx-auto">
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button to="/">Back to Home</Button>
            <Button to="/categories" variant="secondary">Browse Categories</Button>
          </div>
        </div>
      </div>
    </>
  );
}
