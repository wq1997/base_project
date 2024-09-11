import { Charts2_5D } from "@/components";
import Card from "../../Card";
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
                        colors={[
                            ['#29FFB4', '#32F600'],
                            ['#00F9FF', '#3962FF'],
                            ['#FCFF00', '#FFA300'],
                            ['#FF00FF', '#DA00FF'],
                        ]}
                        data={[
                            ['低级', 1],
                            ['中级', 2],
                            ['高级', 2],
                            ['严重', 2]
                        ]}
                    />
                </div>
            }
        />
    )
}

export default AlarmAnysis;