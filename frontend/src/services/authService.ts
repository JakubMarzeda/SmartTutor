import { supabase } from '../lib/supabase/client';

export const authService = {
    async signUp(fullName: string, email: string, password: string) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
            }
        })
        return { data, error }
    },

    async authenticateWithGoogle() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/dashboard`,
            },
        })
        return { data, error }
    }
}