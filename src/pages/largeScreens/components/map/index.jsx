import { useEffect, useState } from "react";
import { Select, Tooltip } from "antd";
import styles from "./index.less";

const baseUrl = process.env.API_URL_1;

const Index = ({ plants, activePlant, setActivePlant }) => {
    const [map, setMap] = useState();
    const defaultZoom = 5;
    const [center, setCenter] = useState([108.9, 34.2]);
    window.info = [
        { name: "电池仓数量", key: "", value: "杭州高特电子设备股份有限公司" },
        { name: "单台电池仓容量", key: "", value: "" },
        { name: "PCS一体机数量", key: "", value: "" },
        { name: "单台PCS最大功率", key: "", value: "" },
        { name: "PCS类型", key: "", value: "" },
        { name: "电池模组成组方式", key: "", value: "" },
        { name: "电池簇成组方式", key: "", value: "" },
        { name: "电池堆成组方式", key: "", value: "" },
        { name: "电芯材料", key: "", value: "" },
        { name: "单电芯额定容量", key: "", value: "" },
        { name: "额定充放电倍率", key: "", value: "" },
        { name: "充放电转换效率", key: "", value: "" },
        { name: "消防介质", key: "", value: "" },
        { name: "项目名称", key: "", value: "" },
        { name: "项目地址", key: "", value: "" },
        { name: "产品类型", key: "", value: "" },
        { name: "BMS厂家", key: "", value: "" },
        { name: "PCS厂家", key: "", value: "" },
        { name: "变压器厂家", key: "", value: "" },
        { name: "液冷系统厂家", key: "", value: "" },
        { name: "空调厂家", key: "", value: "" },
        { name: "PACK组装厂家", key: "", value: "" },
        { name: "电芯厂家", key: "", value: "" },
        { name: "电池仓箱体厂家", key: "", value: "" },
        { name: "消防厂家", key: "", value: "" },
        { name: "EMS厂家", key: "", value: "" },
    ];

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
        window.markers = [];
        plants.forEach((item, index) => {
            const marker = new AMap.Marker({
                position: new AMap.LngLat(...item.position),
                icon: new AMap.Icon({
                    image: require("../../../../assets/images/mapPoint.png"),
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
                            <span class=${styles.plantName}>${item.plantName}</span>
                        </div>
                    `,
                },
            });
            window.markers[index] = marker;

            window.close = () => {
                window.markers?.forEach(item => item.setLabel(null));
            };
            window.getInfo = () => {
                return window.info
                    ?.slice(0, 13)
                    ?.map(
                        item => `<div class=${styles.item}>
                           <div class=${styles.name}>${item.name}</div>
                           <div class=${styles.value} title=${item.value}>
                           ${item.value}</div>
                        </div>`
                    )
                    ?.join("");
            };
            marker.on("click", e => {
                window.close();
                marker.setLabel({
                    direction: "top",
                    content: `
                      <div class=${styles.detail}>
                        <div class=${styles.header}>
                            项目信息
                            <span class=${styles.close} onclick="window.close()">X</span>
                        </div>
                        <div class=${styles.infoContent}>
                            <div>${window.getInfo()}</div>
                            <div>${window.getInfo()}</div>
                        </div>
                      </div>
                    `,
                });
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
