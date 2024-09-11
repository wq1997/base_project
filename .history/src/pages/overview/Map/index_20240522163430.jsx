import { useEffect } from "react";

const Index = () => {
    useEffect(() => {
        const center = [121.32540096536637, 31.288889167228728];

        const map = new AMap.Map("map", {
            zoom: 16,
            center,
        });

        var marker = new AMap.Marker({
            position: new AMap.LngLat(...center),
        });

        map.add(marker);
    });

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
                    background: "red",
                }}
            >
                <Select
                    defaultValue="lucy"
                    style={{
                        width: 120,
                    }}
                    onChange={handleChange}
                    options={[
                        {
                            value: [121.32540096536637, 31.288889167228728],
                            label: "勇立大厦",
                        },
                        {
                            value: "lucy",
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
