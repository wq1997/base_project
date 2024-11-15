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
import { jsonToUrlParams, getAlarmColor } from "@/utils/utils";
import dayjs from "dayjs";
import { history, useLocation, useSelector } from "umi";
import { getUrlParams, hasPerm } from "@/utils/utils";
import { getProjectRunReportList as getProjectRunReportListServer } from "@/services";

const Account = () => {
    const projectNameRef = useRef();
    const [projectName, setProjectName] = useState();
    const { user } = useSelector(state => state.user);
    const plantNameRef = useRef();
    const [plantName, setPlantName] = useState();
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [userList, setUserList] = useState([]);

    const columns = [
        {
            title: "项目名称",
            dataIndex: "projectName",
        },
        {
            title: "电站名称",
            dataIndex: "plantName",
        },
        {
            title: "累计充放效率(%)",
            dataIndex: "cumulativeChargeDischargeEfficiency",
        },
        {
            title: "总充电量(kWh)",
            dataIndex: "totalChargeEnergy",
        },
        {
            title: "总放电量(kWh)",
            dataIndex: "totalDischargeEnergy",
        },
        {
            title: "汇总收益",
            dataIndex: "totalRevenue",
        },
        {
            title: "累计告警数",
            dataIndex: "cumulativeAlarmCount",
        },
        {
            title: "累计工单数",
            dataIndex: "cumulativeWorkOrderCount",
        },
        {
            title: "累计异常工单数",
            dataIndex: "cumulativeExceptionWorkOrderCount",
        },
    ];

    const getList = async () => {
        const { current, pageSize } = paginationRef.current;
        const projectName = projectNameRef.current;
        const plantName = plantNameRef.current;

        const res = await getProjectRunReportListServer({
            pageNum: current,
            pageSize,
            queryCmd: {
                projectName,
                plantName,
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

        getList();
    };

    useEffect(() => {
        getList();
    }, []);

    return (
        <div className="electronic-archives">
            <Space className="search" size={10}>
                <SearchInput
                    label="项目名称"
                    value={projectName}
                    onChange={value => {
                        projectNameRef.current = value;
                        setProjectName(value);
                    }}
                />
                <SearchInput
                    label="电站名称"
                    value={plantName}
                    onChange={value => {
                        plantNameRef.current = value;
                        setPlantName(value);
                    }}
                />

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
                onChange={pagination => {
                    paginationRef.current = pagination;
                    getList();
                }}
                scroll={{
                    x: 1500,
                }}
                title={() => (
                    <Space>
                        {hasPerm(user, "op:project_run_total_export") && (
                            <Button
                                type="primary"
                                onClick={async () => {
                                    if (projectName) {
                                        const projectName = projectNameRef.current;
                                        const plantName = plantNameRef.current;
                                        window.open(
                                            getBaseUrl() +
                                                "/project_run_total/export-find" +
                                                jsonToUrlParams({
                                                    projectName,
                                                    plantName,
                                                    access_token: localStorage.getItem("Token"),
                                                })
                                        );
                                    } else {
                                        message.error("至少搜索一个项目");
                                    }
                                }}
                            >
                                导出查询数据
                            </Button>
                        )}
                    </Space>
                )}
            ></Table>
        </div>
    );
};

export default Account;
