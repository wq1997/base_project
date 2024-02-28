import { Card, Typography, theme } from 'antd';
import { useState } from "react";
import styles from "./index.less";
import JiangsuMap from './JiangsuMap';

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
                    label: '签约容量（KW）',
                    value: 1200 
                },
                {
                    label: '最大可调负荷（KW）',
                    value: 1200
                }
            ]
        },
        responseIncome: {
            title: '响应收益统计',
            dataSource: [
                {
                    label: '累计收益（元）',
                    value: 1850000
                },
                {
                    label: '本年收益（元）',
                    value: 358000
                },
                {
                    label: '次年预计收益（元）',
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
                    label: '有效响应功率（KW）',
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
                            <JiangsuMap />
                        </div>
                        <div className={styles.topRightItem}></div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Global;