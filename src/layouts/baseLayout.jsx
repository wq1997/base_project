import { Outlet, useDispatch, useSelector, FormattedMessage, useLocation } from 'umi'
import React, { useState } from 'react';
import { theme as antdTheme, Layout, Dropdown, Button, Tooltip, Space, Flex } from 'antd';
import MyMenu from "@/permissions/menu";
import { useEmotionCss } from '@ant-design/use-emotion-css';
import styles from "./baseLayout.less";
import { setLocalStorage, removeLocalStorage, download, downLoadUrl } from "@/utils/utils";
import useLocale from "@/hooks/useLocale"
import cnDefault from "@/assets/imges/cnDefault.svg";
import cnDark from "@/assets/imges/cnDark.svg";
import enDefault from "@/assets/imges/enDefault.svg";
import enDark from "@/assets/imges/enDark.svg";
import LogoDark from "../../public/images/logo-light.png";
import LogoDefault from "../../public/images/logo-dark.png";
import {
    FilePdfOutlined,
    LogoutOutlined,
    SkinOutlined,
    QuestionCircleOutlined,
    HomeOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { history, useIntl } from "umi";
import UserModal from './UserModal';
import { useEffect } from 'react';

const { Header, Sider, Content } = Layout;

const BaseLayout = () => {
    const dispatch = useDispatch();
    const { token } = antdTheme.useToken();
    const global = useSelector(state => state.global);
    const { user } = useSelector(state => state.user);
    const [userModalOpen, setUserModalOpen] = useState(false);
    const location = useLocation();
    const { pathname } = location;

    const changeLanguage = (locale) => {
        setLocalStorage('locale', locale)
        dispatch({
            type: 'global/changeLanguage',
            payload: {
                locale
            }
        })
    }
    const changeTheme = (theme) => {
        setLocalStorage("theme", theme);
        dispatch({
            type: 'global/changeTheme',
            payload: {
                theme
            }
        })
    }
    const siderContentStyle = useEmotionCss(({ token }) => {
        return {
            height: '100%',
            width: '100%',
            overflowY: 'scroll',
            '&::-webkit-scrollbar': {
                display: 'none'
            },
            '.ant-menu-item': {
                fontFamily: 'PingFangRegular !important',
            },
            '.ant-menu-submenu-title': {
                fontFamily: 'PingFangRegular !important',

            },
            '.ant-menu-sub': {
                backgroundColor: `${token.titleCardBgc} !important`,
            },
            '.ant-menu-item-icon': {
                fontSize: '18px !important',
            }
        }
    });

    useEffect(() => {
        dispatch({ type: 'user/getUserInfo' });
    }, []);

    return (
        <div className={styles.baseLayout}>
            <Layout className={styles.layout}>
                <Header className={styles.header}
                    style={{ background: token.titleCardBgc }}
                >
                    <Flex align="center" gap={10}>
                        <img src={user?.systemLogo ? user?.systemLogo : (global.theme === "dark" ? LogoDark : LogoDefault)} style={{ height: '20px' }} />
                        <div className={styles.title}>
                            {user?.systemName || <FormattedMessage id="上海采日能源储能管理系统" />}
                        </div>
                    </Flex>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                        <Dropdown
                            placement="bottom"
                            menu={{
                                items: [
                                    {
                                        label: useLocale('导出使用说明'),
                                        key: 'ExportPdf',
                                        icon: <FilePdfOutlined />,
                                    },
                                ],
                                onClick({ key }) {
                                    if (key === "ExportPdf") {
                                        let fileName = global.locale === "zh-CN" ? '储能软件系统使用说明.pdf' : 'Energy storage software system instruction manual.pdf'
                                        download(downLoadUrl, fileName);
                                    }

                                }
                            }}
                        >
                            <QuestionCircleOutlined style={{ cursor: 'pointer', fontSize: '25px', color: token.iconColor }} />
                        </Dropdown>
                        <HomeOutlined
                            style={{
                                cursor: 'pointer',
                                color: token.iconColor,
                                fontSize: '25px'
                            }}
                            onClick={() => history.push('/index/device')}
                        />
                        <Tooltip title={useLocale('语言切换')} placement="bottom">
                            <img
                                style={{
                                    width: '27px',
                                    cursor: 'pointer'
                                }}
                                src={
                                    global.theme === 'default' ?
                                        (global.locale === "zh-CN" ? enDefault : enDark)
                                        :
                                        (global.locale === "zh-CN" ? cnDark : cnDefault)
                                }
                                onClick={() => changeLanguage(global.locale === "zh-CN" ? "en-US" : 'zh-CN')}
                            />
                        </Tooltip>
                        <Tooltip title={useLocale('主题切换')} placement="bottom" >
                            <SkinOutlined
                                style={{
                                    cursor: "pointer",
                                    fontSize: '25px',
                                    color: token.iconColor
                                }}
                                onClick={() => changeTheme(global.theme === "default" ? "dark" : "default")}
                            />
                        </Tooltip>
                        <Dropdown
                            placement="bottom"
                            menu={{
                                items: [
                                    {
                                        label: useLocale('个人中心'),
                                        key: 'userInfo',
                                        icon: <UserOutlined />,
                                    },
                                    {
                                        label: useLocale('退出登录'),
                                        key: 'logout',
                                        icon: <LogoutOutlined />,
                                    },
                                ],
                                onClick({ key }) {
                                    if (key === "userInfo") {
                                        setUserModalOpen(true);
                                    }
                                    if (key === "logout") {
                                        removeLocalStorage("Token");
                                        history.push('/login');
                                    }
                                }
                            }}
                        >
                            <UserOutlined style={{ cursor: 'pointer', fontSize: '25px', color: token.iconColor }} />
                        </Dropdown>
                    </div>
                </Header>
                <Layout hasSider>
                    {pathname.split('/')[1] === 'index' && <Sider className={siderContentStyle}
                        style={{ background: token.titleCardBgc }}
                        width={200}>
                        <div className={styles.siderContent}>
                            <MyMenu />
                        </div>
                    </Sider>}
                    <Content className={styles.content}
                        style={{ backgroundColor: token.layoutContentBgc, }}>
                        <div className={styles.inContent} style={{ backgroundColor: token.titleCardBgc }}>
                            <Outlet />
                        </div>
                    </Content>
                </Layout>
            </Layout>
            <UserModal open={userModalOpen} onClose={() => setUserModalOpen(false)} />
        </div>
    )
}

export default BaseLayout;