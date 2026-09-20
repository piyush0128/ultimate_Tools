import { useMemo, useState } from 'react';
import { Copy, Trash2, Check, AlertCircle, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Input';
import { ErrorMessage, SuccessMessage } from '@/components/ui/States';
import { useToast } from '@/hooks/useToast';
import { copyToClipboard } from '@/lib/utils';

export function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [indent, setIndent] = useState('2');
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const isValid = useMemo(() => {
    if (!input.trim()) return false;
    try {
      JSON.parse(input);
      return true;
    } catch {
      return false;
    }
  }, [input]);

  const formatJson = () => {
    if (!input.trim()) {
      setError('Please enter JSON data to format.');
      setOutput('');
      setSuccess(null);
      return;
    }
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, Number(indent));
      setOutput(formatted);
      setError(null);
      setSuccess('JSON formatted successfully.');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON data.');
      setOutput('');
      setSuccess(null);
    }
  };

  const minifyJson = () => {
    if (!input.trim()) {
      setError('Please enter JSON data to minify.');
      setOutput('');
      setSuccess(null);
      return;
    }
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError(null);
      setSuccess('JSON minified successfully.');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON data.');
      setOutput('');
      setSuccess(null);
    }
  };

  const validateJson = () => {
    if (!input.trim()) {
      setError('Please enter JSON data to validate.');
      setSuccess(null);
      return;
    }
    try {
      JSON.parse(input);
      setError(null);
      setSuccess('Valid JSON!');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON data.');
      setSuccess(null);
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    await copyToClipboard(output);
    setCopied(true);
    showToast('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2.5">
        <Button onClick={formatJson} disabled={!input.trim()}>
          <Maximize2 className="h-4 w-4" /> Format
        </Button>
        <Button variant="secondary" onClick={minifyJson} disabled={!input.trim()}>
          <Minimize2 className="h-4 w-4" /> Minify
        </Button>
        <Button variant="outline" onClick={validateJson} disabled={!input.trim()}>
          <Check className="h-4 w-4" /> Validate
        </Button>
        <div className="ml-auto">
          <Select value={indent} onChange={(e) => setIndent(e.target.value)} aria-label="Indentation">
            <option value="2">2 spaces</option>
            <option value="4">4 spaces</option>
            <option value="\t">Tab</option>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="relative">
          <label className="absolute top-3 left-4 text-xs uppercase tracking-wider text-content-muted z-10">Input</label>
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(null);
              setSuccess(null);
            }}
            placeholder='{"name": "Ultimate Tools", "type": "awesome"}'
            className="w-full min-h-[320px] rounded-2xl border border-border-default bg-bg-inset p-4 pt-8 text-sm font-mono text-content-primary placeholder:text-content-faint transition-all duration-200 focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 focus:outline-none resize-y"
            spellCheck={false}
            aria-label="JSON input"
          />
          {input.trim() && (
            <div className={`absolute bottom-3 right-3 flex items-center gap-1.5 text-xs font-medium ${isValid ? 'text-success-400' : 'text-error-400'}`}>
              {isValid ? <><Check className="h-3.5 w-3.5" /> Valid</> : <><AlertCircle className="h-3.5 w-3.5" /> Invalid</>}
            </div>
          )}
        </div>

        <div className="relative">
          <label className="absolute top-3 left-4 text-xs uppercase tracking-wider text-content-muted z-10">Output</label>
          <textarea
            value={output}
            readOnly
            placeholder="Formatted output will appear here..."
            className="w-full min-h-[320px] rounded-2xl border border-border-default bg-bg-inset p-4 pt-8 text-sm font-mono text-content-primary placeholder:text-content-faint resize-y"
            spellCheck={false}
            aria-label="JSON output"
          />
          {output && (
            <button
              onClick={handleCopy}
              className="absolute top-2.5 right-3 flex items-center gap-1.5 rounded-lg border border-border-default bg-bg-elevated px-2.5 py-1.5 text-xs font-medium text-content-secondary hover:text-content-primary transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-success-400" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          )}
        </div>
      </div>

      {error && <ErrorMessage message={error} />}
      {success && <SuccessMessage message={success} />}

      <div className="flex gap-2.5">
        <Button variant="ghost" onClick={handleClear} disabled={!input && !output}>
          <Trash2 className="h-4 w-4" /> Clear All
        </Button>
      </div>
    </div>
  );
}
