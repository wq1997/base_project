import { useEffect, useState } from "react";
import { Select, Tooltip } from "antd";
import styles from "./index.less";

const baseUrl = process.env.API_URL_1;

const Index = ({ plants, showInfo, panTo }) => {
     
 

    return (
        <div
            id="map"
            style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#0B3858",
            }}
        ></div>
    );
};

export default Index;
