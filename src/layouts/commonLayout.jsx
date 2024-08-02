import { Outlet, useDispatch, useSelector, history } from "umi";
import {
    Layout,
    Row,
    Avatar,
    Typography,
    Dropdown,
    Space,
    theme as antdTheme,
    Select,
    Badge,
} from "antd";
import styles from "./commonLayout.less";
import useIcon from "@/hooks/useIcon";
import { useEffect, useState } from "react";
import { useEmotionCss } from "@ant-design/use-emotion-css";
import { setLocalStorage } from "@/utils/utils";
import { getNotificationCount as getNotificationCountServe } from "@/services";
import { useRequest } from "ahooks";
import notificationImg from "../../public/images/notification.svg";
import themeImg from "../../public/images/theme.svg";

const { Header, Sider, Content } = Layout;

const CommonLayout = props => {
    const { token } = antdTheme.useToken();
    const { theme } = useSelector(state => state.global);
    const [count, setCount] = useState(0);
    const { user, currentCompanyCode } = useSelector(state => state.user);
    const Icon = useIcon();
    const dispatch = useDispatch();
    const { title, MyMenu } = props;

    const {
        data: result,
        run,
        cancel,
    } = useRequest(getNotificationCountServe, {
        manual: true,
        pollingInterval: 1000 * 60 * 5,
        refreshDeps: [theme],
    });

    useEffect(() => {
        if (result?.data?.status === "SUCCESS") {
            setCount(result?.data?.data);
        }
    }, [result]);

    useEffect(() => {
        run();
        document.title = title;
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
            padding: "24px 0",
            background: token.layoutLeftBackColor,
            ".siderContent": {
                height: "100%",
                width: "100%",
                overflowY: "scroll",
                "&::-webkit-scrollbar": {
                    display: "none",
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
                            className={"title"}
                            style={{
                                color: token.colorPrimary,
                                fontSize: "28px",
                                fontFamily: "DingTalkJinBuTi",
                            }}
                        >
                            {title}
                        </Typography.Title>
                    </div>
                    <Space size={40} align="center">
                        {/* {
                            user?.aggregator&&
                            <Select 
                                style={{width: 300}}
                                options={[
                                    {value: '', label: "所有公司"},
                                    ...user?.companies?.map(item => {
                                        return {
                                            value: item?.code,
                                            label: item?.name
                                        }||[]
                                    })
                                ]}
                                value={currentCompanyCode}
                                onChange={value => {
                                    localStorage.setItem('currentCompanyCode', value);
                                    window.location.reload(); 
                                    setTimeout(()=>{
                                        dispatch({
                                            type: 'user/updateState',
                                            payload: {
                                                currentCompanyCode: value
                                            }
                                        })
                                    }, 0.2 * 1000)
                                }}
                            />
                        } */}
                        <Avatar
                            src={themeImg}
                            style={{ cursor: "pointer" }}
                            onClick={() => changeTheme(theme === "default" ? "dark" : "default")}
                        />
                        <Badge dot={count > 0}>
                            <Avatar
                                src={notificationImg}
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    history.push("/vpp/setting/notification");
                                }}
                            />
                        </Badge>
                        <Dropdown
                            menu={{
                                items: [
                                    {
                                        key: "logout",
                                        label: (
                                            <Space size={10} align="center">
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
                                onClick: info => {
                                    if (info?.key === "logout") {
                                        dispatch({ type: "user/logout" });
                                    }
                                },
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
                                    style={{
                                        fontSize: 20,
                                        color: token.colorPrimary,
                                        marginLeft: 10,
                                    }}
                                >
                                    {user?.selfUser?.name}
                                </span>
                            </Row>
                        </Dropdown>
                    </Space>
                </Header>
                <Layout hasSider>
                    <Sider className={siderStyle} width={240}>
                        <div className={"siderContent"}>
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
