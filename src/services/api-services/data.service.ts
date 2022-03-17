import { BaseApiService } from 'services/core/baseApi.service';
import axiosServices from 'utils/axios';

class DataApiService extends BaseApiService {
    constructor() {
        super('/v1/data');
    }

    getCities() {
        return axiosServices.get(`${this.apiName}/cities`);
    }

    getDistricts(cityCode: any) {
        return axiosServices.get(`${this.apiName}/districts/${cityCode}`);
    }

    getWards(districtCode: any) {
        return axiosServices.get(`${this.apiName}/wards/${districtCode}`);
    }
}

export default new DataApiService();
