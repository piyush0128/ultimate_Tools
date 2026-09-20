import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Search, Menu, X, Home, Boxes, LayoutGrid, Hexagon } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchQuery('');
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/search');
    }
  };

  const navLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/toolverse', label: 'Toolverse', icon: Boxes },
    { to: '/categories', label: 'Categories', icon: LayoutGrid },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-smooth ${
          scrolled ? 'glass border-b border-border-subtle' : 'bg-transparent'
        }`}
      >
        <nav className="container-page flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="relative flex h-9 w-9 items-center justify-center">
              <Hexagon className="h-9 w-9 text-primary-400 transition-transform duration-500 ease-smooth group-hover:rotate-[30deg]" />
              <div className="absolute h-3 w-3 rounded-full bg-primary-400 shadow-glow" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-bold tracking-tight text-content-primary">Ultimate Tools</span>
              <span className="text-2xs uppercase tracking-widest text-content-muted">Toolverse</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ease-smooth ${
                    active
                      ? 'text-primary-300 bg-primary-500/10'
                      : 'text-content-secondary hover:text-content-primary hover:bg-bg-elevated'
                  }`}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Search */}
          <div className="flex items-center gap-2">
            <form onSubmit={handleSearch} className="hidden sm:flex items-center">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-content-muted" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tools..."
                  className="h-10 w-36 lg:w-48 rounded-xl border border-border-default bg-bg-inset pl-9 pr-3 text-sm text-content-primary placeholder:text-content-faint transition-all duration-200 ease-smooth focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 focus:outline-none focus:w-56 lg:focus:w-64"
                  aria-label="Search tools"
                />
              </div>
            </form>

            <Link
              to="/search"
              className="sm:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-border-default text-content-secondary hover:text-content-primary hover:bg-bg-elevated transition-colors"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-border-default text-content-secondary hover:text-content-primary hover:bg-bg-elevated transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden glass border-t border-border-subtle animate-fade-in">
            <div className="container-page py-4 space-y-1">
              {navLinks.map((link) => {
                const active = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      active ? 'text-primary-300 bg-primary-500/10' : 'text-content-secondary hover:bg-bg-elevated'
                    }`}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Bottom nav for mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-border-subtle">
        <div className="flex items-center justify-around h-14">
          {navLinks.map((link) => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex flex-col items-center gap-0.5 px-4 py-1.5 text-2xs font-medium transition-colors ${
                  active ? 'text-primary-300' : 'text-content-muted'
                }`}
              >
                <link.icon className="h-5 w-5" />
                {link.label}
              </Link>
            );
          })}
          <Link
            to="/search"
            className={`flex flex-col items-center gap-0.5 px-4 py-1.5 text-2xs font-medium transition-colors ${
              location.pathname === '/search' ? 'text-primary-300' : 'text-content-muted'
            }`}
          >
            <Search className="h-5 w-5" />
            Search
          </Link>
        </div>
      </nav>
    </>
  );
}
