import { useEffect } from "react";

const Index = () => {
    useEffect(() => {
        const map = new AMap.Map("container1", {
            zoom: 11, //级别
        });
        // 创建一个 Marker 实例：
        var marker = new AMap.Marker({
            position: new AMap.LngLat(116.39, 39.9), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: "北京",
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
