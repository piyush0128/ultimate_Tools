export interface CategoryMeta {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  icon: string;
  color: string;
  glow: string;
  world: string;
}

export interface ToolMeta {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  longDescription: string;
  icon: string;
  keywords: string[];
  featured: boolean;
  popular: boolean;
  badge?: string;
  seoTitle: string;
  seoDescription: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CategoryPageData {
  hero: string;
  description: string;
  faqs: FAQItem[];
}
