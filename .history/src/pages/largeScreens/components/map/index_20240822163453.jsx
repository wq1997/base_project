import { useEffect, useState } from "react";
import { Select, Tooltip, message } from "antd";
import {
    getPlantAccessInfo as getPlantAccessInfoServer,
    jumpLogin as jumpLoginServer,
} from "@/services/largeScreen";
import styles from "./index.less";
import classNames from "classnames";
import positionPic from "../../../../assets/images/定位.png";
import positionPic1 from "../../../../assets/images/定位1.png";
import positionPic2 from "../../../../assets/images/定位2.png";

const baseUrl = process.env.API_URL_1;

const Index = ({ zoomCenter, center, zoom, plants, panTo }) => {
    const markers = [];
    const [map, setMap] = useState();
    const [cluster, setCluster] = useState();
    const [infoWindow, setInfoWindow] = useState();
    const [defaultZoom, setDefaultZoom] = useState(zoom || 6);
    const defaultCenter = center || [120.678256, 31.314382];
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
                zoom: zoomCenter.zoom,
                center: zoomCenter.center,
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
            map.setZoom(zoomCenter.zoom);
            map.setCenter(zoomCenter.center);
        }
    }, [zoomCenter]);

    useEffect(() => {
        if (map) {
            if (panTo) {
                map.setZoom(15);
                map.panTo(panTo);
            } else {
                map.setZoom(zoom);
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
        window.close = () => {
            _infoWindow.close();
        };
        window.getInfo = (arr, plant) => {
            return arr
                ?.map(
                    item => `
                        <div class=${styles.item}>
                           <div class=${styles.name}>${item.name}</div>
                           <div class=${styles.value} title=${plant[item.key]}>${plant[item.key] || ""}</div>
                        </div>
                       `
                )
                ?.join("");
        };
        window.markerClick = plantId => {
            const plant = plants?.find(item => item.id == plantId);
            if (plant.haveCloud) {
                getPlantAccessInfo(plantId);
            } else {
                const detailContent = `
                    <div class=${styles.detail}>
                        <div class=${styles.header}>
                            项目信息
                            <span class=${styles.close} onclick="window.close()">X</span>
                        </div>
                        <div class=${styles.infoContent}>
                            <div>${window.getInfo(window.info?.slice(0, 13), plant)}</div>
                            <div>${window.getInfo(window.info?.slice(13, 26), plant)}</div>
                        </div>
                    </div>
                `;
                _infoWindow.setContent(detailContent);
                _infoWindow.open(map, [plant.longitude, plant.latitude]);
            }
        };
        map.plugin(["AMap.MarkerCluster"], function () {
            const _cluster = new AMap.MarkerCluster(
                map,
                plants?.map(item => ({
                    ...item,
                    weight: item?.capacity2,
                    lnglat: [item.longitude, item.latitude],
                })),
                {
                    gridSize: 60, //数据聚合计算时网格的像素大小
                    renderClusterMarker: context => {
                        // 聚合中点个数
                        var count = plants?.length;
                        var clusterCount = context.count;
                        var div = document.createElement("div");
                        div.style.backgroundColor = "rgba(84, 209, 255,0.4)";
                        var size = Math.round(20 + Math.pow(clusterCount / count, 1 / 5) * 40);
                        div.style.width = div.style.height = size + "px";
                        div.style.borderRadius = size / 2 + "px";
                        div.innerHTML = context.count;
                        div.style.lineHeight = size + "px";
                        div.style.color = "#ffffff";
                        div.style.fontSize = "20px";
                        div.style.textAlign = "center";
                        div.style.fontFamily = "DingTalkJinBuTi";
                        context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2));
                        context.marker.setContent(div);
                        context.marker.on("click", e => {
                            let curZoom = map.getZoom();
                            if (curZoom < 20) {
                                curZoom += 4;
                            }
                            map.setZoomAndCenter(curZoom, e.lnglat);
                        });
                    },
                    renderMarker: context => {
                        const plant = context?.data?.[0];
                        const content = `
                            <div class=${styles.markerWrapper}  onclick='window.markerClick(${plant?.id})' >
                                <div class=${plant.haveCloud ? styles.cloudContent : styles.content} title=${plant.name}>
                                    <div class=${styles.row}></div>
                                    <span class=${styles.plantName} >${plant.name}</span>
                                </div>
                                <img class=${styles.positionPic} src=${plant?.haveCloud ? positionPic : positionPic}></img>
                            </div>
                        `;
                        var offset = new AMap.Pixel(-0, -0);
                        context.marker.setOffset(offset);
                        context.marker.setAnchor("bottom-center");
                        context.marker.setContent(content);
                    },
                    // clusterIndexSet: {
                    //     province: {
                    //         minZoom: 2,
                    //         maxZoom: 15,
                    //     },
                    // },
                    //
                }
            );
            setCluster(_cluster);
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
