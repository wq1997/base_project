import { useEffect, useState } from "react";
import { Select, Space } from "antd";
import {
    getDeviceType as getDeviceTypeServer,
    getDeviceInfo as getDeviceInfoServer,
    saveDevice as saveDeviceServer,
    updateDevice as updateDeviceServer,
} from "@/services/device";

const Index = () => {
    const [map, setMap] = useState();

    const [center, setCenter] = useState();
    const defaultZoom = 5;
    const defaultCenter = [109.7952138325958, 32.483775030606736];

    const getPlantNames = async () => {
        const res = await getPlantNamesServer();
        if (res?.data?.code == 200) {
            setPlantNamesOptions(res?.data?.data);
        }
    };

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
                    options={[]}
                />
            </Space>
        </div>
    );
};

export default Index;
