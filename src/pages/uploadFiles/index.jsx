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

const parseStatusColor = {
    SUCCESS: "#52C41A",
    FAILED: "#ff4d4f",
    PARSING: "#1677ff",
};

const Account = () => {
    const projectNameRef = useRef();
    const testDateRef = useRef();
    const devicePositionRef = useRef();
    const deviceBoxNoRef = useRef();
    const dimensionRef = useRef();
    const uploadTimeRef = useRef();

    const [projectName, setProjectName] = useState();
    const [testDate, setTestDate] = useState();
    const [detailId, setDetailId] = useState(undefined);
    const [devicePosition, setDevicePosition] = useState();
    const [deviceBoxNo, setDeviceBoxNo] = useState();
    const [uploadTime, setUploadTime] = useState();
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [list, setList] = useState([]);
    const [uploadOpen, setUploadOpen] = useState(false);

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
            title: "模版文件",
            dataIndex: "testTemplate",
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
            title: "上传时间",
            dataIndex: "uploadTime",
        },
        {
            title: "处理进度",
            dataIndex: "parseStatusZh",
            render: (_, { parseStatus, parseStatusZh }) => {
                return (
                    <span
                        style={{
                            color: parseStatusColor[parseStatus],
                        }}
                    >
                        {parseStatusZh}
                    </span>
                );
            },
        },
        {
            title: "备注",
            dataIndex: "remark",
        },
        {
            title: "失败原因",
            dataIndex: "parseFailReason",
        },
        {
            title: "操作",
            dataIndex: "operate",
            render: (_, { id, parseStatus }) => {
                const isFAILED = parseStatus == "FAILED";
                return (
                    <Button
                        type="link"
                        disabled={parseStatus == "PARSING"}
                        danger={isFAILED}
                        onClick={() => {
                            if (isFAILED) {
                                setUploadOpen(true);
                                setDetailId(id);
                            } else {
                                history.push(`/analysis-results?id=${id}`);
                            }
                        }}
                    >
                        {isFAILED ? "重新上传" : "详情"}
                    </Button>
                );
            },
        },
    ];

    const getInitData = async () => {
        const res = await getUploadFilesInitDataServer();
        if (res?.data?.code == 0) {
        }
    };

    const getList = async () => {
        const { current, pageSize } = paginationRef.current;
        const [uploadTimeFrom, uploadTimeTo] = uploadTimeRef.current || [];
        const projectName = projectNameRef.current;
        const testDate = testDateRef.current;

        const devicePosition = devicePositionRef.current;
        const deviceBoxNo = deviceBoxNoRef.current;

        const dimension = dimensionRef.current;
        const res = await getUploadFilesListServer({
            pageNum: current,
            pageSize,
            queryParam: {
                uploadTimeFrom,
                uploadTimeTo,
                projectName,
                testDate,

                devicePosition,
                deviceBoxNo,

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
        testDateRef.current = undefined;
        setTestDate();
        devicePositionRef.current = undefined;
        setDevicePosition();
        deviceBoxNoRef.current = undefined;
        setDeviceBoxNo();
        uploadTimeRef.current = undefined;
        setUploadTime();

        getList();
    };

    const handleSearch = () => {
        paginationRef.current = DEFAULT_PAGINATION;
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
                detailId={detailId}
                onClose={() => {
                    setUploadOpen(false);
                    setDetailId(undefined);
                    getList();
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
                            setUploadTime(dateStr?.includes("") ? [] : dateStr);
                        }}
                        value={
                            uploadTime && uploadTime.length > 0
                                ? [dayjs(uploadTime[0]), dayjs(uploadTime[1])]
                                : []
                        }
                    />
                </div>
                <Button type="primary" onClick={handleSearch}>
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
