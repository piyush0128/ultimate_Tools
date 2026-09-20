import { ShieldCheck, Zap, Globe, Cpu } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { PageTransition } from '@/components/SEO';
import { FAQ } from '@/components/FAQ';
import { aboutFAQs } from '@/data/faqs';

export function AboutPage() {
  return (
    <>
      <SEO
        title="About — Ultimate Tools"
        description="Ultimate Tools is a collection of browser-based utilities designed to make everyday digital tasks faster and easier. Privacy-first, free, and no signup required."
        canonical="https://ultimate.tools/about"
      />
      <PageTransition>
        <div className="pt-28 pb-12">
          <div className="container-narrow">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-content-primary">About Ultimate Tools</h1>
            <p className="mt-4 text-base text-content-secondary">
              Ultimate Tools is a collection of browser-based utilities designed to make everyday digital tasks faster and easier.
            </p>

            <div className="mt-8 space-y-6">
              <section className="rounded-2xl border border-border-default bg-bg-surface p-6">
                <div className="flex items-center gap-3 mb-3">
                  <ShieldCheck className="h-6 w-6 text-primary-400" />
                  <h2 className="text-lg font-bold text-content-primary">Privacy-First Philosophy</h2>
                </div>
                <p className="text-sm text-content-secondary leading-relaxed">
                  Most tools on this site process information locally in your browser. That means your files, text, and data
                  never leave your device. We do not use server-side processing for tool operations. This is not just a feature —
                  it is a core design principle.
                </p>
              </section>

              <section className="rounded-2xl border border-border-default bg-bg-surface p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="h-6 w-6 text-primary-400" />
                  <h2 className="text-lg font-bold text-content-primary">Fast and Free</h2>
                </div>
                <p className="text-sm text-content-secondary leading-relaxed">
                  Because processing happens in your browser, tools are fast. There are no server round trips, no upload
                  waits, and no queues. Everything is free to use, with no account required.
                </p>
              </section>

              <section className="rounded-2xl border border-border-default bg-bg-surface p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Globe className="h-6 w-6 text-primary-400" />
                  <h2 className="text-lg font-bold text-content-primary">The Toolverse</h2>
                </div>
                <p className="text-sm text-content-secondary leading-relaxed">
                  The Toolverse is our visual discovery system — eight interconnected worlds, each representing a category
                  of tools. It is designed to make finding the right tool feel like exploration rather than searching.
                </p>
              </section>

              <section className="rounded-2xl border border-border-default bg-bg-surface p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Cpu className="h-6 w-6 text-primary-400" />
                  <h2 className="text-lg font-bold text-content-primary">Built to Scale</h2>
                </div>
                <p className="text-sm text-content-secondary leading-relaxed">
                  We are launching with a focused set of tools and will be expanding to 100+ over time. The architecture
                  is designed to grow without losing the simplicity and speed that makes the platform useful.
                </p>
              </section>
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-bold text-content-primary mb-4">FAQ</h2>
              <FAQ items={aboutFAQs} />
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
}
