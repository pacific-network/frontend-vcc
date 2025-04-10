export interface TotalBilling {
    month: string;
    total: number;
}

export interface BillingDetail {
    id: number;
    month: string;
    quantity: number;
    data:[];
    total: number;
}

