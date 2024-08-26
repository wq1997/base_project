import { Outlet, useDispatch, useSelector, FormattedMessage, useLocation } from 'umi'
import React, { useEffect } from 'react';
import { theme, Layout, Dropdown, Button, Tooltip } from 'antd';
import MyMenu from "@/permissions/menu";
import { useEmotionCss } from '@ant-design/use-emotion-css';
import styles from "./baseLayout.less";
import { setLocalStorage, removeLocalStorage, download, downLoadUrl } from "@/utils/utils";
import useLocale from "@/hooks/useLocale"
import cnDefault from "@/assets/imges/cnDefault.svg";
import cnDark from "@/assets/imges/cnDark.svg";
import enDefault from "@/assets/imges/enDefault.svg";
import enDark from "@/assets/imges/enDark.svg";
import {
    FilePdfOutlined,
    LogoutOutlined,
    SkinOutlined,
    QuestionCircleOutlined,
    HomeOutlined,
    UserOutlined,
    DribbbleOutlined,
} from '@ant-design/icons';
import { history, useIntl } from "umi";

const { Header, Sider, Content } = Layout;

const BaseLayout = () => {
    const dispatch = useDispatch();
    const { token } = theme.useToken();
    const global = useSelector(state => state.global);
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

    return (
        <div className={styles.baseLayout}>
            <Layout className={styles.layout}>
                <Header className={styles.header}
                    style={{ background: token.titleCardBgc }}
                >
                    <div
                        style={{
                            color: token.titleColor
                        }}
                        level={3}
                        className={styles.title}
                    >
                        <FormattedMessage id="app.title" />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', }}>
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
                            <QuestionCircleOutlined style={{ cursor: 'pointer', fontSize: 35, color: token.iconColor }} />
                        </Dropdown>
                        <HomeOutlined
                            style={{ cursor: 'pointer', fontSize: 35, color: token.iconColor,
                                margin: '0px 40px'

                             }}
                            onClick={() => history.push('/index/device')}
                        />
                        <Tooltip title={useLocale('语言切换')} placement="bottom">
                            <img
                                style={{
                                    width: 40,
                                    cursor: 'pointer'
                                }}
                                src={
                                    global.theme === 'default' ?
                                        (global.locale === "zh-CN" ? enDefault : enDark)
                                        :
                                        (global.locale === "zh-CN" ? cnDark : cnDefault)
                                }
                                onClick={() => changeLanguage(global.locale === "zh-CN" ? "zh-EN" : 'zh-CN')}
                            />
                        </Tooltip>
                        <Tooltip title={useLocale('主题切换')} placement="bottom" >
                            <SkinOutlined
                                style={{
                                    cursor: "pointer",
                                    fontSize: 35,
                                    color: token.iconColor,
                                    margin: '0px 40px'
                                }}
                                onClick={() => changeTheme(global.theme === "default" ? "dark" : "default")}
                            />
                        </Tooltip>
                        <Dropdown
                            placement="bottom"
                            menu={{
                                items: [
                                    {
                                        label: useLocale('退出登录'),
                                        key: 'logout',
                                        icon: <LogoutOutlined />,
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
                           <UserOutlined style={{ cursor: 'pointer', fontSize: 35, color: token.iconColor }} />
                        </Dropdown>
                    </div>
                </Header>
                <Layout hasSider>
                    {pathname.split('/')[1] === 'index' && <Sider className={siderContentStyle}
                        style={{ background: token.titleCardBgc }}
                        width={240}>
                        <div className={styles.siderContent}>
                            <MyMenu />
                        </div>
                    </Sider>}
                    <Content className={styles.content}
                        style={{backgroundColor:token.layoutContentBgc}}>
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