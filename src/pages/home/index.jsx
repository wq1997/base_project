import { PageTitle } from "@/components";
import useIcon from "@/hooks/useIcon";
import { theme, Divider } from "antd";
import { history } from "umi";

const list = [
    {
        title: '电价列表',
        icon: 'icon-duizhangdan',
        href: '/cet/businessData/electricityPrice'
    },
    {
        title: '政策信息',
        icon: 'icon-zhengcexinxi',
        href: '/cet/businessData/policyInformation'
    },
    {
        title: '投资测算',
        icon: 'icon-touzi',
        href: '/cet/businessData/investment'
    },
    {
        title: '用户管理',
        icon: 'icon-yonghuguanli',
        href: '/cet/userManage/userList'
    }
]
const Home = () => {
    const Icon = useIcon();
    const { token } = theme.useToken();
    return (
        <div>
            <PageTitle title="快捷导航" type="page" />
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 16
                }}
            >
                {
                    list.map(menu => {
                        return (
                            <div
                                style={{
                                    padding: 16,
                                    paddingTop: 60,
                                    border: '1px solid #D3D1D1',
                                    borderRadius: 8,
                                    textAlign: 'center',
                                    cursor: 'pointer'
                                }}
                                onClick={()=>history.push(menu.href)}
                            >
                                <Icon 
                                    type={menu.icon}
                                    style={{
                                        fontSize: 55,
                                        color: token.colorPrimary,
                                        marginBottom: 30
                                    }}
                                />
                                <Divider style={{margin: '10px 0'}}>
                                    <PageTitle title={menu.title} level={4} style={{color: '#525252'}} />
                                </Divider>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
} 

export default Home;