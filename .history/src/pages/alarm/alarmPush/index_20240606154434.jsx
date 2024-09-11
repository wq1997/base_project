import React, { useState, useEffect, useRef } from "react";
import { SearchInput } from "@/components";
import { Button, Space, Table, Tag, Switch } from "antd";
import { getAlarmRule as getAlarmRuleServer } from "@/services/alarm";

const colors = {
    PROMPT: "blue",
    MINOR: "orange",
    IMPORTANT: "#EB2F96",
    URGENT: "#FA541C",
};

const Log = () => {
    const [dataSource, setDataSource] = useState([
        { level: "PROMPT", levelText: "提示", disposeType: "", status: false },
        { level: "MINOR", levelText: "次要", disposeType: "", status: false },
        { level: "IMPORTANT", levelText: "重要", disposeType: "", status: false },
        { level: "URGENT", levelText: "紧急", disposeType: "", status: false },
    ]);
    const [loading, setLoading] = useState(false);

    const getAlarmRule = async () => {
        const res = await getAlarmRuleServer();
        if (res?.data?.code == 200) {
            setDataSource(
                dataSource?.map(item => {
                    const findItem = res?.data?.data?.find(uu => uu?.level == item.level);
                    return {
                        ...item,
                        disposeType: findItem?.disposeType,
                        status: findItem?.status,
                    };
                })
            );
        }
    };

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
            dataIndex: "disposeType",
            render: (_, record, index) => {
                return (
                    <SearchInput
                        label=""
                        value={record?.disposeType}
                        type="select"
                        options={[
                            { displayName: "短信", name: "MESSAGE" },
                            { displayName: "邮件", name: "EMAIL" },
                        ]}
                        onChange={value => {
                            const _dataSource = [...dataSource];
                            _dataSource[index].disposeType = value;
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
                        checked={record?.status}
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

    useEffect(() => {
        getAlarmRule();
    }, []);

    const getList = async () => {
        return console.log(dataSource)
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
