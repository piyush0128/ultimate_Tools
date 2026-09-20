import { SEO } from '@/components/SEO';
import { CategoryCard } from '@/components/CategoryCard';
import { categories } from '@/data/categories';
import { LayoutGrid } from 'lucide-react';

export function CategoriesPage() {
  return (
    <>
      <SEO
        title="All Categories — Browse Tool Worlds | Ultimate Tools"
        description="Browse all tool categories: image tools, document tools, text tools, developer tools, calculators, color tools, security tools, and data tools."
        canonical="https://ultimate.tools/categories"
      />
      <div className="pt-28 pb-12">
        <div className="container-page">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-border-default bg-bg-elevated px-3.5 py-1.5 text-xs font-medium text-content-secondary mb-4">
              <LayoutGrid className="h-3.5 w-3.5" /> 8 Categories
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-content-primary">All Categories</h1>
            <p className="mt-3 text-base text-content-secondary max-w-2xl mx-auto">
              Browse all tool worlds in the Toolverse.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
