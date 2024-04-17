import React, { useState, useEffect, useRef } from "react";
import { Button, Space, Table, message, Modal, DatePicker, Tooltip, Input } from "antd";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { history, useLocation } from "umi";
import { SearchInput } from "@/components";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import "./index.less";
import dayjs from "dayjs";
import Upload from "./upload";
import { getUploadUpdateInitData as getUploadUpdateInitDataServer } from "@/services/api";

const Account = () => {
    const projectNameRef = useRef();
    const childrenProjectNameRef = useRef();
    const dataTypeRef = useRef();
    const devicePositionRef = useRef();
    const dimensionRef = useRef();
    const deviceTypeRef = useRef();

    const [projectName, setProjectName] = useState();
    const [childrenProjectName, setChildrenProjectName] = useState();
    const [dataType, setDataType] = useState();
    const [dataTypeOptions, setDataTypeOptions] = useState([]);
    const [devicePosition, setDevicePosition] = useState([]);
    const [devicePositionOptions, setDevicePositionOptions] = useState([]);
    const [dimension, setDimension] = useState([]);
    const [dimensionOptions, setDimensionOptions] = useState([]);
    const [deviceType, setDeviceType] = useState([]);
    const [deviceTypeOptions, seteviceTypeOptions] = useState([]);

    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [userList, setUserList] = useState([]);
    const [uploadOpen, setUploadOpen] = useState(true);

    const columns = [
        {
            title: "项目名称",
            dataIndex: "code",
        },
        {
            title: "子项目名称",
            dataIndex: "confirmStatusZh",
        },
        {
            title: "数据类型",
            dataIndex: "splitStatusZh",
        },
        {
            title: "设备类型",
            dataIndex: "createdTime",
        },
        {
            title: "设备位置",
            dataIndex: "responseTypeZh",
        },
        {
            title: "设备编号",
            dataIndex: "responseTimeTypeZh",
        },
        {
            title: "取值维度",
            dataIndex: "whPrice",
        },
        {
            title: "测试单元",
            dataIndex: "responsePower",
        },
        {
            title: "上传时间",
            dataIndex: "appointedTimeFrom",
        },
        {
            title: "处理进度",
            dataIndex: "appointedTimeTo",
        },
        {
            title: "备注",
            dataIndex: "remark",
        },
        {
            title: "操作",
            dataIndex: "operate",
            render: (_, { id, supportSplit, supportReSplit }) => {
                return (
                    <Space>
                        <a>详情</a>
                    </Space>
                );
            },
        },
    ];

    const getInitData = async () => {
        const res = await getUploadUpdateInitDataServer();
        if (res?.data?.code == 0) {
            const { dataTypeEnumList, deviceTypeEnumList, dimensionEnumList } = res?.data?.data;
            setDataTypeOptions(dataTypeEnumList);
            setDeviceTypeOptions(deviceTypeEnumList);
            setDimensionOptions(dimensionEnumList);
        }
    };

    const getInviteList = async () => {
        const { current, pageSize } = paginationRef.current;
        const [createdTimeFrom, createdTimeTo] = releaseTimeRef.current || [];
        const [appointedTimeRangeStart, appointedTimeRangeEnd] = executeTimeRef.current || [];
        const code = codeRef.current;
        const confirmStatus = confirmStatusRef.current;
        const splitStatus = splitStatusRef.current;
        const responsePower = +responsePowerRef.current;
        const responseType = responseTypeRef.current;
        const res = await getInviteListServer({
            pageNum: current,
            pageSize,
            queryCmd: {
                createdTimeFrom,
                createdTimeTo,
                appointedTimeRangeStart,
                appointedTimeRangeEnd,
                code,
                confirmStatus,
                splitStatus,
                responsePower,
                responseType,
            },
        });
        if (res?.data?.status == "SUCCESS") {
            const { totalRecord, recordList } = res?.data?.data;
            setPagination({
                ...paginationRef.current,
                total: parseInt(totalRecord),
            });
            setUserList(recordList);
        }
    };

    const handleReset = () => {
        paginationRef.current = DEFAULT_PAGINATION;
        projectNameRef.current = undefined;
        setProjectName();
        childrenProjectNameRef.current = undefined;
        setChildrenProjectName();
        dataTypeRef.current = undefined;
        setDataType();
        devicePositionRef.current = undefined;
        setDevicePosition();
        dimensionRef.current = undefined;
        setDimension();
        deviceTypeRef.current = undefined;
        setDeviceType();
        getInviteList();
    };

    useEffect(() => {
        getInitData();
    }, []);

    return (
        <div>
            <Upload
                uploadOpen={uploadOpen}
                onClose={flag => {
                    setUploadOpen(false);
                }}
            />
            <Space className="search">
                <SearchInput
                    label="项目名称"
                    value={projectName}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        codeRef.current = value;
                        setProjectName(value);
                    }}
                />
                <SearchInput
                    label="子项目名称"
                    value={childrenProjectName}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        childrenProjectNameRef.current = value;
                        setChildrenProjectName(value);
                    }}
                />
                <SearchInput
                    label="数据类型"
                    value={dataType}
                    type="select"
                    options={dataTypeOptions}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        dataTypeRef.current = value;
                        setDataType(value);
                    }}
                />
                <SearchInput
                    label="设备位置"
                    type="select"
                    value={devicePosition}
                    options={devicePositionOptions}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        devicePositionRef.current = value;
                        setDevicePosition(value);
                    }}
                />
                 <div>
                    <span>上传时间：</span>
                    <DatePicker.RangePicker
                        onChange={(date, dateStr) => {
                            paginationRef.current = DEFAULT_PAGINATION;
                            uploadTime.current = dateStr;
                            setuploadTime(dateStr);
                        }}
                        value={
                            releaseTime && releaseTime.length > 0
                                ? [dayjs(releaseTime[0]), dayjs(releaseTime[1])]
                                : []
                        }
                    />
                </div>
                <SearchInput
                    label="设备类型"
                    type="select"
                    options={deviceTypeOptions}
                    value={deviceType}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        deviceTypeRef.current = value;
                        setDeviceType(value);
                    }}
                />
                <SearchInput
                    label="取值维度"
                    type="select"
                    options={dimensionOptions}
                    value={dimension}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        dimensionRef.current = value;
                        setDimension(value);
                    }}
                />
                <Button type="primary" onClick={getInviteList}>
                    搜索
                </Button>
                <Button onClick={handleReset}>重置</Button>
            </Space>
            <Table
                rowKey="id"
                dataSource={userList}
                columns={columns}
                pagination={pagination}
                onChange={pagination => {
                    paginationRef.current = pagination;
                    getInviteList();
                }}
                title={() => (
                    <Space className="table-title">
                        <Button type="primary" onClick={() => setUploadOpen(true)}>
                            上传文件
                        </Button>
                    </Space>
                )}
            ></Table>
        </div>
    );
};

export default Account;
