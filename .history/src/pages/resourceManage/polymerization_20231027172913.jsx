import { Title, StatisticalCard } from "@/components";
import styles from "./index.less";
import { useState } from "react";
import Topology from "./topology";

const Polymerization = props => {
    const [dataInfo, setDataInfo] = useState([
        {
            label: "聚合子用户",
            value: 4,
            unit: "个",
        },
        {
            label: "聚合储能",
            value: 30923,
            unit: "kWh",
        },
        {
            label: "聚合风光",
            value: 2040,
            unit: "kW",
        },
        {
            label: "聚合充电桩",
            value: 19023,
            unit: "kW",
        },
        {
            label: "聚合其他可调负荷",
            value: 29476,
            unit: "kW",
        },
    ]);

    const [topologyData, setTopologyData] = useState({
        id: "root",
        label: "采日VPP聚合商",
        subLabel1: "子用户",
        subValue1: "4",
        subLabel2: "调度资源数",
        subValue2: "89",
        ratio: 3,
        children: [
            {
                id: "child-a",
                label: "江苏海四达动力科技有限公司",
                subLabel1: "合同容量(kVA)",
                subValue1: "7500",
                subLabel2: "储能系统",
                subValue2: "5MW/10MWh",
            },
            {
                id: "child-b",
                label: "江苏海四达新能源有限公司",
                subLabel1: "合同容量(kVA)",
                subValue1: "18050",
                subLabel2: "储能系统",
                subValue2: "5MW/10WMh",
            },
            {
                id: "child-c",
                label: "连云港华乐不锈钢有限公司",
                subLabel1: "合同容量(kVA)",
                subValue1: "137000",
                subLabel2: "储能系统",
                subValue2: "30MW/10WMh",
            },
            {
                id: "child-d",
                label: "苏州京浜光电科技有限公司",
                subLabel1: "合同容量(kVA)",
                subValue1: "4950",
                subLabel2: "储能系统",
                subValue2: "2.5MW/5WMh",
            },
        ],
    });

    return (
        <div>
            <Title.PageTitle title={"资源聚合管理"} style={{ marginTop: 0 }} />
            <div className={styles.dataInfo}>
                <StatisticalCard title="资源概览" dataSource={dataInfo} />
            </div>
            <div className={styles.topology}>
                <Topology data={topologyData} />
            </div>
        </div>
    );
};

export default Polymerization;
