import { Space, Button, Table, theme, DatePicker, Row } from "antd";
import { DEFAULT_PAGINATION } from "@/utils/constants";
import React, { useState, useEffect, useRef } from "react";
import { SearchInput } from "@/components";
import styles from "./index.less";

const ResourcesInventory = () => {
    const { token } = theme.useToken();
    const paginationRef = useRef(DEFAULT_PAGINATION);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [name, setName] = useState();
    const nameRef = useRef();
    const [area, setArea] = useState();
    const areaRef = useRef();
    const [dataSource, setDataSource] = useState([{}]);

    return (
        <div className={styles.resourcesInventory}>
            <Space className={styles.search} size={20}>
                <SearchInput
                    label="人员名称"
                    value={name}
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        nameRef.current = value;
                        setName(value);
                    }}
                />
                <SearchInput
                    label="所属区域"
                    value={area}
                    type="select"
                    onChange={value => {
                        paginationRef.current = DEFAULT_PAGINATION;
                        areaRef.current = value;
                        setArea(value);
                    }}
                />
                <Button type="primary">搜索</Button>
                <Button type="primary" danger>重置</Button>
            </Space>
            <Table
                rowKey="id"
                dataSource={dataSource}
                columns={[
                    {
                        title: "人员名称",
                        dataIndex: "name",
                    },
                    {
                        title: "负责项目总数",
                        dataIndex: "name1",
                    },
                    {
                        title: "实施阶段项目数",
                        dataIndex: "name2",
                    },
                    {
                        title: "售后质保项目数",
                        dataIndex: "name3",
                    },
                    {
                        title: "售后过保项目数",
                        dataIndex: "name4",
                    },
                    {
                        title: "处理实施工单数",
                        dataIndex: "name5",
                    },
                    {
                        title: "处理任务总数",
                        dataIndex: "name6",
                    },
                    {
                        title: "处理巡检工单数",
                        dataIndex: "name7",
                    },
                    {
                        title: "处理异常工单数",
                        dataIndex: "name8",
                    },
                    {
                        title: "待办工单数",
                        dataIndex: "name9",
                    },
                ]}
                pagination={pagination}
                onChange={pagination => {
                    paginationRef.current = pagination;
                }}
            />
        </div>
    )
}

export default ResourcesInventory;