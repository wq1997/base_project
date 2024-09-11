import { useEffect, useState } from "react";
import { Select, Space } from "antd";

 
const Index = () => {
  
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                position: "relative",
            }}
        >
            <div
                style={{
                    width: "100%",
                    height: "50px",
                    display: "flex",
                    background:
                        "linear-gradient(to right, transparent 0%, #FFF 50%, transparent 100%)",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    zIndex: 999,
                }}
            >
                <Select
                    placeholder="请选择状态"
                    style={{ width: "120px", marginRight: "5px" }}
                    allowClear={true}
                    value={status}
                    onSelect={value => setStatus(value)}
                    onClear={() => setStatus()}
                    options={[
                        { label: "正常", value: 1 },
                        { label: "告警", value: 0 },
                    ]}
                />
                <Select
                    placeholder="请选择电站"
                    style={{ width: "200px", marginRight: "5px" }}
                    allowClear={true}
                    value={JSON.stringify(center)}
                    onSelect={onSelectPlant}
                    onClear={onClearPlant}
                    options={getStatusPlants(status)?.map(item => ({
                        label: item.name,
                        value: JSON.stringify(item.coordinate),
                    }))}
                />
            </div>
            <div
                id="map"
                style={{
                    width: "100%",
                    height: "100%",
                }}
            ></div>
        </div>
    );
};

export default Index;
