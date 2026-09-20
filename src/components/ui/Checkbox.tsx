interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
}

export function Checkbox({ label, checked, onChange, description }: CheckboxProps) {
  return (
    <label className="flex cursor-pointer items-center gap-3 select-none">
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all duration-200 ease-smooth ${
          checked
            ? 'border-primary-400 bg-primary-500/20'
            : 'border-border-strong bg-bg-inset hover:border-primary-500/50'
        }`}
      >
        {checked && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-primary-300">
            <path d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>
      <div>
        <span className="text-sm text-content-primary">{label}</span>
        {description && <p className="text-xs text-content-muted">{description}</p>}
      </div>
    </label>
  );
}
