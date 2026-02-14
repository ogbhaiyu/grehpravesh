import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import {
    ArrowLeft, Bed, Bath, Maximize2, MapPin, Phone, MessageCircle,
    BadgeCheck, Sparkles, Home, Calendar, Shield, Wifi, Car, Trees,
    Dumbbell, ShieldCheck, Droplets, Zap, Wind
} from 'lucide-react'

import { demoProperties } from '../data/mockData'

const amenities = [
    { icon: Car, label: 'Parking' },
    { icon: Shield, label: '24/7 Security' },
    { icon: Dumbbell, label: 'Gym' },
    { icon: Droplets, label: 'Swimming Pool' },
    { icon: Trees, label: 'Garden' },
    { icon: Wifi, label: 'High-Speed WiFi' },
    { icon: Zap, label: 'Power Backup' },
    { icon: Wind, label: 'Air Conditioning' },
]

function formatPrice(price, type) {
    if (type === 'rent') return `₹${Number(price).toLocaleString('en-IN')}/month`
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)} Cr`
    if (price >= 100000) return `₹${(price / 100000).toFixed(0)} Lac`
    return `₹${Number(price).toLocaleString('en-IN')}`
}

export default function PropertyDetail() {
    const { id } = useParams()
    const [property, setProperty] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchProperty() {
            try {
                const { data, error } = await supabase
                    .from('properties')
                    .select('*')
                    .eq('id', id)
                    .single()

                if (!error && data) {
                    setProperty(data)
                } else {
                    // Fallback to demo
                    const demo = demoProperties.find(p => p.id === id)
                    setProperty(demo || null)
                }
            } catch {
                const demo = demoProperties.find(p => p.id === id)
                setProperty(demo || null)
            } finally {
                setLoading(false)
            }
        }

        fetchProperty()
    }, [id])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-white/10 border-t-white rounded-full animate-spin" />
            </div>
        )
    }

    if (!property) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <h2 className="text-2xl font-bold text-white">Property Not Found</h2>
                <Link to="/" className="text-sm text-secondary hover:underline">
                    ← Back to Home
                </Link>
            </div>
        )
    }

    const whatsappMsg = encodeURIComponent(`I am interested in ${property.title}`)
    const whatsappUrl = `https://wa.me/${property.owner_contact || '919876543210'}?text=${whatsappMsg}`

    return (
        <div className="min-h-screen pt-24">
            {/* Back button */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm text-gray-text hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Listings
                </Link>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Image */}
                        <div className="relative rounded-2xl overflow-hidden aspect-[16/10]">
                            <img
                                src={property.image_url}
                                alt={property.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                            {property.badge && (
                                <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-black/60 backdrop-blur-sm text-white border border-white/10">
                                    {property.badge === 'Verified' ? <BadgeCheck className="w-3 h-3 text-green-400" /> : <Sparkles className="w-3 h-3 text-secondary" />}
                                    {property.badge}
                                </div>
                            )}
                        </div>

                        {/* Title & Price */}
                        <div>
                            <div className="flex items-center gap-2 text-xs text-gray-muted mb-2">
                                <MapPin className="w-3 h-3" />
                                {property.location}
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                                {property.title}
                            </h1>
                            <div className="text-3xl font-bold text-secondary">
                                {formatPrice(property.price, property.type)}
                            </div>
                        </div>

                        {/* Specs */}
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { icon: Bed, value: property.bedrooms, label: 'Bedrooms' },
                                { icon: Bath, value: property.bathrooms, label: 'Bathrooms' },
                                { icon: Maximize2, value: `${property.area_sqft}`, label: 'Sq. Ft.' },
                            ].map((spec) => (
                                <div
                                    key={spec.label}
                                    className="flex flex-col items-center p-4 rounded-xl bg-dark-card border border-dark-border"
                                >
                                    <spec.icon className="w-5 h-5 text-gray-text mb-2" />
                                    <span className="text-lg font-bold text-white">{spec.value}</span>
                                    <span className="text-xs text-gray-muted">{spec.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Description */}
                        <div>
                            <h2 className="text-lg font-semibold text-white mb-3">About this property</h2>
                            <p className="text-sm text-gray-text leading-relaxed">
                                {property.description || 'A premium property with modern amenities and excellent connectivity. Contact the agent for more details.'}
                            </p>
                        </div>

                        {/* Amenities */}
                        <div>
                            <h2 className="text-lg font-semibold text-white mb-4">Amenities</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {amenities.map((amenity) => (
                                    <div
                                        key={amenity.label}
                                        className="flex items-center gap-3 p-3 rounded-xl bg-dark-card border border-dark-border"
                                    >
                                        <amenity.icon className="w-4 h-4 text-gray-text" />
                                        <span className="text-xs text-gray-text">{amenity.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            {/* Contact Card */}
                            <div className="rounded-2xl bg-dark-card border border-dark-border p-6 space-y-4">
                                <h3 className="text-sm font-semibold text-white">Interested?</h3>
                                <p className="text-xs text-gray-text">
                                    Contact the property agent directly via WhatsApp for instant response.
                                </p>
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-all duration-300"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Contact Agent
                                </a>
                                <a
                                    href={`tel:+${property.owner_contact || '919876543210'}`}
                                    className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-white/5 border border-dark-border text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
                                >
                                    <Phone className="w-5 h-5" />
                                    Call Now
                                </a>
                            </div>

                            {/* Details Card */}
                            <div className="rounded-2xl bg-dark-card border border-dark-border p-6 space-y-3">
                                <h3 className="text-sm font-semibold text-white mb-4">Property Details</h3>
                                {[
                                    { label: 'Type', value: property.type === 'rent' ? 'For Rent' : 'For Sale' },
                                    { label: 'Property', value: 'Apartment' },
                                    { label: 'Status', value: property.badge || 'Available' },
                                    { label: 'Facing', value: 'East' },
                                    { label: 'Floor', value: '7th of 12' },
                                    { label: 'Age', value: 'Under Construction' },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-center justify-between py-2 border-b border-dark-border last:border-0">
                                        <span className="text-xs text-gray-muted">{item.label}</span>
                                        <span className="text-xs font-medium text-white">{item.value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Safety tip */}
                            <div className="rounded-2xl bg-primary/5 border border-primary/10 p-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <ShieldCheck className="w-4 h-4 text-primary-light" />
                                    <h3 className="text-xs font-semibold text-white">Safety Tips</h3>
                                </div>
                                <ul className="text-xs text-gray-text space-y-1">
                                    <li>• Always visit the property in person</li>
                                    <li>• Verify documents before payment</li>
                                    <li>• Don't transfer money to unknown accounts</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
