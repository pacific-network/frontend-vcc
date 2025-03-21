import { AxiosInstance } from "axios";
import { RestApiService } from "./restApi.service";
import { CreateClientDto, GetClientWithPagination } from "@/models/Client";
import { Pagination } from "@/models/Pagination";

class ClientService {
    restApiService: AxiosInstance;

    constructor() {
        this.restApiService = RestApiService.getInstance().http;
    }

    public async getClientsWithPagination(
        queryParams: Pick<Pagination, 'page' | 'take' | 'search'>
    ) {
        const { page, take } = queryParams;
        return this.restApiService.get<GetClientWithPagination>('/clients', {
            params: { page, take },
        });
    }

    public async createClient(client: CreateClientDto) {
        return this.restApiService.post<CreateClientDto>('/clients', client);
    }

    public async getClientCategories() {
        return this.restApiService.get("clients/categories");
    }

} export default new ClientService();