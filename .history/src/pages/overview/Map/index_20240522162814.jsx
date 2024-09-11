import { useEffect } from "react";

const Index = () => {
    useEffect(() => {
        const map = new AMap.Map("container1", {
            zoom: 11, //级别
        });
        // 创建一个 Marker 实例：
        var marker = new AMap.Marker({
            position: new AMap.LngLat(121.32540096536637, 31.288889167228728),
        
        });

        // 将创建的点标记添加到已有的地图实例：
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
