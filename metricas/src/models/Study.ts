import { PaginationMetaData } from "./Pagination";

// export interface CreateStudyDto {
//     name: string;
//     client: string;
//     start_date: Date;
//     end_date: Date;
//     quantity: number;
//     observation: [];
//     progress_stage: [];
//     price: string;
// }

export interface CreateStudyDto {
    name: string;
    client: string;
    start_date: string; // ISO string
    end_date: string;
    quantity: number;
    observaciones: Observation[]; // antes `observation: []`
    progress_stage_id: number;
    price: number;
    is_complete: boolean;
    completed_at: string; // ISO
}


// export interface IStudy {
//     id: number;
//     name: string;
//     client: string;
//     start_date: Date;
//     end_date: Date;
//     quantity: number;
//     observaciones: [];
//     progress_stage: {
//         id: number;
//         name: string;
//     };
//     files: [];
//     completed_at: Date;
// }
export interface IStudy {
    id: number;
    name: string;
    client: string;
    start_date: string; // usar string para evitar problemas con inputs
    end_date: string;
    quantity: number;
    observaciones: Observation[];
    progress_stage: {
        id: number;
        name: string;
    };
    files: any[]; // o define un tipo si sabes qué contienen
    completed_at: string;
}


export interface GetStudyWithPagination {
    categories: [];
    data: IStudy[];
    meta: PaginationMetaData
}

// export interface updateStudy {
//     id: number;  // Añadir el id del estudio
//     observaciones: [];
//     progress_stage_id: number;
// }
// src/models/Study.ts

export interface updateStudy {
    id: string;
    quantity: number | string;  // Añadir quantity
    progress_stage_id: number;
    observaciones: Observation[];
}


export interface ProgressStage {
    id: number;
    name: string;
}

// export interface StudyPrice {
//     id: number;
//     name: string;
//     client: string;
//     start_date: string; // Assuming this is a string in ISO format
//     end_date: string;   // Assuming this is a string in ISO format
//     quantity: number;
//     observaciones: [];
//     price: number;
//     is_complete: boolean;
//     completed_at: string; // Assuming this is a string in ISO format
//     progress_stage: [];
//     files: [];
//     totalPrice: number;
// }

export interface StudyPrice {
    id: number;
    name: string;
    client: string;
    start_date: string;
    end_date: string;
    quantity: number;
    observaciones: Observation[];
    price: number;
    is_complete: boolean;
    completed_at: string;
    progress_stage: {
        id: number;
        name: string;
    };
    files: any[];
    totalPrice: number;
}


export interface PriceWithPagination {
    data: StudyPrice[];
    meta: PaginationMetaData;
    totalPrice: number;
}

export interface Observation {
    fecha: string;     // ISO string
    mensaje: string;
}
