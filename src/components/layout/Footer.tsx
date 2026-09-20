import { Link } from 'react-router-dom';
import { Hexagon } from 'lucide-react';
import { categories } from '@/data/categories';

export function Footer() {
  return (
    <footer className="border-t border-border-default bg-bg-surface mt-20 pb-20 md:pb-0">
      <div className="container-page py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-3">
              <div className="relative flex h-8 w-8 items-center justify-center">
                <Hexagon className="h-8 w-8 text-primary-400" />
                <div className="absolute h-2.5 w-2.5 rounded-full bg-primary-400" />
              </div>
              <span className="text-sm font-bold text-content-primary">Ultimate Tools</span>
            </Link>
            <p className="text-sm text-content-muted leading-relaxed">
              Useful tools. One universe.
            </p>
            <p className="text-xs text-content-faint mt-2">
              Fast, private, browser-based utilities.
            </p>
          </div>

          {/* Categories */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-content-muted mb-3">Categories</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  className="text-sm text-content-secondary hover:text-primary-300 transition-colors"
                >
                  {cat.tagline}
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-content-muted mb-3">Site</h3>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-content-secondary hover:text-primary-300 transition-colors">Home</Link>
              <Link to="/toolverse" className="text-sm text-content-secondary hover:text-primary-300 transition-colors">Toolverse</Link>
              <Link to="/categories" className="text-sm text-content-secondary hover:text-primary-300 transition-colors">Categories</Link>
              <Link to="/about" className="text-sm text-content-secondary hover:text-primary-300 transition-colors">About</Link>
              <Link to="/privacy" className="text-sm text-content-secondary hover:text-primary-300 transition-colors">Privacy</Link>
              <Link to="/terms" className="text-sm text-content-secondary hover:text-primary-300 transition-colors">Terms</Link>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-content-faint">
            &copy; {new Date().getFullYear()} Ultimate Tools. All tools run in your browser.
          </p>
          <p className="text-xs text-content-faint">
            No signup required. Your files stay in your browser.
          </p>
        </div>
      </div>
    </footer>
  );
}
