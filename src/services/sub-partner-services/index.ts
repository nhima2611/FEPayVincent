import { BaseApiService } from 'services/core/baseApi.service';

class SubPartnerService extends BaseApiService {
    constructor() {
        super('/v1/partners/subPartners');
    }
}

export default new SubPartnerService();
