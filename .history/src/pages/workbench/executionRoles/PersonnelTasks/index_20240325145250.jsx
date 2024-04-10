import { Table, Space } from "antd";
import { SearchInput } from "@/components";
import ReactECharts from "echarts-for-react";
import "./index.less";

const PersonnelTasks = () => {
    const myWorkorders = [
        { name: "接受工单总数", value: "15", color: "#1098EF" },
        { name: "执行工单总数", value: "52", color: "#ED9C0D" },
        { name: "待执行异常工单", value: "67", color: "#10EF12" },
    ];

    const dataSource = [
        {
            key: "1",
            name: "胡彦斌",
            age: 32,
            address: "西湖区湖底公园1号",
        },
        {
            key: "2",
            name: "胡彦祖",
            age: 42,
            address: "西湖区湖底公园1号",
        },
    ];

    const columns = [
        {
            title: "项目名称",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "项目阶段",
            dataIndex: "age",
            key: "age",
        },
        {
            title: "项目进度",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "项目类型",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "项目进度",
            dataIndex: "address",
            key: "address",
        }, {
            title: "项目进度",
            dataIndex: "address",
            key: "address",
        },
    ];

    return (
        <div className="personnel-tasks">
            <div className="title">
                <span>负责项目统计</span>
            </div>
            <div className="content">
                <Table dataSource={dataSource} columns={columns} style={{ width: "100%" }} />;
            </div>
        </div>
    );
};

export default PersonnelTasks;
