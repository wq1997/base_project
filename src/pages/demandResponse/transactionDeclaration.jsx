import { Title, InvitationCard, StatisticalCard } from "@/components";
import { DatePicker, Space, Select, Row, Button, Table, InputNumber, Typography, Drawer } from "antd";
import styles from "./index.less";
import { useState } from "react";
import Assessment from "./components/assessment";
import Strategy from "./components/strategy";
import TargetLoad from "./components/targetLoad";
import dayjs from "dayjs";

const dateFormat = 'YYYY-MM-DD';

const TransactionDeclaration = () => {
    const [open, setOpen] = useState(false);
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
            label: '子用户收益',
            value: 6.496,
            unit: '万元'
        },
        {
            label: '聚合商收益',
            value: 2.784,
            unit: '万元'
        },
    ])

    const onClose = () => {
        setOpen(false);
    }

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
            <Row justify="space-between" align="middle" style={{margin: '10px 0'}}>
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
                                    <Typography.Link onClick={()=>setOpen(true)}>调整目标负荷</Typography.Link>
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
            <Drawer 
                title="调整申报" 
                placement="right"
                open={open}
                width={800}
                onClose={onClose}
                destroyOnClose
            >
                <Space direction="vertical" size={20} style={{width: '100%'}}>
                    <div>
                        <Title.PageSubTitle title={"调整子用户"} style={{marginBottom: '10px'}}/>
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
                    <div>
                        <Title.PageSubTitle title={"目标负荷"} style={{marginBottom: '10px'}}/>
                        <TargetLoad />
                    </div>
                    <div>
                        <Row justify="space-between" align="middle" style={{marginBottom: 10}}>
                            <Title.PageSubTitle title={"响应容量和目标负荷"} style={{marginBottom: '10px'}}/>
                            <Space>
                                <Button onClick={onClose}>取消</Button>
                                <Button onClick={onClose} type="primary">
                                    确定
                                </Button>
                            </Space>
                        </Row>
                        <Table
                            pagination={false}
                            dataSource={[
                                {
                                    key: 1,
                                    time: '08:00~09:00',
                                    a: 0,
                                    b: 2.323,
                                    c: 1.826,
                                    subDataSource: [
                                        {
                                            key: 1,
                                            time: '08:00~09:00',
                                            a: 0,
                                            b: 2.323,
                                            c: 1.826,
                                        }
                                    ]
                                },
                                {
                                    key: 2,
                                    time: '09:00~10:00',
                                    a: 1,
                                    b: 2,
                                    c: 1,
                                    subDataSource: [
                                        {
                                            key: 2,
                                            time: '09:00~10:00',
                                            a: 1,
                                            b: 2,
                                            c: 1,
                                        }
                                    ]
                                }
                            ]}
                            columns={[
                                {
                                    title: '时段',
                                    dataIndex: 'time',
                                    key: 'time',
                                },
                                {
                                    title: '最小响应容量(MW)',
                                    dataIndex: 'a',
                                    key: 'a',
                                },
                                {
                                    title: '最大响应容量(MW)',
                                    dataIndex: 'b',
                                    key: 'b',
                                },
                                {
                                    title: '最终申报(MW)',
                                    dataIndex: 'c',
                                    key: 'c',
                                },
                            ]}
                            expandable={{
                                expandedRowRender:(record)=>{
                                   return (
                                        <Table 
                                            pagination={false}
                                            dataSource={record?.subDataSource}
                                            columns={[
                                                {
                                                    title: '时间',
                                                    dataIndex: 'time',
                                                    key: 'time',
                                                },
                                                {
                                                    title: '基线负荷(MW)',
                                                    dataIndex: 'a',
                                                    key: 'a',
                                                },
                                                {
                                                    title: '运行日预测负荷(MW)',
                                                    dataIndex: 'b',
                                                    key: 'b',
                                                },
                                                {
                                                    title: '目标负荷(MW)',
                                                    dataIndex: 'c',
                                                    key: 'c',
                                                    render(value){
                                                        return <InputNumber defaultValue={value} />
                                                    }
                                                },
                                            ]}
                                        />
                                   )
                                },
                            }}
                        />
                    </div>
                </Space>
            </Drawer>
        </div>
    )
}

export default TransactionDeclaration;