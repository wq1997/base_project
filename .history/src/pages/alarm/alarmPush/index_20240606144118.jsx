import React, { useState, useEffect, useRef } from "react";
import { SearchInput } from "@/components";
import { Button, Space, Table, Tag, Switch } from "antd";
import { getAlarmRule as getAlarmRuleServer} from ''

const colors = {
    prompt: "blue",
    secondary: "orange",
    important: "#EB2F96",
    urgent: "#FA541C",
};

const Log = () => {
    const [dataSource, setDataSource] = useState([
        { level: "prompt", levelText: "提示", method: "", limit: "", status: false },
        { level: "secondary", levelText: "次要", method: 1, limit: 1, status: false },
        { level: "important", levelText: "重要", method: 2, limit: 2, status: true },
        { level: "urgent", levelText: "紧急", method: "", limit: "", status: false },
    ]);
    const [loading, setLoading] = useState(false);

    const columns = [
        {
            title: "告警级别",
            dataIndex: "levelText",
            render: (_, record, index) => {
                return <span style={{ color: colors[record?.level] }}>{record?.levelText}</span>;
            },
        },
        {
            title: "推送方式",
            dataIndex: "method",
            render: (_, record, index) => {
                return (
                    <SearchInput
                        label=""
                        value={record?.method}
                        type="select"
                        options={[
                            { name: "短信", code: 1 },
                            { name: "邮件", code: 2 },
                        ]}
                        onChange={value => {
                            const _dataSource = [...dataSource];
                            _dataSource[index].method = value;
                            setDataSource(_dataSource);
                        }}
                    />
                );
            },
        },
        {
            title: "状态",
            dataIndex: "status",
            render: (_, record, index) => {
                return (
                    <Switch
                        checkedChildren="开启"
                        unCheckedChildren="关闭"
                        defaultChecked={record?.status}
                    />
                );
            },
        },
        {
            title: "接收用户",
            dataIndex: "user",
            render: (_, record, index) => {
                return "系统管理员";
            },
        },
    ];

    const getList = async () => {
        setLoading(true);
        try {
            const res = await getOperationLogServe({
                pageNum: current,
                pageSize,
                queryCmd: {},
            });
            if (res?.data?.status == "SUCCESS") {
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button
                type="primary"
                onClick={getList}
                style={{
                    marginBottom: "8px",
                }}
            >
                保存配置
            </Button>
            <Table loading={loading} dataSource={dataSource} columns={columns} pagination={false} />
        </>
    );
};

export default Log;
