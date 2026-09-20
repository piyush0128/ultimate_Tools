import { type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes, forwardRef } from 'react';

const baseInput = `w-full rounded-xl border border-border-default bg-bg-inset px-4 py-2.5 text-sm text-content-primary placeholder:text-content-faint transition-all duration-200 ease-smooth focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 focus:outline-none disabled:opacity-50`;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, className = '', id, ...props }, ref) => {
    const inputId = id || props.name;
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-content-secondary">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`${baseInput} ${error ? 'border-error-500/50 focus:border-error-500/50 focus:ring-error-500/20' : ''} ${className}`}
          {...props}
        />
        {error ? (
          <p className="text-xs text-error-400">{error}</p>
        ) : hint ? (
          <p className="text-xs text-content-muted">{hint}</p>
        ) : null}
      </div>
    );
  }
);
Input.displayName = 'Input';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, error, className = '', id, ...props }, ref) => {
    const inputId = id || props.name;
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-content-secondary">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={`${baseInput} resize-y min-h-[120px] font-mono ${error ? 'border-error-500/50 focus:border-error-500/50 focus:ring-error-500/20' : ''} ${className}`}
          {...props}
        />
        {error ? (
          <p className="text-xs text-error-400">{error}</p>
        ) : hint ? (
          <p className="text-xs text-content-muted">{hint}</p>
        ) : null}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, hint, className = '', id, children, ...props }, ref) => {
    const inputId = id || props.name;
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-content-secondary">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={inputId}
          className={`${baseInput} cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236b7c93%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat pr-10 ${className}`}
          {...props}
        >
          {children}
        </select>
        {hint && <p className="text-xs text-content-muted">{hint}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';
