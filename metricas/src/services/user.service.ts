import { AxiosInstance } from "axios";
import { RestApiService } from "./restApi.service";
import { GetUsersWithPagination, IUser } from "@/models/User";


class UserService {
    restApiService: AxiosInstance;

    constructor() {
        this.restApiService = RestApiService.getInstance().http;
    }

    public async getUsers(page: number, take: number) {
        return this.restApiService.get<GetUsersWithPagination>(`/users?page=${page}&take=${take}`);
    }


    public async createUser(user: IUser) {
        return this.restApiService.post<IUser>('/users', user);
    }
}

export default new UserService();