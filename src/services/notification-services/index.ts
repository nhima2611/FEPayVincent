import { BaseApiService } from 'services/core/baseApi.service';

class NotificationService extends BaseApiService {
    constructor() {
        super('/v1/notifications');
    }
}

export default new NotificationService();
