import SchematicDiagram from "./SchematicDiagram";
import plant from "../../../../../public/icons/plant.svg";

const Index = () => {
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
            <div style={{
                position:'absolute',
                top:'10px',
                left:'10px'
            }}>
                1212
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
