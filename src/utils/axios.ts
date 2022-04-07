/* eslint-disable guard-for-in */
import axios from 'axios';

const axiosServices = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL! // => Product
    // baseURL: 'http://192.168.110.145:8000' // => Paul
    // baseURL: 'http://192.168.110.58:8000/' // => Tom
});

axiosServices.defaults.headers.common['App-Platform'] = 'WebApp';

// axiosServices.interceptors.request.use((config) => {
//     const payload = config.data;
//     return config;
// });

axiosServices.interceptors.response.use(
    (response) => response,
    (error) => {
        if (_.has(error, 'response.data')) return Promise.reject(error.response.data);

        return Promise.reject((error.response && error.response.data) || 'Something went wrong!');
    }
);

export default axiosServices;
