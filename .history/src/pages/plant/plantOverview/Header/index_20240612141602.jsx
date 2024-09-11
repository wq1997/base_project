import { useEffect, useState } from "react";
import { Select, Space } from "antd";
import { getPlantNames as getPlantNamesServer } from "@/services/plant";

const Index = (setCurrentPosition) => {
    const [map, setMap] = useState();
    const [plants, setPlants] = useState([]);
    const [center, setCenter] = useState();
    const defaultZoom = 5;
    const defaultCenter = [109.7952138325958, 32.483775030606736];

    const getStatusPlants = status => {
        return plants?.filter(item => {
            if (status === undefined) return item;
            return item.status === status;
        });
    };

    const getPlantNames = async () => {
        const res = await getPlantNamesServer();
        if (res?.data?.code == 200) {
            setPlants(res?.data?.data);
        }
    };

    const reset = () => {
        map.setZoom(defaultZoom);
        map.setCenter(defaultCenter);
    };

    const onSelectPlant = value => {
        const [longitude, latitude] = JSON.parse(value);
        const moveTo = [+longitude, +latitude];
        
    };

    const onClearPlant = () => {
        reset();
        setCenter();
    };

    useEffect(() => {
        getPlantNames();
    }, []);

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
                    allowClear={true}
                    value={JSON.stringify(center)}
                    onSelect={onSelectPlant}
                    onClear={onClearPlant}
                    options={plants?.map(item => ({
                        label: item.name,
                        value: JSON.stringify([item.longitude, item.latitude]),
                    }))}
                />
            </Space>
        </div>
    );
};

export default Index;
