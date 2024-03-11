import { Card, Space, Typography, Tooltip, Divider, Row, Select, DatePicker, theme } from "antd";
import useIcon from "@/hooks/useIcon";
import { useState } from "react";
import { Title as MyTitle } from "@/components"
import dayjs from "dayjs";
import moment from "moment";
import TaskStaticsChart from "./TaskStaticsChart";
import TimeIncomeChart from "./TimeIncomeChart";
import styles from "./index.less";
import { useEmotionCss } from "@ant-design/use-emotion-css";

const { Title } = Typography;

const Overview = () => {
    const { token } = theme.useToken();
    const [dateType, setDateType] = useState('Year');
    const [date, setDate] = useState(dayjs(moment().format("YYYY")));
    const [companyAccountData, setCompanyAccountData] = useState([
        {
            label: '账户余额',
            data: 29661.58,
            color: token.color12
        },
        {
            label: '总收入金额(元)',
            data: 29661.58,
            color: token.color13
        },
        {
            label: '已到账总额(元)',
            data: 29661.58,
            color: token.color14
        }
    ])

    const [incomeStaticsData, setIncomeStaticsData] = useState([
        {
            label: '总收益(元)',
            data: 29661.58,
            color: token.color14
        },
        {
            label: '响应容量(KW)',
            data: 11921,
            color: token.color15
        },
        {
            label: '响应次数',
            data: 2,
            color: token.color16
        },
        {
            label: '响应成功率',
            data: '100%',
            color: token.color17
        }
    ])
    const Icon = useIcon();

    const onChangeDate = (_, dateStr) => {
        setDate(dayjs(dateStr));
    }

    const incomeCardStyle = useEmotionCss(()=>{
        return {
            padding: 16,
            marginBottom: 20,
            background: token.incomeOverviewCardColor
        }
    })

    return (
        <div>
            <div className={incomeCardStyle}>
                <div style={{ marginBottom: 15 }}>
                    <Space>
                        <MyTitle>公司账户</MyTitle>
                        <Tooltip title="本页面中展示收益均为采日平台根据公司记录所计算的预期收益，仅做参考使用">
                            <Icon
                                type="icon-bangzhu"
                                style={{
                                    fontSize: 20,
                                    cursor: 'pointer',
                                }}
                            />
                        </Tooltip>
                    </Space>
                </div>
                <div
                    style={{
                        display: 'flex',
                        gap: '8px'
                    }}
                >
                    {
                        companyAccountData?.map(item => {
                            return (
                                <div 
                                    style={{
                                        flex: 1,
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        boxShadow: '0px 2px 6px 0px rgba(176,185,210,0.4)',
                                        padding: '25px 24px'
                                    }}
                                >
                                    <div>
                                        <MyTitle.Description style={{ marginTop: 0, marginBottom: 5 }}>{item?.label}</MyTitle.Description>
                                        <Title level={6} style={{ margin: 0, color: item.color, fontFamily: 'DingTalkJinBuTi' }}>{item?.data}</Title>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div style={{ marginBottom: 20 }}>
                <Row align="middle" style={{marginLeft: 20}}>
                    <div>筛选条件：</div>
                    <Select
                        options={[
                            { value: 'Year', label: '年' },
                            { value: 'Month', label: '月' },
                        ]}
                        style={{ width: 100, marginRight: 20 }}
                        value={dateType}
                        onChange={value => setDateType(value)}
                    />
                    <DatePicker
                        onChange={onChangeDate}
                        picker={dateType.toLocaleLowerCase()}
                        value={date}
                    />
                </Row>
            </div>
            <div className={incomeCardStyle}>
                <MyTitle style={{ marginBottom: 15 }}>收益统计</MyTitle>
                <div
                    style={{
                        display: 'flex',
                        gap: '8px'
                    }}
                >
                    {
                        incomeStaticsData?.map(item => {
                            return (
                                <div 
                                    style={{
                                        flex: 1,
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        boxShadow: '0px 2px 6px 0px rgba(176,185,210,0.4)',
                                        padding: '25px 24px'
                                    }}
                                >
                                    <div>
                                        <MyTitle.Description style={{ marginTop: 0, marginBottom: 5 }}>{item?.label}</MyTitle.Description>
                                        <Title level={6} style={{ margin: 0, color: item.color, fontFamily: 'DingTalkJinBuTi' }}>{item?.data}</Title>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.contentLeft}>
                    <div className={incomeCardStyle}>
                        <MyTitle style={{ marginTop: 0, marginBottom: 35}}>充放量价统计</MyTitle>
                        <div className={styles.contentLeftItem}>
                            <div>
                                <Icon
                                    type="icon-jian"
                                    style={{
                                        fontSize: 20,
                                        cursor: 'pointer',
                                    }}
                                />
                            </div>
                            <div className={styles.contentLeftItemRight}>
                                <div className={styles.contentLeftItemRightItem}>
                                    <Title level={5} style={{ margin: 0, marginBottom: 15 }}>削峰响应功率：4625KW</Title>
                                    <Title level={5} style={{ margin: 0 }}>平均电价：10元/KW</Title>
                                </div>
                            </div>
                        </div>
                        <div className={styles.contentLeftItem} style={{ marginTop: 30 }}>
                            <div>
                                <Icon
                                    type="icon-jia1"
                                    style={{
                                        fontSize: 20,
                                        cursor: 'pointer',
                                    }}
                                />
                            </div>
                            <div className={styles.contentLeftItemRight}>
                                <div className={styles.contentLeftItemRightItem}>
                                    <Title level={5} style={{ margin: 0, marginBottom: 15 }}>填谷响应功率：7296KW</Title>
                                    <Title level={5} style={{ margin: 0 }}>平均电价：6.02元/KW</Title>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.contentRight}>
                    <div className={incomeCardStyle}>
                        <MyTitle style={{ marginTop: 0, marginBottom: 15}}>任务执行统计</MyTitle>
                        <div className={styles.contentRightChart}>
                            <TaskStaticsChart />
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ height: 370 }}>
                <MyTitle style={{ marginTop: 0, marginBottom: 15 }}>分时收益统计</MyTitle>
                <div style={{ height: 280 }}>
                    <TimeIncomeChart />
                </div>
            </div>
        </div>
    )
}

export default Overview;