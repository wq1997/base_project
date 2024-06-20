import { useIntl } from "umi";
import { Form, Cascader, DatePicker, Button, Flex, Radio, theme, Space, message, Empty, Spin, Tooltip, Select } from "antd";
import { Title } from "@/components";
import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import * as echarts from "echarts";
import moment from "moment";
import {
    getRevenue as getRevenueServe,
    getAllRevenueExcel as getAllRevenueExcelServe,
    getFetchPlantList2 as getFetchPlantListServe
} from "@/services";
import {
    getDtusOfPlant as getDtusOfPlantServe
} from "@/services/plant";
import { downloadFile } from "@/utils/utils";

const defaultStartDate = dayjs(moment().subtract(5, 'day').format("YYYY-MM-DD"));
const defaultEndDate = dayjs(moment().subtract(1, 'day').format("YYYY-MM-DD"));

const MonitoringCurves = () => {
    const intl = useIntl();
    const {token} = theme.useToken();
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([]);
    const [option, setOption] = useState({});
    const [plantDeviceList, setPlantDeviceList] = useState([]);
    const [loading, setLoading] = useState(false);

    const dataProList = [
        {
            value: 0,
            label: intl.formatMessage({id: '设备功率'})
        },
        {
            value: 1,
            label: intl.formatMessage({id: '电池SOC'})
        },
        {
            value: 2,
            label: intl.formatMessage({id: '电池电压'})
        },
        {
            value: 3,
            label: intl.formatMessage({id: '电池电流'})
        },
        {
            value: 4,
            label: intl.formatMessage({id: '堆单体压差'})
        },
        {
            value: 5,
            label: intl.formatMessage({id: '堆单体温差'})
        },
    ]

    const getParams = async() => {
        let format="YYYY-MM-DD";
        const values = await form.validateFields();
        let { date, currentPlantDevice } = values;
        date = date.map(item => dayjs(item).format(format));
        if(date?.length>7){
            message.error(intl.formatMessage({id: '最多选择7个对比项'}));
            return;
        }
        let params = {
            plantId: currentPlantDevice?.[0],
            dtuId: currentPlantDevice?.[1],
            dateType: timeType
        }
        return params;
    }

    const initOption = async () => {
        const values = await form.validateFields();
        const { timeType } = values;
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
                data: dataSource?.map(item => moment(item.time).format(timeType==="day"?"YYYY/MM/DD":"YYYY/MM")),
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
                name: `${intl.formatMessage({id: '收益'})}(${intl.formatMessage({id: '元'})})`,
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
            const plantList = data?.plantList?.map((item, index) => {
                return {
                    value: item.plantId,
                    label: item.name,
                    disabled: data?.deviceCount?.[index]===0,
                    children: data?.deviceCount?.[index]&&[
                        {
                            value: '',
                            label: ''
                        }
                    ]
                }
            })
            if(plantList?.length>0){
                const findIndex = plantList.findIndex(item => !item.disabled);
                getDtusOfPlant(plantList, plantList?.[findIndex]?.value)
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
                <Form 
                    form={form} 
                    layout="inline"
                    initialValues={{
                        currentPlantDevice: [],
                        date: [dayjs(moment().format("YYYY-MM-DD"))]
                    }}
                >
                    <Flex align="center">
                        <Form.Item name={"currentPlantDevice"} label={intl.formatMessage({id: '设备'})}>
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
                        <Form.Item name={"dataPro"} label={intl.formatMessage({id: '数据项'})}>
                            <Select 
                                options={dataProList}
                                style={{width: '250px', height: 40}}
                            />
                        </Form.Item>
                        <Tooltip title={intl.formatMessage({id: '最多选择7个对比项'})}>
                            <Form.Item 
                                name="date"
                                label={intl.formatMessage({id: '日期'})}
                            >
                                <DatePicker 
                                    multiple
                                    maxTagCount={1}
                                    maxDate={dayjs(moment().subtract(1, 'day').format('YYYY-MM-DD'), 'YYYY-MM-DD')} 
                                    style={{width: '300px', height: 40}}
                                    allowClear={false}
                                />
                            </Form.Item>
                        </Tooltip>
                    </Flex>
                </Form>
                <Button 
                    onClick={async ()=>{
                        const params = await getParams();
                        if(params){
                            getDataSource(params);
                        }
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
                            <ReactECharts option={option} notMerge style={{width: '100%', height: '100%'}}/>
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

export default MonitoringCurves;