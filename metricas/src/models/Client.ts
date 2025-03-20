import { PaginationMetaData } from "./Pagination";

export interface IClient {
    category_name: string;
    id: number;
    name: string;
    contactEmail: string;
    contactPhone: string;
    category_id: [];
}

export interface GetClientWithPagination {
    categories: [];
    data: IClient[];
    meta: PaginationMetaData
}