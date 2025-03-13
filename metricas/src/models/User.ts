import { PaginationMetaData } from "./Pagination";

export interface IUser {
    id: number;
    username: string;
    password: string;
    name: string;
    lastname: string;
    mail: string;
    role_id: number;
    status_id: number;
}

export interface GetUsersWithPagination {
    status: number;
    data: IUser[];
    meta: PaginationMetaData
}

