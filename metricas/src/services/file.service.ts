import { AxiosInstance } from "axios";
import { RestApiService } from "./restApi.service";

class FileService {
    restApiService: AxiosInstance;

    constructor() {
        this.restApiService = RestApiService.getInstance().http;

    }

    public async uploadFile(data: FormData) {
        return this.restApiService.post<File>(`files/upload`, data)
    }
}

export default new FileService();