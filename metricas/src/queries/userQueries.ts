import { useQuery } from "@tanstack/react-query";
import userService from "../services/user.service";
import { queriesConfig } from "./config";
import { QueryKeys } from "./queryKeys";

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