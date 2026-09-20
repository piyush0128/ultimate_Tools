import { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { Boxes, Zap, ShieldCheck, Monitor, Cpu, Globe, ArrowRight, Sparkles } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/Button';
import { ToolCard } from '@/components/ToolCard';
import { CategoryCard } from '@/components/CategoryCard';
import { FAQ } from '@/components/FAQ';
import { AdPlaceholder } from '@/components/ui/AdPlaceholder';
import { categories } from '@/data/categories';
import { getFeaturedTools, getPopularTools } from '@/data/tools';
import { homeFAQs } from '@/data/faqs';

const Toolverse = lazy(() => import('@/components/toolverse/Toolverse').then((m) => ({ default: m.Toolverse })));

export function HomePage() {
  const featured = getFeaturedTools();
  const popular = getPopularTools();
  const features = [
    { icon: ShieldCheck, title: 'No signup required', desc: 'Every tool works instantly. No account, no login, no waiting.' },
    { icon: Monitor, title: 'Browser-based', desc: 'Everything runs in your browser. No software to install.' },
    { icon: Zap, title: 'Privacy-focused', desc: 'Your files stay on your device. Nothing is uploaded.' },
    { icon: Cpu, title: 'Fast', desc: 'Local processing means instant results, no server round trips.' },
    { icon: Globe, title: 'Free to use', desc: 'All tools are completely free, now and always.' },
    { icon: Boxes, title: 'Works across devices', desc: 'Designed for phones, tablets, and desktops alike.' },
  ];

  return (
    <>
      <SEO
        title="Ultimate Tools — Every Tool You Need. One Universe."
        description="Fast, private, browser-based tools for images, documents, text, code, calculations, security and more. No signup required."
        canonical="https://ultimate.tools/"
      />

      {/* Hero */}
      <section className="relative pt-28 sm:pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-base pointer-events-none" />

        <div className="container-page relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/5 px-3.5 py-1.5 text-xs font-medium text-primary-300 mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Welcome to the Toolverse
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              <span className="text-content-primary">Every Tool You Need.</span>
              <br />
              <span className="text-gradient">One Universe.</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-content-secondary max-w-2xl mx-auto">
              Fast, private, browser-based tools for images, documents, text, code, calculations, security and more.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button to="/toolverse" size="lg">
                <Boxes className="h-5 w-5" /> Explore Toolverse
              </Button>
              <Button to="/categories" size="lg" variant="secondary">
                Browse All Tools <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Toolverse */}
      <section className="py-8">
        <div className="container-page">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-content-primary">The Toolverse</h2>
            <p className="text-sm text-content-muted mt-1">Explore 8 worlds of tools</p>
          </div>
          <Suspense fallback={<div className="h-[400px] flex items-center justify-center text-content-muted text-sm">Loading Toolverse...</div>}>
            <Toolverse />
          </Suspense>
        </div>
      </section>

      {/* Popular tools */}
      <section className="py-12">
        <div className="container-page">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-content-primary">Popular Tools</h2>
            <Link to="/categories" className="text-sm text-primary-400 hover:text-primary-300 transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.slice(0, 6).map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      <AdPlaceholder className="container-page my-12" />

      {/* Explore worlds */}
      <section className="py-12">
        <div className="container-page">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-content-primary">Explore the Toolverse</h2>
            <p className="text-sm text-content-muted mt-1">Eight worlds, each a category of tools</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="py-12">
        <div className="container-page">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-content-primary">Why Ultimate Tools?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-border-default bg-bg-surface p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary-500/30 bg-primary-500/10 mb-3">
                  <f.icon className="h-5 w-5 text-primary-300" />
                </div>
                <h3 className="text-base font-semibold text-content-primary">{f.title}</h3>
                <p className="text-sm text-content-muted mt-1">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recently added / popular */}
      <section className="py-12">
        <div className="container-page">
          <h2 className="text-2xl font-bold text-content-primary mb-6">Popular Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popular.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      <AdPlaceholder className="container-page my-12" />

      {/* FAQ */}
      <section className="py-12">
        <div className="container-narrow">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-content-primary">FAQ</h2>
          </div>
          <FAQ items={homeFAQs} />
        </div>
      </section>
    </>
  );
}
