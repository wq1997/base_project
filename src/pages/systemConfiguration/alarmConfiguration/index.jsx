import { Space, Button, Table, Modal, theme } from "antd";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import React, { useState, useEffect, useRef } from "react";
import { SearchInput } from "@/components";
import styles from "./index.less";

const AlarmConfiguration = () => {
    const { token } = theme.useToken();
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
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const columns = [
        {
            title: "项目名称",
            dataIndex: "1",
            width: 200
        },
        {
            title: "电站名称",
            dataIndex: "2",
            width: 200
        },
        {
            title: "并网点名称",
            dataIndex: "3",
            width: 200
        },
        {
            title: "设备名称",
            dataIndex: "4",
            width: 200
        },
        {
            title: "告警名称",
            dataIndex: "5",
            width: 200
        },
        {
            title: "云平台告警等级",
            dataIndex: "6",
            width: 200
        },
        {
            title: "运维告警类型",
            dataIndex: "7",
            width: 200
        },
        {
            title: "运维告警等级",
            dataIndex: "8",
            width: 200
        },
        {
            title: "运维告警描述",
            dataIndex: "9",
            width: 200
        },
        {
            title: "是否告警",
            dataIndex: "10",
            width: 200
        },
        {
            title: "是否同步生成工单",
            dataIndex: "11",
            width: 200
        },
        {
            title: "最后修改人",
            dataIndex: "12",
            width: 200
        },
        {
            title: "最后修改时间",
            dataIndex: "13",
            width: 200
        },
        {
            title: "操作",
            dataIndex: "Action",
            fixed: 'right',
            width: 100,
            render() {
                return (
                    <Button
                        type="link"
                        style={{ color: token.colorPrimary }}
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        编辑
                    </Button>
                )
            }
        }
    ]

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    return (
        <div className={styles.alarmConfiguration}>
            <Space className={styles.search} size={20}>
                <SearchInput
                    label="项目名称"
                    value={projectName}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        projectNameRef.current = value;
                        setProjectName(value);
                    }}
                />
                <SearchInput
                    label="电站名称"
                    value={plantName}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        plantNameRef.current = value;
                        setPlantName(value);
                    }}
                />
                <SearchInput
                    label="并网点名称"
                    value={consolidationPointName}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        consolidationPointNameRef.current = value;
                        setConsolidationPointName(value);
                    }}
                />
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
                    label="运维告警类型"
                    value={alarmTypes}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        alarmTypesRef.current = value;
                        setAlarmTypes(value);
                    }}
                />
                <SearchInput
                    label="运维告警等级"
                    value={alarmLevel}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        alarmLevelRef.current = value;
                        setAlarmLevel(value);
                    }}
                />
                <SearchInput
                    label="是否告警"
                    value={isAlram}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        isAlramRef.current = value;
                        setIsAlram(value);
                    }}
                />
                <SearchInput
                    label="是否同步生成工单"
                    value={isWorkOrders}
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
                <Button type="primary">搜索</Button>
                <Button type="primary" danger>重置</Button>
            </Space>
            <Table
                rowKey="id"
                dataSource={dataSource}
                columns={columns}
                pagination={pagination}
                rowSelection={{
                    selectedRowKeys,
                    onChange: onSelectChange,
                    getCheckboxProps: record => ({
                        disabled: record.account === "admin",
                    }),
                }}
                onChange={pagination => {
                    paginationRef.current = pagination;
                    getList();
                }}
                scroll={{
                    x: 1200,
                }}
                title={() => (
                    <Space className="table-title">
                        <Button
                            type="primary"
                            onClick={() => {

                            }}
                        >
                            批量导入
                        </Button>
                        <Button
                            type="primary"
                            danger
                            onClick={() => {
                            }}
                        >
                            批量导出
                        </Button>
                    </Space>
                )}
            />
        </div>
    )
}

export default AlarmConfiguration;