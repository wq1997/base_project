import React, { useState, useEffect, useRef } from "react";
import { Button, Space, Table, message, Modal, DatePicker, Tooltip, Input } from "antd";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { history, useLocation } from "umi";
import { SearchInput } from "@/components";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import "./index.less";
import dayjs from "dayjs";
import Upload from "./upload";
import {
    getUploadFilesInitData as getUploadFilesInitDataServer,
    getUploadFilesList as getUploadFilesListServer,
} from "@/services/api";

const Account = () => {
    const projectNameRef = useRef();
    const childrenProjectNameRef = useRef();
    const dataTypeRef = useRef();
    const devicePositionRef = useRef();
    const dimensionRef = useRef();
    const deviceTypeRef = useRef();
    const uploadTimeRef = useRef();

    const [projectName, setProjectName] = useState();
    const [childrenProjectName, setChildrenProjectName] = useState();
    const [dataType, setDataType] = useState();
    const [dataTypeOptions, setDataTypeOptions] = useState();
    const [devicePosition, setDevicePosition] = useState();
    const [uploadTime, setUploadTime] = useState();
    const [dimension, setDimension] = useState();
    const [dimensionOptions, setDimensionOptions] = useState();
    const [deviceType, setDeviceType] = useState();
    const [deviceTypeOptions, setDeviceTypeOptions] = useState();
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [list, setList] = useState([]);
    const [uploadOpen, setUploadOpen] = useState(true);

    const columns = [
        {
            title: "项目名称",
            dataIndex: "projectName",
        },
        {
            title: "子项目名称",
            dataIndex: "childrenProjectName",
        },
        {
            title: "数据类型",
            dataIndex: "dataTypeZh",
        },
        {
            title: "设备类型",
            dataIndex: "deviceTypeZh",
        },
        {
            title: "设备位置",
            dataIndex: "devicePosition",
        },
        {
            title: "设备编号",
            dataIndex: "deviceBoxNo",
        },
        {
            title: "取值维度",
            dataIndex: "dimensionZh",
        },
        {
            title: "测试单元",
            dataIndex: "testUnit",
        },
        {
            title: "上传时间",
            dataIndex: "uploadTime",
        },
        {
            title: "处理进度",
            dataIndex: "parseStatusZh",
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
        const res = await getUploadFilesInitDataServer();
        if (res?.data?.code == 0) {
            const { dataTypeEnumList, deviceTypeEnumList, dimensionEnumList } = res?.data?.data;
            setDataTypeOptions(dataTypeEnumList);
            setDeviceTypeOptions(deviceTypeEnumList);
            setDimensionOptions(dimensionEnumList);
        }
    };

    const getList = async () => {
        const { current, pageSize } = paginationRef.current;
        const [uploadTimeFrom, uploadTimeTo] = uploadTimeRef.current || [];
        const projectName = projectNameRef.current;
        const childrenProjectName = childrenProjectNameRef.current;
        const dataType = dataTypeRef.current;
        const devicePosition = devicePositionRef.current;
        const deviceType = deviceTypeRef.current;
        const dimension = dimensionRef.current;
        const res = await getUploadFilesListServer({
            pageNum: current,
            pageSize,
            queryParam: {
                uploadTimeFrom,
                uploadTimeTo,
                projectName,
                childrenProjectName,
                dataType,
                devicePosition,
                deviceType,
                dimension,
            },
        });
        if (res?.data?.code == 0) {
            const { total, items } = res?.data?.data;
            setPagination({
                ...paginationRef.current,
                total: parseInt(total),
            });
            setList(items);
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
        uploadTimeRef.current = undefined;
        setUploadTime();
        dimensionRef.current = undefined;
        setDimension();
        deviceTypeRef.current = undefined;
        setDeviceType();
        getList();
    };

    useEffect(() => {
        getInitData();
        getList();
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
                    fieldNames={{
                        label: "desc",
                    }}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        dataTypeRef.current = value;
                        setDataType(value);
                    }}
                />
                <SearchInput
                    label="设备位置"
                    value={devicePosition}
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
                            setUploadTime(dateStr);
                        }}
                        value={
                            uploadTime && uploadTime.length > 0
                                ? [dayjs(uploadTime[0]), dayjs(uploadTime[1])]
                                : []
                        }
                    />
                </div>
                <SearchInput
                    label="设备类型"
                    type="select"
                    options={deviceTypeOptions}
                    value={deviceType}
                    fieldNames={{
                        label: "desc",
                    }}
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
                    fieldNames={{
                        label: "desc",
                    }}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        dimensionRef.current = value;
                        setDimension(value);
                    }}
                />
                <Button type="primary" onClick={getList}>
                    搜索
                </Button>
                <Button onClick={handleReset}>重置</Button>
            </Space>
            <Table
                rowKey="id"
                dataSource={list}
                columns={columns}
                pagination={pagination}
                onChange={pagination => {
                    paginationRef.current = pagination;
                    getList();
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
