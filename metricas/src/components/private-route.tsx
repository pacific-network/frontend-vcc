import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth'; // Asegúrate de importar el hook useAuth

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { isAuthenticated } = useAuth(); // Obtener el estado de autenticación desde el contexto

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};

export default PrivateRoute;