import { Link } from 'react-router-dom'
import { Bed, Bath, Maximize2, ArrowUpRight, BadgeCheck, Sparkles } from 'lucide-react'

function formatPrice(price, type) {
    if (type === 'rent') {
        return `₹${Number(price).toLocaleString('en-IN')}/mo`
    }
    if (price >= 10000000) {
        return `₹${(price / 10000000).toFixed(1)} Cr`
    }
    if (price >= 100000) {
        return `₹${(price / 100000).toFixed(0)} Lac`
    }
    return `₹${Number(price).toLocaleString('en-IN')}`
}

const badgeConfig = {
    Verified: { icon: BadgeCheck, color: 'text-green-400 bg-green-400/10 border-green-400/20' },
    'New Launch': { icon: Sparkles, color: 'text-secondary bg-secondary/10 border-secondary/20' },
    Premium: { icon: Sparkles, color: 'text-purple-400 bg-purple-400/10 border-purple-400/20' },
}

export default function PropertyCard({ property }) {
    const badge = badgeConfig[property.badge] || badgeConfig['Verified']
    const BadgeIcon = badge.icon

    return (
        <Link
            to={`/property/${property.id}`}
            className="group block rounded-2xl overflow-hidden bg-dark-card border border-dark-border hover:border-white/15 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50"
        >
            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={property.image_url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80'}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-700 will-change-transform group-hover:scale-105"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent" />

                {/* Badge */}
                {property.badge && (
                    <div className={`absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${badge.color}`}>
                        <BadgeIcon className="w-3 h-3" />
                        {property.badge}
                    </div>
                )}

                {/* Type tag */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium bg-black/60 backdrop-blur-sm text-white border border-white/10">
                    {property.type === 'rent' ? 'For Rent' : 'For Sale'}
                </div>

                {/* Price */}
                <div className="absolute bottom-3 left-3">
                    <div className="text-xl font-bold text-white">
                        {formatPrice(property.price, property.type)}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
                <h3 className="text-sm font-semibold text-white leading-snug group-hover:text-secondary transition-colors line-clamp-1">
                    {property.title}
                </h3>
                <p className="text-xs text-gray-muted flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-secondary" />
                    {property.location}
                </p>

                {/* Specs */}
                <div className="flex items-center gap-4 text-xs text-gray-text pt-1">
                    {property.bedrooms && (
                        <span className="flex items-center gap-1">
                            <Bed className="w-3.5 h-3.5" />
                            {property.bedrooms} Beds
                        </span>
                    )}
                    {property.bathrooms && (
                        <span className="flex items-center gap-1">
                            <Bath className="w-3.5 h-3.5" />
                            {property.bathrooms} Baths
                        </span>
                    )}
                    {property.area_sqft && (
                        <span className="flex items-center gap-1">
                            <Maximize2 className="w-3.5 h-3.5" />
                            {property.area_sqft} sqft
                        </span>
                    )}
                </div>

                {/* CTA */}
                <div className="pt-2 border-t border-dark-border flex items-center justify-between">
                    <span className="text-xs text-gray-muted">View Details</span>
                    <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                        <ArrowUpRight className="w-4 h-4" />
                    </span>
                </div>
            </div>
        </Link>
    )
}
