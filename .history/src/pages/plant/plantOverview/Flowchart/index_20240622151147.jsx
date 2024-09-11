import SchematicDiagram from "./SchematicDiagram";
import plant from "../../../../../public/icons/plant.svg";
import { useEffect, useState } from "react";
import { Tooltip } from "antd";
import styles from "./index.less";

const Index = ({ activePlantName, data }) => {
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
        },{
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
            {/* <div
                style={{
                    width: "100%",
                    fontSize: "18px",
                    display: "flex",
                    alignItems: "center",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                }}
            >
                <img src={plant} style={{ marginRight: "3px", width: "18px", height: "18px" }} />
                <Tooltip title={activePlantName}>
                    <div
                        className={styles.plantName}
                        style={{
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {activePlantName}
                    </div>
                </Tooltip>
            </div> */}
            <div
                style={{
                    position: "absolute",
                    top: "50px",
                    left: "10px",
                }}
            >
                {info?.map(item => (
                    <div style={{ marginBottom: "5px", fontSize: "14px" }}>
                        <span style={{ color: "#999" }}>{item.name}：</span>
                        <span style={{ marginRight: "3px" }}>{item.value}</span>
                        <span style={{ color: "#999" }}>{item.unit}</span>
                    </div>
                ))}
            </div>
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: "68%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            >
                <SchematicDiagram dataSource={{ totalActivePower: 1, power: -1, loadPower: 1 }} />
            </div>
        </div>
    );
};

export default Index;
