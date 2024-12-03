import React, { useState, useEffect, useRef } from "react";
import {
    Button,
    Space,
    Table,
    message,
    Modal,
    DatePicker,
    Tooltip,
    Input,
    Radio,
    Popconfirm,
} from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import { SearchInput } from "@/components";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import "./index.less";
import { getBaseUrl } from "@/services/request";
import { jsonToUrlParams, toChineseNumber } from "@/utils/utils";
import dayjs from "dayjs";
import moment from "moment";
import { history, useLocation, useSelector } from "umi";
import { getUrlParams, hasPerm } from "@/utils/utils";
import {
    getProjectRunDayReportList as getProjectRunDayReportListServer,
    addDownloadTask as addDownloadTaskServer,
    getProjectRunDayReportInitData as getProjectRunDayReportInitDataServer,
} from "@/services";

const defaultStartDate = dayjs(moment().subtract(30, "day").format("YYYY-MM-DD"));
const defaultEndDate = dayjs(moment().subtract(0, "day").format("YYYY-MM-DD"));

const momentList = [
    { time: "04:00", moment: 4 },
    { time: "08:00", moment: 8 },
    { time: "12:00", moment: 12 },
    { time: "16:00", moment: 16 },
    { time: "20:00", moment: 20 },
    { time: "24:00", moment: 24 },
];

const Account = () => {
    const projectNameRef = useRef();
    const [projectName, setProjectName] = useState();
    const { user } = useSelector(state => state.user);
    const plantNameRef = useRef();
    const [plantName, setPlantName] = useState();
    const timeRef = useRef([defaultStartDate, defaultEndDate]);
    const [time, setTime] = useState([defaultStartDate, defaultEndDate]);
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [userList, setUserList] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [downloadCheckRecordName, setDownloadCheckRecordName] = useState(null);
    const [downloadCheckRecordId, setDownloadCheckRecordId] = useState(null);
    const [initData, setInitData] = useState();

    const columns = [
        {
            title: "监测时间",
            dataIndex: "detectionDate",
        },
        {
            title: "项目名称",
            dataIndex: "projectName",
        },
        {
            title: "电站名称",
            dataIndex: "plantName",
        },
        {
            title: "当日充放效率(%)",
            dataIndex: "dayChargeDischargeEfficiency",
        },
        {
            title: "当日收益(元)",
            dataIndex: "dayEarnings",
        },
        {
            title: "当日充电量(kWh)",
            dataIndex: "dayChargeEnergy",
        },
        {
            title: "当日放电量(kWh)",
            dataIndex: "dayDischargeEnergy",
        },
        {
            title: () => {
                return (
                    <Tooltip title="当日最后一次放电完成时，所有主体最低电压与所有主体最高电压的差值">
                        当日最大压差(V)
                    </Tooltip>
                );
            },
            dataIndex: "dayMaxVoltageDifference",
        },
        {
            title: () => {
                return (
                    <Tooltip title="当日最后一次放电完成时，所有主体最低温度与所有主体最高温度的差值">
                        当日最大温差(°C)
                    </Tooltip>
                );
            },
            dataIndex: "dayMaxTemperatureDifference",
        },
        {
            title: "当日告警数",
            dataIndex: "dayAlarmCount",
            render: (_, { dayAlarmCount, detectionDate, projectId }) => {
                return (
                    <span
                        onClick={() => {
                            history.push(
                                `/project-management/alarmStatistics?activeKey=detailed&time=${detectionDate}&projectId=${projectId}`
                            );
                        }}
                        style={{ cursor: "pointer" }}
                    >
                        {dayAlarmCount}
                    </span>
                );
            },
        },
        {
            title: "当日工单数",
            dataIndex: "dayWorkOrderCount",
            render: (_, { dayWorkOrderCount, detectionDate, projectId }) => {
                return (
                    <span
                        onClick={() => {
                            history.push(
                                `/task-management/task-list?time=${detectionDate}&projectId=${projectId}`
                            );
                        }}
                        style={{ cursor: "pointer" }}
                    >
                        {dayWorkOrderCount}
                    </span>
                );
            },
        },
        {
            title: "当日异常工单数",
            dataIndex: "dayExceptionWorkOrderCount",
            render: (_, { dayExceptionWorkOrderCount, detectionDate, projectId }) => {
                return (
                    <span
                        onClick={() => {
                            history.push(
                                `/task-management/task-list?time=${detectionDate}&projectId=${projectId}&typeIn=${encodeURIComponent(["SYS_EXCEPTION", "MANUAL_EXCEPTION"])}`
                            );
                        }}
                        style={{ cursor: "pointer" }}
                    >
                        {dayExceptionWorkOrderCount}
                    </span>
                );
            },
        },
        {
            title: "操作",
            dataIndex: "operate",
            width: 150,
            fixed: "right",
            render: (_, { id, projectName }) => {
                return (
                    <Space style={{ display: "flex", flexDirection: "column" }}>
                        {hasPerm(user, "op:project_run_day_report_export") && (
                            <a
                                style={{ color: "#0EBCB6" }}
                                onClick={() => {
                                    setDownloadCheckRecordId(id);
                                    setDownloadCheckRecordName(projectName);
                                }}
                            >
                                导出云平台巡检记录
                            </a>
                        )}
                        {hasPerm(user, "op:project_run_day_report_task_list") && (
                            <a
                                style={{ color: "#EE7612" }}
                                onClick={async () => {
                                    const res = await addDownloadTaskServer(id);
                                    message.info(res?.data?.msg);
                                }}
                            >
                                导出当日充放原数据
                            </a>
                        )}
                    </Space>
                );
            },
        },
    ];

    const onSelectChange = (newSelectedRowKeys, newSelectedRows) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const getInitData = async () => {
        const res = await getProjectRunDayReportInitDataServer();
        if (res?.data?.status == "SUCCESS") {
            setInitData(res?.data?.data);
        }
    };

    const getList = async () => {
        const { current, pageSize } = paginationRef.current;
        const projectName = projectNameRef.current;
        const plantName = plantNameRef.current;
        const [detectionDateFrom, detectionDateTo] = timeRef.current || [];
        const res = await getProjectRunDayReportListServer({
            pageNum: current,
            pageSize,
            queryCmd: {
                projectName,
                plantName,
                detectionDateFrom: dayjs(detectionDateFrom).format("YYYY-MM-DD"),
                detectionDateTo: dayjs(detectionDateTo).format("YYYY-MM-DD"),
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
        plantNameRef.current = undefined;
        setPlantName();
        timeRef.current = undefined;
        setTime();
        getList();
    };

    useEffect(() => {
        getInitData();
        getList();
    }, []);

    return (
        <div className="electronic-archives">
            <Space className="search" size={10}>
                <SearchInput
                    label="项目名称"
                    showSearch={true}
                    type="select"
                    value={projectName}
                    options={initData?.projectNameList?.map(item => {
                        return {
                            code: item,
                            name: item,
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
                    showSearch={true}
                    type="select"
                    value={plantName}
                    options={initData?.plantNameList?.map(item => {
                        return {
                            code: item,
                            name: item,
                        };
                    })}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        plantNameRef.current = value;
                        setPlantName(value);
                    }}
                />
                <div>
                    <span style={{ marginRight: 5 }}>日报生成时间</span>
                    <DatePicker.RangePicker
                        disabledDate={(current, { from, type }) => {
                            const getYearMonth = date => date.year() * 12 + date.month();
                            if (from) {
                                const minDate = from.add(-30, "days");
                                const maxDate = from.add(30, "days");
                                switch (type) {
                                    case "year":
                                        return (
                                            current.year() < minDate.year() ||
                                            current.year() > maxDate.year()
                                        );
                                    case "month":
                                        return (
                                            getYearMonth(current) < getYearMonth(minDate) ||
                                            getYearMonth(current) > getYearMonth(maxDate)
                                        );
                                    default:
                                        return Math.abs(current.diff(from, "days")) >= 31;
                                }
                            }
                            return false;
                        }}
                        value={
                            time && time.length > 0 && time[0] && time[1]
                                ? [dayjs(time[0]), dayjs(time[1])]
                                : []
                        }
                        onChange={(date, dateStr) => {
                            timeRef.current = dateStr;
                            setTime(dateStr);
                        }}
                    />
                </div>

                <Button
                    type="primary"
                    onClick={() => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        getList();
                    }}
                >
                    搜索
                </Button>
                <Button onClick={handleReset} type="primary" danger>
                    重置
                </Button>
            </Space>
            <Table
                rowKey="id"
                dataSource={userList}
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
                    x: 2000,
                }}
                title={() => (
                    <Space>
                        {hasPerm(user, "op:project_run_day_report_export") && (
                            <>
                                <Button
                                    type="primary"
                                    onClick={async () => {
                                        if (projectName) {
                                            const projectName = projectNameRef.current;
                                            const plantName = plantNameRef.current;
                                            const [detectionDateFrom, detectionDateTo] =
                                                timeRef.current || [];
                                            const url =
                                                getBaseUrl() +
                                                "/project_run_day_report/export-find" +
                                                jsonToUrlParams({
                                                    projectName,
                                                    plantName,
                                                    detectionDateFrom:
                                                        dayjs(detectionDateFrom).format(
                                                            "YYYY-MM-DD"
                                                        ),
                                                    detectionDateTo:
                                                        dayjs(detectionDateTo).format("YYYY-MM-DD"),
                                                    access_token: localStorage.getItem("Token"),
                                                });
                                            window.open(url);
                                        } else {
                                            message.error("至少搜索一个项目");
                                        }
                                    }}
                                >
                                    导出查询数据
                                </Button>
                                <Button
                                    style={{ background: "rgb(22, 118, 239)" }}
                                    type="primary"
                                    danger
                                    onClick={async () => {
                                        if (!selectedRowKeys?.length)
                                            return message.info("请勾选需要导出的数据");
                                        const url =
                                            getBaseUrl() +
                                            "/project_run_day_report/export-multiple-check-records" +
                                            jsonToUrlParams({
                                                toolRunDayReportIdList: selectedRowKeys,
                                                access_token: localStorage.getItem("Token"),
                                            });
                                        window.open(url);
                                    }}
                                >
                                    批量导出云平台巡检数据
                                    {selectedRowKeys?.length ? (
                                        <span>({selectedRowKeys?.length})</span>
                                    ) : (
                                        ""
                                    )}
                                </Button>
                            </>
                        )}
                    </Space>
                )}
            ></Table>
            <Modal
                title="巡检记录导出"
                destroyOnClose={true}
                open={Boolean(downloadCheckRecordId)}
                width={500}
                onCancel={() => {
                    setDownloadCheckRecordId(null);
                    setDownloadCheckRecordName(null);
                }}
                footer={null}
            >
                <div
                    style={{
                        margin: 10,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {momentList?.map((item, index) => {
                        return (
                            <div
                                style={{
                                    marginBottom: 10,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <span>时刻{toChineseNumber(index + 1)}：</span>
                                <span style={{ marginRight: 20 }}>
                                    <span style={{ marginRight: 10 }}>
                                        {downloadCheckRecordName}
                                    </span>
                                    {item.time}
                                </span>
                                <Button
                                    onClick={() => {
                                        const url =
                                            getBaseUrl() +
                                            "/project_run_day_report/export-check-record" +
                                            jsonToUrlParams({
                                                id: downloadCheckRecordId,
                                                moment: item.moment,
                                                access_token: localStorage.getItem("Token"),
                                            });
                                        window.open(url);
                                    }}
                                >
                                    导出
                                </Button>
                            </div>
                        );
                    })}
                    <Button
                        style={{ marginTop: 5 }}
                        onClick={() => {
                            const url =
                                getBaseUrl() +
                                "/project_run_day_report/export-multiple-check-records" +
                                jsonToUrlParams({
                                    toolRunDayReportIdList: [downloadCheckRecordId],
                                    access_token: localStorage.getItem("Token"),
                                });
                            console.log("url", url);
                            window.open(url);
                        }}
                    >
                        导出全部文件
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default Account;
