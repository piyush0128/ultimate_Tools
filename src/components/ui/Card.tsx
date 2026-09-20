import { type HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  elevated?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', hover = false, elevated = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`rounded-2xl border border-border-default ${
          elevated ? 'bg-bg-elevated' : 'bg-bg-surface'
        } ${hover ? 'transition-all duration-300 ease-smooth hover:border-border-strong hover:shadow-card-hover' : ''} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'accent';
  className?: string;
}

const badgeVariants = {
  default: 'bg-bg-elevated text-content-secondary border-border-default',
  primary: 'bg-primary-500/10 text-primary-300 border-primary-500/30',
  success: 'bg-success-500/10 text-success-400 border-success-500/30',
  warning: 'bg-warning-500/10 text-warning-400 border-warning-500/30',
  accent: 'bg-accent-500/10 text-accent-300 border-accent-500/30',
};

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-2xs font-semibold uppercase tracking-wider ${badgeVariants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
