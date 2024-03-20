import React, { useState } from "react";
import { Button, Space, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { SearchInput } from "@/components";
import "./index.less";
 

const Company = () => {
    const [name, setName] = useState();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectChange = newSelectedRowKeys => {
        console.log("selectedRowKeys changed: ", newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    return (
        <div>
            <Space className="search">
                <SearchInput label="公司名称" value={name} onChange={value => setName(value)} />
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
                    <Space className="table-title">
                        <Button type="primary" icon={<PlusOutlined />}>
                            新增公司
                        </Button>
                        <Button type="primary">删除公司</Button>
                    </Space>
                )}
            ></Table>
        </div>
    );
};

export default Company;
