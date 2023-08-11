import { Form, Input, Checkbox, Button, Typography, theme } from "antd";
import { FORM_REQUIRED_RULE } from "@/utils/constants";
import backgroundImage from "@/assets/background.jpg";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from "./index.less";
import { history } from "umi";
const { Title } = Typography;

const Login = () => {
  const { token } = theme.useToken()
  const onFinish = (values) => {
    console.log(values);
    history.push("/cet/home")
  }
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        background: 'black'
      }}
      className={styles.login}
    >
      <img src={backgroundImage} style={{width: '100%', height: '100%', objectFit: 'cover', verticalAlign: 'middle' }} />
      <div
        style={{
          width: 600,
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          right: 200
        }}
      > 
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            background: '#ffffff40',
            padding: '70px 30px',
            borderRadius: 8
          }}
        >
          <Title level={2} style={{marginBottom: 50, color: token.colorPrimary}}>采e通后台管理系统</Title>
          <Form
            onFinish={onFinish}
            autoComplete="off"
            style={{
              width: 450
            }}
          >
            <Form.Item
              name="username"
              rules={[{...FORM_REQUIRED_RULE}]}
              style={{marginBottom: 40}}
            >
              <Input 
                prefix={<UserOutlined style={{ fontSize: 15, color: '#73787F'}}/>} 
                placeholder="请输入用户名"
                style={{height: 40}} 
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{...FORM_REQUIRED_RULE}]}
              style={{marginBottom: 40}}
            >
              <Input.Password 
                prefix={<LockOutlined style={{fontSize: 15, color: '#73787F'}}/>} 
                placeholder="请输入密码" 
                style={{height: 40}} 
              />
            </Form.Item>
            <Form.Item
              name="remember"
              valuePropName="checked"
            >
              <Checkbox>记住密码</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{width: '100%', height: 40}}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login;