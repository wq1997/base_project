import { useIntl, useSelector } from "umi";
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
    exportCurve as exportCurveServe,
    getCurveType as getCurveTypeServe
} from "@/services";
import {
    getDtusOfPlant as getDtusOfPlantServe
} from "@/services/plant";
import {
    getFetchPlantList as getFetchPlantListServe,
} from "@/services/deviceTotal";
import { downloadFile } from "@/utils/utils";

const MonitoringCurves = () => {
    const intl = useIntl();
    const { token } = theme.useToken();
    const global = useSelector(state => state.global);
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([]);
    const [option, setOption] = useState({});
    const [plantDeviceList, setPlantDeviceList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState(`${intl.formatMessage({ id: '监测曲线' })}`);
    const { locale } = useSelector(state => state.global);
    const [dataProList, setDataProList] = useState([
    ]);

    const getParams = async (showMessage = true) => {
        let format = "YYYY-MM-DD";
        const values = await form.validateFields();
        let { date, currentPlantDevice, dataType } = values;
        date = date?.map(item => dayjs(item).format(format));
        let flag = false;
        if (date?.length > 3) {
            showMessage && message.error(intl.formatMessage({ id: '最多选择3个对比项' }));
            flag = true;
        }
        if (!currentPlantDevice || currentPlantDevice?.length < 2) {
            showMessage && message.error(intl.formatMessage({ id: '请选择电站下具体设备' }));
            flag = true;
        };
        if (flag) return Promise.reject("参数错误");
        let params = {
            // plantId: currentPlantDevice?.[0],
            dtuId: currentPlantDevice?.[1],
            dataType,
            dateList: date
        }
        return params;
    }

    const initOption = async () => {
        let format = "YYYY-MM-DD";
        const values = await form.validateFields();
        let { dataType, date } = values;
        let legendData = [], series = [], xData = [];
        date = date.map(item => dayjs(item).format(format));
        xData = dataSource?.[0]?.timeList;

        let yAxis = [
            {
                axisLabel: {
                    formatter: '{value}',
                    color: token.color2,
                    fontSize: 14
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: token.color2
                    }
                },
            }
        ];

        if (dataType === 100) {
            const fieldList = [intl.formatMessage({ id: 'PCS功率' }), intl.formatMessage({ id: 'BMS功率' }), intl.formatMessage({ id: '电表功率' })];
            date?.forEach(item => {
                fieldList.forEach(field => {
                    legendData.push(`${item} ${field}`);
                })
            })
            legendData.forEach((legend, index) => {
                const currentDate = legend?.split(' ')?.[0];
                const currentData = dataSource?.find(item => item.date === currentDate);
                const filed = index % 3 === 0 ? "PCS" : (index % 3 === 1 ? "BMS" : "Meter");
                const data = currentData?.energyData?.[filed];
                series.push({
                    name: legend,
                    type: 'line',
                    showSymbol: false,
                    data: data?.map(item => item[1])
                })
            })
        }
        if (dataType === 101) {
            const fieldList = [intl.formatMessage({ id: 'BMS1功率' }), intl.formatMessage({ id: 'BMS2功率' }), intl.formatMessage({ id: '电表功率' }), intl.formatMessage({ id: 'PCS功率' })];
            date?.forEach(item => {
                fieldList.forEach(field => {
                    legendData.push(`${item} ${field}`);
                })
            })
            legendData.forEach((legend, index) => {
                const currentDate = legend?.split(' ')?.[0];
                const currentData = dataSource?.find(item => item.date === currentDate);
                const filed = index % 4 === 0 ? "BMS1" : (index % 4 === 1 ? "BMS2" : index % 4 === 2 ? "Meter" : 'PCS');
                const data = currentData?.energyData?.[filed];
                series.push({
                    name: legend,
                    type: 'line',
                    showSymbol: false,
                    data: data?.map(item => item[1])
                })
            })
        }
        if (dataType === 183) {
            const fieldList = [intl.formatMessage({ id: '电池SOC' })];
            date?.forEach(item => {
                fieldList.forEach(field => {
                    legendData.push(`${item} ${field}`);
                })
            })
            legendData.forEach((legend, index) => {
                const currentDate = legend?.split(' ')?.[0];
                const currentData = dataSource?.find(item => item.date === currentDate);
                const filed = "SOC";
                const data = currentData?.energyData?.[filed];
                series.push({
                    name: legend,
                    type: 'line',
                    showSymbol: false,
                    data: data?.map(item => item[1])
                })
            })
        }

        if (dataType === 181) {
            const fieldList = [intl.formatMessage({ id: '电池电压' })];
            date?.forEach(item => {
                fieldList.forEach(field => {
                    legendData.push(`${item} ${field}`);
                })
            })
            legendData.forEach((legend, index) => {
                const currentDate = legend?.split(' ')?.[0];
                const currentData = dataSource?.find(item => item.date === currentDate);
                const filed = "Vol";
                const data = currentData?.energyData?.[filed];
                series.push({
                    name: legend,
                    type: 'line',
                    showSymbol: false,
                    data: data?.map(item => item[1])
                })
            })
        }

        if (dataType === 182) {
            const fieldList = [intl.formatMessage({ id: '电池电流' })];
            date?.forEach(item => {
                fieldList.forEach(field => {
                    legendData.push(`${item} ${field}`);
                })
            })
            legendData.forEach((legend, index) => {
                const currentDate = legend?.split(' ')?.[0];
                const currentData = dataSource?.find(item => item.date === currentDate);
                const filed = "Cur";
                const data = currentData?.energyData?.[filed];
                series.push({
                    name: legend,
                    type: 'line',
                    showSymbol: false,
                    data: data?.map(item => item[1])
                })
            })
        }

        if (dataType === 414 || dataType === 4140 || dataType === 4141) {
            const fieldList = [intl.formatMessage({ id: '最高电压' }), intl.formatMessage({ id: '最低电压' }), intl.formatMessage({ id: '压差' })];
            yAxis[0].name = `${intl.formatMessage({ id: '最高电压' })}/${intl.formatMessage({ id: '最低电压' })}`;
            yAxis[0].nameTextStyle = {
                color: 'white'
            };
            yAxis[0].splitNumber = 5;
            yAxis[0].nameGap = 20;

            yAxis[1] = {
                name: intl.formatMessage({ id: '压差' }),
                nameTextStyle: {
                    color: token.color2
                },
                nameGap: 20,
                axisLabel: {
                    formatter: '{value}',
                    color: token.color2,
                    fontSize: 14
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: token.color2
                    }
                },
                splitNumber: 5
            }
            date?.forEach(item => {
                fieldList.forEach(field => {
                    legendData.push(`${item} ${field}`);
                })
            })
            legendData.forEach((legend, index) => {
                const currentDate = legend?.split(' ')?.[0];
                const currentData = dataSource?.find(item => item.date === currentDate);
                const filed = index % 3 === 0 ? "VolMax" : (index % 3 === 1 ? "VolMin" : "VolDiff");
                const data = currentData?.energyData?.[filed];
                series.push({
                    yAxisIndex: index % 3 === 0 ? 0 : (index % 3 === 1 ? 0 : 1),
                    name: legend,
                    type: 'line',
                    showSymbol: false,
                    data: data?.map(item => item[1])
                })
            })
        }

        if (dataType === 415 || dataType === 4150 || dataType === 4151) {
            const fieldList = [intl.formatMessage({ id: '最高温度' }), intl.formatMessage({ id: '最低温度' }), intl.formatMessage({ id: '温差' })];
            yAxis[0].name = `${intl.formatMessage({ id: '最高温度' })}/${intl.formatMessage({ id: '最低温度' })}`;
            yAxis[0].nameTextStyle = {
                color: 'white'
            };
            yAxis[0].splitNumber = 5;
            yAxis[0].nameGap = 20;

            yAxis[1] = {
                name: intl.formatMessage({ id: '温差' }),
                nameGap: 20,
                nameTextStyle: {
                    color: token.color2
                },
                axisLabel: {
                    formatter: '{value}',
                    color: token.color2,
                    fontSize: 14
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: token.color2
                    }
                },
                splitNumber: 5
            }

            date?.forEach(item => {
                fieldList.forEach(field => {
                    legendData.push(`${item} ${field}`);
                })
            })
            legendData.forEach((legend, index) => {
                const currentDate = legend?.split(' ')?.[0];
                const currentData = dataSource?.find(item => item.date === currentDate);
                const filed = index % 3 === 0 ? "TempMax" : (index % 3 === 1 ? "TempMin" : "TempDiff");
                const data = currentData?.energyData?.[filed];
                series.push({
                    yAxisIndex: index % 3 === 0 ? 0 : (index % 3 === 1 ? 0 : 1),
                    name: legend,
                    type: 'line',
                    showSymbol: false,
                    data: data?.map(item => item[1])
                })
            })
        }
        
        if (dataType === 1870 || dataType === 1930 || dataType === 1921 || dataType === 1920 || dataType === 1871 || dataType === 1931) {
        const fieldList = [dataProList.find(it=>it.value===dataType).label];
        date?.forEach(item => {
            fieldList.forEach(field => {
                legendData.push(`${item} ${field}`);
            })
        })
            legendData.forEach((legend, index) => {
                const currentDate = legend?.split(' ')?.[0];
                const currentData = dataSource?.find(item => item.date === currentDate);
                let filed = '';
                if (dataType == 1931 || dataType == 1930) {
                    filed = 'Cur';
                } else if (dataType == 1921 || dataType == 1920) {
                    filed = 'Vol';
                } else if (dataType == 1871 || dataType == 1870) {
                    filed = 'SOC';
                }
                const data = currentData?.energyData?.[filed];
        console.log(filed,dataType,currentData,1111111111);

                series.push({
                    name: legend,
                    type: 'line',
                    showSymbol: false,
                    data: data?.map(item => item[1])
                })
            })
        }
        console.log(series,1111111111);
        

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
                    color: token.color2
                }
            },
            grid: {
                top: '40',
                right: global.locale === "en-US" && (dataType === 414 || dataType === 415) ? '80' : '3%',
                left: global.locale === "en-US" && (dataType === 414 || dataType === 415) ? '180' : '5%',
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
                    color: token.color2,
                    textStyle: {
                        fontSize: 14
                    },
                },
            }],
            yAxis,
            series
        };
        setOption(option);
    }

    const getDtusOfPlant = async (plantList, plantId) => {
        const res = await getDtusOfPlantServe({ plantId });
        if (res?.data?.data) {
            let data = res?.data?.data;
            if (data) {
                try {
                    data = JSON.parse(data);
                } catch {
                    data = [];
                }
                data = data?.length > 0 ? data?.map(item => {
                    return {
                        value: item.id,
                        label: item.name || intl.formatMessage({ id: '设备无名称' }),
                        type: item.deviceTypeId
                    }
                }) : [];
                const currentIndex = plantList?.findIndex(item => item.value === plantId);
                plantList[currentIndex].children = data;
                setPlantDeviceList([...plantList]);
                const res = await getCurveTypeServe({ deviceType: data?.[0].type });
                setDataProList(res?.data?.data);
                const values = await form.validateFields();
                let { dataType,  } = values;
                    const currentData = res?.data?.data?.find(data => data.value == dataType);
                    const name = `${currentData?.label}(${currentData?.unit})`;
                    if (currentData) setTitle(name);
                const currentPlantDevice = await form.getFieldValue("currentPlantDevice");
                if (currentPlantDevice?.length === 0) {
                    form.setFieldsValue({
                        currentPlantDevice: [plantId, data[0].value],
                        dataType: res?.data?.data?.[0]?.value
                    })
                    setTimeout(async () => {
                        const params = await getParams(false);
                        getDataSource(params);
                    }, 200)
                }
            }
        }

    }

    const initPlantDevice = async () => {
        const res = await getFetchPlantListServe();
        if (res?.data?.data) {
            const data = res?.data?.data;
            const plantList = data?.plantList?.map((item, index) => {
                return {
                    value: item.plantId,
                    label: item.name,
                    disabled: data?.deviceCount?.[index] === 0,
                    children: data?.deviceCount?.[index] && [
                        {
                            value: '',
                            label: ''
                        }
                    ]
                }
            })
            if (plantList?.length > 0) {
                const findIndex = plantList.findIndex(item => !item.disabled);
                getDtusOfPlant(plantList, plantList?.[findIndex]?.value)
            }
        }
    }

    const getDataSource = async (params) => {
        setLoading(true);
        const res = await monitorCurveServe(params);
        if (res?.data?.data) {
            setDataSource(res?.data?.data)
        } else {
            setDataSource([]);
        }
        setLoading(false);
    }

    useEffect(() => {
        initOption();
    }, [dataSource, token, locale]);

    useEffect(() => {
        initPlantDevice();
    }, [locale])

    return (
        <Space size={30} direction="vertical" style={{ width: '100%', height: '100%', padding: 30, backgroundColor: token.titleCardBgc }}>
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
                        <Form.Item name={"currentPlantDevice"} label={intl.formatMessage({ id: '设备' })}>
                            <Cascader
                                changeOnSelect
                                options={plantDeviceList}
                                onChange={async value => {
                                    if (value?.length === 1) {
                                        getDtusOfPlant(plantDeviceList, value[0]);
                                    } else if (value?.length === 2) {
                                        form.setFieldsValue({
                                            dataType: undefined
                                        })
                                    }
                                    let currentPlant = plantDeviceList.find(it => it.value == value[0]);
                                    let currentDevice = currentPlant.children.find(it => it.value == value[1]);
                                    if (currentDevice.type) {
                                        const res = await getCurveTypeServe({ deviceType: currentDevice.type });
                                        setDataProList(res?.data?.data);
                                        const values = await form.validateFields();
                                        let { dataType,  } = values;
                                            const currentData = res?.data?.data?.find(data => data.value == dataType);
                                            const name = `${currentData?.label}(${currentData?.unit})`;
                                            if (currentData) setTitle(name);
                                    }
                                }}
                                style={{ width: '250px', height: 40 }}
                            />
                        </Form.Item>
                        <Form.Item name={"dataType"} label={intl.formatMessage({ id: '数据项' })}>
                            <Select
                                options={dataProList}
                                style={{ width: '250px', height: 40 }}
                            />
                        </Form.Item>
                        <Tooltip title={intl.formatMessage({ id: '最多选择3个对比项' })}>
                            <Form.Item
                                name="date"
                                label={intl.formatMessage({ id: '日期' })}
                            >
                                <DatePicker
                                    multiple
                                    maxTagCount={1}
                                    maxDate={dayjs(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD')}
                                    style={{ width: '300px', height: 40 }}
                                    allowClear={false}
                                />
                            </Form.Item>
                        </Tooltip>
                    </Flex>
                </Form>
                <Button
                    onClick={async () => {
                        setTimeout(async () => {
                            const params = await getParams();
                            if (params) {
                                getDataSource(params);
                            }
                        }, 200)
                    }}
                    type="primary"
                    style={{ padding: '0 20px', height: 40 }}
                >
                    {intl.formatMessage({ id: '查询' })}
                </Button>
                <Button
                    type="primary"
                    onClick={async () => {
                        const params = await getParams();
                        const res = await exportCurveServe(params);
                        if (res?.data) {
                            downloadFile({
                                fileName: `${intl.formatMessage({ id: '监测曲线' })}.xlsx`,
                                content: res?.data
                            })
                        }
                    }}
                    style={{ backgroundColor: token.defaultBg, padding: '0 20px', height: 40 }}
                >
                    {intl.formatMessage({ id: '导出' })} Excel
                </Button>
            </Flex>
            <Spin spinning={loading}>
                <Space direction="vertical" style={{ width: '100%' }}>
                    <Title title={title} />
                    <div style={{ width: '100%', height: 'calc(100vh - 250px)' }}>
                        {
                            dataSource?.length > 0 &&
                            <ReactECharts option={option} notMerge style={{ width: '100%', height: '100%' }} />
                        }
                    </div>
                </Space>
            </Spin>
        </Space>
    )
}

export default MonitoringCurves;