import Circle from "../../plantAnalysisScreen/components/Business/Circle";
import Card from "../../components/Card";
const DeviceStatus = ({ data }) => {
    return (
        <Card
            title={"设备状态"}
            content={
                <div style={{ height: "100%", padding: "16px", boxSizing: "border-box" }}>
                    <Circle dataSource={data} />
                </div>
            }
        />
    );
};

export default DeviceStatus;
