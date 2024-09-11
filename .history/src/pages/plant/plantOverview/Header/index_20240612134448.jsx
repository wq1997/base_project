import { useEffect, useState } from "react";
import { Select, Space } from "antd";

const Index = () => {
    const [map, setMap] = useState();

    const [center, setCenter] = useState();
    const defaultZoom = 5;
    const defaultCenter = [109.7952138325958, 32.483775030606736];

    const reset = () => {
        map.setZoom(defaultZoom);
        map.setCenter(defaultCenter);
    };

    const onSelectPlant = value => {
        const moveTo = JSON.parse(value);
        map.panTo(moveTo);
        map.setZoom(17);
        setCenter(moveTo);
    };

    const onClearPlant = () => {
        reset();
        setCenter();
    };

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                padding:'0 10px'
            }}
        >
            <Space>
                <span>电站概览</span>
                <Select
                    placeholder="请选择电站"
                    style={{ width: "200px", marginRight: "5px" }}
                    allowClear={true}
                    value={JSON.stringify(center)}
                    onSelect={onSelectPlant}
                    onClear={onClearPlant}
                    options={[]}
                />
            </Space>
        </div>
    );
};

export default Index;
