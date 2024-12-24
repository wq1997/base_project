import { Flex, theme as antdTheme, Select, Form, DatePicker, message, Radio } from "antd";
import Title from "./Title";
import { useIntl, useSelector } from "umi";
import { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import {
    getRevenue as getRevenueServe,
    getDtusOfPlant as getDtusOfPlantServe
} from "@/services/plant";
import dayjs from "dayjs";
import moment from "moment";
import { SCREEN_INTERVAL_TIME } from "@/utils/constants";
import styles from "./index.less";

let timer = null;
const RealPower = ({ plantId }) => {
    const intl = useIntl();
    const { token } = antdTheme.useToken();
    const { theme } = useSelector(state => state.global);
    const [option, setOption] = useState({});
    const [form] = Form.useForm();
    const [deviceList, setDeviceList] = useState([]);
    const [dataSource, setDataSource] = useState([]);

    const getParams = async () => {
        let format = "YYYY-MM-DD";
        let params = {};
        const values = await form.validateFields();
        const { date, deviceId, changeType } = values;
        if (date?.length > 3) {
            message.error(intl.formatMessage({ id: '最多选择3个对比项' }));
            return;
        }
        params = {
            changeType,
            dtuId: deviceId,
            dates: date?.map(item => dayjs(item).format(format)),
            dataType: ["DTU_PCS_POWER"],
        }
        return params;
    }

    const getOptions = () => {
        let series = [], xData = [],
            legendData = Array.from(new Set(dataSource?.map(item => item?.label)));
        let hasSOC = legendData?.findIndex(item => item.indexOf("SOC") > -1) > -1;

        const yAxis = [
            {
                name: `${intl.formatMessage({ id: "功率" })}(kW)`,
                nameTextStyle: {
                    color: token.echartsFontColor,
                    lineHeight: 30
                },
                "type": "value",
                "splitLine": {
                    "show": true,
                    lineStyle: {
                        color: token.echartsSplitColor,
                    }
                },
                "axisLine": {
                    "show": false
                },
                "axisTick": {
                    "show": false
                },
                "splitArea": {
                    "show": false
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: token.echartsFontColor
                    },
                    formatter: '{value}',
                },
            },
        ];
        if (hasSOC) {
            yAxis.push({
                name: `${intl.formatMessage({ id: "SOC" })}(%)`,
                nameTextStyle: {
                    color: token.echartsFontColor,
                    lineHeight: 30
                },
                "type": "value",
                "splitLine": {
                    "show": false,
                    lineStyle: {
                        color: token.echartsSplitColor,
                    }
                },
                "axisLine": {
                    "show": false
                },
                "axisTick": {
                    "show": false
                },
                "splitArea": {
                    "show": false
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: token.echartsFontColor
                    },
                    formatter: '{value}',
                }
            },)
        }

        dataSource.forEach(data => {
            series.push({
                name: data?.label,
                type: 'line',
                showSymbol: false,
                yAxisIndex: data?.label?.indexOf("SOC") > -1 ? 1 : 0,
                data: Object.values(data?.value),
                markLine: data?.timeTypes?.length > 0 ? {
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                color: token.echartsSplitColor,
                                type: 'dotted'
                            },

                            label: {
                                formatter: '',
                            }
                        }
                    },
                    lineStyle: {
                        normal: {
                            type: 'dashed'
                        }
                    },
                    data: data?.timeTypes?.map((item, index) => {
                        if (index === 0) return { xAxis: -1 };
                        return {
                            xAxis: moment(`1997-05-05 ${item?.startTime}`).format("HH:mm")
                        }
                    })
                } : {},
                markArea: data?.timeTypes?.length > 0 ? {
                    silent: true,
                    itemStyle: {
                        normal: {
                            color: 'transparent',
                        }
                    },
                    data: data?.timeTypes?.map(item => {
                        return [
                            {
                                name: item?.name,
                                xAxis: moment(`1997-05-05 ${item?.startTime}`).format("HH:mm"),
                                label: {
                                    color: token.echartsFontColor
                                }
                            },
                            {
                                xAxis: moment(`1997-05-05 ${item?.endTime}`).format("HH:mm")
                            }
                        ]
                    })
                } : {}
            })
            xData = Object.keys(data?.value)
        });

        let newOption = {
            grid: {
                left: 70,
                right: hasSOC ? 50 : 30,
                top: 45,
                bottom: 40
            },
            "tooltip": {
                "trigger": "axis",
                "axisPointer": {
                    "type": "shadow"
                },
            },
            legend: {
                data: legendData,
                textStyle: {
                    color: token.echartsFontColor
                },
            },
            yAxis,
            xAxis: {
                type: 'category',
                "axisTick": {
                    "show": false
                },
                data: xData,
            },
            series
        };
        setOption(newOption);
    }

    const getDataSource = async () => {
        const params = await getParams();
        if (params) {
            let res = await getRevenueServe(params);
            if (res?.data?.data) {
                setDataSource(res?.data?.data)
            } else {
                setDataSource([]);
            }
        }
    }

    const getDtusOfPlant = async () => {
        const res = await getDtusOfPlantServe({ plantId });
        if (res?.data?.code === 'ok') {
            let data = res?.data?.data ? JSON.parse(res?.data?.data) : [];
            if (data) {
                data = data?.length > 0 ? data?.map(item => {
                    return {
                        value: item.id,
                        label: item.name || intl.formatMessage({ id: '设备无名称' })
                    }
                }) : [];
                const initDeviceId = data?.[0]?.value;
                form.setFieldsValue({ changeType: "DEVICE", deviceId: initDeviceId });
                setDeviceList(data);
            }
        }
    }

    useEffect(() => {
        getOptions();
    }, [dataSource, theme]);

    useEffect(() => {
        if (deviceList?.length > 0) {
            getDataSource();
            clearInterval(timer);
            timer = setInterval(() => {
                getDataSource();
            }, SCREEN_INTERVAL_TIME);
        }
    }, [deviceList])

    useEffect(() => {
        if (plantId) getDtusOfPlant();
    }, [plantId]);

    useEffect(() => {
        return () => {
            clearInterval(timer);
        }
    }, [])

    return (
        <div className={styles.realPower}>
            <Flex justify="space-between" align="center">
                <Title title={intl.formatMessage({ id: "运行监测" })} />
                <div className={styles.search}>
                    <Flex justify="space-between" align="center" gap={8}>
                        <Form
                            form={form}
                            layout="inline"
                            onValuesChange={() => {
                                getDataSource();
                            }}
                            initialValues={{
                                date: [dayjs(moment().format("YYYY-MM-DD"))]
                            }}
                            style={{
                                margin: 0
                            }}
                        >
                            <Form.Item
                                name={"deviceId"}
                                label={intl.formatMessage({ id: '设备' })}
                            >
                                <Select
                                    style={{ width: 200 }}
                                    placeholder={intl.formatMessage({ id: "请选择设备" })}
                                    options={deviceList}
                                />
                            </Form.Item>
                            <Form.Item
                                name="date"
                                label={intl.formatMessage({ id: '日期' })}
                                style={{
                                    margin: 0
                                }}
                            >
                                <DatePicker
                                    multiple
                                    style={{ width: 200 }}
                                    maxTagCount={1}
                                    maxDate={dayjs(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD')}
                                    allowClear={false}
                                />
                            </Form.Item>
                        </Form>
                    </Flex>
                </div>
            </Flex>
            <div className={styles.echarts}>
                <ReactECharts
                    option={option}
                    style={{ width: '100%', height: '100%' }}
                    notMerge
                />
            </div>
        </div>
    )
}

export default RealPower;