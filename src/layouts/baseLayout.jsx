import { Outlet, useDispatch } from 'umi'
import { useState } from "react";
import { Layout, Row, Avatar, Typography, Dropdown, Space, Form } from 'antd';
import { ChangePasswordModal } from "@/components";
import MyMenu from "@/permissions/menu";
import styles from "./baseLayout.less";
import useIcon from "@/hooks/useIcon"

const { Header, Sider, Content } = Layout;

const BaseLayout = () => {
    const Icon = useIcon();
    const dispatch = useDispatch();

    const [changePasswordForm] = Form.useForm();
    const [changePasswordVisible, setChangePasswordVisible] = useState(false);

    const onResetPassword = async () => {
        try {
            const values = await changePasswordForm.validateFields();
            console.log('Success:', values);
          } catch (errorInfo) {
            console.log('Failed:', errorInfo);
          }
    }

    const onCancel = () => {
        setChangePasswordVisible(false);
        changePasswordForm.resetFields();
    }

    return (
        <div className={styles.baseLayout}>
            <Layout className={styles.layout}>
                <Header className={styles.header}>
                    <Typography.Title level={3} className={styles.title}>采e通后台管理系统</Typography.Title>
                    <Dropdown 
                        menu={{ 
                            items: [
                                {
                                    key: 'changePassword',
                                    label: (
                                        <Space 
                                            size={10} 
                                            align="baseline"
                                            onClick={()=>{
                                                setChangePasswordVisible(true)
                                            }}
                                        >
                                            <Icon 
                                                type="icon-xiugaimima" 
                                                style={{
                                                    fontSize: 20,
                                                    position: 'relative',
                                                    top: 3
                                                }}
                                            />
                                            <span>修改密码</span>
                                        </Space>
                                    )
                                },
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
                                                    fontSize: 20,
                                                    position: 'relative',
                                                    top: 3
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
                            <span style={{fontSize: 20, color: 'white', marginLeft: 10}}>用户名</span>
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
            {
                changePasswordVisible&&
                <ChangePasswordModal 
                    title="修改密码"
                    form={changePasswordForm}
                    visible={changePasswordVisible}
                    onOk={onResetPassword}
                    onCancel={onCancel}
                />
            }
        </div>
    )
}

export default BaseLayout;