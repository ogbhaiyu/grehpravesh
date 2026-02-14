import { useEffect } from 'react'

export default function Privacy() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="min-h-screen pt-32 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto py-12">
                <h1 className="text-3xl font-bold text-white mb-8">Privacy Policy</h1>

                <div className="space-y-6 text-gray-muted leading-relaxed">
                    <p>Last updated: {new Date().toLocaleDateString()}</p>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h2>
                        <p>We collect information you provide directly to us when you create an account, list a property, or communicate with us. This may include your name, email address, phone number, and property details.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
                        <p>We use your information to facilitate property transactions, communicate with you about your listings or inquiries, and improve our platform's services.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">3. Information Sharing</h2>
                        <p>We do not sell your personal information. We may share your information with property owners or potential tenants/buyers only as necessary to facilitate the services you request.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">4. Security</h2>
                        <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">5. Contact Us</h2>
                        <p>If you have any questions about this Privacy Policy, please contact us at hello@grihapravesha.com.</p>
                    </section>
                </div>
            </div>
        </div>
    )
}
