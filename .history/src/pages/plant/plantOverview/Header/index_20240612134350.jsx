import { useEffect, useState } from "react";
import { Select, Space } from "antd";

const Index = () => {
    const [map, setMap] = useState();

    const [center, setCenter] = useState();
    const defaultZoom = 5;
    const defaultCenter = [109.7952138325958, 32.483775030606736];

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
                    alignItems:'center'
                }}
            >
               Spa
            </div>
        </div>
    );
};

export default Index;
