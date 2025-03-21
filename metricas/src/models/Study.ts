import { PaginationMetaData } from "./Pagination";

export interface CreateStudyDto {
    name: string;
    client: string;
    start_date: Date;
    end_date: Date;
    quantity: number;
    observation: string;
    progress_stage: string;
}

export interface IStudy {
    id: number;
    name: string;
    client: string;
    start_date: Date;
    end_date: Date;
    quantity: number;
    observation: string;
    progress_stage: string;
}


export interface GetStudyWithPagination {
    categories: [];
    data: IStudy[];
    meta: PaginationMetaData
}