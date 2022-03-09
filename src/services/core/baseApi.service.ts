import _ from 'lodash';
import axiosInstance from 'utils/axios';

export abstract class BaseApiService {
    constructor(protected apiName: string) {}

    getAll(filter?: any) {
        return axiosInstance.get(`${this.apiName}`, {
            params: { filter: JSON.stringify(filter) }
        });
    }

    getById(id: string, includeOption?: any) {
        return axiosInstance.get(`${this.apiName}/${id}`, {
            params: { filter: JSON.stringify(includeOption) }
        });
    }

    delete(id: any) {
        return axiosInstance.delete(`${this.apiName}/${id}`);
    }

    updatePatch(model: any) {
        return axiosInstance.patch(`${this.apiName}/${model.id}`, model);
    }
    updatePut(model: any) {
        return axiosInstance.patch(`${this.apiName}/${model.id}`, model);
    }

    insert(model: any) {
        model = _.omit(model, ['id']);
        return axiosInstance.post(`${this.apiName}`, model);
    }
}
