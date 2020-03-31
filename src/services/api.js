import axios from 'axios';

const api = axios.create({
  baseURL:
    'https://my-json-server.typicode.com/RodrigoNunesLeite/apirocketshoes',
});

export default api;
