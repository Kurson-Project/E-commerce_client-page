export default function PrivacyPolicyPage() {
    return (
        <section className="min-h-screen bg-background text-foreground py-24 px-6">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
                <p className="mb-6 text-muted-foreground text-lg">
                    Last updated: June 17, 2025
                </p>

                <div className="space-y-8 text-base leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
                        <p>
                            At Lumino, we prioritize your privacy. This policy outlines the types of personal
                            information we collect and how we use, store, and protect it.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-2">2. Information We Collect</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>
                                <span className="font-medium">Personal Information:</span> such as your name, email address, and payment details.
                            </li>
                            <li>
                                <span className="font-medium">Usage Data:</span> including how you interact with the platform and what features you use.
                            </li>
                            <li>
                                <span className="font-medium">Cookies:</span> to help enhance your experience and remember your preferences.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-2">3. How We Use Your Information</h2>
                        <p>
                            We use the information to process transactions, improve the platform, provide customer
                            support, and send updates or promotional messages (with your consent).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-2">4. Sharing Your Information</h2>
                        <p>
                            We never sell your data. We may share data with third-party providers like Stripe or
                            analytics tools strictly for platform functionality and legal compliance.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-2">5. Data Security</h2>
                        <p>
                            Lumino uses industry-standard encryption and security practices. While no system is
                            completely immune, we work diligently to protect your information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-2">6. Your Rights</h2>
                        <p>
                            You may access, modify, or delete your data anytime by logging into your account or
                            contacting our support. You can also opt out of marketing emails.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-2">7. Contact</h2>
                        <p>
                            For questions about our Privacy Policy, reach out to{" "}
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
