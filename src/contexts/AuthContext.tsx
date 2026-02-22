import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    User,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { auth } from '@/lib/firebase'; // We need to export 'auth' from firebase.ts first

interface AuthContextType {
    currentUser: User | null;
    loading: boolean;
    signup: (email: string, password: string, name: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    function signup(email: string, password: string, name: string) {
        if (!email.endsWith('@uni.edu.pk')) {
            return Promise.reject(new Error('Only @uni.edu.pk emails are allowed.'));
        }
        return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            return updateProfile(userCredential.user, { displayName: name });
        });
    }

    function login(email: string, password: string) {
        return signInWithEmailAndPassword(auth, email, password).then(() => { });
    }

    function logout() {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        loading,
        signup,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
