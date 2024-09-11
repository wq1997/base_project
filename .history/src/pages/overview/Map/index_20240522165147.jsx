import { useEffect, useState } from "react";
import { Select, Space } from "antd";

const plants = [
    {
        value: [121.32540096536637, 31.288889167228728]
        label: "勇立大厦",
    },
    {
        value: JSON.stringify(),
        label: "采日能源",
    },
];

const Index = () => {
    const [center, setCenter] = useState([121.32540096536637, 31.288889167228728]);

    useEffect(() => {
        const map = new AMap.Map("map", {
            zoom: 17,
            center,
        });

        var marker = new AMap.Marker({
            position: new AMap.LngLat(...center),
        });

        map.add(marker);
    });

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
                    options={[
                        {
                            value: JSON.stringify([121.32540096536637, 31.288889167228728]),
                            label: "勇立大厦",
                        },
                        {
                            value: JSON.stringify([121.17628802273558, 31.439924709258538]),
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
