import { useEffect, useState } from "react";
import { Select, Button } from "antd";
import defaultPlantPic from "@/assets/imges/defaultPlantPic.jpg";
import styles from "./index.less";

const baseUrl = process.env.API_URL_1;

const Index = ({ plants, activePlant, setActivePlant }) => {
    const [map, setMap] = useState();
    const defaultZoom = 5;
    const [center, setCenter] = useState([108.9, 34.2]);

    const reset = () => {
        map.setZoom(defaultZoom);
        map.setCenter(center);
    };

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
        
        // 首先，确保地图已经加载
map.on('complete', function() {
    // 假设我们有一个标记数组
    var markers = [
        { position: [116.397428, 39.90923], infoContent: '信息窗口1' },
        { position: [116.40, 39.91], infoContent: '信息窗口2' },
        // 更多标记...
    ];
 
    // 遍历标记数组，为每个标记添加 infoWindow
    markers.forEach(function(marker) {
        var infoWindow = new AMap.InfoWindow({
            content: marker.infoContent
        });
 
        // 创建标记
        var marker = new AMap.Marker({
            map: map,
            position: new AMap.LngLat(...item.position),
        });
 
        // 打开 infoWindow
        infoWindow.open(map, marker.getPosition());
    });
});
    };

    const onSelectPlant = value => {
        setActivePlant(value);
        if (!value) {
            return reset();
        }
        const moveTo = plants?.find(item => item.value == value)?.position;
        if (!map || !plants) return;
        map.panTo(moveTo);
        map.setZoom(20);
        map.setCenter(moveTo);
    };

    return (
        <div
            id="map"
            style={{
                width: "100%",
                height: "100%",
            }}
        ></div>
    );
};

export default Index;
