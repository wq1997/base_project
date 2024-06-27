import { Outlet, useDispatch, useSelector,FormattedMessage,useLocation } from 'umi'
import React, { useEffect } from 'react';
import { theme, Layout, Dropdown,Button } from 'antd';
import MyMenu from "@/permissions/menu";
import { useEmotionCss } from '@ant-design/use-emotion-css';
import styles from "./baseLayout.less";
import { setLocalStorage, removeLocalStorage,download,downLoadUrl } from "@/utils/utils";
import useLocale from "@/hooks/useLocale"
import shouye from "../assets/svg/shouye.svg";
import down from "../assets/svg/down.svg";
import mySvg from "../assets/svg/mine.svg";
import {
    FilePdfOutlined,
    LogoutOutlined
  } from '@ant-design/icons';
  import { history, useIntl } from "umi";

const { Header, Sider, Content } = Layout;

const BaseLayout = () => {
    const dispatch = useDispatch();
    const { token } = theme.useToken();
    const global = useSelector(state => state.global);
    const location = useLocation();
    const { pathname } = location;
    useEffect(()=>{
        dispatch({type: 'user/getUserInfo'})
    },[])
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
            '.ant-menu-item':{
                fontFamily:'PingFangRegular !important',
            },
            '.ant-menu-submenu-title':{
                fontFamily:'PingFangRegular !important',
                
            },
            '.ant-menu-sub': {
                backgroundColor: `${token.sub_innerBgc} !important`,
                margin: '0 20px',
                borderRadius: '4px !important',
                fontSize: '16px !important',
                fontFamily:'PingFangRegular !important',
            },
            '.ant-menu-item-icon': {
                fontSize: '18px !important',
                fontFamily:'PingFangRegular !important',
            }

        }
    });

    const startIndex = pathname.split('/')[1]==='index';

    return (
        <div className={styles.baseLayout}>
            <Layout className={styles.layout}>
                <Header className={styles.header}
                    style={{ background: token.bgcColorB_l }}
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
                    <div style={{display:'flex',alignItems: 'center', }}>
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
                                onClick({key}){
                                    if(key==="ExportPdf"){
                                     let fileName= global.locale==="zh-CN"?'储能软件系统使用说明.pdf':'Energy storage software system instruction manual.pdf'
                                     download(downLoadUrl,fileName);
                                    }
                                   
                                }
                            }}
                        >
                          <img 
                                src={down} 
                                style={{cursor: 'pointer',}} 
                            />
                        </Dropdown>
                            <img 
                                src={shouye} 
                                style={{cursor: 'pointer',margin: '0px 40px'}} 
                                onClick={()=>history.push('/index/device')}
                            />
                        {/* {
                            global.locale==="zh-CN"?
                            <img 
                                src={languageEnglishSvg}
                                style={{cursor: 'pointer', margin: '0px 40px'}} 
                                onClick={()=>changeLanguage('en-US')}
                            />
                            :
                            <img 
                                src={languageChineseSvg}
                                style={{cursor: 'pointer', margin: '0px 40px'}} 
                                onClick={()=>changeLanguage('zh-CN')}
                            />
                        } */}
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
                                onClick({key}){
                                    if(key==="logout"){
                                        removeLocalStorage("Token");
                                        history.push('/login');
                                    }
                                    if(key==="changeAccount"){
                                        
                                    }
                                }
                            }}
                        >
                            <img 
                                src={mySvg} 
                                style={{cursor: 'pointer'}} 
                            />
                        </Dropdown>
                    </div>
                </Header>
                <Layout hasSider>
                   {startIndex&& <Sider className={siderContentStyle}
                        style={{ background: token.bgcColorB_l }}
                        width={240}>
                        <div className={styles.siderContent}>
                            <MyMenu />
                        </div>
                    </Sider>}
                    <Content className={styles.content}
                        style={{ 
                            background: startIndex&&token.bgcColorl_B,
                            margin: startIndex&&'8px'
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