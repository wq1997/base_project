import { Form, Flex, Select, Modal, theme as antdTheme, Button, Descriptions, Table, DatePicker, Checkbox } from "antd";
import { useIntl, useSelector } from "umi";
import dayjs from "dayjs";
import moment from "moment";
import styles from "./index.less";
import { useEffect, useState } from "react";
import {
    getFetchPlantList2 as getFetchPlantListServe,
    getDateConfig as getDateConfigServe,
    postDateConfig as postDateConfigServe
} from "@/services";
import { Title, EditTable } from "@/components";

const ReportExport = () => {
    const intl = useIntl();
    const [form] = Form.useForm();
    const { locale } = useSelector(state => state.global);
    const [dataChangeForm] = Form.useForm();
    const { token } = antdTheme.useToken();
    const [plantList, setPlantList] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [open, setOpen] = useState(false);
    const [initFeeConfig, setInitConfig] = useState([]);
    const [params, setParams] = useState();
    const [showData, setShowData] = useState([]);
    const [showElectricFeeTable, setShowElectricFeeTable] = useState(false);

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

    const getDataSource = async () => {
        console.log(params);
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
            if (params?.plantId === 3286) {
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
        setParams(params);
    }

    useEffect(() => {
        if (params) {
            setShowElectricFeeTable(
                params?.plantId === 3286
                && params?.reportType === "month"
                && moment(params?.date).isBefore(moment())
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
                        setParams({ ...values });
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

                    }}
                    style={{ backgroundColor: token.defaultBg, padding: '0 20px', height: 40 }}
                >
                    {intl.formatMessage({ id: '导出' })} Excel
                </Button>
            </Flex>
            <Flex vertical gap={10}>
                <Title title={intl.formatMessage({ id: "电站基础信息" })} />
                <Descriptions>
                    {showData.includes("name") && <Descriptions.Item label={intl.formatMessage({ id: '电站名称' })}>111</Descriptions.Item>}
                    {showData.includes("installTime") && <Descriptions.Item label={intl.formatMessage({ id: '建站日期' })}>111</Descriptions.Item>}
                    {showData.includes("timeZone") && <Descriptions.Item label={intl.formatMessage({ id: '所属时区' })}>111</Descriptions.Item>}
                    {showData.includes("priceUnit") && <Descriptions.Item label={intl.formatMessage({ id: '所属货币' })}>111</Descriptions.Item>}
                    {showData.includes("address") && <Descriptions.Item label={intl.formatMessage({ id: '电站位置' })}>111</Descriptions.Item>}
                    {showData.includes("dtuCount") && <Descriptions.Item label={intl.formatMessage({ id: '设备总数' })}>111</Descriptions.Item>}
                </Descriptions>
            </Flex>
            <Flex vertical gap={40}>
                {
                    showData.includes("energyTable") &&
                    <Flex vertical gap={10}>
                        <Title title={intl.formatMessage({ id: "电量明细" })} />
                        <Table
                            pagination={false}
                            dataSource={dataSource}
                            columns={[
                                {
                                    title: intl.formatMessage({ id: '日期' }),
                                    dataIndex: 'date',
                                    key: 'date',
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
                        <Title title={intl.formatMessage({ id: "电量明细" })} />
                        <Table
                            pagination={false}
                            dataSource={dataSource}
                            columns={[
                                {
                                    title: intl.formatMessage({ id: '日期' }),
                                    dataIndex: 'date',
                                    key: 'date',
                                },
                                {
                                    title: `${intl.formatMessage({ id: '充电成本' })}(${intl.formatMessage({ id: '元' })})`,
                                    dataIndex: 'kWh',
                                    key: 'kWh',
                                },
                                {
                                    title: `${intl.formatMessage({ id: '放电收入' })}(${intl.formatMessage({ id: '元' })})`,
                                    dataIndex: 'kWh',
                                    key: 'kWh',
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
                            dataSource={dataSource}
                            columns={[
                                {
                                    title: intl.formatMessage({ id: '时间' }),
                                    dataIndex: '1',
                                    onCell(_, index) {
                                        return {
                                            rowSpan: index % 2 === 0 ? 2 : 0
                                        }
                                    }
                                },
                                {
                                    title: intl.formatMessage({ id: '电表名称' }),
                                    dataIndex: '2',
                                    onCell(row, index) {
                                        return {
                                            rowSpan: row[2] === "合计" ? 2 : (index % 2 === 0 ? 2 : 0),
                                            colSpan: row[2] === "合计" ? 2 : (index % 2 === 0 ? 1 : 0),
                                        }
                                    }
                                },
                                {
                                    title: intl.formatMessage({ id: '电表编码' }),
                                    dataIndex: '3',
                                    onCell(row, index) {
                                        return {
                                            rowSpan: row[2] === "合计" ? 0 : (index % 2 === 0 ? 2 : 0),
                                            colSpan: row[2] === "合计" ? 0 : (index % 2 === 0 ? 1 : 0)
                                        }
                                    }
                                },
                                {
                                    title: '',
                                    dataIndex: '4',
                                },
                                {
                                    title: `${intl.formatMessage({ id: '正向有功' })}(${intl.formatMessage({ id: '充电' })})`,
                                    children: [
                                        {
                                            title: intl.formatMessage({ id: '正向有功总' }),
                                            dataIndex: '5',
                                        },
                                        {
                                            title: intl.formatMessage({ id: '尖期' }),
                                            dataIndex: '6',
                                        },
                                        {
                                            title: intl.formatMessage({ id: '峰期' }),
                                            dataIndex: '7',
                                        },
                                        {
                                            title: intl.formatMessage({ id: '平期' }),
                                            dataIndex: '8',
                                        },
                                        {
                                            title: intl.formatMessage({ id: '谷期' }),
                                            dataIndex: '9',
                                        }
                                    ]
                                },
                                {
                                    title: `${intl.formatMessage({ id: '反向有功' })}(${intl.formatMessage({ id: '放电' })})`,
                                    children: [
                                        {
                                            title: intl.formatMessage({ id: '反向有功总' }),
                                            dataIndex: '51',
                                        },
                                        {
                                            title: intl.formatMessage({ id: '尖期' }),
                                            dataIndex: '62',
                                        },
                                        {
                                            title: intl.formatMessage({ id: '峰期' }),
                                            dataIndex: '72',
                                        },
                                        {
                                            title: intl.formatMessage({ id: '平期' }),
                                            dataIndex: '822',
                                        },
                                        {
                                            title: intl.formatMessage({ id: '谷期' }),
                                            dataIndex: '92',
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