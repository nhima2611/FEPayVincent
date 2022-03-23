import { BaseApiService } from 'services/core/baseApi.service';
import axiosServices from 'utils/axios';

class UserApiService extends BaseApiService {
    constructor() {
        super('/v1/users');
    }

    getGroups(parent_id: any) {
        return axiosServices.get(`${this.apiName}/group?parent_id=${parent_id}`);
    }
}

export default new UserApiService();
