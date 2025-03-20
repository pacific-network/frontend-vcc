import { useQuery } from "@tanstack/react-query";
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