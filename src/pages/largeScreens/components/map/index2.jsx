import { useEffect, useState } from "react";
import { Select, Tooltip, message } from "antd";
import {
    getPlantAccessInfo as getPlantAccessInfoServer,
    jumpLogin as jumpLoginServer,
} from "@/services/largeScreen";
import styles from "./index.less";
import classNames from "classnames";

const baseUrl = process.env.API_URL_1;

const Index = ({ plants, panTo }) => {
    const markers = [];
    const [map, setMap] = useState();
    const [cluster, setCluster] = useState();
    const [infoWindow, setInfoWindow] = useState();
    const defaultZoom = 9;
    const defaultCenter = [120.678256, 31.314382];
    window.info = [
        { name: "电池仓数量", key: "batteryNum", value: "" },
        { name: "单台电池仓容量", key: "batteryCapacity", value: "" },
        { name: "PCS一体机数量", key: "pcsNum", value: "" },
        { name: "单台PCS最大功率", key: "pcsPower", value: "" },
        { name: "PCS类型", key: "pcsType", value: "" },
        { name: "电池模组成组方式", key: "batteryModule", value: "" },
        { name: "电池簇成组方式", key: "batteryCluster", value: "" },
        { name: "电池堆成组方式", key: "batteryStack", value: "" },
        { name: "电芯材料", key: "cellMaterial", value: "" },
        { name: "单电芯额定容量", key: "cellCapacity", value: "" },
        { name: "额定充放电倍率", key: "chargeDischargeRate", value: "" },
        { name: "充放电转换效率", key: "chargeDischargeConversion", value: "" },
        { name: "消防介质", key: "fireProtectionMedium", value: "" },
        { name: "项目名称", key: "name", value: "" },
        { name: "项目地址", key: "address", value: "" },
        { name: "产品类型", key: "productType", value: "" },
        { name: "BMS厂家", key: "bmsFactory", value: "" },
        { name: "PCS厂家", key: "pcsFactory", value: "" },
        { name: "变压器厂家", key: "transformerFactory", value: "" },
        { name: "液冷系统厂家", key: "liquidCoolingFactory", value: "" },
        { name: "空调厂家", key: "acFactory", value: "" },
        { name: "PACK组装厂家", key: "packAssembleFactory", value: "" },
        { name: "电芯厂家", key: "cellFactory", value: "" },
        { name: "电池仓箱体厂家", key: "batteryBoxFactory", value: "" },
        { name: "消防厂家", key: "firefightingFactory", value: "" },
        { name: "EMS厂家", key: "emsFactory", value: "" },
    ];

    const getPlantAccessInfo = async plantId => {
        let res = await getPlantAccessInfoServer(plantId);
        if (res?.data?.status == "SUCCESS") {
            const jumpRes = await jumpLoginServer(res?.data?.data);
            if (jumpRes?.data?.data?.token) {
                window.open(
                    `https://www.sermatec-cloud.com/containerIndex?token=${jumpRes?.data?.data?.token}`,
                    "_blank"
                );
            } else {
                message.info("token失效，暂不可跳转");
            }
        } else {
            message.info("获取电站信息出错，暂不可跳转");
        }
    };

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
        cluster && cluster.setMap(null);
        map.clearMap();
        plants?.forEach((item, index) => {
            const marker = new AMap.Marker({
                position: new AMap.LngLat(item.longitude, item.latitude),
                icon: new AMap.Icon({
                    image: require(`../../../../assets/images/定位${item.haveCloud ? 1 : ""}.png`),
                    imageSize: new AMap.Size(20, 20),
                }),
                map: map,
                label: {
                    direction: "top",
                    content: `
                        <div onclick='window.openInfoWindow(${markers[index]?.marker})' class=${item.haveCloud ? styles.cloudContent : styles.content} title=${item.name}>
                            <div class=${styles.row}></div>
                            <span class=${styles.plantName} >${item.name}</span>
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
            window.openInfoWindow = target => {
                _infoWindow.setContent(target.content);
                _infoWindow.open(map, target.getPosition());
            };
            marker.on("click", e => {
                if (item.haveCloud) {
                    getPlantAccessInfo(item.id);
                } else {
                    window.openInfoWindow(e.target);
                }
            });
            markers[index] = {
                marker,
                lnglat: [item.longitude, item.latitude],
            };
        });
        // map.plugin(["AMap.MarkerCluster"], function () {
        //     const _cluster =
        //         cluster ||
        //         new AMap.MarkerCluster(map, markers, {
        //             gridSize: 60, //数据聚合计算时网格的像素大小
        //         });
        //     if (!cluster) {
        //         setCluster(_cluster);
        //     }
        // });
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