import { BaseApiService } from 'services/core/baseApi.service';

class AuthService extends BaseApiService {
    constructor() {
        super('/auth');
    }
}

export default new AuthService();
