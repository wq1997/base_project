import { useEffect } from "react";

const Index = () => {
    useEffect(() => {
        const map = new AMap.Map("container1", {
            zoom: 11, //级别
         
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
