
import React, { useState, useEffect, MouseEvent } from 'react';
import '../static/css/articleList.css'
import { List, Row, Col, Modal, message, Button, Switch } from 'antd';
import axios from 'axios'
import servicePath from '../config/apiUrl'
const { confirm } = Modal;

interface List {
    readonly id: string,
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

const ArticleList: React.FC<{}> = () => {
    const [list, setList] = useState([]);
    const fetchList = () => {
        axios({
            method: 'get',
            url: servicePath.getArticleList,
            withCredentials: true,
            headers: { 'Access-Control-Allow-Origin': '*' },
        }).then(res => {
            setList(res.data.list)
        })
    }
    const delArticle = (id: string) => {
        confirm({
            title: '确定要删除这篇博客文章吗?',
            content: '如果你点击OK按钮，文章将会永远被删除，无法恢复。',
            onOk() {
                axios({
                    method: 'post',
                    url: servicePath.delArticle + id,
                    withCredentials: true ,
                    headers: { 'Access-Control-Allow-Origin': '*' }
                }).then(res => {
                    message.success('文章删除成功')
                    fetchList()
                })
            },
            onCancel() {
                message.success('没有任何改变')
            }
        })
    }
    useEffect(() => {
        fetchList()
    }, [])
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
                        <Col span={3}>
                            <b>浏览量</b>
                        </Col>

                        <Col span={4}>
                            <b>操作</b>
                        </Col>
                    </Row>
                }
                bordered
                dataSource={list}
                renderItem={(item: List) => (
                    <List.Item>
                        <Row className="list-div">
                            <Col span={8}>
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
                              <Button onClick={() => { delArticle(item.id) }} >删除 </Button>
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