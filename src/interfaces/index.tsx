import { RouteComponentProps } from 'react-router-dom';

interface RouterInfo {
    id: any
}
export interface PageProps extends RouteComponentProps<RouterInfo> { }

export type IsSelectedValue = {
    id: number,
    icon: string,
    orderNum: number,
    typeName: string
}

export interface Result {  // interface定义Result接口
    data: IsSelectedValue[]
}

export type IsdataProps = {
    id?: number,
    type_id: number,
    title: string,
    article_content: string,
    introduce: string,
    addTime?: number,
    view_count?: number
}

interface CreateArrayFunc<T> {
    (length: number, value: T): Array<T>;
}

let createArray: CreateArrayFunc<string>;
createArray = function<T>(length: number,value: T): Array<T> {
    let result: T[] = [];
    for(let i=0;i<length;i++) {
        result[i] = value
    }
    return result
}

createArray(3, 'x');


interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
    return source.search(subString) !== -1;
}

