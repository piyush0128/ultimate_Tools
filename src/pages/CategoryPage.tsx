import { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { SEO } from '@/components/SEO';
import { PageTransition } from '@/components/SEO';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ToolCard } from '@/components/ToolCard';
import { EmptyState } from '@/components/ui/States';
import { FAQ } from '@/components/FAQ';
import { AdPlaceholder } from '@/components/ui/AdPlaceholder';
import { getCategory } from '@/data/categories';
import { getToolsByCategory } from '@/data/tools';
import { categoryFAQs } from '@/data/faqs';

type IconProps = { className?: string; style?: React.CSSProperties };
function getIcon(name: string): React.FC<IconProps> {
  return (Icons as any)[name] || Icons.Circle;
}

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? getCategory(slug) : undefined;
  const [query, setQuery] = useState('');

  const tools = useMemo(() => {
    if (!category) return [];
    const all = getToolsByCategory(category.id);
    if (!query.trim()) return all;
    const q = query.toLowerCase();
    return all.filter(
      (t) => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.keywords.some((k) => k.includes(q))
    );
  }, [category, query]);

  if (!category) {
    return (
      <div className="pt-28 pb-12 container-page">
        <EmptyState title="Category not found" description="The category you are looking for does not exist." />
      </div>
    );
  }

  const Icon = getIcon(category.icon);
  const faqs = categoryFAQs[category.id] || [];
  const otherCategories = [getCategory('image'), getCategory('text')].filter((c) => c?.id !== category.id).slice(0, 2);

  return (
    <>
      <SEO
        title={`${category.name} — ${category.tagline} | Ultimate Tools`}
        description={category.description}
        canonical={`https://ultimate.tools/category/${category.slug}`}
      />
      <PageTransition>
        <div className="pt-24 pb-12">
          <div className="container-page">
            <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Categories', to: '/categories' }, { label: category.name }]} />

            {/* Hero */}
            <div className="mt-6 mb-8 relative overflow-hidden rounded-3xl border border-border-default bg-bg-surface p-6 sm:p-8">
              <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at top right, ${category.glow}, transparent 60%)` }}
              />
              <div className="relative flex flex-col sm:flex-row items-start gap-5">
                <div
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border"
                  style={{ borderColor: `${category.color}40`, background: `${category.color}10` }}
                >
                  <Icon className="h-8 w-8" style={{ color: category.color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: category.color }}>{category.name}</h1>
                  </div>
                  <p className="text-sm uppercase tracking-wider text-content-muted">{category.tagline}</p>
                  <p className="mt-3 text-base text-content-secondary max-w-2xl">{category.description}</p>
                </div>
              </div>
            </div>

            {/* Search/filter */}
            <div className="mb-6">
              <div className="relative max-w-md">
                <Icons.Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-content-muted" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`Filter ${category.tagline.toLowerCase()}...`}
                  className="h-10 w-full rounded-xl border border-border-default bg-bg-inset pl-10 pr-4 text-sm text-content-primary placeholder:text-content-faint focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                  aria-label="Filter tools"
                />
              </div>
            </div>

            {/* Tools grid */}
            {tools.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {tools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No tools found"
                description={query ? `No tools match "${query}".` : 'Tools in this category are coming soon.'}
              />
            )}

            <AdPlaceholder className="my-8" />

            {/* Related categories */}
            {otherCategories.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-bold text-content-primary mb-4">Related Categories</h2>
                <div className="flex flex-wrap gap-2">
                  {otherCategories.map((cat) => cat && (
                    <Link
                      key={cat.id}
                      to={`/category/${cat.slug}`}
                      className="flex items-center gap-2 rounded-xl border border-border-default bg-bg-surface px-4 py-2.5 text-sm text-content-secondary hover:text-content-primary hover:border-border-strong transition-all"
                    >
                      {(() => {
                        const RelIcon = getIcon(cat.icon);
                        return <RelIcon className="h-4 w-4" style={{ color: cat.color }} />;
                      })()}
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ */}
            {faqs.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-bold text-content-primary mb-4">FAQ</h2>
                <FAQ items={faqs} />
              </div>
            )}
          </div>
        </div>
      </PageTransition>
    </>
  );
}
