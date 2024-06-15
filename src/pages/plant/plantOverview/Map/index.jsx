import { useEffect, useState } from "react";
import { Select, Button } from "antd";
import defalut from "@/assets/imges/default.jpg";

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
            // layers: [
            //     new AMap.TileLayer.Satellite(),
            //     new AMap.TileLayer.RoadNet(),
            // ],
        });
        map.on("complete", async () => {
            const infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(0, -30) });
            setMap(map);
            addMarkers(map, infoWindow, plants);
        });
    }, [plants]);

    const addMarkers = (map, infoWindow, plants) => {
        function markerClick(e) {
            infoWindow.setContent(e.target.content);
            infoWindow.open(map, e.target.getPosition());
        }
        map.clearMap();
        plants.forEach((item, index) => {
            const marker = new AMap.Marker({
                position: item.position,
                map: map,
            });
            marker.content = `
            <div>
                <div style="display:flex;align-items:center;margin-bottom:8px">
                    <div
                        style=" width: 0;
                        height: 0;
                        border-top: 8px solid transparent;
                        border-left: 10px solid #49A2F8;
                        border-bottom: 8px solid transparent;
                        margin-right:10px
                    "
                    ></div>
                    <span style="font-size:18px;color:#333">${item.label}</span>
                </div>
                <div
                    style=" 
                    width: 400px;
                    height:130px;
                    display: flex;
                    position:relative"
                >
                            <div
                style='padding: 4px 13px;
                    background: rgba(0,0,0,.4);
                    color: #fff;
                     border-radius:0 3px 3px 0 ;
                     position:absolute ;
                     font-size:11px;
                     display:${item?.photo?'none':'block'}
                     '
            >
                默认
            </div>
                    <img
                        style=" 
                     width: 200px;
                     height: 100%;
                     margin-right:15px;
                     border-radius:5px
                    "
                        src='${ item?.photo ? baseUrl + item?.photo : defalut}'
                        alt=""
                    />
                  
                    <div
                        style="
                      font-size: 12px;
                      display: flex;
                      flex-direction: column;
                      justify-content: space-between;"
                    >
                        <div>
                            <span style="color: #666">电站地址：</span>
                            <span style="color: #999"> ${item.address}</span>
                        </div>
                        <div>
                            <span style="color: #666">经度：</span>
                            <span style="color: #999"> ${item.longitude}</span>
                        </div>
                        <div>
                            <span style="color: #666">纬度：</span>
                            <span style="color: #999"> ${item.latitude}</span>
                        </div>
                        <div>
                            <span style="color: #666">电站类型：</span>
                            <span style="color: #999"> ${item.type}</span>
                        </div>
                        <div>
                            <span style="color: #666">并网时间：</span>
                            <span style="color: #999"> ${item.gridTime}</span>
                        </div>
                        <div>
                            <span style="color: #666">运行天数：</span>
                            <span style="color: #999"> ${item.runningTime}</span>
                        </div>
                    </div>
                </div>
            </div>
            `;
            marker.on("click", markerClick);
            // marker.emit("click", { target: marker });
        });
        ///map.setFitView();
    };

    const onSelectPlant = value => {
        setActivePlant(value);
        const moveTo = plants?.find(item => item.value == value)?.position;
        if (!map || !plants) return;
        map.panTo(moveTo);
        map.setZoom(20);
        map.setCenter(moveTo);
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
                    background: "linear-gradient(to right, #fff 0%,  transparent 100%)",
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
                    allowClear={false}
                    value={activePlant}
                    onSelect={onSelectPlant}
                    options={plants}
                />
                <Button type="default" onClick={reset} style={{ background: "transparent" }}>
                    总览
                </Button>
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
