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
      <Title className={styles.Title} level={1} >
        {/* <FormattedMessage id="app.title" /> */}
        <FormattedMessage id="app.title1" />
      </Title>
      <div
        style={{
          width: 450,
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          right: '10%'
        }}
      >
       
      </div>
      <span className={styles.bottom}>{t('上海采日能源科技有限公司 - 沪ICP备')}<a style={{ textDecoration: 'none', color: 'inherit' }} href="https://beian.miit.gov.cn/" target="_blank">17053140</a>{t('号')}</span>
    </div>
  )
}

export default Login;