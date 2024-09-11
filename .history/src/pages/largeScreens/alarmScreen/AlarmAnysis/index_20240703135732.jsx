import { Charts2_5D } from "@/components";
import Card from "../../components/Card";
const AlarmAnysis = () => {
    return (
        <Card 
            title={'告警分析'}
            content={
                <div style={{ height: "100%", padding: "16px", boxSizing: "border-box" }}>
                    <Charts2_5D 
                        size={200}
                        depth={50}
                        alpha={50}
                        colors={["#34FFFD","#FFEF72","#4BE8FF","#E6A5FF"]}
                        data={[
                            ["低级", 1],
                            ["中级", 2],
                            ["高级", 2],
                            ["严重", 2],
                        ]}
                    />
                    <Charts2_5D
                                    depth={40}
                                    alpha={55}
                                    colors={["#34FFFD", "#E6A5FF", "#FFEF72", "#4BE8FF"]}
                                    data={[
                                        ["一般", dataSource?.signalName2Count?.["一般告警"] || 0],
                                        ["严重", dataSource?.signalName2Count?.["严重告警"] || 0],
                                    ]}
                                />
                </div>
            }
        />
    )
}

export default AlarmAnysis;