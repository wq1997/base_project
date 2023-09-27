import { Title } from "@/components";
import styles from "./index.less";
import { useState } from "react";
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

            </div>
        </div>
    )
}

export default Polymerization;