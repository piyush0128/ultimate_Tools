import { Suspense, lazy } from 'react';
import { Boxes } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { CategoryCard } from '@/components/CategoryCard';
import { categories } from '@/data/categories';

const Toolverse = lazy(() => import('@/components/toolverse/Toolverse').then((m) => ({ default: m.Toolverse })));

export function ToolversePage() {
  return (
    <>
      <SEO
        title="Toolverse — Explore 8 Worlds of Tools | Ultimate Tools"
        description="Explore the Toolverse: 8 interconnected visual worlds representing image, document, text, code, calculator, color, security, and data tools."
        canonical="https://ultimate.tools/toolverse"
      />
      <div className="pt-28 pb-12">
        <div className="container-page">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/5 px-3.5 py-1.5 text-xs font-medium text-primary-300 mb-4">
              <Boxes className="h-3.5 w-3.5" /> Interactive Experience
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-content-primary">The Toolverse</h1>
            <p className="mt-3 text-base text-content-secondary max-w-2xl mx-auto">
              Eight interconnected worlds. Each one a category of tools. Hover and click to explore.
            </p>
          </div>

          <Suspense fallback={<div className="h-[400px] flex items-center justify-center text-content-muted text-sm">Loading Toolverse...</div>}>
            <Toolverse />
          </Suspense>

          <div className="mt-12">
            <h2 className="text-xl font-bold text-content-primary mb-4 text-center">All Worlds</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <CategoryCard key={cat.id} category={cat} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
