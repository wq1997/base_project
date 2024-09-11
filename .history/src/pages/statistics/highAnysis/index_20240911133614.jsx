import { useIntl, useSelector } from "umi";
import { Form, Cascader, DatePicker, Button, Flex, Radio, theme as antdTheme, Space, message, Empty, Spin, Tooltip, Select } from "antd";
import { Title } from "@/components";
import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import * as echarts from "echarts";
import moment from "moment";
import {
    analyticsData as monitorCurveServe,
    exportAnalytics as exportAnalyticsServe,
    getFetchPlantList2 as getFetchPlantListServe,
    getAnalyticsInitData as getAnalyticsInitDataServe
} from "@/services";
import {
    getDtusOfPlant as getDtusOfPlantServe
} from "@/services/plant";
import { downloadFile } from "@/utils/utils";

const HighAnysis = () => {
    const intl = useIntl();
    const { token } = antdTheme.useToken();
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([]);
    const [option, setOption] = useState({});
    const [plantDeviceList, setPlantDeviceList] = useState([]);
    const [packCellList, setPackCellList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState(`${intl.formatMessage({ id: '电芯详情' })}`);
    const global = useSelector(state => state.global);
    const { theme, locale } = global;

    const dataProList = [
        {
            value: 'vol',
            label: intl.formatMessage({ id: '单体电压' }),
            unit: 'V'
        },
        {
            value: 'temp',
            label: intl.formatMessage({ id: '单体温度' }),
            unit: '℃'
        },
    ]

    const getParams = async (showMessage = true) => {
        let format = "YYYY-MM-DD";
        const values = await form.validateFields();
        let { date, currentPlantDevice, dataType, packCell } = values;
        date = date?.map(item => dayjs(item).format(format));
        let flag = false;
        if (date?.length > 3) {
            showMessage && message.error(intl.formatMessage({ id: '最多选择3个对比项' }));
            flag = true;
        }
        if (packCell?.length < 2) {
            showMessage && message.error(intl.formatMessage({ id: '请选择电芯' }));
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
            dateList: date,
            packCell: packCell?.[1]
        }
        return params;
    }

    const initOption = async () => {
        let format = "YYYY-MM-DD";
        const values = await form.validateFields();
        let { dataType, date } = values;
        const currentData = dataProList.find(data => data.value == dataType);
        const name = `${currentData?.label}(${currentData?.unit})`;
        if (currentData) setTitle(name);

        let legendData = [], series = [], xData = [], min = 0, max = 100, splitNumber = 5;
        date = date.map(item => dayjs(item).format(format));
        xData = dataSource?.[0]?.timeList;

        if (dataType === 'vol') {
            const fieldList = [intl.formatMessage({ id: '电压' })];

            date?.forEach(item => {
                fieldList.forEach(field => {
                    legendData.push(`${item} ${field}`);
                })
            })
            legendData.forEach((legend, index) => {
                const currentDate = legend?.split(' ')?.[0];
                const currentData = dataSource?.find(item => item.date === currentDate);
                const filed = "vol";
                const data = currentData?.energyData?.[filed];
                series.push({
                    name: legend,
                    type: 'line',
                    showSymbol: false,
                    data: data?.map(item => item[1])
                })
            })
            min = 2.5;
            max = 4;
            splitNumber = 10;
        }

        if (dataType === 'temp') {
            const fieldList = [intl.formatMessage({ id: '单体温度' }), intl.formatMessage({ id: '左侧熔断器温度' }), intl.formatMessage({ id: '右侧熔断器温度' }), intl.formatMessage({ id: '负极极柱温度' }), intl.formatMessage({ id: '正极极柱温度' })];

            date?.forEach(item => {
                fieldList.forEach(field => {
                    legendData.push(`${item} ${field}`);
                })
            })
            legendData.forEach((legend, index) => {
                const currentDate = legend?.split(' ')?.[0];
                const currentData = dataSource?.find(item => item.date === currentDate);
                const filed = index % 4 === 0 ? "temp" : (index % 4 === 1 ? "tempLeft" : (index % 4 === 2 ? "tempRight" : index % 4 === 3 ? "tempNeg" : "tempPos"));
                const data = currentData?.energyData?.[filed];
                series.push({
                    name: legend,
                    type: 'line',
                    showSymbol: false,
                    data: data?.map(item => item[1])
                })
            })

            min = 10;
            max = 45;
            splitNumber = 5;
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
                    color: token.color10
                }
            },
            grid: {
                top: dataType === 'temp' ? (date?.length === 1 ? 50 : 90) : 50,
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
                    textStyle: {
                        color: token.color10,
                        fontSize: 12
                    },
                },
            }],
            yAxis: [{
                axisLabel: {
                    formatter: '{value}',
                    color: token.color10,
                    fontSize: 12
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: token.color20,
                    }
                },
                min,
                max,
                splitNumber
            }],
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
                        label: item.name || intl.formatMessage({ id: '设备无名称' })
                    }
                }) : [];
                const currentIndex = plantList?.findIndex(item => item.value === plantId);
                plantList[currentIndex].children = data;
                setPlantDeviceList([...plantList]);

                const currentPlantDevice = await form.getFieldValue("currentPlantDevice")
                if (currentPlantDevice?.length === 0) {
                    let packCellList = [];
                    const packCellListRes = await getAnalyticsInitDataServe({ dtuId: data?.[0]?.value });
                    if (packCellListRes?.data?.data?.packCellList) {
                        const data = packCellListRes?.data?.data?.packCellList;
                        packCellList = data;
                    }
                    setPackCellList(packCellList);
                    form.setFieldsValue({
                        currentPlantDevice: [plantId, data?.[0]?.value],
                        dataType: 'vol',
                        packCell: [packCellList?.[0]?.value, packCellList?.[0]?.children?.[0]?.value]
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
    }, [dataSource, theme, locale]);

    useEffect(() => {
        initPlantDevice();
    }, [])

    return (
        <Space size={30} direction="vertical" style={{ width: '100%', height: '100%', padding: 30 }}>
            <Flex justify="center" align="center" wrap="wrap" gap={10}>
                <Form
                    form={form}
                    layout="inline"
                    initialValues={{
                        currentPlantDevice: [],
                        date: [dayjs(moment().format("YYYY-MM-DD"))]
                    }}
                    onValuesChange={async (value) => {
                        if (value?.currentPlantDevice?.length === 2) {
                            let packCellList = [];
                            const packCellListRes = await getAnalyticsInitDataServe({ dtuId: value?.currentPlantDevice?.[1] });
                            if (packCellListRes?.data?.data?.packCellList?.length > 0) {
                                const data = packCellListRes?.data?.data?.packCellList;
                                packCellList = data;
                                setPackCellList(packCellList);
                                form.setFieldsValue({
                                    packCell: [packCellList?.[0]?.value, packCellList?.[0]?.children?.[0]?.value]
                                })
                                const params = await getParams();
                                if (params) {
                                    getDataSource(params);
                                }
                            } else {
                                setPackCellList([]);
                                form.setFieldsValue({
                                    packCell: []
                                })
                            }
                        }
                    }}
                >
                    <Flex align="center" >
                        <Form.Item name={"currentPlantDevice"} label={intl.formatMessage({ id: '设备' })}>
                            <Cascader
                                changeOnSelect
                                options={plantDeviceList}
                                onChange={async value => {
                                    if (value?.length === 1) {
                                        getDtusOfPlant(plantDeviceList, value[0])
                                    }
                                }}
                                style={{ width: '200px', height: 40 }}
                            />
                        </Form.Item>
                        <Form.Item name={"dataType"} label={intl.formatMessage({ id: '数据项' })}>
                            <Select
                                options={dataProList}
                                style={{ width: '200px', height: 40 }}
                            />
                        </Form.Item>
                        <Form.Item name={"packCell"} label={intl.formatMessage({ id: 'pack' })}>
                            <Cascader
                                changeOnSelect
                                options={packCellList}
                                style={{ width: '200px', height: 40 }}
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
                        const params = await getParams();
                        if (params) {
                            getDataSource(params);
                        }
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
                        const res = await exportAnalyticsServe(params);
                        if (res?.data) {
                            downloadFile({
                                fileName: `${intl.formatMessage({ id: '电芯详情' })}.xlsx`,
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
                    <div style={{ width: '100%', height: 'calc(100vh - 200px)' }}>
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

export default HighAnysis;