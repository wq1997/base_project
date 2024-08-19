import { Outlet, useDispatch, useSelector, FormattedMessage, useLocation } from 'umi'
import React, { useEffect } from 'react';
import { theme as antdTheme, Layout, Dropdown, Tooltip } from 'antd';
import MyMenu from "@/permissions/menu";
import { useEmotionCss } from '@ant-design/use-emotion-css';
import styles from "./baseLayout.less";
import { setLocalStorage, removeLocalStorage, download, downLoadUrl } from "@/utils/utils";
import useLocale from "@/hooks/useLocale";
import {
    FilePdfOutlined,
    LogoutOutlined,
    SkinOutlined,
    QuestionCircleOutlined,
    HomeOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { history, useIntl } from "umi";
import useIcon from "@/hooks/useIcon";
import logo from "../../public/logo.png";
import logoWhite from "../../public/logo_white.png";

const { Header, Sider, Content } = Layout;

const BaseLayout = () => {
    const dispatch = useDispatch();
    const { token } = antdTheme.useToken();
    const global = useSelector(state => state.global);
    const location = useLocation();
    const { pathname } = location;

    useEffect(() => {
        dispatch({ type: 'user/getUserInfo' })
    }, [])

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
                backgroundColor: `${token.sub_innerBgc} !important`,
                margin: '0 20px',
                borderRadius: '4px !important',
                fontSize: '16px !important',
                fontFamily: 'PingFangRegular !important',
            },
            '.ant-menu-item-icon': {
                fontSize: '18px !important',
                fontFamily: 'PingFangRegular !important',
            }

        }
    });

    const startIndex = pathname.split('/')[1] === 'index';

    return (
        <div className={styles.baseLayout}>
            <Layout className={styles.layout}>
                <Header
                    className={styles.header}
                    style={{ background: token.bgcColorB_l }}
                >
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                            src={global?.theme === "default" ? logo : logoWhite}
                            style={{ height: "25px", marginRight: "10px" }}
                        />
                        <div 
                            style={{
                                background: token.titleColor,
                                width: '2px',
                                height: '28px',
                                margin: '0 15px'
                            }}
                        />
                        <div
                            style={{
                                color: token.titleColor
                            }}
                            level={3}
                            className={styles.title}
                        >
                            <FormattedMessage id="app.title" />
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0 40px' }}>
                        <Tooltip title={useLocale('主题切换')} placement="bottom">
                            <SkinOutlined
                                style={{
                                    cursor: "pointer",
                                    fontSize: 35,
                                    color: token.color1
                                }}
                                onClick={() => changeTheme(global.theme === "default" ? "dark" : "default")}
                            />
                        </Tooltip>
                        <Dropdown
                            placement="bottom"
                            menu={{
                                items: [
                                    {
                                        label: useLocale('导出使用说明'),
                                        key: 'ExportPdf',
                                        icon: <FilePdfOutlined style={{ color: token.color1 }} />,
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
                            <QuestionCircleOutlined style={{ cursor: 'pointer', fontSize: 35, color: token.color1 }} />
                        </Dropdown>
                        <HomeOutlined
                            style={{ cursor: 'pointer', fontSize: 35, color: token.color1 }}
                            onClick={() => history.push('/index/device')}
                        />
                        <Dropdown
                            placement="bottom"
                            menu={{
                                items: [
                                    {
                                        label: useLocale('退出登录'),
                                        key: 'logout',
                                        icon: <LogoutOutlined style={{ color: token.color1 }} />,
                                    },
                                ],
                                onClick({ key }) {
                                    if (key === "logout") {
                                        removeLocalStorage("Token");
                                        history.push('/login');
                                    }
                                    if (key === "changeAccount") {

                                    }
                                }
                            }}
                        >
                            <UserOutlined style={{ cursor: 'pointer', fontSize: 35, color: token.color1 }} />
                        </Dropdown>
                    </div>
                </Header>
                <Layout hasSider>
                    {startIndex && <Sider className={siderContentStyle}
                        style={{ background: token.bgcColorB_r }}
                        width={240}>
                        <div className={styles.siderContent}>
                            <MyMenu />
                        </div>
                    </Sider>}
                    <Content className={styles.content}
                        style={{
                            background: startIndex && token.bgcColorl_B,
                            margin: startIndex && '8px'
                        }}>
                        <div className={styles.inContent}>
                            <Outlet />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default BaseLayout;