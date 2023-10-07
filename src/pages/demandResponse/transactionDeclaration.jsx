import { Title, InvitationCard, StatisticalCard } from "@/components";
import { DatePicker, Space, Select, Row, Button } from "antd";
import styles from "./index.less";
import { useState } from "react";
import Assessment from "./components/assessment";
import Strategy from "./components/strategy";

const TransactionDeclaration = () => {
    const [invitationData, setInvitationData] = useState([
        {
            time: '10-08 08:00~10:00',
            isDeclaration: false,
            declarationType: '削峰',
            declarationCount: '100000',
            market: '上海现货市场',
            area: '全域',
            invitationCode: '2023100801',
            price: '3000'
        },
        {
            time: '10-08 08:00~10:00',
            isDeclaration: true,
            declarationType: '削峰',
            declarationCount: '100000',
            market: '上海现货市场',
            area: '全域',
            invitationCode: '2023100802',
            price: '3000'
        },
        {
            time: '10-08 10:00~12:00',
            isDeclaration: true,
            declarationType: '削峰',
            declarationCount: '100000',
            market: '上海现货市场',
            area: '全域',
            invitationCode: '2023100803',
            price: '3000'
        },
        {
            time: '10-09 09:00~11:00',
            isDeclaration: true,
            declarationType: '削峰',
            declarationCount: '100000',
            market: '上海现货市场',
            area: '全域',
            invitationCode: '2023100804',
            price: '3000'
        }
    ])

    const [declarationData, setDeclarationData] = useState([
        {
            label: '预估响应总量',
            value: 34.41,
            unit: 'MWh'
        },
        {
            label: '可响应资源',
            value: 18,
            unit: '个'
        },
        {
            label: '申报总量',
            value: 29.75,
            unit: 'MWh'
        },
        {
            label: '预估响应收益',
            value: 8.92,
            unit: '万元'
        },
        {
            label: '代理用户收益',
            value: 6.25,
            unit: '万元'
        },
        {
            label: '聚合商收益',
            value: 2.68,
            unit: '万元'
        },
    ])

    return (
        <div className={styles.transactionDeclaration}>
            <Title.PageTitle title={"交易申报"} style={{marginTop: 0}} />
            <Space style={{margin: '10px 0'}}>
                <DatePicker style={{width: 280}} />
                <Select 
                    placeholder="请选择现货市场"
                    style={{width: 280}} 
                    options={[
                        {
                            label: '上海现货市场',
                            value: 'SH'
                        },
                        {
                            label: '江苏现货市场',
                            value: 'JS'
                        }
                    ]}
                />
            </Space>
            <div className={styles.invitation}>
                <InvitationCard dataSource={invitationData} />
            </div>
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
            <Title.PageSubTitle title={"申报详情"} style={{marginBottom: '10px'}}/>
        </div>
    )
}

export default TransactionDeclaration;