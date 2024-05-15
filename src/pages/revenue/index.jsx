import { useIntl } from "umi";
import { Form, Select, DatePicker, Button, Flex, Radio, theme, Space } from "antd";
import { Title } from "@/components";
import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import * as echarts from "echarts";
import moment from "moment";

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
                data: ['湖北', '福建', '山东', '广西', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
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
                data: [300, 450, 770, 203,300, 450, 770, 203,300, 450, 770, 203,300, 450, 770],
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
                <span>{intl.formatMessage({id: '数据项'})}：</span>
                <Form 
                    form={form} 
                    layout="inline"
                    initialValues={{
                        device: '',
                        dayTime: [dayjs(moment().subtract(5, 'day').format("YYYY-MM-DD")), dayjs(moment().subtract(1, 'day').format("YYYY-MM-DD"))],
                        yearTime: dayjs(),
                        timeType: 'DAY'
                    }}
                >
                    <Flex align="center">
                        <Form.Item name="device">
                            <Select 
                                options={[
                                    {label: intl.formatMessage({id: '总收益'}), value: ''}
                                ]}
                                style={{width: '250px', height: 40}}
                            />
                        </Form.Item>
                        <Form.Item noStyle dependencies={['timeType']}>
                                {({getFieldsValue})=>{
                                    const { timeType } = getFieldsValue(['timeType']);
                                    if(timeType==="DAY"){
                                        return (
                                            <Form.Item 
                                                name="dayTime"
                                            >
                                                <DatePicker.RangePicker 
                                                    maxDate={dayjs(moment().subtract(1, 'day').format('YYYY-MM-DD'), 'YYYY-MM-DD')} 
                                                    style={{width: '300px', height: 40}}
                                                />
                                            </Form.Item>
                                        )
                                    }
                                    return (
                                        <Form.Item name="yearTime">
                                            <DatePicker allowClear={false} picker={"year"} style={{width: '250px', height: 40}}/>
                                        </Form.Item>
                                    )
                                }}
                        </Form.Item>
                        <Form.Item name="timeType">
                                <Radio.Group size="large">
                                    <Radio.Button value="DAY">{intl.formatMessage({id: '日'})}</Radio.Button>
                                    <Radio.Button value="YEAR">{intl.formatMessage({id: '年'})}</Radio.Button>
                                </Radio.Group>
                        </Form.Item>
                    </Flex>
                </Form>
                <Button 
                    onClick={async ()=>{
                        let format="YYYY-MM-DD";
                        const values = await form.validateFields();
                        const { timeType } = values;
                        if(timeType==="YEAR"){
                            format="YYYY";
                            values.time = dayjs(values.yearTime).format(format);
                        }
                        if(timeType=="DAY"){
                            values.time = values.dayTime&&values.dayTime?.length>0?[dayjs(values.dayTime[0]).format(format),dayjs(values.dayTime[1]).format(format)]:[];
                        }
                        console.log(values);
                    }}
                    type="primary"
                    style={{padding: '0 20px', height: 40}}
                >
                    {intl.formatMessage({id: '查询'})}
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
                <Title title={`${intl.formatMessage({id: '收益统计'})}(${intl.formatMessage({id: '元'})})`}/>
                <ReactECharts option={option} style={{width: '100%', height: 'calc(100vh - 250px)'}}/>
            </Space>
        </Space>
    )
}

export default Revenue;