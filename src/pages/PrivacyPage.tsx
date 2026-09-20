import { SEO } from '@/components/SEO';
import { PageTransition } from '@/components/SEO';

export function PrivacyPage() {
  return (
    <>
      <SEO
        title="Privacy Policy — Ultimate Tools"
        description="Ultimate Tools privacy policy. No account required, browser-side processing, uploaded files are not sent to a server."
        canonical="https://ultimate.tools/privacy"
      />
      <PageTransition>
        <div className="pt-28 pb-12">
          <div className="container-narrow">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-content-primary">Privacy Policy</h1>
            <p className="mt-2 text-sm text-content-muted">Last updated: September 2026</p>

            <div className="mt-8 prose-content space-y-6">
              <section>
                <h2 className="text-lg font-bold text-content-primary mb-2">Summary</h2>
                <p className="text-sm text-content-secondary leading-relaxed">
                  Ultimate Tools is designed with privacy as a core principle. No account is required to use any tool.
                  Most tool processing happens locally in your browser. We do not intentionally send your files or tool
                  inputs to a server.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-content-primary mb-2">No Account Required</h2>
                <p className="text-sm text-content-secondary leading-relaxed">
                  We do not require you to create an account, log in, or provide any personal information to use any tool
                  on this website.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-content-primary mb-2">Browser-Side Processing</h2>
                <p className="text-sm text-content-secondary leading-relaxed">
                  All tool processing — including image compression, text analysis, JSON formatting, password generation,
                  and calculations — runs locally in your browser using JavaScript and browser APIs. Your data is not
                  uploaded to our servers for processing.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-content-primary mb-2">File Handling</h2>
                <p className="text-sm text-content-secondary leading-relaxed">
                  When you upload a file to a tool (such as the image compressor), the file is processed entirely in your
                  browser. It is not transmitted to any server. Once you leave or refresh the page, the file data is no
                  longer in memory.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-content-primary mb-2">Browser Storage</h2>
                <p className="text-sm text-content-secondary leading-relaxed">
                  Some tools may use browser local storage or session storage to remember your preferences (such as
                  selected options or settings). This data is stored on your device and is not transmitted to us.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-content-primary mb-2">Advertising</h2>
                <p className="text-sm text-content-secondary leading-relaxed">
                  This website may display advertisements in the future, potentially through Google AdSense or similar
                  services. Third-party advertising providers may use cookies to serve relevant ads. You can control
                  cookie settings through your browser. We do not control the data practices of third-party advertisers.
                </p>
                <p className="text-sm text-content-secondary leading-relaxed mt-2">
                  Ads will never interfere with tool functionality. Tool processing remains local regardless of
                  advertising.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-content-primary mb-2">Analytics</h2>
                <p className="text-sm text-content-secondary leading-relaxed">
                  We do not currently use analytics or tracking services. If this changes in the future, this policy
                  will be updated accordingly.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-content-primary mb-2">User Responsibility</h2>
                <p className="text-sm text-content-secondary leading-relaxed">
                  You are responsible for the content you process using these tools. Do not use these tools to process
                  content that violates applicable laws or the rights of others.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-content-primary mb-2">Contact</h2>
                <p className="text-sm text-content-secondary leading-relaxed">
                  If you have questions about this privacy policy, please contact us at [contact email placeholder].
                  This page will be updated with specific contact information when available.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-content-primary mb-2">Changes to This Policy</h2>
                <p className="text-sm text-content-secondary leading-relaxed">
                  We may update this privacy policy from time to time. Changes will be posted on this page with an
                  updated revision date.
                </p>
              </section>
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
}
