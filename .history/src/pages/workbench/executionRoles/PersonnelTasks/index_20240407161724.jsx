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
            name: "宁储**100MW/200MWh共享储能电站",
            age: "售后阶段",
            address: "质保期",
            type: "源网侧",
            withCount: 11,
            inCount: 1,
        },
        {
            key: "2",
            name: "上海**有限公司7.5MW/22.5MWh用户储能项目",
            age: "售后阶段",
            address: "质保期",
            type: "工商业",
            withCount: 8,
            inCount: 0,
        },
        {
            key: "3",
            name: "浙江**能源科技有限公司100KW/215KWh储能项目",
            age: "售后阶段",
            address: "质保期",
            type: "工商业",
            withCount: 20,
            inCount: 1,
        },
        {
            key: "3",
            name: "江苏**能源科技有限公司100KW/215KWh储能项目",
            age: "待实施阶段",
            address: "计划期",
            type: "工商业",
            withCount: 0,
            inCount: 0,
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
            dataIndex: "type",
            key: "type",
        },
        {
            title: "关联工单数",
            dataIndex: "withCount",
            key: "withCount",
        },
        {
            title: "在途工单数",
            dataIndex: "inCount",
            key: "inCount",
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
