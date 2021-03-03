import React,{ useState} from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'
import { Route } from "react-router-dom";
import '../static/css/index.css';
import AddArticle from './addArticle'
import ArticleList from './articlelist';
import {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    CommentOutlined
} from '@ant-design/icons';
import { PageProps } from '../interfaces/index'
const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

interface MenuInfo {
    key: React.Key;
    keyPath: React.Key[];
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement>;
}
interface TitleEventEntity {
    key: string;
    domEvent: Event;
}


function Index(props: PageProps) {
    const [collapsed,setCollapsed] = useState(false)
    const [subMenuTitle, setSubMenuTitle] = useState<React.Key>('工作台')

    const onCollapse = (collapsed: boolean) =>{
        setCollapsed(collapsed)
    };

    const handleClickArticle = (event: MenuInfo ) => {
        const { key } = event;
        console.log(key)
        setSubMenuTitle(key)
        switch(key) {
            case 'addArticle':
                props.history.push('/index/add')
                break;
            case 'articleList':
                props.history.push('/index/list')
                break;
        }
    }
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['工作台']}  mode="inline" onClick={handleClickArticle}>
                    <Menu.Item key="工作台">
                        <PieChartOutlined />
                        <span>工作台</span>
                    </Menu.Item>
                    <Menu.Item key="添加文章">
                        <DesktopOutlined />
                        <span>添加文章</span>
                    </Menu.Item>
                    <SubMenu
                        key="文章管理"
                        title={
                            <span>
                               <UserOutlined />
                               <span>文章管理</span> 
                            </span>
                        }
                    >
                        <Menu.Item key="addArticle">添加文章</Menu.Item>
                        <Menu.Item key="articleList">文章列表</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="留言管理">
                        <CommentOutlined />
                        <span>留言管理</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>后台管理</Breadcrumb.Item>
                        <Breadcrumb.Item>{subMenuTitle}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}> 
                        <Route path="/index/" exact component={AddArticle} />
                        <Route path="/index/add/" exact component={AddArticle} />
                        <Route path="/index/add/:id" exact component={AddArticle} />
                        <Route path="/index/list/" component={ArticleList} />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Jason.com</Footer>
            </Layout>
        </Layout>
    )
}

export default Index