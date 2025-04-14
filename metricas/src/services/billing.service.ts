import { AxiosInstance } from "axios";
import { RestApiService } from "./restApi.service";


class BillingService {
    restApiService: AxiosInstance;

    constructor() {
        this.restApiService = RestApiService.getInstance().http;
    }

    public async getBillingCurrentMonth() {
        return this.restApiService.get("billing/1/current-month")
    }

    public async getBillingPreviousMonth() {
        return this.restApiService.get("billing/1/previous-month")
    }

    public async detailBillingById(studyId: number) {
        return this.restApiService(`billing/${studyId}`);
    }

    public async remaining_billing(studyId: number) {
        return this.restApiService(`billing/remaining-billing/${studyId}`);
    }
}

export default new BillingService();


