import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { demoProperties } from '../data/mockData'
import PropertyCard from '../components/PropertyCard'
import { Loader2 } from 'lucide-react'

export default function PropertiesPage({ type }) {
    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(true)

    const isSell = type === 'sell'
    const title = isSell ? 'Properties for Sale' : 'Properties for Rent'
    const desc = isSell
        ? 'Find your dream home from our exclusive collection of properties for sale.'
        : 'Discover premium rental properties that match your lifestyle.'

    useEffect(() => {
        async function fetchProperties() {
            setLoading(true)
            try {
                const { data, error } = await supabase
                    .from('properties')
                    .select('*')
                    .eq('type', type)
                    .order('created_at', { ascending: false })

                if (!error && data && data.length > 0) {
                    setProperties(data)
                } else {
                    // Fallback to mock data if no data from Supabase or error
                    const filteredMock = demoProperties.filter(p => p.type === type)
                    setProperties(filteredMock)
                }
            } catch (e) {
                // Fallback to mock data on exception
                const filteredMock = demoProperties.filter(p => p.type === type)
                setProperties(filteredMock)
            } finally {
                setLoading(false)
            }
        }

        fetchProperties()
    }, [type])

    return (
        <div className="min-h-screen pt-28 px-4 sm:px-6 lg:px-8 pb-20">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-3xl font-bold text-white mb-4">{title}</h1>
                    <p className="text-gray-text max-w-2xl">{desc}</p>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 text-white animate-spin" />
                    </div>
                ) : (
                    <>
                        {properties.length === 0 ? (
                            <div className="text-center py-20 text-gray-muted">
                                No properties found at the moment. Please check back later.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
