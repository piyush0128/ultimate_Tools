export function AdPlaceholder({
  label = 'Advertisement',
  className = '',
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-2xl border border-dashed border-border-subtle bg-bg-surface/30 px-4 py-6 text-center ${className}`}
      aria-label="Ad placement area"
    >
      <span className="text-xs uppercase tracking-widest text-content-faint">{label}</span>
    </div>
  );
}
