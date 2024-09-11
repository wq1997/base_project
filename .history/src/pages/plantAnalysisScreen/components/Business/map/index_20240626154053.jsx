import { useEffect, useState } from "react";
import { Select, Button } from "antd";
import mapPoint from "@/assets/imges/mapPoint.png";
import styles from "./index.less";

const baseUrl = process.env.API_URL_1;

const Index = ({ plants, activePlant, setActivePlant }) => {
    const [map, setMap] = useState();
    const defaultZoom = 5;
    const [center, setCenter] = useState([108.9, 34.2]);

    const reset = () => {
        map.setZoom(defaultZoom);
        map.setCenter(center);
    };

    useEffect(() => {
        const map = new AMap.Map("map", {
            zoom: defaultZoom,
            center,
        });
        map.on("complete", async () => {
            map.setMapStyle("amap://styles/blue");
            const infoWindow = new AMap.InfoWindow({
                isCustom: true,
                offset: new AMap.Pixel(0, -30),
            });
            setMap(map);
            addMarkers(map, infoWindow, plants);
        });
    }, [plants]);

    const addMarkers = (map, infoWindow, plants) => {
        plants.forEach((item, index) => {
            const marker = new AMap.Marker({
                position: new AMap.LngLat(...item.position),
                icon: require("../../../../../assets/imges/mapPoint.png"),
                // icon: new AMap.Icon({
                //     image: require("../../../../../assets/imges/mapPoint.gif"),
                //     size: new AMap.Size(64, 64), // 图片大小
                //     imageSize: new AMap.Size(64, 64), // 根据所设置的大小拉伸或压缩图片
                // }),
                // offset: new AMap.Pixel(-32, -32),
                map: map,
                // content: `<div class=${styles["custom-content-marker"]}><div class=${styles.item}></div></div>`,
                // content: `<div class=${styles.myContent}><div class=${styles.header}><div class=${styles.row}></div><span class=${styles.plantName}>${item.plantName}</span></div><img src=${mapPoint} /></div>`,
            });
            marker.setLabel({
                direction: "top",
                style:{
                    background:'none',
                },
                content:  `
                     <div class=${styles.infoWindow}>
                    <div class=${styles.header}>
                        <div class=${styles.row}></div>
                        <span class=${styles.plantName}>${item.plantName}</span>
                    </div>
                </div>
                `
            });
            //     marker.content = `
            //    <div class=${styles.infoWindow}>
            //         <div class=${styles.header}>
            //             <div class=${styles.row}></div>
            //             <span class=${styles.plantName}>${item.plantName}</span>
            //         </div>
            //     </div>
            //     `;
            marker.on("click", e => {
                infoWindow.setContent(e.target.content);
                infoWindow.open(map, e.target.getPosition());
            });
            marker.emit("click", { target: marker });
        });
    };

    const onSelectPlant = value => {
        setActivePlant(value);
        if (!value) {
            return reset();
        }
        const moveTo = plants?.find(item => item.value == value)?.position;
        if (!map || !plants) return;
        map.panTo(moveTo);
        map.setZoom(20);
        map.setCenter(moveTo);
    };

    return (
        <div
            id="map"
            style={{
                width: "100%",
                height: "100%",
            }}
        ></div>
    );
};

export default Index;
