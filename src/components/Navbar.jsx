import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Building2, Key, Menu, X, ChevronRight, LogOut, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Buy', path: '/buy', icon: Building2 },
    { name: 'Rent', path: '/rent', icon: Key },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const location = useLocation()
    const { user, isAdmin, signOut, setShowLogin } = useAuth()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setMobileOpen(false)
    }, [location])

    const handleSignOut = async () => {
        try {
            await signOut()
        } catch (err) {
            console.error('Sign out error:', err)
        }
    }

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 shadow-2xl'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <img src="/logo.png" alt="Griha Pravesha" className="h-10 lg:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path
                            return (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${isActive
                                        ? 'text-white bg-white/10'
                                        : 'text-gray-text hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <link.icon className="w-4 h-4" />
                                    {link.name}
                                </Link>
                            )
                        })}
                    </div>

                    {/* Desktop Auth */}
                    <div className="hidden lg:flex items-center gap-3">
                        {user ? (
                            <>
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                                    <User className="w-4 h-4 text-gray-muted" />
                                    <span className="text-sm text-gray-text max-w-[160px] truncate">
                                        {user.email}
                                    </span>
                                    {isAdmin && (
                                        <span className="text-[10px] font-semibold uppercase tracking-wider text-secondary bg-secondary/10 px-1.5 py-0.5 rounded">
                                            Admin
                                        </span>
                                    )}
                                </div>
                                <button
                                    onClick={handleSignOut}
                                    className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-text hover:text-white transition-colors duration-300"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setShowLogin(true)}
                                className="group relative px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-white/10"
                            >
                                <span className="relative z-10 flex items-center gap-1">
                                    Login / Sign Up
                                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                                </span>
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                    >
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="bg-black/95 backdrop-blur-xl border-t border-white/5 px-4 py-4 space-y-1">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.path
                        return (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive
                                    ? 'text-white bg-white/10'
                                    : 'text-gray-text hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <link.icon className="w-5 h-5" />
                                {link.name}
                            </Link>
                        )
                    })}
                    <div className="pt-3 border-t border-white/5">
                        {user ? (
                            <>
                                <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-text">
                                    <User className="w-4 h-4" />
                                    <span className="truncate">{user.email}</span>
                                    {isAdmin && (
                                        <span className="text-[10px] font-semibold uppercase text-secondary bg-secondary/10 px-1.5 py-0.5 rounded">
                                            Admin
                                        </span>
                                    )}
                                </div>
                                <button
                                    onClick={handleSignOut}
                                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-text hover:text-white"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => { setShowLogin(true); setMobileOpen(false) }}
                                className="w-full mt-2 px-4 py-3 bg-white text-black text-sm font-semibold rounded-lg"
                            >
                                Login / Sign Up
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
