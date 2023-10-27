import { DatePicker, Space, Table, Typography } from "antd";
import { Header, Search } from "@/components";

const User = () => {
    return (
        <div>
            <Header 
                title={'用户管理'}
                description={"采日VPP聚合平台管理对当前平台所有用户统一管理"}
                actions={[
                    {
                        title: '+ 创建用户',
                    }
                ]}
            />
            <div
                style={{
                    'background-color': 'white',
                    'border-radius': '10px',
                    width: '100%',
                    'margin-top': '20px',
                    height: 'calc(100vh - 190px)',
                    padding:'20px'
                }}  
            >
                <Space style={{marginBottom: 20}}>
                    <Search placeholder="请输入关键字" />
                    <DatePicker placeholder="请输入创建时间" />
                </Space>
                <Table 
                    dataSource={[
                        {
                            a: 'CR202310181037',
                            b: '江苏海四达动力科技有限公司',
                            c: '启用',
                            d: '2023-10-18 10:39',
                            e: '江苏海四达动力科技有限公司',
                            f: '0513-83116047'
                        },
                        {
                            a: 'CR202310181038',
                            b: '江苏海四达新能源有限公司',
                            c: '启用',
                            d: '2023-10-18 12:12',
                            e: '江苏海四达新能源有限公司',
                            f: '0513-83355343'
                        },
                        {
                            a: 'CR202310181039',
                            b: '连云港华乐不锈钢有限公司',
                            c: '启用',
                            d: '2023-10-18 14:39',
                            e: '连云港华乐不锈钢有限公司',
                            f: '0518-86086538',
                        },
                        {
                            a: 'CR202310181040',
                            b: '苏州京浜光电科技有限公司',
                            c: '启用',
                            d: '2023-10-20 09:39',
                            e: '苏州京浜光电科技有限公司',
                            f: '0512-52857316'
                        }
                    ]}
                    columns={[
                        {
                            title: '用户ID',
                            dataIndex: 'a',
                            key: 'a',
                        },
                        {
                            title: '用户名',
                            dataIndex: 'e',
                            key: 'e',
                        },
                        {
                            title: '机构名称',
                            dataIndex: 'b',
                            key: 'b',
                        },
                        {
                            title: '联系方式',
                            dataIndex: 'f',
                            key: 'f',
                        },
                        {
                            title: '状态',
                            dataIndex: 'c',
                            key: 'c',
                        },
                        {
                            title: '创建时间',
                            dataIndex: 'd',
                            key: 'd',
                        },
                        {
                            title: '操作',
                            dataIndex: 'Action',
                            key: 'Action',
                            render(){
                                return (
                                    <Space>
                                        <Typography.Link>禁用</Typography.Link>
                                        <Typography.Link>删除</Typography.Link>
                                    </Space>
                                )
                            }
                        }
                    ]}
                />
            </div>
        </div>
    )
}

export default User;