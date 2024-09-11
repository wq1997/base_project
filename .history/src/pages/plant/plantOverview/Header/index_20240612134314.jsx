import { useEffect, useState } from "react";
import { Select, Space } from "antd";

const Index = () => {
    const [map, setMap] = useState();

    const [center, setCenter] = useState();
    const defaultZoom = 5;
    const defaultCenter = [109.7952138325958, 32.483775030606736];

    const reset = () => {
        map.setZoom(defaultZoom);
        map.setCenter(defaultCenter);
    };

    const onSelectPlant = value => {
        const moveTo = JSON.parse(value);
        map.panTo(moveTo);
        map.setZoom(17);
        setCenter(moveTo);
    };

    const onClearPlant = () => {
        reset();
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
                  
                }}
            >
                
                <Select
                    placeholder="请选择电站"
                    style={{ width: "200px", marginRight: "5px" }}
                    allowClear={true}
                    value={JSON.stringify(center)}
                    onSelect={onSelectPlant}
                    onClear={onClearPlant}
                    options={[
                        {
                            name: "合肥电站",
                            coordinate: [117.2659169575958, 31.888710306931912],
                            status: 1,
                        },
                        {
                            name: "上海电站",
                            coordinate: [121.17628802273558, 31.439924709258538],
                            status: 0,
                        },
                        {
                            name: "北京电站",
                            coordinate: [116.3870107075958, 39.852369913634426],
                            status: 0,
                        },
                        {
                            name: "西安电站",
                            coordinate: [109.0481435200958, 34.28168921284642],
                            status: 1,
                        },
                    ]}
                />
            </div>
        </div>
    );
};

export default Index;
