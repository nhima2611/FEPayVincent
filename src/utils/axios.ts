/**
 * axios setup to use mock service
 */

import axios from 'axios';
import _ from 'lodash';

const axiosServices = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
});

// interceptor for http
axiosServices.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
);

export default axiosServices;
