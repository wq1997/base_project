import { useIntl } from "umi";
import { useEffect, useState } from "react";
import styles from "./index.less";

const Index = ({ plants, showInfo, panTo }) => {
    const intl = useIntl();
    const [map, setMap] = useState();
    const [infoWindow, setInfoWindow] = useState();
    const defaultZoom = 5;
    const defaultCenter = [108.9, 34.2];

    window.info = [
        { name: "电站名称", key: "name", value: "" },
        { name: "建站日期", key: "installDate", value: "" },
        { name: "设备总数", key: "dtuSize", value: "" },
        { name: "时区", key: "timeZone", value: "" },
        { name: "货币", key: "priceUnit", value: "" },
        { name: "电站位置", key: "position", value: "" }
    ];

    useEffect(() => {
        const _map =
            map ||
            new AMap.Map("map", {
                mapStyle: "amap://styles/darkblue",   //darkblue  blue  grey
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
                map.setZoom(defaultZoom);
                map.panTo(panTo);
            } else {
                map.setZoom(defaultZoom);
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
                position: new AMap.LngLat(item?.longitude, item?.latitude),
                icon: new AMap.Icon({
                    image: require("../../../../../public/images/mapPoint.png"),
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
                           <div class=${styles.name}>${intl.formatMessage({id: item.name})}</div>
                           <div class=${styles.value} title=${plant[item.key]}>${plant[item.key] || ""}</div>
                        </div>`
                    )
                    ?.join("");
            };
            marker.content = `
                   <div class=${styles.detail}>
                        <div class=${styles.header}>
                            ${intl.formatMessage({id: '电站信息'})}
                            <span class=${styles.close} onclick="window.close()">X</span>
                        </div>
                        <div class=${styles.infoContent}>
                            <div>${window.getInfo(window.info, item)}</div>
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
                backgroundColor: "white",
            }}
        ></div>
    );
};

export default Index;