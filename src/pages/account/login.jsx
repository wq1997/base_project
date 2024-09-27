import { Form, Input, message, Checkbox, Radio, Button, Typography, theme, Divider } from "antd";
import { FORM_REQUIRED_RULE, PUBLIC_FILE_PATH, SYSTEM_NAME } from "@/utils/constants";
import { UserOutlined, LockOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import {
  getPublicKey as getPublicKeySever,
  login as loginSever,
} from "@/services/user";
import { getEncrypt, setLocalStorage, getLocalStorage } from "@/utils/utils";
import styles from "./index.less";
import { history, useDispatch, FormattedMessage, useIntl, useSelector } from "umi";
import { useEffect, useState } from "react";
import { getBaseUrl } from '@/services/request';
import img from '../../../src/assets/imges/bgimg.png'
const { Title } = Typography;

const Login = () => {
  const { token } = theme.useToken();
  const dispatch = useDispatch();
  const [codeImgUrl, setCodeImgUrl] = useState(`${getBaseUrl()}/user/getKaptchaImage`);
  const [showImg, setShowImg] = useState(false);
  const [language, setLanguage] = useState(localStorage.getItem('locale') == 'zh-CN' ? 1 : 3);

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
    setTimeout(_ => (setCodeImgUrl(`${getBaseUrl()}/user/getKaptchaImage`)
    ), 0);
  }
  const onFinish = async (values) => {
    const publicKeyRes = await getPublicKeySever();
    if(publicKeyRes?.data){
      const publicKey = publicKeyRes?.data;
      const res = await loginSever({
        ...values,
        password: getEncrypt(publicKey, values.password),
        clientType: 4,
        remember: false,
        language,
      });
      if (res?.data?.data?.token) {
        const data = res?.data.data;
        setLocalStorage("Token", data?.token);
        setLocalStorage("userName", data?.userName);
        message.success(t('登录成功'));
        history.push("/index/device");
        dispatch({
          type: 'user/updateState',
          payload: {
            user: {
              ...res.data.data
            }
          }
        })
      } else {
        message.error(res.data.msg);
        if (res?.data.code === '407') {
          setShowImg(true)
        }
      }
    }
  }

  const changeLanguage = (e) => {
    let locale = e.target.value == 1 ? 'zh-CN' : 'en-US';
    setLanguage(e.target.value);
    setLocalStorage('locale', locale);
    dispatch({
      type: 'global/changeLanguage',
      payload: {
        locale
      }
    })
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        background: `url(${img}) no-repeat`,
        backgroundSize: '100% 101%',
        backgroundAttachment: 'fixed',
      }}
      className={styles.login}
    >
      <Title className={styles.Title} level={1} ><FormattedMessage id="app.title" /></Title>
      <div
        style={{
          width: '23.437rem',
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          right: '10%'
        }}
      >
        <div
          className={styles.formCard}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            padding: '2.0833rem 3.125rem 3.6458rem 3.125rem',

          }}
        >
          <Divider style={{ fontSize: '1.6667rem', marginBottom: 0,color:'#fff' }}>欢迎登录</Divider>
          <p style={{ fontSize: '0.7292rem', textAlign: 'center', marginTop: 0 }}>WELCOME TO LOGIN</p>
          <Form
            onFinish={onFinish}
            autoComplete="off"
            style={{
              width: '16.6667rem', marginTop: '3.6458rem'
            }}
          >
            <Form.Item
              name="userName"
              rules={[{ ...FORM_REQUIRED_RULE }]}
              style={{ marginBottom: '2.0833rem' }}
            >
              <Input
                prefix={<UserOutlined style={{ fontSize: 15, color: '#73787F' }} />}
                placeholder={t("请输入") + ' ' + t('账号')}
                style={{ height: '2.0833rem' }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ ...FORM_REQUIRED_RULE }]}
              style={{ marginBottom: '2.0833rem' }}
            >
              <Input.Password
                prefix={<LockOutlined style={{ fontSize: '.7813rem', color: '#73787F' }} />}
                placeholder={t("请输入") + ' ' + t('密码')}
                style={{ height: '2.0833rem' }}
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
                  placeholder={t("请输入") + ' ' + t('验证码')}
                  style={{ height: '2.0833rem', width: '15.625rem' }}
                />
              </Form.Item>
              <img
                style={{ height: '1.9792rem', width:' 5.2083rem', position: 'absolute', top: 1, right: 0 }}
                src={codeImgUrl}
                onClick={changeCodeImgUrl} />
            </Form.Item>

            }

            <Form.Item
              name="remember"
              valuePropName="checked"
            >
              <Checkbox style={{fontSize:'.7292rem',color:'#fff'}}>{t('记住密码')}</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%', height: '2.0833rem',fontSize:'.7292rem' }}>
                {t('登录')}
              </Button>
            </Form.Item>
            <Form.Item label='Language' style={{color:'#fff'}}   labelCol={10} >
              <Radio.Group
               name="radiogroup" 
               defaultValue={language} 
               onChange={changeLanguage}
               >
                <Radio style={{color:'#fff'}} value={3}>English</Radio>
                <Radio style={{color:'#fff'}} value={1}>中文</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </div>
      </div>
      <span className={styles.bottom}>{t('上海采日能源科技有限公司 - 沪ICP备')}<a style={{textDecoration:'none',color: 'inherit'}} href="https://beian.miit.gov.cn/" target="_blank">17053140</a>{t('号')}</span>
    </div>
  )
}

export default Login;