import axios from 'axios';

export const BaseURL = 'http://localhost:3050';

export const ServerBaseURL = 'http://118.70.171.240:9301';

export const axiosInstance = axios.create({
  baseURL: ServerBaseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosGETRequest = async (
  token?: string,
  params?: any,
  url?: string,
): Promise<any> => {
  try {
    const response = await axiosInstance.get(url || '', {
      headers: token ? {authorization: token} : undefined,
      params,
    });
    return response.data;
  } catch (error) {
    console.error(`Axios GET request error: ${error}`);
    return null;
  }
};
