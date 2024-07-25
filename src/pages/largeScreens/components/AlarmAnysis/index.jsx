import { Charts2_5D } from "@/components";
import Card from "../../components/Card";
const AlarmAnysis = ({ data }) => {
    console.log(data)
    return (
        <Card
            title={"告警分析"}
            content={
                <div style={{ height: "100%", padding: "16px", boxSizing: "border-box" }}>
                    {data && (
                        <Charts2_5D
                            size={200}
                            depth={50}
                            alpha={65}
                            colors={["#1bbfb8","#ccc40e", "#d96b35"]}
                            data={data}
                            // data={
                            //     [
                            //         ['一般', data?.[0]?.[1]+10],
                            //         ['中度', 40],
                            //         ['严重', data?.[1]?.[1]-40]
                            //     ]
                            // }
                        />
                    )}
                </div>
            }
        />
    );
};

export default AlarmAnysis;
