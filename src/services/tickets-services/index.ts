import { BaseApiService } from 'services/core/baseApi.service';
import axiosServices from 'utils/axios';

class TicketService extends BaseApiService {
    constructor() {
        super('/v1/tickets');
    }

    downloadTicket = (model?: number[]) => {
        return axiosServices.post(`/v1/tickets/exportExcel`, { ids: model }, { responseType: 'blob' });
    };

    deleteTicket = (model?: number[]) => {
        return axiosServices.post(`/v1/tickets/deleteTickets`, { ids: model });
    };

    uploadTicket = (file?: any) => {
        const formData = new FormData();
        formData.append('file', file);

        return axiosServices.post('/v1/tickets/import', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    };
}

export default new TicketService();
