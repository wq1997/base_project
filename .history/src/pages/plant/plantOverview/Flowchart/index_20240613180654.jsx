import SchematicDiagram from "./SchematicDiagram";
import plant from "../../../../../public/icons/plant.svg";
import { useEffect, useState } from "react";

const Index = ({ data }) => {
    const [info, setInfo] = useState([
        {
            name: "设备总数",
            key: "deviceCount",
            value: "",
            unit: "台",
        },
        {
            name: "组串总容量",
            key: "totalCapacity",
            value: "",
            unit: "kWp",
        },
    ]);

    useEffect(() => {
        const _info = info?.map(item => ({
            ...item,
            value: data?.[item.key],
        }));
        setInfo(_info);
    }, [data]);

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                position: "relative",
                background: "#F5F9FE",
                padding: "10px",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                }}
            >
                {info?.map(item => (
                    <div style={{ marginBottom: "5px", fontSize: "12px" }}>
                        <span>
                            <span style={{ color: "#999", marginRight: "5px" }}>{item.name}：</span>
                          
                        </span>
                        <span>{item.value}</span>
                        <span>{item.unit}</span>
                    </div>
                ))}
            </div>
            <div
                style={{
                    width: "100%",
                    height: "100%",
                }}
            >
                <SchematicDiagram dataSource={{ totalActivePower: 1, power: -1, loadPower: 1 }} />
            </div>
        </div>
    );
};

export default Index;
