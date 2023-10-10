import { Title, InvitationCard, StatisticalCard } from "@/components";
import { DatePicker, Space, Select, Row, Button, Table, InputNumber, Typography, Drawer } from "antd";
import styles from "./index.less";
import { useState } from "react";
import dayjs from "dayjs";
import ResponseEvaluationChart from "./components/responseEvaluation";

const dateFormat = 'YYYY-MM-DD';

const ResponseEvaluation = () => {
    const [lookPlan, setLookPlan] = useState(false);
    const [detailOpen, setDetailOpen] = useState(false);
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

    const [responseResultData, setResponseResultData] = useState([
        {
            label: '中标容量',
            value: 29.75,
            unit: 'MWh'
        },
        {
            label: '实际响应容量',
            value: 29.25,
            unit: 'MWh'
        },
        {
            label: '有效响应容量',
            value: 28.32,
            unit: 'MWh'
        },
        {
            label: '响应收益',
            value: 7.93,
            unit: '万元'
        },
        {
            label: '子用户收益',
            value: 5.55,
            unit: '万元'
        },
        {
            label: '预估聚合商收益',
            value: 2.38,
            unit: '万元'
        },
    ])

    const onClose = () => {
        setDetailOpen(false);
        setLookPlan(false);
    }

    return (
        <div className={styles.responseEvaluation}>
            <Title.PageTitle title={"响应评价"} style={{marginTop: 0}} />
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
                <Title.PageSubTitle title={"响应结果"} style={{marginBottom: '10px'}}/>
                <Button type="primary" onClick={()=>setLookPlan(true)}>查看申报方案</Button>
            </Row>
            <StatisticalCard dataSource={responseResultData} />
            <div style={{margin: '20px 0'}}>
                <Title.PageSubTitle title={"子用户实际响应"} style={{marginBottom: '10px'}}/>
                <Table
                    pagination={false}
                    dataSource={[
                        {
                            key: 1,
                            name: '江苏海四达动力科技有限公司',
                            a: 2800,
                            b: 15.187,
                            c: 15.157,
                            d: 15.157,
                            e: 2.971,
                            f: 1.273
                        },
                        {
                            key: 2,
                            name: '江苏海四达新能源有限公司',
                            a: 2800,
                            b: 15.187,
                            c: 15.157,
                            d: 15.157,
                            e: 2.971,
                            f: 1.273
                        },
                        {
                            key: 3,
                            name: '连云港华乐不锈钢有限公司',
                            a: 2800,
                            b: 9.756,
                            c: 9.378,
                            d: 9.378,
                            e: 1.838,
                            f: 0.718
                        },
                        {
                            key: 4,
                            name: '苏州京浜光电科技有限公司',
                            a: 2800,
                            b: 4.243,
                            c: 4.711,
                            d: 3.785,
                            e: 0.742,
                            f: 0.318
                        }
                    ]}
                    columns={[
                        {
                            title: '子用户名称',
                            dataIndex: 'name',
                            key: 'name',
                        },
                        {
                            title: '中标价格(元/MWh)',
                            dataIndex: 'a',
                            key: 'a',
                        },
                        {
                            title: '中标容量(MWh)',
                            dataIndex: 'b',
                            key: 'b',
                        },
                        {
                            title: '实际响应(MWh)',
                            dataIndex: 'c',
                            key: 'c',
                        },
                        {
                            title: '有效响应(MWh)',
                            dataIndex: 'd',
                            key: 'd',
                        },
                        {
                            title: '子用户收益(万元)',
                            dataIndex: 'e',
                            key: 'e',
                        },
                        {
                            title: '聚合商收益(万元)',
                            dataIndex: 'f',
                            key: 'f',
                        }
                    ]}
                />
            </div>
            <div>
                <Title.PageSubTitle title={"响应评价"} style={{marginBottom: '10px'}}/>
                <Table
                    pagination={false}
                    dataSource={[
                        {
                            key: 1,
                            name: '江苏海四达动力科技有限公司',
                            b: 15.187,
                            c: 15.157,
                            d: 15.157,
                            e: 2.971,
                            f: 1.273
                        },
                        {
                            key: 2,
                            name: '江苏海四达新能源有限公司',
                            b: 15.187,
                            c: 15.157,
                            d: 15.157,
                            e: 2.971,
                            f: 1.273
                        },
                        {
                            key: 3,
                            name: '连云港华乐不锈钢有限公司',
                            b: 9.756,
                            c: 9.378,
                            d: 9.378,
                            e: 1.838,
                            f: 0.718
                        },
                        {
                            key: 4,
                            name: '苏州京浜光电科技有限公司',
                            b: 4.243,
                            c: 4.711,
                            d: 3.785,
                            e: 0.742,
                            f: 0.318
                        }
                    ]}
                    columns={[
                        {
                            title: '子用户名称',
                            dataIndex: 'name',
                            key: 'name',
                        },
                        {
                            title: '中标容量电量(MWh)',
                            dataIndex: 'b',
                            key: 'b',
                        },
                        {
                            title: '实际响应容量(MWh)',
                            dataIndex: 'c',
                            key: 'c',
                        },
                        {
                            title: '有效响应容量(MWh)',
                            dataIndex: 'd',
                            key: 'd',
                        },
                        {
                            title: '子用户收益(万元)',
                            dataIndex: 'e',
                            key: 'e',
                        },
                        {
                            title: '聚合商收益(万元)',
                            dataIndex: 'f',
                            key: 'f',
                        },
                        {
                            title: '操作',
                            dataIndex: "Action",
                            key: 'Action',
                            render(){
                                return (
                                    <Space>
                                        <Typography.Link onClick={()=>setDetailOpen(true)}>查看详情</Typography.Link>
                                    </Space>
                                )
                            }
                        }
                    ]}
                />
            </div>
            <Drawer
                title="响应详情" 
                placement="right"
                open={detailOpen}
                width={800}
                onClose={onClose}
                destroyOnClose
            >
                <Title.PageSubTitle title={"响应评价"} style={{marginBottom: 10}}/>
                <Select    
                    defaultValue={1}
                    style={{width: 280, marginBottom: 10}}
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
                <ResponseEvaluationChart />
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

export default ResponseEvaluation;