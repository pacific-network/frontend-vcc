import { useMutation, useQuery } from '@tanstack/react-query';
import authService from '../services/auth.service';
import { queriesConfig } from './config';
import { QueryKeys } from './queryKeys';

interface LoginResponse {
    access_token: string;
    role: number;
    // Add any other properties that the login response might have
}

interface LoginVariables {
    username: string;
    password: string;
}
export const useMutationLogin = () => {
    return useMutation<LoginResponse, Error, LoginVariables>({
        mutationFn: async ({ username, password }) => {
            const res = await authService.login(username, password);
            if (res.status === 200) {
                return res.data;
            } else if (res.status === 401) {
                throw new Error("Nombre de usuario o contraseña incorrecta");
            } else {
                throw new Error("Error desconocido al iniciar sesión");
            }
        },
        ...queriesConfig,
    });
};




export const useQueryProfile = () => {
    return useQuery({
        queryKey: [QueryKeys.PROFILE],
        queryFn: async () => {
            const res = await authService.me();
            if (res.status === 200) {
                return res.data;
            }
            throw new Error('No token data');
        },
        ...queriesConfig
    })
} 