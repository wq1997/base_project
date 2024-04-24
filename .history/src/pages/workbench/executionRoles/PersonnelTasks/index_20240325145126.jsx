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
            title: "姓名",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "年龄",
            dataIndex: "age",
            key: "age",
        },
        {
            title: "住址",
            dataIndex: "address",
            key: "address",
        },
    ];

    return (
        <div className="personnel-tasks">
            <div className="title">
                <span>人员任务统计</span>
                <Space>
                    <SearchInput
                        label="数据维度"
                        type="select"
                        value={"1"}
                        options={[
                            {
                                name: "全部",
                                code: "1",
                            },
                            {
                                name: "园区项目",
                                code: "2",
                            },
                        ]}
                    />{" "}
                    <SearchInput
                        label="时间维度"
                        type="select"
                        value={"1"}
                        options={[
                            {
                                name: "年",
                                code: "1",
                            },
                            {
                                name: "月",
                                code: "2",
                            },
                        ]}
                    />
                </Space>
            </div>
            <div className="content">
                <Table dataSource={dataSource} columns={columns} style={{ width: "100%" }} />;
            </div>
        </div>
    );
};

export default PersonnelTasks;
