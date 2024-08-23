import { useIntl, useSelector } from "umi";
import { useEffect, useState } from "react";
import styles from "./index.less";
import classNames from "classnames";
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { theme as antdTheme } from "antd";

const Index = ({ plants, showInfo, panTo }) => {
    const intl = useIntl();
    const { token } = antdTheme.useToken();
    const [infoWindow, setInfoWindow] = useState();
    const defaultZoom = 5;
    const { theme, locale } = useSelector(state => state.global);

    const detailCard = useEmotionCss(() => {
        return {
            width: '350px',
            borderRadius: '16px',
            padding: '20px 30px',
            boxSizing: 'border-box',
            background: token.color4,
            ".header": {
                color: '#54cfff',
                fontSize: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingLeft: '10px',
                boxSizing: 'border-box',
                marginBottom: '10px',
                '&::before': {
                    content: '""',
                    width: '4px',
                    height: '14px',
                    background: '#54cfff',
                    borderRadius: '2px',
                    position: 'absolute',
                    left: '30px'
                },
                ".close": {
                    cursor: 'pointer'
                }
            },
            ".item": {
                padding: "5px 0",
                display: "flex",
                ".name": {
                    width: "160px",
                    color: token.color5,
                },
                ".value": {
                    flex: 1,
                    textAlign: "left",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    color: token.color6,
                    width: "130px"
                }
            }
        }
    })

    window.info = [
        { name: "电站名称", key: "name", value: "" },
        { name: "建站日期", key: "installDate", value: "" },
        { name: "设备总数", key: "dtuSize", value: "" },
        { name: "时区", key: "timeZone", value: "" },
        { name: "货币", key: "priceUnit", value: "" },
        { name: "电站位置", key: "position", value: "" }
    ];

    useEffect(() => {
        const _map = new AMap.Map("map", {
            viewMode: '2D',
            zoom: defaultZoom,
            center: panTo,
            lang: locale==="zh-CN"?"zh_cn":"en",
            mapStyle: theme === "default"?"amap://styles/normal":"amap://styles/blue"
        })
        _map.on("complete", async () => {
            addMarkers(_map, plants);
            // setMap(_map);
        });
    }, [JSON.stringify(plants||{}), theme, locale, panTo]);

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
                        item => `<div class="item">
                           <div class="name">${intl.formatMessage({ id: item.name })}</div>
                           <div class="value" title=${plant[item.key]}>${plant[item.key] || ""}</div>
                        </div>`
                    )
                    ?.join("");
            };
            marker.content = `
                   <div class=${detailCard}>
                        <div class="header">
                            ${intl.formatMessage({ id: '电站信息' })}
                            <span class="close" onclick="window.close()">X</span>
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