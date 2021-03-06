import React,{ 
    useState,
    useEffect, 
    MouseEvent, 
    KeyboardEvent,
    ChangeEvent,
     
} from 'react';
import marked from 'marked';
import '../static/css/addArticle.css'
import { Row,Col,Input, Select ,Button ,DatePicker, message } from 'antd';
import axios from 'axios'
import { IsSelectedValue, IsdataProps, PageProps } from '../interfaces/index'
import { match } from 'react-router-dom';
import { getArticleById,updateArticle,addArticle,getTypeInfo } from '../config/api'

const { Option } = Select;
const { TextArea } = Input;


const AddArticle: React.FC<PageProps> = ( {history, match}: PageProps) => {
    const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle,setArticleTitle] = useState('')   //文章标题
    const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd,setIntroducemd] = useState('')            //简介的markdown内容
    const [introducehtml,setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate,setShowDate] = useState('')   //发布日期
    const [updateDate,setUpdateDate] = useState() //修改日志的日期
    const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType,setSelectType] = useState(1) //选择的文章类别
    const updateActicel =()=> {

    }

    const changeTitle = (e: MouseEvent | KeyboardEvent) => {
        let value = (e.target as HTMLInputElement).value;
        setArticleTitle(value)
    }   

    const changeContent = (e: ChangeEvent | KeyboardEvent) => {
        let value = (e.target as HTMLTextAreaElement).value;
        setArticleContent(value)
        let html = marked(value)
        setMarkdownContent(html)
    }

    const changeIntroduce = (e: ChangeEvent | KeyboardEvent)=>{
        let value = (e.target as HTMLTextAreaElement).value;
        setIntroducemd(value)
        let html = marked(value)
        setIntroducehtml(html)
    }

    const selectTypeHandler = (value:number) => {
        console.log(value,"value")
        setSelectType(value)
    }

    const handleGetArticleById  = (id: string) => {
        getArticleById(id)
            .then(res => {
                const temp = res.data.data[0];
                let { title, article_content, introduce, addTime, typeId } = temp
                console.log(temp)
                setArticleTitle(title)
                setArticleContent(article_content)
                setMarkdownContent(marked(article_content))
                setIntroducemd(introduce)
                setIntroducehtml(marked(introduce))
                setShowDate(addTime)
                setSelectType(typeId)
            })
    }
    
    const saveArticle = ()=>{
        if(!selectedType){
            message.error('必须选择文章类别')
            return false
        }else if(!articleTitle){
            message.error('文章名称不能为空')
            return false
        }else if(!articleContent){
            message.error('文章内容不能为空')
            return false
        }else if(!introducemd){
            message.error('简介不能为空')
            return false
        }else if(!showDate){
            message.error('发布日期不能为空')
            return false
        }

        let datetext= showDate.replace('-','/') //把字符串转换成时间戳
        let dataProps: IsdataProps = {
            type_id: selectedType,
            title: articleTitle,
            article_content: articleContent,
            introduce: introducemd,
            addTime: (new Date(datetext).getTime())/1000
        }   //传递到接口的参数

        // 新增文章
        if(!articleId) {
            dataProps.view_count = 0;
            addArticle(dataProps)
                .then(res => {
                    setArticleId(res.data.insertId)
                    if(res.data.isSuccess) {
                        message.success('文章保存成功')
                    } else {
                        message.error('文章保存失败')
                    }
                })
        } else {
            // 修改文章
            dataProps.id = articleId;
            updateArticle(dataProps)
                .then(res => {
                    if(res.data.isScuccess) {
                        message.success('文章保存成功')
                    } else {
                        message.error('保存失败')
                    }
                })
        }
    }


    //从中台得到文章类别信息
    const handleGetTypeInfo =()=>{
        getTypeInfo()
            .then(res => {
                if(res.data.data=="没有登录"){
                    localStorage.removeItem('openId')
                    history.push('/')  
                }else{
                    setTypeInfo(res.data.data)
                }   
            })
    }

    useEffect(() => {
        handleGetTypeInfo()
        //获得文章ID
        let tmpId = match.params.id
        if(tmpId){
            setArticleId(tmpId)
            handleGetArticleById(tmpId)
        } 
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
                                onChange={e=> setArticleTitle(e.target.value)} 
                                onPressEnter={changeTitle}
                                placeholder="博客标题" 
                                size="large" 
                            />
                        </Col>
                        <Col span={4}>
                            &nbsp;
                            <Select defaultValue={selectedType} size="large" onChange={selectTypeHandler}>
                                {
                                    typeInfo.map((item:IsSelectedValue,index)=>{
                                        return (<Option key={index + 1} value={item.id}>{item.typeName}</Option>)
                                    })
                                }
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
                            <Button  size="large">暂存文章</Button>&nbsp;
                            <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
                            <br/>
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
                                    onChange={(date,dateString)=>setShowDate(dateString)}
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