import React , {useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import { Card, Input ,Button ,Spin, message } from 'antd';
import {
    UserOutlined,
    KeyOutlined
} from '@ant-design/icons';
import '../static/css/login.css'
import { PageProps } from '../interfaces/index'
import { checkLogin } from '../config/api'
import axios from 'axios';

function Login(props: PageProps) :JSX.Element{
    const [userName , setUserName] = useState<string>();
    const [password , setPassword] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息

    const handleCheckLogin = async()=> {
        if(!userName) {
            return message.error('用户名不能为空')  
        } else if (!password) {
            return message.error('密码不能为空') 
        }
        let dataProps = {
            'userName':userName,
            'password':password  
        }
        setIsLoading(true)
        try {
            const { data: {msg, openId} } = await checkLogin(dataProps);
            if(msg === '登录成功') {
                localStorage.setItem('openId', openId)
                props.history.push('/index')
            }
        } catch (err) {
            Promise.reject(err)
        }
        setTimeout(()=>{
            setIsLoading(false)
        },1000)
    }
    useEffect(()=>{

    },[])
    return (
        <section className="login-wrap">
            <div className="login-div">
                <Spin tip="loading..." spinning={isLoading}>
                    <Card title="Jason Blog System" bordered={true} style={{width: 400}}>
                        <Input 
                            id="userName"
                            size="large"
                            placeholder="Enter your userName"
                            prefix={<UserOutlined style={{color:'rgba(0,0,0,.25)'}} />}
                            onChange={(e)=> setUserName(e.target.value)}
                        />
                        <br /><br />
                        <Input.Password 
                            id="password"
                            size="large"
                            placeholder="Enter your password"
                            prefix={<KeyOutlined style={{color:'rgba(0,0,0,.25)'}} />}
                            onChange={(e)=> setPassword(e.target.value)}
                        />
                        <br /> <br />
                        <Button type="primary" size="large" block onClick={handleCheckLogin}>Login in</Button>
                    </Card>

                </Spin>
            </div>
        </section>
    )
}
export default Login