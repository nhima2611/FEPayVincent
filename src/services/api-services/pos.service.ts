import { BaseApiService } from 'services/core/baseApi.service';
import axiosServices from 'utils/axios';

class PosApiService extends BaseApiService {
    constructor() {
        super('/v1/partners/poses');
    }
}

export default new PosApiService();
