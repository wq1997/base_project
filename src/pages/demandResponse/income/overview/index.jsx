import { Card, Space, Typography, Tooltip, Row, Select, DatePicker, theme as antdTheme, Badge } from "antd";
import useIcon from "@/hooks/useIcon";
import { useState, useEffect } from "react";
import { Title as MyTitle, StaticsCard } from "@/components"
import dayjs from "dayjs";
import moment from "moment";
import TaskStaticsChart from "./TaskStaticsChart";
import TimeIncomeChart from "./TimeIncomeChart";
import styles from "./index.less";
import { useEmotionCss } from "@ant-design/use-emotion-css";
import { useSelector } from "umi";
import xuefengImg from "../../../../../public/images/xuefeng.svg";
import tianguImg from "../../../../../public/images/tiangu.svg";
import { 
    getOverviewIncome as getOverviewIncomeServe,
} from "@/services/income";

const Overview = () => {
    const { token } = antdTheme.useToken();
    const [dateType, setDateType] = useState('Year');
    const [date, setDate] = useState(dayjs(moment().format("YYYY")));
    const { theme } = useSelector(state => state.global);
    const [data, setData] = useState(null);
    const [companyAccountData, setCompanyAccountData] = useState([
        {
            label: '账户余额',
            data: 0,
            color: token.color12,
            icon: 'icon-zhanghuyue'
        },
        {
            label: '总收入金额(元)',
            data: 0,
            color: token.color13,
            icon: 'icon-zongshourujine'
        },
        {
            label: '已到账总额(元)',
            data: 0,
            color: token.color14,
            icon: 'icon-yidaozhangzonge'
        }
    ])

    const [incomeStaticsData, setIncomeStaticsData] = useState([
        {
            icon: 'icon-zongshouyi1',
            label: '总收益(元)',
            data: 0,
            color: token.color14
        },
        {
            icon: 'icon-xiangyingrongliang',
            label: '响应功率(KW)',
            data: 0,
            color: token.color15
        },
        {
            icon: 'icon-xiangyingcishu',
            label: '响应次数',
            data: 0,
            color: token.color16
        },
        {
            icon: 'icon-xiangyingchenggongshuai1',
            label: '响应成功率',
            data: 0,
            color: token.color17
        }
    ])
    const Icon = useIcon();

    const onChangeDate = (_, dateStr) => {
        setDate(dayjs(dateStr));
    }

    const getOverviewIncome = async () => {
        let params = {};
        if(dateType==="Year"){
            params={
                year: dayjs(date).year()
            }
        }else{
            params={
                year: dayjs(date).year(),
                month: dayjs(date).month() + 1
            }
        }
        const res = await getOverviewIncomeServe(params)
        if(res?.data?.data){
            const cloneCompanyAccountData = JSON.parse(JSON.stringify(companyAccountData));
            cloneCompanyAccountData[0].data = res?.data?.data?.fullAccountBalance;
            cloneCompanyAccountData[1].data = res?.data?.data?.fullTotalIncomeAmount;
            cloneCompanyAccountData[2].data = res?.data?.data?.fullTotalReceivedAmount;

            const cloneIncomeStaticsData = JSON.parse(JSON.stringify(incomeStaticsData));
            cloneIncomeStaticsData[0].data = res?.data?.data?.totalProfit;
            cloneIncomeStaticsData[1].data = res?.data?.data?.responseCapacity;
            cloneIncomeStaticsData[2].data = res?.data?.data?.responseCount;
            cloneIncomeStaticsData[3].data = res?.data?.data?.successRate;

            setCompanyAccountData(cloneCompanyAccountData);
            setIncomeStaticsData(cloneIncomeStaticsData);
            setData(res?.data?.data);
        }
    }

    useEffect(()=>{
        getOverviewIncome();
    }, [date, dateType])

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
                        gap: '8px',
                        height: 140
                    }}
                >
                    {
                        companyAccountData?.map(item => {
                            return (
                                <div 
                                    style={{
                                        flex: 1,
                                        boxShadow: theme==="default" && '0px 2px 6px 0px rgba(176,185,210,0.4)',
                                    }}
                                >
                                    <StaticsCard 
                                        icon={item.icon}
                                        color={item.color}
                                        label={item.label}
                                        value={item.data}
                                        backgroundColor={token.color22}
                                    />
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
                        onChange={value => {
                            if(value==="Year"){
                                setDate(dayjs(moment(date).format("YYYY")));
                            }else{
                                setDate(dayjs(moment(date).format("YYYY-MM")))
                            }
                            setDateType(value);
                        }}
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
                        gap: '8px',
                        height: 140
                    }}
                >
                    {
                        incomeStaticsData?.map(item => {
                            return (
                                <div 
                                    style={{
                                        flex: 1,
                                        boxShadow: theme==="default" &&'0px 2px 6px 0px rgba(176,185,210,0.4)',
                                    }}
                                >
                                    <StaticsCard 
                                        icon={item.icon}
                                        color={item.color}
                                        label={item.label}
                                        value={item.data}
                                        backgroundColor={token.color22}
                                    />
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
                        <div
                            style={{
                                display: 'flex'
                            }}
                        >
                            <div className={styles.contentLeftItem}>
                                <div className={styles.contentLeftItemLeft}>
                                        <img src={xuefengImg} />
                                </div>
                                <div className={styles.contentLeftItemRight}>
                                    <div className={styles.contentLeftItemRightItem}>
                                        <div style={{marginBottom: 36}}>
                                            <Badge 
                                                color={token.colorPrimary} 
                                                text={<span style={{color: '#333', fontSize: 18, fontFamily: 'PingFangSemiblod', color: token.color11}}>削峰响应功率：</span>} 
                                            />
                                            
                                            <div style={{marginLeft: 15, marginTop: 8}}>
                                                <span style={{fontFamily: 'DingTalkJinBuTi', color:token.colorPrimary, fontSize: 32}}>{data?.heightPeakCutPower || 0}</span>
                                                <span>kW</span>
                                            </div>
                                        </div>
                                        <div style={{marginBottom: 36}}>
                                            <Badge 
                                                color={token.colorPrimary} 
                                                text={<span style={{color: '#333', fontSize: 18, fontFamily: 'PingFangSemiblod', color: token.color11}}>平均电价：</span>} 
                                            />
                                            
                                            <div style={{marginLeft: 15, marginTop: 8}}>
                                                <span style={{fontFamily: 'DingTalkJinBuTi', color:token.colorPrimary, fontSize: 32}}>{data?.heightPeakCutPrice || 0}</span>
                                                <span>元/KW</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.contentLeftItem}>
                                <div className={styles.contentLeftItemLeft}>
                                    <img src={tianguImg} />
                                </div>
                                <div className={styles.contentLeftItemRight}>
                                    <div className={styles.contentLeftItemRightItem}>
                                        <div style={{marginBottom: 36}}>
                                            <Badge 
                                                color={token.colorPrimary} 
                                                text={<span style={{color: '#333', fontSize: 18, fontFamily: 'PingFangSemiblod', color: token.color11}}>填谷响应功率：</span>} 
                                            />
                                            
                                            <div style={{marginLeft: 15, marginTop: 8}}>
                                                <span style={{fontFamily: 'DingTalkJinBuTi', color:token.colorPrimary, fontSize: 32}}>{data?.lowPeakCutPower || 0}</span>
                                                <span>KW</span>
                                            </div>
                                        </div>
                                        <div style={{marginBottom: 36}}>
                                            <Badge 
                                                color={token.colorPrimary} 
                                                text={<span style={{color: '#333', fontSize: 18, fontFamily: 'PingFangSemiblod', color: token.color11}}>平均电价：</span>} 
                                            />
                                            
                                            <div style={{marginLeft: 15, marginTop: 8}}>
                                                <span style={{fontFamily: 'DingTalkJinBuTi', color:token.colorPrimary, fontSize: 32}}>{data?.lowPeakCutPrice || 0}</span>
                                                <span>元/KW</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.contentRight}>
                    <div className={incomeCardStyle}>
                        <MyTitle style={{ marginTop: 0, marginBottom: 15}}>任务执行统计</MyTitle>
                        <div className={styles.contentRightChart}>
                            <TaskStaticsChart dataSource={data} />
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ height: 370 }}>
                <MyTitle style={{ marginTop: 0, marginBottom: 15 }}>分时收益统计</MyTitle>
                <div style={{ height: 400 }}>
                    <TimeIncomeChart dataSource={data} />
                </div>
            </div>
        </div>
    )
}

export default Overview;