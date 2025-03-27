import { AxiosInstance } from "axios";
import { RestApiService } from "./restApi.service";;
import { CreateStudyDto, GetStudyWithPagination, IStudy, updateStudy, ProgressStage } from "@/models/Study";

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

    public async updateStudyById(id: number, studyData: { observaciones: []; progress_stage_id: number }) {
        return await this.restApiService.patch<updateStudy>(`studies/${id}`, studyData);
    }

    public async getProgressStages() {
        return this.restApiService.get<ProgressStage>('clients/progress');
    }
}

export default new StudyService();