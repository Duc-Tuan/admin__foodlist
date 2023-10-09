import axios from 'axios';
import { pickBy } from 'lodash';

const httpRequest = axios.create({
    //   baseURL: process.env.API,
    baseURL: 'http://localhost:3036/api/v1',
});

export const get = async (path: string, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};

export const post = async (path: string, options = {}) => {
    const response = await httpRequest.post(path, options);
    return response.data;
};

export const delet = async (path: string, options = {}) => {
    const response = await httpRequest.delete(path, options);
    return response.data;
};

export const patch = async (path: string, options = {}) => {
    const response = await httpRequest.patch(path, options);
    return response.data;
};

export const put = async (path: string, options = {}) => {
    const response = await httpRequest.put(path, options);
    return response.data;
};

export default httpRequest;

export function setHeaders(params: object): void {
    const newHeaders = {
        ...httpRequest.defaults.headers.common,
        ...params,
    };
    httpRequest.defaults.headers.common = pickBy(newHeaders, val => !!val);
}
