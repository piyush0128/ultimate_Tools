import type { ToolMeta } from '@/types';

export const tools: ToolMeta[] = [
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    slug: 'image-compressor',
    category: 'image',
    description: 'Reduce image file size without leaving your browser.',
    longDescription: 'Compress JPEG, PNG, and WebP images locally with adjustable quality. Your image never leaves your device.',
    icon: 'ImageDown',
    keywords: ['image', 'compress', 'compressor', 'optimize', 'reduce size', 'jpg', 'png', 'webp', 'shrink'],
    featured: true,
    popular: true,
    badge: 'Popular',
    seoTitle: 'Image Compressor — Free Browser-Based Image Compression',
    seoDescription: 'Free browser-based image compression tool that reduces image size while processing images locally on your device. No upload required.',
  },
  {
    id: 'word-counter',
    name: 'Word Counter',
    slug: 'word-counter',
    category: 'text',
    description: 'Count words, characters, sentences, and reading time instantly.',
    longDescription: 'A real-time text analysis tool that counts words, characters, sentences, paragraphs, and estimates reading time. Everything runs locally.',
    icon: 'AlignLeft',
    keywords: ['word', 'count', 'counter', 'character', 'sentence', 'paragraph', 'reading time', 'text'],
    featured: true,
    popular: true,
    badge: 'Popular',
    seoTitle: 'Word Counter — Free Online Word & Character Count Tool',
    seoDescription: 'Instantly count words, characters, sentences, paragraphs, and estimate reading time. Free, private, and works entirely in your browser.',
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    slug: 'json-formatter',
    category: 'developer',
    description: 'Format, minify, and validate JSON data instantly.',
    longDescription: 'Beautify, minify, and validate JSON data with clear error messages. Choose your indentation level and copy results in one click.',
    icon: 'Braces',
    keywords: ['json', 'format', 'formatter', 'minify', 'beautify', 'validate', 'pretty print', 'developer'],
    featured: true,
    popular: true,
    badge: 'Popular',
    seoTitle: 'JSON Formatter — Free Online JSON Beautifier & Validator',
    seoDescription: 'Format, minify, and validate JSON data instantly in your browser. Choose indentation, copy results, and get clear error messages.',
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    slug: 'password-generator',
    category: 'security',
    description: 'Generate strong, secure passwords using Web Crypto API.',
    longDescription: 'Create cryptographically secure passwords with customizable length and character sets. Uses the Web Crypto API — never Math.random().',
    icon: 'KeyRound',
    keywords: ['password', 'generate', 'generator', 'secure', 'random', 'web crypto', 'strong password', 'security'],
    featured: true,
    popular: true,
    badge: 'Popular',
    seoTitle: 'Password Generator — Free Secure Password Tool (Web Crypto)',
    seoDescription: 'Generate strong, cryptographically secure passwords in your browser. Customize length and character sets. Uses Web Crypto API for maximum security.',
  },
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    slug: 'percentage-calculator',
    category: 'calculator',
    description: 'Calculate percentages, increases, decreases, and differences.',
    longDescription: 'A versatile percentage calculator that handles common calculations: what is X% of Y, X is what percent of Y, percentage increase/decrease, and difference.',
    icon: 'Percent',
    keywords: ['percentage', 'percent', 'calculator', 'increase', 'decrease', 'difference', 'math', 'calculate'],
    featured: true,
    popular: true,
    badge: 'Popular',
    seoTitle: 'Percentage Calculator — Free Online Percent Calculator',
    seoDescription: 'Calculate percentages, increases, decreases, and differences instantly. Free, private, and works entirely in your browser.',
  },
];

export const getTool = (category: string, slug: string): ToolMeta | undefined =>
  tools.find((t) => t.category === category && t.slug === slug);

export const getToolsByCategory = (categoryId: string): ToolMeta[] =>
  tools.filter((t) => t.category === categoryId);

export const getFeaturedTools = (): ToolMeta[] => tools.filter((t) => t.featured);

export const getPopularTools = (): ToolMeta[] => tools.filter((t) => t.popular);

export const searchTools = (query: string): ToolMeta[] => {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return tools.filter((t) => {
    return (
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.keywords.some((k) => k.includes(q))
    );
  });
};

export const getRelatedTools = (toolId: string, category: string, limit = 3): ToolMeta[] => {
  const sameCategory = tools.filter((t) => t.category === category && t.id !== toolId);
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const others = tools.filter((t) => t.category !== category && t.id !== toolId);
  return [...sameCategory, ...others].slice(0, limit);
};
