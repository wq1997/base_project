import { Outlet, useDispatch } from 'umi'
import { Layout, Row, Avatar, Typography, Dropdown, Space } from 'antd';
import { PROJECT_NAME } from "@/utils/constants";
import MyMenu from "@/permissions/menu";
import styles from "./baseLayout.less";
import useIcon from "@/hooks/useIcon"
import { useEffect } from 'react';

const { Header, Sider, Content } = Layout;

const BaseLayout = () => {
    const Icon = useIcon();
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = PROJECT_NAME;
    }, [])

    return (
        <div className={styles.baseLayout}>
            <Layout className={styles.layout}>
                <Header className={styles.header}>
                    <Typography.Title level={3} className={styles.title}>{PROJECT_NAME}</Typography.Title>
                    <Dropdown
                        menu={{
                            items: [
                                {
                                    key: 'logout',
                                    label: (
                                        <Space
                                            size={10}
                                            align="baseline"
                                            onClick={() => dispatch({ type: 'user/logout' })}
                                        >
                                            <Icon
                                                type="icon-dengchu"
                                                style={{
                                                    fontSize: 20
                                                }}
                                            />
                                            <span>登出</span>
                                        </Space>
                                    )
                                }
                            ]
                        }}
                        placement="bottom"
                    >
                        <Row align="middle">
                            <Avatar
                                style={{ backgroundColor: "#F56A00", verticalAlign: 'middle' }}
                                size="large"
                            >
                                C
                            </Avatar>
                            <span style={{ fontSize: 20, color: 'white', marginLeft: 10 }}>用户名</span>
                        </Row>
                    </Dropdown>
                </Header>
                <Layout hasSider>
                    <Sider className={styles.sider} width={240}>
                        <div className={styles.siderContent}>
                            <MyMenu />
                        </div>
                    </Sider>
                    <Content className={styles.content}>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default BaseLayout;