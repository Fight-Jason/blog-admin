import React , {useState} from 'react';
import 'antd/dist/antd.css';
import { Card, Input ,Button ,Spin } from 'antd';
import {
    UserOutlined,
    KeyOutlined
} from '@ant-design/icons';
import '../static/css/login.css'
function Login() :JSX.Element{
    const [userName , setUserName] = useState<string>();
    const [password , setPassword] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const checkLogin = ()=> {
        setIsLoading(true)
        setTimeout(()=> {
            setIsLoading(false)
        },1000)
    }
    return (
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
                    <Input 
                        id="password"
                        size="large"
                        placeholder="Enter your password"
                        prefix={<KeyOutlined style={{color:'rgba(0,0,0,.25)'}} />}
                        onChange={(e)=> setPassword(e.target.value)}
                    />
                    <br /> <br />
                    <Button type="primary" size="large" block onClick={checkLogin}>Login in</Button>
                </Card>

             </Spin>
        </div>
    )
}
export default Login