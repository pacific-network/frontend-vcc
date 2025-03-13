import { AxiosInstance } from "axios";
import { RestApiService } from "./restApi.service";
import { GetUsersWithPagination } from "@/models/User";


class UserService {
    restApiService: AxiosInstance;

    constructor() {
        this.restApiService = RestApiService.getInstance().http;
    }

    public async getUsers(page: number, take: number) {
        return this.restApiService.get<GetUsersWithPagination>(`/users?page=${page}&take=${take}`);
    }
}

export default new UserService();