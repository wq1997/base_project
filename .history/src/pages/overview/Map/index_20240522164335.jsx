import { useEffect, useState } from "react";
import { Select, Space } from "antd";

const Index = () => {
    const [center, setCenter] = useState("121.32540096536637, 31.288889167228728");
    useEffect(() => {
        const map = new AMap.Map("map", {
            zoom: 16,
            center,
        });

        var marker = new AMap.Marker({
            position: new AMap.LngLat(center.split(",")),
        });

        map.add(marker);
    });

    const onSelect = value => {
        setCenter(value);
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
                    value={center}
                    onSelect={onSelect}
                    options={[
                        {
                            value: "121.32540096536637, 31.288889167228728",
                            label: "勇立大厦",
                        },
                        {
                            value: "121.17628802273558, 31.439924709258538",
                            label: "采日能源",
                        },
                    ]}
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
