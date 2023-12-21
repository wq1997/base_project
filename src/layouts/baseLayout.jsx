import { Outlet, useDispatch,useSelector, } from 'umi'
import React from 'react';
import { theme, Layout, Row, Avatar, Typography, Dropdown, Space } from 'antd';
import MyMenu from "@/permissions/menu";
import { useEmotionCss } from '@ant-design/use-emotion-css';
import styles from "./baseLayout.less";
import useIcon from "@/hooks/useIcon";
import { SYSTEM_NAME } from "@/utils/constants";


const { Header, Sider, Content } = Layout;

const BaseLayout = () => {
    const Icon = useIcon();
    const dispatch = useDispatch();
    const { token } = theme.useToken();
    const {user}=useSelector(function (state) {
        return state.user
    })
    const siderContentStyle=useEmotionCss(({token})=>{
        return{
            '.ant-menu-sub':{
                background:`${token.bgcColorl_B} !important`,
            }
        }
    })
    return (
        <div className={styles.baseLayout}>
            <Layout className={styles.layout}>
                <Header className={styles.header}
                style={{background:token.bgcColorB_l}}
                >
                    <div
                    style={{
                        color: token.titleColor
                    }} 
                    level={3} className={styles.title}>{`${SYSTEM_NAME}`}</div>
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
                                style={{ background: "url(https://lanhu-dds-backend.oss-cn-beijing.aliyuncs.com/merge_image/imgs/36ff3767198541a288770220fe886819_mergeImage.png)", verticalAlign: 'middle',width:'64px',height:'64px' }}
                                size="large"
                            >
                            </Avatar>
                            {/* <span style={{ fontSize: 20, color: 'white', marginLeft: 10 }}>aaa</span> */}
                        </Row>
                    </Dropdown>
                </Header>
                <Layout hasSider>
                    <Sider className={styles.sider}
                    style={{background:token.bgcColorB_l}}
                    width={240}>
                        <div className={styles.siderContent}>
                            <MyMenu />
                        </div>
                    </Sider>
                    <Content className={styles.content}
                     style={{background:token.bgcColorl_B}}>
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