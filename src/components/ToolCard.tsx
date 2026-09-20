import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/Card';
import { getCategoryById } from '@/data/categories';
import type { ToolMeta } from '@/types';

type IconProps = { className?: string; style?: React.CSSProperties };
function getIcon(name: string): React.FC<IconProps> {
  return (Icons as any)[name] || Icons.Wrench;
}

interface ToolCardProps {
  tool: ToolMeta;
  compact?: boolean;
}

export function ToolCard({ tool, compact = false }: ToolCardProps) {
  const Icon = getIcon(tool.icon);
  const category = getCategoryById(tool.category);
  const to = `/tool/${category?.slug}/${tool.slug}`;

  return (
    <Link
      to={to}
      className="group relative flex flex-col rounded-2xl border border-border-default bg-bg-surface p-5 transition-all duration-300 ease-smooth hover:border-border-strong hover:shadow-card-hover hover:-translate-y-1"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border-default bg-bg-elevated transition-colors duration-300 group-hover:border-primary-500/40 group-hover:bg-primary-500/5">
          <Icon className="h-5 w-5 text-content-secondary group-hover:text-primary-300 transition-colors" />
        </div>
        {tool.badge && <Badge variant="primary">{tool.badge}</Badge>}
      </div>

      <h3 className="text-base font-semibold text-content-primary group-hover:text-primary-200 transition-colors">
        {tool.name}
      </h3>
      <p className={`text-sm text-content-muted mt-1 ${compact ? 'line-clamp-1' : 'line-clamp-2'}`}>
        {tool.description}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-2xs uppercase tracking-wider text-content-faint">
          {category?.tagline}
        </span>
        <ArrowUpRight className="h-4 w-4 text-content-faint group-hover:text-primary-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </div>
    </Link>
  );
}
