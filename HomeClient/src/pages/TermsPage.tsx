export default function TermsOfServicePage() {
  return (
    <section className="min-h-screen bg-background text-foreground py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
        <p className="mb-6 text-muted-foreground text-lg">
          Last updated: June 17, 2025
        </p>

        <div className="space-y-8 text-base leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold mb-2">1. Acceptance of Terms</h2>
            <p>
              By using Lumino, you agree to be bound by these Terms of Service, our Privacy Policy,
              and any other legal notices published by us. If you do not agree to these terms,
              please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">2. Description of Service</h2>
            <p>
              Lumino provides a platform for creators to sell digital products. We facilitate
              payment processing, file hosting, and customer access to downloads.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">3. User Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Maintain accurate account information.</li>
              <li>Use the platform only for lawful purposes.</li>
              <li>
                Ensure that all uploaded content is original or you have the rights to sell it.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">4. Prohibited Uses</h2>
            <p>
              You may not use Lumino to distribute harmful, illegal, or fraudulent content. Any
              violations will result in account termination.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">5. Intellectual Property</h2>
            <p>
              All materials and content on Lumino are either owned by us or by users who have
              uploaded them. You may not copy, reproduce, or redistribute any content without
              permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">6. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access to the platform at any time,
              with or without notice, for any reason, including violation of these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">7. Limitation of Liability</h2>
            <p>
              Lumino is provided "as is" and we make no guarantees regarding uptime or accuracy of
              services. We are not liable for any damages arising from your use of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">8. Governing Law</h2>
            <p>
              These terms are governed by and interpreted in accordance with the laws of the
              Republic of Indonesia, without regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">9. Contact</h2>
            <p>
              If you have any questions regarding these Terms, contact us at{" "}
              <a href="mailto:support@lumino.id" className="text-primary underline">
                support@lumino.id
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}