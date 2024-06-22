import { Outlet, useDispatch, useSelector } from "umi";
import { Layout, Row, Avatar, Typography, Dropdown, Space, Image } from "antd";
import { PROJECT_NAME } from "@/utils/constants";
import MyMenu from "@/permissions/menu";
import styles from "./baseLayout.less";
import useIcon from "@/hooks/useIcon";
import { useEffect, useState } from "react";
import logo from "../../public/logo.png";
import { getUserInfo as getUserInfoServer } from "@/services/user";

const { Header, Sider, Content } = Layout;

const BaseLayout = () => {
    const Icon = useIcon();
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.user);

    useEffect(() => {
        document.title = PROJECT_NAME;
        dispatch({
            type: "user/queryUser",
        });
    }, []);

    return (
        <div className={styles.baseLayout}>
            <Layout className={styles.layout}>
                <Header className={styles.header}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                            src={logo}
                            style={{ width: "115px", height: "15px", marginRight: "15px" }}
                        />
                        <span className={styles.title}>{PROJECT_NAME}</span>
                    </div>
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
                </Header>
                <Layout hasSider>
                    <Sider className={styles.sider} width={180}>
                        <div className={styles.siderContent}>
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

export default BaseLayout;
