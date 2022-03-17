import { BaseApiService } from 'services/core/baseApi.service';
import { AddAttachmentModel, AddDescriptionModel } from 'types/ticket';
import axiosServices from 'utils/axios';

class PartnerService extends BaseApiService {
    constructor() {
        super('/v1/partners');
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
        return axiosServices.post('v1/tickets/attachment', data, { headers: { 'Content-Type': 'multipart/form-data' } });
    };
}

export default new PartnerService();
