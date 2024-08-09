import { Outlet, useDispatch, useSelector } from "umi";
import { Layout, Row, Avatar, Button, Dropdown, Space, Tooltip } from "antd";
import { PROJECT_NAME } from "@/utils/constants";
import MyMenu from "@/permissions/menu";
import styles from "./baseLayout.less";
import useIcon from "@/hooks/useIcon";
import { useEffect, useState } from "react";
import logo from "../../public/logo.png";
import logoWhite from "../../public/logo_white.png";
import { theme as antdTheme } from "antd";
import { useEmotionCss } from '@ant-design/use-emotion-css';
import classNames from "classnames";
import {
    UserSwitchOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { setLocalStorage } from "@/utils/utils";

const { Header, Sider, Content } = Layout;

const BaseLayout = () => {
    const { token } = antdTheme.useToken();
    const Icon = useIcon();
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.user);
    const { theme } = useSelector(state => state.global);
    const [collapsed, setCollapsed] = useState(false);

    const changeTheme=(theme)=>{
        setLocalStorage("theme", theme);
        dispatch({
            type: 'global/changeTheme',
            payload:{
                theme
            }
        })
    }

    useEffect(() => {
        document.title = PROJECT_NAME;
        dispatch({
            type: "user/queryUser",
        });
    }, []);

    const headerStyle = useEmotionCss(() => {
        return {
            background: token.headerBackground,
        }
    })

    const siderStyle = useEmotionCss(() => {
        return {
            background: token.sideBackgroud,
            height: 'calc(100vh - 64px)'
        }
    });

    return (
        <div className={styles.baseLayout}>
            <Layout className={styles.layout}>
                <Header className={classNames(styles.header, headerStyle)}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                            src={theme === "default" ? logo : logoWhite}
                            style={{ height: "20px", marginRight: "10px" }}
                        />
                        <span className={styles.title}>{PROJECT_NAME}</span>
                    </div>
                    <Space size={20}>
                        <Tooltip title="主题切换" placement="bottom">
                            <Icon 
                                type="icon-zhuti"
                                style={{
                                    position: 'relative',
                                    top: 10,
                                    fontSize: 35,
                                    cursor: 'pointer',
                                    color: token.color6
                                }}
                                onClick={()=>changeTheme(theme==="default"?"dark": "default")}
                            />
                        </Tooltip>
                        <Dropdown
                            menu={{
                                items: [
                                    {
                                        key: "logout",
                                        label: (
                                            <Space
                                                size={10}
                                                align="baseline"
                                                onClick={() => {
                                                    console.log("onClick");
                                                    dispatch({ type: "user/logout" });
                                                }}
                                            >
                                                <Icon
                                                    type="icon-dengchu"
                                                    style={{
                                                        fontSize: 20,
                                                    }}
                                                />
                                                <span>登出</span>
                                            </Space>
                                        ),
                                    },
                                ],
                            }}
                            placement="bottom"
                        >
                            <Row align="middle">
                                <Avatar
                                    style={{ backgroundColor: "#F56A00", verticalAlign: "middle" }}
                                    size="large"
                                >
                                    CR
                                </Avatar>
                                <span style={{ fontSize: 20, marginLeft: 10 }}>
                                    {userInfo?.nickName}
                                </span>
                            </Row>
                        </Dropdown>
                    </Space>
                </Header>
                <Layout hasSider>
                    <div style={{ position: 'relative' }}>
                        <Sider
                            className={classNames(styles.sider, siderStyle)}
                            trigger={null}
                            collapsible
                            collapsed={collapsed}
                        >
                            <div className={styles.siderContent}>
                                <MyMenu />
                            </div>
                        </Sider>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => { setCollapsed(!collapsed) }}
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
                    <Content className={styles.content} style={{ background: token.contentBgColor }}>
                        <div className={styles.inContent} style={{ background: token.contentInnerBgColor }}>
                            <Outlet />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default BaseLayout;
