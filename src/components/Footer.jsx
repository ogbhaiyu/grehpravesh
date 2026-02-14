import { Link } from 'react-router-dom'
import { Home, Mail, Phone, MapPin, ArrowUpRight, Instagram, Twitter, Linkedin } from 'lucide-react'

const quickLinks = [
    { name: 'Buy Property', path: '/buy' },
    { name: 'Rent Property', path: '/rent' },
    { name: 'About Us', path: '#' },
]

const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'About Us', path: '#' },
    { name: 'Contact', path: '#' },
]

const socials = [
    { icon: Instagram, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Linkedin, href: '#' },
]

export default function Footer() {
    return (
        <footer className="relative border-t border-dark-border bg-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="inline-block mb-4 group">
                            <img src="/logo.png" alt="Griha Pravesha" className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
                        </Link>
                        <p className="text-sm text-gray-text leading-relaxed mb-6">
                            Bhopal's most trusted real estate platform. Find your dream home with expert guidance and 100% verified listings.
                        </p>
                        <div className="flex gap-3">
                            {socials.map((s, i) => (
                                <a
                                    key={i}
                                    href={s.href}
                                    className="w-9 h-9 rounded-lg bg-white/5 border border-dark-border flex items-center justify-center text-gray-muted hover:text-white hover:bg-white/10 transition-all"
                                >
                                    <s.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Quick Links</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="group flex items-center gap-1 text-sm text-gray-text hover:text-white transition-colors"
                                    >
                                        {link.name}
                                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Legal</h4>
                        <ul className="space-y-3">
                            {legalLinks.map((link) => (
                                <li key={link.name}>
                                    {link.path.startsWith('/') ? (
                                        <Link
                                            to={link.path}
                                            className="group flex items-center gap-1 text-sm text-gray-text hover:text-white transition-colors"
                                        >
                                            {link.name}
                                            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Link>
                                    ) : (
                                        <a
                                            href={link.path}
                                            className="group flex items-center gap-1 text-sm text-gray-text hover:text-white transition-colors"
                                        >
                                            {link.name}
                                            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Contact</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2 text-sm text-gray-text">
                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                MP Nagar, Bhopal, MP 462011
                            </li>
                            <li className="flex items-center gap-2 text-sm text-gray-text">
                                <Phone className="w-4 h-4 flex-shrink-0" />
                                +91 98765 43210
                            </li>
                            <li className="flex items-center gap-2 text-sm text-gray-text">
                                <Mail className="w-4 h-4 flex-shrink-0" />
                                hello@grihapravesha.com
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-14 pt-8 border-t border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-gray-muted">
                        © {new Date().getFullYear()} Grihapravesha. All rights reserved.
                    </p>
                    <p className="text-xs text-gray-muted">
                        Made with ❤️ in India
                    </p>
                </div>
            </div>
        </footer>
    )
}
