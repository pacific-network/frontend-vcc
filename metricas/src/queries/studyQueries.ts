import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import studyService from "@/services/study.service";
import { queriesConfig } from "./config";
import { QueryKeys } from "./queryKeys";
import { CreateStudyDto } from "@/models/Study";


export const useMutationCreateStudy = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (crerateStudyPayload: CreateStudyDto) => {
            const res = await studyService.createStudy(crerateStudyPayload);
            if (res.status === 201) {
                return res.data;
            }
            throw new Error("Error al crear nuevo estudio")
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_ALL_STUDIES] });
        },
        ...queriesConfig
    })
}


export const UseQueryGetStudies = (page: number, take: number) => {
    return useQuery({
        queryKey: [QueryKeys.GET_ALL_STUDIES, page, take], // Agregar page y take a la cache
        queryFn: async () => {
            const res = await studyService.getStudies(page, take);
            if (res.status === 200) {
                return res.data;
            }
            throw new Error('Error al obtener los estudios');
        },
        ...queriesConfig
    });
};

export const useQueryGetStudiesById = (studyId: number) => {  // Asegúrate de pasar el studyId como parámetro
    return useQuery({
        queryKey: [QueryKeys.GET_STUDY_BY_ID, studyId], // Incluye studyId para que se actualice al cambiar
        queryFn: async () => {
            const res = await studyService.getStudyById(studyId); // Asegúrate de pasar el ID aquí
            if (res.status === 200) {
                return res.data;
            }
            throw new Error('Error al obtener el estudio seleccionado');
        },
        ...queriesConfig,
    });
}