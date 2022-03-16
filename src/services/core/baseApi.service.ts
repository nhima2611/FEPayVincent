import _ from 'lodash';
import axiosServices from 'utils/axios';

export abstract class BaseApiService {
    constructor(protected apiName: string) {}

    getAll(filter?: any) {
        return axiosServices.get(`${this.apiName}?${filter}`);
    }

    getById(id: string | any, includeOption?: any) {
        return axiosServices.get(`${this.apiName}/${id}`, {
            params: { filter: JSON.stringify(includeOption) }
        });
    }

    delete(id: any) {
        return axiosServices.delete(`${this.apiName}/${id}`);
    }

    updatePatch(model: any) {
        return axiosServices.patch(`${this.apiName}/${model.id}`, model);
    }

    updatePut(model: any) {
        return axiosServices.patch(`${this.apiName}/${model.id}`, model);
    }

    insert(model: any) {
        model = _.omit(model, ['id']);
        return axiosServices.post(`${this.apiName}`, model);
    }
}
