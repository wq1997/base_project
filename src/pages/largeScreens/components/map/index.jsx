import { useEffect, useState } from "react";
import { Select, Tooltip, message } from "antd";
import {
    getPlantAccessInfo as getPlantAccessInfoServer,
    jumpLogin as jumpLoginServer,
} from "@/services/largeScreen";
import styles from "./index.less";

const baseUrl = process.env.API_URL_1;

const Index = ({ plants, needJump, showInfo, panTo }) => {
    const markers = [];
    const [map, setMap] = useState();
    const [infoWindow, setInfoWindow] = useState();
    const defaultZoom = 5;
    const defaultCenter = [108.9, 34.2];
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
            // map.plugin(["AMap.MarkerCluster"], function () {
            //     cluster = new AMap.MarkerCluster(
            //         map, //地图实例
            //         [
            //             { weight: 8, lnglat: ["116.506647", "39.795337"] },
            //             { weight: 1, lnglat: ["116.843352", "40.377362"] },
            //             { weight: 1, lnglat: ["116.637122", "40.324272"] },
            //             { weight: 1, lnglat: ["116.105381", "39.937183"] },
            //             { weight: 1, lnglat: ["116.653525", "40.128936"] },
            //             { weight: 1, lnglat: ["116.486409", "39.921489"] },
            //             { weight: 1, lnglat: ["116.658603", "39.902486"] },
            //             { weight: 1, lnglat: ["116.338033", "39.728908"] },
            //             { weight: 1, lnglat: ["116.235906", "40.218085"] },
            //             { weight: 1, lnglat: ["116.366794", "39.915309"] },
            //             { weight: 1, lnglat: ["116.418757", "39.917544"] },
            //             { weight: 1, lnglat: ["116.139157", "39.735535"] },
            //             { weight: 1, lnglat: ["116.195445", "39.914601"] },
            //             { weight: 1, lnglat: ["116.310316", "39.956074"] },
            //             { weight: 1, lnglat: ["116.286968", "39.863642"] },
            //         ],
            //         {
            //             gridSize: 60, //数据聚合计算时网格的像素大小
            //         }
            //     );
            // });
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
                        <div onclick='window.onclick(${index})' class=${styles.content} title=${item.name}>
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
            window.onclick = index => {
                if (showInfo) {
                    const target = markers[index];
                    _infoWindow.setContent(target.content);
                    _infoWindow.open(map, target.getPosition());
                }
            };
            marker.on("click", e => {
                // _infoWindow.setContent(e.target.content);
                // _infoWindow.open(map, e.target.getPosition());
                if (needJump) {
                    getPlantAccessInfo(item.plantId);
                }
                onclick(index);
            });
            markers[index] = marker;
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
