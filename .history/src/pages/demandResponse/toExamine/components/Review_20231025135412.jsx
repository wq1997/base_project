import { StatisticalCard, Search, Title } from "@/components";
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useState } from "react";
import { Row, Space, DatePicker, Table } from "antd";
import LoadCurve from "./LoadCurve";
import StatusPie from "./StatusPie";

const Review = () => {
   

    const echarts = useEmotionCss(({token})=>{
        return {
            margin: '30px 0',
            height: 450,
            display: 'flex',
            '.left': {
                width: '60%',
                marginRight: '30px'
            },
            '.right': {
                width: 'calc(40% - 30px)'
            }
        }
    })
    return (
        <div>
            <Row justify="space-between" align="middle" style={{marginBottom: 30}}>
                <Space>
                    <Search style={{width: 250}} />
                    <DatePicker style={{width: 250}} />
                </Space>
            </Row>
            <StatisticalCard 
                showBorder
                dataSource={statistical}
            />
            <div className={echarts}>
                <div className="left">
                    <Title.PageSubTitle title={"负荷曲线预测"} style={{marginBottom: '10px'}}/>
                    <LoadCurve />
                </div>
                <div className="right">
                    <Title.PageSubTitle title={"申报状态"} style={{marginBottom: '10px'}}/>
                    <StatusPie />
                </div>
            </div>
            <div>
                <Title.PageSubTitle title={"申报详情"} style={{marginBottom: '10px'}}/>
                <Table
                    pagination={false}
                    columns={[
                        {
                            title: '申报编号',
                            dataIndex: 'code',
                            key: 'code',
                        },
                        {
                            title: '申报时段',
                            dataIndex: 'time',
                            key: 'time',
                        },
                        {
                            title: '申报容量(MWh)',
                            dataIndex: 'capacity',
                            key: 'capacity',
                        },
                        {
                            title: '申报类型',
                            dataIndex: 'type',
                            key: 'type',
                        },
                        {
                            title: '预估响应价格(元/MWh)',
                            dataIndex: 'price',
                            key: 'price'
                        },
                        {
                            title: '限价(元/MWh)',
                            dataIndex: 'price1',
                            key: 'price1'
                        }
                    ]}
                    dataSource={[
                        {
                            code: '202309171800',
                            time: '06:00 ~ 08:00',
                            capacity: 8,
                            type: '放电',
                            price: 2000,
                            price1: 3000
                        },
                        {
                            code: '202309171801',
                            time: '08:00 ~ 09:00',
                            capacity: 6,
                            type: '用电',
                            price: 2000,
                            price1: 3000
                        },
                        {
                            code: '202309171802',
                            time: '09:00 ~ 11:00',
                            capacity: 10,
                            type: '放电',
                            price: 2000,
                            price1: 3000
                        },
                        {
                            code: '202309171803',
                            time: '11:00 ~ 13:00',
                            capacity: 10,
                            type: '放电',
                            price: 2000,
                            price1: 3000
                        },
                        {
                            code: '202309171804',
                            time: '13:00 ~ 15:00',
                            capacity: 10,
                            type: '用电',
                            price: 2000,
                            price1: 3000
                        },
                        {
                            code: '202309171805',
                            time: '15:00 ~ 18:00',
                            capacity: 8,
                            type: '放电',
                            price: 4000,
                            price1: 3000
                        }
                    ]}
                />
            </div>
        </div>
    )
}

export default Review;