import { useEffect } from "react";

const Index = () => {
    useEffect(() => {
        var map = new AMap.Map("container", {
            zoom: 12,
        });
    });

    return     <div id="container" style={{
      
    }}></div>

};

export default Index;
