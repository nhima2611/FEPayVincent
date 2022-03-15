import axios from 'axios';

const axiosServices = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL!
});

axiosServices.defaults.headers.common['App-Platform'] = 'WebApp';

axiosServices.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log(error);

        if (_.has(error, 'response.data.error')) return Promise.reject(error.response.data.error);

        if (_.has(error, 'response.data')) return Promise.reject(error.response.data);

        return Promise.reject((error.response && error.response.data) || error);
    }
);

export default axiosServices;
