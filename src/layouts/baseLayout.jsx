import { Outlet, useDispatch } from 'umi'
import { Layout, Row, Avatar, Typography, Dropdown, Space } from 'antd';
import MyMenu from "@/permissions/menu";
import styles from "./baseLayout.less";
import useIcon from "@/hooks/useIcon";
import { SYSTEM_NAME } from "@/utils/constants";


const { Header, Sider, Content } = Layout;

const BaseLayout = () => {
    const Icon = useIcon();
    const dispatch = useDispatch();
    return (
        <div className={styles.baseLayout}>
            <Layout className={styles.layout}>
                <Header className={styles.header}>
                    <Typography.Title level={3} className={styles.title}>{`${SYSTEM_NAME}`}</Typography.Title>
                    <Dropdown 
                        menu={{ 
                            items: [
                                {
                                    key: 'logout',
                                    label: (
                                        <Space 
                                            size={10} 
                                            align="baseline"
                                            onClick={()=>dispatch({type: 'user/logout'})}
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
                                aaa
                            </Avatar>
                            <span style={{fontSize: 20, color: 'white', marginLeft: 10}}>aaa</span>
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