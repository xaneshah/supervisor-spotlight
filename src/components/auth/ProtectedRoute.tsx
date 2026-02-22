import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export function ProtectedRoute({ children }: { children: JSX.Element }) {
    const auth = useAuth(); // returns AuthContextType | null

    if (!auth) {
        // Should not happen if wrapped in AuthProvider, but safe fallback
        return <Navigate to="/login" />;
    }

    if (!auth.currentUser) {
        return <Navigate to="/login" />;
    }

    return children;
}
