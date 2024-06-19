import { Outlet, useDispatch, useSelector, FormattedMessage, } from 'umi'
import React, { useState } from 'react';
import { theme, Layout, Dropdown, Button } from 'antd';
import MyMenu from "@/permissions/menu";
import { useEmotionCss } from '@ant-design/use-emotion-css';
import styles from "./baseLayout.less";
import { setLocalStorage, removeLocalStorage } from "@/utils/utils";
import useLocale from "@/hooks/useLocale"
import languageChineseSvg from "../assets/svg/language-chinese.svg";
import languageEnglishSvg from "../assets/svg/language-english.svg";
import mySvg from "../assets/svg/my.svg";
import {
    UserSwitchOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { history, useIntl } from "umi";
import useIcon from '../hooks/useIcon';
const { Header, Sider, Content } = Layout;

const BaseLayout = () => {
    const dispatch = useDispatch();
    const { token } = theme.useToken();
    const global = useSelector(state => state.global);
    const [collapsed, setCollapsed] = useState(false);
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
    const Icon = useIcon();
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

    return (
        <div className={styles.baseLayout}>
            <Layout className={styles.layout}>
                <Header className={styles.header}
                    style={{ background: token.bgcColorB_l }}
                >
                    <div
                        style={{
                            color: token.titleColor,
                            fontFamily: 'DingTalk'
                        }}
                        level={3}
                        className={styles.title}
                    >
                        <FormattedMessage id="采日能源储能管理系统" />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {
                            global.theme === "default" ?
                                <Icon

                                    type='icon-shense'
                                    // src={themeDefaultSvg}
                                    style={{ cursor: 'pointer', fontSize: "30px" }}
                                    onClick={() => changeTheme('dark')}
                                />
                                :
                                <Icon
                                    // src={themeDarkSvg}
                                    type='icon-qianse'
                                    style={{ cursor: 'pointer', fontSize: "30px", }}
                                    onClick={() => changeTheme('default')}
                                />
                        }
                        {
                            global.locale === "zh-CN" ?
                                <img
                                    src={languageEnglishSvg}
                                    style={{ cursor: 'pointer', margin: '0px 40px' }}
                                    onClick={() => changeLanguage('en-US')}
                                />
                                :
                                <img
                                    src={languageChineseSvg}
                                    style={{ cursor: 'pointer', margin: '0px 40px' }}
                                    onClick={() => changeLanguage('zh-CN')}
                                />
                        }
                        <Dropdown
                            placement="bottom"
                            menu={{
                                items: [
                                    {
                                        label: useLocale('退出登录'),
                                        key: 'logout',
                                        icon: <LogoutOutlined />,
                                    },
                                    {
                                        label: useLocale('切换电站'),
                                        key: 'changeAccount',
                                        icon: <UserSwitchOutlined />,
                                    },
                                ],
                                onClick({ key }) {
                                    if (key === "logout") {
                                        removeLocalStorage("Token");
                                        history.push('/login');
                                    }
                                    if (key === "changeAccount") {
                                        history.push('/largeScreen');
                                    }
                                }
                            }}
                        >
                            <img
                                src={mySvg}
                                style={{ cursor: 'pointer' }}
                            />
                        </Dropdown>
                    </div>
                </Header>
                <Layout hasSider>
                    <div style={{height:'100%',position:'relative', background: token.bgcColorB_l,}}>
                    <Sider className={siderContentStyle}
                        style={{ background: token.bgcColorB_l,  height: 'calc(100% - 94px)' }}
                        width={240}
                        trigger={null} collapsible collapsed={collapsed}>
                        <div className={styles.siderContent}>
                            <MyMenu />
                        </div>
                   
                    </Sider>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => {setCollapsed(!collapsed);localStorage.setItem('collased')}}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                            position: 'absolute',
                            bottom: '20px',
                            right: '10px'
                        }}
                    />
                    </div>
                    <Content className={styles.content}
                        style={{ background: token.bgcColorl_B }}>
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