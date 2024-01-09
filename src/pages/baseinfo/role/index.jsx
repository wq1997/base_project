import React, { useState, useEffect } from "react";
import { SearchInput } from "@/components";
import { Button, Space, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./index.less";

const Role = () => {
    const [name, setName] = useState();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [addRoleOpen, setAddRoleOpen] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    const columns = [
        {
            title: "角色名称",
            dataIndex: "name",
        },
        {
            title: "角色编号",
            dataIndex: "age",
        },
        {
            title: "角色说明",
            dataIndex: "关联平台",
        },
        {
            title: "操作",
            dataIndex: "operate",
            render: () => <a>编辑</a>,
        },
    ];

    
    const onSelectChange = newSelectedRowKeys => {
        console.log("selectedRowKeys changed: ", newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    return (
        <div>
            <Space className={styles.search}>
                <SearchInput label="角色名称" placeholder="请输入角色名称关键词或角色编号" inputWidth={250} value={name} onChange={value => setName(value)} />
                <Button type="primary">搜索</Button>
                <Button>重置</Button>
            </Space>
            <Table
                dataSource={dataSource}
                columns={columns}
                rowSelection={{
                    selectedRowKeys,
                    onChange: onSelectChange,
                }}
                title={() => (
                    <Space className={styles.tableTitle}>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => setAddRoleOpen(true)}
                        >
                            新增角色
                        </Button>
                        <Button type="primary">删除角色</Button>
                    </Space>
                )}
            />
        </div>
    )
}

export default Role;