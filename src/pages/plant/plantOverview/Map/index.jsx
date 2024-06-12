import { useEffect, useState } from "react";
import { Select, Space } from "antd";

const Index = ({ plants, currentPosition }) => {
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

    useEffect(() => {
        if (!map || !plants) return;
        const moveTo = JSON.parse(currentPosition);
        map.panTo(moveTo);
        map.setZoom(17);
        setCenter(moveTo);
    }, [currentPosition]);

    const addMarkers = (map, plants) => {
        map.clearMap();
        plants.forEach(item => {
            const marker = new AMap.Marker({
                position: new AMap.LngLat(...JSON.parse(item.value)),
            });
            map.add(marker);
        });
    };

    return (
        <div
            id="map"
            style={{
                width: "100%",
                height: "100%",
            }}
        ></div>
    );
};

export default Index;
