import React, { useState, useEffect, useRef } from "react";
import { Button, Space, Table, message, Modal, DatePicker, Tooltip, Input } from "antd";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { history, useLocation } from "umi";
import { SearchInput } from "@/components";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import { getUrlParams } from "@/utils/utils";
import "./index.less";
import dayjs from "dayjs";
import ExceptionInfo from "./ExceptionInfo";
import {
    getUploadFilesInitData as getUploadFilesInitDataServer,
    getAnalysisResultsList as getAnalysisResultsListServer,
} from "@/services/api";

const Account = () => {
    const location = useLocation();
    const params = getUrlParams(location?.search);
    const projectNameRef = useRef(decodeURIComponent(params?.projectName || ""));
    const testDateRef = useRef();
    const dataTypeRef = useRef();
    const devicePositionRef = useRef();
    const dimensionRef = useRef();
    const deviceBoxNoRef = useRef(decodeURIComponent(params?.deviceBoxNo || ""));
    const deviceTypeRef = useRef();
    const uploadTimeRef = useRef();

    const [projectName, setProjectName] = useState(decodeURIComponent(params?.projectName || ""));
    const [testDate, setTestDate] = useState();
    const [resultId, setResultId] = useState(undefined);
    const [dataType, setDataType] = useState();
    const [dataTypeOptions, setDataTypeOptions] = useState();
    const [devicePosition, setDevicePosition] = useState();
    const [uploadTime, setUploadTime] = useState();
    const [dimension, setDimension] = useState();
    const [dimensionOptions, setDimensionOptions] = useState();
    const [deviceBoxNo, setDeviceBoxNo] = useState(decodeURIComponent(params?.deviceBoxNo || ""));
    const [deviceType, setDeviceType] = useState();
    const [deviceTypeOptions, setDeviceTypeOptions] = useState();
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [list, setList] = useState([]);

    const columns = [
        {
            title: "项目名称",
            dataIndex: "projectName",
        },
        {
            title: "测试时间",
            dataIndex: "testDate",
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
            title: "设备箱号",
            dataIndex: "deviceBoxNo",
        },
        {
            title: "取值维度",
            dataIndex: "dimensionZh",
        },
        {
            title: "上传时间",
            dataIndex: "uploadTime",
        },
        {
            title: "是否异常",
            render: (_, { exceptionCount }) => {
                return exceptionCount > 0 ? (
                    <span style={{ color: "rgb(255, 77, 79)" }}>是</span>
                ) : (
                    "否"
                );
            },
        },
        {
            title: "异常总数",
            dataIndex: "exceptionCount",
        },
        {
            title: "测试报告",
            dataIndex: "uploadTime",
            render: (_, { id, canExport }) => {
                return (
                    canExport && (
                        <Button
                            type="link"
                            onClick={() => {
                                let url = `${process.env.API_URL_1}/scene/export-test-report/${id}`;
                                window.open(url);
                            }}
                        >
                            导出
                        </Button>
                    )
                );
            },
        },
        {
            title: "操作",
            dataIndex: "operate",
            render: (_, { id, canQueryExceptionDetail }) => {
                return (
                    canQueryExceptionDetail && (
                        <Button type="link" onClick={() => setResultId(id)}>
                            查看异常详情
                        </Button>
                    )
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

    const getList = async id => {
        const { current, pageSize } = paginationRef.current;
        const [uploadTimeFrom, uploadTimeTo] = uploadTimeRef.current || [];
        const projectName = projectNameRef.current;
        const testDate = testDateRef.current;
        const dataType = dataTypeRef.current;
        const deviceBoxNo = deviceBoxNoRef.current;
        const devicePosition = devicePositionRef.current;
        const deviceType = deviceTypeRef.current;
        const dimension = dimensionRef.current;
        const res = await getAnalysisResultsListServer({
            pageNum: current,
            pageSize,
            queryParam: {
                id,
                uploadTimeFrom,
                uploadTimeTo,
                projectName,
                testDate,
                dataType,
                devicePosition,
                deviceBoxNo,
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
        history.push(`/analysis-results`);
        paginationRef.current = DEFAULT_PAGINATION;
        projectNameRef.current = undefined;
        setProjectName();
        testDateRef.current = undefined;
        setTestDate();
        dataTypeRef.current = undefined;
        setDataType();
        devicePositionRef.current = undefined;
        setDevicePosition();
        deviceBoxNoRef.current = undefined;
        setDeviceBoxNo();
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
        getList(params?.id);
    }, []);

    return (
        <div>
            <ExceptionInfo
                resultId={resultId}
                onClose={() => {
                    setResultId(undefined);
                }}
            />
            <Space className="search">
                <SearchInput
                    label="项目名称"
                    value={projectName}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        projectNameRef.current = value;
                        setProjectName(value);
                    }}
                />
                <div>
                    <span>测试时间：</span>
                    <DatePicker
                        format="YYYY-MM-DD"
                        value={testDate ? dayjs(testDate) : undefined}
                        onChange={(date, dateStr) => {
                            paginationRef.current = DEFAULT_PAGINATION;
                            testDateRef.current = dateStr;
                            setTestDate(dateStr);
                        }}
                    />
                </div>
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
                    label="设备箱号"
                    value={deviceBoxNo}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        deviceBoxNoRef.current = value;
                        setDeviceBoxNo(value);
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
                            uploadTimeRef.current = dateStr;
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
                <Button type="primary" onClick={() => getList()}>
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
            ></Table>
        </div>
    );
};

export default Account;
