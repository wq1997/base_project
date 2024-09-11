import { useEffect, useState } from "react";
import { Select, Space } from "antd";

const plants = [
    { name: "勇立大厦", coordinate: [121.32540096536637, 31.288889167228728] },
    { name: "采日能源", coordinate: [121.17628802273558, 31.439924709258538] },
];

const Index = () => {
    const [map, setMap] = useState();
    const [center, setCenter] = useState([]);

    useEffect(() => {
        const map = new AMap.Map("map", {
            zoom: 17,
        });
        map.on("complete", function () {
            setMap(map);
            addMarkers(map);
        });
    }, []);

    const addMarkers = (map) => {
        plants.forEach(item => {
            const marker = new AMap.Marker({
                position: new AMap.LngLat(...item.coordinate),
            });

            map.add(marker);
        });
    };

    const onSelect = value => {
        setCenter(JSON.parse(value));
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
                    value={JSON.stringify(center)}
                    onSelect={onSelect}
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
