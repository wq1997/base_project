import { Outlet, useDispatch } from 'umi'
import { Layout, Row, Avatar, Typography, Dropdown, Space, theme } from 'antd';
import MyMenu from "@/permissions/menu";
import styles from "./baseLayout.less";
import useIcon from "@/hooks/useIcon";

const { Header, Sider, Content } = Layout;

const BaseLayout = () => {
    const { token } = theme.useToken();

    const Icon = useIcon();
    const dispatch = useDispatch();
    return (
        <div className={styles.baseLayout}>
            <Layout className={styles.layout}>
                <Header className={styles.header}>
                    <Typography.Title 
                        level={3} 
                        className={styles.title}
                        style={{
                            color: token.colorPrimary
                        }}
                    >
                        采日VPP聚合平台
                    </Typography.Title>
                    <Dropdown 
                        menu={{ 
                            items: [
                                {
                                    key: 'logout',
                                    label: (
                                        <Space 
                                            size={10} 
                                            align="center"
                                            onClick={()=>dispatch({type: 'user/logout'})}
                                        >
                                            <Icon 
                                                type="icon-dengchu" 
                                                style={{
                                                    fontSize: 15
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
                                style={{ 
                                    backgroundColor: token.colorPrimary, 
                                    verticalAlign: 'middle',
                                    fontWeight: 700
                                }} 
                                size="large" 
                            >
                                A
                            </Avatar>
                            <span style={{fontSize: 20, color: token.colorPrimary, marginLeft: 10}}>Admin</span>
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