import { useIntl, useSelector } from "umi";
import { Form, Cascader, DatePicker, Button, Flex, Radio, theme, Space, message, Empty, Spin, Tooltip, Select } from "antd";
import { Title } from "@/components";
import ReactECharts from "echarts-for-react";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import * as echarts from "echarts";
import moment from "moment";
import {
    analyticsData as monitorCurveServe,
    exportAnalytics as exportAnalyticsServe,
    // getFetchPlantList2 as getFetchPlantListServe,
    getAnalyticsInitData as getAnalyticsInitDataServe,
    getCellInitData as getCellInitData, getCurveType2 as getCurveTypeServe2
} from "@/services";
import {
    getDtusOfPlant as getDtusOfPlantServe
} from "@/services/plant";
import {
    getFetchPlantList as getFetchPlantListServe,
} from "@/services/deviceTotal";
import { downloadFile } from "@/utils/utils";

const HighAnysis = () => {
    const intl = useIntl();
    const { token } = theme.useToken();
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([]);
    const [option, setOption] = useState({});
    const [plantDeviceList, setPlantDeviceList] = useState([]);
    const [packCellList, setPackCellList] = useState([]);
    const [loading, setLoading] = useState(false);
    const { locale } = useSelector(state => state.global);
    const [dataProList, setDataProList] = useState([]);

    const getParams = async (showMessage = true) => {
        let format = "YYYY-MM-DD";
        const values = await form.validateFields();
        let { date, currentPlantDevice, dataType, packCell } = values;
        date = date?.map(item => dayjs(item).format(format));
        let flag = false;
        if (!currentPlantDevice || currentPlantDevice?.length < 2) {
            showMessage && message.error(intl.formatMessage({ id: '请选择电站下具体设备' }));
            flag = true;
        };
        if (dataType === "FUSE_TEMPERATURE_COMBOS" || dataType === "POLE_TEMPERATURE_COMBOS") {
            if (packCellList?.[0]?.children?.length > 0 && packCell?.length < 2) {
                showMessage && message.error(intl.formatMessage({ id: '请选择pack' }));
                flag = true;
            } else {
                if (packCell?.length < 1) {
                    showMessage && message.error(intl.formatMessage({ id: '请选择pack' }));
                    flag = true;
                }
            }
        } else {
            if (packCell?.length < 2) {
                showMessage && message.error(intl.formatMessage({ id: '请选择电芯' }));
                flag = true;
            }
        }
        if (date?.length > 3) {
            showMessage && message.error(intl.formatMessage({ id: '最多选择3个对比项' }));
            flag = true;
        }
        if (flag) return Promise.reject("参数错误");
        let params = {
            dtuId: currentPlantDevice?.[1],
            dataType: [dataType],
            dates: date,
            cell: packCell?.length == 3 ? packCell?.[2] : packCell?.[1],
            pack: packCell?.length == 3 ? packCell?.[1] : packCell?.[0],
            cluster: packCell?.length == 3 ? packCell?.[0] : null
        }
        if (dataType === "FUSE_TEMPERATURE_COMBOS" || dataType === "POLE_TEMPERATURE_COMBOS") {
            params = {
                dtuId: currentPlantDevice?.[1],
                dataType: [dataType],
                dates: date,
                pack: packCell?.length == 2 ? packCell?.[1] : packCell?.[0],
                cluster: packCell?.length == 2 ? packCell?.[0] : null
            }
        }
        return params;
    }

    const initOption = async () => {
        let format = "YYYY-MM-DD";
        const values = await form.validateFields();
        let { dataType, date } = values;

        let legendData = [], series = [], xData = [], min = 0, max = 100, splitNumber = 5;
        date = date.map(item => dayjs(item).format(format));
        let xArr = [];
        for (var key in dataSource?.[0]?.value) {
            xArr.push(key);
        }
        xData = xArr;

        dataSource?.forEach((item,) => {
            legendData.push(item.label)
        })
        legendData.forEach((legend, index) => {
            const currentDate = legend?.split(' ')?.[0];
            const currentData = dataSource?.find(item => item.date === currentDate && item.dataType == dataSource[index].dataType);
            const data = [];
            for (let key in currentData?.value) {
                data.push(currentData?.value[key])
            }
            series.push({
                name: legend,
                type: 'line',
                showSymbol: false,
                data: data
            })
        })

        if (dataType === 'CELL_VOL') {
            min = 2.5;
            max = 4;
            splitNumber = 10;
        }

        if (dataType === 'MONOMER_TEMPERATURE_COMBOS') {
            min = 10;
            max = 40;
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
                    color: token.echartsFontColor
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
                        color: token.echartsSplitColor
                    }
                },
                axisLabel: {
                    margin: 10,
                    color: token.echartsFontColor,
                    textStyle: {
                        fontSize: 14
                    },
                },
            }],
            yAxis: [{
                name: dataSource?.[0]?.unit, 
                nameTextStyle: {
                    color: token.echartsFontColor
                },
                axisLabel: {
                    formatter: '{value}',
                    color: token.echartsFontColor,
                    fontSize: 14
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: token.echartsSplitColor
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

    const fuseTempOrPoleTempExcute = async () => {
        const { currentPlantDevice } = await form.getFieldsValue(['currentPlantDevice']);
        if (currentPlantDevice?.length < 2) return;
        let packCellList = [];
        const packCellListRes = await getAnalyticsInitDataServe({ dtuId: currentPlantDevice?.[1] });
        if (packCellListRes?.data?.data?.packs?.length > 0) {
            var tempData = []
            if (packCellListRes?.data?.data?.clusters) {
                var packData = []
                packCellListRes?.data?.data?.packs?.forEach((item, index) => {
                    packData.push({
                        label: item.label,
                        value: item.value,
                    })
                })
                packCellListRes?.data?.data?.clusters?.forEach((clu, index) => {
                    tempData.push({
                        label: clu.label,
                        value: clu.value,
                        children: packData
                    })
                })
                packCellList = tempData;
                console.log('in', packCellList)
                setPackCellList(packCellList);
                form.setFieldsValue({
                    packCell: [packCellList?.[0]?.value, packCellList?.[0]?.children?.[0]?.value]
                })
            } else {
                packCellListRes?.data?.data?.packs?.forEach((item, index) => {
                    tempData.push({
                        label: item.label,
                        value: item.value
                    })
                })
                packCellList = tempData;
                setPackCellList(packCellList);
                setTimeout(() => {
                    setPackCellList(packCellList);
                }, 500);
                form.setFieldsValue({
                    packCell: [packCellList?.[0]?.value]
                })
            }
        } else {
            setPackCellList([]);
            form.setFieldsValue({
                packCell: []
            })
        }
    }
    const notFuseTempOrPoleTempExcute = async () => {
        const { currentPlantDevice } = await form.getFieldsValue(['currentPlantDevice']);
        if (currentPlantDevice?.length < 2) return;
        let packCellList = [];
        const packCellListRes = await getAnalyticsInitDataServe({ dtuId: currentPlantDevice?.[1] });
        if (packCellListRes?.data?.data?.packs?.length > 0) {
            var tempData = []
            if (packCellListRes?.data?.data?.clusters) {
                var packData = []
                packCellListRes?.data?.data?.packs?.forEach((item, index) => {
                    packData.push({
                        label: item.label,
                        value: item.value,
                        children: packCellListRes?.data?.data?.cells
                    })
                })
                packCellListRes?.data?.data?.clusters?.forEach((clu, index) => {
                    tempData.push({
                        label: clu.label,
                        value: clu.value,
                        children: packData
                    })
                })
                packCellList = tempData;
            } else {
                packCellListRes?.data?.data?.packs?.forEach((item, index) => {
                    tempData.push({
                        label: item.label,
                        value: item.value,
                        children: packCellListRes?.data?.data?.cells
                    })
                })
                packCellList = tempData;
            }
            setPackCellList(packCellList);
            form.setFieldsValue({
                packCell: (packCellList?.[0]?.children?.[0]?.children?.[0]?.value != undefined) ?
                    [packCellList?.[0]?.value, packCellList?.[0]?.children?.[0]?.value, packCellList?.[0]?.children?.[0]?.children?.[0]?.value]
                    :
                    [packCellList?.[0]?.value, packCellList?.[0]?.children?.[0]?.value]
            })
        } else {
            setPackCellList([]);
            form.setFieldsValue({
                packCell: []
            })
        }
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
                const res = await getCellInitData();
                const dataProList = res?.data?.data;
                setDataProList(dataProList);
                setPlantDeviceList([...plantList]);
                form.setFieldsValue({
                    dataType: dataProList?.[0]?.value,
                })

                const { currentPlantDevice } = await form.getFieldsValue(['currentPlantDevice']);
                if (currentPlantDevice?.length === 0) {
                    form.setFieldsValue({
                        currentPlantDevice: [plantId, data?.[0]?.value]
                    })

                    if (dataType === "FUSE_TEMPERATURE_COMBOS" || dataType === "POLE_TEMPERATURE_COMBOS") {
                        fuseTempOrPoleTempExcute();
                    } else {
                        notFuseTempOrPoleTempExcute();
                    }

                    setTimeout(async () => {
                        const params = await getParams(false);
                        getDataSource(params);
                    }, 500)
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
        try {
            const res = await monitorCurveServe(params);
            if (res?.data?.data) {
                setDataSource(res?.data?.data)
            } else {
                setDataSource([]);
            }
        } finally {
            setLoading(false);
        }
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
                    onValuesChange={async (value) => {
                        if (value?.dataType) {
                            if (value?.dataType === "FUSE_TEMPERATURE_COMBOS" || value?.dataType === "POLE_TEMPERATURE_COMBOS") {
                                fuseTempOrPoleTempExcute();
                            } else {
                                notFuseTempOrPoleTempExcute();
                            }
                        }
                        if (value?.currentPlantDevice?.length === 2) {
                            const { dataType } = await form.getFieldsValue(['dataType']);
                            if (dataType === "FUSE_TEMPERATURE_COMBOS" || dataType === "POLE_TEMPERATURE_COMBOS") {
                                fuseTempOrPoleTempExcute();
                            } else {
                                notFuseTempOrPoleTempExcute();
                            }
                        }
                    }}
                >
                    <Flex align="center">
                        <Form.Item name={"currentPlantDevice"} label={intl.formatMessage({ id: '设备' })}>
                            <Cascader
                                changeOnSelect
                                options={plantDeviceList}
                                onChange={async value => {
                                    if (value?.length === 1) {
                                        getDtusOfPlant(plantDeviceList, value[0])
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
                        <Form.Item name={"packCell"} label={intl.formatMessage({ id: 'pack' })}>
                            <Cascader
                                options={packCellList}
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