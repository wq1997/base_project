import React, { useState } from "react";
import { Select, Radio } from "antd";
import ReactECharts from "echarts-for-react";
import dayjs from "dayjs";
import "./index.less";

const Total = () => {
    const [type, setType] = useState("week");

    const myWorkorders = [
        { name: "接受工单总数", value: "15", color: "#1098EF" },
        { name: "执行工单总数", value: "52", color: "#ED9C0D" },
        { name: "待执行异常工单", value: "67", color: "#10EF12" },
    ];

    const dataSource = [
        {
          key: '1',
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号',
        },
        {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号',
        },
      ];
      
      const columns = [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '年龄',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '住址',
          dataIndex: 'address',
          key: 'address',
        },
      ];

    return (
        <div className="total">
            <div className="my">
                <div className="title">我待办的</div>
                <div className="content">
                    {myWorkorders.map(item => (
                        <div className="order">
                            <span>{item.name}</span>
                            <span className="value" style={{ color: item.color }}>
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="task-board">
                <div className="title">负责项目统计</div>
                <div className="content"><Table dataSource={dataSource} columns={columns} />;</div>
            </div>
        </div>
    );
};

export default Total;
