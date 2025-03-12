import { AxiosInstance } from "axios";
import { RestApiService } from "./restApi.service";

export interface LoginResponse {
    access_token: string;
    refresh_token?: string;
    user: {
        id: number;
        name: string;
    };
}


class AuthService {
    restApiService: AxiosInstance;

    constructor() {
        this.restApiService = RestApiService.getInstance().http;
    }

    public async login(username: string, password: string) {
        return this.restApiService.post<LoginResponse>('/auth/login', { username, password });
    }

    public async me() {
        return this.restApiService.get('auth/profile')
    }
}


export default new AuthService();