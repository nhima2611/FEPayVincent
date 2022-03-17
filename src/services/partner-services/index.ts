import { BaseApiService } from 'services/core/baseApi.service';

class PartnerService extends BaseApiService {
    constructor() {
        super('/v1/partners');
    }
}

export default new PartnerService();
