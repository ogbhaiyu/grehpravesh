import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Shield, Lock, Eye, FileText } from 'lucide-react'

export default function Privacy() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="min-h-screen bg-[#050505] pt-24 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
                    <Link to="/" className="hover:text-white transition-colors">Home</Link>
                    <span>/</span>
                    <span className="text-white">Privacy Policy</span>
                </nav>

                {/* Header */}
                <div className="border-b border-white/10 pb-8 mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Privacy Policy</h1>
                    <p className="text-gray-400">
                        Last updated: <span className="text-amber-500">{new Date().toLocaleDateString()}</span>
                    </p>
                </div>

                {/* Content */}
                <div className="space-y-12">
                    {/* Introduction */}
                    <div className="prose prose-invert max-w-none">
                        <p className="text-lg text-gray-300 leading-relaxed">
                            At Grihapravesha, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                        </p>
                    </div>

                    {/* Section 1 */}
                    <section className="bg-white/5 rounded-2xl p-6 border border-white/10">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-lg bg-blue-500/10 text-blue-500">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h2>
                                <div className="space-y-4 text-gray-400 leading-relaxed">
                                    <p>
                                        We collect information you provide directly to us when you create an account, list a property, or communicate with us. This may include:
                                    </p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Personal identification information (Name, email address, phone number, etc.)</li>
                                        <li>Property details and location data</li>
                                        <li>Payment information (processed securely by third-party providers)</li>
                                        <li>Communications and correspondence details</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section className="bg-white/5 rounded-2xl p-6 border border-white/10">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-lg bg-green-500/10 text-green-500">
                                <Eye className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
                                <div className="space-y-4 text-gray-400 leading-relaxed">
                                    <p>
                                        We use the information we collect to:
                                    </p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Facilitate property transactions and connect buyers with sellers</li>
                                        <li>Send you technical notices, updates, security alerts, and support messages</li>
                                        <li>Respond to your comments, questions, and requests</li>
                                        <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section className="bg-white/5 rounded-2xl p-6 border border-white/10">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-lg bg-purple-500/10 text-purple-500">
                                <Shield className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-white mb-3">3. Information Sharing</h2>
                                <p className="text-gray-400 leading-relaxed">
                                    We do not sell your personal information. We may share your information with property owners or potential tenants/buyers only as necessary to facilitate the services you request. We may also share information to comply with laws or to protect the rights, property, or safety of Grihapravesha, our users, or others.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 4 */}
                    <section className="bg-white/5 rounded-2xl p-6 border border-white/10">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-lg bg-red-500/10 text-red-500">
                                <Lock className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-white mb-3">4. Security</h2>
                                <p className="text-gray-400 leading-relaxed">
                                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or method of electronic storage is 100% secure.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Contact */}
                    <div className="border-t border-white/10 pt-8 mt-12">
                        <h2 className="text-xl font-semibold text-white mb-4">5. Contact Us</h2>
                        <p className="text-gray-400">
                            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:hello@grihapravesha.com" className="text-amber-500 hover:text-amber-400">hello@grihapravesha.com</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
