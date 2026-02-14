import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const [isSuperAdmin, setIsSuperAdmin] = useState(false)
    const [loading, setLoading] = useState(true)
    const [showLogin, setShowLogin] = useState(false)

    // Check if user is admin
    async function checkAdmin(email) {
        if (!email) {
            setIsAdmin(false)
            setIsSuperAdmin(false)
            return
        }

        try {
            const { data, error } = await supabase
                .from('admins')
                .select('*')
                .eq('email', email)
                .single()

            if (!error && data) {
                setIsAdmin(true)
                setIsSuperAdmin(data.is_super_admin || false)
            } else {
                setIsAdmin(false)
                setIsSuperAdmin(false)
            }
        } catch {
            setIsAdmin(false)
            setIsSuperAdmin(false)
        }
    }

    useEffect(() => {
        let mounted = true

        // Safety timeout to prevent infinite loading
        const timer = setTimeout(() => {
            if (mounted && loading) {
                console.log('AuthContext: Safety timeout triggered')
                setLoading(false)
            }
        }, 3000)

        async function initAuth() {
            if (!supabase.auth) {
                if (mounted) setLoading(false)
                return
            }

            try {
                // 1. Get initial session
                const { data: { session } } = await supabase.auth.getSession()
                if (mounted) {
                    const currentUser = session?.user || null
                    setUser(currentUser)
                    if (currentUser) {
                        await checkAdmin(currentUser.email)
                    } else {
                        setIsAdmin(false)
                        setIsSuperAdmin(false)
                    }
                }
            } catch (error) {
                console.error('AuthContext: Init error', error)
            } finally {
                if (mounted) setLoading(false)
            }

            // 2. Listen for changes
            const { data: { subscription } } = supabase.auth.onAuthStateChange(
                async (_event, session) => {
                    if (!mounted) return
                    const currentUser = session?.user || null
                    setUser(currentUser)

                    // Only check admin if user changed
                    if (currentUser) {
                        // Compare with the current user state from the provider
                        // This ensures we don't re-check admin status unnecessarily
                        // if the user object itself changes but the email is the same.
                        // However, for a full re-evaluation on any user change,
                        // you might remove the email comparison.
                        if (currentUser.email !== user?.email) {
                            await checkAdmin(currentUser.email)
                        }
                    } else {
                        setIsAdmin(false)
                        setIsSuperAdmin(false)
                    }
                    setLoading(false)
                }
            )

            return subscription
        }

        initAuth()

        return () => {
            mounted = false
            clearTimeout(timer)
        }
    }, [])

    async function signIn(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        if (error) throw error
        return data
    }

    async function signUp(email, password) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        })
        if (error) throw error
        return data
    }

    async function signOut() {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        setUser(null)
        setIsAdmin(false)
        setIsSuperAdmin(false)
    }

    const value = {
        user,
        isAdmin,
        isSuperAdmin,
        loading,
        signIn,
        signUp,
        signOut,
        showLogin,
        setShowLogin,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
