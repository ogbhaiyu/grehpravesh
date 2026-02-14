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
        // Get initial session
        supabase.auth?.getSession?.().then?.(({ data: { session } }) => {
            const currentUser = session?.user || null
            setUser(currentUser)
            if (currentUser) {
                checkAdmin(currentUser.email)
            }
            setLoading(false)
        }).catch?.(() => {
            setLoading(false)
        })

        // If supabase.auth doesn't exist (mock mode), just stop loading
        if (!supabase.auth?.onAuthStateChange) {
            setLoading(false)
            return
        }

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                const currentUser = session?.user || null
                setUser(currentUser)
                if (currentUser) {
                    await checkAdmin(currentUser.email)
                } else {
                    setIsAdmin(false)
                    setIsSuperAdmin(false)
                }
            }
        )

        return () => subscription?.unsubscribe?.()
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
