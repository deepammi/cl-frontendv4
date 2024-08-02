import axios from 'axios';

const apiResources = axios.create({
    baseURL: 'http://localhost:4000',
});

export default apiResources;
