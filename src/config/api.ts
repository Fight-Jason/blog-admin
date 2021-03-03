import requset from '../utils/request'
import { CHECKLOGIN, 
    GET_TYPE_INFO, 
    ADD_ARTICLE,
    UPDATE_ARTICLE,
    GET_ARTICLE_LIST,
    DEL_ARTICLE,
    GET_ARTICLE_BY_ID 
} from './apiUrl'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'


export interface AxiosRequestConfig {
    url?: string;
    method?: Method;
    baseURL?: string;
    headers?: any;
    params?: any;
    data?: any;
    query: any;
    withCredentials?: boolean;
}


// 登录
export function checkLogin (data: any) {
    return requset({
        url: CHECKLOGIN,
        method: 'post',
        data
    })
}

// 获取文章列表
export function fetchArticleList(query?: string) {
    return requset({
        url: GET_ARTICLE_LIST,
        method: 'get',
        params: query
    })
}

// 删除文章
export function delArticle(id: string) {
    return requset({
        url: `${DEL_ARTICLE}/${id}`,
        method: 'post',
    })
}

// 添加文章
export function addArticle(data: any) {
    return requset({
        url: ADD_ARTICLE,
        method: 'post',
        data
    })
}

// 更新文章
export function updateArticle(data: any) {
    return requset({
        url: UPDATE_ARTICLE,
        method: 'post',
        data
    })
}

// 获取文章ID
export function getArticleById(id: string) {
    return requset({
        url: `${GET_ARTICLE_BY_ID}/${id}`,
        method: 'get'
    })
}


export function getTypeInfo() {
    return requset({
        url: GET_TYPE_INFO,
        method: 'get'
    })
}

