import { useEffect, useState } from "react";
import { Select, Space } from "antd";
import "./index.less";

const Index = ({ plants, activePosition, activePlant, setActivePlant }) => {
    const [map, setMap] = useState();
    const [center, setCenter] = useState();
    const defaultZoom = 5;
    const defaultCenter = [109.7952138325958, 32.483775030606736];

    const reset = () => {
        map.setZoom(defaultZoom);
        map.setCenter(defaultCenter);
    };

    useEffect(() => {
        const map = new AMap.Map("map", {
            zoom: defaultZoom,
            center: defaultCenter,
        });
        map.on("complete", async () => {
            setMap(map);
            addMarkers(map, plants);
        });
    }, [plants]);

    //实例化信息窗体
    var title = '方恒假日酒店<span style="font-size:11px;color:#F00;">价格:318</span>',
        content = [];
    content.push(
        "<img src='http://tpc.googlesyndication.com/simgad/5843493769827749134'>地址：北京市朝阳区阜通东大街6号院3号楼东北8.3公里"
    );
    content.push("电话：010-64733333");
    content.push("<a href='https://ditu.amap.com/detail/B000A8URXB?citycode=110105'>详细信息</a>");
    //关闭信息窗体
    function closeInfoWindow() {
        map.clearInfoWindow();
    }
    var infoWindow = new AMap.InfoWindow({
        isCustom: true, //使用自定义窗体
        content: createInfoWindow(title, content.join("<br/>")),
        offset: new AMap.Pixel(16, -45),
    });

    //构建自定义信息窗体
    function createInfoWindow(title, content) {
        var info = document.createElement("div");
        info.className = "custom-info input-card content-window-card";

        //可以通过下面的方式修改自定义窗体的宽高
        //info.style.width = "400px";
        // 定义顶部标题
        var top = document.createElement("div");
        var titleD = document.createElement("div");
        var closeX = document.createElement("img");
        top.className = "info-top";
        titleD.innerHTML = title;
        closeX.src = "https://webapi.amap.com/images/close2.gif";
        closeX.onclick = closeInfoWindow;

        top.appendChild(titleD);
        top.appendChild(closeX);
        info.appendChild(top);

        // 定义中部内容
        var middle = document.createElement("div");
        middle.className = "info-middle";
        middle.style.backgroundColor = "white";
        middle.innerHTML = content;
        info.appendChild(middle);

        // 定义底部内容
        var bottom = document.createElement("div");
        bottom.className = "info-bottom";
        bottom.style.position = "relative";
        bottom.style.top = "0px";
        bottom.style.margin = "0 auto";
        var sharp = document.createElement("img");
        sharp.src = "https://webapi.amap.com/images/sharp.png";
        bottom.appendChild(sharp);
        info.appendChild(bottom);
        return info;
    }

    const addMarkers = (map, plants) => {
        map.clearMap();
        console.log(plants);
        plants.forEach(item => {
            const marker = new AMap.Marker({
                position: item.position,
            });
            map.add(marker);
            AMap.event.addListener(marker, "click", function () {
                infoWindow.open(map, marker.getPosition());
            });
        });
    };

    const onSelectPlant = value => {
        setActivePlant(value);
        const moveTo = plants?.find(item => item.value == value)?.position;
        if (!map || !plants) return;
        map.panTo(moveTo);
        map.setZoom(17);
        setCenter(moveTo);
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
                    width: "200px",
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
                    style={{ width: "200px", marginRight: "5px" }}
                    allowClear={false}
                    value={activePlant}
                    onSelect={onSelectPlant}
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
