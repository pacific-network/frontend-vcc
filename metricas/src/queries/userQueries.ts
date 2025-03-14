import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import userService from "../services/user.service";
import { queriesConfig } from "./config";
import { QueryKeys } from "./queryKeys";
import { IUser } from "@/models/User";

export const UseQueryGetUsers = (page: number, take: number) => {
    return useQuery({
        queryKey: [QueryKeys.GET_ALL_USERS, page, take], // Agregar page y take a la cache
        queryFn: async () => {
            const res = await userService.getUsers(page, take);
            if (res.status === 200) {
                return res.data;
            }
            throw new Error('Error al obtener los usuarios');
        },
        ...queriesConfig
    });
};


export const useMutationCreateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (user: IUser) => {
            const res = await userService.createUser(user);
            if (res.status === 201) {
                return res.data;
            }
            throw new Error('Error al crear el usuario');
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_ALL_USERS] });
        },
        ...queriesConfig
    });
};

export const useMutationDeleteUserById = () => {
    const queryClient = useQueryClient();
    return (
        useMutation({
            mutationFn: async (id: number) => {
                const res = await userService.deleteUserById(id);
                if (res.status === 200) {
                    return res.data;
                }
                throw new Error('Error al eliminar el usuario');
            },
            onSuccess: async () => {
                queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_ALL_USERS] });
            },
            ...queriesConfig

        })
    )
}