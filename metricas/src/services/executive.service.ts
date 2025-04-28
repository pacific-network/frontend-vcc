import { AxiosInstance } from "axios";
import { RestApiService } from "./restApi.service";
import { CreateExecutive, GetExecutiveWithPagination } from "@/models/Executive";

class ExecutiveService {
    restApiService: AxiosInstance;
    constructor() {
        this.restApiService = RestApiService.getInstance().http;
    }

    public async createExecutive(executive: CreateExecutive) {
        return this.restApiService.post<CreateExecutive>('executives', executive);
    }

    public async getExecutives(page: number, take: number, searchQuery: string) {
        const searchParam = searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : "";
        return this.restApiService.get<GetExecutiveWithPagination>(`/executives?page=${page}&take=${take}${searchParam}`);
    }


}

export default new ExecutiveService();