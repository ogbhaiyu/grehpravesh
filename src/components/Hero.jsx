import SearchBox from './SearchBox'
import { ArrowDown } from 'lucide-react'

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
                    alt="Modern luxury home"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#050505]" />
            </div>

            {/* Decorative grid overlay */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '60px 60px',
            }} />

            {/* Content */}
            <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pt-28 pb-20">
                <div className="text-center mb-10 animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-text mb-6 backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        Trusted by 10,000+ Home Seekers
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-4">
                        <span className="gradient-text">Find Your</span>
                        <br />
                        <span className="text-white">Dream </span>
                        <span className="gradient-text-accent">Home</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-text max-w-xl mx-auto leading-relaxed">
                        Discover premium properties across Bhopal with expert guidance
                        and verified listings.
                    </p>
                </div>

                <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <SearchBox />
                </div>

                {/* Stats ribbon */}
                <div className="mt-16 flex flex-wrap justify-center gap-8 sm:gap-16 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                    {[
                        { value: '5,000+', label: 'Properties' },
                        { value: '50+', label: 'Areas' },
                        { value: '100%', label: 'Transparent' },
                        { value: '10K+', label: 'Happy Families' },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                            <div className="text-xs text-gray-muted uppercase tracking-wider mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
                <ArrowDown className="w-5 h-5 text-gray-muted" />
            </div>
        </section>
    )
}
