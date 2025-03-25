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
    files: [];
}


export interface GetStudyWithPagination {
    categories: [];
    data: IStudy[];
    meta: PaginationMetaData
}

export interface updateStudy {
    id: number;  // Añadir el id del estudio
    observation: string;
    progress_stage: string;
}

export interface ProgressStage {
    id: number;
    name: string;
}