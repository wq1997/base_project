import {
    Space,
    Button,
    Table,
    Modal,
    theme,
    Form,
    Input,
    Select,
    Radio,
    message,
    Upload,
} from "antd";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import React, { useState, useEffect, useRef } from "react";
import { SearchInput } from "@/components";
import {
    updateAlarmType as updateAlarmTypeServe,
    getBasAlarmTypeIntData as getBasAlarmTypeIntDataServe,
    getBasAlarmList as getBasAlarmListServe,
    downloadAlarmTypeTemplate as downloadAlarmTypeTemplateServe,
} from "@/services";
import { FORM_REQUIRED_RULE } from "@/utils/constants";
import { jsonToUrlParams } from "@/utils/utils";
import { getBaseUrl } from "@/services/request";
import { InboxOutlined } from "@ant-design/icons";
import styles from "./index.less";

const { Dragger } = Upload;

const AlarmConfiguration = () => {
    const { token } = theme.useToken();
    const [form] = Form.useForm();
    const [initData, setInitData] = useState({});
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [projectName, setProjectName] = useState();
    const projectNameRef = useRef();
    const [plantName, setPlantName] = useState();
    const plantNameRef = useRef();
    const [consolidationPointName, setConsolidationPointName] = useState();
    const consolidationPointNameRef = useRef();
    const [deviceName, setDeviceName] = useState();
    const deviceNameRef = useRef();
    const [alramName, setAlramName] = useState();
    const alramNameRef = useRef();
    const [alarmTypes, setAlarmTypes] = useState();
    const alarmTypesRef = useRef();
    const [alarmLevel, setAlarmLevel] = useState();
    const alarmLevelRef = useRef();
    const [isAlram, setIsAlram] = useState();
    const isAlramRef = useRef();
    const [isWorkOrders, setIsWorkOrders] = useState();
    const isWorkOrdersRef = useRef();
    const [lastModifiedPerson, setLastModifiedPerson] = useState();
    const lastModifiedPersonRef = useRef();
    const [dataSource, setDataSource] = useState([{ 1: "XX" }]);
    const [open, setOpen] = useState(false);
    const [uploadOpen, setUploadOpen] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [editData, setEditData] = useState({});

    const columns = [
        {
            title: "项目名称",
            dataIndex: "project",
            width: 200,
            render(_, record) {
                return record?.project?.name;
            },
        },
        {
            title: "电站名称",
            dataIndex: "refSeAlarmType",
            width: 200,
            render(_, record) {
                return record?.refSeAlarmType?.plant?.name;
            },
        },
        // {
        //     title: "并网点名称",
        //     dataIndex: "3",
        //     width: 200
        // },
        {
            title: "设备名称",
            dataIndex: "refSeAlarmType",
            width: 200,
            render(_, record) {
                return record?.refSeAlarmType?.dev?.devName;
            },
        },
        {
            title: "告警名称",
            dataIndex: "seAlarmTypeDesc",
            width: 200,
        },
        {
            title: "云平台告警等级",
            dataIndex: "seAlarmTypeLevel",
            width: 200,
        },
        {
            title: "运维告警描述",
            dataIndex: "mmsEventDesc",
            width: 200,
        },
        {
            title: "运维告警等级",
            dataIndex: "mmsEventLevel",
            width: 200,
        },
        {
            title: "是否告警",
            dataIndex: "alarm",
            width: 200,
            render: (_, { alarm }) => {
                return (
                    <span style={{ color: alarm ? "#1BE72B" : "#F50101" }}>
                        {alarm ? "是" : "否"}
                    </span>
                );
            },
        },
        {
            title: "是否自动生成工单",
            dataIndex: "11",
            width: 200,
            render: (_, { autoGenerateWorkOrder }) => {
                return (
                    <span style={{ color: autoGenerateWorkOrder ? "#1BE72B" : "#F50101" }}>
                        {autoGenerateWorkOrder ? "是" : "否"}
                    </span>
                );
            },
        },
        {
            title: "最后修改人",
            dataIndex: "lastUpdaterName",
            width: 200,
        },
        {
            title: "最后修改时间",
            dataIndex: "lastUpdatedTime",
            width: 200,
        },
        {
            title: "操作",
            dataIndex: "Action",
            fixed: "right",
            width: 100,
            render(_, record) {
                return (
                    <Button
                        type="link"
                        style={{ color: token.colorPrimary }}
                        onClick={() => {
                            form.setFieldsValue({
                                ...record,
                                projectName: record?.project?.name,
                                plantName: record?.refSeAlarmType?.plant?.name,
                                devName: record?.refSeAlarmType?.dev?.devName,
                            });
                            setEditData(record);
                            setOpen(true);
                        }}
                    >
                        编辑
                    </Button>
                );
            },
        },
    ];

    const getBasAlarmTypeIntData = async () => {
        const res = await getBasAlarmTypeIntDataServe();
        if (res?.data?.status == "SUCCESS") {
            setInitData(res?.data?.data);
        }
    };

    const getBasAlarmList = async () => {
        const { current, pageSize } = paginationRef.current;
        const basProjectId = projectNameRef.current;
        const sePlantId = plantNameRef.current;
        const seAlarmTypeDescLike = alramNameRef.current;
        const seDevNameLike = deviceNameRef.current;
        const mmsEventDescLike = alarmTypesRef.current;
        const mmsEventLevel = alarmLevelRef.current;
        const alarm = isAlramRef.current;
        const autoGenerateWorkOrder = isWorkOrdersRef.current;
        const lastUpdaterNameLike = lastModifiedPersonRef.current;
        const res = await getBasAlarmListServe({
            pageNum: current,
            pageSize,
            queryCmd: {
                basProjectId,
                sePlantId,
                seAlarmTypeDescLike,
                seDevNameLike,
                mmsEventDescLike,
                mmsEventLevel,
                alarm,
                autoGenerateWorkOrder,
                lastUpdaterNameLike,
            },
        });
        if (res?.data?.status === "SUCCESS") {
            const { totalRecord, recordList } = res?.data?.data;
            setDataSource(recordList);
            setPagination({
                ...paginationRef.current,
                total: parseInt(totalRecord),
            });
        }
    };

    useEffect(() => {
        getBasAlarmTypeIntData();
        getBasAlarmList();
    }, []);

    const props = {
        name: "file",
        action: getBaseUrl() + "/bas-alarm-type/import-data",
        accept: ".xlsx,.xls",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("Token"),
        },
    };

    return (
        <div className={styles.alarmConfiguration}>
            <Space className={styles.search} size={20}>
                <SearchInput
                    label="项目名称"
                    type="select"
                    value={projectName}
                    options={initData?.projects?.map(item => {
                        return {
                            code: item?.id,
                            name: item?.name,
                        };
                    })}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        projectNameRef.current = value;
                        setProjectName(value);
                    }}
                />
                <SearchInput
                    label="电站名称"
                    type="select"
                    value={plantName}
                    options={initData?.plants?.map(item => {
                        return {
                            code: item?.plantId,
                            name: item?.name,
                        };
                    })}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        plantNameRef.current = value;
                        setPlantName(value);
                    }}
                />
                {/* <SearchInput
                    label="并网点名称"
                    value={consolidationPointName}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        consolidationPointNameRef.current = value;
                        setConsolidationPointName(value);
                    }}
                />
             */}
                <SearchInput
                    label="设备名称"
                    value={deviceName}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        deviceNameRef.current = value;
                        setDeviceName(value);
                    }}
                />
                <SearchInput
                    label="告警名称"
                    value={alramName}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        alramNameRef.current = value;
                        setAlramName(value);
                    }}
                />
                <SearchInput
                    label="运维告警描述"
                    value={alarmTypes}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        alarmTypesRef.current = value;
                        setAlarmTypes(value);
                    }}
                />
                <SearchInput
                    label="运维告警等级"
                    type="select"
                    value={alarmLevel}
                    options={initData?.mmsEventLevels?.map(item => {
                        return {
                            code: item,
                            name: item,
                        };
                    })}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        alarmLevelRef.current = value;
                        setAlarmLevel(value);
                    }}
                />
                <SearchInput
                    label="是否告警"
                    type="select"
                    value={isAlram}
                    options={[
                        { name: "是", code: true },
                        { name: "否", code: false },
                    ]}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        isAlramRef.current = value;
                        setIsAlram(value);
                    }}
                />
                <SearchInput
                    label="是否自动生成工单"
                    type="select"
                    value={isWorkOrders}
                    options={[
                        { name: "是", code: true },
                        { name: "否", code: false },
                    ]}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        isWorkOrdersRef.current = value;
                        setIsWorkOrders(value);
                    }}
                />
                <SearchInput
                    label="最后修改人"
                    value={lastModifiedPerson}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        lastModifiedPersonRef.current = value;
                        setLastModifiedPerson(value);
                    }}
                />
                <Button type="primary" onClick={getBasAlarmList}>
                    搜索
                </Button>
                <Button
                    type="primary"
                    danger
                    onClick={() => {
                        paginationRef.current = pagination;
                        projectNameRef.current = undefined;
                        plantNameRef.current = undefined;
                        alramNameRef.current = undefined;
                        alarmLevelRef.current = undefined;
                        alarmLevelRef.current = undefined;
                        isAlramRef.current = undefined;
                        isWorkOrdersRef.current = undefined;
                        lastModifiedPersonRef.current = undefined;
                        setLastModifiedPerson(undefined);
                        setIsWorkOrders(undefined);
                        setIsAlram(undefined);
                        setAlarmLevel(undefined);
                        setAlarmLevel(undefined);
                        setAlramName(undefined);
                        setPlantName(undefined);
                        setProjectName(undefined);
                        getBasAlarmList();
                    }}
                >
                    重置
                </Button>
            </Space>
            <Table
                rowKey="id"
                dataSource={dataSource}
                columns={columns}
                pagination={pagination}
                onChange={pagination => {
                    paginationRef.current = pagination;
                    getBasAlarmList();
                }}
                scroll={{
                    x: 1200,
                    y: "calc(100vh - 380px)",
                }}
                title={() => (
                    <Space className="table-title">
                        <Button
                            type="primary"
                            onClick={() => {
                                setUploadOpen(true);
                            }}
                        >
                            批量更新
                        </Button>
                        <Button
                            type="primary"
                            danger
                            onClick={async () => {
                                if (projectName) {
                                    const basProjectId = projectNameRef.current;
                                    const sePlantId = plantNameRef.current;
                                    const seAlarmTypeDescLike = alramNameRef.current;
                                    const seDevNameLike = deviceNameRef.current;
                                    const mmsEventDescLike = alarmTypesRef.current;
                                    const mmsEventLevel = alarmLevelRef.current;
                                    const alarm = isAlramRef.current;
                                    const autoGenerateWorkOrder = isWorkOrdersRef.current;
                                    const lastUpdaterNameLike = lastModifiedPersonRef.current;
                                    window.open(
                                        getBaseUrl() +
                                            "/bas-alarm-type/download-import-template" +
                                            jsonToUrlParams({
                                                basProjectId,
                                                sePlantId,
                                                seAlarmTypeDescLike,
                                                seDevNameLike,
                                                mmsEventDescLike,
                                                mmsEventLevel,
                                                alarm,
                                                autoGenerateWorkOrder,
                                                lastUpdaterNameLike,
                                                access_token: localStorage.getItem("Token"),
                                            })
                                    );
                                } else {
                                    message.error("至少搜索一个项目");
                                }
                            }}
                        >
                            批量导出
                        </Button>
                    </Space>
                )}
            />
            <Modal
                width={800}
                title="编辑"
                open={open}
                onCancel={() => {
                    setOpen(false);
                    form.resetFields();
                }}
                onOk={async () => {
                    const values = await form.validateFields();
                    const res = await updateAlarmTypeServe({
                        refSeAlarmTypeId: editData?.refSeAlarmTypeId,
                        mmsEventLevel: values?.mmsEventLevel,
                        mmsEventDesc: values?.mmsEventDesc,
                        alarm: values?.alarm,
                        autoGenerateWorkOrder: values?.autoGenerateWorkOrder,
                    });
                    if (res?.data?.status === "SUCCESS") {
                        message.success("编辑成功");
                        getBasAlarmList();
                        setOpen(false);
                        form.resetFields();
                    } else {
                        message.info(res?.data?.msg);
                    }
                }}
            >
                <Form form={form} labelCol={{ span: 6 }}>
                    <Form.Item name="projectName" label="项目名称">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="plantName" label="电站名称">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="devName" label="设备名称">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="seAlarmTypeDesc" label="告警名称">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="seAlarmTypeLevel" label="云平台告警等级">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        name="mmsEventClassify"
                        label="运维告警类型"
                        rules={[{ ...FORM_REQUIRED_RULE }]}
                    >
                        <Select
                            options={initData?.mmsEventClassifies?.map(item => {
                                return {
                                    value: item.code,
                                    label: item,
                                };
                            })}
                        />
                    </Form.Item>
                    <Form.Item
                        name="mmsEventLevel"
                        label="运维告警等级"
                        rules={[{ ...FORM_REQUIRED_RULE }]}
                    >
                        <Select
                            options={initData?.mmsEventLevels?.map(item => {
                                return {
                                    value: item,
                                    label: item,
                                };
                            })}
                        />
                    </Form.Item>
                    <Form.Item
                        name="mmsEventDesc"
                        label="运维告警描述"
                        rules={[{ ...FORM_REQUIRED_RULE }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="alarm" label="是否告警" rules={[{ ...FORM_REQUIRED_RULE }]}>
                        <Radio.Group>
                            <Radio value={true}>是</Radio>
                            <Radio value={false}>否</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        name="autoGenerateWorkOrder"
                        label="是否自动生成工单"
                        rules={[{ ...FORM_REQUIRED_RULE }]}
                    >
                        <Radio.Group>
                            <Radio value={true}>是</Radio>
                            <Radio value={false}>否</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                width={800}
                open={uploadOpen}
                title="批量更新"
                onCancel={() => {
                    setUploadOpen(false);
                    getBasAlarmList();
                }}
                onOk={() => {
                    setUploadOpen(false);
                    getBasAlarmList();
                }}
            >
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">仅支持.xlsx、.xls后缀名文件</p>
                </Dragger>
            </Modal>
        </div>
    );
};

export default AlarmConfiguration;
