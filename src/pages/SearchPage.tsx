import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { PageTransition } from '@/components/SEO';
import { SearchBar } from '@/components/SearchBar';
import { ToolCard } from '@/components/ToolCard';
import { EmptyState } from '@/components/ui/States';
import { AdPlaceholder } from '@/components/ui/AdPlaceholder';
import { searchTools } from '@/data/tools';
import { categories } from '@/data/categories';
import { getCategoryById } from '@/data/categories';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const results = useMemo(() => searchTools(query), [query]);

  const groupedByCategory = useMemo(() => {
    const groups: Record<string, typeof results> = {};
    results.forEach((tool) => {
      if (!groups[tool.category]) groups[tool.category] = [];
      groups[tool.category].push(tool);
    });
    return groups;
  }, [results]);

  return (
    <>
      <SEO
        title={query ? `Search: ${query} | Ultimate Tools` : 'Search Tools | Ultimate Tools'}
        description="Search for tools across the Ultimate Tools Toolverse. Find image, text, developer, security, and calculator tools."
        canonical="https://ultimate.tools/search"
      />
      <PageTransition>
        <div className="pt-28 pb-12">
          <div className="container-page">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-3xl font-bold text-content-primary text-center mb-2">Search Tools</h1>
              <p className="text-sm text-content-muted text-center mb-6">
                Search across {categories.length} categories of tools
              </p>
              <SearchBar initialQuery={query} onSearch={setQuery} autoFocus large />
            </div>

            <div className="mt-8 max-w-5xl mx-auto">
              {query && results.length > 0 && (
                <p className="text-sm text-content-muted mb-4">
                  Found {results.length} {results.length === 1 ? 'tool' : 'tools'} for "{query}"
                </p>
              )}

              {query && results.length === 0 ? (
                <EmptyState
                  icon={<SearchIcon className="h-6 w-6" />}
                  title="No tools found"
                  description={`No tools match "${query}". Try a different search term or browse categories.`}
                  action={<Link to="/categories" className="text-sm text-primary-400 hover:text-primary-300">Browse all categories →</Link>}
                />
              ) : query ? (
                <>
                  {Object.entries(groupedByCategory).map(([catId, tools]) => {
                    const cat = getCategoryById(catId);
                    if (!cat) return null;
                    return (
                      <div key={catId} className="mb-8">
                        <h2 className="text-sm font-semibold uppercase tracking-wider text-content-muted mb-3">
                          {cat.name} — {cat.tagline}
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {tools.map((tool) => (
                            <ToolCard key={tool.id} tool={tool} />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                  <AdPlaceholder />
                </>
              ) : (
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-content-muted mb-4">Popular searches</h2>
                  <div className="flex flex-wrap gap-2">
                    {['compress', 'JSON', 'password', 'calculator', 'word count'].map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="rounded-xl border border-border-default bg-bg-surface px-4 py-2 text-sm text-content-secondary hover:text-content-primary hover:border-border-strong transition-all"
                      >
                        {term}
                      </button>
                    ))}
                  </div>

                  <h2 className="text-sm font-semibold uppercase tracking-wider text-content-muted mb-4 mt-8">Browse by category</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/category/${cat.slug}`}
                        className="rounded-xl border border-border-default bg-bg-surface px-4 py-3 text-sm text-content-secondary hover:text-content-primary hover:border-border-strong transition-all"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
}
