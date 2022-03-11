import { BaseApiService } from 'services/core/baseApi.service';

class TicketService extends BaseApiService {
    constructor() {
        super('TicketService');
    }
}

export default new TicketService();
