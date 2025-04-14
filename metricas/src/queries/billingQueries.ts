import { useQuery } from '@tanstack/react-query';
import billingService from '../services/billing.service';
import { queriesConfig } from './config';
import { QueryKeys } from './queryKeys';



export const UseQueryGetBillingCurrentMonth = () => {
    return useQuery({
        queryKey: [QueryKeys.GET_BILLING_CURRENT_MONTH], // Agregar page y take a la cache
        queryFn: async () => {
            const res = await billingService.getBillingCurrentMonth();
            if (res.status === 200) {
                return res.data;
            }
            throw new Error('Error al obtener la facturación del mes actual');
        }
        , ...queriesConfig
    });
}

export const UseQueryGetBillingPreviousMonth = () => {
    return useQuery({
        queryKey: [QueryKeys.GET_BILLING_PREVIOUS_MONTH], // Agregar page y take a la cache
        queryFn: async () => {
            const res = await billingService.getBillingPreviousMonth();
            if (res.status === 200) {
                return res.data;
            }
            throw new Error('Error al obtener la facturación del mes actual');
        }
        , ...queriesConfig
    });
}

export const useQueryDetailBillingById = (studyId: number) => {
    return useQuery({
        queryKey: [QueryKeys.GET_DETAIL_BILLING_BY_ID, studyId],
        queryFn: async () => {
            const res = await billingService.detailBillingById(studyId);
            if (res.status === 200) {
                return res.data;
            }
            throw new Error('Error al obtener el detalle de facturación');
        },
        ...queriesConfig
    });
};

export const useQueryRemainingBilling = (studyId: number) => {
    return useQuery({
        queryKey: [QueryKeys.GET_REMAINING_BILLING, studyId],
        queryFn: async () => {
            const res = await billingService.remaining_billing(studyId);
            if (res.status === 200) {
                return res.data;
            }
            throw new Error('Error al obtener el detalle de facturación');
        },
        ...queriesConfig
    });
};