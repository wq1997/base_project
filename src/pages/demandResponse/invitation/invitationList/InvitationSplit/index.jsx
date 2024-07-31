import React, { useState, useEffect } from "react";
import { message, Button, Tooltip, Input, Modal, theme, Table, Space, InputNumber } from "antd";
import { PlusOutlined, ExclamationCircleOutlined, AndroidOutlined } from "@ant-design/icons";
import {
    getSplitInviteInitData as getSplitInviteInitDataServer,
    saveSplitInvite as saveSplitInviteServer,
    getInviteDetail as getInviteDetailServer,
} from "@/services/invitation";
import { Title } from "@/components";
import AddTask from "./AddTask";
import BaseLine from "../BaseLine";
import dayjs from "dayjs";
import "./index.less";
import ReactECharts from "echarts-for-react";

let oldDeadline = undefined;
let oldTaskList = [];

const Company = ({ invitationSplitId, onClose }) => {
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

    const getSplitInviteInitData = async () => {
        const res = await getSplitInviteInitDataServer(invitationSplitId);
        if (res?.data?.status == "SUCCESS") {
            const data = res?.data?.data;
            setInviteInfo(data);
            const resources = data?.resources4split;
            const xData = [];
            const yData = [];
            data?.mrLine?.forEach(item => {
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
                        formatter: "{value} kW",
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
            const _taskList = resources?.map(item => {
                item?.baseLineFullInfo.forEach(uu => {
                    item[uu.timeRange] = uu.basePower;
                });
                return item;
            });
            setTaskList(_taskList);
            const timeSolt =
                resources[0]?.baseLineFullInfo?.map((item, itemIndex) => {
                    return {
                        title: item.timeRange,
                        dataIndex: item.timeRange,
                        width: 200,
                        render(_, record, index) {
                            const currentTask = _taskList[index].baseLineFullInfo[itemIndex];
                            return (
                                <InputNumber
                                    style={{ width: "100%" }}
                                    placeholder={currentTask?.basePower + "kW"}
                                    precision={2}
                                    onChange={value => {
                                        const [start, end] = currentTask.timeRange.split("~");
                                        const intervalHour =
                                            dayjs(`2023-04-01 ${end}`).diff(
                                                `2023-04-01 ${start}`,
                                                "minute"
                                            ) / 60;

                                        const KWh =
                                            value == null
                                                ? 0
                                                : intervalHour *
                                                  Math.abs(value - currentTask.basePower);
                                        _taskList[index].baseLineFullInfo[itemIndex].KWh = KWh;
                                        _taskList[index].baseLineFullInfo[itemIndex].targetPower =
                                            value;
                                        setTaskList([..._taskList]);
                                    }}
                                ></InputNumber>
                            );
                        },
                    };
                }) || [];
            setColumns([...baseColumns, ...timeSolt]);
        }
    };

    useEffect(() => {
        invitationSplitId && getSplitInviteInitData();
    }, [invitationSplitId]);

    const AddTaskColse = data => {
        if (data) {
            const index = data?.index;
            const _data = {
                ...data,
                baseLineFullInfo: data?.baseLineFullInfo?.map(item => ({
                    ...item,
                    power: null,
                })),
            };
            if (index == undefined) {
                setTaskList([...taskList, _data]);
            } else {
                const _taskList = [...taskList];
                _taskList[index] = _data;
                setTaskList([..._taskList]);
            }
        }
        setAddTaskOpen(false);
        setEditTask();
    };

    const handleDelete = index => {
        const _taskList = [...taskList];
        _taskList.splice(index, 1);
        setTaskList(_taskList);
    };

    const getDisabledResourceIds = () => {
        let ids = taskList?.map(item => item.resourceId);
        if (editTask) {
            ids = ids?.filter(item => item != editTask?.resourceId);
        }
        return ids;
    };

    const isEqual = () => {
        let flag = false;
        if (oldDeadline != deadline || oldTaskList?.length != taskList?.length) return flag;
        for (let oldItem of oldTaskList) {
            const newItem = taskList?.find(newItem => newItem.companyCode == oldItem.companyCode);
            if (!newItem) {
                return flag;
            } else {
                if (oldItem?.responsePower != newItem?.responsePower) return flag;
            }
        }
        return true;
    };

    const save = async () => {
        const res = await saveSplitInviteServer({
            invitationId: invitationSplitId,
            kwPrice: whPrice,
            resourcePlans: taskList?.map(item => ({
                resourceId: item.resourceId,
                time2TargetPower: item?.baseLineFullInfo?.map(uu => ({
                    time: uu.time,
                    power: uu.targetPower,
                    timeRange: uu.timeRange,
                })),
            })),
        });
        if (res?.data?.status == "SUCCESS") {
            message.success(`拆解成功`);
            onClose(true);
        }
    };

    const handleOk = async () => {
        if (!taskList?.length) return message.info(`请拆解任务`);
        if (!whPrice) return message.info(`请输入度电报价`);
        if (isReSplit && !isEqual()) {
            await modal.confirm({
                title: "系统提示",
                icon: <ExclamationCircleOutlined />,
                content:
                    "当前任务已修改，点击确认，将在【重新拆分】提交后，作废已派发任务，并进行重新派发。",
                okText: "确认",
                cancelText: "取消",
                onOk: () => {
                    save();
                },
            });
        } else {
            save();
        }
    };

    return (
        <>
            <AddTask
                open={addTaskOpen}
                resources={inviteInfo?.resources4split}
                editTask={editTask}
                disabledResourceIds={getDisabledResourceIds()}
                onClose={AddTaskColse}
            />
            <BaseLine baseLineArgs={baseLineArgs} onClose={() => setBaseLineArgs(null)} />
            <Modal
                title={<Title> {isReSplit ? "重新拆分" : "邀约拆分"}</Title>}
                width={1000}
                open={Boolean(invitationSplitId)}
                onOk={handleOk}
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
                            <span>
                                <Input
                                    value={whPrice}
                                    style={{ width: 200 }}
                                    placeholder="请输入度电报价"
                                    onChange={e => setWhPrice(e.target.value)}
                                />
                            </span>
                        </div>
                    </div>
                    <div>
                        <div>全网需求总量</div>
                        <ReactECharts
                            option={options}
                            style={{ width: "950px", height: "280px" }}
                        />
                    </div>
                    <div className="title">任务拆解 (请输入各时段运行功率)</div>
                    <Space style={{ margin: "10px 0" }}>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => setAddTaskOpen(true)}
                        >
                            手工添加
                        </Button>
                        <div>
                            计划申报量：
                            {eval(
                                taskList
                                    ?.map(item => item?.baseLineFullInfo?.map(uu => uu.KWh))
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
                                width: 150,
                                render: (_, record, index) => {
                                    return (
                                        <Space>
                                            <a
                                                type="primary"
                                                onClick={() => {
                                                    setAddTaskOpen(true);
                                                    setEditTask({
                                                        ...record,
                                                        index,
                                                    });
                                                }}
                                            >
                                                编辑
                                            </a>
                                            <a
                                                type="primary"
                                                onClick={() => {
                                                    handleDelete(index);
                                                }}
                                            >
                                                删除
                                            </a>
                                            <a
                                                type="primary"
                                                onClick={() =>
                                                    setBaseLineArgs(record?.baseLineFullInfo)
                                                }
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
