import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Building2, Users, Trophy, Target, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function About() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const stats = [
        { label: 'Properties Listed', value: '10,000+', icon: Building2 },
        { label: 'Happy Customers', value: '5,000+', icon: Users },
        { label: 'Awards Won', value: '15+', icon: Trophy },
        { label: 'Cities Covered', value: '12', icon: Target },
    ]

    const features = [
        'Verified Property Listings',
        'Expert Legal Assistance',
        'Zero Brokerage Options',
        'Instant Home Loans',
        'Virtual Property Tours',
        'Dedicated Relationship Managers'
    ]

    return (
        <div className="min-h-screen bg-[#050505]">
            {/* Hero Section */}
            <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-[#050505] to-[#050505]" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
                        Redefining Real Estate <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">
                            Experience in India
                        </span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-400 mb-10 leading-relaxed">
                        We are building India's most trusted real estate platform. Whether you're buying, selling, or renting, Grihapravesha makes the process simple, transparent, and hassle-free.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/buy"
                            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-black bg-white rounded-full hover:bg-gray-100 transition-all duration-300"
                        >
                            Browse Properties
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white border border-white/20 rounded-full hover:bg-white/5 transition-all duration-300"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="py-20 border-y border-white/5 bg-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center group">
                                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                                    <stat.icon className="w-6 h-6 text-amber-500" />
                                </div>
                                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                                <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <div className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-6">
                                Our Mission is to verify <br />
                                <span className="text-amber-500">Every Single Listing</span>
                            </h2>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                Founded in 2024, Grihapravesha appeared on the scene with a clear goal: to bring trust and transparency to the real estate market. We understand that finding a home is more than just a transaction; it's a life-changing decision.
                            </p>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                That's why we verify every property, vet every agent, and ensure that what you see online is exactly what you get in person. No fake listings, no hidden charges, just pure real estate.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-4">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-2 text-gray-300">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl opacity-20 blur-2xl" />
                            <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video lg:aspect-square bg-slate-900 flex items-center justify-center">
                                {/* Placeholder for an office image or team image */}
                                <div className="text-center p-8">
                                    <Building2 className="w-16 h-16 text-white/20 mx-auto mb-4" />
                                    <p className="text-gray-500">Office / Team Image Here</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Join Us CTA */}
            <div className="pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative rounded-3xl overflow-hidden px-6 py-16 sm:px-12 sm:py-20 text-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 to-black border border-white/10" />
                        <div className="relative z-10">
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to find your dream home?</h2>
                            <p className="max-w-2xl mx-auto text-lg text-gray-300 mb-8">
                                Join thousands of happy families who found their perfect home through Grihapravesha.
                            </p>
                            <Link
                                to="/buy"
                                className="inline-block px-8 py-4 text-base font-bold text-black bg-amber-500 rounded-full hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
                            >
                                Get Started Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
