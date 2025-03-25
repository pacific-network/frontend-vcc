import { AxiosInstance } from "axios";
import { RestApiService } from "./restApi.service";;
import { CreateStudyDto, GetStudyWithPagination, IStudy } from "@/models/Study";

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

    public async getStudyById(studyId: number) {
        return await this.restApiService.get<IStudy>(`studies/${studyId}`);

    }

    public async updateStudyById(studyId: number){
        return await this.restApiService.patch<IStudy>(`studies/${studyId}`);
    }
}

export default new StudyService();