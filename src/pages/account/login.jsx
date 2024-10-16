import { Form, Input, message, Checkbox, Button, Typography, theme } from "antd";
import { FORM_REQUIRED_RULE, PASSWORD_RGE, SYSTEM_NAME } from "@/utils/constants";
import { UserOutlined, LockOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import {
  getPublicKey as getPublicKeySever,
  login as loginSever,
} from "@/services/user";
import { getEncrypt, setLocalStorage } from "@/utils/utils";
import styles from "./index.less";
import { history, useDispatch, FormattedMessage,useIntl,useSelector} from "umi";
import { useEffect, useState } from "react";
import { getBaseUrl } from '@/services/request'
import img from '../../../src/assets/imges/login.png'
import img_title from '../../../src/assets/imges/login_title.png'
import { apigetPlantList,getDtu  } from '@/services/plant'

const { Title } = Typography;

const Login = () => {
  const { token } = theme.useToken();
  const dispatch = useDispatch();
  const [publicKey, setPublicKey] = useState('');
  const [codeImgUrl, setCodeImgUrl] = useState(`${getBaseUrl()}/user/getKaptchaImage`);
  const [showImg, setShowImg] = useState(false);
  const global = useSelector(state => state.global);
  const intl = useIntl();
  const t = (id) => {
      const msg = intl.formatMessage(
          {
              id,
          },
      );
      return msg
  }
  const changeCodeImgUrl = () => {
    setCodeImgUrl('');
    setTimeout(_ => (setCodeImgUrl(`http://192.168.1.42/api/user/getKaptchaImage`)
    ), 0);
  }
  const onFinish = async (values) => {
    if (publicKey) {
      const res = await loginSever({
        ...values,
        password: getEncrypt(publicKey, values.password),
        // clientType: 3,
        // remember: false,
        language:  global.locale === "zh-CN" ?1:3,
      });
      if (res?.data?.data) {
        const data = res?.data.data;
        setLocalStorage("Token", data?.token);
        // setLocalStorage("userName", data?.userName);
        // setLocalStorage("sceneType", data?.sceneType);
        message.success(t('登录成功'));
        dispatch({
          type: 'user/updateState',
          payload: {
            user: {
              ...res.data.data
            }
          }
        });
        getData();
  
      } else {
        message.error(res.data.msg);
      }
    }else{
      getPublicKey();
    }
   
  }
  const getData = async () => {
    const { data } = await apigetPlantList();
    localStorage.setItem('plantId',data?.data?.[0]?.plantId);
    const {data:dtu}=await getDtu({plantId:data?.data?.[0]?.plantId});
    localStorage.setItem('dtuId',dtu?.data?.id);
    
    history.push("/index/home");

}
  const getPublicKey = async () => {
    const res = await getPublicKeySever();
    if (res?.data?.data) {
      setPublicKey(res?.data?.data);
      localStorage.setItem('publicKey',res?.data?.data)
    }
  }

  useEffect(() => {
    getPublicKey();
  }, [])

  // const 
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        background: 'black',
        minHeight:'880px',
        minWidth:'1000px'
      }}
      className={styles.login}
    >
      <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover', verticalAlign: 'middle' }} />
      <img src={img_title} style={{ height: '30px', position: 'absolute', top: '80px', left: '80px' }} alt="" />
      <Title level={1} style={{ position: 'absolute', top: '80px', left: '80px', color: '#273667', fontFamily: 'DingTalkJinBuTi', fontSize: '64px' }}><FormattedMessage id="采日能源储能管理系统" /></Title>

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
            background: token.cardBgc,
            padding: '90px 50px 40px 50px',
            borderRadius: '24px',
          }}
        >
          <Title level={2} style={{ marginBottom: 50, color: token.titleColor }}><FormattedMessage id="欢迎登录!" /></Title>
          <Form
            onFinish={onFinish}
            autoComplete="off"
            style={{
              width: 350
            }}
          >
            <Form.Item
              name="userName"
              rules={[{ ...FORM_REQUIRED_RULE }]}
              style={{ marginBottom: 40 }}
            >
              <Input
                prefix={<UserOutlined style={{ fontSize: 15, color: '#73787F' }} />}
                placeholder={t("请输入账号")}
                style={{ height: 40 }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ ...FORM_REQUIRED_RULE },{...PASSWORD_RGE}]}
              style={{ marginBottom: 40 }}
            >
              <Input.Password
                prefix={<LockOutlined style={{ fontSize: 15, color: '#73787F' }} />}
                placeholder={t("请输入密码")}
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
                  placeholder={t("请输入验证码")}
                  style={{ height: 40, width: 200 }}
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
              <Checkbox>{t('记住密码')}</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%', height: 40 }}>
                {t("登录")}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login;