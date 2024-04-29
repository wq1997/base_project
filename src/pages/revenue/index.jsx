import { useIntl } from "umi";
import { Form, Select, DatePicker, Button, Flex, Radio, theme, Space } from "antd";
import { Title } from "@/components";
import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import * as echarts from "echarts";

const Revenue = () => {
    const intl = useIntl();
    const { token } = theme.useToken();
    const [ form ] = Form.useForm();
    const [option, setOption] = useState({});

    const initOption = () => {
        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                top: '40',
                right: '3%',
                left: '5%',
                bottom: '80'
            },
            xAxis: [{
                type: 'category',
                data: ['湖北', '福建', '山东', '广西', '浙江', '河南', '河北', '安徽', '上海', '北京'],
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,0.12)'
                    }
                },
                axisLabel: {
                    margin: 10,
                    color: 'white',
                    textStyle: {
                        fontSize: 14
                    },
                },
            }],
            yAxis: [{
                axisLabel: {
                    formatter: '{value}',
                    color: '#e2e9ff',
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                     show: true,
                     lineStyle: {
                         color: '#233e64'
                     }
                },
            }],
            series: [{
                type: 'bar',
                data: [300, 450, 770, 203, 255, 188, 156, 300, 400, 450],
                barWidth: 50,
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#0787DB' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#034FB4' // 100% 处的颜色
                        }], false)
                    }
                }
            }]
        };
        setOption(option);
    }

    useEffect(()=>{
        initOption();
    }, []);

    return (
        <Space size={30} direction="vertical" style={{width: '100%', height:'100%', padding: 30}}>
            <Flex justify="center" align="center" gap={10}>
                <span>数据项：</span>
                <Form 
                    form={form} 
                    layout="inline"
                    initialValues={{
                        device: '',
                        time: dayjs(),
                        timeType: 'DAY'
                    }}
                >
                    <Flex align="center">
                        <Form.Item name="device">
                            <Select 
                                options={[
                                    {label: '总收益', value: ''}
                                ]}
                                style={{width: '250px', height: 40}}
                            />
                        </Form.Item>
                        <Form.Item noStyle dependencies={['timeType']}>
                                {({getFieldsValue})=>{
                                    const { timeType } = getFieldsValue(['timeType']);
                                    return (
                                        <Form.Item name="time">
                                            <DatePicker allowClear={false} picker={timeType?.toLocaleLowerCase()} style={{width: '250px', height: 40}}/>
                                        </Form.Item>
                                    )
                                }}
                        </Form.Item>
                        <Form.Item name="timeType">
                                <Radio.Group size="large">
                                    <Radio.Button value="DAY">日</Radio.Button>
                                    <Radio.Button value="MONTH">月</Radio.Button>
                                    <Radio.Button value="YEAR">年</Radio.Button>
                                </Radio.Group>
                        </Form.Item>
                    </Flex>
                </Form>
                <Button 
                    onClick={async ()=>{
                        let format="YYYY-MM-DD";
                        const values = await form.validateFields();
                        const { timeType } = values;
                        if(timeType==="MONTH") format="YYYY-MM";
                        if(timeType==="YEAR") format="YYYY";
                        values.time = dayjs(values.time).format(format);
                        console.log(values);
                    }}
                    type="primary"
                    style={{padding: '0 20px', height: 40}}
                >
                    查询
                </Button>
                <Button 
                    type="primary"
                    onClick={()=>{

                    }} 
                    style={{ backgroundColor: token.defaultBg, padding: '0 20px', height: 40 }} 
                >
                    {intl.formatMessage({id:'导出'})} Excel
                </Button>
            </Flex>
            <Space direction="vertical" style={{width: '100%'}}>
                <Title title={"收益统计(元)"}/>
                <ReactECharts option={option} style={{width: '100%', height: 'calc(100vh - 250px)'}}/>
            </Space>
        </Space>
    )
}

export default Revenue;