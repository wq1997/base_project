import { useEffect } from "react";

const Index = () => {
    useEffect(() => {
        var map = new AMap.Map("container", {
            zoom: 12,
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
