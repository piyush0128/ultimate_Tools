import { SEO } from '@/components/SEO';
import { PageTransition } from '@/components/SEO';

export function TermsPage() {
  return (
    <>
      <SEO
        title="Terms of Service — Ultimate Tools"
        description="Ultimate Tools terms of service. General terms governing the use of browser-based tools and this website."
        canonical="https://ultimate.tools/terms"
      />
      <PageTransition>
        <div className="pt-28 pb-12">
          <div className="container-narrow">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-content-primary">Terms of Service</h1>
            <p className="mt-2 text-sm text-content-muted">Last updated: September 2026</p>

            <div className="mt-8 space-y-6">
              <section>
                <h2 className="text-lg font-bold text-content-primary mb-2">Acceptance of Terms</h2>
                <p className="text-sm text-content-secondary leading-relaxed">
                  By accessing or using Ultimate Tools, you agree to be bound by these terms of service. If you do not
                  agree with any part of these terms, please do not use this website.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-content-primary mb-2">Use of Tools</h2>
                <p className="text-sm text-content-secondary leading-relaxed">
                  Ultimate Tools provides browser-based utilities for personal and commercial use. You agree to use these
                  tools responsibly and in compliance with applicable laws. You are responsible for any content you
                  process using these tools.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-content-primary mb-2">No Warranty</h2>
                <p className="text-sm text-content-secondary leading-relaxed">
                  The tools on this website are provided "as is" without warranties of any kind, either express or
                  implied. We do not guarantee that the tools will be error-free, uninterrupted, or produce accurate
                  results in all cases. You use the tools at your own risk.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-content-primary mb-2">Limitation of Liability</h2>
                <p className="text-sm text-content-secondary leading-relaxed">
                  Ultimate Tools and its operators shall not be liable for any direct, indirect, incidental, special,
                  consequential, or punitive damages arising from your use of or inability to use the tools on this
                  website.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-content-primary mb-2">Intellectual Property</h2>
                <p className="text-sm text-content-secondary leading-relaxed">
                  The website design, layout, code, and original content are the property of Ultimate Tools. The tools
                  are provided for your use, but the underlying platform and design remain our property.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-content-primary mb-2">Privacy</h2>
                <p className="text-sm text-content-secondary leading-relaxed">
                  Your use of this website is also governed by our Privacy Policy. Please review it to understand how
                  your data is (and is not) handled.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-content-primary mb-2">Third-Party Links</h2>
                <p className="text-sm text-content-secondary leading-relaxed">
                  This website may contain links to third-party websites or services. We are not responsible for the
                  content, policies, or practices of any third-party sites.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-content-primary mb-2">Changes to Terms</h2>
                <p className="text-sm text-content-secondary leading-relaxed">
                  We may update these terms from time to time. Continued use of the website after changes are posted
                  constitutes acceptance of the updated terms.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-content-primary mb-2">Contact</h2>
                <p className="text-sm text-content-secondary leading-relaxed">
                  For questions about these terms, please contact us at [contact email placeholder].
                </p>
              </section>
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
}
