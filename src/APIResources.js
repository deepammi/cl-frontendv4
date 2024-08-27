import axios from 'axios';

const apiResources = axios.create({
    baseURL: 'https://cl-backendv4-production.up.railway.app/',
    //baseURL: 'http://localhost:4000/'
});

export default apiResources;
