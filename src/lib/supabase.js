import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

console.log('Supabase Init:', {
    url: supabaseUrl,
    keyLength: supabaseAnonKey?.length,
    isMock: !supabaseUrl || !supabaseAnonKey
})

let supabase

if (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('your_supabase')) {
    supabase = createClient(supabaseUrl, supabaseAnonKey)
} else {
    // Mock client for development when Supabase is not configured
    const mockError = { message: 'Supabase not configured. Add your credentials to .env' }

    supabase = {
        from: () => ({
            select: () => ({
                order: () => ({
                    limit: () => Promise.resolve({ data: null, error: mockError }),
                }),
                eq: () => ({
                    single: () => Promise.resolve({ data: null, error: mockError }),
                }),
            }),
            insert: () => Promise.resolve({ data: null, error: mockError }),
            update: () => ({
                eq: () => Promise.resolve({ data: null, error: mockError }),
            }),
            delete: () => ({
                eq: () => Promise.resolve({ data: null, error: mockError }),
            }),
        }),
        storage: {
            from: () => ({
                upload: () => Promise.resolve({ data: null, error: mockError }),
                getPublicUrl: () => ({ data: { publicUrl: '' } }),
            }),
        },
        auth: {
            getSession: () => Promise.resolve({ data: { session: null } }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
            signInWithPassword: () => Promise.reject(new Error('Supabase not configured. Add your credentials to .env to enable login.')),
            signUp: () => Promise.reject(new Error('Supabase not configured. Add your credentials to .env to enable registration.')),
            signOut: () => Promise.resolve({ error: null }),
        },
    }
}

export { supabase }
