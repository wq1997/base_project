import Circle from "../../../plantAnalysisScreen/components/Business/circle";
import Card from "../../Card";
const DeviceStatus = () => {
    return (
        <Card 
            title={'设备状态'}
            content={
                <div style={{ height: "100%", padding: "16px", boxSizing: "border-box" }}>
                    <Circle />
                </div>
            }
        />
    )
}

export default DeviceStatus;