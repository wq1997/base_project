import { Title } from "@/components";
import styles from "./index.less";
import { useState } from "react";
import Topology from "./topology";
import { theme } from "antd";

const Polymerization = (props) => {
    const { token } = theme.useToken();
    const [dataInfo, setDataInfo] = useState([
        {
            label: '聚合虚拟电厂',
            value: 10,
            unit: '个'
        },
        {
            label: '聚合场站',
            value: 13,
            unit: '个'
        },
        {
            label: '聚合储能',
            value: 30923,
            unit: 'kWh'
        },
        {
            label: '聚合风光',
            value: 2040,
            unit: 'kW'
        },
        {
            label: '聚合充电桩',
            value: 19023,
            unit: 'kW'
        },
        {
            label: '聚合其他可调负荷',
            value: 29476,
            unit: 'kW'
        }
    ])

    const [topologyData, setTopologyData] = useState({
        id: 'root',
        label: '采日VPP',
        subLabel1: '虚拟电厂数量',
        subValue1: '3',
        subLabel2: '调度资源数',
        subValue2: '89',
        ratio: 3,
        children: [
          {
            id: 'child-a',
            label: '嘉定园区',
            subLabel1: '最大响应能力(kW)',
            subValue1: '20099',
            subLabel2: '最小响应能力(kW)',
            subValue2: '1',
            children: [
                {
                    id: 'child-a-a',
                    label: '储能A1',
                    subLabel1: '额定功率(kW)',
                    subValue1: '800',
                    subLabel2: '额定容量(MWh)',
                    subValue2: '1680',
                }, 
                {
                    id: 'child-a-b',
                    label: '光伏A1',
                    subLabel1: '额定功率(kW)',
                    subValue1: '110',
                    subLabel2: '额定容量(MWh)',
                    subValue2: '160',
                }
            ]
          }, 
          {
            id: 'child-b',
            label: '长宁园区',
            subLabel1: '最大响应能力(kW)',
            subValue1: '2099',
            subLabel2: '最小响应能力(kW)',
            subValue2: '1',
          }, 
          {
            id: 'child-c',
            label: '徐汇园区',
            subLabel1: '最大响应能力(kW)',
            subValue1: '109009',
            subLabel2: '最小响应能力(kW)',
            subValue2: '5',
          },
          {
            id: 'child-d',
            label: '黄埔园区',
            subLabel1: '最大响应能力(kW)',
            subValue1: '109009',
            subLabel2: '最小响应能力(kW)',
            subValue2: '5',
            children: [
                {
                    id: 'child-d-a',
                    label: '储能A1',
                    subLabel1: '额定功率(kW)',
                    subValue1: '800',
                    subLabel2: '额定容量(MWh)',
                    subValue2: '1680',
                }, 
                {
                    id: 'child-d-b',
                    label: '光伏A1',
                    subLabel1: '额定功率(kW)',
                    subValue1: '110',
                    subLabel2: '额定容量(MWh)',
                    subValue2: '160',
                },
                {
                    id: 'child-d-c',
                    label: '充电桩A1',
                    subLabel1: '额定功率(kW)',
                    subValue1: '11000',
                    subLabel2: '额定容量(MWh)',
                    subValue2: '1600',
                }
            ]
          },
          {
            id: 'child-e',
            label: '虹口园区',
            subLabel1: '最大响应能力(kW)',
            subValue1: '109009',
            subLabel2: '最小响应能力(kW)',
            subValue2: '5',
          }
        ]
      });

    return (
        <div>
            <Title.PageTitle title={"资源聚合管理"} style={{marginTop: 0}} />
            <div className={styles.dataInfo}>
                <div className={styles.dataInfoTop}>
                    <Title.PageSubTitle title={'资源概览'} />
                </div>
                <div className={styles.dataInfoBottom}>
                    {
                        dataInfo?.map(data => {
                            return (
                                <div className={styles.dataInfoBottomItem}>
                                    <div className={styles.dataInfoBottomItemTop}>{data?.label}</div>
                                    <div className={styles.dataInfoBottomItemBottom}>
                                        <span 
                                            className={styles.dataInfoBottomItemBottomValue}
                                            style={{color: token.colorPrimary}}
                                        >
                                            {data?.value}
                                        </span>
                                        <span className={styles.dataInfoBottomItemBottomUnit}>{data?.unit}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className={styles.topology}>
                <Topology data={topologyData} />
            </div>
        </div>
    )
}

export default Polymerization;