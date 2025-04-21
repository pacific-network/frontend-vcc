// src/context/authProvider.tsx
import React, { useState, useEffect } from 'react';
import { AuthContext } from './authContext';


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true); // Para evitar redirección antes de cargar

    // Cargar estado desde localStorage
    useEffect(() => {
        const storedAuth = localStorage.getItem('isAuthenticated');
        if (storedAuth === 'true') {
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const login = () => {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true'); // Guardamos en localStorage
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated'); // Eliminamos de localStorage
    };

    if (loading) {
        return (
            <div className="flex items-center gap-2 text-blue-600 text-lg font-semibold">
                <div className="w-4 h-4 border-2 border-t-transparent border-blue-600 rounded-full animate-spin"></div>
                <span>Cargando...</span>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};