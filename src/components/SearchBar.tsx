import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  initialQuery?: string;
  onSearch?: (query: string) => void;
  autoFocus?: boolean;
  large?: boolean;
}

export function SearchBar({ initialQuery = '', onSearch, autoFocus = false, large = false }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (onSearch) {
      onSearch(q);
    } else {
      navigate(q ? `/search?q=${encodeURIComponent(q)}` : '/search');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <Search className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-content-muted ${large ? 'h-5 w-5' : 'h-4 w-4'}`} />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={large ? 'Search for tools... e.g. "compress", "JSON", "password"' : 'Search tools...'}
        autoFocus={autoFocus}
        className={`w-full rounded-xl border border-border-default bg-bg-inset text-content-primary placeholder:text-content-faint transition-all duration-200 ease-smooth focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 focus:outline-none ${
          large ? 'h-14 pl-12 pr-12 text-base' : 'h-10 pl-10 pr-10 text-sm'
        }`}
        aria-label="Search tools"
      />
      {query && (
        <button
          type="button"
          onClick={() => {
            setQuery('');
            onSearch?.('');
          }}
          className={`absolute right-3 top-1/2 -translate-y-1/2 text-content-muted hover:text-content-primary transition-colors ${large ? 'p-1' : ''}`}
          aria-label="Clear search"
        >
          <X className={large ? 'h-5 w-5' : 'h-4 w-4'} />
        </button>
      )}
    </form>
  );
}
