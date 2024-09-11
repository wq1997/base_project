import React, { useState, useEffect } from "react";
import { message, Button, Select, Form, Input, Modal, Row, Col, Table, Space, Switch } from "antd";
import {
    ALL_SPACE_REG,
    PASSWORD_REG,
    USERNAME_REG,
    TELPHONE_REG,
    EMAIL_REG,
} from "@/utils/constants";
import { getPlantNames as getPlantNamesServer } from "@/services/plant";
import { SearchInput } from "@/components";
import {
    getDeviceType as getDeviceTypeServer,
    getDeviceInfo as getDeviceInfoServer,
    saveDevice as saveDeviceServer,
    updateDevice as updateDeviceServer,
} from "@/services/device";

const Device = ({ open, roleId }) => {
    const [dataSource, setDataSource] = useState([]);

    const columns = [
        {
            title: "告警级别",
            dataIndex: "levelText",
        },
    ];

    const getList = async () => {
        const res = await getDeviceInfoServer(roleId);
        if (res?.data?.code == 200) {
            const values = res?.data?.data || {};
        }
    };

    useEffect(() => {
        roleId && getList();
    }, [roleId]);

    return (
        <Modal
            title="包含用户"
            width={700}
            confirmLoading={true}
            open={open}
            footer={null}
            onCancel={() => onClose()}
        >
            <Space
                style={{
                    flexWrap: "wrap",
                    marginBottom: "8px",
                }}
            >
                <SearchInput
                    label="用户名"
                    placeholder="请输入用户名"
                    value={username}
                    onChange={value => {
                        usernameRef.current = value;
                        setUsername(value);
                    }}
                />
                <Button type="primary" onClick={() => handleSearch()}>
                    搜索
                </Button>
                <Button onClick={handleReset}>重置</Button>
            </Space>
            <Table
                loading={loading}
                dataSource={dataSource?.map(data => {
                    return {
                        ...data,
                        key: data?.id,
                    };
                })}
                onChange={pagination => {
                    paginationRef.current = pagination;
                    getList();
                }}
                columns={columns}
                pagination={pagination}
            />
        </Modal>
    );
};

export default Device;
