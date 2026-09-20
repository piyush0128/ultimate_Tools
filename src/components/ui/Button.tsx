import { Link } from 'react-router-dom';
import { type ButtonHTMLAttributes, type AnchorHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
type Size = 'sm' | 'md' | 'lg';

const variants: Record<Variant, string> = {
  primary: 'bg-primary-500 text-bg-base font-semibold hover:bg-primary-400 shadow-glow border border-primary-400/30',
  secondary: 'bg-bg-elevated text-content-primary border border-border-default hover:border-border-strong hover:bg-bg-surface',
  ghost: 'text-content-secondary hover:text-content-primary hover:bg-bg-elevated',
  outline: 'border border-primary-500/40 text-primary-400 hover:bg-primary-500/10 hover:border-primary-400',
  danger: 'bg-error-500 text-white font-semibold hover:bg-error-400 border border-error-400/30',
};

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm rounded-lg gap-1.5',
  md: 'h-10 px-4 text-sm rounded-xl gap-2',
  lg: 'h-12 px-6 text-base rounded-xl gap-2',
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  children: React.ReactNode;
}

type ButtonAsButton = BaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & { to?: undefined };
type ButtonAsLink = BaseProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & { to: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, children, className = '', ...props }, ref) => {
    const classes = `inline-flex items-center justify-center font-medium transition-all duration-200 ease-smooth disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] ${variants[variant]} ${sizes[size]} ${className}`;

    if ('to' in props && props.to) {
      const { to, ...rest } = props;
      return (
        <Link to={to} className={classes} {...(rest as any)}>
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {children}
        </Link>
      );
    }

    const { disabled, ...rest } = props as ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button ref={ref as any} className={classes} disabled={disabled || loading} {...rest}>
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export { Button };
