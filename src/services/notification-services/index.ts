import { BaseApiService } from 'services/core/baseApi.service';
import axiosServices from 'utils/axios';

class NotificationService extends BaseApiService {
    constructor() {
        super('/v1/notifications');
    }

    readAll() {
        return axiosServices.put(`${this.apiName}/readall`);
    }
}

export default new NotificationService();
