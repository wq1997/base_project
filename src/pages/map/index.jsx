import { Select } from "antd";
import { useDebounceFn } from 'ahooks';
import axiosInstance from "@/services/mapRequest";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "umi";
import styles from "./index.less";

const Map = ({
    value,
    defaultData,
    onMyChange
}) => {
    const defaultZoom = 15;
    const [currentInfo, setCurrentInfo] = useState();
    const [infoWindow, setInfoWindow] = useState();
    const [options, setOptions] = useState([]);
    const { theme, locale } = useSelector(state => state.global);
    const { run: onSearch } = useDebounceFn(
        async (value) => {
            const res = await axiosInstance.get(`/map1/v3/place/text?keywords=${value}&key=bf11162859718840e482a1f46044a3de`);
            if (res?.data?.info === "OK") {
                setOptions(res?.data?.pois?.map(item => {
                    return {
                        value: item?.name,
                        label: item?.name
                    }
                }))
            }
        },
        {
            wait: 1000,
        },
    );

    useEffect(() => {
        const locationList = currentInfo?.location?.split(',');
        const _map = new AMap.Map("map1", {
            viewMode: '2D',
            zoom: defaultZoom,
            center: locationList?[locationList?.[0],locationList?.[1]]:(defaultData?.longitude&&defaultData?.latitude?[defaultData?.longitude, defaultData?.latitude]: [108.9, 34.2]),
            lang: locale==="zh-CN"?"zh_cn":"en",
            mapStyle: theme === "default"?"amap://styles/normal":"amap://styles/blue"
        })
        _map.on("complete", async () => {
            const info = currentInfo?currentInfo:(defaultData?.longitude&&defaultData?.latitude?{location: `${defaultData?.longitude},${defaultData?.latitude}`, formatted_address: defaultData?.position}:null);
            if(info){
                addMarkers(_map, [info]);
            }
        });
    }, [currentInfo]);

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
            const locationList = item?.location?.split(',');
            const marker = new AMap.Marker({
                position: new AMap.LngLat(locationList?.[0], locationList?.[1]),
                icon: new AMap.Icon({
                    image: require("../../../public/images/mapPoint.png"),
                    imageSize: new AMap.Size(15, 20),
                }),
                map: map,
                label: item.formatted_address&&{
                    direction: "top",
                    content: `
                        <div class=${styles.content} title=${item.formatted_address}>
                            <div class=${styles.row}></div>
                            <span class=${styles.plantName}>${item.formatted_address}</span>
                        </div>
                    `,
                },
            });
        });
    };

    return (
        <div>
            <Select
                options={options}
                showSearch
                optionFilterProp="label"
                onChange={async (value) => {
                    const res = await axiosInstance.get(`/map1/v3/geocode/geo?address=${value}&key=bf11162859718840e482a1f46044a3de`);
                    if (res?.data?.info === "OK") {
                        const data = res?.data?.geocodes?.[0];
                        setCurrentInfo(data);
                        onMyChange&&onMyChange(data);
                    }
                }}
                onSearch={onSearch}
                defaultValue={value}
            />
            <div
                id="map1"
                style={{
                    width: "100%",
                    height: "100%",
                    minWidth: 250,
                    minHeight: 250
                }}
            />
        </div>
    )
}

export default Map;