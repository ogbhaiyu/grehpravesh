import { useEffect } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

export default function Contact() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="min-h-screen bg-[#050505] pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Get in Touch</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Have questions about buying, selling, or renting? Our team is here to help you every step of the way.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
                            <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all duration-300">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold mb-1">Visit Us</h3>
                                        <p className="text-gray-400">MP Nagar, Bhopal, MP 462011</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all duration-300">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold mb-1">Call Us</h3>
                                        <p className="text-gray-400">+91 98765 43210</p>
                                        <p className="text-gray-500 text-sm">Mon-Sat from 9am to 6pm</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all duration-300">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold mb-1">Email Us</h3>
                                        <p className="text-gray-400">hello@grihapravesha.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="aspect-video w-full rounded-3xl overflow-hidden border border-white/10 bg-white/5 relative group">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <MapPin className="w-12 h-12 text-gray-600 group-hover:text-amber-500 transition-colors" />
                                <span className="sr-only">Map Placeholder</span>
                            </div>
                            <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-4 py-2 rounded-lg text-white text-sm">
                                View on Google Maps
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
                        <form className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="firstName" className="text-sm font-medium text-gray-300">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                                        placeholder="John"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="lastName" className="text-sm font-medium text-gray-300">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-gray-300">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-medium text-gray-300">Subject</label>
                                <select
                                    id="subject"
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                                >
                                    <option value="general">General Inquiry</option>
                                    <option value="buy">Buying a Property</option>
                                    <option value="sell">Selling a Property</option>
                                    <option value="rent">Renting a Property</option>
                                    <option value="support">Support</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors resize-none"
                                    placeholder="How can we help you?"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-amber-500 text-black font-bold py-4 rounded-xl hover:bg-amber-400 transition-colors flex items-center justify-center gap-2"
                            >
                                Send Message
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}
