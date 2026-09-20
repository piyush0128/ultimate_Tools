import { Link } from 'react-router-dom';
import { categories } from '@/data/categories';
import * as Icons from 'lucide-react';
import type { CategoryMeta } from '@/types';

type IconProps = { className?: string; style?: React.CSSProperties };
function getIcon(name: string): React.FC<IconProps> {
  return (Icons as any)[name] || Icons.Circle;
}

export function Toolverse2D() {
  return (
    <div className="relative w-full">
      {/* Central glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-64 w-64 rounded-full bg-primary-500/10 blur-3xl animate-pulse-slow" />
      </div>

      {/* Grid of worlds */}
      <div className="relative grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
        {categories.map((cat, i) => (
          <WorldCard key={cat.id} category={cat} index={i} />
        ))}
      </div>
    </div>
  );
}

function WorldCard({ category, index }: { category: CategoryMeta; index: number }) {
  const Icon = getIcon(category.icon);
  return (
    <Link
      to={`/category/${category.slug}`}
      className="group relative flex flex-col items-center gap-3 rounded-2xl border border-border-default bg-bg-surface/60 p-4 sm:p-6 text-center transition-all duration-300 ease-smooth hover:border-border-strong hover:shadow-card-hover overflow-hidden"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at center, ${category.glow}, transparent 70%)` }}
      />

      {/* Icon */}
      <div className="relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl border transition-transform duration-300 ease-smooth group-hover:scale-110 group-hover:-translate-y-1"
        style={{
          borderColor: `${category.color}40`,
          background: `${category.color}10`,
        }}
      >
        <Icon className="h-6 w-6 sm:h-7 sm:w-7" style={{ color: category.color }} />
      </div>

      {/* Text */}
      <div className="relative">
        <h3 className="text-xs sm:text-sm font-bold text-content-primary">{category.name}</h3>
        <p className="text-2xs sm:text-xs text-content-muted mt-0.5">{category.tagline}</p>
      </div>
    </Link>
  );
}
