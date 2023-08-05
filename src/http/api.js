import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8011/api/v1',
});

export default api;
