import { useState } from 'react'
import { X, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function LoginModal() {
    const { showLogin, setShowLogin, signIn, signUp } = useAuth()
    const [mode, setMode] = useState('signin') // 'signin' | 'signup'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    if (!showLogin) return null

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        if (!email || !password) {
            setError('Please fill in all fields')
            return
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters')
            return
        }

        setLoading(true)
        try {
            if (mode === 'signin') {
                await signIn(email, password)
                setShowLogin(false)
                resetForm()
            } else {
                await signUp(email, password)
                setSuccess('Account created! Check your email for verification.')
                setMode('signin')
            }
        } catch (err) {
            setError(err.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    const resetForm = () => {
        setEmail('')
        setPassword('')
        setError('')
        setSuccess('')
    }

    const handleClose = () => {
        setShowLogin(false)
        resetForm()
        setMode('signin')
    }

    return (
        <div
            onClick={handleClose}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 100000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.7)',
                backdropFilter: 'blur(8px)',
                padding: '16px',
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: '100%',
                    maxWidth: '420px',
                    background: '#111',
                    border: '1px solid #2a2a2a',
                    borderRadius: '16px',
                    padding: '32px',
                    position: 'relative',
                }}
            >
                {/* Close button */}
                <button
                    onClick={handleClose}
                    style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        background: 'transparent',
                        border: 'none',
                        color: '#666',
                        cursor: 'pointer',
                        padding: '4px',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
                >
                    <X style={{ width: '20px', height: '20px' }} />
                </button>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
                        {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p style={{ fontSize: '14px', color: '#888' }}>
                        {mode === 'signin'
                            ? 'Sign in to access your account'
                            : 'Sign up to get started'
                        }
                    </p>
                </div>

                {/* Error / Success messages */}
                {error && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px',
                        background: 'rgba(255,59,48,0.1)',
                        border: '1px solid rgba(255,59,48,0.2)',
                        borderRadius: '8px',
                        marginBottom: '16px',
                        fontSize: '13px',
                        color: '#ff6b6b',
                    }}>
                        <AlertCircle style={{ width: '16px', height: '16px', flexShrink: 0 }} />
                        {error}
                    </div>
                )}

                {success && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px',
                        background: 'rgba(52,199,89,0.1)',
                        border: '1px solid rgba(52,199,89,0.2)',
                        borderRadius: '8px',
                        marginBottom: '16px',
                        fontSize: '13px',
                        color: '#34c759',
                    }}>
                        <CheckCircle style={{ width: '16px', height: '16px', flexShrink: 0 }} />
                        {success}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontSize: '12px', color: '#888', marginBottom: '6px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Email
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Mail style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#555' }} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                style={{
                                    width: '100%',
                                    padding: '12px 12px 12px 40px',
                                    background: '#1a1a1a',
                                    border: '1px solid #333',
                                    borderRadius: '8px',
                                    color: '#fff',
                                    fontSize: '14px',
                                    outline: 'none',
                                    fontFamily: 'inherit',
                                    boxSizing: 'border-box',
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#555'}
                                onBlur={(e) => e.target.style.borderColor = '#333'}
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', fontSize: '12px', color: '#888', marginBottom: '6px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Password
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Lock style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#555' }} />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                style={{
                                    width: '100%',
                                    padding: '12px 44px 12px 40px',
                                    background: '#1a1a1a',
                                    border: '1px solid #333',
                                    borderRadius: '8px',
                                    color: '#fff',
                                    fontSize: '14px',
                                    outline: 'none',
                                    fontFamily: 'inherit',
                                    boxSizing: 'border-box',
                                }}
                                onFocus={(e) => e.target.style.borderColor = '#555'}
                                onBlur={(e) => e.target.style.borderColor = '#333'}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '12px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#555',
                                    cursor: 'pointer',
                                    padding: '2px',
                                }}
                            >
                                {showPassword
                                    ? <EyeOff style={{ width: '16px', height: '16px' }} />
                                    : <Eye style={{ width: '16px', height: '16px' }} />
                                }
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '14px',
                            background: loading ? '#333' : '#fff',
                            color: loading ? '#999' : '#000',
                            border: 'none',
                            borderRadius: '10px',
                            fontSize: '14px',
                            fontWeight: 600,
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontFamily: 'inherit',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            transition: 'all 0.2s',
                        }}
                    >
                        {loading && <Loader2 style={{ width: '16px', height: '16px', animation: 'spin 1s linear infinite' }} />}
                        {mode === 'signin' ? 'Sign In' : 'Create Account'}
                    </button>
                </form>

                {/* Toggle mode */}
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <span style={{ fontSize: '13px', color: '#666' }}>
                        {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
                    </span>
                    <button
                        onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(''); setSuccess('') }}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#ff6600',
                            fontSize: '13px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                        }}
                    >
                        {mode === 'signin' ? 'Sign Up' : 'Sign In'}
                    </button>
                </div>
            </div>
        </div>
    )
}
