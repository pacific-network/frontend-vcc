import { PaginationMetaData } from "./Pagination";

export interface GetExecutiveWithPagination {
    data: IExecutive[];
    meta: PaginationMetaData;
}

export interface CreateExecutive {
    rut: string;
    name: string;
    lastname: string;
    salary: number;
    contract_type: string;
    hiring_date: Date;
}

export interface IExecutive {
    id: number;
    rut: string;
    name: string;
    lastname: string;
    salary: number;
    contract_type: string;
    number_of_hours: number;
    hiring_date: Date;
    is_current: boolean;
    date_fired?: Date;
}