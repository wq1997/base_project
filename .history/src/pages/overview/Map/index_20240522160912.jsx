import { useEffect } from "react";

const Index = () => {
  
    useEffect(() => {
      const map = new AMap.Map("container", {
        viewMode: '2D', //默认使用 2D 模式
        zoom: 11, //地图级别
        center: [116.397428, 39.90923], //地图中心点
      });
    });

    return (
        <div
            id="container"
            style={{
                width: "100%",
                height: "100%",
            }}
        ></div>
    );
};

export default Index;
