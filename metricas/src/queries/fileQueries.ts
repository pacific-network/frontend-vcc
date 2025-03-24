import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queriesConfig } from "./config";
import { QueryKeys } from "./queryKeys";
import fileService from "@/services/file.service";


// export const useQueryGetCampaigns = (page: number, take: number) => {
//     return useQuery({
//         queryKey: [QueryKeys.GET_ALL_FILES, page, take],
//         queryFn: async () => {
//             const res = await campaignService.getCampaign(page, take);
//             if (res.status === 200) {
//                 return res.data;
//             }
//             throw new Error('Error al obtener campañas');
//         },
//         ...queriesConfig
//     });
// }

export const useMutationUploadFile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: { studyId: number; client: string; file: File }) => {
            const formData = new FormData();
            formData.append('file', data.file);
            formData.append('studyId', data.studyId.toString()); // Aquí aseguramos que `studyId` se pase como string
            formData.append('client', data.client);
            const res = await fileService.uploadFile(formData);
            if (res.status === 201) {
                return res.data;
            }
            throw new Error('Error al cargar archivo');
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_STUDY_BY_ID] });
        },
        ...queriesConfig
    });
};