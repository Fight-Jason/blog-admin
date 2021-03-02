import { RouteComponentProps} from 'react-router-dom';

interface RouterInfo {
    id: any
}
export interface PageProps extends RouteComponentProps<RouterInfo> {}

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
