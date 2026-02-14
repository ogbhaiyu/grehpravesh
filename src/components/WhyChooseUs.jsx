import { Shield, CheckCircle, Banknote, ArrowRight } from 'lucide-react'

const features = [
    {
        icon: Shield,
        title: 'Expert Guidance',
        description: 'Get dedicated relationship managers who guide you through every step — from shortlisting to registration, hassle-free.',
        gradient: 'from-blue-500/20 to-purple-500/20',
        hoverBorder: 'hover:border-blue-500/20',
        iconColor: 'text-blue-400',
    },
    {
        icon: CheckCircle,
        title: 'Verified Listings',
        description: 'Every property is physically verified by our team. No fake listings, no scams — guaranteed authenticity.',
        gradient: 'from-green-500/20 to-emerald-500/20',
        hoverBorder: 'hover:border-green-500/20',
        iconColor: 'text-green-400',
    },
    {
        icon: Banknote,
        title: 'Instant Home Loans',
        description: 'Get pre-approved home loans with competitive rates from top banks. Quick processing, zero paperwork hassle.',
        gradient: 'from-secondary/20 to-orange-500/20',
        hoverBorder: 'hover:border-secondary/20',
        iconColor: 'text-secondary',
    },
]

export default function WhyChooseUs() {
    return (
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-xs font-medium text-secondary uppercase tracking-widest mb-2">
                        Why Grihapravesha
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Built for Trust
                    </h2>
                    <p className="text-gray-text max-w-lg mx-auto text-sm leading-relaxed">
                        We are redefining the real estate experience in India with transparency, technology, and trust.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <div
                            key={feature.title}
                            className={`group relative p-8 rounded-2xl bg-dark-card border border-dark-border ${feature.hoverBorder} transition-all duration-500 hover:-translate-y-1`}
                        >
                            {/* Gradient bg on hover */}
                            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative z-10">
                                <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 ${feature.iconColor}`}>
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
                                <p className="text-sm text-gray-text leading-relaxed">{feature.description}</p>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
