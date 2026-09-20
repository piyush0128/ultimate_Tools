import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/Input';
import { Tabs } from '@/components/ui/Breadcrumb';

type Mode = 'percent-of' | 'percent-of-total' | 'increase' | 'decrease' | 'difference';

export function PercentageCalculator() {
  const [mode, setMode] = useState<Mode>('percent-of');

  const [a1, setA1] = useState('');
  const [b1, setB1] = useState('');

  const [a2, setA2] = useState('');
  const [b2, setB2] = useState('');

  const [a3, setA3] = useState('');
  const [b3, setB3] = useState('');

  const [a4, setA4] = useState('');
  const [b4, setB4] = useState('');

  const [a5, setA5] = useState('');
  const [b5, setB5] = useState('');

  const parse = (s: string): number | null => {
    const n = parseFloat(s);
    return isNaN(n) ? null : n;
  };

  const result = useMemo(() => {
    switch (mode) {
      case 'percent-of': {
        const x = parse(a1), y = parse(b1);
        if (x === null || y === null) return null;
        const r = (x / 100) * y;
        return { value: r, explanation: `${x}% of ${y} = (${x} / 100) × ${y} = ${r.toFixed(2)}` };
      }
      case 'percent-of-total': {
        const x = parse(a2), y = parse(b2);
        if (x === null || y === null || y === 0) return null;
        const r = (x / y) * 100;
        return { value: r, explanation: `${x} is (${x} / ${y}) × 100 = ${r.toFixed(2)}% of ${y}` };
      }
      case 'increase': {
        const oldV = parse(a3), newV = parse(b3);
        if (oldV === null || newV === null || oldV === 0) return null;
        const r = ((newV - oldV) / Math.abs(oldV)) * 100;
        return { value: r, explanation: `Increase from ${oldV} to ${newV} = ((${newV} - ${oldV}) / |${oldV}|) × 100 = ${r.toFixed(2)}%` };
      }
      case 'decrease': {
        const oldV = parse(a4), newV = parse(b4);
        if (oldV === null || newV === null || oldV === 0) return null;
        const r = ((oldV - newV) / Math.abs(oldV)) * 100;
        return { value: r, explanation: `Decrease from ${oldV} to ${newV} = ((${oldV} - ${newV}) / |${oldV}|) × 100 = ${r.toFixed(2)}%` };
      }
      case 'difference': {
        const x = parse(a5), y = parse(b5);
        if (x === null || y === null) return null;
        const avg = (x + y) / 2;
        if (avg === 0) return null;
        const r = (Math.abs(x - y) / Math.abs(avg)) * 100;
        return { value: r, explanation: `Difference between ${x} and ${y} = |${x} - ${y}| / ((${x} + ${y}) / 2) × 100 = ${r.toFixed(2)}%` };
      }
    }
  }, [mode, a1, b1, a2, b2, a3, b3, a4, b4, a5, b5]);

  const tabs = [
    { id: 'percent-of', label: 'X% of Y' },
    { id: 'percent-of-total', label: 'X is what % of Y' },
    { id: 'increase', label: 'Increase' },
    { id: 'decrease', label: 'Decrease' },
    { id: 'difference', label: 'Difference' },
  ];

  const inputs: Record<Mode, { a: string; b: string; aLabel: string; bLabel: string; setA: (v: string) => void; setB: (v: string) => void; unit: string }> = {
    'percent-of': { a: a1, b: b1, aLabel: 'X (percentage)', bLabel: 'Y (value)', setA: setA1, setB: setB1, unit: '' },
    'percent-of-total': { a: a2, b: b2, aLabel: 'X (value)', bLabel: 'Y (total)', setA: setA2, setB: setB2, unit: '%' },
    'increase': { a: a3, b: b3, aLabel: 'Original value', bLabel: 'New value', setA: setA3, setB: setB3, unit: '%' },
    'decrease': { a: a4, b: b4, aLabel: 'Original value', bLabel: 'New value', setA: setA4, setB: setB4, unit: '%' },
    'difference': { a: a5, b: b5, aLabel: 'Value 1', bLabel: 'Value 2', setA: setA5, setB: setB5, unit: '%' },
  };

  const current = inputs[mode];

  return (
    <div className="space-y-5">
      <Tabs tabs={tabs} active={mode} onChange={(m) => setMode(m as Mode)} />

      <div className="rounded-2xl border border-border-default bg-bg-surface p-5 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            type="number"
            label={current.aLabel}
            value={current.a}
            onChange={(e) => current.setA(e.target.value)}
            placeholder="0"
          />
          <Input
            type="number"
            label={current.bLabel}
            value={current.b}
            onChange={(e) => current.setB(e.target.value)}
            placeholder="0"
          />
        </div>

        {result !== null ? (
          <div className="rounded-xl border border-primary-500/30 bg-primary-500/5 p-5">
            <p className="text-xs uppercase tracking-wider text-content-muted mb-1">Result</p>
            <p className="text-3xl font-bold font-mono text-primary-300">
              {result.value.toFixed(2)}{current.unit}
            </p>
            <p className="text-sm text-content-secondary mt-3 font-mono">{result.explanation}</p>
          </div>
        ) : (
          <div className="rounded-xl border border-border-default bg-bg-inset p-5 text-center">
            <p className="text-sm text-content-muted">Enter values to see the result</p>
          </div>
        )}
      </div>
    </div>
  );
}
