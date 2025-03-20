import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import clientService from "@/services/client.service";
import { queriesConfig } from "./config";
import { QueryKeys } from "./queryKeys";


export const UseQueryGetClients = (page: number, take: number) => {
    return useQuery({
        queryKey: [QueryKeys.GET_ALL_CLIENTS, page, take],
        queryFn: async () => {
            const res = await clientService.getClientsWithPagination({ page: 1, take: 10 });
            if (res.status === 200) {
                return res.data;
            }
            throw new Error('Error al obtener CLientes');
        },
        ...queriesConfig

    })
}

export const useQueryGetClientCategories = () => {
    return useQuery({
        queryKey: [QueryKeys.GET_ALL_CATEGORIES],
        queryFn: async () => {
            const res = await clientService.getClientCategories();
            if (res.status === 200) {
                return res.data;
            }
            throw new Error("Error al obtener categorías de clientes");
        },
        ...queriesConfig,
    });
}

export const useMutateCreateClient = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newClient) => {
            const res = await clientService.createUser(newClient);
            if (res.status === 201) return res.data;
            throw new Error("Error al crear el cliente");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [QueryKeys.GET_ALL_CLIENTS]}); // Recarga la lista de clientes
        },
    });
};