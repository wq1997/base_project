import { useEffect, useState } from "react";
import { Select, Space } from "antd";

const Index = ({ plants, activePosition, activePlant, setActivePlant }) => {
    const [map, setMap] = useState();
    const [center, setCenter] = useState();
    const defaultZoom = 5;
    const defaultCenter = [109.7952138325958, 32.483775030606736];

    const reset = () => {
        map.setZoom(defaultZoom);
        map.setCenter(defaultCenter);
    };

    useEffect(() => {
        const map = new AMap.Map("map", {
            zoom: defaultZoom,
            center: defaultCenter,
        });
        map.on("complete", async () => {
            setMap(map);
            addMarkers(map, plants);
        });
    }, [plants]);

    const addMarkers = (map, plants) => {
        map.clearMap();
        plants.forEach(item => {
            const marker = new AMap.Marker({
                position: new AMap.LngLat(...item.position),
            });
            map.add(marker);
        });
    };

    const onSelectPlant = value => {
        setActivePlant(value);
        const moveTo = plants?.find(item => item.value == value)?.position;
        if (!map || !plants) return;
        map.panTo(moveTo);
        map.setZoom(17);
        setCenter(moveTo);
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
                    width: "200px",
                    height: "50px",
                    paddingLeft: "8px",
                    display: "flex",
                    background: "linear-gradient(to right, #fff 0%,  transparent 100%)",
                    // background:
                    //     "linear-gradient(to right, transparent 0%, #FFF 50%, transparent 100%)",
                    //  justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    zIndex: 999,
                }}
            >
                <Select
                    placeholder="请选择电站"
                    style={{ width: "200px", marginRight: "5px" }}
                    allowClear={false}
                    value={activePlant}
                    onSelect={onSelectPlant}
                    options={plants}
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
