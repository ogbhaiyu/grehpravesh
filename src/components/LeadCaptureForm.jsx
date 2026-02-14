import { useState } from 'react'
import { MessageCircle, Send, User, Phone, IndianRupee } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function LeadCaptureForm() {
    const [form, setForm] = useState({ name: '', phone: '', budget: '' })
    const [status, setStatus] = useState(null) // 'success' | 'error' | null
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!form.name || !form.phone) return

        setLoading(true)
        try {
            const { error } = await supabase.from('leads').insert([form])
            if (error) throw error
            setStatus('success')
            setForm({ name: '', phone: '', budget: '' })
            setTimeout(() => setStatus(null), 4000)
        } catch {
            setStatus('error')
            setTimeout(() => setStatus(null), 4000)
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="relative py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="relative rounded-3xl overflow-hidden">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-dark-card via-dark-card to-primary/10" />
                    <div className="absolute inset-0 border border-dark-border rounded-3xl" />

                    <div className="relative p-8 sm:p-12 lg:p-16">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-10">
                            {/* Left Content */}
                            <div className="lg:w-1/2">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-xs font-medium text-green-400 mb-4">
                                    <MessageCircle className="w-3 h-3" />
                                    WhatsApp Alerts
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                                    Get Daily Property
                                    <br />
                                    <span className="gradient-text-accent">Alerts on WhatsApp</span>
                                </h3>
                                <p className="text-sm text-gray-text leading-relaxed">
                                    Never miss a perfect deal. We'll send you curated property recommendations straight to your WhatsApp every day.
                                </p>
                            </div>

                            {/* Form */}
                            <div className="lg:w-1/2">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-muted" />
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-muted focus:outline-none focus:border-white/20 focus:bg-white/8 transition-all"
                                            required
                                        />
                                    </div>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-muted" />
                                        <input
                                            type="tel"
                                            placeholder="Phone Number"
                                            value={form.phone}
                                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-muted focus:outline-none focus:border-white/20 focus:bg-white/8 transition-all"
                                            required
                                        />
                                    </div>
                                    <div className="relative">
                                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-muted" />
                                        <input
                                            type="text"
                                            placeholder="Budget (e.g., ₹50 Lac)"
                                            value={form.budget}
                                            onChange={(e) => setForm({ ...form, budget: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-muted focus:outline-none focus:border-white/20 focus:bg-white/8 transition-all"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4" />
                                                Subscribe Now
                                            </>
                                        )}
                                    </button>
                                </form>

                                {/* Status Messages */}
                                {status === 'success' && (
                                    <div className="mt-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-xs text-center animate-scale-in">
                                        ✓ You're subscribed! Check your WhatsApp.
                                    </div>
                                )}
                                {status === 'error' && (
                                    <div className="mt-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center animate-scale-in">
                                        Something went wrong. Please try again.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
