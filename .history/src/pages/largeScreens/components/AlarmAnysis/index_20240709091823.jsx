import { Charts2_5D } from "@/components";
import Card from "../../components/Card";
const AlarmAnysis = ({ data }) => {
    return (
        <Card
            title={"告警分析"}
            content={
                <div style={{ height: "100%", padding: "16px", boxSizing: "border-box" }}>
                    {data && (
                        <Charts2_5D
                            size={200}
                            depth={50}
                            alpha={50}
                            colors={["#1FDBFF", "#FFF073"]}
                            data={data}
                        />
                    )}
                </div>
            }
        />
    );
};

export default AlarmAnysis;
