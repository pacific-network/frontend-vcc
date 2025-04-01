import { PaginationMetaData } from "./Pagination";

export interface CreateStudyDto {
    name: string;
    client: string;
    start_date: Date;
    end_date: Date;
    quantity: number;
    observation: [];
    progress_stage: [];
    price: string;
}

export interface IStudy {
    id: number;
    name: string;
    client: string;
    start_date: Date;
    end_date: Date;
    quantity: number;
    observaciones: [];
    progress_stage: [];
    files: [];
    completed_at: Date;
}


export interface GetStudyWithPagination {
    categories: [];
    data: IStudy[];
    meta: PaginationMetaData
}

export interface updateStudy {
    id: number;  // Añadir el id del estudio
    observaciones: [];
    progress_stage_id: number;
}

export interface ProgressStage {
    id: number;
    name: string;
}