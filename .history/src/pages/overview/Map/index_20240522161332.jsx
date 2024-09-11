import { useEffect } from "react";

const Index = () => {
    useEffect(() => {
        const map = new AMap.Map("container1", {
            viewMode: "2D", //默认使用 2D 模式
            zoom: 11, //地图级别
     
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
