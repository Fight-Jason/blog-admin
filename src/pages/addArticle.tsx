import React,{useState,useEffect} from 'react';
import marked from 'marked';
import '../static/css/addArticle.css';
import { Row,Col,Input, Select ,Button ,DatePicker } from 'antd';
const { Option } = Select;
const { TextArea } = Input;

type IsEvent = React.ChangeEvent<HTMLInputElement> |  React.KeyboardEvent<HTMLInputElement>
type IsTextArea = React.ChangeEvent<HTMLTextAreaElement> | React.KeyboardEvent<HTMLTextAreaElement>

function AddArticle():JSX.Element {
    const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle,setArticleTitle] = useState('')   //文章标题
    const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd,setIntroducemd] = useState('')            //简介的markdown内容
    const [introducehtml,setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate,setShowDate] = useState()   //发布日期
    const [updateDate,setUpdateDate] = useState() //修改日志的日期
    const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType,setSelectType] = useState(1) //选择的文章类别
    const updateActicel =()=> {

    }

    const changeTitle = (e: IsEvent) => {
        let value = (e.target as HTMLInputElement).value;
        setArticleTitle(value)
        sessionStorage.setItem("title",JSON.stringify(value))
    }   

    const changeContent = (e:IsTextArea) => {
        let value = (e.target as HTMLTextAreaElement).value;
        setArticleContent(value)
        let html = marked(value)
        sessionStorage.setItem("marked",JSON.stringify(value))
        setMarkdownContent(html)
    }

    const changeIntroduce = (e:IsTextArea)=>{
        let value = (e.target as HTMLTextAreaElement).value;
        setIntroducemd(value)
        let html = marked(value)
        sessionStorage.setItem("introduce",JSON.stringify(value))
        setIntroducehtml(html)
    }

    useEffect(() => {
        let marked_1 = sessionStorage.getItem("marked");
        let marked_2 = sessionStorage.getItem("introduce");
        let marked_3 = sessionStorage.getItem("title");
        let html_1 = typeof marked_1 === 'string' ? JSON.parse(marked_1) : '';
        let html_2 = typeof marked_2 === 'string' ? JSON.parse(marked_2) : '';
        let html_3 = typeof marked_3 === 'string' ? JSON.parse(marked_3) : '';
        setArticleContent(html_1)
        setMarkdownContent(marked(html_1))
        setIntroducemd(html_2)
        setIntroducehtml(marked(html_2))
        setArticleTitle(html_3)
    },[])
    
    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        breaks: false,
        smartLists: true,
        smartypants: false,
    });
    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={20}>
                            <Input 
                                value={articleTitle} 
                                onChange={changeTitle} 
                                onPressEnter={changeTitle}
                                placeholder="博客标题" 
                                size="large" 
                            />
                        </Col>
                        <Col span={4}>
                            &nbsp;
                            <Select defaultValue="Sing Up" size="large">
                                <Option value="JavaScript">JavaScript</Option>
                                <Option value="Node.js">Node.js</Option>
                            </Select>
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={10}>
                        <Col span={12}>
                            <TextArea  
                                className="markdown-content" 
                                rows={35}
                                value={articleContent} 
                                onChange={changeContent} 
                                onPressEnter={changeContent}
                                placeholder="文章内容"
                            />
                        </Col>
                        <Col span={12}>
                            <div 
                                className="show-html"
                                dangerouslySetInnerHTML = {{__html:markdownContent}}
                            >
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Button size="large">暂存文章</Button>&nbsp;
                            <Button type="primary" size="large" onClick={updateActicel}>发布文章</Button>
                            <br />
                        </Col>
                        <Col span={24}>
                            <br />
                            <TextArea 
                                rows={4} 
                                value={introducemd}  
                                onChange={changeIntroduce} 
                                onPressEnter={changeIntroduce}
                                placeholder="文章简介"
                            />
                            <br /><br />
                            <div 
                                className="introduce-html"
                                dangerouslySetInnerHTML = {{__html:'文章简介：'+introducehtml}}
                            ></div>
                        </Col>
                        <Col span={12}>
                            <div className="date-select">
                                <DatePicker 
                                    placeholder="发布日期"
                                    size="large"
                                />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default AddArticle