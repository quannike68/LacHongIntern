import axios from 'axios';

export const AxiosBase = axios.create({
  baseURL: 'http://118.70.171.240:9301/',
  timeout: 30000,
});
