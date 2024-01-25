import React, { useState, useEffect } from "react";
import { message, Button, Form, Input, Modal, Table, Space, Descriptions } from "antd";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import {
    getSearchInitData as getSearchInitDataServer,
    saveEnterRecord as saveEnterRecordServer,
} from "@/services/invitation";
import dayjs from "dayjs";
import "./index.less";

const Company = ({ open, onClose }) => {
    const [form] = Form.useForm();
    const [modal, contextHolder] = Modal.useModal();
    const [responseTypeList, setResponseTypeList] = useState();
    const [responseTimeTypeList, setResponseTimeTypeList] = useState();

    const getSearchInitData = async () => {
        const res = await getSearchInitDataServer();
        if (res?.data?.status == "SUCCESS") {
            const { responseTypes, responseTimeTypes } = res?.data?.data;
            setResponseTypeList(responseTypes);
            setResponseTimeTypeList(responseTimeTypes);
        }
    };

    useEffect(() => {
        open && getSearchInitData();
    }, [open]);

    const handleUseAI = () => {
        modal.confirm({
            title: "AI智能拆解",
            icon: <ExclamationCircleOutlined />,
            content:
                "是否采用AI智能方案？（若采用AI方案，会根据公司用电及履约情况自动匹配任务。启用AI方案会将已手工录入任务删除）",
            okText: "确认",
            cancelText: "取消",
        });
    };

    const items = [
        {
            label: "响应类型",
            value: "响应类型",
        },
        {
            label: "响应要求",
            value: "响应要求",
        },
        {
            label: "度电报价",
            value: "度电报价",
        },
        {
            label: "响应功率",
            value: "响应功率",
        },
        {
            label: "约定开始时间",
            value: "约定开始时间",
        },
        {
            label: "约定结束时间",
            value: "约定结束时间",
        },
    ];

    const columns = [
        {
            title: "公司名称",
            dataIndex: "confirmStatusZh",
        },
        {
            title: "签约响应功率(kW)",
            dataIndex: "splitStatusZh",
        },
        {
            title: "分配任务功率(kW)",
            dataIndex: "createdTime",
        },
        {
            title: "确认截止时间",
            dataIndex: "responseTypeZh",
        },
        {
            title: "任务备注",
            dataIndex: "responseTimeTypeZh",
        },
        {
            title: "操作",
            dataIndex: "operate",
            render: (_, record) => {
                return (
                    <Space>
                        <a type="primary" onClick={() => setEnterRecordOpen(true)}>
                            编辑
                        </a>
                        <a type="primary" onClick={() => setEnterRecordOpen(true)}>
                            删除
                        </a>
                        <a type="primary" onClick={() => setEnterRecordOpen(true)}>
                            查看
                        </a>
                        <a type="primary" onClick={() => setEnterRecordOpen(true)}>
                            基线
                        </a>
                    </Space>
                );
            },
        },
    ];

    return (
        <Modal
            title="邀约拆分"
            width={900}
            confirmLoading={true}
            open={true}
            footer={null}
            onCancel={() => onClose(false)}
        >
            <div className="title">邀约信息</div>
            <div className="info">
                {items?.map((item, index) => (
                    <div className="item" key={index}>
                        <span>{item.label}：</span>
                        <span>{item.value}</span>
                    </div>
                ))}
            </div>
            <div className="title">任务拆解</div>
            <Space>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setEnterRecordOpen(true)}
                >
                    手工添加
                </Button>
                <Button type="primary" onClick={() => handleUseAI()}>
                    AI智能拆解
                </Button>
                <Button type="primary" onClick={() => setEnterRecordOpen(true)}>
                    确认截止时间
                </Button>
            </Space>
            <Table
                dataSource={[]}
                columns={columns}
                title={() => <Space className="table-title"></Space>}
            ></Table>
            {contextHolder}
        </Modal>
    );
};

export default Company;
