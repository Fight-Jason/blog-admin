
import React,{useState,useEffect, MouseEvent} from 'react';
import '../static/css/addArticle.css'
import { List ,Row ,Col , Modal ,message ,Button,Switch} from 'antd';
import axios from 'axios'
import  servicePath  from '../config/apiUrl'
const { confirm } = Modal;

interface List {
    title: string,
    typeName: string,
    addTime: number,
    part_count?: number
    view_count?: number
}

interface Result {  // interface定义Result接口
    data: List[]
}

interface ArticleInfo {
    title: string,
    content: string
  }
  
const ArticleList:React.FC<{}> = () => {
    const [list,setList] = useState([]);
    return (
        <div>
            <List
                header={
                    <Row className="list-div">
                        <Col span={8}>
                            <b>标题</b>
                        </Col>
                        <Col span={3}>
                            <b>类别</b>
                        </Col>
                        <Col span={3}>
                            <b>发布时间</b>
                        </Col>
                        <Col span={3}>
                            <b>集数</b>
                        </Col>
                        <Col span={8}>
                            <b>浏览量</b>
                        </Col>
                        <Col span={8}>
                            <b>操作</b>
                        </Col>
                    </Row>
                }
                bordered
                dataSource={list}
                renderItem={(item: List)=> (
                    <List.Item>
                        <Row className="list-wrap">
                            <Col span={4}>
                                {item.title}
                            </Col>
                            <Col span={3}>
                                {item.typeName}
                            </Col>
                            <Col span={3}>
                                {item.addTime}
                            </Col>
                            <Col span={3}>
                                共<span>{item.part_count}</span>集
                            </Col>
                            <Col span={3}>
                                {item.view_count}
                            </Col>
                            <Col span={4}>
                              <Button type="primary" >修改</Button>&nbsp;
                              <Button >删除 </Button>
                            </Col>
                        </Row>
                    </List.Item>
                )}
            >

            </List>
        </div>
    )
}

export default ArticleList