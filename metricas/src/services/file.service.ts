import { AxiosInstance } from "axios";
import { RestApiService } from "./restApi.service";
import { File } from "@/models/File";

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