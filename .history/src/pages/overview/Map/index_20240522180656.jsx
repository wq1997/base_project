import { useEffect, useState } from "react";
import { Select, Space } from "antd";

 
const getPlants =()=>{

}

const Index = () => {
    const [map, setMap] = useState();
    const [plants, setPlants] = useState();
    const [status, setStatus] = useState();
    const [center, setCenter] = useState();
    const defaultCenter = [109.7952138325958, 32.483775030606736];
    useEffect(() => {
        const map = new AMap.Map("map", {
            zoom: 5,
            center: defaultCenter,
        });
        map.on("complete", async ()=> {
            setMap(map);
            const res = await getPlants()
            addMarkers(map);
        });
    }, []);

    useEffect(() => {
        const _plants = data?.filter(item => {
            if (status === undefined) return item;
            return item.status === status;
        });
        setPlants(_plants);
        if (map) {
            addMarkers(map);
        }
    }, [status]);

    const addMarkers = map => {
        map.clearMap();
        plants.forEach(item => {
            const marker = new AMap.Marker({
                position: new AMap.LngLat(...item.coordinate),
            });
            map.add(marker);
        });
    };

    const onSelectStatus = value => {
        setStatus(value);
        //addMarkers(map, value);
    };

    const onClearStatus = () => {
        setStatus();
        // addMarkers(map);
    };

    const onSelectPlant = value => {
        const moveTo = JSON.parse(value);
        map.panTo(moveTo);
        map.setZoom(17);
        setCenter(moveTo);
    };

    const onClearPlant = () => {
        map.setZoom(5);
        map.setCenter(defaultCenter);
        setCenter();
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
                    width: "100%",
                    height: "50px",
                    display: "flex",
                    background:
                        "linear-gradient(to right, transparent 0%, #FFF 50%, transparent 100%)",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    zIndex: 999,
                }}
            >
                <Select
                    placeholder="请选择状态"
                    style={{ marginRight: "5px", background: "#fff" }}
                    allowClear={true}
                    value={status}
                    onSelect={onSelectStatus}
                    onClear={onClearStatus}
                    options={[
                        { label: "正常", value: 1 },
                        { label: "告警", value: 0 },
                    ]}
                />
                <Select
                    placeholder="请选择电站"
                    allowClear={true}
                    value={JSON.stringify(center)}
                    onSelect={onSelectPlant}
                    onClear={onClearPlant}
                    options={plants?.map(item => ({
                        label: item.name,
                        value: JSON.stringify(item.coordinate),
                    }))}
                />
            </div>
            <div
                id="map"
                style={{
                    width: "100%",
                    height: "calc(100% - 50px)",
                }}
            ></div>
        </div>
    );
};

export default Index;
