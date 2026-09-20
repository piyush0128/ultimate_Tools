import { useState, useCallback, useRef } from 'react';
import { Upload, Download, RotateCcw, ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Slider } from '@/components/ui/Slider';
import { ErrorMessage } from '@/components/ui/States';
import { useToast } from '@/hooks/useToast';
import { formatBytes, downloadBlob, getExtension } from '@/lib/utils';

interface ImageInfo {
  file: File;
  url: string;
  width: number;
  height: number;
}

interface CompressedInfo {
  blob: Blob;
  url: string;
  size: number;
}

export function ImageCompressor() {
  const [original, setOriginal] = useState<ImageInfo | null>(null);
  const [compressed, setCompressed] = useState<CompressedInfo | null>(null);
  const [quality, setQuality] = useState(80);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  const processFile = useCallback((file: File) => {
    setError(null);
    const ext = getExtension(file.name);
    const valid = ['jpg', 'jpeg', 'png', 'webp', 'bmp'];
    if (!valid.includes(ext)) {
      setError('Unsupported format. Please use JPEG, PNG, or WebP.');
      return;
    }
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.');
      return;
    }

    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setOriginal({ file, url, width: img.naturalWidth, height: img.naturalHeight });
      setCompressed(null);
    };
    img.onerror = () => {
      setError('Could not load the image. It may be corrupted.');
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }, []);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const compress = useCallback(() => {
    if (!original) return;
    setLoading(true);
    setError(null);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setError('Canvas not supported in this browser.');
        setLoading(false);
        return;
      }
      ctx.drawImage(img, 0, 0);

      const mimeType = original.file.type || 'image/jpeg';
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setError('Compression failed. Try a different quality setting.');
            setLoading(false);
            return;
          }
          const url = URL.createObjectURL(blob);
          setCompressed({ blob, url, size: blob.size });
          setLoading(false);
          showToast('Image compressed successfully', 'success');
        },
        mimeType,
        quality / 100
      );
    };
    img.onerror = () => {
      setError('Failed to process the image.');
      setLoading(false);
    };
    img.src = original.url;
  }, [original, quality, showToast]);

  const reset = () => {
    if (original) URL.revokeObjectURL(original.url);
    if (compressed) URL.revokeObjectURL(compressed.url);
    setOriginal(null);
    setCompressed(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const download = () => {
    if (!compressed || !original) return;
    const ext = getExtension(original.file.name);
    const name = original.file.name.replace(/\.[^.]+$/, '');
    downloadBlob(compressed.blob, `${name}-compressed.${ext}`);
  };

  const reduction = original && compressed
    ? Math.round((1 - compressed.size / original.file.size) * 100)
    : 0;

  if (!original) {
    return (
      <div className="space-y-4">
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200 ease-smooth px-6 py-12 ${
            dragging
              ? 'border-primary-500 bg-primary-500/10'
              : 'border-border-default bg-bg-surface hover:border-primary-500/40 hover:bg-bg-elevated'
          }`}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-bg-elevated mb-4">
            <Upload className="h-7 w-7 text-primary-400" />
          </div>
          <p className="text-base font-medium text-content-primary">Drop your image here or click to upload</p>
          <p className="text-sm text-content-muted mt-1">JPEG, PNG, WebP supported</p>
        </div>
        <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
        {error && <ErrorMessage message={error} />}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />

      <div className="grid md:grid-cols-2 gap-4">
        {/* Original */}
        <div className="rounded-2xl border border-border-default bg-bg-surface p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-wider text-content-muted">Original</span>
            <span className="text-sm font-mono text-content-secondary">{formatBytes(original.file.size)}</span>
          </div>
          <div className="flex items-center justify-center rounded-xl bg-bg-inset border border-border-subtle overflow-hidden h-48">
            <img src={original.url} alt="Original" className="max-w-full max-h-full object-contain" />
          </div>
          <p className="text-xs text-content-faint mt-2">{original.width} x {original.height} px</p>
        </div>

        {/* Compressed */}
        <div className="rounded-2xl border border-border-default bg-bg-surface p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-wider text-content-muted">Compressed</span>
            {compressed ? (
              <span className="text-sm font-mono text-success-400">{formatBytes(compressed.size)}</span>
            ) : (
              <span className="text-sm font-mono text-content-faint">—</span>
            )}
          </div>
          <div className="flex items-center justify-center rounded-xl bg-bg-inset border border-border-subtle overflow-hidden h-48">
            {compressed ? (
              <img src={compressed.url} alt="Compressed" className="max-w-full max-h-full object-contain" />
            ) : (
              <ImageIcon className="h-8 w-8 text-content-faint" />
            )}
          </div>
          {compressed && (
            <p className="text-xs text-success-400 mt-2 font-medium">
              {reduction}% smaller
            </p>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="rounded-2xl border border-border-default bg-bg-surface p-5 space-y-4">
        <Slider
          label="Quality"
          value={quality}
          min={10}
          max={100}
          step={5}
          unit="%"
          onChange={setQuality}
        />
        <div className="flex flex-wrap gap-2.5">
          <Button onClick={compress} loading={loading} disabled={loading}>
            {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Compressing...</> : 'Compress Image'}
          </Button>
          {compressed && (
            <Button variant="secondary" onClick={download}>
              <Download className="h-4 w-4" /> Download
            </Button>
          )}
          <Button variant="ghost" onClick={reset}>
            <RotateCcw className="h-4 w-4" /> Reset
          </Button>
        </div>
      </div>

      {error && <ErrorMessage message={error} />}
    </div>
  );
}
