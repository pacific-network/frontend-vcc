import { PaginationMetaData } from "./Pagination";

export interface IClient {
    id: number;
    contactEmail: string;
    contactPhone: string;
    category_id: [];
}

export interface GetClientWithPagination {
    categories: [];
    data: IClient[];
    meta: PaginationMetaData
}