import axios from 'axios';

const axiosServices = axios.create({
    // baseURL: process.env.REACT_APP_BASE_API_URL!
    baseURL: 'http://192.168.110.144:8000'
});

axiosServices.defaults.headers.common['App-Platform'] = 'WebApp';

axiosServices.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.status === 401) {
            window.location.reload();
        }

        if (_.has(error, 'response.data.error')) return Promise.reject(error.response.data.error);

        if (_.has(error, 'response.data')) return Promise.reject(error.response.data);

        return Promise.reject((error.response && error.response.data) || 'Something went wrong!');
    }
);

export default axiosServices;
