import { useEffect, useState } from "react";
import { Select, Button } from "antd";
import online from "@/assets/imges/online.svg";
import styles from "./index.less";

const baseUrl = process.env.API_URL_1;

const Index = ({ plants, activePlant, setActivePlant }) => {
    const [map, setMap] = useState();
    const defaultZoom = 5;
    const [center, setCenter] = useState([108.9, 34.2]);

    useEffect(() => {
        const map = new AMap.Map("map", {
            zoom: defaultZoom,
            center,
        });
        map.on("complete", async () => {
            map.setMapStyle("amap://styles/blue");
            setMap(map);
            addMarkers(map, plants);
        });
    }, [plants]);

    const addMarkers = (map, plants) => {
        plants.forEach((item, index) => {
            const marker = new AMap.Marker({
                position: new AMap.LngLat(...item.position),
                icon: new AMap.Icon({
                    image: require("../../../../../assets/imges/mapPoint.png"),
                    // size: new AMap.Size(25, 20), // 图片大小
                    imageSize: new AMap.Size(15, 20), // 根据所设置的大小拉伸或压缩图片
                }),
                // offset: new AMap.Pixel(-32, -32),
                map: map,
                label: {
                    direction: "top",
                    content: `
                    <div class=${styles.content} title=${item.plantName}>
                         <div class=${styles.row}></div>
                         <img>
                         <span class=${styles.plantName}>${item.plantName}</span>
                    </div>
                    `,
                },
            });
            marker.on("click", e => {
                alert(item.plantName);
            });
        });
    };

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
