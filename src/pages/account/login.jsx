import { Form, Input, message, Checkbox, Button, Typography, theme } from "antd";
import { FORM_REQUIRED_RULE, PUBLIC_FILE_PATH, SYSTEM_NAME } from "@/utils/constants";
import { UserOutlined, LockOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import {
  getPublicKey as getPublicKeySever,
  login as loginSever,
} from "@/services/user";
import { getEncrypt, setLocalStorage } from "@/utils/utils";
import styles from "./index.less";
import { history, useDispatch, FormattedMessage } from "umi";
import { useEffect, useState } from "react";
import { getBaseUrl } from '@/services/request'
import img from '../../../src/assets/imges/bgimg.png'
const { Title } = Typography;

const Login = () => {
  const { token } = theme.useToken();
  const dispatch = useDispatch();
  const [publicKey, setPublicKey] = useState('');
  const [codeImgUrl, setCodeImgUrl] = useState(`${getBaseUrl()}/user/getKaptchaImage`);
  const [showImg, setShowImg] = useState(false);

  const changeCodeImgUrl = () => {
    setCodeImgUrl('');
    setTimeout(_ => (setCodeImgUrl(`${getBaseUrl()}/user/getKaptchaImage`)
    ), 0);
  }
  const onFinish = async (values) => {
    const res = await loginSever({
      ...values,
      password: getEncrypt(publicKey, values.password),
      clientType: 3,
      remember: false,
      language: 1,
    });
    if (res?.data?.data?.token) {
      const data = res?.data.data;
      setLocalStorage("Token", data?.token);
      setLocalStorage("userName", data?.userName);
      setLocalStorage("sceneType", data?.sceneType);
      message.success('登录成功');
      dispatch({
        type: 'user/updateState',
        payload: {
          user: {
            ...res.data.data
          }
        }
      })
      history.push("/largeScreen");
    } else {
      message.error(res.data.msg);
      if (res?.data.code === '407') {
        setShowImg(true)
      } else {
      }
    }
  }

  const getPublicKey = async () => {
    const res = await getPublicKeySever();
    if (res?.data) {
      setPublicKey(res?.data)
    }
  }

  useEffect(() => {
    getPublicKey();
  }, [])
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        background: 'black'
      }}
      className={styles.login}
    >
      <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover', verticalAlign: 'middle' }} />
      <div
        style={{
          width: 600,
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          right: '10%'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            background:token.cardBgc,
            padding: '70px 30px',
            borderRadius: '24px',
          }}
        >
          <Title level={2} style={{ marginBottom: 50, color: token.colorPrimary }}><FormattedMessage id="app.title" /></Title>
          <Form
            onFinish={onFinish}
            autoComplete="off"
            style={{
              width: 450
            }}
          >
            <Form.Item
              name="userName"
              rules={[{ ...FORM_REQUIRED_RULE }]}
              style={{ marginBottom: 40 }}
            >
              <Input
                prefix={<UserOutlined style={{ fontSize: 15, color: '#73787F' }} />}
                placeholder="请输入账号"
                style={{ height: 40 }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ ...FORM_REQUIRED_RULE }]}
              style={{ marginBottom: 40 }}
            >
              <Input.Password
                prefix={<LockOutlined style={{ fontSize: 15, color: '#73787F' }} />}
                placeholder="请输入密码"
                style={{ height: 40 }}
              />
            </Form.Item>
            {showImg && <Form.Item
              style={{ position: 'relative' }}>
              <Form.Item
                name="keywords"
              // rules={[{ ...FORM_REQUIRED_RULE }]}
              >
                <Input
                  prefix={<ExclamationCircleOutlined style={{ fontSize: 15, color: '#73787F' }} />}
                  placeholder="请输入验证码"
                  style={{ height: 40, width: 300 }}
                />
              </Form.Item>
              <img
                style={{ height: 38, width: 100, position: 'absolute', top: 1, right: 0 }}
                src={codeImgUrl}
                onClick={changeCodeImgUrl} />
            </Form.Item>

            }

            <Form.Item
              name="remember"
              valuePropName="checked"
            >
              <Checkbox>记住密码</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%', height: 40 }}>
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