import { Outlet, useDispatch, useSelector } from "umi";
import { Layout, Row, Avatar, Typography, Dropdown, Space, theme as antdTheme } from "antd";
import styles from "./commonLayout.less";
import useIcon from "@/hooks/useIcon";
import { useEffect } from "react";
import { useEmotionCss } from "@ant-design/use-emotion-css";
import { setLocalStorage } from "@/utils/utils";

const { Header, Sider, Content } = Layout;

const CommonLayout = props => {
    const { token } = antdTheme.useToken();
    const { theme } = useSelector(state => state.global);
    const { user } = useSelector(state => state.user);
    const Icon = useIcon();
    const dispatch = useDispatch();
    const { title, MyMenu } = props;
    useEffect(() => {
        document.title = title;
        dispatch({
            type: 'user/queryUser'
        })
    }, []);

    const changeTheme = theme => {
        setLocalStorage("theme", theme);
        dispatch({
            type: "global/changeTheme",
            payload: {
                theme,
            },
        });
    };

    const headerStyle = useEmotionCss(() => {
        return {
            padding: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 1,
            background: token.layoutTopBackColor,
            ".logo": {
                width: "143px",
                height: "15px",
                marginRight: "20px",
            },
            ".title": {
                margin: 0,
            },
        };
    });

    const siderStyle = useEmotionCss(() => {
        return {
            background: token.layoutLeftBackColor,
            ".siderContent": {
                height: "100%",
                width: "100%",
                overflowY: "scroll",
                "&::-webkit-scrollbar": {
                    display: "none",
                },
            },
            ".ant-menu-submenu-title": {
                color: "#fff !important",
                "&:hover": {
                    color: "#fff",
                },
            },
            ".ant-menu-item-selected": {
                background: 'linear-gradient( 270deg, rgba(7,47,59,0) 0%, #0ED7CF 100%)',
                ".anticon,a": {
                    color: "#fff",
                },
                "&:hover": {
                    color: "#fff",
                },
            },
        };
    });

    return (
        <div className={styles.baseLayout}>
            <Layout className={styles.layout}>
                <Header className={headerStyle}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        {/* <img src={logo} className={"logo"} /> */}
                        <Typography.Title
                            level={3}
                            className={"title"}
                            style={{
                                color: "#fff",
                                fontSize: "26px",
                                fontFamily:'DingTalk'
                            }}
                        >
                            {title}
                        </Typography.Title>
                    </div>
                    <Space size={40} align="center">
                        <Icon
                            type={theme === "default" ? "icon-qiansezhuti" : "icon-shensezhuti"}
                            style={{
                                fontSize: 23,
                                cursor: "pointer",
                                marginTop: 30,
                            }}
                            onClick={() => changeTheme(theme === "default" ? "dark" : "default")}
                        />
                        <Dropdown
                            menu={{
                                items: [
                                    {
                                        key: "logout",
                                        label: (
                                            <Space
                                                size={10}
                                                align="center"
                                                onClick={() => dispatch({ type: "user/logout" })}
                                            >
                                                <Icon
                                                    type="icon-dengchu"
                                                    style={{
                                                        fontSize: 15,
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
                                    style={{
                                        backgroundColor: token.colorPrimary,
                                        verticalAlign: "middle",
                                        fontWeight: 700,
                                    }}
                                    size="large"
                                >
                                    {user?.selfUser?.account?.substring(0, 1)?.toUpperCase()}
                                </Avatar>
                                <span
                                    style={{
                                        fontSize: 20,
                                        color: token.colorPrimary,
                                        marginLeft: 10,
                                    }}
                                >
                                    {user?.selfUser?.account}
                                </span>
                            </Row>
                        </Dropdown>
                    </Space>
                </Header>
                <Layout hasSider>
                    <Sider className={siderStyle} width={200}>
                        <div className={"siderContent"}>
                            <MyMenu />
                        </div>
                    </Sider>
                    <Content className={styles.content} style={{background: token.color14}}>
                        <div className={styles.inContent} style={{background: token.color12}}>
                            <Outlet />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default CommonLayout;
