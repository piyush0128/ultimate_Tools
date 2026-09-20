import { type ReactNode } from 'react';
import { AlertCircle, Inbox, Loader2, CheckCircle2 } from 'lucide-react';

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border-default bg-bg-surface/50 px-6 py-12 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-bg-elevated text-content-muted">
        {icon || <Inbox className="h-6 w-6" />}
      </div>
      <h3 className="text-base font-semibold text-content-primary">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm text-content-muted">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
}: {
  title?: string;
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-error-500/30 bg-error-500/5 px-6 py-8 text-center">
      <AlertCircle className="mb-3 h-8 w-8 text-error-400" />
      <h3 className="text-base font-semibold text-content-primary">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-content-secondary">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-lg border border-border-default px-4 py-2 text-sm font-medium text-content-primary transition-colors hover:bg-bg-elevated"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

export function LoadingState({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-2.5 rounded-xl border border-border-default bg-bg-surface px-6 py-8">
      <Loader2 className="h-5 w-5 animate-spin text-primary-400" />
      <span className="text-sm text-content-secondary">{label}</span>
    </div>
  );
}

export function SuccessMessage({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-success-500/30 bg-success-500/5 px-4 py-3">
      <CheckCircle2 className="h-5 w-5 shrink-0 text-success-400" />
      <span className="text-sm text-content-secondary">{message}</span>
    </div>
  );
}

export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-2.5 rounded-xl border border-error-500/30 bg-error-500/5 px-4 py-3">
      <AlertCircle className="h-5 w-5 shrink-0 text-error-400 mt-0.5" />
      <span className="text-sm text-content-secondary">{message}</span>
    </div>
  );
}
