import { jwtDecode } from 'jwt-decode';
import { useCallback, useMemo, useState } from 'react';
import * as React from 'react';
import type { UserPayload } from '../api/types/user.ts';
import AuthContext from "../context/authContext.ts";

const decode = (jwtToken: string): UserPayload | null => {
    try {
        return jwtDecode<UserPayload>(jwtToken);
    } catch (err) {
        console.log(err);
        return null;
    }
};

const initializeUser = (): UserPayload | null => {
    const jwtToken = localStorage.getItem('token');
    return jwtToken ? decode(jwtToken) : null;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserPayload | null>(initializeUser);

    const login = useCallback((jwtToken: string) => {
        const payload = decode(jwtToken);
        if (payload) {
            localStorage.setItem('token', jwtToken);
            setUser(payload);
        }
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setUser(null);
    }, []);

    const value = useMemo(() => ({
        user,
        isLoggedIn: !!user,
        login,
        logout
    }), [user, login, logout]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;