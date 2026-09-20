import { useState, useCallback, useEffect } from 'react';
import { Copy, RefreshCw, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Slider } from '@/components/ui/Slider';
import { Checkbox } from '@/components/ui/Checkbox';
import { useToast } from '@/hooks/useToast';
import { copyToClipboard } from '@/lib/utils';

const CHAR_SETS = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

function getSecureRandom(max: number): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

function generatePassword(length: number, options: { upper: boolean; lower: boolean; numbers: boolean; symbols: boolean }): string {
  let charset = '';
  const required: string[] = [];

  if (options.upper) {
    charset += CHAR_SETS.upper;
    required.push(CHAR_SETS.upper[getSecureRandom(26)]);
  }
  if (options.lower) {
    charset += CHAR_SETS.lower;
    required.push(CHAR_SETS.lower[getSecureRandom(26)]);
  }
  if (options.numbers) {
    charset += CHAR_SETS.numbers;
    required.push(CHAR_SETS.numbers[getSecureRandom(10)]);
  }
  if (options.symbols) {
    charset += CHAR_SETS.symbols;
    required.push(CHAR_SETS.symbols[getSecureRandom(CHAR_SETS.symbols.length)]);
  }

  if (!charset) return '';

  const chars: string[] = [...required];
  for (let i = required.length; i < length; i++) {
    chars.push(charset[getSecureRandom(charset.length)]);
  }

  // Shuffle
  for (let i = chars.length - 1; i > 0; i--) {
    const j = getSecureRandom(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.slice(0, length).join('');
}

function getStrength(password: string): { label: string; color: string; percent: number } {
  if (!password) return { label: '—', color: 'var(--content-faint)', percent: 0 };
  let score = 0;
  if (password.length >= 8) score += 25;
  if (password.length >= 12) score += 25;
  if (password.length >= 16) score += 10;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 15;
  if (/[0-9]/.test(password)) score += 15;
  if (/[^a-zA-Z0-9]/.test(password)) score += 10;

  if (score < 40) return { label: 'Weak', color: 'var(--error-400)', percent: score };
  if (score < 60) return { label: 'Fair', color: 'var(--warning-400)', percent: score };
  if (score < 80) return { label: 'Good', color: 'var(--primary-400)', percent: score };
  return { label: 'Strong', color: 'var(--success-400)', percent: Math.min(score, 100) };
}

export function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const generate = useCallback(() => {
    const pwd = generatePassword(length, { upper, lower, numbers, symbols });
    setPassword(pwd);
    setCopied(false);
  }, [length, upper, lower, numbers, symbols]);

  useEffect(() => {
    generate();
  }, [generate]);

  const handleCopy = async () => {
    if (!password) return;
    await copyToClipboard(password);
    setCopied(true);
    showToast('Password copied');
    setTimeout(() => setCopied(false), 2000);
  };

  const strength = getStrength(password);
  const noCharset = !upper && !lower && !numbers && !symbols;

  return (
    <div className="space-y-5">
      {/* Password display */}
      <div className="rounded-2xl border border-border-default bg-bg-inset p-5">
        <div className="flex items-center justify-between gap-3">
          <code className="text-sm sm:text-base font-mono text-content-primary break-all flex-1 min-w-0">
            {password || 'Select at least one character type'}
          </code>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={handleCopy}
              disabled={!password}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-default bg-bg-elevated text-content-secondary hover:text-content-primary transition-colors disabled:opacity-50"
              aria-label="Copy password"
            >
              {copied ? <Check className="h-4 w-4 text-success-400" /> : <Copy className="h-4 w-4" />}
            </button>
            <button
              onClick={generate}
              disabled={noCharset}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-default bg-bg-elevated text-content-secondary hover:text-content-primary transition-colors disabled:opacity-50"
              aria-label="Regenerate password"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Strength bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-content-muted">Strength</span>
            <span className="text-xs font-medium" style={{ color: strength.color }}>{strength.label}</span>
          </div>
          <div className="h-1.5 rounded-full bg-bg-base overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-smooth"
              style={{ width: `${strength.percent}%`, background: strength.color }}
            />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="rounded-2xl border border-border-default bg-bg-surface p-5 space-y-5">
        <Slider
          label="Password Length"
          value={length}
          min={4}
          max={64}
          step={1}
          onChange={setLength}
        />

        <div className="grid grid-cols-2 gap-3">
          <Checkbox label="Uppercase (A-Z)" checked={upper} onChange={setUpper} />
          <Checkbox label="Lowercase (a-z)" checked={lower} onChange={setLower} />
          <Checkbox label="Numbers (0-9)" checked={numbers} onChange={setNumbers} />
          <Checkbox label="Symbols (!@#$)" checked={symbols} onChange={setSymbols} />
        </div>

        <Button onClick={generate} disabled={noCharset} className="w-full">
          <RefreshCw className="h-4 w-4" /> Generate Password
        </Button>

        {noCharset && (
          <p className="text-xs text-error-400 text-center">Select at least one character type.</p>
        )}
      </div>
    </div>
  );
}
