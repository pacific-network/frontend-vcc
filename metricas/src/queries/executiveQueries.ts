import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queriesConfig } from "./config";
import { QueryKeys } from "./queryKeys";
import executiveService from "@/services/executive.service";

export const useMutationCreateExecutive = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (createExecutivePayload: {
            rut: string;
            name: string;
            lastname: string;
            salary: number;
            contract_type: string;
            hiring_date: Date;
        }) => {
            const res = await executiveService.createExecutive(createExecutivePayload);
            if (res.status === 201) {
                return res.data;
            }
            throw new Error("Error al crear nuevo ejecutivo");
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_ALL_EXECUTIVES] });
        },
        ...queriesConfig
    });
}

export const useQueryGetExecutives = (page: number, take: number, searchQuery: string) => {
    return useQuery({
        queryKey: [QueryKeys.GET_ALL_EXECUTIVES, page, take, searchQuery],
        queryFn: async () => {
            const res = await executiveService.getExecutives(page, take, searchQuery);
            if (res.status === 200) {
                return res.data;
            }
            throw new Error('Error al obtener los ejecutivos');
        },
        ...queriesConfig
    });
};