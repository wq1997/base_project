import SchematicDiagram from "./SchematicDiagram";
import plant from "../../../../../public/icons/plant.svg";
import { useState } from "react";

const Index = () => {
    const [info, setInfo] = useState([
        {
            name: "设备总数",
            key: "",
            value: "",
        },
        {
            name: "组串总容量",
            key: "",
            value: "",
        },
    ]);

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
                    <div style={{ marginBottom: "5px" }}>
                        <div style={{color:''}}>{item.name}</div>
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
