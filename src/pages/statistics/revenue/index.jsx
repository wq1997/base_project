import { useIntl } from "umi";
import { Form, Cascader, DatePicker, Button, Flex, Radio, theme, Space, message, Empty, Spin } from "antd";
import { Title } from "@/components";
import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import * as echarts from "echarts";
import moment from "moment";
import {
    getRevenue as getRevenueServe,
    getAllRevenueExcel as getAllRevenueExcelServe,
} from "@/services";
import {
    getDtusOfPlant as getDtusOfPlantServe
} from "@/services/plant";
import {
    getFetchPlantList as getFetchPlantListServe,
} from "@/services/deviceTotal";
import { downloadFile } from "@/utils/utils";

const defaultStartDate = dayjs(moment().subtract(5, 'day').format("YYYY-MM-DD"));
const defaultEndDate = dayjs(moment().subtract(1, 'day').format("YYYY-MM-DD"));

const Revenue = () => {
    const intl = useIntl();
    const {token} = theme.useToken();
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([]);
    const [option, setOption] = useState({});
    const [plantDeviceList, setPlantDeviceList] = useState([]);
    const [loading, setLoading] = useState(false);

    const getParams = async() => {
        let format="YYYY-MM-DD";
        const values = await form.validateFields();
        const { timeType, currentPlantDevice } = values;
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
                message.error(intl.formatMessage({id: '日期范围最少选择5天最多选择12天！'}));
                return;
            }
            params = {
                plantId: currentPlantDevice?.[0],
                dtuId: currentPlantDevice?.[1],
                startDate: dayjs(values.dayTime[0]).format(format),
                endDate: dayjs(values.dayTime[1]).format(format),
                dateType: timeType
            }
        }
        return params;
    }

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
                data: dataSource?.map(item => moment(item.time).format("YYYY/MM/DD")),
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
                data: dataSource?.map(item => item.number),
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

    const getDtusOfPlant = async (plantList, plantId) => {
        const res = await getDtusOfPlantServe({plantId});
        if(res?.data?.data){
            let data = res?.data?.data;
            if(data){
                try{
                    data = JSON.parse(data);
                }catch{
                    data = [];
                }
                data = data?.length>0?data?.map(item => {
                    return {
                        value: item.id,
                        label: item.name||intl.formatMessage({id: '设备无名称'})
                    }
                }): [];
                const currentIndex = plantList?.findIndex(item => item.value===plantId);
                plantList[currentIndex].children=data;
                setPlantDeviceList([...plantList]);

                const currentPlantDevice = await form.getFieldValue("currentPlantDevice")
                if(currentPlantDevice?.length===0){
                    form.setFieldsValue({currentPlantDevice:[plantId, data[0].value]})
                    const params = await getParams();
                    getDataSource(params);
                }
            }
        }
    }

    const initPlantDevice = async () => {
        const res = await getFetchPlantListServe();
        if(res?.data?.data){
            const data = res?.data?.data;
            const plantList = data?.map(item => {
                return {
                    value: item.plantId,
                    label: item.name,
                    children: [
                        {
                            value: '',
                            label: ''
                        }
                    ]
                }
            })
            if(plantList?.length>0){
                getDtusOfPlant(plantList, plantList?.[0]?.value)
            }
        }
    }

    const getDataSource = async (params) => {
        setLoading(true);
        const res = await getRevenueServe(params);
        if(res?.data?.data?.data){
            setDataSource(res?.data?.data?.data)
        }else{
            setDataSource([]);
        }
        setLoading(false);
    }

    useEffect(()=>{
        initOption();
    }, [dataSource]);

    useEffect(()=>{
        initPlantDevice();
    }, [])

    return (
        <Space size={30} direction="vertical" style={{width: '100%', height:'100%', padding: 30}}>
            <Flex justify="center" align="center" gap={10}>
                <span>{intl.formatMessage({id: '数据项'})}：</span>
                <Form 
                    form={form} 
                    layout="inline"
                    initialValues={{
                        currentPlantDevice: [],
                        dayTime: [defaultStartDate, defaultEndDate],
                        yearTime: dayjs(),
                        timeType: 'day'
                    }}
                >
                    <Flex align="center">
                        <Form.Item name={"currentPlantDevice"}>
                            <Cascader 
                                changeOnSelect
                                options={plantDeviceList}
                                onChange={async value => {
                                    if(value?.length===1){
                                        getDtusOfPlant(plantDeviceList,value[0])
                                    }
                                }}
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
                        const params = await getParams();
                        getDataSource(params);
                    }}
                    type="primary"
                    style={{padding: '0 20px', height: 40}}
                >
                    {intl.formatMessage({id: '查询'})}
                </Button>
                <Button 
                    type="primary"
                    onClick={async ()=>{
                        const params = await getParams();
                        const res = await getAllRevenueExcelServe(params);
                        if(res?.data){
                            downloadFile({
                                fileName: `${intl.formatMessage({id: '收益统计'})}.xlsx`,
                                content: res?.data
                            })
                        }
                    }} 
                    style={{ backgroundColor: token.defaultBg, padding: '0 20px', height: 40 }} 
                >
                    {intl.formatMessage({id:'导出'})} Excel
                </Button>
            </Flex>
            <Spin spinning={loading}>
                <Space direction="vertical" style={{width: '100%'}}>
                    <Title title={`${intl.formatMessage({id: '收益统计'})}(${intl.formatMessage({id: '元'})})`}/>
                    <div style={{width: '100%', height: 'calc(100vh - 250px)'}}>
                        {
                            dataSource?.length>0?
                            <ReactECharts option={option} style={{width: '100%', height: '100%'}}/>
                            :
                            <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={intl.formatMessage({id: '暂无数据'})} />
                            </div>
                        }
                    </div>
                </Space>
            </Spin>
        </Space>
    )
}

export default Revenue;