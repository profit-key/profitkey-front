import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'https://dev-server.profitkey.click',
});

httpClient.interceptors.response.use((response) => response.data);
