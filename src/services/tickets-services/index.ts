import { BaseApiService } from 'services/core/baseApi.service';
import { AddAttachmentModel, AddDescriptionModel, CreateTicketModel, AssignToModel } from 'types/ticket';
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

    addDescription = (data: AddDescriptionModel) => {
        return axiosServices.post('v1/tickets/descriptions', data);
    };

    addAttachment = (data: AddAttachmentModel[]) => {
        return axiosServices.post('v1/tickets/attachments', data, { headers: { 'Content-Type': 'multipart/form-data' } });
    };

    createTicket = (data: CreateTicketModel) => {
        return axiosServices.post('v1/tickets', data, { headers: { 'Content-Type': 'multipart/form-data' } });
    };

    assignTo = (data: AssignToModel) => {
        return axiosServices.post('v1/tickets/assigneesandsupporters', data);
    };
}

export default new TicketService();
