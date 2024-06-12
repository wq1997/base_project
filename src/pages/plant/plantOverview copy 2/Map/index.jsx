import { useEffect, useState } from "react";
import { Select, Space } from "antd";

const Index = ({ plants, activePosition }) => {
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
        map.panTo(activePosition);
        map.setZoom(17);
        setCenter(activePosition);
    }, [activePosition]);

    const addMarkers = (map, plants) => {
        map.clearMap();
        plants.forEach(item => {
            const marker = new AMap.Marker({
                position: new AMap.LngLat(...item.position),
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
