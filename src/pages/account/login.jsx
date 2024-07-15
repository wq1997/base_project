import { Form, Input, message, Checkbox, Radio, Button, Typography, theme, Divider } from "antd";
import { FORM_REQUIRED_RULE, PASSWORD_RGE, SYSTEM_NAME } from "@/utils/constants";
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
    if (publicKeyRes?.data) {
      const publicKey = publicKeyRes?.data;
      const res = await loginSever({
        ...values,
        password: getEncrypt(publicKey, values.password),
        clientType: 21,
        remember: false,
        language,
      });
      if (res?.data?.data?.token) {
        const data = res?.data.data;
        setLocalStorage("Token", data?.token);
        setLocalStorage("userName", data?.userName);
        message.success(t('登录成功'));
        history.push("/index/device");
        dispatch({ type: 'user/getUserInfo' })
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
          width: 450,
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
            padding: '40px 60px 70px 60px',

          }}
        >
          <Divider style={{ fontSize: '32px', marginBottom: 0, color: '#fff' }}>欢迎登录</Divider>
          <p style={{ fontSize: '14px', textAlign: 'center', marginTop: 0 }}>WELCOME TO LOGIN</p>
          <Form
            onFinish={onFinish}
            autoComplete="off"
            style={{
              width: 320, marginTop: 70
            }}
          >
            <Form.Item
              name="userName"
              rules={[{ ...FORM_REQUIRED_RULE }]}
              style={{ marginBottom: 40 }}
            >
              <Input
                prefix={<UserOutlined style={{ fontSize: 15, color: '#73787F' }} />}
                placeholder={t("请输入") + ' ' + t('账号')}
                style={{ height: 40 }}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { ...FORM_REQUIRED_RULE },
                {
                  pattern: PASSWORD_RGE,
                  message: t('要求8-16个字符、由数字、字母、特殊字符三种中的两种组成')
                }
              ]}
              style={{ marginBottom: 40 }}
            >
              <Input.Password
                prefix={<LockOutlined style={{ fontSize: 15, color: '#73787F' }} />}
                placeholder={t("请输入") + ' ' + t('密码')}
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
                  placeholder={t("请输入") + ' ' + t('验证码')}
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
              <Checkbox>{t('记住密码')}</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%', height: 40 }}>
                {t('登录')}
              </Button>
            </Form.Item>
            <Form.Item label='Language' labelCol={10}>
              <Radio.Group name="radiogroup" defaultValue={language} onChange={changeLanguage}>
                <Radio value={3}>English</Radio>
                <Radio value={1}>中文</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </div>
      </div>
      <span className={styles.bottom}>{t('上海采日能源科技有限公司 - 沪ICP备')}<a style={{ textDecoration: 'none', color: 'inherit' }} href="https://beian.miit.gov.cn/" target="_blank">17053140</a>{t('号')}</span>
    </div>
  )
}

export default Login;