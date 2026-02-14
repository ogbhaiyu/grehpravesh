import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import PropertyCard from './PropertyCard'
import { ArrowRight } from 'lucide-react'

import { demoProperties } from '../data/mockData'

export default function FeaturedProperties() {
    const [properties, setProperties] = useState(demoProperties)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchProperties() {
            try {
                const { data, error } = await supabase
                    .from('properties')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(6)

                if (!error && data && data.length > 0) {
                    setProperties(data)
                }
            } catch (e) {
                // Use demo data if Supabase isn't configured
            } finally {
                setLoading(false)
            }
        }

        fetchProperties()
    }, [])

    return (
        <section className="relative py-24 px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="max-w-7xl mx-auto mb-14">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div>
                        <p className="text-xs font-medium text-secondary uppercase tracking-widest mb-2">
                            Curated Selection
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white">
                            Featured Properties
                        </h2>
                    </div>
                    <a
                        href="#"
                        className="group flex items-center gap-2 text-sm text-gray-text hover:text-white transition-colors"
                    >
                        View all listings
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property, i) => (
                    <div
                        key={property.id}
                        className="animate-slide-up"
                        style={{ animationDelay: `${i * 0.1}s` }}
                    >
                        <PropertyCard property={property} />
                    </div>
                ))}
            </div>
        </section>
    )
}
