import { useEffect, useState } from "react";
import { Select, Space } from "antd";

const getPlants = () => {
    return [
        { name: "合肥电站", coordinate: [117.2659169575958, 31.888710306931912], status: 1 },
        { name: "上海电站", coordinate: [121.17628802273558, 31.439924709258538], status: 0 },
        { name: "北京电站", coordinate: [116.3870107075958, 39.852369913634426], status: 0 },
        { name: "西安电站", coordinate: [109.0481435200958, 34.28168921284642], status: 1 },
    ];
};

const Index = () => {
  
 
    const addMarkers = (map, plants) => {
        map.clearMap();
        plants.forEach(item => {
            const marker = new AMap.Marker({
                position: new AMap.LngLat(...item.coordinate),
            });
            map.add(marker);
        });
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
