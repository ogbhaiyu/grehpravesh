import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FileCheck, Users, AlertCircle, Scale, Ban } from 'lucide-react'

export default function Terms() {
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
                    <span className="text-white">Terms of Service</span>
                </nav>

                {/* Header */}
                <div className="border-b border-white/10 pb-8 mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Terms of Service</h1>
                    <p className="text-gray-400">
                        Last updated: <span className="text-amber-500">{new Date().toLocaleDateString()}</span>
                    </p>
                </div>

                {/* Content */}
                <div className="space-y-12">
                    {/* Introduction */}
                    <div className="prose prose-invert max-w-none">
                        <p className="text-lg text-gray-300 leading-relaxed">
                            Welcome to Grihapravesha. By accessing or using our website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                        </p>
                    </div>

                    {/* Section 1 */}
                    <section className="bg-white/5 rounded-2xl p-6 border border-white/10">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-lg bg-blue-500/10 text-blue-500">
                                <FileCheck className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-white mb-3">1. Use License</h2>
                                <p className="text-gray-400 leading-relaxed mb-4">
                                    Permission is granted to temporarily download one copy of the materials (information or software) on Grihapravesha's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                                </p>
                                <ul className="list-disc pl-5 space-y-2 text-gray-400">
                                    <li>Modify or copy the materials;</li>
                                    <li>Use the materials for any commercial purpose, or for any public display;</li>
                                    <li>Attempt to decompile or reverse engineer any software contained on Grihapravesha's website;</li>
                                    <li>Remove any copyright or other proprietary notations from the materials.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section className="bg-white/5 rounded-2xl p-6 border border-white/10">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-lg bg-amber-500/10 text-amber-500">
                                <Users className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-white mb-3">2. User Account</h2>
                                <p className="text-gray-400 leading-relaxed">
                                    To access certain features of the platform, you may be required to create an account. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section className="bg-white/5 rounded-2xl p-6 border border-white/10">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-lg bg-purple-500/10 text-purple-500">
                                <AlertCircle className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-white mb-3">3. Property Listings</h2>
                                <p className="text-gray-400 leading-relaxed">
                                    Users are responsible for the accuracy of the property details they list. Grihapravesha verifies listings to the best of its ability but does not guarantee the availability, condition, or accuracy of any property listing. The platform acts as a connector between buyers/tenants and sellers/landlords.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 4 */}
                    <section className="bg-white/5 rounded-2xl p-6 border border-white/10">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-lg bg-red-500/10 text-red-500">
                                <Ban className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-white mb-3">4. Termination</h2>
                                <p className="text-gray-400 leading-relaxed">
                                    We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 5 */}
                    <section className="bg-white/5 rounded-2xl p-6 border border-white/10">
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-lg bg-green-500/10 text-green-500">
                                <Scale className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-white mb-3">5. Governing Law</h2>
                                <p className="text-gray-400 leading-relaxed">
                                    These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
