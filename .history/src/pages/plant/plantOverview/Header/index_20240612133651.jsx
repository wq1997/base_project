import { useEffect, useState } from "react";
import { Select, Space } from "antd";

const Index = () => {
    const [center, setCenter] = useState();
    
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
            }}
        >
            <Select
                placeholder="电站概览"
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
    );
};

export default Index;
