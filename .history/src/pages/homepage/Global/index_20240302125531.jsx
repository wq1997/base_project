import { Card, Typography, theme, Table } from 'antd';
import { useState } from "react";
import { ScrollTable } from "@/components";
import styles from "./index.less";
import JiangsuMap from './JiangsuMap';
import AreaStatisc from './AreaStatisc';
import LoadStatisc from './LoadStatisc';
import UserTypeStatistic from './UserTypeStatistic';

const Global = () => {
    const { token } = theme.useToken();
    const [data, setData] = useState({
        resource: {
            title: '资源分布统计',
            dataSource: [
                {
                    label: '用户数量',
                    value: 120 
                },
                {
                    label: '设备资源',
                    value: 35 
                },
                {
                    label: '签约容量(KW)',
                    value: 1200 
                },
                {
                    label: '最大可调负荷(KW)',
                    value: 1200
                }
            ]
        },
        responseIncome: {
            title: '响应收益统计',
            dataSource: [
                {
                    label: '累计收益(元)',
                    value: 1850000
                },
                {
                    label: '本年收益(元)',
                    value: 358000
                },
                {
                    label: '次年预计收益(元)',
                    value: 358000
                }
            ]
        },
        responseExecute: { 
            title: '响应执行统计',
            dataSource: [
                {
                    label: '邀约总数',
                    value: 89
                },
                {
                    label: '响应成功数',
                    value: 85
                },
                {
                    label: '响应成功率',
                    value: '96%'
                },
                {
                    label: '有效响应功率(KW)',
                    value: 52800
                }
            ]
        }
    })
    return (
        <div>
            <div className={styles.top}>
                <div className={styles.topLeft}>
                    {
                        Object.keys(data)?.map(item => {
                            return (
                                <Card style={{flex: 1, height: '100%'}}>
                                    <Typography.Title level={3} style={{marginTop:0, marginBottom: 20}}>{data[item].title}</Typography.Title>
                                    <div className={styles.cardData}>
                                        {
                                            data[item].dataSource?.map(dataSource => {
                                                return (
                                                    <div className={styles.cardDataItem}>
                                                        <Typography.Title level={5} style={{marginTop:0, marginBottom: 10}}>{dataSource.label}</Typography.Title>
                                                        <Typography.Title level={2} style={{margin:0, color: token.colorPrimary}}>{dataSource.value}</Typography.Title>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </Card>
                            )
                        })
                    }
                </div>
                <div className={styles.topRight}>
                    <Card style={{height: '100%', width: '100%'}}>
                        <div className={styles.topRightItem}>
                            <Typography.Title level={3} style={{margin:0}}>用户分布统计(江苏省)</Typography.Title>
                            <JiangsuMap 
                                allPlant={[
                                    {
                                        longitude: 119.55,
                                        latitude: 30.47,
                                        name: '苏州市'
                                    },
                                    {
                                        longitude: 121.25,
                                        latitude: 31.41,
                                        name: '南通市启东市' 
                                    },
                                    {
                                        longitude:121.640297,
                                        latitude: 31.80057,
                                        name: '南通市启东市' 
                                    }
                                ]}
                            />
                        </div>
                        <div className={styles.topRightItem}>
                            <AreaStatisc />
                        </div>
                    </Card>
                </div>
            </div>

            <div className={styles.center}>
                <Card style={{height: '100%', width: '100%'}}>
                    <Typography.Title level={3} style={{marginTop:0, marginBottom: 20}}>分时负荷统计</Typography.Title>
                    <div className={styles.centerLoadStatisc}>
                        <LoadStatisc />
                    </div>
                </Card>
            </div>

            <div className={styles.bottom}>
                <div className={styles.bottomLeft}>
                    <Card style={{height: '100%', width: '100%'}}>
                        <Typography.Title level={3} style={{marginTop:0, marginBottom: 20}}>用户响应汇总</Typography.Title>
                        <div className={styles.bottomLeftContent}>
                                <ScrollTable 
                                    columns={[
                                        {
                                            title: '用户名',
                                            key: 1
                                        },
                                        {
                                            title: '任务派发数量',
                                            key: 2
                                        },
                                        {
                                            title: '任务承接数量',
                                            key: 3
                                        },
                                        {
                                            title: '任务完成数量',
                                            key: 4
                                        },
                                        {
                                            title: '有效响应容量(KW)',
                                            key: 5
                                        }
                                    ]}
                                    dataSource={[
                                        {
                                            1: '江苏海四达股份有限公司',
                                            2: 24,
                                            3: 12,
                                            4: 12,
                                            5: 520
                                        },
                                        {
                                            1: '无锡佳能感动有限公司',
                                            2: 24,
                                            3: 12,
                                            4: 12,
                                            5: 520
                                        },
                                        {
                                            1: '中通快递股份有限公司',
                                            2: 24,
                                            3: 12,
                                            4: 12,
                                            5: 520
                                        }
                                    ]}
                                />
                        </div>
                    </Card>
                </div>
                <div className={styles.bottomRight}>
                    <Card style={{height: '100%', width: '100%'}}>
                        <Typography.Title level={3} style={{marginTop:0, marginBottom: 20}}>接入用户类型</Typography.Title>
                        <div className={styles.bottomRightContent}>
                                <UserTypeStatistic />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Global;