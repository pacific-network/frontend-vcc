import { AxiosInstance } from "axios";
import { RestApiService } from "./restApi.service";;
import { CreateStudyDto, GetStudyWithPagination } from "@/models/Study";

class StudyService {
    restApiService: AxiosInstance;

    constructor() {
        this.restApiService = RestApiService.getInstance().http;

    }

    public async createStudy(study: CreateStudyDto) {
        return this.restApiService.post<CreateStudyDto>('studies', study);
    }

    public async getStudies(page: number, take: number) {
        return this.restApiService.get<GetStudyWithPagination>(`/studies?page=${page}&take=${take}`);
    }
}

export default new StudyService();