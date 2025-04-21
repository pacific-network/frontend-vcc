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
    progress_stage_id: number;
    is_complete: boolean;
    completed_at: string;
}

export interface IStudy {
    id: number;
    name: string;
    client: string;
    start_date: Date;
    end_date: Date;
    quantity: number;
    observaciones: [];
    progress_stage: {
        id: number;
        name: string;
    };
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

export interface StudyPrice {
    id: number;
    name: string;
    client: string;
    start_date: string; // Assuming this is a string in ISO format
    end_date: string;   // Assuming this is a string in ISO format
    quantity: number;
    observaciones: [];
    price: number;
    is_complete: boolean;
    completed_at: string; // Assuming this is a string in ISO format
    progress_stage: [];
    files: [];
    totalPrice: number;
}

export interface PriceWithPagination {
    data: StudyPrice[];
    meta: PaginationMetaData;
    totalPrice: number;
}
