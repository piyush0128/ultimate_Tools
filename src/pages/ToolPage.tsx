import { lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { ToolLayout } from '@/components/ToolLayout';
import { getTool } from '@/data/tools';
import { getCategoryById } from '@/data/categories';
import { categoryFAQs } from '@/data/faqs';
import type { FAQItem } from '@/types';

const ImageCompressor = lazy(() => import('@/tools/image/ImageCompressor').then((m) => ({ default: m.ImageCompressor })));
const WordCounter = lazy(() => import('@/tools/text/WordCounter').then((m) => ({ default: m.WordCounter })));
const JsonFormatter = lazy(() => import('@/tools/developer/JsonFormatter').then((m) => ({ default: m.JsonFormatter })));
const PasswordGenerator = lazy(() => import('@/tools/security/PasswordGenerator').then((m) => ({ default: m.PasswordGenerator })));
const PercentageCalculator = lazy(() => import('@/tools/calculator/PercentageCalculator').then((m) => ({ default: m.PercentageCalculator })));

const toolComponents: Record<string, React.LazyExoticComponent<React.FC>> = {
  'image-compressor': ImageCompressor,
  'word-counter': WordCounter,
  'json-formatter': JsonFormatter,
  'password-generator': PasswordGenerator,
  'percentage-calculator': PercentageCalculator,
};

const toolContent: Record<string, { howTo: string[]; features: string[]; faqs: FAQItem[] }> = {
  'image-compressor': {
    howTo: [
      'Click the upload area or drag and drop an image file.',
      'Adjust the quality slider to your desired compression level.',
      'Click "Compress Image" to process the image locally.',
      'Download the compressed image or reset to try again.',
    ],
    features: [
      'Supports JPEG, PNG, and WebP formats',
      'Adjustable quality from 10% to 100%',
      'Shows original and compressed file sizes',
      'Displays percentage reduction',
      'Instant download of compressed image',
      'Your image never leaves your device',
    ],
    faqs: [
      { question: 'Is the image compressor safe to use for sensitive images?', answer: 'Yes. The compression happens entirely in your browser using Canvas APIs. Your image is never uploaded to any server.' },
      { question: 'What image formats are supported?', answer: 'JPEG, PNG, and WebP are supported in most modern browsers.' },
      { question: 'Will compression reduce image quality?', answer: 'Compression reduces file size by applying lossy or lossless techniques. Lower quality settings result in smaller files but more visible quality loss.' },
    ],
  },
  'word-counter': {
    howTo: [
      'Type or paste your text into the text area.',
      'View real-time statistics for words, characters, sentences, and more.',
      'Use the Copy button to copy your text.',
      'Use the Clear button to start over.',
    ],
    features: [
      'Real-time word count',
      'Character count with and without spaces',
      'Sentence and paragraph counting',
      'Estimated reading time',
      'One-click copy',
      'No text is sent anywhere',
    ],
    faqs: [
      { question: 'Does the word counter work offline?', answer: 'Once the page is loaded, the word counter processes everything locally. It works without an internet connection.' },
      { question: 'Is there a character limit?', answer: 'There is no hard limit. The tool can handle very large text documents.' },
    ],
  },
  'json-formatter': {
    howTo: [
      'Paste your JSON data into the input field.',
      'Choose your indentation preference.',
      'Click Format to beautify or Minify to compress.',
      'Use Validate to check if your JSON is valid.',
      'Copy the output with one click.',
    ],
    features: [
      'Beautify JSON with custom indentation',
      'Minify JSON to reduce size',
      'Validate JSON with clear error messages',
      '2-space, 4-space, or tab indentation',
      'One-click copy of results',
      'Handles malformed JSON gracefully',
    ],
    faqs: [
      { question: 'What happens if my JSON is invalid?', answer: 'The tool shows a clear error message explaining what went wrong. It never crashes — you can fix and retry.' },
      { question: 'Can I minify JSON too?', answer: 'Yes. You can both beautify and minify JSON with a single click.' },
    ],
  },
  'password-generator': {
    howTo: [
      'Set your desired password length using the slider.',
      'Select which character types to include.',
      'Click Generate Password to create a new password.',
      'Copy the password with the copy button.',
    ],
    features: [
      'Cryptographically secure using Web Crypto API',
      'Adjustable length from 4 to 64 characters',
      'Include or exclude uppercase, lowercase, numbers, and symbols',
      'Real-time strength indicator',
      'One-click copy',
      'Passwords are never stored',
    ],
    faqs: [
      { question: 'How secure is the password generator?', answer: 'It uses the Web Crypto API (crypto.getRandomValues), which provides cryptographically secure random numbers — far safer than Math.random().' },
      { question: 'Are generated passwords stored anywhere?', answer: 'No. Generated passwords exist only in your browser and are never stored or transmitted.' },
    ],
  },
  'percentage-calculator': {
    howTo: [
      'Select the type of percentage calculation you need.',
      'Enter the values in the input fields.',
      'View the result and calculation explanation instantly.',
    ],
    features: [
      'Five calculation modes',
      'What is X% of Y',
      'X is what percentage of Y',
      'Percentage increase and decrease',
      'Percentage difference between two values',
      'Step-by-step calculation explanation',
    ],
    faqs: [
      { question: 'Are the calculations accurate?', answer: 'Yes. All calculations use standard JavaScript arithmetic and are processed locally.' },
      { question: 'Can I use this for financial calculations?', answer: 'The percentage calculator handles common percentage operations. For complex financial decisions, consult a professional.' },
    ],
  },
};

export function ToolPage() {
  const { category, tool } = useParams<{ category: string; tool: string }>();
  const toolMeta = category && tool ? getTool(category, tool) : undefined;

  if (!toolMeta) {
    return (
      <div className="pt-28 pb-12 container-page">
        <div className="rounded-2xl border border-border-default bg-bg-surface p-8 text-center">
          <h1 className="text-xl font-bold text-content-primary">Tool not found</h1>
          <p className="text-sm text-content-muted mt-2">The tool you are looking for does not exist or has been moved.</p>
        </div>
      </div>
    );
  }

  const ToolComponent = toolComponents[toolMeta.id];
  const cat = getCategoryById(toolMeta.category);
  const content = toolContent[toolMeta.id] || { howTo: [], features: [], faqs: [] };

  return (
    <>
      <SEO
        title={toolMeta.seoTitle}
        description={toolMeta.seoDescription}
        canonical={`https://ultimate.tools/tool/${cat?.slug}/${toolMeta.slug}`}
      />
      <ToolLayout tool={toolMeta} howToSteps={content.howTo} features={content.features} faqs={content.faqs}>
        <div className="rounded-2xl border border-border-default bg-bg-surface p-4 sm:p-6">
          {ToolComponent ? (
            <Suspense fallback={<div className="h-48 flex items-center justify-center text-content-muted text-sm">Loading tool...</div>}>
              <ToolComponent />
            </Suspense>
          ) : (
            <div className="text-center py-12">
              <p className="text-sm text-content-muted">This tool is coming soon.</p>
            </div>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
