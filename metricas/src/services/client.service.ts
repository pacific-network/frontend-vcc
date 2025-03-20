import { AxiosInstance } from "axios";
import { RestApiService } from "./restApi.service";
import { IClient, GetClientWithPagination } from "@/models/Client";
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

    public async createUser(client: IClient) {
        return this.restApiService.post<IClient>('/clients', client);
    }

} export default new ClientService();