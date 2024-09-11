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
        <div >
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
