/* eslint-disable no-continue */
/* eslint-disable no-prototype-builtins */
import _ from 'lodash';
import axiosServices from 'utils/axios';

export abstract class BaseApiService {
    constructor(protected apiName: string) {}

    getAll(filter?: any) {
        const query = filter ? `?${filter}` : '';
        return axiosServices.get(`${this.apiName}${query}`);
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
        model = this.convertDateStringsToDates(model);
        return axiosServices.put(`${this.apiName}/${model.id}`, model);
    }

    insert(model: any) {
        model = _.omit(model, ['id']);
        model = this.convertDateStringsToDates(model);
        return axiosServices.post(`${this.apiName}`, model);
    }

    convertDateStringsToDates(payload: any) {
        // Ignore things that aren't objects.
        if (typeof payload !== 'object') return payload;

        for (const key in payload) {
            if (!payload.hasOwnProperty(key)) continue;
            const value = payload[key];
            // Check for string properties which look like dates.
            if (moment(value, moment.ISO_8601).isValid() && !/^\d+$/.test(value)) {
                payload[key] = moment(value).format('yyyy-MM-DD hh:mm:ss').toString();
            } else if (typeof value === 'object') {
                // Recurse into object
                this.convertDateStringsToDates(value);
            }
        }
        return payload;
    }
}
