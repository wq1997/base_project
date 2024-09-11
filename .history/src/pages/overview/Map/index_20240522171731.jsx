import { useEffect, useState } from "react";
import { Select, Space } from "antd";

const plants = [
    { name: "勇立大厦", coordinate: [121.32540096536637, 31.288889167228728] },
    { name: "采日能源", coordinate: [121.17628802273558, 31.439924709258538] },
];

const Index = () => {
    const [map, setMap] = useState();
    const [center, setCenter] = useState();
    const defaultCenter = [109.7952138325958, 32.483775030606736];
    useEffect(() => {
        const map = new AMap.Map("map", {
            zoom: 5,
            center: defaultCenter,
        });
        map.on("complete", function () {
            setMap(map);
            addMarkers(map);
        });
    }, []);

    const addMarkers = map => {
        plants.forEach(item => {
            const marker = new AMap.Marker({
                position: new AMap.LngLat(...item.coordinate),
            });
            map.add(marker);
        });
    };

    const onSelect = value => {
        const moveTo = JSON.parse(value);
        map.panTo(moveTo);
        map.setZoom(17);
        setCenter(moveTo);
    };

    const onClear = () => {
        map.setZoom(5);
        map.setCenter(defaultCenter);
        setCenter();
    };

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
            }}
        >
            <div
                style={{
                    width: "100%",
                    height: "50px",
                    display: "flex",
                    background: "transparent",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Select
                    style={{ width: "200px" }}
                    allowClear={true}
                    value={JSON.stringify(center)}
                    onSelect={onSelect}
                    onClear={onClear}
                    options={plants?.map(item => ({
                        label: item.name,
                        value: JSON.stringify(item.coordinate),
                    }))}
                />
            </div>
            <div
                id="map"
                style={{
                    width: "100%",
                    height: "calc(100% - 50px)",
                }}
            ></div>
        </div>
    );
};

export default Index;
