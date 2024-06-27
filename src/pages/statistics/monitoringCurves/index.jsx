import { useIntl } from "umi";
import { Form, Cascader, DatePicker, Button, Flex, Radio, theme, Space, message, Empty, Spin, Tooltip, Select } from "antd";
import { Title } from "@/components";
import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import * as echarts from "echarts";
import moment from "moment";
import {
    monitorCurve as monitorCurveServe,
    getAllRevenueExcel as getAllRevenueExcelServe,
    getFetchPlantList2 as getFetchPlantListServe,
    getCurveType as getCurveTypeServe,
} from "@/services";
import {
    getDtusOfPlant as getDtusOfPlantServe
} from "@/services/plant";
import { downloadFile } from "@/utils/utils";

const MonitoringCurves = () => {
    const intl = useIntl();
    const {token} = theme.useToken();
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([]);
    const [option, setOption] = useState({});
    const [plantDeviceList, setPlantDeviceList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState(`${intl.formatMessage({id: '监测曲线'})}`);

    const dataProList = [
        {
            value: 100,
            label: intl.formatMessage({id: '设备功率'}),
            unit: 'kW'
        },
        {
            value: 183,
            label: intl.formatMessage({id: '电池SOC'}),
            unit: '%'
        },
        {
            value: 181,
            label: intl.formatMessage({id: '电池电压'}),
            unit: 'V'
        },
        {
            value: 182,
            label: intl.formatMessage({id: '电池电流'}),
            unit: 'A'
        },
        {
            value: 414,
            label: intl.formatMessage({id: '堆单体压差'}),
            unit: 'V'
        },
        {
            value: 415,
            label: intl.formatMessage({id: '堆单体温差'}),
            unit: '℃'
        },
    ]

    const getParams = async() => {
        let format="YYYY-MM-DD";
        const values = await form.validateFields();
        let { date, currentPlantDevice, dataType } = values;
        date = date.map(item => dayjs(item).format(format));
        if(date?.length>3){
            message.error(intl.formatMessage({id: '最多选择3个对比项'}));
            return;
        }
        let params = {
            // plantId: currentPlantDevice?.[0],
            dtuId: 1807||currentPlantDevice?.[1],
            dataType,
            dateList: date
        }
        return params;
    }

    const initOption = async () => {
        let format="YYYY-MM-DD";
        const values = await form.validateFields();
        let { dataType, date } = values;
        const currentData = dataProList.find(data => data.value==dataType);
        const name = `${currentData?.label}(${currentData?.unit})`;
        if(currentData) setTitle(name);

        let legendData = [], series = [], xData = [];
        date = date.map(item => dayjs(item).format(format));
        xData = dataSource?.[0]?.timeList;
        if(dataType===100){
            const fieldList = [intl.formatMessage({id: 'PCS功率'}), intl.formatMessage({id: 'BMS功率'}), intl.formatMessage({id: '电表功率'})];
            date?.forEach(item => {
                fieldList.forEach(field=>{
                    legendData.push(`${item} ${field}`);
                })
            })
            legendData.forEach((legend, index) => {
                const currentDate = legend?.split(' ')?.[0];
                const currentData = dataSource?.find(item => item.date===currentDate);
                const filed = index%3===0?"PCS":(index%3===1?"BMS":"Meter");
                const data = currentData?.energyData?.[filed];
                series.push({
                    name: legend,
                    type: 'line',
                    stack: 'Total',
                    showSymbol: false,
                    data: data?.map(item => item[1])
                })
            })
        }

        if(dataType===183){
            const fieldList = [intl.formatMessage({id: '电池SOC'})];
            date?.forEach(item => {
                fieldList.forEach(field=>{
                    legendData.push(`${item} ${field}`);
                })
            })
            legendData.forEach((legend, index) => {
                const currentDate = legend?.split(' ')?.[0];
                const currentData = dataSource?.find(item => item.date===currentDate);
                const filed = "SOC";
                const data = currentData?.energyData?.[filed];
                series.push({
                    name: legend,
                    type: 'line',
                    stack: 'Total',
                    showSymbol: false,
                    data: data?.map(item => item[1])
                })
            })
        }

        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: legendData,
                textStyle: {
                    color: 'white'
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
                data: xData,
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
            series
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
                    // const res = await getCurveTypeServe();
                    // console.log("CCCCCC", res);
                    form.setFieldsValue({
                        currentPlantDevice:[plantId, data[0].value],
                        dataType: 100
                    })
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
        const res = await monitorCurveServe(params);
        if(res?.data?.data){
            setDataSource(res?.data?.data)
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
                        <Form.Item name={"dataType"} label={intl.formatMessage({id: '数据项'})}>
                            <Select 
                                options={dataProList}
                                style={{width: '250px', height: 40}}
                            />
                        </Form.Item>
                        <Tooltip title={intl.formatMessage({id: '最多选择3个对比项'})}>
                            <Form.Item 
                                name="date"
                                label={intl.formatMessage({id: '日期'})}
                            >
                                <DatePicker 
                                    multiple
                                    maxTagCount={1}
                                    maxDate={dayjs(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD')} 
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
                                fileName: `${intl.formatMessage({id: '监测曲线'})}.xlsx`,
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
                    <Title title={title}/>
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