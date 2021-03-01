import { RouteComponentProps} from 'react-router-dom';


export interface PageProps extends RouteComponentProps {
}

export type IsSelectedValue = {
    id: number,
    icon: string,
    orderNum: number,
    typeName: string
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
