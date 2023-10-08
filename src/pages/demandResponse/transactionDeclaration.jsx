import { Title, InvitationCard, StatisticalCard } from "@/components";
import { DatePicker, Space, Select, Row, Button, Table, InputNumber, Typography } from "antd";
import styles from "./index.less";
import { useState } from "react";
import Assessment from "./components/assessment";
import Strategy from "./components/strategy";
import dayjs from "dayjs";

const dateFormat = 'YYYY-MM-DD';

const TransactionDeclaration = () => {
    const [invitationData, setInvitationData] = useState([
        {
            time: '09-17 18:00~22:00',
            isDeclaration: false,
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

    const [declarationData, setDeclarationData] = useState([
        {
            label: '预估响应总量',
            value: 110,
            unit: 'MWh'
        },
        {
            label: '可响应资源',
            value: 4,
            unit: '个'
        },
        {
            label: '申报总量',
            value: 90,
            unit: 'MWh'
        },
        {
            label: '预估响应收益',
            value: 9.28,
            unit: '万元'
        },
        {
            label: '代理用户收益',
            value: 6.496,
            unit: '万元'
        },
        {
            label: '聚合商收益',
            value: 2.784,
            unit: '万元'
        },
    ])

    return (
        <div className={styles.transactionDeclaration}>
            <Title.PageTitle title={"交易申报"} style={{marginTop: 0}} />
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
            <Row justify="space-between" align="middle" style={{marginBottom: 10}}>
                <Title.PageSubTitle title={"申报方案"} style={{marginBottom: '10px'}}/>
                <Button type="primary">提交申报</Button>
            </Row>
            <StatisticalCard dataSource={declarationData} />
            <div className={styles.dataForEcharts}>
                <div className={styles.left}>
                    <Title.PageSubTitle title={"总体申报策略"} style={{marginBottom: '10px'}}/>
                    <Strategy />
                </div>
                <div className={styles.right}>
                    <Title.PageSubTitle title={"能力评估"} style={{marginBottom: '10px'}}/>
                    <Assessment />
                </div>
            </div>
            <Row justify="space-between" align="middle" style={{marginBottom: 10}}>
                <Title.PageSubTitle title={"申报详情"} style={{marginBottom: '10px'}}/>
                <Button type="primary">确定</Button>
            </Row>
            <Table
                pagination={false}
                columns={[
                    {
                        title: '代理用户名称',
                        dataIndex: 'name',
                        key: 'name',
                    },
                    {
                        title: '响应时段',
                        dataIndex: 'time',
                        key: 'time',
                    },
                    {
                        title: '响应容量(MW)',
                        dataIndex: 'capacity',
                        key: 'capacity',
                    },
                    {
                        title: '响应价格(元/MWh)',
                        dataIndex: 'price',
                        key: 'price',
                        render(value){
                            return <InputNumber defaultValue={value} />
                        }
                    },
                    {
                        title: '操作',
                        dataIndex: "Action",
                        key: 'Action',
                        render(){
                            return (
                                <Space>
                                    <Typography.Link>跳转目标负荷</Typography.Link>
                                </Space>
                            )
                        }
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
        </div>
    )
}

export default TransactionDeclaration;