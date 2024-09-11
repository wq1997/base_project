import { useEffect, useState } from "react";
import { Select, theme as antdTheme } from "antd";
import { useSelector, history } from "umi";
import defalut from "@/assets/imges/default.jpg";
import styles from "./index.less";
import { useEmotionCss } from "@ant-design/use-emotion-css";
import classNames from "classnames";

const baseUrl = process.env.API_URL_1;
let mapObj = null;

const Index = ({ plants, mapPlants, activePlant, setActivePlant }) => {
    const { token } = antdTheme.useToken();
    const { theme } = useSelector(state => state.global);
    // const [mapObj, setMapObj] = useState(null);
    const defaultZoom = 5;
    const [center, setCenter] = useState([108.9, 34.2]);

    const reset = () => {
        map.setZoom(defaultZoom);
        map.setCenter(center);
    };

    const fontColor = useEmotionCss(() => {
        return {
            color: token.color9,
        };
    });

    const dataColor = useEmotionCss(() => {
        return {
            color: token.color10,
        };
    });

    history.listen((location, action) => {
        map = null;
    });

    useEffect(() => {
        console.log("mapPlants", mapPlants);
        //map = null
        const _map = new AMap.Map("map", {
            zoom: defaultZoom,
            center,
        });
        if (!mapObj) {
            mapObj = _map;
            // setMapObj(_map);
        }
        _map.on("complete", async () => {
            if (theme === "default") {
                _map.setMapStyle("amap://styles/white");
            } else {
                _map.setMapStyle("amap://styles/blue");
            }
            const infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(0, -30) });
            addMarkers(_map,infoWindow, mapPlants);
            positioning(_map, mapPlants?.[0]?.id);
        });
    }, [mapPlants, theme]);

    const addMarkers = (mmmp,infoWindow, mapPlants) => {
        mapPlants.forEach((item, index) => {
            console.log("=---mapObj", mmmp);
            const marker = new AMap.Marker({
                position: new AMap.LngLat(...item.position),
                icon: require("../../../../assets/imges/point.png"),
                // icon: new AMap.Icon({
                //     image: require("../../../../assets/imges/point.gif"),
                //     size: new AMap.Size(64, 64), // 图片大小
                //     imageSize: new AMap.Size(64, 64), // 根据所设置的大小拉伸或压缩图片
                // }),
                // offset: new AMap.Pixel(-32, -32),
                map: mapObj,
                //content: `<div class=${styles["custom-content-marker"]}><div class=${styles.item}></div></div>`,
            });
            marker.content = `
           <div class=${styles.infoWindow}>
                <div class=${styles.header}>
                    <div class=${styles.row}></div>
                    <span class=${styles.plantName}>${item.label}</span>
                </div>
                <div class=${styles.infoBox}>
                    <div class=${styles.defalutText} style='display:${item?.photo ? "none" : "block"}'>默认</div>
                    <img
                        class=${styles.plantImg}
                        src="${item?.photo ? baseUrl + item?.photo : defalut}"
                    />
                    <div class=${styles.info}>
                        <div>
                            <span class=${classNames(styles.name, fontColor)}>电站地址：</span>
                            <span class=${classNames(styles.value, dataColor)} title=${item.address}> ${item.address}</span>
                        </div>
                        <div>
                            <span class=${classNames(styles.name, fontColor)}>经度：</span>
                            <span class=${classNames(styles.value, dataColor)}> ${item.longitude}</span>
                        </div>
                        <div>
                            <span class=${classNames(styles.name, fontColor)}>纬度：</span>
                            <span class=${classNames(styles.value, dataColor)}> ${item.latitude}</span>
                        </div>
                        <div>
                            <span class=${classNames(styles.name, fontColor)}>电站类型：</span>
                            <span class=${classNames(styles.value, dataColor)}> ${item.type}</span>
                        </div>
                        <div>
                            <span class=${classNames(styles.name, fontColor)}>并网时间：</span>
                            <span class=${classNames(styles.value, dataColor)}> ${item.gridTime}</span>
                        </div>
                        <div>
                            <span class=${classNames(styles.name, fontColor)}>运行天数：</span>
                            <span class=${classNames(styles.value, dataColor)}> ${item.runningTime}</span>
                        </div>
                    </div>
                </div>
            </div>
            `;
            marker.on("click", e => {
                infoWindow.setContent(e.target.content);
                infoWindow.open(map, e.target.getPosition());
            });
            //marker.setAnimation('AMAP_ANIMATION_BOUNCE');
            // marker.emit("click", { target: marker });
        });
    };

    const positioning = (map, plantId) => {
        console.log(map, mapPlants);
        const moveTo = mapPlants?.find(item => item.value == plantId)?.position;
        if (!map || !mapPlants) return;
        map.panTo(moveTo);
        map.setZoom(15);
        map.setCenter(moveTo);
    };

    const onSelectPlant = value => {
        setActivePlant(value);
        if (!value) {
            return reset();
        }
        positioning(mapObj, value);
    };

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                position: "relative",
            }}
        >
            <div
                style={{
                    width: "250px",
                    height: "50px",
                    paddingLeft: "8px",
                    display: "flex",
                    // background: "linear-gradient(to right, #fff 0%,  transparent 100%)",
                    // background:
                    //     "linear-gradient(to right, transparent 0%, #FFF 50%, transparent 100%)",
                    //  justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    zIndex: 999,
                }}
            >
                <Select
                    placeholder="请选择电站"
                    style={{ width: "250px", marginRight: "5px" }}
                    allowClear={true}
                    value={activePlant}
                    onChange={onSelectPlant}
                    options={plants}
                />
            </div>
            <div
                id="map"
                style={{
                    width: "100%",
                    height: "100%",
                }}
            ></div>
        </div>
    );
};

export default Index;
