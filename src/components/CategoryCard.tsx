import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';
import { getToolsByCategory } from '@/data/tools';
import type { CategoryMeta } from '@/types';

type IconProps = { className?: string; style?: React.CSSProperties };
function getIcon(name: string): React.FC<IconProps> {
  return (Icons as any)[name] || Icons.Circle;
}

export function CategoryCard({ category }: { category: CategoryMeta }) {
  const Icon = getIcon(category.icon);
  const toolCount = getToolsByCategory(category.id).length;

  return (
    <Link
      to={`/category/${category.slug}`}
      className="group relative flex flex-col items-start rounded-2xl border border-border-default bg-bg-surface p-5 transition-all duration-300 ease-smooth hover:border-border-strong hover:shadow-card-hover hover:-translate-y-1 overflow-hidden"
    >
      {/* Hover gradient */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at top left, ${category.glow}, transparent 60%)` }}
      />

      <div className="relative flex items-center gap-3 mb-3">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-110"
          style={{ borderColor: `${category.color}40`, background: `${category.color}10` }}
        >
          <Icon className="h-6 w-6" style={{ color: category.color }} />
        </div>
        <div>
          <h3 className="text-base font-bold text-content-primary">{category.name}</h3>
          <p className="text-2xs uppercase tracking-wider text-content-muted">{category.tagline}</p>
        </div>
      </div>

      <p className="relative text-sm text-content-muted line-clamp-2 flex-1">{category.description}</p>

      <div className="relative mt-4 flex items-center justify-between w-full">
        <span className="text-xs text-content-faint">
          {toolCount} {toolCount === 1 ? 'tool' : 'tools'}
        </span>
        <ArrowUpRight className="h-4 w-4 text-content-faint group-hover:text-primary-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </div>
    </Link>
  );
}
