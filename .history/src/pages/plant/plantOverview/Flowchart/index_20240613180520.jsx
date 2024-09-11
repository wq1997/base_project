import SchematicDiagram from "./SchematicDiagram";
import plant from "../../../../../public/icons/plant.svg";
import { useEffect, useState } from "react";

const Index = ({ data }) => {
    const [info, setInfo] = useState([
        {
            name: "设备总数",
            key: "",
            value: "",
            unit: "台",
        },
        {
            name: "组串总容量",
            key: "",
            value: "",
            unit: "kWp",
        },
    ]);

    useEffect(() => {
        const _info = info?.map(item => ({
            ...item,
            value: data?.[item.key],
        }));
        setList(_info);
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
                        <div style={{ color: "#999" }}>{item.name}：</div>
                        <div>{item.value}</div>
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
