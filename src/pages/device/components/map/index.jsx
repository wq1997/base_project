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
            width: '18.2292rem',
            borderRadius: '0.833rem',
            padding: '1.0147rem 1.5625rem',
            boxSizing: 'border-box',
            background: token.titleCardBgc_2,
            ".header": {
                color: token.iconColor,
                fontSize: '0.8333rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingLeft: '0.5208rem',
                boxSizing: 'border-box',
                marginBottom: '.5208rem',
                '&::before': {
                    content: '""',
                    width: '0.2083rem',
                    height: '0.7292rem',
                    background: '#54cfff',
                    borderRadius: '0.1042rem',
                    position: 'absolute',
                    left: '1.5625rem'
                },
                ".close": {
                    cursor: 'pointer'
                }
            },
            ".item": {
                padding: "0.2604rem 0",
                display: "flex",
                fontSize: '0.8333rem',

                ".name": {
                    width: "8.3333rem",
                    color: token.colorPrimary,

                },
                ".value": {
                    flex: 1,
                    textAlign: "left",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    color: token.color6,
                    width: "6.7708rem"
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
            mapStyle: theme === "default"?"amap://styles/normal":"amap://styles/darkblue"
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