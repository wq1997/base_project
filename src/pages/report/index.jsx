import { Tabs } from "antd";
import { Outlet } from "umi";
import PlantReport from "./PlantReport";
import DeviceReport from "./DeviceReport";

const Index = () => {
    const items = [
        {
            key: "PlantReport",
            label: "电站报表",
            children: <PlantReport />,
        },
        {
            key: "DeviceReport",
            label: "设备报表",
            children: <DeviceReport />,
        },
    ];

    return (
        <div>
            <Tabs items={items} />
            <Outlet />
        </div>
    );
};

export default Index;

