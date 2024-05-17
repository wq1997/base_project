import { useIntl } from "umi";
import { Form, Select, DatePicker, Button, Flex, Radio, theme, Space, message } from "antd";
import { Title } from "@/components";
import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import * as echarts from "echarts";
import moment from "moment";
import {
    getAllDevices as getAllDevicesServe,
    getRevenue as getRevenueServe,
} from "@/services";

const defaultStartDate = dayjs(moment().subtract(5, 'day').format("YYYY-MM-DD"));
const defaultEndDate = dayjs(moment().subtract(1, 'day').format("YYYY-MM-DD"));

const Revenue = () => {
    const intl = useIntl();
    const { token } = theme.useToken();
    const [ form ] = Form.useForm();
    const [ dataSource, setDataSource ] = useState([]);
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

    const getAllDevices = async () => {
        const res = await getAllDevicesServe();
        console.log("AAA", res);
    }

    const getDataSource = async (params) => {
        const res = await getRevenueServe(params);
        console.log(res);
    }

    useEffect(()=>{
        initOption();
    }, [dataSource]);

    useEffect(()=>{
        getAllDevices();
        getDataSource({
            startDate: defaultStartDate.format("YYYY-MM-DD"),
            endDate: defaultEndDate.format("YYYY-MM-DD"),
            dateType: 'day'
        });
    }, [])

    return (
        <Space size={30} direction="vertical" style={{width: '100%', height:'100%', padding: 30}}>
            <Flex justify="center" align="center" gap={10}>
                <span>{intl.formatMessage({id: '数据项'})}：</span>
                <Form 
                    form={form} 
                    layout="inline"
                    initialValues={{
                        device: '',
                        dayTime: [defaultStartDate, defaultEndDate],
                        yearTime: dayjs(),
                        timeType: 'day'
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
                                    if(timeType==="day"){
                                        return (
                                            <Form.Item 
                                                name="dayTime"
                                            >
                                                <DatePicker.RangePicker 
                                                    maxDate={dayjs(moment().subtract(1, 'day').format('YYYY-MM-DD'), 'YYYY-MM-DD')} 
                                                    style={{width: '300px', height: 40}}
                                                    allowClear={false}
                                                />
                                            </Form.Item>
                                        )
                                    }
                                    return (
                                        <Form.Item name="yearTime">
                                            <DatePicker 
                                                allowClear={false} 
                                                maxDate={dayjs(moment().format('YYYY'))}
                                                picker={"year"} 
                                                style={{width: '250px', height: 40}}
                                            />
                                        </Form.Item>
                                    )
                                }}
                        </Form.Item>
                        <Form.Item name="timeType">
                                <Radio.Group size="large">
                                    <Radio.Button value="day">{intl.formatMessage({id: '日'})}</Radio.Button>
                                    <Radio.Button value="year">{intl.formatMessage({id: '年'})}</Radio.Button>
                                </Radio.Group>
                        </Form.Item>
                    </Flex>
                </Form>
                <Button 
                    onClick={async ()=>{
                        let format="YYYY-MM-DD";
                        const values = await form.validateFields();
                        const { timeType, device } = values;
                        let params = {};
                        if(timeType==="year"){
                            format="YYYY";
                            params = {
                                dtuId: device,
                                date: dayjs(values.yearTime).format(format),
                                dateType: timeType
                            }
                        }
                        if(timeType=="day"){
                            const dayLength = dayjs(dayjs(values.dayTime[1]).format(format)).diff(dayjs(values.dayTime[0]).format(format), 'days')+1;
                            if(dayLength<5||dayLength>12){
                                message.error(intl.formatMessage({id: '日期范围最少选择五天最多选择12天！'}));
                                return;
                            }
                            params = {
                                dtuId: device,
                                startDate: dayjs(values.dayTime[0]).format(format),
                                endDate: dayjs(values.dayTime[1]).format(format),
                                dateType: timeType
                            }
                        }
                        console.log(params);
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