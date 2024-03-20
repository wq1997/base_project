import { Card, Space, Typography, Tooltip, Divider, Row, Select, DatePicker, theme } from "antd";
import useIcon from "@/hooks/useIcon";
import { useState } from "react";
import dayjs from "dayjs";
import moment from "moment";
import TaskStaticsChart from "./TaskStaticsChart";
import TimeIncomeChart from "./TimeIncomeChart";
import styles from "./index.less";

const { Title } = Typography;

const Overview = () => {
    const { token } = theme.useToken();
    const [dateType, setDateType] = useState('Year');
    const [date, setDate] = useState(dayjs(moment().format("YYYY")));
    const Icon = useIcon();

    const onChangeDate = (_, dateStr) => {
        setDate(dayjs(dateStr));
    }

    return (
        <div>
            <Card style={{height: 170, marginBottom: 20}}>
                <div style={{marginBottom: 15}}>
                    <Space>
                        <Title level={3} style={{margin: 0, display: 'inline-block'}}>公司账户</Title>
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
                <div style={{marginLeft: 40}}>
                    <Space>
                        <div>
                            <Title level={5} style={{marginTop:0, marginBottom: 5}}>账户余额（元）</Title>
                            <Title level={6} style={{margin: 0, color: token.colorPrimary}}>28530</Title>
                        </div>
                        <Divider type="vertical" style={{height: 80, margin: '0 50px'}} />
                        <div>
                            <Title level={5} style={{marginTop:0, marginBottom: 5}}>总收入金额（元）</Title>
                            <Title level={6} style={{margin: 0, color: token.colorPrimary}}>35825</Title>
                        </div>
                        <Divider type="vertical" style={{height: 80, margin: '0 50px'}} />
                        <div>
                            <Title level={5} style={{marginTop:0, marginBottom: 5}}>已到账总额（元）</Title>
                            <Title level={6} style={{margin: 0, color: token.colorPrimary}}>12515</Title>
                        </div>
                    </Space>
                </div>
            </Card>
            <div style={{marginBottom: 20}}>
                 <Row align="middle">
                    <div>筛选条件：</div>
                    <Select 
                        options={[
                            { value: 'Year', label: '年' },
                            { value: 'Month', label: '月' },
                        ]}
                        style={{width: 100, marginRight: 20}}
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
            <Card style={{height: 170, marginBottom: 20}}>
                <div style={{marginBottom: 15}}>
                    <Title level={3} style={{margin: 0, display: 'inline-block'}}>收益统计</Title>
                </div>
                <div style={{marginLeft: 40}}>
                    <Space>
                        <div>
                            <Title level={5} style={{marginTop:0, marginBottom: 5}}>总收益（元）</Title>
                            <Title level={6} style={{margin: 0, color: token.colorPrimary}}>29661.58</Title>
                        </div>
                        <Divider type="vertical" style={{height: 80, margin: '0 50px'}} />
                        <div>
                            <Title level={5} style={{marginTop:0, marginBottom: 5}}>响应容量（KW）</Title>
                            <Title level={6} style={{margin: 0, color: token.colorPrimary}}> 11921
</Title>
                        </div>
                        <Divider type="vertical" style={{height: 80, margin: '0 50px'}} />
                        <div>
                            <Title level={5} style={{marginTop:0, marginBottom: 5}}>响应次数</Title>
                            <Title level={6} style={{margin: 0, color: token.colorPrimary}}>2</Title>
                        </div>
                        <Divider type="vertical" style={{height: 80, margin: '0 50px'}} />
                        <div>
                            <Title level={5} style={{marginTop:0, marginBottom: 5}}>响应成功率</Title>
                            <Title level={6} style={{margin: 0, color: token.colorPrimary}}>100%</Title>
                        </div>
                    </Space>
                </div>
            </Card>
            <div className={styles.content}>
                <div className={styles.contentLeft}>
                    <Card style={{height: '100%'}}>
                        <Title level={3} style={{marginTop: 0, marginBottom: 35, display: 'inline-block'}}>充放量价统计</Title>
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
                                    <Title level={5} style={{margin: 0, marginBottom: 15}}>削峰响应功率：5230KW</Title>
                                    <Title level={5} style={{margin: 0}}>平均电价：0.8元/KW</Title>
                                </div>
                            </div>
                        </div>
                        <div className={styles.contentLeftItem} style={{marginTop: 30}}>
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
                                    <Title level={5} style={{margin: 0, marginBottom: 15}}>填谷响应功率：13568KW</Title>
                                    <Title level={5} style={{margin: 0}}>平均电价：0.3元/KW</Title>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className={styles.contentRight}>
                    <Card style={{height: '100%'}}>
                        <Title level={3} style={{marginTop: 0, marginBottom: 15, display: 'inline-block'}}>任务执行统计</Title>
                        <div className={styles.contentRightChart}>
                            <TaskStaticsChart />
                        </div>
                    </Card>
                </div>
            </div>
            <Card style={{height: 370}}>
                <Title level={3} style={{marginTop: 0, marginBottom: 15, display: 'inline-block'}}>分时收益统计</Title>
                <div style={{height: 280}}>
                    <TimeIncomeChart />
                </div>
            </Card>
        </div>
    )
}

export default Overview;