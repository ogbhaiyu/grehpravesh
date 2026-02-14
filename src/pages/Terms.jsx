import { useEffect } from 'react'

export default function Terms() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="min-h-screen pt-32 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto py-12">
                <h1 className="text-3xl font-bold text-white mb-8">Terms of Service</h1>

                <div className="space-y-6 text-gray-text leading-relaxed">
                    <p>Last updated: {new Date().toLocaleDateString()}</p>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
                        <p>By accessing or using Grihapravesha, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">2. Use License</h2>
                        <p>Permission is granted to temporarily download one copy of the materials (information or software) on Grihapravesha's website for personal, non-commercial transitory viewing only.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">3. Property Listings</h2>
                        <p>Users are responsible for the accuracy of the property details they list. Grihapravesha verifies listings but does not guarantee the availability or condition of any property.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">4. User Account</h2>
                        <p>You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">5. Termination</h2>
                        <p>We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
                    </section>
                </div>
            </div>
        </div>
    )
}
