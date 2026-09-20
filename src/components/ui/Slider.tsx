import { type InputHTMLAttributes } from 'react';

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
}

export function Slider({ label, value, min, max, step = 1, unit, onChange, className = '', ...props }: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-content-secondary">{label}</label>
          <span className="text-sm font-mono font-semibold text-primary-300">
            {value}
            {unit && ` ${unit}`}
          </span>
        </div>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`slider w-full ${className}`}
        style={{
          background: `linear-gradient(to right, var(--primary-500) 0%, var(--primary-400) ${percentage}%, var(--bg-inset) ${percentage}%, var(--bg-inset) 100%)`,
        }}
        {...props}
      />
    </div>
  );
}
