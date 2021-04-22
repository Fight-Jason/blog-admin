import axios, { AxiosInstance } from 'axios'
import { message, Spin  } from 'antd'
import {
    LoadingOutlined 
} from '@ant-design/icons';

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'
export type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'

export interface AxiosRequest {
    baseURL?: string;
    url: string;
    data?: any;
    params?: any;
    method?: Method;
    headers?: any;
    timeout?: number;
    responseType?: ResponseType;
}

export interface AxiosResponse {
    data: any;
    headers: any;
    request?: any;
    status: number;
    statusText: string;
    config: AxiosRequest;
}

// export interface CustomResponse {
//     readonly status: boolean;
//     readonly message: string;
//     data: any;
//     origin?: any;
// }

// export interface GetDemo {
//     id: number;
//     str: string;
// }

// export interface PostDemo {
//     id: number;
//     list: Array<{
//         id: number;
//         version: number;
//     }>;
// }


// 取消重复请求
let pending: any[] = [];


// 创建axios实例
const service:AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_API, // url = base url + request url
    withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
 })
// const removePending = (config: AxiosRequestConfig,f:any) => {
//     const flagUrl = config.url
//     if(pending.indexOf(flagUrl)) {
//         if(f) {
//             f('取消重复请求')
//         } else {
//             pending.splice(pending.indexOf(flagUrl), 1) // 把这条记录从数组中移除
//         }
//     } else {
//          // 如果不存在在请求队列中，加入队列
//          if (f) {
//             pending.push(flagUrl);
//         }
//     }
// }

service.interceptors.request.use((config) => {
    return config;
}, error => {
    return Promise.reject(error);
});

service.interceptors.response.use(
    request => {
       return request.status === 200 ? Promise.resolve(request) : Promise.reject(request)
    },
    error => {
        const { response } =  error;
        if(response) {
            errorHandle(response.status, response.data);
            return Promise.reject(response);
        } else {
            message.error("请求失败")
            return Promise.reject(error);
        }
    }
)

const errorHandle = (status:number, other:any) => {
    switch (status) {
        case 400:
            message.error('信息校验失败');
            break;
        case 401:
            message.error("认证失败");
            break;
        case 404:
            message.error("请求的资源不存在");
            break;
        default:
            console.log(other);
            break;

    }
}

export default service