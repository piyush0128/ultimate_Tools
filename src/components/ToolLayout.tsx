import { type ReactNode } from 'react';
import * as Icons from 'lucide-react';
import { ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Badge } from '@/components/ui/Card';
import { AdPlaceholder } from '@/components/ui/AdPlaceholder';
import { FAQ as FAQComponent } from '@/components/FAQ';
import { ToolCard } from '@/components/ToolCard';
import { getRelatedTools, getTool } from '@/data/tools';
import { getCategoryById } from '@/data/categories';
import type { FAQItem, ToolMeta } from '@/types';

type IconProps = { className?: string; style?: React.CSSProperties };
function getIcon(name: string): React.FC<IconProps> {
  return (Icons as any)[name] || Icons.Wrench;
}

interface ToolLayoutProps {
  tool: ToolMeta;
  children: ReactNode;
  howToSteps: string[];
  features: string[];
  faqs: FAQItem[];
}

export function ToolLayout({ tool, children, howToSteps, features, faqs }: ToolLayoutProps) {
  const Icon = getIcon(tool.icon);
  const category = getCategoryById(tool.category);
  const related = getRelatedTools(tool.id, tool.category);

  return (
    <div className="container-page pt-24 pb-12">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Home', to: '/' },
          { label: category?.name || 'Category', to: `/category/${category?.slug}` },
          { label: tool.name },
        ]}
      />

      {/* Tool header */}
      <div className="mt-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-primary-500/30 bg-primary-500/10">
            <Icon className="h-7 w-7 text-primary-300" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-content-primary">{tool.name}</h1>
              {tool.badge && <Badge variant="primary">{tool.badge}</Badge>}
            </div>
            <p className="text-sm sm:text-base text-content-secondary">{tool.description}</p>
          </div>
        </div>
      </div>

      {/* Main workspace */}
      <div className="mb-8">{children}</div>

      {/* Ad placeholder */}
      <AdPlaceholder className="mb-8 max-w-4xl mx-auto" />

      {/* Privacy notice */}
      <div className="mb-8 flex items-start gap-3 rounded-xl border border-success-500/20 bg-success-500/5 px-4 py-3 max-w-4xl mx-auto">
        <ShieldCheck className="h-5 w-5 shrink-0 text-success-400 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-content-primary">Privacy Notice</p>
          <p className="text-xs text-content-secondary mt-0.5">
            This tool runs entirely in your browser. Your data is never uploaded to a server.
          </p>
        </div>
      </div>

      {/* How to use + Features */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="rounded-2xl border border-border-default bg-bg-surface p-6">
          <h2 className="text-lg font-bold text-content-primary mb-4">How to Use</h2>
          <ol className="space-y-3">
            {howToSteps.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary-500/15 text-xs font-bold text-primary-300">
                  {i + 1}
                </span>
                <span className="text-sm text-content-secondary">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-2xl border border-border-default bg-bg-surface p-6">
          <h2 className="text-lg font-bold text-content-primary mb-4">Features</h2>
          <ul className="space-y-2.5">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
                <span className="text-sm text-content-secondary">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* FAQ */}
      {faqs.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-content-primary mb-4">FAQ</h2>
          <FAQComponent items={faqs} />
        </div>
      )}

      {/* Related tools */}
      {related.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-content-primary mb-4">Related Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {related.map((t) => (
              <ToolCard key={t.id} tool={t} compact />
            ))}
          </div>
        </div>
      )}

      {/* Category link */}
      <div className="text-center">
        <Link
          to={`/category/${category?.slug}`}
          className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
        >
          View all {category?.tagline} →
        </Link>
      </div>
    </div>
  );
}
