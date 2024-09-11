import { useEffect } from "react";

const Index = () => {
    useEffect(() => {
        const center = [121.32540096536637, 31.288889167228728];

        const map = new AMap.Map("container1", {
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
            id="container1"
            style={{
                width: "100%",
                height: "100%",
            }}
        ></div>
    );
};

export default Index;
