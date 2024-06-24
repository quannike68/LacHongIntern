import {AxiosInstance, AxiosRequestConfig} from 'axios';
import {AxiosBase} from './axios-instance';

export default class NetworkService {
  private axios: AxiosInstance;
  constructor(axios?: AxiosInstance) {
    this.axios = axios || AxiosBase;
  }
  public get = async (url: string, setting?: AxiosRequestConfig) => {
    return this.axios.get(url, setting);
  };
  public post = async (
    url: string,
    data?: any,
    setting?: AxiosRequestConfig,
  ) => {
    return this.axios.post(url, data, setting);
  };
}
