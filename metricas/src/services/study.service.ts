import { AxiosInstance } from "axios";
import { RestApiService } from "./restApi.service";;
import { CreateStudyDto, GetStudyWithPagination, IStudy, updateStudy, ProgressStage, PriceWithPagination, Observation } from "@/models/Study";

class StudyService {
    restApiService: AxiosInstance;

    constructor() {
        this.restApiService = RestApiService.getInstance().http;

    }

    public async createStudy(study: CreateStudyDto) {
        return this.restApiService.post<CreateStudyDto>('studies', study);
    }

    // public async getStudies(page: number, take: number) {
    //     return this.restApiService.get<GetStudyWithPagination>(`/studies?page=${page}&take=${take}`);
    // }

    public async getStudies(page: number, take: number, searchQuery: string) {
        const searchParam = searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : "";
        return this.restApiService.get<GetStudyWithPagination>(`/studies?page=${page}&take=${take}${searchParam}`);
    }

    public async getStudyById(studyId: number) {
        return await this.restApiService.get<IStudy>(`studies/${studyId}`);

    }
    public async updateStudyById(id: number, studyData: { observaciones: Observation[]; progress_stage_id: number }) {
        return await this.restApiService.patch<updateStudy>(`studies/${id}`, studyData);
    }

    // public async updateStudyById(id: number, studyData: { observaciones: []; progress_stage_id: number }) {
    //     return await this.restApiService.patch<updateStudy>(`studies/${id}`, studyData);
    // }

    public async getProgressStages() {
        return this.restApiService.get<ProgressStage>('clients/progress');
    }

    // public async getTotalPrices(page: number, take: number) {
    //     return this.restApiService.get<PriceWithPagination>(`clients/price?page=${page}&take=${take}`);
    // }

    public async getTotalPrices(page: number, take: number, searchQuery?: string) {
        const params = new URLSearchParams({
            page: page.toString(),
            take: take.toString(),
        });

        if (searchQuery) {
            params.append("q", searchQuery); // Solo agrega `q` si hay un término de búsqueda
        }

        return this.restApiService.get<PriceWithPagination>(`clients/price?${params.toString()}`);
    }

}

export default new StudyService();