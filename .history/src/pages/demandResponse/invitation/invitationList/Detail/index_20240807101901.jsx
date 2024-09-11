import React, { useState, useEffect } from "react";
import { message, Button, Tooltip, Input, Modal, theme, Table, Space, InputNumber } from "antd";
import { PlusOutlined, ExclamationCircleOutlined, AndroidOutlined } from "@ant-design/icons";
import {
    getSplitInviteInitData as getSplitInviteInitDataServer,
    saveSplitInvite as saveSplitInviteServer,
    getInviteDetail as getInviteDetailServer,
} from "@/services/invitation";
import { Title } from "@/components";

import BaseLine from "../BaseLine";
import dayjs from "dayjs";
import "./index.less";
import ReactECharts from "echarts-for-react";

const Company = ({ detailId, onClose }) => {
    const baseColumns = [
        {
            title: "场站名称",
            dataIndex: "companyName",
            key: "companyName",
            render(value) {
                return (
                    <Tooltip title={value}>
                        <div
                            style={{
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {value}
                        </div>
                    </Tooltip>
                );
            },
        },
        {
            title: "最大上升功率(kW)",
            dataIndex: "increaseRate",
        },
        {
            title: "设备容量(kWh)",
            dataIndex: "deviceMaximumCapacity",
        },
    ];
    const { token } = theme.useToken();
    const [modal, contextHolder] = Modal.useModal();
    const [whPrice, setWhPrice] = useState();
    const [addTaskOpen, setAddTaskOpen] = useState();
    const [isReSplit, setIsReSplit] = useState(false);
    const [editTask, setEditTask] = useState();
    const [inviteInfo, setInviteInfo] = useState();
    const [taskList, setTaskList] = useState([]);
    const [deadline, setDeadline] = useState();
    const [baseLineArgs, setBaseLineArgs] = useState(0);
    const [options, setOptions] = useState({});
    const [columns, setColumns] = useState([]);

    const getDetailData = async () => {
        const res = await getInviteDetailServer(detailId);
        if (res?.data?.status == "SUCCESS") {
            const { invitation, resourcePlans } = res?.data?.data;
            setInviteInfo(invitation);
            const xData = [];
            const yData = [];
            invitation?.mrLine?.forEach(item => {
                xData.push(item.timeRange);
                yData.push(item.power);
            });
            setOptions({
                legend: {
                    data: "需求总量",
                    textStyle: {
                        color: token.color11,
                    },
                },
                grid: {
                    top: "10%",
                    bottom: "10%",
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "cross",
                    },
                },
                toolbox: {
                    show: false,
                },
                xAxis: {
                    type: "category",
                    data: xData,
                },
                yAxis: {
                    type: "value",
                    axisLabel: {
                        formatter: "{value} MW",
                    },
                    axisPointer: {
                        snap: true,
                    },
                },
                series: [
                    {
                        name: "需求总量",
                        type: "line",
                        smooth: false,
                        data: yData,
                        symbol: "none",
                        lineStyle: {
                            width: 3,
                        },
                    },
                ],
            });
            const _taskList = resourcePlans?.map(item => {
                item?.details.forEach(uu => {
                    item[uu.timeRange] = uu.basePower;
                });
                return item;
            });
            setTaskList(_taskList);
            const timeSolt =
                resourcePlans[0]?.details?.map((item, itemIndex) => {
                    return {
                        title: item.timeRange,
                        dataIndex: item.timeRange,
                        width: 200,
                        render(_, record, index) {
                            const currentTask = _taskList[index].details[itemIndex];
                            return currentTask?.targetPower + " kW";
                        },
                    };
                }) || [];
            setColumns([...baseColumns, ...timeSolt]);
        }
    };

    useEffect(() => {
        detailId && getDetailData();
    }, [detailId]);

    return (
        <>
            <BaseLine baseLineArgs={baseLineArgs} onClose={() => setBaseLineArgs(null)} />
            <Modal
                title={<Title>邀约详情</Title>}
                width={1000}
                open={Boolean(detailId)}
                onOk={onClose}
                onCancel={() => onClose()}
                destroyOnClose={true}
            >
                <div style={{ padding: "10px 0" }}>
                    <div className="title">邀约信息</div>
                    <div className="info">
                        <div className="item">
                            <span>响应类型：</span>
                            <span>{inviteInfo?.responseTypeZh}</span>
                        </div>
                        <div className="item">
                            <span>度电报价(元)：</span>
                            <span>{taskList[0]?.details?.[0]?.price}</span>
                        </div>
                    </div>
                    <div>
                        <div>全网需求总量</div>
                        <ReactECharts
                            option={options}
                            style={{ width: "950px", height: "280px" }}
                        />
                    </div>
                    <div className="title">上报计划 </div>
                    <Space style={{ margin: "10px 0" }}>
                        <div>
                            计划申报量：
                            {eval(
                                taskList
                                    ?.map(item =>
                                        item?.details?.map(uu => {
                                            const [start, end] = uu.timeRange.split("~");
                                            const intervalHour =
                                                dayjs(`2023-04-01 ${end}`).diff(
                                                    `2023-04-01 ${start}`,
                                                    "minute"
                                                ) / 60;
                                            return uu.targetPower == null
                                                ? 0
                                                : intervalHour *
                                                      Math.abs(uu.targetPower - uu.basePower);
                                        })
                                    )
                                    .flat(Infinity)
                                    ?.filter(item => item != null)
                                    .join("+")
                            )?.toFixed(2)}
                            kWh
                        </div>
                    </Space>
                    <Table
                        rowKey="resourceId"
                        dataSource={taskList}
                        columns={[
                            ...columns,
                            {
                                title: "操作",
                                dataIndex: "operate",
                                fixed: "right",
                                width: 100,
                                render: (_, record, index) => {
                                    return (
                                        <Space>
                                            <a
                                                type="primary"
                                                onClick={() => setBaseLineArgs(record?.details)}
                                            >
                                                基线
                                            </a>
                                        </Space>
                                    );
                                },
                            },
                        ]}
                        pagination={false}
                        scroll={{
                            x: 800,
                        }}
                    ></Table>
                    {contextHolder}
                </div>
            </Modal>
        </>
    );
};

export default Company;
