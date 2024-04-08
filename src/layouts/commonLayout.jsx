import { Outlet, useDispatch, useSelector } from "umi";
import { Layout, Row, Avatar, Typography, Dropdown, Space, theme as antdTheme } from "antd";
import styles from "./commonLayout.less";
import useIcon from "@/hooks/useIcon";
import { useEffect } from "react";
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { setLocalStorage } from "@/utils/utils";

const { Header, Sider, Content } = Layout;

const CommonLayout = (props) => {
    const { token } = antdTheme.useToken();
    const { theme } = useSelector(state => state.global);
    const { user } = useSelector(state => state.user);
    const Icon = useIcon();
    const dispatch = useDispatch();
    const { title, MyMenu } = props;

    useEffect(()=>{
        document.title= title;
    }, [])

    const changeTheme=(theme)=>{
        setLocalStorage("theme", theme);
        dispatch({
            type: 'global/changeTheme',
            payload:{
                theme
            }
        })
    }

    const headerStyle = useEmotionCss(()=>{
        return {
            padding: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 1,
            background: token.layoutTopBackColor,
            '.logo': {
                width: '143px',
                height: '15px',
                marginRight: '20px'
            },
            '.title': {
                margin: 0
            }
        }
    })

    const siderStyle = useEmotionCss(() => {
        return {
            padding: '24px 0',
            background: token.layoutLeftBackColor,
            '.siderContent': {
                height: '100%', 
                width: '100%' ,
                overflowY: 'scroll', 
                '&::-webkit-scrollbar':{
                    display: 'none'
                }
            }
        }
    });

    return (
        <div className={styles.baseLayout}>
            <Layout className={styles.layout}>
                <Header 
                    className={headerStyle}
                >
                    <div style={{ display: "flex", alignItems: "center" }}>
                        {/* <img src={logo} className={"logo"} /> */}
                        <Typography.Title
                            className={"title"}
                            style={{
                                color: token.colorPrimary,
                                fontSize: "28px",
                                fontFamily: 'DingTalkJinBuTi',
                            }}
                        >
                            {title}
                        </Typography.Title>
                    </div>
                    <Space size={40} align="center">
                        <Icon
                            type={theme==="default"?"icon-qiansezhuti":"icon-shensezhuti"}
                            style={{
                                fontSize: 23,
                                cursor: "pointer",
                                marginTop: 30
                            }}
                            onClick={()=>changeTheme(theme==="default"?"dark": "default")}
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
                                onClick:(info) => {
                                    if(info?.key==="logout"){
                                        dispatch({ type: "user/logout" })
                                    }
                                }
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
                                    {user?.selfUser?.name?.[0]}
                                </Avatar>
                                <span
                                    style={{ fontSize: 20, color: token.colorPrimary, marginLeft: 10 }}
                                >
                                    {user?.selfUser?.name}
                                </span>
                            </Row>
                        </Dropdown>
                    </Space>
                </Header>
                <Layout hasSider>
                    <Sider 
                        className={siderStyle}
                        width={240}
                    >
                        <div className={'siderContent'}>
                            <MyMenu />
                        </div>
                    </Sider>
                    <Content className={styles.content}>
                        <div className={styles.inContent}>
                            <Outlet />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default CommonLayout;
