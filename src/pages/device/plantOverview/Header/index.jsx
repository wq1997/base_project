import { useEffect, useState } from "react";
import { Select, Space } from "antd";

const Index = ({ plants, activePlant, setActivePlant }) => {
    const onSelectPlant = value => {
        setActivePlant(value);
    };

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                padding: "0 10px",
            }}
        >
            <Space>
                <span style={{ fontSize: "20px" }}>电站概览</span>
                <Select
                    placeholder="请选择电站"
                    style={{ width: "200px", marginRight: "5px" }}
                    allowClear={false}
                    value={activePlant}
                    onSelect={onSelectPlant}
                    options={plants}
                />
            </Space>
        </div>
    );
};

export default Index;
