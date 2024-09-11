import React, { useState, useEffect } from "react";
import { Modal, Image, Descriptions } from "antd";
import { getAlarmInfo as getAlarmInfoServer } from "@/services/alarm";
import "./index.less";

const baseUrl = process.env.API_URL_1;

const baseItems = [
    {
        label: "告警名称",
        key: "name",
    },
    {
        label: "告警级别",
        key: "levelName",
    },
    {
        label: "设备名称",
        key: "deviceName",
    },
    {
        label: "设备类型",
        key: "deviceTypeName",
    },
    {
        label: "电站名称",
        key: "plantName",
    },
    {
        label: "清除时间",
        key: "recoverTime",
    },
    {
        label: "发生时间",
        key: "createTime",
    },
    {
        label: "处理意见",
        key: "suggestion",
    },
    {
        label: "结束时间",
        key: "finishTime",
    },
    {
        label: "维护经验",
        key: "experience",
    },
];

const Company = ({ detailId, onClose }) => {
    const [items, setItems] = useState();
    const getDetail = async () => {
        const res = await getAlarmInfoServer(detailId);
        if (res?.data?.code == 200) {
            setItems(
                baseItems?.map(item => {
                    return {
                        ...item,
                        children: res?.data?.data?.[item.key],
                    };
                })
            );
        }
    };

    useEffect(() => {
        detailId && getDetail();
    }, [detailId]);

    return (
        <Modal
            title=""
            width={1000}
            open={Boolean(detailId)}
            onOk={() => onClose()}
            onCancel={() => onClose()}
        >
            <Descriptions
                title="告警详情"
                items={[
                    ...columns,
                    ...(activeKey == "history"
                        ? [
                              {
                                  title: "清除时间",
                                  dataIndex: "recoverTime",
                              },
                              {
                                  title: "结束时间",
                                  dataIndex: "finishTime",
                              },
                          ]
                        : []),
                    {
                        title: "操作",
                        dataIndex: "operate",
                        fixed: "right",
                        width: 150,
                        render: (_, { id }) => {
                            return (
                                <Space>
                                    {activeKey == "active" && (
                                        <a onClick={() => setClearId(id)}>清除</a>
                                    )}
                                    <a onClick={() => setDetailId(id)}>详情</a>
                                </Space>
                            );
                        },
                    },
                ]}
                column={2}
            />
        </Modal>
    );
};

export default Company;
