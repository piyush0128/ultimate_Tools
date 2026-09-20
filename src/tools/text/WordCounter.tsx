import { useMemo, useState } from 'react';
import { Copy, Trash2, AlignLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/hooks/useToast';
import { copyToClipboard, formatNumber } from '@/lib/utils';

export function WordCounter() {
  const [text, setText] = useState('');
  const { showToast } = useToast();

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const sentences = trimmed ? (trimmed.match(/[.!?]+/g) || []).length || (trimmed ? 1 : 0) : 0;
    const paragraphs = trimmed ? trimmed.split(/\n\s*\n/).filter((p) => p.trim()).length : 0;
    const readingTime = Math.ceil(words / 200);

    return { words, characters, charactersNoSpaces, sentences, paragraphs, readingTime };
  }, [text]);

  const handleCopy = async () => {
    if (!text) return;
    await copyToClipboard(text);
    showToast('Text copied to clipboard');
  };

  const handleClear = () => {
    setText('');
    showToast('Text cleared', 'info');
  };

  const statCards = [
    { label: 'Words', value: stats.words },
    { label: 'Characters', value: stats.characters },
    { label: 'Characters (no spaces)', value: stats.charactersNoSpaces },
    { label: 'Sentences', value: stats.sentences },
    { label: 'Paragraphs', value: stats.paragraphs },
    { label: 'Reading time', value: `${stats.readingTime} min` },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border-default bg-bg-surface px-4 py-3 text-center"
          >
            <p className="text-xl sm:text-2xl font-bold font-mono text-primary-300">{stat.value}</p>
            <p className="text-2xs uppercase tracking-wider text-content-muted mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here..."
          className="w-full min-h-[300px] rounded-2xl border border-border-default bg-bg-inset p-5 text-sm text-content-primary placeholder:text-content-faint transition-all duration-200 ease-smooth focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 focus:outline-none resize-y"
          aria-label="Text input"
        />
        {text && (
          <div className="absolute bottom-3 right-3 text-xs text-content-faint">
            {formatNumber(stats.words)} words
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2.5">
        <Button variant="secondary" onClick={handleCopy} disabled={!text}>
          <Copy className="h-4 w-4" /> Copy Text
        </Button>
        <Button variant="ghost" onClick={handleClear} disabled={!text}>
          <Trash2 className="h-4 w-4" /> Clear
        </Button>
      </div>
    </div>
  );
}
