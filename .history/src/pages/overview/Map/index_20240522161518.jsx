import { useEffect } from "react";

const Index = () => {
    useEffect(() => {
        const map = new AMap.Map("container1", {
          zoom:11,//级别
          center: [116.397428, 39.90923],//中心点坐标
          viewMode:'3D'//使用3D视图
        });
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
