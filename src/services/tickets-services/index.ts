import { BaseApiService } from 'services/core/baseApi.service';
import {
    AddAttachmentModel,
    AddDescriptionModel,
    CreateTicketModel,
    AssignToModel,
    EditTicketModel,
    UpdateStatusAndActionModel
} from 'types/ticket';
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

    verifyImportFile = (file?: any) => {
        const formData = new FormData();
        formData.append('file', file);

        return axiosServices.post('/v1/tickets/verifyImportFile', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    };

    importFile = (data?: any[]) => {
        return axiosServices.post('/v1/tickets/importData', { data });
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

    editTicket = (data: EditTicketModel, ticket_id?: string) => {
        return axiosServices.post(`v1/tickets/draft/${ticket_id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
    };

    assignTo = (data: AssignToModel) => {
        return axiosServices.post('v1/tickets/assigneesandsupporters', data);
    };

    updateStatusTicket = (model: UpdateStatusAndActionModel, ticket_id: number) => {
        return axiosServices.put(`v1/tickets/${ticket_id}`, model);
    };

    getUser = () => {
        return axiosServices.get(`v1/users?is_staff=1`);
    };
}

export default new TicketService();
