/**
 * axios setup to use mock service
 */

import axios from 'axios';
import _ from 'lodash';

const axiosServices = axios.create({
    // baseURL: 'https://payment-api2.neotime.vn'
    baseURL: 'http://192.168.110.144:8000'
});

// interceptor for http
axiosServices.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
);

export default axiosServices;
