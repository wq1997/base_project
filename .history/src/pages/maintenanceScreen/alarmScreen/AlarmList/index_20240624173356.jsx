import styles from "./index.less";
import React, { useState, useEffect, useRef } from "react";
import { Button, Space, Table, message, Modal, Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { SearchInput } from "@/components";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import "./index.less";
import arrow from "../images/箭头.svg";

const Index = () => {
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const deviceTypeRef = useRef();
    const [deviceType, setDeviceType] = useState();
    const alarmLevelRef = useRef();
    const [alarmLevel, setAlarmLevel] = useState();
    const deviceNameRef = useRef();
    const [deviceName, setDeviceName] = useState();
    const gridPointRef = useRef();
    const [gridPoint, setGridPoint] = useState();
    const plantNameRef = useRef();
    const [plantName, setPlantName] = useState();
    const startTimeRef = useRef();
    const [startTime, setStartTime] = useState();
    const alarmDescRef = useRef();
    const [alarmDesc, setAlarmDesc] = useState();
    const [listData, setListData] = useState([]);

    const columns = [
        {
            title: "公司名称",
            dataIndex: "name",
        },
        {
            title: "公司编号",
            dataIndex: "code",
        },
        {
            title: "是否默认确认任务",
            dataIndex: "autoConfirmTask",
            render: value => (value ? "是" : "否"),
        },
        {
            title: "平台分润比例",
            dataIndex: "profitSharingRatio",
        },
        {
            title: "紧急联系人",
            dataIndex: "contactPerson",
        },
        {
            title: "紧急联系电话",
            dataIndex: "contractPhone",
        },
        {
            title: "操作",
            dataIndex: "operate",
            render: (_, record) =>
                record?.code != "SERMATEC" &&
                hasPerm(user, "op:company_edit") && (
                    <a
                        onClick={() => {
                            setAddCompanyOpen(true);
                            setEditId(record.id);
                        }}
                    >
                        编辑
                    </a>
                ),
        },
    ];

    const onSelectChange = newSelectedRowKeys => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const getList = async () => {
        return;
        const { current, pageSize } = paginationRef.current;
        const name = nameRef.current;
        const res = await getCompanyListServer({
            pageNum: current,
            pageSize,
            queryCmd: { keyword: name },
        });
        if (res?.data?.status == "SUCCESS") {
            const { totalRecord, recordList } = res?.data?.data;
            setPagination({
                ...paginationRef.current,
                total: parseInt(totalRecord),
            });
            setCompanyList(recordList);
        }
    };

    const handleReset = () => {
        paginationRef.current = DEFAULT_PAGINATION;
        nameRef.current = "";
        setDeviceType();
        alarmLevelRef.current = "";
        setAlarmLevel();
        deviceNameRef.current = "";
        setDeviceName();
        gridPointRef.current = "";
        setGridPoint();
        getList();
    };

    const handleDelete = () => {
        return;
        Modal.confirm({
            title: "确定删除?",
            content: "删除后不可恢复",
            onOk: async () => {
                const res = await deleteCompanyServer(selectedRowKeys);
                if (res?.data?.status == "SUCCESS") {
                    message.success("删除成功");
                    setPagination({
                        current: 1,
                    });
                    setSelectedRowKeys([]);
                    getList();
                }
            },
        });
    };

    useEffect(() => {
        getList();
    }, []);

    return (
        <div className={styles.index}>
            <div className={styles.title}>
                <img src={arrow} className={styles.arrow} />
                告警列表
            </div>
            <div className={styles.list}>
                <Space
                    style={{
                        flexWrap: "wrap",
                        marginBottom: "8px",
                    }}
                >
                    <SearchInput
                        label="设备类型"
                        value={deviceType}
                        placeholder="请选择设备类型"
                        onChange={value => {
                            deviceTypeRef.current = value;
                            setDeviceType(value);
                        }}
                    />
                    <SearchInput
                        label="告警等级"
                        value={alarmLevel}
                        placeholder="请选择告警等级"
                        onChange={value => {
                            deviceTypeRef.current = value;
                            setAlarmLevel(value);
                        }}
                    />
                    <SearchInput
                        label="设备名称"
                        value={deviceName}
                        placeholder="请选择设备名称"
                        onChange={value => {
                            deviceNameRef.current = value;
                            setDeviceName(value);
                        }}
                    />
                    <SearchInput
                        label="并网点"
                        value={gridPoint}
                        placeholder="请选择并网点"
                        onChange={value => {
                            gridPointRef.current = value;
                            setGridPoint(value);
                        }}
                    />
                    <SearchInput
                        label="电站名称"
                        value={plantName}
                        placeholder="请选择并网点"
                        onChange={value => {
                            plantNameRef.current = value;
                            setPlantName(value);
                        }}
                    />
                    <SearchInput
                        label="开始时间"
                        value={startTime}
                        placeholder="请选择并网点"
                        onChange={value => {
                            startTimeRef.current = value;
                            setStartTime(value);
                        }}
                    />
                    <SearchInput
                        label="告警描述"
                        value={alarmDesc}
                        placeholder="请选择并网点"
                        onChange={value => {
                            alarmDescRef.current = value;
                            setAlarmDesc(value);
                        }}
                    />
                    <Button type="primary" onClick={getList}>
                        搜索
                    </Button>
                    <Button onClick={handleReset}>重置</Button>
                </Space>
                <Table
                    rowKey="id"
                    dataSource={listData}
                    columns={columns}
                    pagination={pagination}
                    onChange={pagination => {
                        paginationRef.current = pagination;
                        getList();
                    }}
                ></Table>
            </div>
        </div>
    );
};

export default Index;
