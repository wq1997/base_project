import { Title, InvitationCard, StatisticalCard } from "@/components";
import { DatePicker, Space, Select, Row, Button, Table, InputNumber, Typography, Drawer } from "antd";
import styles from "./index.less";
import { useState } from "react";
import dayjs from "dayjs";
import SuccessfulBidder from "./components/successfulBidder";

const dateFormat = 'YYYY-MM-DD';

const AwardIssuance = () => {
    const [adjustmentOpen, setAdjustmentOpen] = useState(false);
    const [lookPlan, setLookPlan] = useState(false);
    const [invitationData, setInvitationData] = useState([
        {
            time: '09-17 18:00~22:00',
            isDeclaration: true,
            declarationType: '削峰',
            declarationCount: '20',
            market: '江苏现货市场',
            area: '全域',
            invitationCode: '202309171800',
            price: '3000'
        },
        {
            time: '08-14 11:00~18:00',
            isDeclaration: true,
            declarationType: '削峰',
            declarationCount: '30',
            market: '江苏现货市场',
            area: '全域',
            invitationCode: '202308141100',
            price: '3000'
        },
        {
            time: '07-14 11:00~18:00',
            isDeclaration: true,
            declarationType: '削峰',
            declarationCount: '40',
            market: '江苏现货市场',
            area: '全域',
            invitationCode: '202307141100',
            price: '3000'
        },
        {
            time: '06-14 11:00~18:00',
            isDeclaration: true,
            declarationType: '削峰',
            declarationCount: '20',
            market: '江苏现货市场',
            area: '全域',
            invitationCode: '202306141100',
            price: '3000'
        }
    ])

    const [distributeData, setDistributeData] = useState([
        {
            label: '中标总电量',
            value: 110,
            unit: 'MWh'
        },
        {
            label: '中标用户',
            value: 4,
            unit: '个'
        },
        {
            label: '预估响应收益',
            value: 9,
            unit: '万元'
        },
        {
            label: '预估子用户收益',
            value: 6.28,
            unit: '万元'
        },
        {
            label: '预估聚合商收益',
            value: 2.784,
            unit: '万元'
        },
    ])

    const onClose = () => {
        setAdjustmentOpen(false);
        setLookPlan(false);
    }

    return (
        <div className={styles.awardIssuance}>
            <Title.PageTitle title={"中标下发"} style={{marginTop: 0}} />
            <div className={styles.invitation}>
                <InvitationCard dataSource={invitationData} />
            </div>
            <Space size={20} style={{marginBottom: 10}}>
                <DatePicker style={{width: 300}} defaultValue={dayjs('2023-08-14', dateFormat)} format={dateFormat} />
                <Select 
                    defaultValue={"JS"}
                    placeholder="请选择现货市场"
                    style={{width: 300}} 
                    options={[
                        {
                            label: '江苏现货市场',
                            value: 'JS'
                        }
                    ]}
                />
            </Space>
            <Row justify="space-between" align="middle" style={{margin: '10px 0'}}>
                <Title.PageSubTitle title={"下发策略"} style={{marginBottom: '10px'}}/>
                <div>
                    <Space>
                         <Button onClick={()=>setLookPlan(true)}>查看申报方案</Button>
                         <Button type="primary">中标下发</Button>
                    </Space>
                </div>
            </Row>
            <StatisticalCard dataSource={distributeData} />
            <div className={styles.echarts}>
                <Title.PageSubTitle title={"总体中标量"} style={{marginBottom: '10px'}}/>
                <SuccessfulBidder />
            </div>
            <div>
                <Title.PageSubTitle title={"中标详情"} style={{marginBottom: '10px'}}/>
                <Table
                    pagination={false}
                    dataSource={[
                        {
                            key: 1,
                            name: '江苏海四达动力科技有限公司',
                            a: '09:00~10:00',
                            b: 2,
                            c: 1.8,
                            d: 3.112,
                            e: 1.21
                        },
                        {
                            key: 2,
                            name: '江苏海四达新能源有限公司',
                            a: '09:00~10:00',
                            b: 2,
                            c: 1.8,
                            d: 3.112,
                            e: 1.21
                        },
                        {
                            key: 3,
                            name: '连云港华乐不锈钢有限公司',
                            a: '09:00~10:00',
                            b: 2,
                            c: 1.8,
                            d: 3.112,
                            e: 1.21
                        },
                        {
                            key: 4,
                            name: '苏州京浜光电科技有限公司',
                            a: '09:00~10:00',
                            b: 2,
                            c: 1.8,
                            d: 3.112,
                            e: 1.21
                        }
                    ]}
                    columns={[
                        {
                            title: '子用户名称',
                            dataIndex: 'name',
                            key: 'name',
                        },
                        {
                            title: '中标时段',
                            dataIndex: 'a',
                            key: 'a',
                        },
                        {
                            title: '中标容量(MW)',
                            dataIndex: 'b',
                            key: 'b',
                        },
                        {
                            title: '出清价格(元/MWh)',
                            dataIndex: 'c',
                            key: 'c',
                        },
                        {
                            title: '子用户收益(万元)',
                            dataIndex: 'd',
                            key: 'd',
                        },
                        {
                            title: '聚合商收益(万元)',
                            dataIndex: 'e',
                            key: 'e',
                        },
                        {
                            title: '操作',
                            dataIndex: "Action",
                            key: 'Action',
                            render(){
                                return (
                                    <Space>
                                        <Typography.Link onClick={()=>setAdjustmentOpen(true)}>下发策略调整</Typography.Link>
                                    </Space>
                                )
                            }
                        }
                    ]}
                />
            </div>
            <Drawer
                title="下发策略调整" 
                placement="right"
                open={adjustmentOpen}
                width={800}
                onClose={onClose}
                destroyOnClose
            >
                <div style={{marginBottom: 20}}>
                    <Title.PageSubTitle title={"调整子用户"} style={{marginBottom: 10}}/>
                    <Select    
                        defaultValue={1}
                        style={{width: 280}}
                        options={[
                            {
                                label: '江苏海四达动力科技有限公司',
                                value: 1
                            },
                            {
                                label: '江苏海四达新能源有限公司',
                                value: 2
                            },
                            {
                                label: '连云港华乐不锈钢有限公司',
                                value: 3
                            },
                            {
                                label: '苏州京浜光电科技有限公司',
                                value: 4
                            }
                        ]}
                    />
                </div>
                <Row justify="space-between" align="middle" style={{margin: '10px 0'}}>
                    <Title.PageSubTitle title={"调度负荷分解(MW)"}/>
                    <Button type="primary">更新运行策略</Button>
                </Row>
                <Table 
                    pagination={false}
                    columns={[
                        {
                            title: '时段',
                            dataIndex: 'a',
                            key: 'a',
                        },
                        {
                            title: '用户中标容量',
                            dataIndex: 'b',
                            key: 'b',
                        },
                        {
                            title: '储能负荷',
                            dataIndex: 'c',
                            key: 'c',
                            render(value){
                                return <InputNumber defaultValue={value} />
                            }
                        },
                        {
                            title: '可调负荷',
                            dataIndex: 'd',
                            key: 'd',
                        }
                    ]}
                    dataSource={[
                        {
                            a: '08:00~09:00',
                            b: 5.240,
                            c: 4.35,
                            d: 0.262
                        },
                        {
                            a: '09:00~10:00',
                            b: 5.240,
                            c: 4.35,
                            d: 0.262
                        }
                    ]}
                />
            </Drawer>
            <Drawer
                title="申报方案" 
                placement="right"
                open={lookPlan}
                width={800}
                onClose={onClose}
                destroyOnClose
            >
                <StatisticalCard 
                    title="核心数据"
                    dataSource={[
                        {
                            label: '预估响应总量',
                            value: 34.31,
                            unit: 'MWh'
                        },
                        {
                            label: '可响应子用户',
                            value: 4,
                            unit: '个'
                        },
                        {
                            label: '申报总量',
                            value: 27.75,
                            unit: 'MWh'
                        },
                        {
                            label: '预估响应收益',
                            value: 8.92,
                            unit: '万元'
                        },
                        {
                            label: '子用户收益',
                            value: 6.92,
                            unit: '万元'
                        },
                        {
                            label: '聚合商收益',
                            value: 2,
                            unit: '万元'
                        },
                    ]} 
                    statisticalStyle={{
                        display: 'grid',
                        'grid-template-columns': 'repeat(3, 1fr)',
                        gap: '20px',
                        marginLeft: 10
                    }}
                    cardStyle={{
                        padding: 0
                    }}
                />
                <Title.PageSubTitle title={"申报详情"} style={{margin: '20px 0'}}/>
                <Table
                    pagination={false}
                    columns={[
                        {
                            title: '子用户名称',
                            dataIndex: 'name',
                            key: 'name',
                        },
                        {
                            title: '响应时段',
                            dataIndex: 'time',
                            key: 'time',
                        },
                        {
                            title: '可响应容量(MW)',
                            dataIndex: 'capacity',
                            key: 'capacity',
                        },
                        {
                            title: '响应价格(元/MWh)',
                            dataIndex: 'price',
                            key: 'price'
                        }
                    ]}
                    dataSource={[
                        {
                            name: '江苏海四达动力科技有限公司',
                            time: '11:00 ~ 12:00',
                            capacity: 2,
                            price: 2000
                        },
                        {
                            name: '江苏海四达新能源有限公司',
                            time: '11:00 ~ 12:00',
                            capacity: 1,
                            price: 2000
                        },
                        {
                            name: '连云港华乐不锈钢有限公司',
                            time: '11:00 ~ 12:00',
                            capacity: 1,
                            price: 2000
                        },
                        {
                            name: '苏州京浜光电科技有限公司',
                            time: '11:00 ~ 12:00',
                            capacity: 2,
                            price: 4000
                        }
                    ]}
                />
            </Drawer>
        </div>
    )
}

export default AwardIssuance;