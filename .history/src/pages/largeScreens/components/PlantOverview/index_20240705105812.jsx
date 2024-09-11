import { useEffect, useState } from "react";
import { Select, Tooltip } from "antd";
import styles from "./index.less";

const baseUrl = process.env.API_URL_1;

const Index = ({ plants, showInfo, panTo }) => {
     

    useEffect(() => {
        const _map =
            map ||
            new AMap.Map("map", {
                mapStyle: "amap://styles/blue",
                zoom: defaultZoom,
                center: defaultCenter,
            });
        if (!map) {
            setMap(_map);
        }
        _map.on("complete", async () => {});
    }, []);

    useEffect(() => {
        if (map) {
            addMarkers(map, plants);
        }
    }, [plants]);

    useEffect(() => {
        if (map) {
            if (panTo) {
                map.setZoom(18);
                map.panTo(panTo);
            } else {
                map.setZoom(5);
            }
        }
    }, [panTo]);

    const addMarkers = (map, plants) => {
        const _infoWindow =
            infoWindow ||
            new AMap.InfoWindow({
                isCustom: true,
                offset: new AMap.Pixel(0, -30),
            });
        if (!infoWindow) {
            setInfoWindow(_infoWindow);
        }
        map.clearMap();
        plants?.forEach((item, index) => {
            const marker = new AMap.Marker({
                position: new AMap.LngLat(item.longitude, item.latitude),
                icon: new AMap.Icon({
                    image: require("../../../../assets/images/mapPoint.png"),
                    imageSize: new AMap.Size(15, 20),
                }),
                map: map,
                label: {
                    direction: "top",
                    content: `
                        <div class=${styles.content} title=${item.name}>
                            <div class=${styles.row}></div>
                            <span class=${styles.plantName}>${item.name}</span>
                        </div>
                    `,
                },
            });
            window.close = () => {
                _infoWindow.close();
            };
            window.getInfo = (arr, plant) => {
                return arr
                    ?.map(
                        item => `<div class=${styles.item}>
                           <div class=${styles.name}>${item.name}</div>
                           <div class=${styles.value} title=${plant[item.key]}>${plant[item.key] || ""}</div>
                        </div>`
                    )
                    ?.join("");
            };
            marker.content = `
                   <div class=${styles.detail}>
                        <div class=${styles.header}>
                            项目信息
                            <span class=${styles.close} onclick="window.close()">X</span>
                        </div>
                        <div class=${styles.infoContent}>
                            <div>${window.getInfo(window.info?.slice(0, 13), item)}</div>
                            <div>${window.getInfo(window.info?.slice(13, 26), item)}</div>
                        </div>
                    </div>
            `;
            marker.on("click", e => {
                if (showInfo) {
                    _infoWindow.setContent(e.target.content);
                    _infoWindow.open(map, e.target.getPosition());
                }
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
