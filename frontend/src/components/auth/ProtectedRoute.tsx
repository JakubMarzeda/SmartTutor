import type { ReactNode } from 'react';
import { authService } from '../../services/authService';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase/client';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({children}: {children: ReactNode}) {
    const [loading, setLoading] = useState<boolean>(true);
    const [session, setSession] = useState<unknown>(null);

    useEffect(() => {
        const checkSession = async () => {
            const data = await authService.getSession();
            setSession(data);
            setLoading(false);
        }

        checkSession();

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        })

        return () => {
            listener.subscription.unsubscribe();
        }
    }, []);

    if (loading) return <div>Loading...</div>;
    if (!session) return <Navigate to="/login" replace/>;

    return children;
}

