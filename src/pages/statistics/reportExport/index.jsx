import { Form, Flex, Select, Modal, theme as antdTheme, Button, Descriptions, Table, DatePicker, Checkbox, message } from "antd";
import { useIntl, useSelector } from "umi";
import dayjs from "dayjs";
import moment from "moment";
import styles from "./index.less";
import { useEffect, useState } from "react";
import {
    getFetchPlantList2 as getFetchPlantListServe,
    getDateConfig as getDateConfigServe,
    postDateConfig as postDateConfigServe,
    postReportExportData as postReportExportDataServe,
    getPlantBaseInfo as getPlantBaseInfoServe,
    minsysEnergyEarningReport as minsysEnergyEarningReportServe,
    energyEarningExistFee as energyEarningExistFeeServe
} from "@/services";
import { Title, EditTable } from "@/components";
import { downloadFile } from "@/utils/utils";

const ReportExport = () => {
    const intl = useIntl();
    const [form] = Form.useForm();
    const { locale } = useSelector(state => state.global);
    const [dataChangeForm] = Form.useForm();
    const { token } = antdTheme.useToken();
    const [plantList, setPlantList] = useState([]);
    const [electricDataSource, setElectricDataSource] = useState([]);
    const [incomeDataSource, setIncomeDataSource] = useState([]);
    const [electricFeeDataSource, setElectricFeeDataSource] = useState([]);
    const [open, setOpen] = useState(false);
    const [initFeeConfig, setInitConfig] = useState([]);
    const [params, setParams] = useState();
    const [showData, setShowData] = useState([]);
    const [showElectricFeeTable, setShowElectricFeeTable] = useState(false);
    const [plantInfo, setPlantInfo] = useState({});

    const getPlantList = async () => {
        const res = await getFetchPlantListServe();
        if (res?.data?.data) {
            const data = res?.data?.data;
            const plantList = data?.plantList?.map((item, index) => {
                return {
                    value: item.plantId,
                    label: item.name,
                }
            })
            if (plantList?.length > 0) {
                await form.setFieldsValue({
                    plantId: plantList?.[0]?.value
                })
                setPlantList(plantList);
            }
        }
    }

    const getPlantBaseInfo = async () => {
        const res = await getPlantBaseInfoServe(params?.plantId);
        if (res?.data?.code === "ok") {
            setPlantInfo(res?.data?.data);
        }
    }

    const getTableDataSource = async () => {
        const res = await postReportExportDataServe({
            plantId: params?.plantId,
            startDate: params?.startDate,
            endDate: params?.endDate,
            dateType: params?.dateType,
            deviceType: params?.plantId === 1807 ? "meter" : "device"
        })
        if (res?.data?.code === "ok") {
            const data = res?.data?.data;
            let electricFeeDataSource = [];
            setElectricDataSource(data);
            setIncomeDataSource(data);
            data?.forEach(item => {
                const detail = item?.detail || [];
                detail.forEach(data => {
                    [
                        `${intl.formatMessage({ id: '电量' })}(kWh)`,
                        `${intl.formatMessage({ id: '收益' })}(${intl.formatMessage({ id: '元' })})`
                    ].forEach((typeName, index) => {
                        if (index === 0) {
                            electricFeeDataSource.push({
                                displayTime: data?.displayTime,
                                name: data?.name,
                                sn: data?.sn,
                                typeName,
                                dayCharge: data?.dayChargeEnergy,
                                tipCharge: data?.tipChargeEnergy,
                                peakCharge: data?.peakChargeEnergy,
                                flatCharge: data?.flatChargeEnergy,
                                valleyCharge: data?.valleyChargeEnergy,
                                dayDischarge: data?.dayDischargeEnergy,
                                tipDischarge: data?.tipDischargeEnergy,
                                peakDischarge: data?.peakDischargeEnergy,
                                flatDischarge: data?.flatDischargeEnergy,
                                valleyDischarge: data?.valleyDischargeEnergy
                            })
                        }
                        if (index === 1) {
                            electricFeeDataSource.push({
                                displayTime: data?.displayTime,
                                name: data?.name,
                                sn: data?.sn,
                                typeName,
                                dayCharge: data?.dayChargeEarning,
                                tipCharge: data?.tipChargeEarning,
                                peakCharge: data?.peakChargeEarning,
                                flatCharge: data?.flatChargeEarning,
                                valleyCharge: data?.valleyChargeEarning,
                                dayDischarge: data?.dayDischargeEarning,
                                tipDischarge: data?.tipDischargeEarning,
                                peakDischarge: data?.peakDischargeEarning,
                                flatDischarge: data?.flatDischargeEarning,
                                valleyDischarge: data?.valleyDischargeEarning
                            })
                        }
                    })
                });
                [
                    `${intl.formatMessage({ id: '电量' })}(kWh)`,
                    `${intl.formatMessage({ id: '收益' })}(${intl.formatMessage({ id: '元' })})`
                ].forEach((typeName, index) => {
                    if (index === 0) {
                        electricFeeDataSource.push({
                            displayTime: item?.displayTime,
                            name: intl.formatMessage({ id: '合计' }),
                            sn: '',
                            typeName,
                            dayCharge: item?.dayChargeEnergy,
                            tipCharge: item?.tipChargeEnergy,
                            peakCharge: item?.peakChargeEnergy,
                            flatCharge: item?.flatChargeEnergy,
                            valleyCharge: item?.valleyChargeEnergy,
                            dayDischarge: item?.dayDischargeEnergy,
                            tipDischarge: item?.tipDischargeEnergy,
                            peakDischarge: item?.peakDischargeEnergy,
                            flatDischarge: item?.flatDischargeEnergy,
                            valleyDischarge: item?.valleyDischargeEnergy
                        })
                    }
                    if (index === 1) {
                        electricFeeDataSource.push({
                            displayTime: item?.displayTime,
                            name: '',
                            sn: '',
                            typeName,
                            dayCharge: item?.dayChargeEarning,
                            tipCharge: item?.tipChargeEarning,
                            peakCharge: item?.peakChargeEarning,
                            flatCharge: item?.flatChargeEarning,
                            valleyCharge: item?.valleyChargeEarning,
                            dayDischarge: item?.dayDischargeEarning,
                            tipDischarge: item?.tipDischargeEarning,
                            peakDischarge: item?.peakDischargeEarning,
                            flatDischarge: item?.flatDischargeEarning,
                            valleyDischarge: item?.valleyDischargeEarning
                        })
                    }
                });
            })
            setElectricFeeDataSource(electricFeeDataSource);
        }
    }

    const getDataSource = async () => {
        getPlantBaseInfo();
        getTableDataSource();
    }

    const getShowData = async () => {
        const res = await getDateConfigServe(params?.plantId);
        if (res?.data?.code === "ok") {
            const data = res?.data?.data;
            const showConfig = JSON.parse(data?.showConfig);
            const feeConfig = JSON.parse(data?.feeConfig);
            const plantBaseInfo = [], detailReport = [];
            ["name", "installTime", "timeZone", "priceUnit", "address", "dtuCount"].forEach(item => {
                if (showConfig.includes(item)) {
                    plantBaseInfo.push(item);
                }
            });
            ["energyTable", "earningTable"].forEach(item => {
                if (showConfig.includes(item)) {
                    detailReport.push(item);
                }
            })
            if (params?.plantId === 1807) {
                const feeConfigData = [
                    {
                        targetSoc1: `${intl.formatMessage({ id: '电价' })}(${intl.formatMessage({ id: '元' })})`,
                        tip: feeConfig?.tip,
                        peak: feeConfig?.peak,
                        flat: feeConfig?.flat,
                        valley: feeConfig?.valley,
                    }
                ];
                dataChangeForm.setFieldsValue({
                    plantBaseInfo,
                    detailReport,
                    feeConfig: feeConfigData
                })
                setInitConfig(feeConfigData)
            } else {
                dataChangeForm.setFieldsValue({
                    plantBaseInfo,
                    detailReport
                })
            }
            setShowData(showConfig)
        }
    }

    const getParams = async () => {
        const params = await form.validateFields();
        let { plantId, reportType, date } = params;
        let requestParams = {};
        if (Array.isArray(date)) date = date?.[0];
        if (reportType === "day") {
            requestParams.plantId = plantId;
            requestParams.startDate = dayjs(date).format("YYYY-MM-DD");
            requestParams.endDate = dayjs(date).format("YYYY-MM-DD");
            requestParams.dateType = reportType;
        }
        if (reportType === "week") {
            requestParams.plantId = plantId;
            requestParams.startDate = dayjs(date).add(-6, 'days').format("YYYY-MM-DD");
            requestParams.endDate = dayjs(date).format("YYYY-MM-DD");
            requestParams.dateType = "day";
        }
        if (reportType === "month") {
            requestParams.plantId = plantId;
            requestParams.startDate = dayjs(date).format("YYYY-MM");
            requestParams.endDate = dayjs(date).format("YYYY-MM");
            requestParams.dateType = "month";
        }
        if (reportType === "year") {
            requestParams.plantId = plantId;
            requestParams.startDate = `${dayjs(date).format("YYYY")}-01`;
            requestParams.endDate = `${dayjs(date).format("YYYY")}-12`;
            requestParams.dateType = "month";
        }
        if (reportType === "all") {
            requestParams.plantId = plantId;
            requestParams.startDate = dayjs(date).format("YYYY");
            requestParams.endDate = dayjs(date).format("YYYY");
            requestParams.dateType = "year";
        }
        setParams({
            ...params,
            ...requestParams
        });
    }

    useEffect(() => {
        if (params) {
            setShowElectricFeeTable(
                params?.plantId === 1807
                && params?.reportType === "month"
                && moment(dayjs(params?.date).format("YYYY-MM")).isBefore(moment().format("YYYY-MM"))
            );
            getDataSource();
            getShowData();
        }
    }, [params, locale]);

    useEffect(() => {
        if (plantList?.length > 0) getParams();
    }, [plantList]);

    useEffect(() => {
        getPlantList();
    }, [])

    return (
        <div className={styles.reportExport}>
            <Flex justify="center" align="center" gap={5}>
                <Form
                    form={form}
                    layout="inline"
                    onValuesChange={(changeValue, values) => {
                        getParams();
                    }}
                    initialValues={{
                        reportType: 'day',
                        date: [dayjs(moment().format("YYYY-MM-DD"))],
                    }}
                >
                    <Flex justify="center" align="center">
                        <Form.Item name={"plantId"} label={intl.formatMessage({ id: '电站' })}>
                            <Select options={plantList} style={{ width: '250px', height: 40 }} />
                        </Form.Item>
                        <Form.Item name={"reportType"} label={intl.formatMessage({ id: '报表类型' })}>
                            <Select
                                style={{ width: '250px', height: 40 }}
                                options={[
                                    { label: intl.formatMessage({ id: '日统计报表' }), value: 'day' },
                                    { label: intl.formatMessage({ id: '周统计报表' }), value: 'week' },
                                    { label: intl.formatMessage({ id: '月统计报表' }), value: 'month' },
                                    { label: intl.formatMessage({ id: '年统计报表' }), value: 'year' },
                                    { label: intl.formatMessage({ id: '总统计报表' }), value: 'all' },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item dependencies={["reportType"]}>
                            {({ getFieldsValue }) => {
                                const { reportType } = getFieldsValue(["reportType"]);
                                return (
                                    <Form.Item name={"date"} label={intl.formatMessage({ id: '对比日期' })}>
                                        <DatePicker
                                            picker={
                                                {
                                                    "day": 'day',
                                                    "week": 'day',
                                                    "month": 'month',
                                                    "year": 'year',
                                                    "all": 'year'
                                                }[reportType]
                                            }
                                            maxDate={dayjs(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD')}
                                        />
                                    </Form.Item>
                                )
                            }}
                        </Form.Item>
                    </Flex>
                </Form>
                <Button
                    onClick={async () => {
                        setOpen(true);
                    }}
                    type="primary"
                    style={{ padding: '0 20px', height: 40 }}
                >
                    {intl.formatMessage({ id: '数据选择' })}
                </Button>
                <Button
                    type="primary"
                    onClick={async () => {
                        const res = await minsysEnergyEarningReportServe({
                            plantId: params?.plantId,
                            startDate: params?.startDate,
                            endDate: params?.endDate,
                            dateType: params?.dateType,
                            deviceType: params?.plantId === 1807 ? "meter" : "device"
                        });
                        if (res?.data) {
                            downloadFile({
                                fileName: `${intl.formatMessage({ id: '报表导出' })}.xlsx`,
                                content: res?.data
                            })
                        }
                    }}
                    style={{ backgroundColor: token.defaultBg, padding: '0 20px', height: 40 }}
                >
                    {intl.formatMessage({ id: '导出' })} Excel
                </Button>
            </Flex>
            <Flex vertical gap={10}>
                <Title title={intl.formatMessage({ id: "电站基础信息" })} />
                <Descriptions>
                    {showData.includes("name") && <Descriptions.Item label={intl.formatMessage({ id: '电站名称' })}>{plantInfo?.name}</Descriptions.Item>}
                    {showData.includes("installTime") && <Descriptions.Item label={intl.formatMessage({ id: '建站日期' })}>{plantInfo?.installTime}</Descriptions.Item>}
                    {showData.includes("timeZone") && <Descriptions.Item label={intl.formatMessage({ id: '所属时区' })}>{plantInfo?.timeZone}</Descriptions.Item>}
                    {showData.includes("priceUnit") && <Descriptions.Item label={intl.formatMessage({ id: '所属货币' })}>{plantInfo?.priceUnit}</Descriptions.Item>}
                    {showData.includes("address") && <Descriptions.Item label={intl.formatMessage({ id: '电站位置' })}>{plantInfo?.address}</Descriptions.Item>}
                    {showData.includes("dtuCount") && <Descriptions.Item label={intl.formatMessage({ id: '设备总数' })}>{plantInfo?.dtuCount}</Descriptions.Item>}
                </Descriptions>
            </Flex>
            <Flex vertical gap={40}>
                {
                    showData.includes("energyTable") &&
                    <Flex vertical gap={10}>
                        <Title title={intl.formatMessage({ id: "电量明细" })} />
                        <Table
                            pagination={false}
                            dataSource={electricDataSource}
                            columns={[
                                {
                                    title: intl.formatMessage({ id: '日期' }),
                                    dataIndex: 'displayTime',
                                    key: 'displayTime',
                                },
                                {
                                    title: `${intl.formatMessage({ id: '尖时段充' })}/${intl.formatMessage({ id: '放电量' })}(kWh)`,
                                    dataIndex: 'kWh',
                                    key: 'kWh',
                                    render(_, record) {
                                        return `${record?.tipChargeEnergy}/${record?.tipDischargeEnergy}`
                                    }
                                },
                                {
                                    title: `${intl.formatMessage({ id: '峰时段充' })}/${intl.formatMessage({ id: '放电量' })}(kWh)`,
                                    dataIndex: 'kWh',
                                    key: 'kWh',
                                    render(_, record) {
                                        return `${record?.peakChargeEnergy}/${record?.peakDischargeEnergy}`
                                    }
                                },
                                {
                                    title: `${intl.formatMessage({ id: '平时段充' })}/${intl.formatMessage({ id: '放电量' })}(kWh)`,
                                    dataIndex: 'kWh',
                                    key: 'kWh',
                                    render(_, record) {
                                        return `${record?.flatChargeEnergy}/${record?.flatDischargeEnergy}`
                                    }
                                },
                                {
                                    title: `${intl.formatMessage({ id: '谷时段充' })}/${intl.formatMessage({ id: '放电量' })}(kWh)`,
                                    dataIndex: 'kWh',
                                    key: 'kWh',
                                    render(_, record) {
                                        return `${record?.valleyChargeEnergy}/${record?.valleyDischargeEnergy}`
                                    }
                                },
                                {
                                    title: `${intl.formatMessage({ id: '总充' })}/${intl.formatMessage({ id: '放电量' })}(kWh)`,
                                    dataIndex: 'kWh',
                                    key: 'kWh',
                                    render(_, record) {
                                        return `${record?.dayChargeEnergy}/${record?.dayDischargeEnergy}`
                                    }
                                },
                                {
                                    title: `${intl.formatMessage({ id: '充放电效率' })}(%)`,
                                    dataIndex: 'efficiency',
                                    key: 'efficiency',
                                },
                                {
                                    title: `${intl.formatMessage({ id: '收益' })}(${intl.formatMessage({ id: '元' })})`,
                                    dataIndex: 'number',
                                    key: 'number',
                                },
                            ]}
                            scroll={{
                                y: 500
                            }}
                        />
                    </Flex>
                }
                {
                    showData.includes("earningTable") &&
                    <Flex vertical gap={10}>
                        <Title title={intl.formatMessage({ id: "收益明细" })} />
                        <Table
                            pagination={false}
                            dataSource={incomeDataSource}
                            columns={[
                                {
                                    title: intl.formatMessage({ id: '日期' }),
                                    dataIndex: 'displayTime',
                                    key: 'displayTime',
                                },
                                {
                                    title: `${intl.formatMessage({ id: '充电成本' })}(${intl.formatMessage({ id: '元' })})`,
                                    dataIndex: 'inFee',
                                    key: 'inFee',
                                },
                                {
                                    title: `${intl.formatMessage({ id: '放电收入' })}(${intl.formatMessage({ id: '元' })})`,
                                    dataIndex: 'outFee',
                                    key: 'outFee',
                                },
                                {
                                    title: `${intl.formatMessage({ id: '收益' })}(${intl.formatMessage({ id: '元' })})`,
                                    dataIndex: 'number',
                                    key: 'number',
                                },
                            ]}
                            scroll={{
                                y: 500
                            }}
                        />
                    </Flex>
                }
                {
                    showElectricFeeTable &&
                    <Flex vertical gap={10}>
                        <Title title={intl.formatMessage({ id: "电费结算单" })} />
                        <Table
                            bordered
                            pagination={false}
                            dataSource={electricFeeDataSource}
                            columns={[
                                {
                                    title: intl.formatMessage({ id: '时间' }),
                                    dataIndex: 'displayTime',
                                    onCell(_, index) {
                                        return {
                                            rowSpan: index % 2 === 0 ? 2 : 0
                                        }
                                    }
                                },
                                {
                                    title: intl.formatMessage({ id: '电表名称' }),
                                    dataIndex: 'name',
                                    onCell(row, index) {
                                        return {
                                            rowSpan: row["name"] === intl.formatMessage({ id: '合计' }) ? 2 : (index % 2 === 0 ? 2 : 0),
                                            colSpan: row["name"] === intl.formatMessage({ id: '合计' }) ? 2 : (index % 2 === 0 ? 1 : 0),
                                        }
                                    }
                                },
                                {
                                    title: intl.formatMessage({ id: '电表编码' }),
                                    dataIndex: 'sn',
                                    onCell(row, index) {
                                        return {
                                            rowSpan: row["name"] === intl.formatMessage({ id: '合计' }) ? 0 : (index % 2 === 0 ? 2 : 0),
                                            colSpan: row["name"] === intl.formatMessage({ id: '合计' }) ? 0 : (index % 2 === 0 ? 1 : 0)
                                        }
                                    }
                                },
                                {
                                    title: '',
                                    dataIndex: 'typeName',
                                },
                                {
                                    title: `${intl.formatMessage({ id: '正向有功' })}(${intl.formatMessage({ id: '充电' })})`,
                                    children: [
                                        {
                                            title: intl.formatMessage({ id: '正向有功总' }),
                                            dataIndex: 'dayCharge',
                                        },
                                        {
                                            title: intl.formatMessage({ id: '尖峰' }),
                                            dataIndex: 'tipCharge',
                                        },
                                        {
                                            title: intl.formatMessage({ id: '峰期' }),
                                            dataIndex: 'peakCharge',
                                        },
                                        {
                                            title: intl.formatMessage({ id: '平期' }),
                                            dataIndex: 'flatCharge',
                                        },
                                        {
                                            title: intl.formatMessage({ id: '谷期' }),
                                            dataIndex: 'valleyCharge',
                                        }
                                    ]
                                },
                                {
                                    title: `${intl.formatMessage({ id: '反向有功' })}(${intl.formatMessage({ id: '放电' })})`,
                                    children: [
                                        {
                                            title: intl.formatMessage({ id: '反向有功总' }),
                                            dataIndex: 'dayDischarge',
                                        },
                                        {
                                            title: intl.formatMessage({ id: '尖峰' }),
                                            dataIndex: 'tipDischarge',
                                        },
                                        {
                                            title: intl.formatMessage({ id: '峰期' }),
                                            dataIndex: 'peakDischarge',
                                        },
                                        {
                                            title: intl.formatMessage({ id: '平期' }),
                                            dataIndex: 'flatDischarge',
                                        },
                                        {
                                            title: intl.formatMessage({ id: '谷期' }),
                                            dataIndex: 'valleyDischarge',
                                        }
                                    ]
                                }
                            ]}
                            scroll={{
                                y: 500
                            }}
                        />
                    </Flex>
                }
            </Flex>
            <Modal
                open={open}
                title={intl.formatMessage({ id: '数据选择' })}
                onOk={async () => {
                    const plantId = params?.plantId;
                    const values = await dataChangeForm.validateFields();
                    const showConfig = JSON.stringify(values?.detailReport?.concat(values?.plantBaseInfo));
                    let feeConfig = values?.feeConfig?.[0];
                    feeConfig = JSON.stringify({
                        "tip": feeConfig?.tip || 0,
                        "peak": feeConfig?.peak || 0,
                        "flat": feeConfig?.flat || 0,
                        "valley": feeConfig?.valley || 0,
                    })
                    const res = await postDateConfigServe({
                        plantId,
                        showConfig,
                        feeConfig
                    })
                    if (res?.data?.code === "ok") {
                        setOpen(false);
                        getDataSource();
                        getShowData();
                    }
                }}
                onCancel={() => {
                    setOpen(false);
                }}
                width={1200}
            >
                <div style={{ padding: '20px 0px' }}>
                    <Form form={dataChangeForm}>
                        <div style={{ marginBottom: 10 }}><Title title={intl.formatMessage({ id: '电站基础信息' })} /></div>
                        <Form.Item name={"plantBaseInfo"}>
                            <Checkbox.Group
                                options={[
                                    { label: intl.formatMessage({ id: '电站名称' }), value: 'name' },
                                    { label: intl.formatMessage({ id: '建站日期' }), value: 'installTime' },
                                    { label: intl.formatMessage({ id: '所属时区' }), value: 'timeZone' },
                                    { label: intl.formatMessage({ id: '所属货币' }), value: 'priceUnit' },
                                    { label: intl.formatMessage({ id: '电站位置' }), value: 'address' },
                                    { label: intl.formatMessage({ id: '设备总数' }), value: 'dtuCount' },
                                ]}
                            />
                        </Form.Item>
                        <div style={{ marginBottom: 10 }}><Title title={intl.formatMessage({ id: '明细报表' })} /></div>
                        <Form.Item name={"detailReport"}>
                            <Checkbox.Group
                                options={[
                                    { label: intl.formatMessage({ id: '电量' }), value: 'energyTable' },
                                    { label: intl.formatMessage({ id: '收益' }), value: 'earningTable' },
                                ]}
                            />
                        </Form.Item>
                        {
                            showElectricFeeTable &&
                            <>
                                <div style={{ marginBottom: 10 }}><Title title={intl.formatMessage({ id: '电费结算单' })} /></div>
                                <Form.Item name="feeConfig" validateTrigger={false} style={{ position: 'relative', top: -20 }}>
                                    <EditTable.EditRowTable
                                        showClear={false}
                                        showEdit={true}
                                        showDelete={false}
                                        showAddBtn={false}
                                        data={initFeeConfig}
                                        columns={[
                                            {
                                                title: intl.formatMessage({ id: '时段' }),
                                                dataIndex: 'targetSoc1',
                                                editable: false,
                                                inputType: 'Input',
                                            },
                                            {
                                                title: intl.formatMessage({ id: '尖时段' }),
                                                dataIndex: 'tip',
                                                editable: true,
                                                inputType: 'InputNumber',
                                            },
                                            {
                                                title: intl.formatMessage({ id: '峰时段' }),
                                                dataIndex: 'peak',
                                                editable: true,
                                                inputType: 'InputNumber',
                                            },
                                            {
                                                title: intl.formatMessage({ id: '平时段' }),
                                                dataIndex: 'flat',
                                                editable: true,
                                                inputType: 'InputNumber',
                                            },
                                            {
                                                title: intl.formatMessage({ id: '谷时段' }),
                                                dataIndex: 'valley',
                                                editable: true,
                                                inputType: 'InputNumber',
                                            },
                                        ]}
                                    />
                                </Form.Item>
                            </>
                        }
                    </Form>
                </div>
            </Modal>
        </div>
    )
}

export default ReportExport;