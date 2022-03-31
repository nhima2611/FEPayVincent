import { BaseApiService } from 'services/core/baseApi.service';
import axiosServices from 'utils/axios';

class PartnerService extends BaseApiService {
    constructor() {
        super('/v1/partners');
    }

    downloadPartner = (model?: number[]) => {
        return axiosServices.post(`${this.apiName}/exportExcel`, { ids: model }, { responseType: 'blob' });
    };
}

export default new PartnerService();
